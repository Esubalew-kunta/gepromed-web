"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  isUpcoming,
  spotsLeft,
  formatDateRange,
  isHelpMeSee,
} from "@/lib/trainings";
import { useTrainings } from "@/lib/trainings-context";
import { useLang, useT, loc } from "@/lib/i18n";
import { createLead } from "@/lib/data";

const EMPTY = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  profession: "",
  institution: "",
  country: "",
  dietary: "",
  notes: "",
  // foundation (helpmesee variant)
  helpMeSeeRef: "",
  coordinator: "",
};

const PROFESSIONS: { value: string; fr: string; en: string }[] = [
  { value: "Résident", fr: "Résident", en: "Resident" },
  { value: "Interne", fr: "Interne", en: "Junior doctor" },
  { value: "IBODE", fr: "IBODE", en: "OR nurse (IBODE)" },
  { value: "Infirmier(ère)", fr: "Infirmier(ère)", en: "Nurse" },
  { value: "Chirurgien", fr: "Chirurgien", en: "Surgeon" },
  { value: "Praticien hospitalier", fr: "Praticien hospitalier", en: "Hospital practitioner" },
  { value: "Autre", fr: "Autre", en: "Other" },
];

const COUNTRIES: string[] = [
  "France",
  "Belgique",
  "Suisse",
  "Luxembourg",
  "Allemagne",
  "Espagne",
  "Italie",
  "Portugal",
  "Royaume-Uni",
  "Pays-Bas",
  "Irlande",
  "Autriche",
  "Danemark",
  "Suède",
  "Norvège",
  "Finlande",
  "Pologne",
  "Grèce",
  "Roumanie",
  "Hongrie",
  "République tchèque",
  "Croatie",
  "Slovénie",
  "Slovaquie",
  "Bulgarie",
  "Canada",
  "États-Unis",
  "Maroc",
  "Tunisie",
  "Algérie",
  "Autre / Other",
];

export function RegisterPanel({
  initialSlug = "",
  embedded = false,
}: {
  initialSlug?: string;
  embedded?: boolean;
}) {
  const { lang } = useLang();
  const t = useT();
  const trainings = useTrainings();

  // One public form for every training type (client response 2026-07-16:
  // "no public referral link, Gepromed is the intermediary for each
  // registrant" — self-funded, sponsored and HelpMeSee all use the same
  // /register flow, differentiated by the SELECTED training, not a separate
  // page/variant). create_lead derives the parcours from the chosen session.
  //
  // Seat gating differs by pathway: self/sponsored registration needs open
  // seats, but HelpMeSee does not — the foundation dictates enrollment, so
  // those sessions stay listed regardless of the public seat counter.
  const bookable = trainings.filter((x) => {
    if (!isUpcoming(x)) return false;
    return isHelpMeSee(x) ? true : spotsLeft(x) > 0;
  });
  const [sessionSlug, setSessionSlug] = useState(
    bookable.some((x) => x.slug === initialSlug) ? initialSlug : "",
  );
  // `trainings` from useTrainings() loads asynchronously (seed data first,
  // then Supabase) — on first render `bookable` is often still empty, so the
  // useState above misses a same-mount match. Re-apply the ?session= link
  // once real data confirms it's bookable, but only once (appliedRef), so a
  // later click by the visitor is never overwritten.
  const appliedInitialSlugRef = useRef(false);
  useEffect(() => {
    if (appliedInitialSlugRef.current) return;
    if (!initialSlug) return;
    if (bookable.some((x) => x.slug === initialSlug)) {
      appliedInitialSlugRef.current = true;
      setSessionSlug(initialSlug);
    }
  }, [initialSlug, bookable]);
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [doneRef, setDoneRef] = useState<string | null>(null);

  const selected = trainings.find((x) => x.slug === sessionSlug);
  const isHms = selected ? isHelpMeSee(selected) : false;

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!sessionSlug || !selected) {
      setError(t("reg.chooseSession"));
      return;
    }
    setSubmitting(true);
    try {
      const ref = await createLead({
        sessionSlug,
        sessionTitle: loc(selected.title, "fr"),
        ...form,
      });
      setDoneRef(ref);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setSubmitting(false);
    }
  }

  if (doneRef) {
    return (
      <div className={embedded ? "p-6" : "container-page max-w-2xl py-16"}>
        <div className={embedded ? "text-center" : "tick-frame card p-8 text-center"}>
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-3xl text-brand-600">
            ✓
          </div>
          <h2 className="mt-4 text-2xl">{t("reg.successTitle")}</h2>
          <p className="mt-3 text-ink-soft">{t("reg.successBody")}</p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-mist px-4 py-2 text-sm">
            <span className="mono-label">{t("reg.yourRef")}</span>
            <span className="stat-figure font-semibold text-brand-700">{doneRef}</span>
          </div>
          <ol className="mx-auto mt-8 max-w-sm space-y-2 text-left text-sm text-ink-soft">
            {[t("reg.step1"), t("reg.step2"), t("reg.step3")].map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-600 text-xs font-semibold text-white">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/trainings" className="btn-primary">
              {t("home.ctaTrainings")}
            </Link>
            <button
              onClick={() => {
                setDoneRef(null);
                setForm(EMPTY);
              }}
              className="btn-ghost"
            >
              {t("reg.newRequest")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={embedded ? "space-y-6 p-6" : "space-y-6"}>
      <div>
        <p className="mono-label-brand mb-2">01 · {t("reg.session")}</p>
        <label className="field-label">{t("reg.chooseSession")} *</label>
        <select
          className="field-input"
          value={sessionSlug}
          onChange={(e) => {
            // A manual pick always wins over the ?session= auto-apply below.
            appliedInitialSlugRef.current = true;
            setSessionSlug(e.target.value);
          }}
          required
        >
          <option value="">{t("reg.selectPlaceholder")}</option>
          {bookable.map((x) => (
            <option key={x.slug} value={x.slug}>
              {loc(x.title, lang)} · {formatDateRange(x.startDate, x.endDate, lang)}
              {isHelpMeSee(x) ? ` · ${t("trainings.helpmesee")}` : ""}
            </option>
          ))}
        </select>
        {selected && (
          <div className="mt-3 flex items-center justify-between rounded-lg border border-brand-100 bg-brand-50/60 px-4 py-2.5 text-sm">
            <span className="text-ink-soft">{selected.city}</span>
            <span className="stat-figure font-semibold text-brand-700">
              {formatDateRange(selected.startDate, selected.endDate, lang)}
            </span>
          </div>
        )}
        {isHms && (
          <div className="mt-3 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <svg className="mt-0.5 h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>
              {lang === "fr"
                ? "Parcours fondation HelpMeSee. Gepromed vous transmettra le formulaire d'inscription HelpMeSee par email après cette demande. Aucun acompte ni contrat (financement selon le statut du participant)."
                : "HelpMeSee foundation pathway. Gepromed will email you HelpMeSee's enrollment form after this request. No deposit or contract (funding depends on participant status)."}
            </span>
          </div>
        )}
      </div>

      <div>
        <p className="mono-label-brand mb-2">02 · {t("reg.participant")}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label={`${t("reg.firstName")} *`} value={form.firstName} onChange={(v) => update("firstName", v)} required />
          <Input label={`${t("reg.lastName")} *`} value={form.lastName} onChange={(v) => update("lastName", v)} required />
          <Input label={`${t("reg.email")} *`} type="email" value={form.email} onChange={(v) => update("email", v)} required />
          <Input label={`${t("reg.phone")} *`} value={form.phone} onChange={(v) => update("phone", v)} required />
          <Select label={`${t("reg.profession")} *`} value={form.profession} onChange={(v) => update("profession", v)} required>
            <option value="" disabled>
              {lang === "fr" ? "Sélectionner…" : "Select…"}
            </option>
            {PROFESSIONS.map((p) => (
              <option key={p.value} value={p.value}>
                {lang === "fr" ? p.fr : p.en}
              </option>
            ))}
          </Select>
          <Input label={`${t("reg.institution")} *`} value={form.institution} onChange={(v) => update("institution", v)} required />
          <Select label={`${t("reg.country")} *`} value={form.country} onChange={(v) => update("country", v)} required>
            <option value="" disabled>
              {lang === "fr" ? "Sélectionner…" : "Select…"}
            </option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {isHms && (
        <div>
          <p className="mono-label-brand mb-2">
            03 · {lang === "fr" ? "Fondation" : "Foundation"}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label={lang === "fr" ? "Référence HelpMeSee" : "HelpMeSee reference #"}
              value={form.helpMeSeeRef}
              onChange={(v) => update("helpMeSeeRef", v)}
            />
            <Input
              label={lang === "fr" ? "Coordinateur référent" : "Referring coordinator"}
              value={form.coordinator}
              onChange={(v) => update("coordinator", v)}
            />
          </div>
        </div>
      )}

      <div>
        <p className="mono-label-brand mb-2">
          {isHms ? "04" : "03"} · {t("reg.logistics")}
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label={t("reg.dietary")} value={form.dietary} onChange={(v) => update("dietary", v)} />
        </div>
        <div className="mt-3">
          <label className="field-label">{t("reg.notes")}</label>
          <textarea className="field-input min-h-[80px]" value={form.notes} onChange={(e) => update("notes", e.target.value)} />
        </div>
      </div>

      {error && (
        <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>
      )}

      <button type="submit" disabled={submitting} className="btn-primary w-full">
        {submitting ? t("reg.submitting") : t("reg.submit")}
      </button>
      <p className="text-center text-xs text-ink-muted">{t("detail.noEngagement")}</p>
    </form>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="field-label">{label}</label>
      <input
        className="field-input"
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  required = false,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="field-label">{label}</label>
      <select
        className="field-input"
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
      >
        {children}
      </select>
    </div>
  );
}
