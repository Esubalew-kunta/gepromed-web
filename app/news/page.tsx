"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useLang, loc } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";
import {
  sortedNews,
  NEWS_CATEGORIES,
  type NewsCategoryKey,
  type NewsPost,
} from "@/lib/news";

function formatDate(iso: string, lang: "fr" | "en") {
  const d = new Date(iso + "T00:00:00");
  return new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

/* On-brand placeholder for posts without a photo: a blueprint instrument panel
   rather than a broken image. Reads as intentional, not missing. */
function PostVisual({
  post,
  lang,
  className = "",
}: {
  post: NewsPost;
  lang: "fr" | "en";
  className?: string;
}) {
  if (post.image) {
    return (
      <div className={`relative overflow-hidden bg-mist ${className}`}>
        <Image
          src={post.image}
          alt={loc(post.title, lang)}
          fill
          sizes="(max-width: 768px) 100vw, 640px"
          className="object-cover transition duration-700 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-950/25 to-transparent" />
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden bg-brand-950 ${className}`}>
      <div className="bg-grid absolute inset-0 opacity-70" />
      <div className="absolute inset-0 grid place-items-center p-6 text-center">
        <span className="mono-label text-brand-200">
          {loc(NEWS_CATEGORIES[post.category].label, lang)}
        </span>
      </div>
    </div>
  );
}

function CategoryChip({ k, lang }: { k: NewsCategoryKey; lang: "fr" | "en" }) {
  return (
    <span className="pill bg-brand-50 text-brand-700">
      {loc(NEWS_CATEGORIES[k].label, lang)}
    </span>
  );
}

export default function NewsPage() {
  const { lang } = useLang();
  const tx = (fr: string, en: string) => (lang === "fr" ? fr : en);

  const all = useMemo(() => sortedNews(), []);
  const featured = all.find((p) => p.featured) ?? all[0];
  const [active, setActive] = useState<NewsCategoryKey | "all">("all");

  const rest = all.filter((p) => p.slug !== featured.slug);
  const filtered =
    active === "all" ? rest : rest.filter((p) => p.category === active);

  const cats = Object.keys(NEWS_CATEGORIES) as NewsCategoryKey[];

  return (
    <>
      {/* Header band */}
      <section className="border-b border-line bg-paper">
        <div className="container-page py-16">
          <p className="mono-label-brand">{tx("Actualités", "Newsroom")}</p>
          <h1 className="mt-3 max-w-3xl text-4xl sm:text-5xl">
            {tx("Actualités & recherche", "News & research")}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            {tx(
              "Congrès, formations, publications et vie de l'institut. Ce que fait Gepromed pour la sécurité des dispositifs médicaux.",
              "Congresses, trainings, publications and institute life. What Gepromed does for medical-device safety.",
            )}
          </p>
        </div>
      </section>

      {/* Featured lead */}
      <section className="container-page pt-14">
        <Reveal>
          <Link
            href={`/news/${featured.slug}`}
            className="group grid overflow-hidden rounded-xl2 border border-line bg-white shadow-card transition hover:border-brand-300 hover:shadow-soft lg:grid-cols-2"
          >
            <PostVisual
              post={featured}
              lang={lang}
              className="min-h-[220px] lg:min-h-[380px]"
            />
            <div className="flex flex-col justify-center gap-4 p-8 sm:p-10">
              <div className="flex items-center gap-3">
                <CategoryChip k={featured.category} lang={lang} />
                <span className="mono-label">
                  {formatDate(featured.date, lang)}
                </span>
              </div>
              <h2 className="font-display text-2xl leading-snug text-ink transition group-hover:text-brand-700 sm:text-3xl">
                {loc(featured.title, lang)}
              </h2>
              <p className="leading-relaxed text-ink-soft">
                {loc(featured.excerpt, lang)}
              </p>
              <span className="mono-label-brand mt-1 inline-flex items-center gap-1.5">
                {tx("Lire l'article", "Read the article")}
                <span aria-hidden className="transition group-hover:translate-x-1">
                  →
                </span>
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* Filter + grid */}
      <section className="container-page py-14">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActive("all")}
            className={`pill border transition ${
              active === "all"
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-line bg-white text-ink-soft hover:border-brand-300"
            }`}
          >
            {tx("Tout", "All")}
          </button>
          {cats.map((k) => (
            <button
              key={k}
              onClick={() => setActive(k)}
              className={`pill border transition ${
                active === k
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-line bg-white text-ink-soft hover:border-brand-300"
              }`}
            >
              {loc(NEWS_CATEGORIES[k].label, lang)}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 70}>
              <Link
                href={`/news/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl2 border border-line bg-white shadow-card transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-soft"
              >
                <PostVisual post={post} lang={lang} className="h-44" />
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex items-center gap-3">
                    <CategoryChip k={post.category} lang={lang} />
                    <span className="mono-label">
                      {formatDate(post.date, lang)}
                    </span>
                  </div>
                  <h3 className="font-display text-lg leading-snug text-ink transition group-hover:text-brand-700">
                    {loc(post.title, lang)}
                  </h3>
                  <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-ink-soft">
                    {loc(post.excerpt, lang)}
                  </p>
                  <span className="mono-label mt-1">
                    {post.readMins} {tx("min de lecture", "min read")}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-ink-muted">
            {tx(
              "Aucun article dans cette catégorie pour le moment.",
              "No article in this category for now.",
            )}
          </p>
        )}
      </section>
    </>
  );
}
