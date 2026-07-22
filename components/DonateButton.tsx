"use client";

import { useLang } from "@/lib/i18n";

// TODO(client input): replace with the real donation link (donation page /
// HelloAsso / external URL) once provided. Single-line swap.
const DONATE_URL = "https://www.gepromed.com/en";

/**
 * Floating "Faire un don / Donate" button, persistent across every page
 * (rendered once in the root layout), styled like fondation-force.fr's
 * always-visible donation CTA.
 */
export function DonateButton() {
  const { lang } = useLang();
  const label = lang === "fr" ? "Faire un don" : "Donate";
  return (
    <a
      href={DONATE_URL}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="group fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-900/25 transition hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 sm:bottom-6 sm:right-6"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 transition group-hover:scale-110" fill="currentColor" aria-hidden>
        <path d="M12 21s-6.716-4.35-9.428-8.02C.878 10.7 1.29 7.66 3.4 6.1c1.79-1.32 4.14-.9 5.6.86L12 10l3-3.04c1.46-1.76 3.81-2.18 5.6-.86 2.11 1.56 2.52 4.6.83 6.88C18.716 16.65 12 21 12 21z" />
      </svg>
      {label}
    </a>
  );
}
