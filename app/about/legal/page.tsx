"use client";

import { DocPage, Prose } from "@/components/DocPage";
import { useLang } from "@/lib/i18n";

export default function LegalPage() {
  const { lang } = useLang();
  const tx = (fr: string, en: string) => (lang === "fr" ? fr : en);

  const rows: [string, React.ReactNode][] = [
    [tx("Éditeur", "Publisher"), "Gepromed"],
    [
      tx("Statut", "Legal status"),
      tx(
        "Association inscrite au Registre des associations de Strasbourg (Volume LXIIX, n° 78), régie par les articles 21 à 79 du Code civil local.",
        "Association registered in the Register of Associations of Strasbourg (Volume LXIIX, No. 78), governed by articles 21 to 79 of the French Civil Code.",
      ),
    ],
    [
      tx("Siège social", "Registered office"),
      <>4 rue Kirschleger, 67000 Strasbourg, France</>,
    ],
    [tx("SIRET", "SIRET"), "413 781 428 00037"],
    [tx("N° TVA", "VAT number"), "FR85413781428"],
    [
      tx("Directeur de la publication", "Publication director"),
      tx("Pr. Nabil Chakfé, Président de Gepromed", "Pr. Nabil Chakfé, President of Gepromed"),
    ],
    [
      tx("Contact", "Contact"),
      <>
        contact@gepromed.fr
        <br />
        +33 (0)3 68 85 40 94
      </>,
    ],
    [
      tx("Hébergement", "Hosting"),
      <>gepromed.com</>,
    ],
  ];

  const offices = [
    {
      label: tx("Bureaux administratifs", "Administrative offices"),
      address: tx(
        "Bâtiment d'Anesthésiologie, 1 place de l'Hôpital, 67085 Strasbourg",
        "Bâtiment d'Anesthésiologie, 1 place de l'Hôpital, 67085 Strasbourg",
      ),
      map: "https://maps.google.com/?q=1+place+de+l'Hôpital+67085+Strasbourg",
    },
    {
      label: tx("Centre d'éducation", "Education center"),
      address: tx(
        "Bâtiment eXplora, 2 rue Marie Hamm, 67000 Strasbourg",
        "Bâtiment eXplora, 2 rue Marie Hamm, 67000 Strasbourg",
      ),
      map: "https://maps.google.com/?q=2+rue+Marie+Hamm+67000+Strasbourg",
    },
  ];

  return (
    <DocPage
      eyebrow={{ fr: "À propos", en: "About us" }}
      title={{ fr: "Mentions légales", en: "Legal notice" }}
      intro={{
        fr: "Conformément aux obligations légales en vigueur, cette page présente l'éditeur du site, son hébergement et ses conditions d'utilisation. Nous vous invitons à en prendre connaissance attentivement.",
        en: "In accordance with current legal requirements, this page provides information about the website publisher, hosting, and terms of use. We invite you to read it carefully.",
      }}
      heroImage={{
        src: "/photos/about/legal.jpg",
        alt: tx("Mentions légales Gepromed", "Gepromed legal notice"),
      }}
    >
      <div className="overflow-hidden rounded-2xl border border-line">
        <table className="w-full text-sm">
          <tbody className="divide-y divide-line">
            {rows.map(([k, v], i) => (
              <tr key={i}>
                <td className="w-1/3 bg-mist px-4 py-3 font-medium text-ink">{k}</td>
                <td className="px-4 py-3 text-ink-soft">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Prose>
        <h2 className="mt-8">{tx("Propriété intellectuelle", "Intellectual property")}</h2>
        <p>
          {tx(
            "Le site gepromed.com est la propriété de Gepromed. L'ensemble de ses contenus (textes, visuels, logos) est protégé ; toute reproduction sans autorisation est interdite.",
            "The gepromed.com website is the property of Gepromed. All of its content (text, images, logos) is protected; any reproduction without authorization is prohibited.",
          )}
        </p>
        <h2 className="mt-6">{tx("Protection des données", "Data protection")}</h2>
        <p>
          {tx(
            "Les traitements de données personnelles réalisés via ce site sont décrits dans notre politique de confidentialité.",
            "The processing of personal data carried out via this site is described in our privacy policy.",
          )}
        </p>
      </Prose>

      <h2 className="mt-8 text-2xl">{tx("Nous trouver", "Where to find us")}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {offices.map((o) => (
          <div key={o.label} className="card p-5">
            <p className="mono-label-brand">{o.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{o.address}</p>
            <a
              href={o.map}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:text-brand-800"
            >
              {tx("Voir sur la carte", "View on map")}
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </DocPage>
  );
}
