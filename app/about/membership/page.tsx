"use client";

import { DocPage, Prose } from "@/components/DocPage";
import { useLang } from "@/lib/i18n";

const iconProps = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8 } as const;

function IconIdCard({ className }: { className?: string }) {
  return (
    <svg {...iconProps} className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <circle cx="8.5" cy="12" r="2" />
      <path d="M13.5 10.5h5M13.5 13.5h3.5" strokeLinecap="round" />
    </svg>
  );
}

function IconHeart({ className }: { className?: string }) {
  return (
    <svg {...iconProps} className={className} aria-hidden="true">
      <path d="M12 20s-7-4.35-9.5-8.8C.7 7.7 2.3 4.5 5.6 4c2-.3 3.7.6 4.9 2.2M12 20s7-4.35 9.5-8.8c1.8-3.5.2-6.7-3.1-7.2-2-.3-3.7.6-4.9 2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconScan({ className }: { className?: string }) {
  return (
    <svg {...iconProps} className={className} aria-hidden="true">
      <path d="M4 8V6a2 2 0 012-2h2M18 4h2a2 2 0 012 2v2M20 16v2a2 2 0 01-2 2h-2M6 20H4a2 2 0 01-2-2v-2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
    </svg>
  );
}

function IconArrowRight({ className }: { className?: string }) {
  return (
    <svg {...iconProps} className={className} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg {...iconProps} className={className} aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function MembershipPage() {
  const { lang } = useLang();
  const tx = (fr: string, en: string) => (lang === "fr" ? fr : en);

  const MEMBERSHIP_URL = "https://www.helloasso.com/associations/gepromed/adhesions/devenez-membre-du-gepromed-2026";

  const cards = [
    {
      index: "01",
      badge: tx("50 € / an", "€50 / year"),
      t: tx("Devenir membre", "Become a member"),
      d: tx(
        "Rejoignez l'association et participez à la mission de sécurité du patient et de formation chirurgicale.",
        "Join the association and take part in the mission of patient safety and surgical training.",
      ),
      cta: tx("Adhérer", "Join"),
      href: MEMBERSHIP_URL,
      tone: "dark" as const,
    },
    {
      index: "02",
      badge: tx("Reçu fiscal", "Tax receipt"),
      t: tx("Faire un don", "Make a donation"),
      d: tx(
        "Soutenez nos plateaux techniques, la recherche et l'accès à la formation. Un reçu fiscal est délivré.",
        "Support our technical platforms, research and access to training. A tax receipt is issued.",
      ),
      cta: tx("Donner", "Donate"),
      href: "https://www.helloasso.com/associations/gepromed",
      tone: "light" as const,
    },
  ];

  const benefits = [
    tx(
      "Un soutien financier et moral aux professionnels qui forment et font vivre l'association au quotidien.",
      "Financial and moral support for the professionals who train and run the association day to day.",
    ),
    tx(
      "Un accès privilégié à la vie de l'association : actualités des projets et participation aux assemblées statutaires.",
      "Privileged access to the life of the association: project updates and participation in statutory assemblies.",
    ),
    tx(
      "Une occasion de partager son expertise, d'élargir son réseau professionnel et de gagner en visibilité auprès de la communauté médicale.",
      "A chance to share expertise, broaden your professional network and gain visibility within the medical community.",
    ),
  ];

  return (
    <DocPage
      eyebrow={{ fr: "À propos", en: "About us" }}
      title={{ fr: "Adhésion ou don", en: "Membership or donation" }}
      intro={{
        fr: "Gepromed est une association. Votre adhésion ou votre don soutient directement la formation chirurgicale et la sécurité des dispositifs médicaux.",
        en: "Gepromed is a non-profit association. Your membership or donation directly supports surgical training and medical-device safety.",
      }}
    >
      <div className="grid gap-5 lg:grid-cols-5">
        {/* Card 01 · Become a member — featured, carries the QR code */}
        <div className="relative overflow-hidden rounded-xl2 border border-brand-700 bg-brand-800 p-7 text-white sm:p-8 lg:col-span-3">
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
          <div className="relative flex h-full flex-col">
            <div className="flex items-start justify-between gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10">
                <IconIdCard className="h-5 w-5 text-white" />
              </span>
              <span className="pill border border-white/20 bg-white/10 text-white">{cards[0].badge}</span>
            </div>
            <h2 className="mt-4 font-display text-2xl text-white">{cards[0].t}</h2>
            <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-white/75">{cards[0].d}</p>

            <div className="mt-7 flex flex-col items-center gap-5 rounded-xl2 border border-white/10 bg-white/5 p-5 sm:flex-row">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/membership-qr.png"
                alt={tx("QR code vers la page d'adhésion Gepromed sur HelloAsso", "QR code linking to the Gepromed membership page on HelloAsso")}
                className="h-36 w-36 shrink-0 rounded-lg border border-white/20 bg-white p-2 sm:h-40 sm:w-40"
              />
              <div className="text-center sm:text-left">
                <p className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-annotation text-brand-200 sm:justify-start">
                  <IconScan className="h-4 w-4" />
                  {tx("Scannez pour adhérer", "Scan to join")}
                </p>
                <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-white/60">
                  {tx(
                    "Ouvre directement le formulaire d'adhésion 2026 sur HelloAsso.",
                    "Opens the 2026 membership form directly on HelloAsso.",
                  )}
                </p>
              </div>
            </div>

            <a href={cards[0].href} target="_blank" rel="noreferrer" className="btn-onDark group mt-6 w-full sm:w-auto">
              {cards[0].cta}
              <IconArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* Card 02 · Make a donation — light, secondary */}
        <div className="card flex flex-col p-7 sm:p-8 lg:col-span-2">
          <div className="flex items-start justify-between gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-50">
              <IconHeart className="h-5 w-5 text-brand-700" />
            </span>
            <span className="pill bg-mist text-ink-soft">{cards[1].badge}</span>
          </div>
          <h2 className="mt-4 text-2xl">{cards[1].t}</h2>
          <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-soft">{cards[1].d}</p>
          <a href={cards[1].href} target="_blank" rel="noreferrer" className="btn-primary group mt-6 w-full">
            {cards[1].cta}
            <IconArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl">{tx("Pourquoi adhérer", "Why join")}</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-3">
          {benefits.map((b) => (
            <li key={b} className="card p-5 transition hover:-translate-y-0.5 hover:shadow-soft">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-50">
                <IconCheck className="h-4 w-4 text-brand-700" />
              </span>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{b}</p>
            </li>
          ))}
        </ul>
      </div>

      <Prose>
        <p className="mt-8">
          {tx(
            "Les adhésions et dons sont gérés via la plateforme HelloAsso. Pour un don d'entreprise, un mécénat ou un partenariat, contactez-nous directement.",
            "Memberships and donations are handled via the HelloAsso platform. For a corporate gift, sponsorship or partnership, contact us directly.",
          )}
        </p>
      </Prose>
    </DocPage>
  );
}
