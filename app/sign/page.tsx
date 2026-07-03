import { Suspense } from "react";
import { SignUpload } from "@/components/SignUpload";

export const metadata = { title: "Contrat signé | Gepromed" };

export default function SignPage() {
  return (
    <>
      <section className="border-b border-line bg-paper">
        <div className="container-page py-16">
          <p className="mono-label-brand">Gepromed · Inscription</p>
          <h1 className="mt-3 text-4xl sm:text-5xl">Contrat d&apos;engagement</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
            Déposez votre contrat signé pour finaliser votre inscription.
          </p>
        </div>
      </section>
      <section className="container-page max-w-2xl py-14">
        <Suspense
          fallback={
            <div className="card p-8 text-center text-ink-muted">Chargement…</div>
          }
        >
          <SignUpload />
        </Suspense>
      </section>
    </>
  );
}
