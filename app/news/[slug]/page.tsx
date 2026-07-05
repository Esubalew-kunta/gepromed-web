"use client";

import Link from "next/link";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { useLang, loc } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";
import {
  getNewsBySlug,
  sortedNews,
  NEWS_CATEGORIES,
  type Block,
} from "@/lib/news";

function formatDate(iso: string, lang: "fr" | "en") {
  const d = new Date(iso + "T00:00:00");
  return new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

function BlockView({ block, lang }: { block: Block; lang: "fr" | "en" }) {
  switch (block.type) {
    case "h":
      return (
        <h2 className="mt-10 font-display text-2xl text-ink">
          {loc(block.text, lang)}
        </h2>
      );
    case "quote":
      return (
        <figure className="my-8 border-l-2 border-brand-500 pl-5">
          <blockquote className="font-display text-xl italic leading-relaxed text-ink">
            {loc(block.text, lang)}
          </blockquote>
          {block.cite && (
            <figcaption className="mono-label mt-2">
              {loc(block.cite, lang)}
            </figcaption>
          )}
        </figure>
      );
    case "list":
      return (
        <ul className="my-5 space-y-2.5">
          {block.items.map((it, i) => (
            <li key={i} className="flex gap-3 text-ink-soft">
              <span
                aria-hidden
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"
              />
              <span className="leading-relaxed">{loc(it, lang)}</span>
            </li>
          ))}
        </ul>
      );
    default:
      return (
        <p className="my-4 leading-relaxed text-ink-soft">
          {loc(block.text, lang)}
        </p>
      );
  }
}

export default function NewsArticlePage() {
  const { lang } = useLang();
  const tx = (fr: string, en: string) => (lang === "fr" ? fr : en);
  const params = useParams<{ slug: string }>();
  const post = getNewsBySlug(params.slug);
  if (!post) return notFound();

  const related = sortedNews()
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);

  return (
    <>
      {/* Header band */}
      <section className="border-b border-line bg-paper">
        <div className="container-page py-12">
          <Link
            href="/news"
            className="mono-label transition hover:text-brand-700"
          >
            {tx("← Toutes les actualités", "← All news")}
          </Link>
          <div className="mt-6 flex items-center gap-3">
            <span className="pill bg-brand-50 text-brand-700">
              {loc(NEWS_CATEGORIES[post.category].label, lang)}
            </span>
            <span className="mono-label">{formatDate(post.date, lang)}</span>
            <span className="mono-label">
              · {post.readMins} {tx("min", "min")}
            </span>
          </div>
          <h1 className="mt-4 max-w-3xl text-3xl leading-tight sm:text-4xl">
            {loc(post.title, lang)}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            {loc(post.excerpt, lang)}
          </p>
        </div>
      </section>

      {/* Hero visual */}
      {post.image && (
        <section className="container-page pt-10">
          <Reveal>
            <div className="relative min-h-[240px] overflow-hidden rounded-xl2 border border-line bg-mist sm:min-h-[340px] lg:min-h-[420px]">
              <Image
                src={post.image}
                alt={loc(post.title, lang)}
                fill
                sizes="(max-width: 768px) 100vw, 960px"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-950/20 to-transparent" />
            </div>
          </Reveal>
        </section>
      )}

      {/* Body */}
      <section className="container-page py-12">
        <article className="mx-auto max-w-2xl">
          {post.body.map((b, i) => (
            <BlockView key={i} block={b} lang={lang} />
          ))}

          <div className="mt-12 flex flex-wrap gap-3 border-t border-line pt-8">
            <Link href="/trainings" className="btn-primary">
              {tx("Voir les formations", "Browse trainings")}
            </Link>
            <Link href="/congresses" className="btn-ghost">
              {tx("Nos congrès", "Our congresses")}
            </Link>
          </div>
        </article>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-line bg-white py-14">
          <div className="container-page">
            <p className="mono-label-brand">{tx("À lire aussi", "Read next")}</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/news/${r.slug}`}
                  className="group rounded-xl2 border border-line bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-soft"
                >
                  <span className="mono-label">{formatDate(r.date, lang)}</span>
                  <h3 className="mt-2 font-display text-lg leading-snug text-ink transition group-hover:text-brand-700">
                    {loc(r.title, lang)}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-ink-soft">
                    {loc(r.excerpt, lang)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
