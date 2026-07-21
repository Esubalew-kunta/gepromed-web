"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useLang, useT, loc } from "@/lib/i18n";
import { Hero } from "@/components/HomeHeroes";
import { ImplantCycle } from "@/components/ImplantCycle";
import { TrainingsExplorer } from "@/components/TrainingsExplorer";
import { Accordion } from "@/components/ui/Accordion";
import { ScanSweep, PulseLine } from "@/components/GepromedTexture";
import { CountUp } from "@/components/CountUp";
import { fadeUp, scaleIn, staggerContainer, inViewProps } from "@/lib/motion";
import { FAQ, TESTIMONIALS, PARTNERS, HISTORY } from "@/lib/content";

export default function HomePage() {
  const { lang } = useLang();
  const t = useT();
  const tx = (fr: string, en: string) => (lang === "fr" ? fr : en);

  // Real published figures (brief Section 4). The explant figure carries a safety
  // tick because explant analysis is the safety-critical platform.
  const evidence: { fig: string; label: string; safety?: boolean }[] = [
    { fig: "1,150+", label: tx("praticiens formés depuis 2018", "professionals trained since 2018") },
    { fig: "150+", label: tx("explants vasculaires reçus en 2023", "vascular explants received in 2023"), safety: true },
    { fig: "20+", label: tx("études de recherche clinique", "clinical research studies") },
    { fig: "30", label: tx("ans d'analyse de défaillances", "years of failure analysis") },
  ];

  // Real peer-reviewed record, grouped as on the live site (brief Section 4).
  const publications: { group: string; journal: string }[] = [
    { group: tx("Analyse d'explants", "Explant Analysis"), journal: "European Journal of Vascular and Endovascular Surgery" },
    { group: tx("Test de dispositifs cardiovasculaires", "Cardiovascular Device Testing"), journal: "JACC: Cardiovascular Interventions" },
    { group: tx("Éducation", "Education"), journal: "Scientific Reports" },
  ];

  return (
    <>
      <Hero />

      {/* Partners strip (real supporters) */}
      <section className="border-b border-line bg-white">
        <div className="container-page py-8">
          <p className="mono-label text-center">
            {tx("Ils nous soutiennent", "They support us")}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {PARTNERS.map((p) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={p.name}
                src={p.logo}
                alt={p.name}
                className="h-14 w-auto object-contain opacity-90 transition hover:opacity-100 md:h-16"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Implant cycle — signature element + multi-audience wayfinding */}
      <section id="implant-cycle" className="scroll-mt-20 bg-paper py-20 sm:py-24">
        <div className="container-page">
          <motion.div {...inViewProps} variants={fadeUp} className="max-w-2xl">
            <h2 className="mt-0 text-3xl sm:text-4xl">
              {tx("Sécurité chirurgicale : nos 3 plateformes", "Surgical safety: our 3 platforms")}
            </h2>
            <p className="mt-3 leading-relaxed text-ink-soft">
              {tx(
                "Gepromed relie analyse d'explants, tests techniques et jumeau numérique pour réduire les complications évitables et sécuriser les dispositifs médicaux implantables.",
                "Gepromed connects explant analysis, technical testing and a digital twin to reduce avoidable complications and make implantable medical devices safer.",
              )}
            </p>
          </motion.div>
          <motion.div {...inViewProps} variants={scaleIn} className="mt-14">
            <ImplantCycle />
          </motion.div>
        </div>
      </section>

      {/* Evidence / impact — real stats + publication record */}
      <section className="relative overflow-hidden border-y border-brand-800 bg-brand-950 py-20 text-white sm:py-24">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <ScanSweep />
        <div className="container-page relative">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
            <motion.div {...inViewProps} variants={staggerContainer}>
              <motion.h2 variants={fadeUp} className="mt-0 text-3xl text-white sm:text-4xl">
                {tx("30 ans de résultats mesurés", "30 years of measured results")}
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-3 max-w-md leading-relaxed text-white/70">
                {tx(
                  "Une institution de recherche, pas une marque marketing. Nos travaux sont publiés dans des revues à comité de lecture et nos indicateurs sont documentés.",
                  "A research institution, not a marketing brand. Our work is published in peer-reviewed journals and our indicators are documented.",
                )}
              </motion.p>

              <ul className="mt-8 space-y-3">
                {publications.map((p) => (
                  <motion.li variants={fadeUp} key={p.journal} className="flex items-baseline gap-3 border-t border-white/10 pt-3">
                    <span className="mono-label shrink-0 text-brand-200">{p.group}</span>
                    <span className="text-sm text-white/80">{p.journal}</span>
                  </motion.li>
                ))}
              </ul>
              <motion.div variants={fadeUp} className="mt-8 flex items-center gap-5">
                <Link href="/about/publications" className="btn-onDark">
                  {tx("Voir les publications clés", "See key publications")}
                </Link>
                <PulseLine className="hidden h-6 w-28 text-brand-300/70 sm:block" />
              </motion.div>
            </motion.div>

            <motion.dl
              {...inViewProps}
              variants={staggerContainer}
              className="grid grid-cols-2 gap-px overflow-hidden rounded-xl2 border border-white/10 bg-white/10"
            >
              {evidence.map((e) => (
                <motion.div variants={fadeUp} key={e.label} className="group bg-brand-950 p-6 transition-colors hover:bg-brand-900/60 sm:p-8">
                  <dt className="stat-figure flex items-center gap-2 text-4xl text-white sm:text-5xl">
                    <CountUp value={e.fig} className="transition-colors group-hover:text-brand-100" />
                    {e.safety && <span className="h-2 w-2 rounded-full bg-safety-500" aria-hidden="true" />}
                  </dt>
                  <dd className="mt-2 text-sm leading-snug text-white/65">{e.label}</dd>
                </motion.div>
              ))}
            </motion.dl>
          </div>
        </div>
      </section>

      {/* Featured trainings — live Supabase cards (data wiring untouched) */}
      <section className="bg-paper py-20 sm:py-24">
        <div className="container-page">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="mt-0 text-3xl sm:text-4xl">{t("home.upcomingTitle")}</h2>
              <p className="mt-2 text-ink-soft">{t("home.upcomingSub")}</p>
            </div>
            <Link href="/trainings" className="btn-ghost hidden sm:inline-flex">
              {t("common.viewAll")}
            </Link>
          </div>
          <div className="mt-12">
            <TrainingsExplorer showFilters={false} limit={3} />
          </div>
        </div>
      </section>

      {/* Industry partners path — new, distinct audience (brief Section 5) */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <div className="tick-frame overflow-hidden rounded-xl2 border border-line bg-mist/60">
            <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <h2 className="mt-0 text-3xl sm:text-4xl">
                  {tx("Vous avez conçu un dispositif. Faites-le tester.", "You built a device. Have it tested.")}
                </h2>
                <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">
                  {tx(
                    "Test mécanique et radiographique indépendant (microscope ZEISS Xradia, système Faxitron), évaluation ISO 13485 et soumission d'explants pour analyse de défaillance. Un interlocuteur unique, du protocole au rapport.",
                    "Independent mechanical and radiographic testing (ZEISS Xradia microscope, Faxitron system), ISO 13485 evaluation, and explant submission for failure analysis. One point of contact, from protocol to report.",
                  )}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href="/contact" className="btn-primary">
                    {tx("Demander un test", "Request testing")}
                  </Link>
                  <Link href="/contact" className="btn-safety">
                    {tx("Soumettre un explant", "Submit an explant")}
                  </Link>
                </div>
              </div>
              <motion.ul {...inViewProps} variants={staggerContainer} className="grid gap-2.5">
                {[
                  ["ISO 13485", tx("Conception & test de dispositifs", "Device design & testing")],
                  ["ZEISS Xradia", tx("Microscopie à rayons X 3D", "3D X-ray microscopy")],
                  ["Faxitron", tx("Radiographie haute résolution", "High-resolution radiography")],
                ].map(([code, label]) => (
                  <motion.li variants={fadeUp} key={code} className="flex items-center gap-4 rounded-lg border border-line bg-white px-4 py-3 transition hover:border-brand-200 hover:shadow-card">
                    <span className="mono-label-brand w-28 shrink-0">{code}</span>
                    <span className="text-sm text-ink-soft">{label}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>
        </div>
      </section>

      {/* History teaser (real timeline) */}
      <section className="bg-paper py-20 sm:py-24">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="mono-label-brand">{tx("Depuis 1993", "Since 1993")}</p>
              <h2 className="mt-3 text-3xl sm:text-4xl">{t("about.storyTitle")}</h2>
              <p className="mt-4 leading-relaxed text-ink-soft">{t("about.story")}</p>
              <Link href="/about" className="btn-primary mt-7">
                {tx("Notre histoire complète", "Our full history")}
              </Link>
            </div>
            <motion.ol {...inViewProps} variants={staggerContainer} className="relative space-y-6 border-l border-line pl-7">
              {HISTORY.slice(0, 4).map((h) => (
                <motion.li variants={fadeUp} key={h.year} className="relative">
                  <span className="absolute -left-[35px] grid h-6 w-6 place-items-center rounded-full border border-brand-200 bg-white">
                    <span className="h-2 w-2 rounded-full bg-brand-600" />
                  </span>
                  <p className="stat-figure text-sm font-semibold text-brand-700">{h.year}</p>
                  <p className="mt-0.5 font-display text-lg text-ink">{loc(h.title, lang)}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{loc(h.body, lang)}</p>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </div>
      </section>

      {/* Testimonials — DEMO_DATA (placeholder practitioners, swap after approval) */}
      <section className="border-y border-line bg-white py-20 sm:py-24">
        <div className="container-page">
          <p className="mono-label-brand">{tx("Retours de terrain", "From the field")}</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">
            {tx("Ce qu'en disent les praticiens", "What practitioners say")}
          </h2>
          <motion.div {...inViewProps} variants={staggerContainer} className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((tm) => (
              <motion.figure variants={fadeUp} key={tm.name} className="card flex flex-col p-6">
                <div className="font-display text-4xl leading-none text-brand-200">&ldquo;</div>
                <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                  {loc(tm.quote, lang)}
                </blockquote>
                <figcaption className="mt-5 border-t border-line pt-4">
                  <p className="text-sm font-semibold text-ink">{tm.name}</p>
                  <p className="mono-label mt-0.5">{loc(tm.role, lang)}</p>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-paper py-20 sm:py-24">
        <div className="container-page max-w-3xl">
          <div className="text-center">
            <p className="mono-label-brand">FAQ</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">
              {tx("Questions fréquentes", "Frequent questions")}
            </h2>
          </div>
          <div className="mt-10">
            <Accordion
              allowMultiple
              items={FAQ.map((f) => ({ title: loc(f.q, lang), content: loc(f.a, lang) }))}
            />
          </div>
        </div>
      </section>

      {/* CTA — blue (orange stays semantic) */}
      <section className="bg-paper pb-24">
        <div className="container-page">
          <motion.div
            {...inViewProps}
            variants={fadeUp}
            className="relative overflow-hidden rounded-xl2 bg-gradient-to-br from-brand-800 to-brand-950 px-8 py-14 text-center text-white sm:px-16"
          >
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
            <ScanSweep />
            <div className="relative">
              <h2 className="text-3xl text-white">{t("home.ctaTitle")}</h2>
              <p className="mx-auto mt-3 max-w-xl text-white/80">{t("home.ctaSub")}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/contact" className="btn bg-white text-brand-800 hover:bg-brand-50">
                  {t("home.ctaContact")}
                </Link>
                <Link href="/register" className="btn-onDark">
                  {t("home.ctaRegister")}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
