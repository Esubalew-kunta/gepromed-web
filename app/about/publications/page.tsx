"use client";

import { DocPage, Prose } from "@/components/DocPage";
import { Reveal } from "@/components/Reveal";
import { useLang, type L } from "@/lib/i18n";

type Pub = { title: string; venue: string; year: string; href: string };
type Group = { theme: L; items: Pub[] };

const GROUPS: Group[] = [
  {
    theme: { fr: "Analyse d'explants", en: "Explant analysis" },
    items: [
      {
        title:
          "Explanted Vascular and Endovascular Graft Analysis: Where Do We Stand and What Should We Do?",
        venue: "European Journal of Vascular and Endovascular Surgery",
        year: "2018",
        href: "https://pubmed.ncbi.nlm.nih.gov/29478909/",
      },
      {
        title:
          "What Have We Learned From Explanted Peripheral Stents Analysis?",
        venue: "Journal of Endovascular Therapy",
        year: "2025",
        href: "https://journals.sagepub.com/doi/10.1177/15266028251349486",
      },
      {
        title:
          "Type IIIb Endoleaks: Fabric Perforations of Explanted New Generation Endoprostheses",
        venue: "European Journal of Vascular and Endovascular Surgery",
        year: "2023",
        href: "https://www.ejves.com/article/S1078-5884(23)00781-5/fulltext",
      },
    ],
  },
  {
    theme: { fr: "Éducation & simulation", en: "Education & simulation" },
    items: [
      {
        title:
          "Validity evidence of a new virtual reality simulator for phacoemulsification training in cataract surgery",
        venue: "PubMed",
        year: "2024",
        href: "https://pubmed.ncbi.nlm.nih.gov/39461993/",
      },
      {
        title:
          "Virtual reality simulator-based assessment of non-technical skills in eye surgery: managing complex cataract surgery",
        venue: "BMC Medical Education",
        year: "2026",
        href: "https://link.springer.com/article/10.1186/s12909-026-09029-6",
      },
    ],
  },
];

export default function PublicationsPage() {
  const { lang } = useLang();
  const tx = (fr: string, en: string) => (lang === "fr" ? fr : en);

  return (
    <DocPage
      eyebrow={{ fr: "À propos", en: "About us" }}
      title={{ fr: "Publications clés", en: "Key Publications" }}
      intro={{
        fr: "Une sélection de travaux scientifiques issus de nos activités de recherche et de formation, regroupés par thème.",
        en: "A selection of scientific works from our research and training activities, grouped by theme.",
      }}
    >
      <Prose>
        <p>
          {tx(
            "Plus de 20 études cliniques et un programme continu d'analyse d'explants nourrissent nos publications et la sécurité des dispositifs médicaux. Nos travaux paraissent dans des revues à comité de lecture, souvent en collaboration avec le groupe GEPROVAS et l'Université de Strasbourg.",
            "More than 20 clinical studies and an ongoing explant-analysis program feed our publications and medical-device safety. Our work appears in peer-reviewed journals, often in collaboration with the GEPROVAS group and the University of Strasbourg.",
          )}
        </p>
      </Prose>

      <div className="mt-8 space-y-10">
        {GROUPS.map((g) => (
          <div key={g.theme.en}>
            <h2 className="mono-label-brand">{g.theme[lang]}</h2>
            <ul className="mt-4 space-y-4">
              {g.items.map((p, i) => (
                <Reveal as="li" key={p.href} delay={i * 60}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group block rounded-2xl border border-line p-5 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-card"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <p className="font-medium text-ink group-hover:text-brand-700">
                        {p.title}
                      </p>
                      <span className="stat-figure shrink-0 text-sm text-brand-600">
                        {p.year}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-ink-muted">{p.venue}</p>
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-8 rounded-xl bg-brand-50/60 px-4 py-3 text-sm text-ink-soft">
        {tx(
          "La liste complète et à jour des publications est disponible sur PubMed et sur le site institutionnel de Gepromed.",
          "The full, up-to-date list of publications is available on PubMed and on Gepromed's institutional website.",
        )}
      </p>
    </DocPage>
  );
}
