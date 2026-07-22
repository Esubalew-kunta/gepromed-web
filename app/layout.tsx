import type { Metadata } from "next";
import { Spectral, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import { TrainingsProvider } from "@/lib/trainings-context";
import { CookieConsentProvider } from "@/lib/cookie-consent";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CookieConsent } from "@/components/CookieConsent";
import { Analytics } from "@/components/Analytics";
import { DonateButton } from "@/components/DonateButton";

// Display: scientific-journal serif for institutional gravitas.
const display = Spectral({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

// Body / UI: IBM Plex Sans, engineering-documentation heritage, strong bilingual FR/EN.
const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

// Data / annotation: IBM Plex Mono, for stats, ISO numbers, dates and specimen tags.
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gepromed | Medical device safety, surgical training and explant analysis",
  description:
    "Gepromed is a Strasbourg research institute at the intersection of medical device safety, surgical training and biomaterials research. Four platforms, one implant cycle, since 1993.",
  // Disable browser auto-translate: when Chrome translates the bilingual UI it
  // wraps text nodes in <font> tags React doesn't track, causing removeChild/
  // insertBefore crashes on dynamic content (register/lead forms).
  other: { google: "notranslate" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      translate="no"
      className={`notranslate ${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-paper text-ink">
        <LanguageProvider>
          <CookieConsentProvider>
            <TrainingsProvider>
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
              <DonateButton />
              <CookieConsent />
              <Analytics />
            </TrainingsProvider>
          </CookieConsentProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
