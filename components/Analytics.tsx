"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useCookieConsent } from "@/lib/cookie-consent";

/* Google Analytics 4, loaded ONLY after the visitor accepts analytics cookies
   (CNIL-compliant). Set NEXT_PUBLIC_GA_ID (e.g. "G-XXXXXXX") in .env.local and
   in the production environment; with no ID the component renders nothing.
   IP anonymization is on. Page views are sent on every client-side route
   change (Next App Router is a SPA, so we track navigation manually). */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer?: any[];
  }
}

export function Analytics() {
  const { consent } = useCookieConsent();
  const pathname = usePathname();
  const enabled = !!GA_ID && !!consent?.analytics;

  useEffect(() => {
    if (!enabled || typeof window === "undefined" || !window.gtag) return;
    window.gtag("config", GA_ID as string, { page_path: pathname });
  }, [pathname, enabled]);

  if (!enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
