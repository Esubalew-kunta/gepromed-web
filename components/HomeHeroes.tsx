"use client";

import Link from "next/link";
import { useLang, useT } from "@/lib/i18n";

/* Original "V2 Image" hero, restored exactly as it first was (per client request):
   full-bleed image, brand gradient overlay, eyebrow pill, headline, subtitle,
   accent CTA + outline register CTA, and a three-figure stats bar. */
export function Hero() {
  const { lang } = useLang();
  const t = useT();
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
      {/* image layer */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1920&q=70')",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950/95 via-brand-900/85 to-brand-800/55" />
      <div className="container-page relative py-28 md:py-36">
        <div className="max-w-2xl">
          <span className="pill bg-white/10 text-brand-50 ring-1 ring-white/25 backdrop-blur">
            {t("home.eyebrow")}
          </span>
          <h1 className="mt-5 text-5xl font-semibold leading-[1.05] text-white drop-shadow sm:text-6xl">
            {t("home.title")}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90">
            {t("home.subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/trainings" className="btn-accent">
              {t("home.ctaTrainings")}
            </Link>
            <Link href="/register" className="btn border border-white/40 text-white hover:bg-white/10">
              {t("home.ctaRegister")}
            </Link>
          </div>
        </div>
      </div>
      {/* stats bar */}
      <div className="relative border-t border-white/10 bg-black/20 backdrop-blur">
        <div className="container-page grid grid-cols-3 divide-x divide-white/10 py-6 text-center">
          {stats.map(([n, l]) => (
            <div key={l} className="px-2">
              <p className="text-2xl font-semibold text-white sm:text-3xl">{n}</p>
              <p className="mt-1 text-xs text-white/75">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
