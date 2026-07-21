"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { useCookieConsent } from "@/lib/cookie-consent";

export function CookieConsent() {
  const { lang } = useLang();
  const tx = (fr: string, en: string) => (lang === "fr" ? fr : en);
  const { consent, hydrated, panelOpen, openPanel, closePanel, save } = useCookieConsent();
  const [customizing, setCustomizing] = useState(false);
  const [analyticsChoice, setAnalyticsChoice] = useState(false);

  const shouldShow = hydrated && (consent === null || panelOpen);
  if (!shouldShow) return null;

  const acceptAll = () => save({ essential: true, analytics: true });
  const rejectAll = () => save({ essential: true, analytics: false });
  const saveCustom = () => save({ essential: true, analytics: analyticsChoice });

  const isReopen = consent !== null && panelOpen;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={tx("Préférences relatives aux cookies", "Cookie preferences")}
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-line bg-white shadow-[0_-8px_30px_rgba(15,23,42,0.12)]"
    >
      <div className="container-page py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-ink">
              {tx("Gestion des cookies", "Cookie settings")}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
              {tx(
                "Nous utilisons des cookies essentiels au fonctionnement du site. Avec votre accord, nous pouvons aussi utiliser des cookies de mesure d'audience pour améliorer le site. Vous pouvez accepter, refuser ou personnaliser votre choix à tout moment.",
                "We use cookies that are essential for the site to work. With your consent, we may also use audience-measurement cookies to improve the site. You can accept, reject or customize your choice at any time.",
              )}{" "}
              <Link href="/about/privacy" className="underline hover:text-brand-700">
                {tx("En savoir plus", "Learn more")}
              </Link>
            </p>

            {customizing && (
              <div className="mt-4 space-y-3 rounded-xl border border-line bg-paper p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      {tx("Cookies essentiels", "Essential cookies")}
                    </p>
                    <p className="mt-0.5 text-xs text-ink-muted">
                      {tx(
                        "Nécessaires au fonctionnement du site (langue, session). Toujours actifs.",
                        "Required for the site to function (language, session). Always active.",
                      )}
                    </p>
                  </div>
                  <span className="mt-0.5 shrink-0 pill bg-mist text-ink-soft">{tx("Toujours actif", "Always on")}</span>
                </div>
                <div className="flex items-start justify-between gap-4 border-t border-line pt-3">
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      {tx("Mesure d'audience", "Audience measurement")}
                    </p>
                    <p className="mt-0.5 text-xs text-ink-muted">
                      {tx(
                        "Nous aide à comprendre l'usage du site pour l'améliorer. Désactivé par défaut.",
                        "Helps us understand site usage to improve it. Off by default.",
                      )}
                    </p>
                  </div>
                  <label className="mt-0.5 inline-flex shrink-0 cursor-pointer items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={analyticsChoice}
                      onChange={(e) => setAnalyticsChoice(e.target.checked)}
                      className="h-4 w-4 rounded border-line text-brand-600 focus:ring-brand-500"
                    />
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {isReopen && (
              <button type="button" onClick={closePanel} className="btn-ghost text-sm">
                {tx("Fermer", "Close")}
              </button>
            )}
            {customizing ? (
              <button type="button" onClick={saveCustom} className="btn-primary text-sm">
                {tx("Enregistrer mes choix", "Save my choices")}
              </button>
            ) : (
              <>
                <button type="button" onClick={() => setCustomizing(true)} className="btn-ghost text-sm">
                  {tx("Personnaliser", "Customize")}
                </button>
                <button type="button" onClick={rejectAll} className="btn-ghost text-sm">
                  {tx("Refuser tout", "Reject all")}
                </button>
                <button type="button" onClick={acceptAll} className="btn-primary text-sm">
                  {tx("Accepter tout", "Accept all")}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CookieSettingsLink({ className }: { className?: string }) {
  const { lang } = useLang();
  const tx = (fr: string, en: string) => (lang === "fr" ? fr : en);
  const { openPanel } = useCookieConsent();

  return (
    <button type="button" onClick={openPanel} className={className}>
      {tx("Gestion des cookies", "Cookie settings")}
    </button>
  );
}
