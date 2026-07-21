"use client";

import { DocPage } from "@/components/DocPage";
import { Reveal } from "@/components/Reveal";
import { useLang, loc } from "@/lib/i18n";
import { PUB_CATEGORIES, type Publication } from "@/lib/publications";

function IconExternal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path d="M14 5h5v5M19 5l-8 8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 14v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PubCard({ p, delay }: { p: Publication; delay: number }) {
  const inner = (
    <>
      <div className="flex items-start justify-between gap-4">
        <p className="font-medium leading-snug text-ink group-hover:text-brand-700">{p.title}</p>
        <span className="stat-figure shrink-0 text-sm text-brand-600">{p.year}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.authors}</p>
      <p className="mt-1.5 text-sm text-ink-soft">
        <span className="italic">{p.journal}</span>
        {p.ref ? ` · ${p.ref}` : ""}
        {p.href && <IconExternal className="ml-1.5 inline h-3.5 w-3.5 align-[-1px] text-brand-500" />}
      </p>
    </>
  );

  const cls =
    "group block h-full rounded-2xl border border-line p-5 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-card";

  return (
    <Reveal as="li" delay={delay}>
      {p.href ? (
        <a href={p.href} target="_blank" rel="noreferrer" className={cls}>
          {inner}
        </a>
      ) : (
        <div className={cls}>{inner}</div>
      )}
    </Reveal>
  );
}

export default function PublicationsPage() {
  const { lang } = useLang();
  const tx = (fr: string, en: string) => (lang === "fr" ? fr : en);

  const total = PUB_CATEGORIES.reduce((n, c) => n + c.items.length, 0);

  return (
    <DocPage
      eyebrow={{ fr: "À propos", en: "About us" }}
      title={{ fr: "Publications clés", en: "Key Publications" }}
      intro={{
        fr: "Découvrez nos publications scientifiques et pédagogiques phares, illustrant l'expertise de Gepromed en formation à la chirurgie vasculaire, en simulation et en évaluation des compétences, ainsi qu'en analyse d'explants et en essais de caractérisation des biomatériaux.",
        en: "Explore our flagship scientific and educational publications, showcasing GEPROMED's expertise in vascular surgery training, simulation and competency development, as well as in explant analysis and biomaterials characterization testing.",
      }}
      heroImage={{
        src: "/photos/about/publications.jpg",
        alt: tx("Publications scientifiques Gepromed", "Gepromed scientific publications"),
      }}
    >
      {/* Category quick-nav with counts */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="pill bg-brand-50 text-brand-700">
          {total} {tx("publications", "publications")}
        </span>
        {PUB_CATEGORIES.map((c) => (
          <a key={c.id} href={`#${c.id}`} className="pill border border-line bg-white text-ink-soft transition hover:border-brand-300 hover:text-brand-700">
            {loc(c.theme, lang)} · {c.items.length}
          </a>
        ))}
      </div>

      <div className="mt-10 space-y-12">
        {PUB_CATEGORIES.map((c) => (
          <section key={c.id} id={c.id} className="scroll-mt-24">
            <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
              <h2 className="text-2xl">{loc(c.theme, lang)}</h2>
              <span className="mono-label">{c.items.length} {tx("réf.", "refs")}</span>
            </div>
            <ul className="mt-5 grid gap-4 lg:grid-cols-2">
              {c.items.map((p, i) => (
                <PubCard key={p.title} p={p} delay={(i % 2) * 60} />
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-10 rounded-xl bg-brand-50/60 px-4 py-3 text-sm text-ink-soft">
        {tx(
          "La liste complète et à jour des publications est disponible sur PubMed, souvent en collaboration avec le groupe GEPROVAS et l'Université de Strasbourg.",
          "The full, up-to-date list of publications is available on PubMed, often in collaboration with the GEPROVAS group and the University of Strasbourg.",
        )}
      </p>
    </DocPage>
  );
}
