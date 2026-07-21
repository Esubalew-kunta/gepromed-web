"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useLang, loc, type L } from "@/lib/i18n";
import { ABOUT_ITEMS } from "@/components/SiteHeader";
import { AnimatedText } from "@/components/AnimatedText";
import { fadeUp, scaleIn, staggerContainer } from "@/lib/motion";
import { usePathname } from "next/navigation";

export function DocPage({
  eyebrow,
  title,
  intro,
  heroImage,
  children,
  withSidebar = true,
}: {
  eyebrow?: L;
  title: L;
  intro?: L;
  heroImage?: { src: string; alt: string };
  children: React.ReactNode;
  withSidebar?: boolean;
}) {
  const { lang } = useLang();
  const pathname = usePathname();

  return (
    <>
      <section className="border-b border-line bg-paper">
        <div
          className={`container-page py-16 ${
            heroImage ? "grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center" : ""
          }`}
        >
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            {eyebrow && (
              <motion.p variants={fadeUp} className="mono-label-brand">{loc(eyebrow, lang)}</motion.p>
            )}
            <h1 className="mt-3 max-w-3xl text-4xl sm:text-5xl">
              <AnimatedText text={loc(title, lang)} delay={0.12} step={0.02} y={14} />
            </h1>
            {intro && (
              <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
                {loc(intro, lang)}
              </motion.p>
            )}
          </motion.div>
          {heroImage && (
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="show"
              className="overflow-hidden rounded-2xl border border-line shadow-card"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImage.src}
                alt={heroImage.alt}
                className="aspect-[4/3] w-full object-cover"
              />
            </motion.div>
          )}
        </div>
      </section>

      <section className="container-page grid gap-12 py-14 lg:grid-cols-4">
        <div className={withSidebar ? "lg:col-span-3" : "lg:col-span-4"}>{children}</div>

        {withSidebar && (
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl2 border border-line bg-white p-4">
              <p className="mono-label px-2">
                {lang === "fr" ? "À propos" : "About"}
              </p>
              <nav className="mt-2 flex flex-col">
                <Link
                  href="/about"
                  className={`rounded-lg px-2 py-1.5 text-sm ${
                    pathname === "/about" ? "bg-brand-50 text-brand-700" : "text-ink-soft hover:text-brand-700"
                  }`}
                >
                  {lang === "fr" ? "Présentation" : "Overview"}
                </Link>
                {ABOUT_ITEMS.map((it) => (
                  <Link
                    key={it.href}
                    href={it.href}
                    className={`rounded-lg px-2 py-1.5 text-sm ${
                      pathname === it.href ? "bg-brand-50 text-brand-700" : "text-ink-soft hover:text-brand-700"
                    }`}
                  >
                    {loc(it.label, lang)}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>
        )}
      </section>
    </>
  );
}

/* Small helpers for prose inside DocPage */
export function Prose({ children }: { children: React.ReactNode }) {
  return <div className="space-y-4 leading-relaxed text-ink-soft">{children}</div>;
}
