"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useLang, loc } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";
import { sortedCongresses } from "@/lib/congresses";

export default function CongressesPage() {
  const { lang } = useLang();
  const tx = (fr: string, en: string) => (lang === "fr" ? fr : en);

  const all = useMemo(() => sortedCongresses(), []);
  const featured = all.find((c) => c.status === "upcoming") ?? all[0];
  const past = all.filter((c) => c.slug !== featured.slug);

  return (
    <>
      {/* Header band */}
      <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-brand-50/70 via-paper to-paper">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.12]" />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl"
        />
        <div className="container-page relative py-16">
          <Reveal>
            <p className="mono-label-brand">{tx("Congrès", "Congresses")}</p>
            <h1 className="mt-3 max-w-3xl text-4xl sm:text-5xl">
              {tx("Nos congrès scientifiques", "Our scientific congresses")}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {tx(
                "Depuis 2001, Gepromed organise tous les deux ans un congrès dédié aux biomatériaux cardiovasculaires, au cœur de l'Europe institutionnelle à Strasbourg.",
                "Since 2001, Gepromed has organized a biennial congress dedicated to cardiovascular biomaterials, at the heart of institutional Europe in Strasbourg.",
              )}
            </p>
            {/* Key facts — a splash of color + at-a-glance flavour */}
            <div className="mt-7 flex flex-wrap gap-2.5">
              {[
                [tx("Depuis", "Since"), "2001"],
                [tx("Rythme", "Cadence"), tx("Biennal", "Biennial")],
                [tx("Éditions", "Editions"), String(all.length)],
              ].map(([label, value]) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3.5 py-1.5 text-sm shadow-card"
                >
                  <span className="mono-label text-ink-muted">{label}</span>
                  <span className="stat-figure font-semibold text-brand-700">{value}</span>
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured (upcoming) as a dark instrument panel */}
      <section className="container-page pt-14">
        <Reveal>
          <Link
            href={`/congresses/${featured.slug}`}
            className="group relative block overflow-hidden rounded-xl2 border border-brand-800 bg-brand-950 text-white shadow-card ring-1 ring-transparent transition duration-300 hover:-translate-y-0.5 hover:shadow-soft hover:ring-brand-500/50"
          >
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
            <div
              aria-hidden
              className="pointer-events-none absolute -left-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-brand-500/20 blur-3xl transition-opacity duration-500 group-hover:opacity-70"
            />
            <div className="relative grid gap-8 p-8 sm:p-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
              <div>
                <span className="pill bg-brand-500 font-semibold text-white shadow-sm">
                  {featured.status === "upcoming"
                    ? tx("Prochaine édition", "Next edition")
                    : tx("Édition phare", "Flagship edition")}
                </span>
                <h2 className="mt-4 font-display text-3xl text-white sm:text-4xl">
                  {loc(featured.title, lang)}
                </h2>
                <p className="mt-4 max-w-md leading-relaxed text-white/70">
                  {loc(featured.summary, lang)}
                </p>
                <span className="btn-onDark mt-7">
                  {tx("Découvrir le congrès", "Explore the congress")}
                  <span
                    aria-hidden
                    className="transition group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </div>

              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl2 border border-white/10 bg-white/10">
                <div className="bg-brand-950 p-5">
                  <dt className="mono-label text-brand-200">
                    {tx("Acronyme", "Acronym")}
                  </dt>
                  <dd className="stat-figure mt-1 text-xl text-white">
                    {featured.acronym}
                  </dd>
                </div>
                <div className="bg-brand-950 p-5">
                  <dt className="mono-label text-brand-200">
                    {tx("Année", "Year")}
                  </dt>
                  <dd className="stat-figure mt-1 text-xl text-white">
                    {featured.year}
                  </dd>
                </div>
                <div className="bg-brand-950 p-5">
                  <dt className="mono-label text-brand-200">
                    {tx("Dates", "Dates")}
                  </dt>
                  <dd className="mt-1 text-sm text-white/85">
                    {loc(featured.dates, lang)}
                  </dd>
                </div>
                <div className="bg-brand-950 p-5">
                  <dt className="mono-label text-brand-200">
                    {tx("Lieu", "Location")}
                  </dt>
                  <dd className="mt-1 text-sm text-white/85">
                    {loc(featured.city, lang)}
                  </dd>
                </div>
              </dl>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* Past editions as a timeline */}
      <section className="container-page py-16">
        <p className="mono-label-brand">{tx("Éditions passées", "Past editions")}</p>
        <h2 className="mt-3 text-3xl">
          {tx("Une série biennale depuis 2001", "A biennial series since 2001")}
        </h2>

        <ol className="mt-10 space-y-5 border-l border-line pl-7">
          {past.map((c, i) => (
            <Reveal as="li" key={c.slug} delay={i * 60} className="relative">
              <span className="absolute -left-[35px] grid h-6 w-6 place-items-center rounded-full border border-brand-200 bg-white transition duration-300 group-hover:scale-110 group-hover:border-brand-400">
                <span className="h-2 w-2 rounded-full bg-brand-600 transition group-hover:bg-brand-500" />
              </span>
              <Link
                href={`/congresses/${c.slug}`}
                className="group block rounded-2xl border border-line bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-soft"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="stat-figure inline-flex items-center rounded-md bg-brand-50 px-2 py-0.5 text-sm font-semibold text-brand-700">
                    {c.acronym}
                  </span>
                  <span className="mono-label">{loc(c.dates, lang)}</span>
                </div>
                <h3 className="mt-2 font-display text-xl leading-snug text-ink transition group-hover:text-brand-700">
                  {loc(c.title, lang)}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
                  {loc(c.summary, lang)}
                </p>
              </Link>
            </Reveal>
          ))}
        </ol>
      </section>
    </>
  );
}
