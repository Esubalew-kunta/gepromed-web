import Link from "next/link";

export const metadata = { title: "Espace organisateur | Gepromed" };

/**
 * The lead pipeline now lives in the staff SaaS console (separate app).
 * This public route just points staff there.
 */
export default function DashboardMoved() {
  const consoleUrl = process.env.NEXT_PUBLIC_CONSOLE_URL || "http://localhost:3000";
  return (
    <section className="container-page py-24 text-center">
      <div className="mx-auto max-w-lg">
        <h1 className="text-3xl">Espace organisateur</h1>
        <p className="mt-3 text-ink-muted">
          La gestion des leads et des formations se fait désormais dans la console
          interne AI Makers, un espace sécurisé réservé à l&apos;équipe.
        </p>
        <p className="mt-1 text-sm text-ink-muted">
          Lead &amp; course management has moved to the internal AI Makers console.
        </p>
        <a href={consoleUrl} target="_blank" rel="noreferrer" className="btn-primary mt-8 inline-flex">
          Ouvrir la console ↗
        </a>
        <div className="mt-4">
          <Link href="/" className="text-sm text-brand-700 hover:underline">
            ← Retour au site
          </Link>
        </div>
      </div>
    </section>
  );
}
