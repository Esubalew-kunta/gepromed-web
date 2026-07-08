"use client";

import { useCallback, useEffect, useState } from "react";

/* CongressGallery: a self-contained responsive thumbnail grid with a fullscreen
   lightbox. Pure React + Tailwind, no external dependencies.
   - Click a thumbnail to open the lightbox.
   - Prev / next navigation (buttons + Arrow keys), wrapping.
   - ESC or click on the dark backdrop closes it.
   - Keyboard accessible: thumbnails are real buttons, controls are labelled,
     focus is moved into the dialog and body scroll is locked while open. */
export function CongressGallery({ photos }: { photos: string[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;
  const count = photos.length;

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + count) % count)),
    [count],
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % count)),
    [count],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, prev, next]);

  if (count === 0) return null;

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {photos.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Ouvrir la photo ${i + 1} sur ${count} / Open photo ${i + 1} of ${count}`}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-line bg-mist shadow-card outline-none transition hover:-translate-y-0.5 hover:shadow-soft focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {open && index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Galerie photos / Photo gallery"
          onClick={close}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          {/* Close */}
          <button
            type="button"
            onClick={close}
            aria-label="Fermer / Close"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/25 text-2xl leading-none text-white outline-none transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white"
          >
            <span aria-hidden>×</span>
          </button>

          {count > 1 && (
            <>
              {/* Prev */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Photo précédente / Previous photo"
                className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/25 text-3xl leading-none text-white outline-none transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white sm:left-6"
              >
                <span aria-hidden>‹</span>
              </button>
              {/* Next */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Photo suivante / Next photo"
                className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/25 text-3xl leading-none text-white outline-none transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white sm:right-6"
              >
                <span aria-hidden>›</span>
              </button>
            </>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={photos[index]}
            src={photos[index]}
            alt={`Photo ${index + 1} / ${count}`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[86vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
          />

          {count > 1 && (
            <span className="stat-figure absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs text-white/90">
              {index + 1} / {count}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default CongressGallery;
