"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  type TrainingSession,
  SPECIALTY_LABELS,
  SPECIALTY_IMAGE,
  LEVEL_LABELS,
  AUDIENCE_LABELS,
  formatDateRange,
  spotsLeft,
  isUpcoming,
  isHelpMeSee,
  programPdfUrl,
} from "@/lib/trainings";
import { useLang, useT, loc } from "@/lib/i18n";
import { PhotoGallery } from "@/components/PhotoGallery";
import { PriceOrSponsor } from "@/components/TrainingsExplorer";

export function TrainingDetailView({ t }: { t: TrainingSession }) {
  const { lang } = useLang();
  const tr = useT();
  const tx = (fr: string, en: string) => (lang === "fr" ? fr : en);
  const upcoming = isUpcoming(t);
  const hms = isHelpMeSee(t);
  const left = spotsLeft(t);
  const full = left === 0;
  const programUrl = programPdfUrl(t.slug);
  // The PDF opens in a new tab with no browser history, so it can't just go
  // "back" — pass this page's own URL for the printed program's "← Retour"
  // link. Computed client-side only (useEffect) so SSR, which has no
  // window.location, never emits a bare relative path as the return URL.
  const [programUrlWithReturn, setProgramUrlWithReturn] = useState<string | null>(programUrl);
  useEffect(() => {
    if (!programUrl) return;
    const sep = programUrl.includes("?") ? "&" : "?";
    setProgramUrlWithReturn(`${programUrl}${sep}return=${encodeURIComponent(window.location.href)}`);
  }, [programUrl]);
  const [copied, setCopied] = useState(false);

  const copyRegistrationLink = async () => {
    const path = `/register?session=${t.slug}`;
    const url =
      typeof window !== "undefined" ? new URL(path, window.location.origin).toString() : path;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — no-op.
    }
  };

  return (
    <>
      <section className="relative overflow-hidden border-b border-brand-800 bg-brand-950 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${t.imageUrl || SPECIALTY_IMAGE[t.specialty]}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/85 to-brand-950/55" />
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="container-page relative py-14">
          <Link href="/trainings" className="mono-label inline-flex text-brand-200 transition hover:text-white">
            {tr("detail.back")}
          </Link>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="pill bg-white/10 text-brand-50 ring-1 ring-white/20">
              {loc(SPECIALTY_LABELS[t.specialty], lang)}
            </span>
            {hms && (
              <span className="pill bg-amber-400 font-semibold text-amber-950">
                {tr("trainings.helpmesee")}
              </span>
            )}
            <span className="pill border border-white/20 bg-white/5 font-mono text-[0.66rem] uppercase tracking-annotation text-brand-100">
              {tr("detail.level")} {loc(LEVEL_LABELS[t.level], lang)}
            </span>
            <span className="pill bg-white/10 text-brand-50 ring-1 ring-white/20">
              {tr("detail.audience")}: {loc(AUDIENCE_LABELS[t.audience], lang)}
            </span>
            {t.qualiopi && <span className="pill bg-brand-50 text-brand-700">✓ Qualiopi</span>}
          </div>
          <h1 className="mt-4 max-w-3xl text-4xl text-white sm:text-5xl">{loc(t.title, lang)}</h1>
          <p className="mt-4 font-mono text-sm text-white/75">
            {formatDateRange(t.startDate, t.endDate, lang)} · {t.durationDays}{" "}
            {tr("detail.days")} · {loc(t.venue, lang)}, {t.city}
          </p>
          {t.targetAudience.length > 0 && (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="mono-label text-brand-200">
                {tx("Public visé", "Target audience")}
              </span>
              {t.targetAudience.map((a) => (
                <span key={a} className="pill bg-white/10 text-brand-50 ring-1 ring-white/20">
                  {a}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="container-page grid gap-10 py-14 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-2xl">{tr("detail.intro")}</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">{loc(t.summary, lang)}</p>

          <h2 className="mt-10 text-2xl">{tr("detail.objectives")}</h2>
          <ul className="mt-4 space-y-2">
            {t.objectives.map((o) => (
              <li key={o.en} className="flex gap-3 text-ink-soft">
                <span className="mt-1 text-brand-500">✓</span>
                <span>{loc(o, lang)}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-2xl">{tr("detail.program")}</h2>
          <div className="mt-4 space-y-4">
            {t.program.map((d) => (
              <div key={d.day.en} className="card p-5">
                <h3 className="text-base font-semibold text-brand-700">
                  {loc(d.day, lang)}
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm text-ink-soft">
                  {d.items.map((it) => (
                    <li key={it.en} className="flex gap-2">
                      <span className="text-ink-muted">•</span> {loc(it, lang)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h2 className="mt-10 text-2xl">{tr("detail.supervisors")}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {t.supervisors.map((s) => (
              <div key={s.name} className="card flex items-center gap-3 p-4">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-brand-50 font-semibold text-brand-700">
                  {s.name.split(" ").slice(-1)[0][0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{s.name}</p>
                  <p className="text-xs text-ink-muted">{loc(s.role, lang)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Qualiopi programme blocks (rendered only when provided) */}
          {t.prerequisites && (
            <InfoBlock title={tx("Prérequis", "Prerequisites")} value={loc(t.prerequisites, lang)} />
          )}
          {t.teachingMethods && (
            <InfoBlock
              title={tx("Méthodes d'enseignement", "Teaching methods")}
              value={loc(t.teachingMethods, lang)}
            />
          )}
          {t.pedagogicalResources && (
            <InfoBlock
              title={tx("Ressources pédagogiques", "Pedagogical resources")}
              value={loc(t.pedagogicalResources, lang)}
            />
          )}
          {t.evaluationMethods && (
            <InfoBlock
              title={tx("Méthodes d'évaluation", "Evaluation methods")}
              value={loc(t.evaluationMethods, lang)}
            />
          )}
          {t.supervisionOrganization && (
            <InfoBlock
              title={tx("Organisation / encadrement", "Supervision / organisation")}
              value={loc(t.supervisionOrganization, lang)}
            />
          )}
          {t.accessibilityInfo && (
            <InfoBlock
              title={tr("detail.accessibility")}
              value={
                t.accessibilityReferent
                  ? `${loc(t.accessibilityInfo, lang)} ${tx("Référent handicap", "Disability referent")}: ${t.accessibilityReferent}.`
                  : loc(t.accessibilityInfo, lang)
              }
            />
          )}
          {t.registrationInfo && (
            <InfoBlock title={tr("detail.registration")} value={loc(t.registrationInfo, lang)} />
          )}
          {t.priceNote && <InfoBlock title={tr("detail.priceNote")} value={loc(t.priceNote, lang)} />}
          {t.certificateDelivered && (
            <InfoBlock title={tr("detail.certificate")} value={loc(t.certificateDelivered, lang)} />
          )}

          {!upcoming && t.satisfaction && (
            <>
              <h2 className="mt-10 text-2xl">{tr("detail.results")}</h2>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <Stat label={tr("detail.satisfaction")} value={`${t.satisfaction}%`} />
                {t.passRate != null && (
                  <Stat label={tr("detail.passRate")} value={`${t.passRate}%`} />
                )}
              </div>
            </>
          )}

          {t.photos && t.photos.length > 0 && (
            <>
              <h2 className="mt-10 text-2xl">{tr("detail.photos")}</h2>
              <div className="mt-4">
                <PhotoGallery photos={t.photos ?? []} />
              </div>
            </>
          )}
        </div>

        <aside className="lg:col-span-1">
          <div className="tick-frame sticky top-24 card p-6">
            <p className="mono-label-brand">{tx("Réserver cette session", "Book this session")}</p>
            <h3 className="mt-1 font-display text-xl text-ink">{loc(t.title, lang)}</h3>

            <dl className="mt-5 space-y-2.5 text-sm">
              <Row k={tr("detail.dates")} v={formatDateRange(t.startDate, t.endDate, lang)} />
              <Row k={tr("detail.duration")} v={`${t.durationDays} ${tr("detail.days")}`} />
              <Row k={tr("detail.place")} v={t.city} />
              <Row k={tr("detail.maxParticipants")} v={`${t.capacity}`} />
              <div className="flex justify-between gap-4">
                <dt className="text-ink-muted">{tx("Tarif", "Price")}</dt>
                <dd className="text-right font-medium text-ink">
                  <PriceOrSponsor t={t} />
                </dd>
              </div>
              <Row
                k={tr("detail.availability")}
                v={
                  hms
                    ? tr("trainings.helpmesee")
                    : !upcoming
                      ? tr("common.past")
                      : full
                        ? tr("common.full")
                        : `${left} ${tr("common.spotsLeft")}`
                }
              />
            </dl>

            {upcoming ? (
              hms ? (
                <div className="mt-6 space-y-3">
                  <p className="flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2.5 text-sm text-amber-800">
                    <svg className="mt-0.5 h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span>{tr("trainings.helpmeseeNote")}</span>
                  </p>
                  <Link href={`/register?session=${t.slug}`} className="btn-ghost w-full">
                    {tr("trainings.helpmeseeCta")}
                  </Link>
                </div>
              ) : full ? (
                <button disabled className="btn-primary mt-6 w-full">
                  {tr("detail.full")}
                </button>
              ) : (
                <Link href={`/register?session=${t.slug}`} className="btn-primary mt-6 w-full">
                  {tr("detail.registerThis")}
                </Link>
              )
            ) : (
              <Link href="/trainings" className="btn-ghost mt-6 w-full">
                {tr("detail.seeUpcoming")}
              </Link>
            )}

            {/* Program PDF (generated by the external qualiopi console service) */}
            {programUrlWithReturn ? (
              <a
                href={programUrlWithReturn}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost mt-3 flex w-full items-center justify-center gap-2"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {tx("Télécharger le programme (PDF)", "Download program (PDF)")}
              </a>
            ) : (
              <button
                type="button"
                disabled
                title={tx("Bientôt disponible", "Coming soon")}
                className="btn-ghost mt-3 flex w-full cursor-not-allowed items-center justify-center gap-2 opacity-60"
              >
                {tx("Programme PDF : bientôt disponible", "Program PDF: coming soon")}
              </button>
            )}

            {/* Shareable registration link */}
            <button
              type="button"
              onClick={copyRegistrationLink}
              className="btn-ghost mt-3 flex w-full items-center justify-center gap-2"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 13a5 5 0 007.07 0l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 11a5 5 0 00-7.07 0l-3 3a5 5 0 007.07 7.07l1.71-1.71" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {copied
                ? tx("Lien copié ✓", "Link copied ✓")
                : tx("Copier le lien d'inscription", "Copy registration link")}
            </button>

            <p className="mt-4 text-center text-xs text-ink-muted">
              {tr("detail.noEngagement")}
            </p>
          </div>
        </aside>
      </section>

      {/* Sponsors — dedicated section at the bottom of the page (client request).
          Data-driven from t.sponsors (Supabase); never shown for HelpMeSee. */}
      {!hms && t.isSponsored && t.sponsors && t.sponsors.length > 0 && (
        <section className="border-t border-line bg-mist/40 py-14">
          <div className="container-page">
            <p className="mono-label-brand">{tr("trainings.sponsoredBy")}</p>
            <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">
              {tx("Nos sponsors", "Our sponsors")}
            </h2>
            <div className="mt-8 flex flex-wrap items-center gap-x-12 gap-y-8">
              {t.sponsors.map((s) => (
                <div key={s.name} className="flex flex-col items-start gap-2">
                  {s.logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={s.logoUrl}
                      alt={s.name}
                      className="h-14 w-auto max-w-[12rem] object-contain"
                    />
                  ) : (
                    <span className="font-display text-lg font-semibold text-ink">{s.name}</span>
                  )}
                  {s.website ? (
                    <a
                      href={s.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-brand-700 underline underline-offset-2"
                    >
                      {s.name}
                    </a>
                  ) : s.logoUrl ? (
                    <span className="text-sm text-ink-muted">{s.name}</span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-ink-muted">{k}</dt>
      <dd className="text-right font-medium text-ink">{v}</dd>
    </div>
  );
}

function InfoBlock({ title, value }: { title: string; value: string }) {
  return (
    <>
      <h2 className="mt-10 text-2xl">{title}</h2>
      <p className="mt-3 leading-relaxed text-ink-soft">{value}</p>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card p-4 text-center">
      <p className="stat-figure text-2xl font-semibold text-brand-700">{value}</p>
      <p className="mt-0.5 text-xs text-ink-muted">{label}</p>
    </div>
  );
}
