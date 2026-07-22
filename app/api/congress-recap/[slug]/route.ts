import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { getCongressBySlug } from "@/lib/congresses";

// lib/i18n.tsx is a "use client" module (React context/hooks) and can't be
// imported into a server route — its exports resolve to undefined there.
// `loc` itself is a trivial pure function, so it's inlined here instead.
type L = { fr: string; en: string };
function loc(value: L, lang: "fr" | "en"): string {
  return value[lang];
}

/**
 * Public, auth-free endpoint that generates a real, downloadable "congress
 * recap" PDF: cover, welcome message, program, scientific committee,
 * sponsors, and event photos — everything gepromed-web already holds as real
 * data for a congress.
 *
 * Deliberately NOT the "recueil des actes et résumés" (collected proceedings
 * and abstracts) the old e-book copy promised — that requires the actual
 * submitted scientific abstracts, which don't exist anywhere in this
 * codebase or the legacy site. Fabricating that content and labeling it
 * "proceedings" would misrepresent it, so this route (and the button that
 * calls it) is honestly scoped to a recap booklet instead. See
 * raised_questions.md → Congresses.
 */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const NAVY = "#0A2540";
const BLUE = "#007AC2";
const ORANGE = "#ED6D1B";
const DARK = "#1F2A33";
const MUTED = "#5F6B73";
const TINT = "#E1F0F9";
const HAIR = "#D9E2E8";

const LOGO_PATH = path.join(process.cwd(), "public", "brand", "logo-gepromed-color.png");

function pdfSectionHeading(doc: PDFKit.PDFDocument, label: string): void {
  if (doc.y > 740) doc.addPage();
  const barY = doc.y;
  doc.rect(40, barY, 515, 20).fill(TINT);
  doc.rect(40, barY, 4, 20).fill(BLUE);
  doc.fillColor(NAVY).fontSize(10.5).font("Helvetica-Bold").text(label, 52, barY + 5, { width: 495 });
  doc.y = barY + 28;
}

function slugFilename(slug: string): string {
  return `recap-${slug.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-zA-Z0-9-]/g, "-")}.pdf`;
}

export async function GET(req: NextRequest, { params }: { params: { slug: string } }): Promise<NextResponse> {
  const slug = params.slug;
  const c = getCongressBySlug(slug);
  if (!c) {
    return NextResponse.json({ error: `Congrès « ${slug} » introuvable.` }, { status: 404 });
  }

  const lang = (req.nextUrl.searchParams.get("lang") === "en" ? "en" : "fr") as "fr" | "en";
  const tx = (fr: string, en: string) => (lang === "fr" ? fr : en);

  const buf = await new Promise<Buffer>((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 40, bufferPages: true });
    const chunks: Uint8Array[] = [];
    doc.on("data", (chunk: Uint8Array) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    // Letterhead — same treatment as the training-program PDF, for one
    // consistent "Gepromed document" look across the site.
    doc.rect(0, 0, 595, 76).fill(TINT);
    try {
      if (fs.existsSync(LOGO_PATH)) doc.image(LOGO_PATH, 40, 22, { height: 32 });
    } catch {
      // Missing/unreadable logo must never break PDF generation.
    }
    const tag = tx("RÉCAPITULATIF DU CONGRÈS", "CONGRESS RECAP");
    const tagW = doc.font("Helvetica-Bold").fontSize(8).widthOfString(tag) + 20;
    doc.roundedRect(555 - tagW, 30, tagW, 18, 9).fill(ORANGE);
    doc.fillColor("#ffffff").fontSize(8).font("Helvetica-Bold").text(tag, 555 - tagW, 35, { width: tagW, align: "center" });
    doc.rect(0, 76, 595, 2.5).fill(BLUE);
    doc.rect(0, 78.5, 595, 1.5).fill(ORANGE);

    doc.y = 96;
    doc.fontSize(18).fillColor(NAVY).font("Helvetica-Bold").text(loc(c.title, lang), 40, doc.y, { width: 515 });
    doc.moveDown(0.3);
    const specBits = [loc(c.dates, lang), loc(c.city, lang)];
    if (c.venue) specBits.push(loc(c.venue, lang));
    doc.fontSize(8).fillColor(MUTED).font("Helvetica").text(specBits.join("   ·   "), 40, doc.y, { width: 515 });
    doc.moveDown(1);

    if (c.welcome) {
      pdfSectionHeading(doc, tx("Message de bienvenue", "Welcome message"));
      doc.fontSize(9.5).fillColor(DARK).font("Helvetica").text(loc(c.welcome, lang), 40, doc.y, { width: 515 });
      doc.moveDown(0.9);
    }

    doc.fontSize(9.5).fillColor(DARK).font("Helvetica").text(loc(c.intro, lang), 40, doc.y, { width: 515 });
    doc.moveDown(0.9);

    if (c.program && c.program.length > 0) {
      pdfSectionHeading(doc, tx("Programme", "Program"));
      for (const s of c.program) {
        if (doc.y > 750) doc.addPage();
        doc.fontSize(9).fillColor(BLUE).font("Helvetica-Bold").text(loc(s.when, lang), 40, doc.y, { width: 515 });
        doc.fontSize(10).fillColor(NAVY).font("Helvetica-Bold").text(loc(s.title, lang), 40, doc.y, { width: 515 });
        doc.fontSize(9).fillColor(DARK).font("Helvetica").text(loc(s.body, lang), 40, doc.y, { width: 515 });
        doc.moveDown(0.6);
      }
      doc.moveDown(0.3);
    }

    if (c.committee && c.committee.length > 0) {
      pdfSectionHeading(doc, tx("Comité scientifique", "Scientific committee"));
      for (const m of c.committee) {
        doc.fontSize(9.5).fillColor(NAVY).font("Helvetica-Bold").text(m.name, 40, doc.y, { width: 515 });
        const roleBits = [m.role ? loc(m.role, lang) : null, m.affiliation].filter(Boolean).join(" — ");
        if (roleBits) doc.fontSize(8.5).fillColor(MUTED).font("Helvetica").text(roleBits, 40, doc.y, { width: 515 });
        doc.moveDown(0.4);
      }
      doc.moveDown(0.3);
    }

    if (c.sponsors && c.sponsors.length > 0) {
      pdfSectionHeading(doc, tx("Partenaires & sponsors", "Partners & sponsors"));
      doc.fontSize(9.5).fillColor(DARK).font("Helvetica").text(c.sponsors.map((s) => s.name).join("  ·  "), 40, doc.y, { width: 515 });
      doc.moveDown(0.9);
    }

    if (c.photos && c.photos.length > 0) {
      pdfSectionHeading(doc, tx("Photos de l'édition", "Edition photos"));
      const cellW = 165;
      const cellH = 110;
      const gap = 10;
      let col = 0;
      let rowY = doc.y;
      for (const p of c.photos) {
        if (rowY + cellH > 780) {
          doc.addPage();
          rowY = 40;
          col = 0;
        }
        const x = 40 + col * (cellW + gap);
        try {
          const abs = path.join(process.cwd(), "public", p.replace(/^\//, ""));
          if (fs.existsSync(abs)) {
            doc.image(abs, x, rowY, { width: cellW, height: cellH, fit: [cellW, cellH] });
          }
        } catch {
          // A missing/corrupt photo must never break the whole document.
        }
        col++;
        if (col === 3) {
          col = 0;
          rowY += cellH + gap;
        }
      }
      doc.y = rowY + (col > 0 ? cellH + gap : 0);
      doc.moveDown(0.5);
    }

    doc.moveDown(0.3);
    // This closing block (rule + compliance note + certification line) must
    // stay together and clear of the page-number footer below — if it were
    // left to flow naturally it could land right on top of the footer text
    // when earlier content (e.g. a photo grid) already reached near the
    // bottom of the page.
    if (doc.y > 700) doc.addPage();
    doc.rect(40, doc.y, 515, 0.75).fill(HAIR);
    doc.moveDown(0.4);
    doc.fontSize(7.5).fillColor(MUTED).font("Helvetica-Oblique").text(
      tx(
        "Ce document est un récapitulatif de l'édition (programme, comité, photos), et non le recueil officiel des actes et résumés scientifiques.",
        "This document is an edition recap (program, committee, photos), not the official collected scientific proceedings and abstracts.",
      ),
      40,
      doc.y,
      { width: 515 },
    );
    doc.moveDown(0.5);
    doc.fontSize(7).fillColor(MUTED).font("Helvetica").text(
      "GEPROMED, organisme de formation certifié Qualiopi · ISO 9001",
      40,
      doc.y,
      { width: 515, align: "center" },
    );

    const range = doc.bufferedPageRange();
    const footerY = doc.page.height - doc.page.margins.bottom - 14;
    for (let i = range.start; i < range.start + range.count; i++) {
      doc.switchToPage(i);
      doc.fontSize(7.5).fillColor(MUTED).font("Helvetica").text(
        `Page ${i + 1} / ${range.count}`,
        40,
        footerY,
        { width: 515, align: "center", lineBreak: false },
      );
    }

    doc.end();
  });

  return new NextResponse(new Uint8Array(buf), {
    status: 200,
    headers: {
      "content-type": "application/pdf",
      "content-disposition": `attachment; filename="${slugFilename(slug)}"`,
      "cache-control": "no-store",
    },
  });
}
