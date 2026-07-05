"use client";

import { DocPage, Prose } from "@/components/DocPage";
import { Reveal } from "@/components/Reveal";
import { useLang, loc, type L } from "@/lib/i18n";

type Person = { name: string; role: L; lead?: boolean };

function initials(name: string) {
  const parts = name.replace(/^(Pr\.?|Dr\.?)\s+/i, "").trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export default function TeamPage() {
  const { lang } = useLang();
  const tx = (fr: string, en: string) => (lang === "fr" ? fr : en);

  // Operational team, real names and roles from the official Gepromed team page.
  const team: Person[] = [
    { name: "Nabil Chakfé", role: { fr: "Président, chirurgien vasculaire", en: "President, vascular surgeon" }, lead: true },
    { name: "Annik Borcos", role: { fr: "Directrice générale", en: "Chief Executive Officer" }, lead: true },
    { name: "Nathalie Couvreur", role: { fr: "Responsable administrative et financière", en: "Administrative and financial manager" } },
    { name: "Nicole Neumann", role: { fr: "Responsable développement et innovation", en: "Development and Innovation manager" } },
    { name: "Wissal Lachegur", role: { fr: "Ingénieure mécatronique", en: "Mechatronics engineer" } },
    { name: "Juliette Tabouret", role: { fr: "Ingénieure textile", en: "Textile engineer" } },
    { name: "Mohamed Allouche", role: { fr: "Ingénieur logiciel IA", en: "AI software engineer" } },
    { name: "Noé Constans", role: { fr: "Doctorant", en: "PhD student" } },
    { name: "Fanny Fuchs", role: { fr: "Alternante, laboratoire technique", en: "Tech Lab work-study student" } },
  ];

  // Scientific committee: specialty leads named in the Gepromed history.
  const committee = [
    "Pr. Bourcier",
    "Pr. Ehlinger",
    "Pr. Liverneaux",
    "Pr. Proust",
    "Pr. Cebula",
    "Pr. Romain",
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
        fr: "Une équipe permanente pluridisciplinaire, chirurgiens, ingénieurs et chercheurs, épaulée par un comité scientifique de praticiens hospitalo-universitaires de référence.",
        en: "A multidisciplinary permanent team of surgeons, engineers and researchers, backed by a scientific committee of leading hospital-university practitioners.",
      }}
    >
      <Prose>
        <p>
          {tx(
            "Depuis ses origines en 1993 autour de Pr. Nabil Chakfé et Pr. Bernard Durand, Gepromed fédère chirurgiens, ingénieurs et chercheurs autour d'un objectif commun : la sécurité du patient à travers la maîtrise des dispositifs médicaux et la formation par la pratique.",
            "Since its origins in 1993 around Pr. Nabil Chakfé and Pr. Bernard Durand, Gepromed has brought together surgeons, engineers and researchers around a common goal: patient safety through medical-device mastery and hands-on training.",
          )}
        </p>
      </Prose>

      <h2 className="mt-10 text-2xl">{tx("Direction et équipe", "Leadership and team")}</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((p, i) => (
          <Reveal key={p.name} delay={(i % 3) * 60}>
            <div
              className={`group h-full rounded-2xl border bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft ${
                p.lead ? "border-brand-200" : "border-line hover:border-brand-300"
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-full font-mono text-sm font-semibold ${
                    p.lead ? "bg-brand-600 text-white" : "bg-brand-50 text-brand-700"
                  }`}
                >
                  {initials(p.name)}
                </div>
                <div>
                  <p className="font-semibold text-ink">{p.name}</p>
                  <p className="mt-0.5 text-sm text-ink-muted">{loc(p.role, lang)}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-4 text-xs text-ink-muted">
        {tx(
          "Photographies de l'équipe à venir.",
          "Team photographs coming soon.",
        )}
      </p>

      <h2 className="mt-12 text-2xl">{tx("Comité scientifique", "Scientific committee")}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
        {tx(
          "Des praticiens hospitalo-universitaires de référence encadrent les activités de formation, de R&D et d'analyse d'explants dans chaque spécialité.",
          "Leading hospital-university practitioners guide the training, R&D and explant-analysis activities in each specialty.",
        )}
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {committee.map((name) => (
          <div key={name} className="flex items-center gap-3 rounded-2xl border border-line p-4">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-mist font-mono text-sm font-semibold text-ink-soft">
              {initials(name)}
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">{name}</p>
              <p className="text-xs text-ink-muted">
                {tx("Membre du comité scientifique", "Scientific committee member")}
              </p>
            </div>
          </div>
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
