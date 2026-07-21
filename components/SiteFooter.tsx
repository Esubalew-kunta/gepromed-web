"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { useT, useLang } from "@/lib/i18n";
import { CookieSettingsLink } from "./CookieConsent";

// The four public funding institutions, per gepromed.com/en/about-us/our-funders
// (client: "only those 4"): Grand Est Region, European Union, Eurométropole de
// Strasbourg, and the CEA (Collectivité européenne d'Alsace, not the atomic
// energy commission — confirmed from the real logo artwork downloaded from
// the legacy site). Real logo images, downloaded from gepromed.com.
const FUNDERS: { src: string; alt: string }[] = [
  { src: "/brand/funders/region-grand-est.png", alt: "La Région Grand Est" },
  { src: "/brand/funders/european-union.png", alt: "Financé par l'Union européenne" },
  { src: "/brand/funders/eurometropole-strasbourg.png", alt: "Strasbourg Eurométropole" },
  { src: "/brand/funders/cea.png", alt: "Collectivité européenne d'Alsace" },
];

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
            <li><Link className="transition hover:text-white" href="/congresses">{t("nav.congresses")}</Link></li>
            <li><Link className="transition hover:text-white" href="/news">{t("nav.news")}</Link></li>
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
            <li className="pt-2">{tx("Bureaux, Bâtiment d'Anesthésiologie", "Offices, Anesthesiology Building")}</li>
            <li>1 place de l&apos;Hôpital, 67085 Strasbourg</li>
            <li className="pt-2">
              <a className="transition hover:text-white" href="mailto:formation@gepromed.com">
                formation@gepromed.com
              </a>
            </li>
          </ul>
          <div className="mt-4 flex items-center gap-4">
            <a
              href="https://www.linkedin.com/company/gepromed/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="opacity-80 transition hover:opacity-100"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/social/linkedin.svg" alt="LinkedIn" className="h-6 w-6" />
            </a>
            <a
              href="https://twitter.com/gepromed"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              className="opacity-80 transition hover:opacity-100"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/social/x.svg" alt="X" className="h-6 w-6" />
            </a>
            <a
              href="https://www.instagram.com/Gepromed/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="opacity-80 transition hover:opacity-100"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/social/instagram.svg" alt="Instagram" className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-page py-4">
          <h4 className="mono-label text-white/50">
            {tx("Ils nous financent", "Our funders")}
          </h4>
          <div className="mt-3 flex flex-wrap items-center gap-4">
            {FUNDERS.map((f) => (
              <span
                key={f.src}
                className="flex items-center rounded-lg bg-white/10 p-2"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.src} alt={f.alt} className="h-11 w-auto" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/50 sm:flex-row">
          <div className="flex flex-col items-center gap-1.5 sm:flex-row sm:gap-4">
            <p className="font-mono">© {new Date().getFullYear()} {t("footer.rights")}</p>
            <a
              href="https://aimakers.fr/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 transition hover:text-white"
            >
              {tx("Conçu par", "Built by")}
              <span className="font-semibold text-white/80">AI Makers</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/about/legal" className="transition hover:text-white">
              {t("footer.legalNotice")}
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/about/privacy" className="transition hover:text-white">
              {t("footer.privacyPolicy")}
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/about/quality" className="transition hover:text-white">
              {t("footer.qualityIndicators")}
            </Link>
            <span aria-hidden="true">·</span>
            <CookieSettingsLink className="transition hover:text-white" />
          </div>
        </div>
      </div>
    </footer>
  );
}
