"use client";

import { motion } from "motion/react";
import { TrainingsExplorer } from "@/components/TrainingsExplorer";
import { Accordion } from "@/components/ui/Accordion";
import { AnimatedText } from "@/components/AnimatedText";
import { fadeUp, staggerContainer, inViewProps } from "@/lib/motion";
import { useLang, useT, loc } from "@/lib/i18n";
import { FAQ } from "@/lib/content";

export default function TrainingsPage() {
  const { lang } = useLang();
  const t = useT();
  const tx = (fr: string, en: string) => (lang === "fr" ? fr : en);

  return (
    <>
      <section className="border-b border-line bg-paper">
        <motion.div
          className="container-page py-16"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.p variants={fadeUp} className="mono-label-brand">
            {tx("Plateforme 02 · Éducation", "Platform 02 · Education")}
          </motion.p>
          <h1 className="mt-3 max-w-3xl text-4xl sm:text-5xl">
            <AnimatedText text={t("trainings.title")} delay={0.15} step={0.022} y={14} />
          </h1>
          <motion.p variants={fadeUp} className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
            {t("trainings.subtitle")}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center gap-2">
            <span className="pill bg-brand-50 text-brand-700">✓ {t("home.trustQualiopi")}</span>
            <span className="pill border border-line bg-white font-mono text-[0.68rem] uppercase tracking-annotation text-ink-muted">
              ISO 9001
            </span>
          </motion.div>
        </motion.div>
      </section>

      <section className="container-page py-14">
        <TrainingsExplorer />
      </section>

      {/* SEO / content-heavy FAQ */}
      <section className="border-t border-line bg-white py-16">
        <motion.div {...inViewProps} variants={fadeUp} className="container-page max-w-3xl">
          <p className="mono-label-brand">FAQ</p>
          <h2 className="mt-3 text-3xl">{tx("Questions fréquentes", "Frequent questions")}</h2>
          <p className="mt-2 text-ink-soft">
            {tx(
              "Tout ce qu'il faut savoir avant de réserver une formation.",
              "Everything you need to know before booking a training.",
            )}
          </p>
          <div className="mt-8">
            <Accordion
              allowMultiple
              items={FAQ.map((f) => ({
                title: loc(f.q, lang),
                content: loc(f.a, lang),
              }))}
            />
          </div>
        </motion.div>
      </section>
    </>
  );
}
