"use client";

import { DocPage } from "@/components/DocPage";
import { Reveal } from "@/components/Reveal";
import { useLang, loc, type L } from "@/lib/i18n";

type Person = { name: string; role: L; lead?: boolean; photo?: string };

function initials(name: string) {
  const parts = name.replace(/^(Pr\.?|Dr\.?)\s+/i, "").trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export default function TeamPage() {
  const { lang } = useLang();
  const tx = (fr: string, en: string) => (lang === "fr" ? fr : en);

  // Real names and roles from the official Gepromed team page.
  // Legacy structure: President (alone), then the Team group.
  const president: Person = {
    name: "Nabil Chakfé",
    role: { fr: "Président de l'association", en: "President of the association" },
    lead: true,
    photo: "/photos/team/nabil-chakfe.jpg",
  };

  const team: Person[] = [
    { name: "Nathalie Couvreur", role: { fr: "Responsable administrative et financière", en: "Administrative and financial manager" }, photo: "/photos/team/nathalie-couvreur.jpg" },
    { name: "Nicole Neumann", role: { fr: "Responsable développement et innovation", en: "Development and Innovation manager" }, photo: "/photos/team/nicole-neumann.jpg" },
    { name: "Wissal Lachegur", role: { fr: "Ingénieure mécatronique", en: "Mechatronics engineer" }, photo: "/photos/team/wissal-lachegur.jpg" },
    { name: "Juliette Tabouret", role: { fr: "Ingénieure textile", en: "Textile engineer" }, photo: "/photos/team/juliette-tabouret.jpg" },
    { name: "Mohamed Allouche", role: { fr: "Ingénieur logiciel IA", en: "AI software engineer" }, photo: "/photos/team/mohamed-allouche.jpg" },
    { name: "Noé Constans", role: { fr: "Doctorant", en: "PhD student" }, photo: "/photos/team/noe-constans.jpg" },
    { name: "Fanny Fuchs", role: { fr: "Alternante, laboratoire technique", en: "Tech Lab work-study student" }, photo: "/photos/team/fanny-fuchs.png" },
    { name: "Annik Borcos", role: { fr: "Directrice générale", en: "Chief Executive Officer" }, photo: "/photos/team/annik-borcos.jpg" },
  ];

  const poles = [
    tx("Chirurgie vasculaire", "Vascular surgery"),
    tx("Ophtalmologie", "Ophthalmology"),
    tx("Orthopédie", "Orthopedics"),
    tx("Chirurgie de la main", "Hand surgery"),
    tx("Neurochirurgie", "Neurosurgery"),
    tx("Chirurgie digestive", "Digestive surgery"),
    tx("Urologie", "Urology"),
    tx("Gynécologie", "Gynecology"),
  ];

  return (
    <DocPage
      eyebrow={{ fr: "À propos", en: "About us" }}
      title={{ fr: "L'équipe Gepromed", en: "Gepromed Team" }}
      intro={{
        fr: "Découvrez les membres de l'équipe Gepromed et leurs rôles au sein de l'association.",
        en: "Learn more about the members of the Gepromed team and their roles within the association.",
      }}
    >
      {/* President */}
      <h2 className="text-2xl">{tx("Président", "President")}</h2>
      <div className="mt-5">
        <div className="flex items-center gap-5 rounded-2xl border border-brand-200 bg-white p-6 shadow-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={president.photo}
            alt={president.name}
            className="h-20 w-20 shrink-0 rounded-full object-cover ring-2 ring-brand-200"
          />
          <div>
            <p className="text-lg font-semibold text-ink">{president.name}</p>
            <p className="mt-0.5 text-sm text-ink-muted">{loc(president.role, lang)}</p>
          </div>
        </div>
      </div>

      {/* Team */}
      <h2 className="mt-12 text-2xl">{tx("L'équipe", "The team")}</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((p, i) => (
          <Reveal key={p.name} delay={(i % 3) * 60}>
            <div className="group h-full rounded-2xl border border-line bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-soft">
              <div className="flex items-center gap-3.5">
                {p.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.photo}
                    alt={p.name}
                    className="h-12 w-12 shrink-0 rounded-full object-cover ring-1 ring-line"
                  />
                ) : (
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-50 font-mono text-sm font-semibold text-brand-700">
                    {initials(p.name)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-ink">{p.name}</p>
                  <p className="mt-0.5 text-sm text-ink-muted">{loc(p.role, lang)}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <h2 className="mt-12 text-2xl">{tx("Pôles d'expertise", "Areas of expertise")}</h2>
      <div className="mt-5 flex flex-wrap gap-2">
        {poles.map((p) => (
          <span key={p} className="pill bg-mist text-ink-soft">{p}</span>
        ))}
      </div>
    </DocPage>
  );
}
