"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useT, useLang } from "@/lib/i18n";
import { RegisterPanel } from "@/components/RegisterPanel";

export function RegisterFlow() {
  const t = useT();
  const { lang } = useLang();
  const params = useSearchParams();
  const preselect = params.get("session") || "";

  return (
    <>
      <section className="border-b border-line bg-paper">
        <div className="container-page py-14">
          <p className="mono-label-brand">
            {t("nav.register")} · {t("home.trustQualiopi")}
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl">{t("reg.title")}</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">{t("reg.subtitle")}</p>
        </div>
      </section>
      <section className="container-page max-w-3xl py-14">
        <div className="tick-frame card p-6 sm:p-8">
          <RegisterPanel initialSlug={preselect} />
        </div>
        <p className="mt-4 text-center text-sm text-ink-muted">
          {lang === "fr" ? (
            <>
              Vous représentez la fondation HelpMeSee ?{" "}
              <Link href="/lead/helpmesee" className="underline hover:text-ink-soft">
                Utilisez le formulaire de référencement dédié
              </Link>
              .
            </>
          ) : (
            <>
              Representing the HelpMeSee foundation?{" "}
              <Link href="/lead/helpmesee" className="underline hover:text-ink-soft">
                Use the dedicated referral form
              </Link>
              .
            </>
          )}
        </p>
      </section>
    </>
  );
}
