"use client";

import { useCallback, useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

/**
 * Reusable responsive thumbnail grid with a fullscreen lightbox.
 * Pure React + Tailwind, no external dependencies. Keyboard accessible:
 * ESC closes, ← / → navigate, thumbnails are focusable buttons.
 */
export function PhotoGallery({ photos }: { photos: string[] }) {
  const { lang } = useLang();
  const tx = (fr: string, en: string) => (lang === "fr" ? fr : en);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const show = useCallback(
    (next: number) => {
      const n = photos.length;
      if (n === 0) return;
      setOpenIndex(((next % n) + n) % n);
    },
    [photos.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") show(openIndex + 1);
      else if (e.key === "ArrowLeft") show(openIndex - 1);
    };
    window.addEventListener("keydown", onKey);
    // Prevent background scroll while the lightbox is open.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openIndex, close, show]);

  if (photos.length === 0) return null;

  const current = openIndex !== null ? photos[openIndex] : null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {photos.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={tx(
              `Ouvrir la photo ${i + 1} sur ${photos.length}`,
              `Open photo ${i + 1} of ${photos.length}`,
            )}
            className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-mist focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={tx(`Photo ${i + 1}`, `Photo ${i + 1}`)}
              loading="lazy"
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {current !== null && openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={tx("Galerie photo", "Photo gallery")}
          onClick={close}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
        >
          {/* Close */}
          <button
            type="button"
            onClick={close}
            aria-label={tx("Fermer", "Close")}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  show(openIndex - 1);
                }}
                aria-label={tx("Photo précédente", "Previous photo")}
                className="absolute left-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-6"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  show(openIndex + 1);
                }}
                aria-label={tx("Photo suivante", "Next photo")}
                className="absolute right-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current}
            alt={tx(
              `Photo ${openIndex + 1} sur ${photos.length}`,
              `Photo ${openIndex + 1} of ${photos.length}`,
            )}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
          />

          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-xs text-white/80">
            {openIndex + 1} / {photos.length}
          </p>
        </div>
      )}
    </>
  );
}
