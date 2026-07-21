"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useLang, useT } from "@/lib/i18n";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { ScanSweep, PulseLine } from "@/components/GepromedTexture";
import { AnimatedText } from "@/components/AnimatedText";
import { CountUp } from "@/components/CountUp";

function IconArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconShield({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Original "V2 Image" hero, now with restrained motion: a staggered load-in,
   a slow background parallax + Ken Burns zoom on scroll, and the Gepromed
   radiograph/pulse textures. */
export function Hero() {
  const { lang } = useLang();
  const t = useT();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  // Background drifts down slower than the page for a subtle parallax.
  const bgY = useTransform(scrollY, [0, 700], [0, 140]);

  const stats: [string, string][] = [
    [
      "+1150",
      lang === "fr" ? "praticiens formés depuis 2018" : "practitioners trained since 2018",
    ],
    ["96%", t("home.statSat")],
    ["40+", t("home.statSup")],
  ];

  return (
    <section className="relative isolate overflow-hidden bg-brand-950">
      {/* image layer with parallax + slow zoom */}
      <motion.div
        className="absolute -inset-x-0 -top-[8%] -z-10 h-[124%] bg-cover bg-center"
        style={{
          y: reduce ? 0 : bgY,
          backgroundImage:
            "url('https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1920&q=70')",
        }}
        initial={reduce ? false : { scale: 1.12 }}
        animate={reduce ? undefined : { scale: 1.04 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950/95 via-brand-900/85 to-brand-800/55" />
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-30" />
      <ScanSweep />

      <div className="container-page relative py-28 md:py-36">
        <motion.div
          className="max-w-2xl"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {/* Eyebrow credential, written on letter by letter */}
          <motion.span
            variants={fadeUp}
            className="pill inline-flex items-center gap-1.5 bg-white/10 text-brand-50 ring-1 ring-white/25 backdrop-blur"
          >
            <IconShield className="h-3.5 w-3.5 text-safety-400" />
            <AnimatedText text={t("home.eyebrow")} delay={0.15} step={0.018} y={5} />
          </motion.span>

          <h1 className="mt-5 text-5xl font-semibold leading-[1.05] text-white drop-shadow sm:text-6xl">
            <AnimatedText text={t("home.title")} delay={0.5} step={0.024} y={16} />
          </h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg leading-relaxed text-white/90">
            {t("home.subtitle")}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/trainings" className="btn-accent group">
              {t("home.ctaTrainings")}
              <IconArrow className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link href="/register" className="btn border border-white/40 text-white hover:bg-white/10">
              {t("home.ctaRegister")}
            </Link>
            <PulseLine className="ml-1 hidden h-6 w-24 text-brand-200/70 lg:block" />
          </motion.div>
        </motion.div>
      </div>

      {/* stats bar */}
      <motion.div
        className="relative border-t border-white/10 bg-black/20 backdrop-blur"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
      >
        <div className="container-page grid grid-cols-3 divide-x divide-white/10 py-6 text-center">
          {stats.map(([n, l]) => (
            <div key={l} className="group px-2">
              <CountUp
                value={n}
                className="stat-figure block text-2xl font-semibold text-white transition-colors group-hover:text-brand-100 sm:text-3xl"
              />
              <p className="mt-1 text-xs text-white/75">{l}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
