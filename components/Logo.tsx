import Link from "next/link";

/* Real Gepromed logo, downloaded from gepromed.com (public/brand/logo-gepromed-*.png):
   "THE MEDICAL DEVICE HUB / GEPROMED / FOR PATIENT SAFETY" lockup with the orange
   ring mark. `tone="ink"` (header, light background) uses the full-color lockup;
   `tone="light"` (dark footer) uses the white variant. */
export function Logo({
  className = "",
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "light";
}) {
  const src = tone === "light" ? "/brand/logo-gepromed-white.png" : "/brand/logo-gepromed-color.png";
  return (
    <Link
      href="/"
      className={`group inline-flex items-center ${className}`}
      aria-label="Gepromed, accueil"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Gepromed, the medical device hub for patient safety"
        className="h-9 w-auto object-contain transition group-hover:opacity-90"
      />
    </Link>
  );
}
