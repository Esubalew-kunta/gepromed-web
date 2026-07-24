"use client";

import { useState } from "react";
import { useLang, loc, type Lang } from "@/lib/i18n";
import { Sheet } from "@/components/ui/Sheet";
import type { EngineeringItem } from "@/lib/engineering";
import { createEngineeringRequest } from "@/lib/data";

const tx = (fr: string, en: string, lang: Lang) => (lang === "fr" ? fr : en);

export function EngineeringExplorer({
  items,
  requireDate = false,
}: {
  /** cards to display for this band */
  items: EngineeringItem[];
  /** Equipment Rental band adds a "Desired date" field */
  requireDate?: boolean;
}) {
  const { lang } = useLang();
  const [detail, setDetail] = useState<EngineeringItem | null>(null);
  const [request, setRequest] = useState<EngineeringItem | null>(null);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <EngineeringCard key={item.id} item={item} onOpen={() => setDetail(item)} />
        ))}
      </div>

      {/* Detail side drawer */}
      <Sheet
        open={!!detail}
        onClose={() => setDetail(null)}
        title={detail ? loc(detail.title, lang) : ""}
        maxWidth="max-w-2xl"
      >
        {detail && (
          <DetailPanel
            item={detail}
            onRequest={() => setRequest(detail)}
          />
        )}
      </Sheet>

      {/* Request form modal */}
      <Sheet
        open={!!request}
        onClose={() => setRequest(null)}
        position="center"
        title={tx("Demande de prestation", "Service request", lang)}
        maxWidth="max-w-2xl"
      >
        {request && <RequestForm item={request} requireDate={requireDate} />}
      </Sheet>
    </>
  );
}

function EngineeringCard({
  item,
  onOpen,
}: {
  item: EngineeringItem;
  onOpen: () => void;
}) {
  const { lang } = useLang();

  return (
    <button
      onClick={onOpen}
      className="tick-frame group flex flex-col overflow-hidden rounded-xl2 border border-line bg-white text-left shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-soft"
    >
    <div className="relative flex h-44 items-end overflow-hidden bg-white p-4">
  {item.image ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={item.image}
      alt={loc(item.title, lang)}
      className="absolute inset-0 h-full w-full object-contain p-3 transition duration-300 group-hover:scale-[1.03]"
    />
  ) : (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-brand-700 via-brand-600 to-safety-500" />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
    </>
  )}

  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink/75 to-transparent" />

  <div className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-brand-700/90 text-white shadow-sm backdrop-blur">
    <CategoryIcon category={item.category} />
  </div>

  <span className="pill relative border border-white/30 bg-ink/65 font-mono text-[0.66rem] uppercase tracking-annotation text-white backdrop-blur">
    {loc(item.tag, lang)}
  </span>
</div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg leading-snug text-ink">{loc(item.title, lang)}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-soft">
          {loc(item.summary, lang)}
        </p>
        <div className="mt-5 flex items-center justify-end border-t border-line pt-4">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition group-hover:gap-2.5">
            {tx("Détails", "Details", lang)}
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </button>
  );
}

function DetailPanel({
  item,
  onRequest,
}: {
  item: EngineeringItem;
  onRequest: () => void;
}) {
  const { lang } = useLang();

  return (
    <div>
      <div className="relative flex h-56 items-end overflow-hidden bg-gradient-to-br from-brand-800 via-brand-600 to-safety-500 p-5 sm:h-64">
        {item.image && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${item.image}')` }}
          />
        )}
        {item.image ? (
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/35 to-brand-950/10" />
        ) : (
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
        )}
        <div className="relative text-white">
          <span className="pill border border-white/20 bg-white/15 font-mono text-[0.66rem] uppercase tracking-annotation text-white backdrop-blur">
            {loc(item.tag, lang)}
          </span>
        </div>

        {/* Category icon */}
        <div className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-brand-100 bg-white/90 text-brand-700 shadow-sm backdrop-blur">
          <CategoryIcon category={item.category} />
        </div>

        <figcaption className="sr-only">
          {loc(item.title, lang)}
        </figcaption>
      </figure>

      {/* Equipment information */}
      <div className="flex-1 p-6 sm:p-7">
        <div className="border-b border-line pb-6">
          <p className="mono-label-brand">
            {tx("Équipement", "Equipment", lang)}
          </p>

          <h3 className="mt-2 font-display text-2xl leading-tight text-ink sm:text-3xl">
            {loc(item.title, lang)}
          </h3>

          <p className="mt-3 text-base leading-relaxed text-ink-soft">
            {loc(item.summary, lang)}
          </p>
        </div>

        {/* Description */}
        <section className="py-6">
          <h4 className="font-display text-lg text-ink">
            {tx("Présentation", "Overview", lang)}
          </h4>

          <div className="mt-3 space-y-4">
            {item.description.map((paragraph, index) => (
              <p
                key={index}
                className="leading-relaxed text-ink-soft"
              >
                {loc(paragraph, lang)}
              </p>
            ))}
          </div>
        </section>

        {/* Capabilities */}
        <section className="border-t border-line pt-6">
          <h4 className="font-display text-lg text-ink">
            {tx(
              "Caractéristiques principales",
              "Key capabilities",
              lang,
            )}
          </h4>

          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {item.highlights.map((highlight) => (
              <li
                key={highlight.en}
                className="flex items-start gap-3 rounded-xl border border-line bg-paper p-3.5"
              >
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                  ✓
                </span>

                <span className="text-sm leading-relaxed text-ink-soft">
                  {loc(highlight, lang)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Sticky action area */}
      <footer className="sticky bottom-0 border-t border-line bg-white/95 px-6 py-4 shadow-[0_-8px_24px_rgba(15,23,42,0.06)] backdrop-blur sm:px-7">
        <button
          type="button"
          onClick={onRequest}
          className="btn-primary w-full"
        >
          {tx(
            "Demander cet équipement",
            "Request this equipment",
            lang,
          )}
        </button>

        <p className="mt-2 text-center text-xs leading-relaxed text-ink-muted">
          {tx(
            "Demande sans engagement. Notre équipe vous recontacte pour confirmer la disponibilité et établir un devis.",
            "No-commitment request. Our team will contact you to confirm availability and prepare a quote.",
            lang,
          )}
        </p>
      </footer>
    </article>
  );
}

const EMPTY = { name: "", email: "", institution: "", desiredDate: "", message: "" };

// Website engineering band → console pipeline kind.
const KIND: Record<string, "explant" | "test" | "equipment"> = {
  explant: "explant",
  testing: "test",
  rental: "equipment",
};

function RequestForm({
  item,
  requireDate,
}: {
  item: EngineeringItem;
  requireDate: boolean;
}) {
  const { lang } = useLang();
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [doneRef, setDoneRef] = useState<string | null>(null);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const ref = await createEngineeringRequest({
        kind: KIND[item.category],
        name: form.name,
        email: form.email,
        institution: form.institution || undefined,
        desiredDate: form.desiredDate || undefined,
        notes: form.message || undefined,
        meta: { item: item.id, item_title: item.title.en },
      });
      setDoneRef(ref);
    } catch {
      // Graceful demo fallback when the backend is unavailable.
      setDoneRef(`ENG-${Math.random().toString(36).slice(2, 7).toUpperCase()}`);
    } finally {
      setSubmitting(false);
    }
  }

  if (doneRef) {
    return (
      <div className="p-6 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-3xl text-brand-600">
          ✓
        </div>
        <h2 className="mt-4 text-2xl">
          {tx("Demande enregistrée !", "Request saved!", lang)}
        </h2>
        <p className="mt-3 text-ink-soft">
          {tx(
            "Nous avons bien reçu votre demande. Notre équipe vous recontacte pour établir un devis.",
            "We have received your request. Our team will contact you to prepare a quote.",
            lang,
          )}
        </p>
        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-mist px-4 py-2 text-sm">
          <span className="mono-label">{tx("Votre référence", "Your reference", lang)}</span>
          <span className="stat-figure font-semibold text-brand-700">{doneRef}</span>
        </div>
        <div className="mt-8">
          <button
            onClick={() => {
              setDoneRef(null);
              setForm(EMPTY);
            }}
            className="btn-ghost"
          >
            {tx("Nouvelle demande", "New request", lang)}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6">
      <div className="rounded-lg border border-brand-100 bg-brand-50/60 px-4 py-3 text-sm">
        <p className="mono-label-brand">{tx("Prestation", "Service", lang)}</p>
        <p className="mt-1 font-semibold text-ink">{loc(item.title, lang)}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label={`${tx("Nom complet", "Full name", lang)} *`}
          value={form.name}
          onChange={(v) => update("name", v)}
          required
        />
        <Field
          label={`${tx("E-mail", "Email", lang)} *`}
          type="email"
          value={form.email}
          onChange={(v) => update("email", v)}
          required
        />
        <Field
          label={tx("Établissement", "Institution", lang)}
          value={form.institution}
          onChange={(v) => update("institution", v)}
        />
        {requireDate && (
          <Field
            label={tx("Date souhaitée", "Desired date", lang)}
            type="date"
            value={form.desiredDate}
            onChange={(v) => update("desiredDate", v)}
          />
        )}
      </div>

      <div>
        <label className="field-label">{tx("Message", "Message", lang)}</label>
        <textarea
          className="field-input min-h-[100px]"
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder={tx(
            "Décrivez votre besoin, vos échantillons ou vos contraintes de planning…",
            "Describe your need, your samples or your scheduling constraints…",
            lang,
          )}
        />
      </div>

      <button type="submit" disabled={submitting} className="btn-primary w-full">
        {submitting
          ? tx("Envoi…", "Submitting…", lang)
          : tx("Envoyer ma demande", "Submit my request", lang)}
      </button>
      <p className="text-center text-xs text-ink-muted">
        {tx(
          "Demande sans engagement, traitée comme un lead (démo).",
          "No-commitment request, handled as a lead (demo).",
          lang,
        )}
      </p>
    </form>
  );
}

function Field({
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

function CategoryIcon({ category }: { category: EngineeringItem["category"] }) {
  const common = {
    viewBox: "0 0 24 24",
    className: "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (category === "explant") {
    // magnifier / analysis
    return (
      <svg {...common}>
        <circle cx="11" cy="11" r="6" />
        <path d="M20 20l-3.5-3.5" />
      </svg>
    );
  }
  if (category === "testing") {
    // gauge / testing
    return (
      <svg {...common}>
        <path d="M4 14a8 8 0 0116 0" />
        <path d="M12 14l4-3" />
      </svg>
    );
  }
  // rental / calendar
  return (
    <svg {...common}>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 9h16M8 3v4M16 3v4" />
    </svg>
  );
}
