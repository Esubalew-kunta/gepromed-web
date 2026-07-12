"use client";

import { useLang } from "@/lib/i18n";
import { RegisterPanel } from "@/components/RegisterPanel";

/**
 * Private HelpMeSee referral form.
 *
 * Not linked anywhere in the public navigation — the foundation reaches it by
 * direct link (/lead/helpmesee). Submitting creates a lead in the HelpMeSee
 * parcours (create_lead derives the parcours from the chosen foundation
 * session), with no deposit/contract flow.
 */
export default function HelpMeSeeReferralPage() {
  const { lang } = useLang();

  return (
    <>
      <section className="border-b border-line bg-paper">
        <div className="container-page py-14">
          <p className="mono-label-brand">
            {lang === "fr"
              ? "Parcours HelpMeSee · Intake fondation"
              : "HelpMeSee parcours · Foundation intake"}
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl">
            {lang === "fr" ? "Référencer un participant" : "Refer a participant"}
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
            {lang === "fr"
              ? "Formulaire réservé à la fondation HelpMeSee. Chaque participant référencé est ajouté au parcours HelpMeSee dans la console Gepromed."
              : "For the HelpMeSee foundation only. Each participant referred here is added to the HelpMeSee parcours in the Gepromed console."}
          </p>
        </div>
      </section>
      <section className="container-page max-w-3xl py-14">
        <div className="tick-frame card p-6 sm:p-8">
          <RegisterPanel variant="helpmesee" />
        </div>
      </section>
    </>
  );
}
