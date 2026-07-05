"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useLang, loc } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";
import { getCongressBySlug } from "@/lib/congresses";

export default function CongressDetailPage() {
  const { lang } = useLang();
  const tx = (fr: string, en: string) => (lang === "fr" ? fr : en);
  const params = useParams<{ slug: string }>();
  const c = getCongressBySlug(params.slug);
  if (!c) return notFound();

  const specs: { label: string; value: string }[] = [
    { label: tx("Dates", "Dates"), value: loc(c.dates, lang) },
    { label: tx("Lieu", "Location"), value: loc(c.city, lang) },
  ];
  if (c.venue) specs.push({ label: tx("Site", "Venue"), value: loc(c.venue, lang) });

  return (
    <>
      {/* Dark instrument header */}
      <section className="relative overflow-hidden border-b border-brand-800 bg-brand-950 text-white">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="container-page relative py-14">
          <Link
            href="/congresses"
            className="mono-label text-brand-200 transition hover:text-white"
          >
            {tx("← Tous les congrès", "← All congresses")}
          </Link>

          <div className="mt-6 flex items-center gap-3">
            <span className="pill bg-white/10 text-brand-100">
              {c.status === "upcoming"
                ? tx("À venir", "Upcoming")
                : tx("Édition passée", "Past edition")}
            </span>
            <span className="stat-figure text-brand-200">{c.acronym}</span>
          </div>

          <h1 className="mt-4 max-w-3xl font-display text-3xl leading-tight text-white sm:text-4xl">
            {loc(c.title, lang)}
          </h1>

          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            {specs.map((s) => (
              <div key={s.label}>
                <dt className="mono-label text-brand-200">{s.label}</dt>
                <dd className="mt-1 text-sm text-white/85">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Intro + program */}
      <section className="container-page py-14">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div className="max-w-2xl">
            <p className="text-lg leading-relaxed text-ink-soft">
              {loc(c.intro, lang)}
            </p>

            {c.program && c.program.length > 0 && (
              <>
                <h2 className="mt-12 text-2xl">{tx("Programme", "Program")}</h2>
                <div className="mt-6 space-y-4">
                  {c.program.map((s, i) => (
                    <Reveal key={i} delay={i * 60}>
                      <div className="tick-frame rounded-2xl border border-line bg-white p-6 shadow-card">
                        <span className="mono-label-brand">
                          {loc(s.when, lang)}
                        </span>
                        <h3 className="mt-2 font-display text-lg text-ink">
                          {loc(s.title, lang)}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                          {loc(s.body, lang)}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sidebar CTA */}
          <aside className="lg:sticky lg:top-24">
            <div className="rounded-xl2 border border-line bg-mist/60 p-6">
              <p className="mono-label-brand">
                {tx("Participer", "Take part")}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {c.status === "upcoming"
                  ? tx(
                      "Les inscriptions et l'appel à communications seront ouverts prochainement. Contactez-nous pour être informé en priorité.",
                      "Registration and the call for abstracts will open soon. Contact us to be notified first.",
                    )
                  : tx(
                      "Les actes et archives de cette édition sont disponibles sur demande.",
                      "Proceedings and archives for this edition are available on request.",
                    )}
              </p>
              <Link href="/contact" className="btn-primary mt-5 w-full">
                {tx("Nous contacter", "Contact us")}
              </Link>
              <Link href="/news" className="btn-ghost mt-2 w-full">
                {tx("Suivre l'actualité", "Follow the news")}
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
