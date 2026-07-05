"use client";

import { DocPage, Prose } from "@/components/DocPage";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/lib/i18n";

export default function FundersPage() {
  const { lang } = useLang();
  const tx = (fr: string, en: string) => (lang === "fr" ? fr : en);

  const groups = [
    {
      t: tx("Institutions publiques", "Public institutions"),
      items: ["Eurométropole de Strasbourg", "Collectivité européenne d'Alsace", "Région Grand Est"],
    },
    {
      t: tx("Financements européens", "European funding"),
      items: ["FEDER", tx("Programmes européens de recherche", "European research programs")],
    },
    {
      t: tx("Partenaires académiques", "Academic partners"),
      items: ["Université de Strasbourg", tx("Fondation Université de Strasbourg", "University of Strasbourg Foundation"), "BioValley France"],
    },
    {
      t: tx("Partenaires industriels", "Industrial partners"),
      items: ["W.L. Gore & Associates", "Johnson & Johnson", "HelpMeSee"],
    },
  ];

  return (
    <DocPage
      eyebrow={{ fr: "À propos", en: "About us" }}
      title={{ fr: "Nos financeurs", en: "Our funders" }}
      intro={{
        fr: "Le développement de Gepromed est rendu possible par le soutien des collectivités locales, de fonds européens et de partenaires industriels du monde de la santé.",
        en: "Gepromed's development is made possible by the support of local authorities, European funds and industrial partners from the healthcare world.",
      }}
    >
      <Prose>
        <p>
          {tx(
            "Les collectivités locales ont affirmé leur volonté de soutenir ce développement. Des fonds européens sont également mobilisés. Divers partenaires industriels participent notamment par le financement d'équipements et la participation aux activités.",
            "Local authorities have affirmed their willingness to support this development. European funds are also mobilized. Various industrial partners contribute notably through equipment financing and participation in activities.",
          )}
        </p>
      </Prose>

      {/* Flagship EU co-funded project (real FEDER figures) */}
      <Reveal>
        <div className="relative mt-8 overflow-hidden rounded-xl2 border border-brand-800 bg-brand-950 p-8 text-white sm:p-10">
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative">
            <p className="mono-label text-brand-200">
              {tx("Projet cofinancé par l'Union européenne", "Project co-funded by the European Union")}
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-2xl text-white sm:text-3xl">
              {tx(
                "Imagerie et suivi des dispositifs médicaux implantables et intelligence artificielle",
                "Imaging and Monitoring of Implantable Medical Devices and Artificial Intelligence",
              )}
            </h2>

            <dl className="mt-8 grid gap-px overflow-hidden rounded-xl2 border border-white/10 bg-white/10 sm:grid-cols-3">
              <div className="bg-brand-950 p-6">
                <dt className="mono-label text-brand-200">{tx("Fonds FEDER (UE)", "ERDF funds (EU)")}</dt>
                <dd className="stat-figure mt-2 text-2xl text-white sm:text-3xl">4 013 741 €</dd>
                <dd className="mt-1 text-xs text-white/60">{tx("56,56 % du projet", "56.56 percent of the project")}</dd>
              </div>
              <div className="bg-brand-950 p-6">
                <dt className="mono-label text-brand-200">{tx("Coût total", "Total cost")}</dt>
                <dd className="stat-figure mt-2 text-2xl text-white sm:text-3xl">7 096 430 €</dd>
                <dd className="mt-1 text-xs text-white/60">{tx("investissement global", "overall investment")}</dd>
              </div>
              <div className="bg-brand-950 p-6">
                <dt className="mono-label text-brand-200">{tx("Période", "Period")}</dt>
                <dd className="stat-figure mt-2 text-2xl text-white sm:text-3xl">2023–2027</dd>
                <dd className="mt-1 text-xs text-white/60">{tx("7 sept. 2023 au 31 déc. 2027", "7 Sep 2023 to 31 Dec 2027")}</dd>
              </div>
            </dl>

            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/70">
              {tx(
                "Avec le soutien de la Région Grand Est, de l'Eurométropole de Strasbourg et de la Collectivité européenne d'Alsace.",
                "With the support of the Grand Est Region, the Eurométropole de Strasbourg and the European Collectivity of Alsace.",
              )}
            </p>
          </div>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {groups.map((g) => (
          <div key={g.t} className="card p-6">
            <h2 className="text-lg">{g.t}</h2>
            <ul className="mt-3 space-y-1.5 text-sm text-ink-soft">
              {g.items.map((it) => (
                <li key={it}>• {it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </DocPage>
  );
}
