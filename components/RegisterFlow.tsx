"use client";

import { useSearchParams } from "next/navigation";
import { useT } from "@/lib/i18n";
import { RegisterPanel } from "@/components/RegisterPanel";

export function RegisterFlow() {
  const t = useT();
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
      </section>
    </>
  );
}
