"use client";

import { DocPage, Prose } from "@/components/DocPage";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/lib/i18n";

export default function FundersPage() {
  const { lang } = useLang();
  const tx = (fr: string, en: string) => (lang === "fr" ? fr : en);

  const equipment = [
    {
      src: "/photos/funders/xradia-microscope.jpg",
      alt: tx("Microscope Xradia ZEISS pour imagerie 3D nanométrique", "Xradia ZEISS microscope for nanometric 3D imaging"),
      caption: tx("Microscope Xradia ZEISS", "Xradia ZEISS microscope"),
      desc: tx("Imagerie 3D non destructive à l'échelle nanométrique.", "Non-destructive 3D imaging at the nanometer scale."),
    },
    {
      src: "/photos/funders/lsb-operating-rooms.jpg",
      alt: tx("Salles d'opération du Laboratoire de Simulation et de Bioingénierie", "Simulation and Bioengineering Lab operating rooms"),
      caption: tx("Salles d'opération LSB", "LSB operating rooms"),
      desc: tx("Un apprentissage en équipe pour renforcer la coordination au bloc.", "Team-based learning to strengthen coordination in the operating room."),
    },
    {
      src: "/photos/funders/faxitron.jpg",
      alt: tx("Système de radiographie Faxitron", "Faxitron radiography system"),
      caption: tx("Système Faxitron", "Faxitron system"),
      desc: tx("Imagerie radiographique haute résolution en quelques secondes.", "High-resolution X-ray imaging in seconds."),
    },
  ];

  const platforms = [
    tx("Analyse des DMIs explantés : comprendre la dégradation des matériaux pour améliorer les produits.", "Analysis of explanted IMDs: understanding material degradation to improve products."),
    tx("Suivi clinique et traçabilité : structurer les données pour un meilleur suivi post-implantation.", "Clinical monitoring and traceability: structuring data for better post-implantation monitoring."),
    tx("Jumeau numérique et formation : développer une simulation chirurgicale avancée reliée au bloc opératoire.", "Digital twin and training: advanced surgical simulation connected to the operating room."),
    tx("Partenariats & certification : intégrer les systèmes de santé et proposer de nouveaux services assurantiels.", "Partnerships & certification: integrating healthcare systems and offering new insurance services."),
  ];

  const publicFunders = [
    {
      name: "Union européenne",
      logo: "/brand/funders/european-union.png",
      desc: tx(
        "Elle soutient le projet « Imagerie et suivi des Dispositifs Médicaux Implantables et Intelligence Artificielle ».",
        "It supports the project \"Imaging and Monitoring of Implantable Medical Devices and Artificial Intelligence\".",
      ),
      rationale: tx(
        "Un financement en cohérence avec la volonté européenne de soutenir l'innovation et la compétitivité.",
        "Funding aligned with the European drive to support innovation and competitiveness.",
      ),
    },
    {
      name: "Région Grand Est",
      logo: "/brand/funders/region-grand-est.png",
      desc: tx(
        "Elle soutient la dynamique d'innovation et de transformation des dispositifs médicaux implantables.",
        "It supports the dynamic of innovation and transformation of implantable medical devices.",
      ),
      rationale: tx(
        "Un appui fort à l'innovation et à la formation professionnelle sur le territoire.",
        "Strong support for innovation and professional training across the region.",
      ),
    },
    {
      name: "Eurométropole de Strasbourg",
      logo: "/brand/funders/eurometropole-strasbourg.png",
      desc: tx(
        "L'EMS s'engage à soutenir financièrement le projet de développement afin de renforcer l'action de Gepromed.",
        "The EMS is committed to financially supporting the development project to strengthen Gepromed's action.",
      ),
      rationale: tx(
        "Un soutien qui ancre notre projet au cœur d'un territoire dynamique et attractif.",
        "Support that anchors our project at the heart of a dynamic, attractive region.",
      ),
    },
    {
      name: "Collectivité européenne d'Alsace",
      logo: "/brand/funders/cea.png",
      desc: tx(
        "Elle apporte une aide financière à la réalisation du centre d'expertise clinique et de recherche sur les DMIs.",
        "It provides financial support for the creation of the clinical expertise and research center on implantable medical devices.",
      ),
      rationale: tx(
        "Une expertise et un partenariat stratégique au service de la recherche et du développement technologique.",
        "Expertise and a strategic partnership in service of research and technological development.",
      ),
    },
  ];

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
                <dd className="stat-figure mt-2 text-lg text-white sm:text-xl">4 013 741,02 €</dd>
                <dd className="mt-1 text-xs text-white/60">{tx("56,56 % du projet", "56.56 percent of the project")}</dd>
              </div>
              <div className="bg-brand-950 p-6">
                <dt className="mono-label text-brand-200">{tx("Coût total", "Total cost")}</dt>
                <dd className="stat-figure mt-2 text-lg text-white sm:text-xl">7 096 430,37 €</dd>
                <dd className="mt-1 text-xs text-white/60">{tx("investissement global", "overall investment")}</dd>
              </div>
              <div className="bg-brand-950 p-6">
                <dt className="mono-label text-brand-200">{tx("Période", "Period")}</dt>
                <dd className="stat-figure mt-2 text-lg text-white sm:text-xl">2023–2027</dd>
                <dd className="mt-1 text-xs text-white/60">{tx("7 sept. 2023 au 31 déc. 2027", "7 Sep 2023 to 31 Dec 2027")}</dd>
              </div>
            </dl>

            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/70">
              {tx(
                "Avec le soutien de la Région Grand Est, de l'Eurométropole de Strasbourg et de la Collectivité européenne d'Alsace.",
                "With the support of the Grand Est Region, the Eurométropole de Strasbourg and the European Collectivity of Alsace.",
              )}
            </p>

            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/70">
              {tx(
                "Objectif : réduire les risques opératoires, améliorer la qualité des soins et renforcer l'innovation autour des dispositifs médicaux implantables, à travers quatre plateformes complémentaires.",
                "Goal: reduce surgical risk, improve care quality and strengthen innovation around implantable medical devices, through four complementary platforms.",
              )}
            </p>
            <ul className="mt-4 grid max-w-2xl gap-2.5 text-sm text-white/70 sm:grid-cols-2">
              {platforms.map((p) => (
                <li key={p} className="rounded-lg border border-white/10 bg-white/5 p-3 leading-relaxed">{p}</li>
              ))}
            </ul>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {equipment.map((eq) => (
                <div key={eq.src} className="overflow-hidden rounded-xl border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={eq.src} alt={eq.alt} className="aspect-[4/3] w-full object-cover" />
                  <div className="bg-brand-950 px-3 py-2.5">
                    <p className="text-xs font-semibold text-white/90">{eq.caption}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-white/55">{eq.desc}</p>
                  </div>
                </div>
              ))}
            </div>
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

      <div className="mt-10">
        <p className="mono-label-brand text-center">{tx("Nos institutions publiques", "Our public institutions")}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {publicFunders.map((f) => (
            <div key={f.name} className="card flex flex-col p-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.logo} alt={f.name} className="h-12 w-auto max-w-[220px] object-contain object-left" />
              <h3 className="mt-4 text-base font-semibold text-brand-700">{f.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{f.desc}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">{f.rationale}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Acknowledgements */}
      <Reveal>
        <div className="mt-10 rounded-2xl border border-line bg-paper p-6 text-center sm:p-8">
          <p className="mono-label-brand">{tx("Remerciements", "Acknowledgements")}</p>
          <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-ink-soft">
            {tx(
              "Un grand merci à nos partenaires institutionnels et financiers — la Région Grand Est, l'Union européenne, l'Eurométropole de Strasbourg et la Collectivité européenne d'Alsace — pour leur soutien essentiel au développement de nos projets.",
              "Warm thanks to our institutional and financial partners — the Grand Est Region, the European Union, the Eurométropole de Strasbourg and the Collectivité européenne d'Alsace — for their essential support in developing our projects.",
            )}
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
            {tx(
              "Leur confiance et leur engagement nous permettent d'investir dans des outils innovants, de renforcer nos programmes de formation et de contribuer à l'excellence des soins, au bénéfice de la sécurité des patients.",
              "Their trust and commitment let us invest in innovative tools, strengthen our training programs and contribute to excellence in care, for the benefit of patient safety.",
            )}
          </p>
        </div>
      </Reveal>

      {/* Shared vision */}
      <div className="mt-10 text-center">
        <p className="mono-label-brand">{tx("Une vision partagée", "A shared vision")}</p>
        <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-ink-soft">
          {tx(
            "Ces investissements traduisent une volonté commune : favoriser l'accès à une formation de qualité, accompagner la transformation des pratiques professionnelles et soutenir l'innovation au service des patients, des praticiens et de la société.",
            "These investments reflect a shared ambition: to widen access to quality training, support the transformation of professional practice, and back innovation for the benefit of patients, practitioners and society.",
          )}
        </p>
      </div>
    </DocPage>
  );
}
