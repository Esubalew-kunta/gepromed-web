"use client";

import { useState } from "react";
import { DocPage } from "@/components/DocPage";
import { Accordion } from "@/components/ui/Accordion";
import { useLang } from "@/lib/i18n";

function IconDownload({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path d="M12 4v11m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 18.5h14" strokeLinecap="round" />
    </svg>
  );
}

export default function QualityPage() {
  const { lang } = useLang();
  const tx = (fr: string, en: string) => (lang === "fr" ? fr : en);
  const [policyOpen, setPolicyOpen] = useState(false);

  const indicators: [string, string][] = [
    ["96%", tx("satisfaction moyenne", "average satisfaction")],
    ["+1150", tx("praticiens formés depuis 2018", "practitioners trained since 2018")],
    ["100%", tx("formations certifiantes", "certifying trainings")],
  ];

  const certifications = [
    {
      logo: "/brand/certifications/iso-9001.jpg",
      name: "ISO 9001",
      desc: tx(
        "Certifie la qualité de l'ensemble des processus de l'organisation.",
        "Certifies the quality of all the organization's processes.",
      ),
      file: "/documents/certificat-iso-9001.pdf",
    },
    {
      logo: "/brand/certifications/iso-13485.jpg",
      name: "ISO 13485",
      desc: tx(
        "Couvre la conception et les essais réalisés par la plateforme d'ingénierie technologique, conformément aux exigences applicables aux dispositifs médicaux.",
        "Covers the design and testing carried out by the technological engineering platform, in line with medical-device requirements.",
      ),
      file: "/documents/certificat-iso-13485.pdf",
    },
    {
      logo: "/brand/certifications/qualiopi.jpg",
      name: "Qualiopi",
      desc: tx(
        "Obtenue par notre centre de formation en 2022, elle atteste de la qualité du processus mis en œuvre pour nos actions de formation.",
        "Awarded to our training center in 2022, it attests to the quality of the process behind our training programs.",
      ),
      file: "/documents/certificat-qualiopi.pdf",
    },
  ];

  const faq = [
    {
      title: tx("Qu'est-ce que la certification Qualiopi ?", "What is Qualiopi certification?"),
      content: tx(
        "Qualiopi atteste de la qualité du processus mis en œuvre par les prestataires d'actions de formation. Elle repose sur un référentiel national unique.",
        "Qualiopi attests to the quality of the process implemented by training providers. It is based on a single national framework.",
      ),
    },
    {
      title: tx("Comment sont suivis les indicateurs ?", "How are indicators tracked?"),
      content: tx(
        "Pour chaque session, nous collectons la satisfaction, les taux de réussite et les preuves de formation, revus par la responsable qualité avant publication.",
        "For each session we collect satisfaction, pass rates and training evidence, reviewed by the quality manager before publication.",
      ),
    },
    {
      title: tx("Vos formations sont-elles accessibles ?", "Are your trainings accessible?"),
      content: tx(
        "Nous étudions chaque situation de handicap afin d'adapter l'accueil et les conditions de formation. Contactez notre référent handicap.",
        "We review each disability situation to adapt reception and training conditions. Contact our accessibility officer.",
      ),
    },
  ];

  return (
    <DocPage
      eyebrow={{ fr: "À propos", en: "About us" }}
      title={{ fr: "Qualité", en: "Quality" }}
      intro={{
        fr: "Gepromed est certifié Qualiopi. La qualité et l'amélioration continue sont au cœur de notre démarche de formation.",
        en: "Gepromed is Qualiopi certified. Quality and continuous improvement are at the heart of our training approach.",
      }}
    >
      {/* Quality statement + image, side by side */}
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <p className="mono-label-brand">{tx("Notre engagement", "Our commitment")}</p>
          <p className="mt-3 leading-relaxed text-ink-soft">
            {tx(
              "Les activités de Gepromed sont certifiées ISO 9001, garantissant la qualité de nos processus. Par ailleurs, les processus de conception et d'essais de notre plateforme d'ingénierie technologique sont conformes à la norme ISO 13485, assurant le respect des exigences qualité applicables aux dispositifs médicaux. Enfin, notre centre de formation est certifié Qualiopi, témoignant de notre engagement à dispenser des formations de haute qualité.",
              "GEPROMED's activities are ISO 9001 certified, ensuring the quality of our processes. Additionally, the design and testing processes within our Technological Engineering platform comply with ISO 13485, ensuring adherence to quality requirements for medical devices. Finally, our training center holds the Qualiopi certification, demonstrating our commitment to providing high-quality training.",
            )}
          </p>
        </div>
        <div className="overflow-hidden rounded-xl2 border border-line shadow-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/photos/about/quality.jpg"
            alt={tx("Démarche qualité et contrôle des dispositifs médicaux chez Gepromed", "Quality process and medical-device inspection at Gepromed")}
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
      </div>

      <div className="mt-10 grid grid-cols-3 gap-4">
        {indicators.map(([n, l]) => (
          <div key={l} className="card p-5 text-center">
            <p className="text-3xl font-semibold text-brand-700">{n}</p>
            <p className="mt-1 text-xs text-ink-muted">{l}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-2xl">{tx("Nos certifications", "Our certifications")}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
        {tx(
          "Trois référentiels indépendants encadrent nos activités, de la formation à l'ingénierie technologique.",
          "Three independent frameworks govern our activities, from training to technological engineering.",
        )}
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {certifications.map((c) => (
          <div key={c.name} className="card flex flex-col items-center p-6 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.logo} alt={c.name} className="h-20 w-auto object-contain" />
            <h3 className="mt-4 text-base font-semibold text-brand-700">{c.name}</h3>
            <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-soft">{c.desc}</p>
            <a
              href={c.file}
              target="_blank"
              rel="noreferrer"
              download
              className="btn-ghost group mt-5 w-full text-sm"
            >
              <IconDownload className="h-4 w-4 transition group-hover:-translate-y-0.5" />
              {tx("Télécharger le certificat", "Download certificate")}
            </a>
          </div>
        ))}
      </div>
      {/* Quality policy — collapsible full text */}
      <div className="mt-10 overflow-hidden rounded-xl2 border border-line bg-white">
        <button
          onClick={() => setPolicyOpen((v) => !v)}
          aria-expanded={policyOpen}
          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-mist"
        >
          <span>
            <span className="block text-lg font-semibold text-ink">
              {tx("Notre politique qualité", "Our quality policy")}
            </span>
            <span className="mt-0.5 block text-xs text-ink-muted">
              {tx("Indice de révision F · 17 février 2026", "Revision index F · 17 February 2026")}
            </span>
          </span>
          <span
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-brand-600 transition-transform duration-300 ${
              policyOpen ? "rotate-180 bg-brand-50" : ""
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>

        <div
          className={`grid transition-all duration-300 ease-out ${
            policyOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="space-y-4 border-t border-line px-6 py-6 leading-relaxed text-ink-soft">
              <p className="text-sm text-ink-muted">
                {tx(
                  "La présente politique qualité est diffusée sous l'indice de révision F daté du 17 février 2026.",
                  "This quality policy is issued under Revision index F dated February 17, 2026.",
                )}
              </p>
              <p>
                {tx(
                  "GEPROMED est une organisation à but non lucratif dédiée à l'expertise et à la recherche sur les dispositifs médicaux dans toutes les disciplines médico-chirurgicales (vasculaire, ophtalmologie, neurochirurgie, orthopédie, chirurgie de la main, urologie, chirurgie digestive, gynécologie, etc.).",
                  "GEPROMED is a non-profit organization dedicated to medical device expertise and research in all medical-surgical disciplines (vascular, ophthalmology, neurosurgery, orthopedics, hand surgery, urology, digestive surgery, gynecology, etc.).",
                )}
              </p>
              <p>
                {tx(
                  "Son histoire d'activité et ses réalisations scientifiques en font un acteur reconnu à l'international. L'organisation a en effet la particularité de se positionner au carrefour entre les académiques (mécanique, textile, informatique et mathématiques) et les cliniciens, ce qui lui confère une dimension pluridisciplinaire. Notre ambition est de faire de GEPROMED un acteur clé dans ses domaines d'expertise, qui sont :",
                  "Its history of activity and scientific achievement make it an internationally recognized actor. Indeed, the organization has the distinction of being positioned at the crossroads between academics (mechanics, textiles, IT and mathematics) and clinicians, which gives it a multidisciplinary dimension. Our aim is to make GEPROMED a key player in its fields of expertise, which are:",
                )}
              </p>
              <ul className="ml-1 space-y-2">
                {[
                  tx(
                    "L'analyse des dispositifs médicaux implantables, non implantés ou explantés,",
                    "Analysis of implantable medical devices, non-implanted or explanted,",
                  ),
                  tx(
                    "L'expertise et les essais pour le compte des fabricants, afin d'évaluer la performance mécanique des dispositifs médicaux et des matériaux qui les composent,",
                    "Expertise and testing on behalf of manufacturers, to assess the mechanical performance of medical devices and their component materials,",
                  ),
                  tx(
                    "Le développement de projets innovants et d'études cliniques,",
                    "Development of innovative projects and clinical studies,",
                  ),
                  tx(
                    "La conception et la mise en œuvre de programmes de formation pour les professionnels de santé. Ces formations s'inscrivent dans une dimension de gestion du risque, car elles reposent essentiellement sur la pratique et l'utilisation de simulateurs dans un environnement médico-technique.",
                    "The conception and implementation of training programs for healthcare professionals. These training programs are part of the risk management dimension, as they are essentially based on the practice and the use of simulators in a medical-technical environment.",
                  ),
                ].map((li) => (
                  <li key={li} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" aria-hidden="true" />
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
              <p>
                {tx(
                  "Notre structure est certifiée Qualiopi pour la catégorie « actions de formation » depuis 2022.",
                  "Our structure has been certified Qualiopi for the \"training activities\" category since 2022.",
                )}
              </p>
              <p>
                {tx(
                  "La structure dispose de ses propres équipements et d'instruments spécifiques. Dans ce contexte, la mise en œuvre d'un système qualité efficace et opérationnel conforme aux critères ISO 9001 pour l'ensemble des plateformes, et ISO 13485 pour la conception et la réalisation des essais, nous permet de :",
                  "The structure has its own equipment and specific instruments. In this context, the implementation of an effective and operational quality system in line with the ISO 9001 criteria for all platforms, and ISO 13485 for the conception and implementation of tests, enables us to:",
                )}
              </p>
              <ul className="ml-1 space-y-2">
                {[
                  tx(
                    "Développer un positionnement et une offre répondant aux exigences de tous les acteurs de notre chaîne de valeur,",
                    "Develop a corporate positioning and offering that meet the requirements of all actors in our value chain,",
                  ),
                  tx("Produire des prestations conformes,", "Produce compliant services,"),
                  tx(
                    "Accroître et sécuriser nos compétences et nos moyens d'action.",
                    "Increase and secure our skills and means of action.",
                  ),
                ].map((li) => (
                  <li key={li} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" aria-hidden="true" />
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
              <p>
                {tx(
                  "Cette politique est cohérente avec la stratégie et les valeurs de GEPROMED :",
                  "This policy is consistent with GEPROMED's strategy and values:",
                )}
              </p>
              <ul className="ml-1 space-y-2">
                {[
                  tx("Éthique et humaniste : promouvoir des soins sûrs pour les patients, par la prévention des risques,", "Ethical and Humanistic: to promote safe care for patients, through risk prevention,"),
                  tx("Indépendance et transparence,", "Independence and Transparency,"),
                  tx("Ouverture et partage.", "Openness and Sharing."),
                ].map((li) => (
                  <li key={li} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" aria-hidden="true" />
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
              <p>
                {tx(
                  "Elle intègre l'engagement de satisfaire à l'ensemble des exigences et de maintenir et améliorer en continu l'efficacité du système de management de la qualité. Elle comprend également l'engagement de se conformer à la législation applicable en matière de protection des données, en sensibilisant les collaborateurs au Règlement général sur la protection des données (RGPD), en mettant en place des procédures internes adaptées et en assurant la sécurité des données personnelles traitées (recherche, expertise, formation, gestion administrative, etc.). Elle est ensuite déclinée en objectifs et indicateurs pour chaque processus.",
                  "It includes the commitment to satisfy all requirements and to maintain and continuously improve the effectiveness of the Quality Management System. It also includes a commitment to comply with applicable data protection legislation by raising employee awareness of the General Data Protection Regulation (GDPR), implementing appropriate internal procedures, and ensuring the security of the personal data processed (research, expertise, training, administrative management, etc.). It is then broken down into objectives and indicators for each process.",
                )}
              </p>
              <p>
                {tx(
                  "Cette politique est communiquée à l'ensemble des collaborateurs. Elle fait partie de notre formation interne sur le système de management de la qualité. Sa compréhension est régulièrement vérifiée par la Responsable Qualité, lors des entretiens annuels et des audits internes. Des revues de direction semestrielles vérifient que la politique qualité est constamment à jour et peuvent fixer de nouveaux objectifs en fonction de l'évolution de l'environnement (économique, technique, réglementaire, exigences, climat, etc.).",
                  "This policy is communicated to all employees. It forms part of our internal training on the Quality Management System. Its understanding is regularly verified by the Quality Manager, during annual performance reviews and during internal audits. Biannual management reviews check that the Quality Policy is constantly up to date and may set new objectives in line with changes in the environment (economic, technical, regulatory, demands, climate, etc.).",
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="mt-10 text-2xl">{tx("Questions fréquentes", "Frequent questions")}</h2>
      <div className="mt-5">
        <Accordion allowMultiple items={faq} />
      </div>
    </DocPage>
  );
}
