"use client";

import { EngineeringExplorer } from "@/components/EngineeringExplorer";
import { useLang } from "@/lib/i18n";
import { EXPLANT_ITEMS, TESTING_ITEMS, RENTAL_ITEMS } from "@/lib/engineering";

export default function EngineeringPage() {
  const { lang } = useLang();
  const tx = (fr: string, en: string) => (lang === "fr" ? fr : en);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-brand-800 bg-brand-950 text-white">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="container-page relative py-16 sm:py-20">
          <p className="mono-label text-brand-200">
            {tx("Plateforme 01 · Ingénierie & essais", "Platform 01 · Engineering & testing")}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl text-white sm:text-5xl">
            {tx("Engineering", "Engineering")}
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/70">
            {tx(
              "Analyse d'explants, plateforme d'essais et location d'équipements : un plateau technique complet pour évaluer la sécurité et la performance des dispositifs médicaux, du prototype au retour clinique.",
              "Explant analysis, testing platform and equipment rental: a complete technical facility to assess the safety and performance of medical devices, from prototype to clinical feedback.",
            )}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="pill border border-white/15 bg-white/5 font-mono text-[0.68rem] uppercase tracking-annotation text-brand-200">
              ISO 9001 · 13485
            </span>
            <span className="pill border border-white/15 bg-white/5 font-mono text-[0.68rem] uppercase tracking-annotation text-brand-200">
              ISO 7198
            </span>
          </div>
        </div>
      </section>

      {/* Band 1 · Explant Analysis */}
      <Band
        index="01"
        eyebrow={tx("Analyse d'explant", "Explant analysis")}
        title={tx("Analyse d'explant", "Explant Analysis")}
        intro={tx(
          "Faites analyser un dispositif explanté ou tout autre échantillon par notre plateau d'expertise en biomatériaux.",
          "Have an explanted device or any other sample analyzed by our biomaterials expertise platform.",
        )}
        image="/photos/engineering/dsc0078.jpg"
        imageAlt={tx("Analyse d'un dispositif explanté par imagerie", "Explanted device analysis by imaging")}
      >
        <EngineeringExplorer items={EXPLANT_ITEMS} />
      </Band>

      {/* Band 2 · Testing platform */}
      <Band
        index="02"
        eyebrow={tx("Essais & caractérisation", "Testing & characterization")}
        title={tx("Plateforme d'essais", "Testing platform")}
        intro={tx(
          "Des essais mécaniques, hydrodynamiques et d'imagerie conformes aux normes applicables aux dispositifs implantables.",
          "Mechanical, hydrodynamic and imaging testing aligned with standards for implantable devices.",
        )}
        tone="muted"
        image="/photos/engineering/dsc5039.jpg"
        imageAlt={tx("Banc d'essai sur-mesure de la plateforme technologique", "Custom test bench at the technological platform")}
      >
        <EngineeringExplorer items={TESTING_ITEMS} />
      </Band>

      {/* Band 3 · Equipment Rental */}
      <Band
        index="03"
        eyebrow={tx("Location", "Rental")}
        title={tx("Location d'équipements", "Equipment Rental")}
        intro={tx(
          "Réservez nos plateaux techniques et équipements pour vos propres campagnes. Indiquez la date souhaitée dans votre demande.",
          "Book our technical platforms and equipment for your own campaigns. Provide your desired date in the request.",
        )}
        image="/photos/engineering/dsc0025.jpg"
        imageAlt={tx("Équipement de mesure du plateau technique", "Measurement equipment on the technical platform")}
      >
        <EngineeringExplorer items={RENTAL_ITEMS} requireDate />
      </Band>
    </>
  );
}

function Band({
  index,
  eyebrow,
  title,
  intro,
  tone = "default",
  image,
  imageAlt,
  children,
}: {
  index: string;
  eyebrow: string;
  title: string;
  intro: string;
  tone?: "default" | "muted";
  image?: string;
  imageAlt?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={tone === "muted" ? "border-t border-line bg-white" : "border-t border-line bg-paper"}>
      <div className="container-page py-14">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div className="flex items-start gap-4">
            <span className="stat-figure mt-1 text-2xl font-semibold text-brand-200">{index}</span>
            <div>
              <p className="mono-label-brand">{eyebrow}</p>
              <h2 className="mt-2 text-3xl">{title}</h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">{intro}</p>
            </div>
          </div>
          {image && (
            <div className="tick-frame overflow-hidden rounded-xl2 border border-line shadow-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt={imageAlt || ""} className="h-56 w-full object-cover lg:h-64" />
            </div>
          )}
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
