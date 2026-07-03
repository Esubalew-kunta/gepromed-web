"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { useT, useLang } from "@/lib/i18n";

export function SiteFooter() {
  const t = useT();
  const { lang } = useLang();
  const tx = (fr: string, en: string) => (lang === "fr" ? fr : en);

  return (
    <footer className="relative overflow-hidden border-t border-brand-800 bg-brand-950 text-white">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="container-page relative grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo tone="light" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
            {t("footer.tagline")}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="pill border border-white/15 bg-white/5 font-mono text-[0.68rem] uppercase tracking-annotation text-brand-200">
              ISO 9001 · 13485
            </span>
            <span className="pill border border-white/15 bg-white/5 font-mono text-[0.68rem] uppercase tracking-annotation text-brand-200">
              Qualiopi
            </span>
          </div>
        </div>

        <div>
          <h4 className="mono-label text-white/50">{t("footer.navigation")}</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/75">
            <li><Link className="transition hover:text-white" href="/trainings">{t("nav.trainings")}</Link></li>
            <li><Link className="transition hover:text-white" href="/register">{t("nav.register")}</Link></li>
            <li><Link className="transition hover:text-white" href="/about">{t("nav.about")}</Link></li>
            <li>
              <a
                className="inline-flex items-center gap-1 transition hover:text-white"
                href={process.env.NEXT_PUBLIC_CONSOLE_URL || "http://localhost:3000"}
                target="_blank"
                rel="noreferrer"
              >
                {t("nav.dashboard")}
                <span aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mono-label text-white/50">{t("footer.contact")}</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/75">
            <li>{tx("Centre d'Éducation, Bâtiment eXplora", "Education Center, eXplora Building")}</li>
            <li>2 rue Marie Hamm, 67000 Strasbourg</li>
            <li>
              <a className="transition hover:text-white" href="mailto:formation@gepromed.com">
                formation@gepromed.com
              </a>
            </li>
          </ul>
          <div className="mt-4 flex gap-3 font-mono text-xs font-medium uppercase tracking-annotation text-brand-200">
            <a href="https://www.linkedin.com/company/gepromed/" target="_blank" rel="noreferrer" className="transition hover:text-white">LinkedIn</a>
            <a href="https://twitter.com/gepromed" target="_blank" rel="noreferrer" className="transition hover:text-white">X</a>
            <a href="https://www.instagram.com/Gepromed/" target="_blank" rel="noreferrer" className="transition hover:text-white">Instagram</a>
          </div>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/50 sm:flex-row">
          <p className="font-mono">© {new Date().getFullYear()} {t("footer.rights")}</p>
          <p>{t("footer.legal")}</p>
        </div>
      </div>
    </footer>
  );
}
