"use client";

import { DocPage } from "@/components/DocPage";
import { CookieSettingsLink } from "@/components/CookieConsent";
import { useLang } from "@/lib/i18n";

function IconCheck({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PrivacyPage() {
  const { lang } = useLang();
  const tx = (fr: string, en: string) => (lang === "fr" ? fr : en);

  const toc = [
    { id: "introduction", label: tx("Introduction", "Introduction") },
    { id: "collecte", label: tx("Collecte et traitement", "Collection & processing") },
    { id: "donnees", label: tx("Nature des données", "Nature of the data") },
    { id: "responsable", label: tx("Responsable & DPO", "Data controller & DPO") },
    { id: "droits", label: tx("Vos droits", "Your rights") },
    { id: "cookies", label: tx("Cookies et traceurs", "Cookies & trackers") },
    { id: "modifications", label: tx("Modifications", "Modifications") },
  ];

  const dataRows = [
    {
      processing: tx("Inscription à une formation", "Training registration"),
      collected: tx(
        "Identité, coordonnées, contraintes alimentaires, questions éventuelles.",
        "Identity, contact details, dietary constraints, any questions.",
      ),
      retention: tx(
        "Durée de la formation, puis 5 ans (obligations légales).",
        "Duration of the training, then 5 years (legal obligations).",
      ),
    },
    {
      processing: tx("Inscription à un congrès", "Congress registration"),
      collected: tx(
        "Données recueillies via un site externe (congres-esvb.pourdevrai.events).",
        "Data collected via an external site (congres-esvb.pourdevrai.events).",
      ),
      retention: tx("3 ans après l'événement.", "3 years after the event."),
    },
    {
      processing: tx("Adhésion et dons", "Membership & donations"),
      collected: tx(
        "Nom, coordonnées et informations de paiement, via la plateforme HelloAsso.",
        "Name, contact details and payment information, via the HelloAsso platform.",
      ),
      retention: tx(
        "3 ans après l'adhésion ; 6 ans minimum pour les dons (justificatifs fiscaux).",
        "3 years after membership; minimum 6 years for donations (tax records).",
      ),
    },
  ];

  const rights = [
    tx("Droit d'accès, de rectification et d'effacement.", "Right of access, rectification and erasure."),
    tx("Droit à la portabilité de vos données dans un format standard.", "Right to data portability in a standard format."),
    tx("Droit de limitation et d'opposition au traitement.", "Right to restrict and object to processing."),
    tx("Droit de ne pas faire l'objet d'une décision entièrement automatisée.", "Right not to be subject to a solely automated decision."),
    tx("Droit de définir le sort de vos données après votre décès.", "Right to determine the fate of your data after your death."),
    tx("Droit de saisir la CNIL ou le juge compétent en cas de refus de votre demande.", "Right to refer the matter to the CNIL or the competent judge if a request is refused."),
  ];

  const offices = [
    {
      label: tx("Bureaux administratifs", "Administrative offices"),
      address: "Bâtiment d'Anesthésiologie, 1 place de l'Hôpital, 67085 Strasbourg",
    },
    {
      label: tx("Centre d'éducation", "Education center"),
      address: "Bâtiment eXplora, 2 rue Marie Hamm, 67000 Strasbourg",
    },
  ];

  return (
    <DocPage
      eyebrow={{ fr: "À propos", en: "About us" }}
      title={{ fr: "Politique de confidentialité", en: "Privacy policy" }}
      intro={{
        fr: "Nous traitons vos données personnelles dans le respect du RGPD, avec transparence et validation humaine.",
        en: "We process your personal data in compliance with the GDPR, with transparency and human validation.",
      }}
    >
      <p className="pill mb-8 bg-brand-50 text-brand-700">
        {tx("Dernière mise à jour : 11 juin 2025", "Last updated: 11 June 2025")}
      </p>

      {/* On this page */}
      <nav className="mb-10 rounded-xl2 border border-line bg-paper p-5">
        <p className="mono-label-brand">{tx("Sur cette page", "On this page")}</p>
        <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {toc.map((t) => (
            <li key={t.id}>
              <a href={`#${t.id}`} className="group inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-brand-700">
                <IconArrow className="h-3.5 w-3.5 text-brand-400 transition group-hover:translate-x-0.5" />
                {t.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-12">
        {/* Introduction */}
        <section id="introduction" className="scroll-mt-24">
          <h2 className="text-2xl">{tx("Introduction", "Introduction")}</h2>
          <div className="mt-3 space-y-4 leading-relaxed text-ink-soft">
            <p>
              {tx(
                "La présente politique s'applique au site gepromed.com, édité par l'association Gepromed. Elle décrit les données personnelles que nous collectons, les finalités de leur traitement, leurs destinataires, la durée de conservation, vos droits et notre usage des cookies.",
                "This policy applies to the gepromed.com website, published by the Gepromed association. It describes the personal data we collect, the purposes of its processing, its recipients, retention periods, your rights and our use of cookies.",
              )}
            </p>
            <p>
              {tx(
                "Elle complète les mentions légales, disponibles séparément. En utilisant ce site, vous reconnaissez avoir pris connaissance de cette politique.",
                "It supplements the legal notice, available separately. By using this site, you acknowledge that you have read this policy.",
              )}
            </p>
          </div>
        </section>

        {/* Collection & processing */}
        <section id="collecte" className="scroll-mt-24">
          <h2 className="text-2xl">{tx("Collecte et traitement des données", "Collection and processing of data")}</h2>
          <div className="mt-3 space-y-4 leading-relaxed text-ink-soft">
            <p>
              {tx(
                "Nos traitements respectent les principes de l'article 5 du RGPD : licéité, loyauté et transparence, finalités déterminées, minimisation des données, conservation limitée dans le temps, intégrité et confidentialité.",
                "Our processing follows the principles of Article 5 of the GDPR: lawfulness, fairness and transparency, specified purposes, data minimization, time-limited storage, integrity and confidentiality.",
              )}
            </p>
            <p>
              {tx(
                "Conformément à l'article 6, la base légale de nos traitements est votre consentement libre et éclairé (ou celui de votre représentant légal), sauf lorsqu'un contrat ou une obligation légale le justifie.",
                "In accordance with Article 6, the legal basis for our processing is your free and informed consent (or that of your legal guardian), unless a contract or legal obligation requires otherwise.",
              )}
            </p>
          </div>
        </section>

        {/* Nature of the data */}
        <section id="donnees" className="scroll-mt-24">
          <h2 className="text-2xl">{tx("Nature des données", "Nature of the data")}</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            {tx(
              "Selon le service concerné, nous collectons les données suivantes, pour les finalités et durées indiquées :",
              "Depending on the service concerned, we collect the following data, for the purposes and periods indicated:",
            )}
          </p>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="bg-mist text-left">
                  <th className="px-4 py-3 font-semibold text-ink">{tx("Traitement", "Processing")}</th>
                  <th className="px-4 py-3 font-semibold text-ink">{tx("Données collectées", "Data collected")}</th>
                  <th className="px-4 py-3 font-semibold text-ink">{tx("Conservation", "Retention")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {dataRows.map((r) => (
                  <tr key={r.processing} className="align-top">
                    <td className="px-4 py-3 font-medium text-ink">{r.processing}</td>
                    <td className="px-4 py-3 text-ink-soft">{r.collected}</td>
                    <td className="px-4 py-3 text-ink-soft">{r.retention}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="card p-5">
              <p className="mono-label-brand">{tx("Destinataires", "Recipients")}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {tx(
                  "Sous-traitants informatiques (Codein, Montpellier), suite bureautique pour la messagerie et l'organisation, et sponsors des formations. Aucune donnée n'est transférée hors de l'Union européenne.",
                  "IT subcontractors (Codein, Montpellier), an office suite for email and organization, and training sponsors. No data is transferred outside the European Union.",
                )}
              </p>
            </div>
            <div className="card p-5">
              <p className="mono-label-brand">{tx("Hébergement", "Hosting")}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {tx(
                  "Les données personnelles transmises par e-mail transitent par le relais SMTP Brevo et sont stockées sur ses serveurs.",
                  "Personal data sent by email passes through the Brevo SMTP relay and is stored on its servers.",
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Controller & DPO */}
        <section id="responsable" className="scroll-mt-24">
          <h2 className="text-2xl">{tx("Responsable du traitement et DPO", "Data controller and DPO")}</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-brand-200 bg-brand-50/60 p-6">
              <p className="mono-label-brand">{tx("Responsable du traitement", "Data controller")}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {tx(
                  "Association Gepromed, représentée par Pr. Nabil Chakfé, Président.",
                  "Gepromed association, represented by Pr. Nabil Chakfé, President.",
                )}
              </p>
              <p className="mt-2 text-sm font-medium text-brand-700">+33 (0)3 68 85 40 94</p>
            </div>
            <div className="rounded-2xl border border-brand-200 bg-brand-50/60 p-6">
              <p className="mono-label-brand">{tx("Délégué à la protection des données", "Data Protection Officer")}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {tx(
                  "Mme Laetitia Schmuck, désignée auprès de la CNIL.",
                  "Mrs. Laetitia Schmuck, appointed to the CNIL.",
                )}
              </p>
              <a href="mailto:dpo@gepromed.com" className="mt-2 inline-block text-sm font-medium text-brand-700 hover:text-brand-800">
                dpo@gepromed.com
              </a>
            </div>
          </div>
          <p className="mt-5 leading-relaxed text-ink-soft">
            {tx(
              "En tant que responsable du traitement, Gepromed s'engage à :",
              "As data controller, Gepromed undertakes to:",
            )}
          </p>
          <ul className="mt-3 space-y-2">
            {[
              tx(
                "Déterminer les finalités et les moyens des traitements de données mis en œuvre.",
                "Determine the purposes and means of the data processing carried out.",
              ),
              tx(
                "Protéger les données collectées et en restreindre le partage à des tiers.",
                "Protect the data collected and restrict its sharing with third parties.",
              ),
              tx(
                "Informer les utilisateurs des rectifications ou suppressions de leurs données.",
                "Notify users of any rectification or deletion of their data.",
              ),
              tx(
                "Notifier toute violation de sécurité susceptible de présenter un risque pour l'utilisateur.",
                "Report any security breach likely to present a risk to the user.",
              ),
            ].map((li) => (
              <li key={li} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" aria-hidden="true" />
                <span>{li}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Your rights */}
        <section id="droits" className="scroll-mt-24">
          <h2 className="text-2xl">{tx("Vos droits", "Your rights")}</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            {tx(
              "Conformément aux articles 15 à 22 du RGPD, vous disposez des droits suivants :",
              "In accordance with Articles 15 to 22 of the GDPR, you have the following rights:",
            )}
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {rights.map((r) => (
              <li key={r} className="flex gap-3 rounded-xl border border-line bg-white p-4">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-50">
                  <IconCheck className="h-4 w-4 text-brand-700" />
                </span>
                <span className="text-sm leading-relaxed text-ink-soft">{r}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 card p-6">
            <p className="mono-label-brand">{tx("Comment les exercer", "How to exercise them")}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {tx(
                "Adressez votre demande au DPO par e-mail à dpo@gepromed.com, ou par courrier à : Association Gepromed / Confidentialité, 4 rue Kirschleger, 67000 Strasbourg, France. Joignez vos nom, e-mail et une copie d'une pièce d'identité. Une réponse vous sera apportée dans un délai maximum de 30 jours.",
                "Send your request to the DPO by email at dpo@gepromed.com, or by post to: Association Gepromed / Confidentialité, 4 rue Kirschleger, 67000 Strasbourg, France. Include your name, email and a copy of an identity document. A response will be provided within a maximum of 30 days.",
              )}
            </p>
            <a
              href="https://www.cnil.fr/fr/plaintes"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:text-brand-800"
            >
              {tx("Déposer une plainte auprès de la CNIL", "File a complaint with the CNIL")}
              <IconArrow className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* Cookies */}
        <section id="cookies" className="scroll-mt-24">
          <h2 className="text-2xl">{tx("Cookies et traceurs", "Cookies and trackers")}</h2>
          <div className="mt-3 space-y-4 leading-relaxed text-ink-soft">
            <p>
              {tx(
                "Des traceurs (cookies, pixels, empreintes) peuvent être déposés sur votre terminal pour mesurer l'audience, mémoriser vos préférences et analyser la navigation. Votre consentement est recueilli lors de votre première visite ; il est valable 13 mois au maximum, puis à nouveau sollicité.",
                "Trackers (cookies, pixels, fingerprints) may be placed on your device to measure audience, remember your preferences and analyze browsing. Your consent is collected on your first visit; it is valid for a maximum of 13 months, then requested again.",
              )}
            </p>
            <p>
              {tx(
                "Vous pouvez modifier votre choix à tout moment via le panneau de gestion des cookies, ou depuis les réglages de votre navigateur. Ce site peut utiliser des cookies YouTube et des boutons de partage vers les réseaux sociaux, soumis à leurs propres politiques de confidentialité.",
                "You can change your choice at any time via the cookie management panel, or from your browser settings. This site may use YouTube cookies and social-network sharing buttons, which are subject to their own privacy policies.",
              )}
            </p>
          </div>
          <CookieSettingsLink className="btn-ghost mt-5 text-sm" />
        </section>

        {/* Modifications */}
        <section id="modifications" className="scroll-mt-24">
          <h2 className="text-2xl">{tx("Modifications de la politique", "Modifications to the policy")}</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            {tx(
              "Cette politique peut être modifiée afin de rester conforme à la législation. Nous vous invitons à la consulter régulièrement ; les changements majeurs vous seront communiqués par e-mail. Dernière mise à jour : 11 juin 2025.",
              "This policy may be amended to remain compliant with legislation. We encourage you to consult it regularly; major changes will be communicated to you by email. Last updated: 11 June 2025.",
            )}
          </p>
        </section>

        {/* Contact / offices */}
        <section className="scroll-mt-24">
          <h2 className="text-2xl">{tx("Nous contacter", "Contact us")}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {offices.map((o) => (
              <div key={o.label} className="card p-5">
                <p className="mono-label-brand">{o.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{o.address}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DocPage>
  );
}
