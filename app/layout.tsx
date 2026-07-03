import type { Metadata } from "next";
import { Spectral, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import { TrainingsProvider } from "@/lib/trainings-context";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-paper text-ink">
        <LanguageProvider>
          <TrainingsProvider>
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </TrainingsProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
