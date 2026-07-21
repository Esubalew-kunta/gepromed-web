"use client";

import Link from "next/link";
import { useLang, useT, loc } from "@/lib/i18n";
import { Accordion } from "@/components/ui/Accordion";
import { ImplantCycle } from "@/components/ImplantCycle";
import { HISTORY, PARTNERS } from "@/lib/content";

export default function AboutPage() {
  const { lang } = useLang();
  const t = useT();
  const tx = (fr: string, en: string) => (lang === "fr" ? fr : en);

  const values: [string, string, boolean?][] = [
    [tx("Sécurité du patient", "Patient safety"), tx("Au cœur de chaque formation et de chaque dispositif.", "At the heart of every training and every device."), true],
    [tx("Rigueur scientifique", "Scientific rigor"), tx("Validation humaine et preuves pour chaque résultat.", "Human validation and evidence for every result.")],
    [tx("Pratique supervisée", "Supervised practice"), tx("Apprendre le geste auprès de superviseurs experts.", "Learn the gesture alongside expert supervisors.")],
    [tx("Ouverture européenne", "European reach"), tx("De Strasbourg vers toute l'Europe.", "From Strasbourg to the whole of Europe.")],
  ];

  const kpis: [string, string][] = [
    ["+1150", tx("praticiens formés depuis 2018", "practitioners trained since 2018")],
    ["+150", tx("explants vasculaires reçus en 2023", "vascular explants received in 2023")],
    ["+20", tx("études de recherche clinique", "clinical research studies")],
  ];

  const moreSections = [
    {
      title: tx("Où nous trouver", "Where to find us"),
      content: tx(
        "Bureaux : Bâtiment d'Anesthésiologie, 1 place de l'Hôpital, 67085 Strasbourg. Centre d'Éducation : Bâtiment eXplora, 2 rue Marie Hamm, 67000 Strasbourg.",
        "Offices: Bâtiment d'Anesthésiologie, 1 place de l'Hôpital, 67085 Strasbourg. Education Center: Bâtiment eXplora, 2 rue Marie Hamm, 67000 Strasbourg.",
      ),
    },
    {
      title: tx("Gouvernance & financement", "Governance & funding"),
      content: tx(
        "Gepromed est soutenu par les collectivités locales, des fonds européens et des partenaires industriels du monde de la santé qui participent au financement d'équipements et aux activités.",
        "Gepromed is supported by local authorities, European funds and industrial partners from the healthcare world who help finance equipment and activities.",
      ),
    },
    {
      title: tx("Recherche & publications", "Research & publications"),
      content: tx(
        "Plus de 20 études cliniques et un programme continu d'analyse d'explants alimentent nos publications et la sécurité des dispositifs médicaux.",
        "More than 20 clinical studies and an ongoing explant-analysis program feed our publications and medical-device safety.",
      ),
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-brand-800 bg-brand-950 text-white">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
        <div className="container-page relative grid gap-10 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mono-label text-brand-200">Gepromed · Strasbourg · Depuis 1993</p>
            <h1 className="mt-3 max-w-3xl text-4xl text-white sm:text-5xl">{t("about.title")}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">{t("about.lead")}</p>
            <div className="mt-12 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/10 pt-8">
              {kpis.map(([n, l]) => (
                <div key={l}>
                  <p className="stat-figure text-3xl text-white sm:text-4xl">{n}</p>
                  <p className="mt-1.5 text-xs text-white/65">{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-soft">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/photos/about/explora-building.png"
                alt={tx("Bâtiment eXplora, centre d'éducation Gepromed à Strasbourg", "The eXplora building, Gepromed's education center in Strasbourg")}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <p className="mt-2 text-xs text-white/50">
              {tx("Bâtiment eXplora · Centre d'éducation", "eXplora building · Education center")}
            </p>
          </div>
        </div>
      </section>

      {/* Story + timeline */}
      <section className="container-page py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="mono-label-brand">{tx("Notre histoire", "Our history")}</p>
            <h2 className="mt-3 text-3xl">{t("about.storyTitle")}</h2>
            <p className="mt-4 leading-relaxed text-ink-soft">{t("about.story")}</p>
            <p className="mt-4 leading-relaxed text-ink-soft">
              {tx(
                "Le nom Gepromed, adopté en 2022, affirme un lien fort avec cette histoire tout en donnant de la visibilité aux dispositifs médicaux et à la recherche d'amélioration continue de la sécurité des soins.",
                "The name Gepromed, adopted in 2022, asserts a strong link with this history while giving visibility to medical devices and the pursuit of continuous improvement in care safety.",
              )}
            </p>
          </div>
          <ol className="relative space-y-7 border-l border-line pl-7">
            {HISTORY.map((h) => (
              <li key={h.year} className="relative">
                <span className="stat-figure absolute -left-[38px] grid h-7 w-7 place-items-center rounded-full border border-brand-200 bg-white text-[10px] font-semibold text-brand-700">
                  {h.year.slice(2)}
                </span>
                <p className="stat-figure text-sm font-semibold text-brand-700">{h.year}</p>
                <p className="mt-0.5 font-display text-lg text-ink">{loc(h.title, lang)}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{loc(h.body, lang)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Implant cycle: the signature, reused as a recurring motif */}
      <section className="border-y border-line bg-paper py-20 sm:py-24">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="mono-label-brand">{tx("Notre cœur conceptuel", "Our conceptual core")}</p>
            <h2 className="mt-3 text-3xl">{tx("Le cycle de l'implant", "The implant cycle")}</h2>
          </div>
          <div className="mt-12">
            <ImplantCycle />
          </div>
        </div>
      </section>

      {/* Values + quality */}
      <section className="container-page py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="mono-label-brand">{tx("Ce qui nous guide", "What guides us")}</p>
            <h2 className="mt-3 text-3xl">{t("about.valuesTitle")}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {values.map(([title, desc, safety]) => (
                <div key={title} className="card p-5">
                  <div className="flex items-center gap-2">
                    {safety && <span className="h-2 w-2 rounded-full bg-safety-500" aria-hidden="true" />}
                    <h3 className="text-base font-semibold text-brand-700">{title}</h3>
                  </div>
                  <p className="mt-1.5 text-sm text-ink-soft">{desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="mono-label-brand">{tx("Qualité", "Quality")}</p>
            <h2 className="mt-3 text-3xl">{t("about.qualiopiTitle")}</h2>
            <p className="mt-4 leading-relaxed text-ink-soft">{t("about.qualiopi")}</p>
            <div className="mt-6">
              <Accordion allowMultiple items={moreSections} />
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="border-t border-line bg-paper py-16">
        <div className="container-page text-center">
          <p className="mono-label-brand">{tx("Partenaires & financeurs", "Partners & funders")}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {PARTNERS.map((p) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={p.name} src={p.logo} alt={p.name} className="h-10 w-auto object-contain opacity-80 md:h-12" />
            ))}
          </div>
          <Link href="/trainings" className="btn-primary mt-10">{t("home.ctaTrainings")}</Link>
        </div>
      </section>
    </>
  );
}
