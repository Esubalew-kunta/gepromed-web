"use client";

import Link from "next/link";
import { useLang, loc, type L } from "@/lib/i18n";
import { ABOUT_ITEMS } from "@/components/SiteHeader";
import { usePathname } from "next/navigation";

export function DocPage({
  eyebrow,
  title,
  intro,
  children,
  withSidebar = true,
}: {
  eyebrow?: L;
  title: L;
  intro?: L;
  children: React.ReactNode;
  withSidebar?: boolean;
}) {
  const { lang } = useLang();
  const pathname = usePathname();

  return (
    <>
      <section className="border-b border-line bg-paper">
        <div className="container-page py-16">
          {eyebrow && (
            <p className="mono-label-brand">{loc(eyebrow, lang)}</p>
          )}
          <h1 className="mt-3 max-w-3xl text-4xl sm:text-5xl">{loc(title, lang)}</h1>
          {intro && (
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {loc(intro, lang)}
            </p>
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
