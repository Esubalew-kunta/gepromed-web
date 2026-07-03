"use client";

import { TrainingsExplorer } from "@/components/TrainingsExplorer";
import { Accordion } from "@/components/ui/Accordion";
import { useLang, useT, loc } from "@/lib/i18n";
import { FAQ } from "@/lib/content";

export default function TrainingsPage() {
  const { lang } = useLang();
  const t = useT();
  const tx = (fr: string, en: string) => (lang === "fr" ? fr : en);

  return (
    <>
      <section className="border-b border-line bg-paper">
        <div className="container-page py-16">
          <p className="mono-label-brand">
            {tx("Plateforme 02 · Éducation", "Platform 02 · Education")}
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl sm:text-5xl">{t("trainings.title")}</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">{t("trainings.subtitle")}</p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="pill bg-brand-50 text-brand-700">✓ {t("home.trustQualiopi")}</span>
            <span className="pill border border-line bg-white font-mono text-[0.68rem] uppercase tracking-annotation text-ink-muted">
              ISO 9001 · 13485
            </span>
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <TrainingsExplorer />
      </section>

      {/* SEO / content-heavy FAQ */}
      <section className="border-t border-line bg-white py-16">
        <div className="container-page max-w-3xl">
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
        </div>
      </section>
    </>
  );
}
