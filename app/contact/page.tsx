"use client";

import { useState } from "react";
import { useT } from "@/lib/i18n";

export default function ContactPage() {
  const t = useT();
  const [sent, setSent] = useState(false);

  return (
    <>
      <section className="border-b border-line bg-paper">
        <div className="container-page py-16">
          <p className="mono-label-brand">{t("contact.title")} · Strasbourg</p>
          <h1 className="mt-3 text-4xl sm:text-5xl">{t("contact.title")}</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">{t("contact.subtitle")}</p>
        </div>
      </section>

      <section className="container-page grid gap-10 py-14 lg:grid-cols-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="tick-frame card space-y-4 p-6 sm:p-8 lg:col-span-2"
        >
          {sent && (
            <p className="rounded-lg border border-brand-100 bg-brand-50 px-4 py-3 text-sm text-brand-700">
              {t("contact.sent")}
            </p>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="field-label">{t("contact.name")}</label>
              <input className="field-input" required />
            </div>
            <div>
              <label className="field-label">{t("contact.email")}</label>
              <input className="field-input" type="email" required />
            </div>
          </div>
          <div>
            <label className="field-label">{t("contact.subject")}</label>
            <input className="field-input" />
          </div>
          <div>
            <label className="field-label">{t("contact.message")}</label>
            <textarea className="field-input min-h-[140px]" required />
          </div>
          <button type="submit" className="btn-primary">
            {t("contact.send")}
          </button>
        </form>

        <aside className="space-y-4">
          <div className="card p-6">
            <p className="mono-label-brand">{t("contact.address")}</p>
            <div className="mt-3 space-y-3 text-sm text-ink-soft">
              <p>
                <strong className="text-ink">Bureaux</strong>
                <br />
                Bâtiment d&apos;Anesthésiologie
                <br />
                1 place de l&apos;Hôpital
                <br />
                67085 Strasbourg, France
              </p>
              <p>
                <strong className="text-ink">Centre d&apos;Éducation</strong>
                <br />
                Bâtiment eXplora
                <br />
                2 rue Marie Hamm
                <br />
                67000 Strasbourg, France
              </p>
            </div>
          </div>
          <div className="card p-6 text-sm text-ink-soft">
            <a href="mailto:formation@gepromed.com" className="font-medium text-brand-700 hover:underline">formation@gepromed.com</a>
            <div className="mt-3 flex gap-3 font-mono text-xs font-medium uppercase tracking-annotation text-brand-700">
              <a href="https://www.linkedin.com/company/gepromed/" target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
              <a href="https://twitter.com/gepromed" target="_blank" rel="noreferrer" className="hover:underline">X</a>
              <a href="https://www.instagram.com/Gepromed/" target="_blank" rel="noreferrer" className="hover:underline">Instagram</a>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
