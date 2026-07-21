"use client";

import { useMemo, useState } from "react";
import {
  isUpcoming,
  isHelpMeSee,
  spotsLeft,
  formatDateRange,
  euro,
  SPECIALTY_LABELS,
  SPECIALTY_IMAGE,
  LEVEL_LABELS,
  AUDIENCE_LABELS,
  type Specialty,
  type TrainingSession,
} from "@/lib/trainings";
import Link from "next/link";
import { useTrainings } from "@/lib/trainings-context";
import { useLang, useT, loc } from "@/lib/i18n";
import { Sheet } from "@/components/ui/Sheet";
import { RegisterPanel } from "@/components/RegisterPanel";

type TimeFilter = "upcoming" | "past";

/**
 * Funding display (client response 2026-07-16): self-funded -> show the
 * price; sponsored by a third party -> hide the price, show the sponsor
 * logo/name instead; HelpMeSee -> always a price worded "From €X" (the
 * amount invoiced depends on the participant's status), regardless of
 * isSponsored.
 */
export function PriceOrSponsor({ t, className }: { t: TrainingSession; className?: string }) {
  const { lang } = useLang();
  const tr = useT();
  const hms = isHelpMeSee(t);

  if (hms) {
    return (
      <span className={className}>
        {tr("trainings.priceFrom").replace("{price}", euro(t.priceEUR, lang))}
      </span>
    );
  }
  if (t.isSponsored && t.sponsors && t.sponsors.length > 0) {
    const sponsor = t.sponsors[0];
    return (
      <span className={`inline-flex items-center gap-1.5 ${className ?? ""}`}>
        {sponsor.logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={sponsor.logoUrl} alt={sponsor.name} className="h-5 w-auto max-w-[6rem] object-contain" />
        ) : (
          <span className="font-medium">{sponsor.name}</span>
        )}
      </span>
    );
  }
  return <span className={className}>{euro(t.priceEUR, lang)}</span>;
}

export function TrainingsExplorer({
  showFilters = true,
  limit,
  initialTime = "upcoming",
}: {
  showFilters?: boolean;
  limit?: number;
  initialTime?: TimeFilter;
}) {
  const { lang } = useLang();
  const t = useT();
  const trainings = useTrainings();
  const [time, setTime] = useState<TimeFilter>(initialTime);
  const [specialty, setSpecialty] = useState<Specialty | "all">("all");
  const [detail, setDetail] = useState<TrainingSession | null>(null);
  const [registerSlug, setRegisterSlug] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = trainings
      .filter((x) => (time === "upcoming" ? isUpcoming(x) : !isUpcoming(x)))
      .filter((x) => (specialty === "all" ? true : x.specialty === specialty))
      .sort(
        (a, b) =>
          (time === "upcoming" ? 1 : -1) *
          (new Date(a.startDate).getTime() - new Date(b.startDate).getTime()),
      );
    if (limit) list = list.slice(0, limit);
    return list;
  }, [trainings, time, specialty, limit]);

  const specialties = Array.from(new Set(trainings.map((x) => x.specialty))) as Specialty[];

  return (
    <>
      {showFilters && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex rounded-full bg-mist p-1">
            {(["upcoming", "past"] as TimeFilter[]).map((v) => (
              <button
                key={v}
                onClick={() => setTime(v)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  time === v ? "bg-white text-brand-700 shadow-sm" : "text-ink-muted hover:text-ink"
                }`}
              >
                {v === "upcoming" ? t("trainings.upcoming") : t("trainings.pastTab")}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Chip active={specialty === "all"} onClick={() => setSpecialty("all")}>
              {t("trainings.all")}
            </Chip>
            {specialties.map((s) => (
              <Chip key={s} active={specialty === s} onClick={() => setSpecialty(s)}>
                {loc(SPECIALTY_LABELS[s], lang)}
              </Chip>
            ))}
          </div>
        </div>
      )}

      <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${showFilters ? "mt-10" : ""}`}>
        {filtered.map((x) => (
          <TrainingCardModern key={x.slug} t={x} onOpen={() => setDetail(x)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-ink-muted">{t("trainings.empty")}</p>
      )}

      {/* Detail side drawer */}
      <Sheet
        open={!!detail}
        onClose={() => setDetail(null)}
        title={detail ? loc(detail.title, lang) : ""}
        maxWidth="max-w-2xl"
      >
        {detail && (
          <DetailPanel
            t={detail}
            onRegister={() => {
              setRegisterSlug(detail.slug);
            }}
          />
        )}
      </Sheet>

      {/* Register modal */}
      <Sheet
        open={!!registerSlug}
        onClose={() => setRegisterSlug(null)}
        position="center"
        title={t("reg.title")}
        maxWidth="max-w-2xl"
      >
        {registerSlug && <RegisterPanel initialSlug={registerSlug} embedded />}
      </Sheet>
    </>
  );
}

function TrainingCardModern({ t, onOpen }: { t: TrainingSession; onOpen: () => void }) {
  const { lang } = useLang();
  const tr = useT();
  const upcoming = isUpcoming(t);
  const hms = isHelpMeSee(t);
  const sponsored = !hms && !!t.isSponsored && !!t.sponsors && t.sponsors.length > 0;
  const left = spotsLeft(t);
  const full = left === 0;
  const pct = Math.round((t.enrolled / t.capacity) * 100);

  // Explicit funding/pathway status, shown as one consistent badge on every card.
  const status = hms
    ? { label: tr("trainings.helpmeseeShort"), cls: "bg-amber-400/95 text-amber-950" }
    : sponsored
      ? { label: tr("trainings.sponsored"), cls: "bg-brand-600/95 text-white" }
      : { label: tr("trainings.openEnrolment"), cls: "bg-white/90 text-brand-700" };

  return (
    <button
      onClick={onOpen}
      className={`tick-frame group flex flex-col overflow-hidden rounded-xl2 border bg-white text-left shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft ${
        hms
          ? "border-amber-300 ring-1 ring-amber-200 hover:border-amber-400"
          : "border-line hover:border-brand-200"
      }`}
    >
      <div className="relative h-40 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url('${t.imageUrl || SPECIALTY_IMAGE[t.specialty]}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/55 via-transparent to-transparent" />
        {/* specialty (left) + explicit funding status (right) */}
        <span className="pill absolute left-3 top-3 bg-white/90 text-brand-700 backdrop-blur">
          {loc(SPECIALTY_LABELS[t.specialty], lang)}
        </span>
        <span className={`pill absolute right-3 top-3 font-semibold backdrop-blur ${status.cls}`}>
          {status.label}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3 font-mono text-xs text-ink-muted">
          <span className="font-medium tracking-wide">{formatDateRange(t.startDate, t.endDate, lang)}</span>
          <span className="shrink-0">{t.city}</span>
        </div>
        <h3 className="mt-2 font-display text-lg leading-snug text-ink">{loc(t.title, lang)}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">
          {loc(t.summary, lang)}
        </p>

        {/* Clean at-a-glance meta row */}
        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-muted">
          <span className="font-medium text-ink-soft">{loc(LEVEL_LABELS[t.level], lang)}</span>
          <span aria-hidden>·</span>
          <span>{t.durationDays} {tr("detail.days")}</span>
          <span aria-hidden>·</span>
          <span>{loc(AUDIENCE_LABELS[t.audience], lang)}</span>
          {t.qualiopi && (
            <>
              <span aria-hidden>·</span>
              <span className="font-medium text-brand-600">✓ Qualiopi</span>
            </>
          )}
        </div>

        {/* Status-specific footer detail, pushed to the bottom */}
        <div className="mt-auto pt-4">
          {upcoming ? (
            hms ? (
              <p className="flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2.5 text-xs text-amber-800">
                <svg className="mt-0.5 h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>{tr("trainings.helpmeseeNote")}</span>
              </p>
            ) : sponsored ? (
              <p className="flex items-center gap-1.5 rounded-lg bg-brand-50 px-3 py-2.5 text-xs text-ink-soft">
                {tr("trainings.sponsoredBy")}
                {t.sponsors![0].logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={t.sponsors![0].logoUrl} alt={t.sponsors![0].name} className="h-4 w-auto max-w-[6rem] object-contain" />
                ) : (
                  <span className="font-semibold text-brand-700">{t.sponsors![0].name}</span>
                )}
              </p>
            ) : (
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className={full ? "font-medium text-ink-muted" : "font-medium text-brand-700"}>
                    {full ? tr("common.full") : `${left} ${tr("common.spotsLeft")}`}
                  </span>
                  <span className="stat-figure text-ink-muted">
                    {t.enrolled}/{t.capacity}
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-mist">
                  <div
                    className={`h-full rounded-full ${full ? "bg-ink-muted/50" : "bg-brand-500"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          ) : (
            t.satisfaction && (
              <div className="flex gap-4 rounded-lg bg-mist px-4 py-2.5 text-xs text-ink-soft">
                <span><strong className="stat-figure text-ink">{t.satisfaction}%</strong> {tr("detail.satisfaction").toLowerCase()}</span>
                {t.passRate != null && <span><strong className="stat-figure text-ink">{t.passRate}%</strong> {tr("detail.passRate").toLowerCase()}</span>}
              </div>
            )
          )}

          <div className="mt-4 flex items-center justify-end border-t border-line pt-4">
            <span className="inline-flex items-center gap-1.5 font-display text-sm font-semibold text-brand-700 transition group-hover:gap-2.5">
              {tr("common.details")}
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

function DetailPanel({ t, onRegister }: { t: TrainingSession; onRegister: () => void }) {
  const { lang } = useLang();
  const tr = useT();
  const tx = (fr: string, en: string) => (lang === "fr" ? fr : en);
  const upcoming = isUpcoming(t);
  const hms = isHelpMeSee(t);
  const left = spotsLeft(t);
  const full = left === 0;

  return (
    <div>
      <div
        className="relative h-48 bg-cover bg-center"
        style={{ backgroundImage: `url('${t.imageUrl || SPECIALTY_IMAGE[t.specialty]}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/40 to-brand-950/10" />
        <div className="absolute bottom-4 left-5 right-5 text-white">
          <div className="flex flex-wrap gap-2">
            <span className="pill bg-white/90 text-brand-700">{loc(SPECIALTY_LABELS[t.specialty], lang)}</span>
            {hms && (
              <span className="pill bg-amber-400/95 font-semibold text-amber-950">{tr("trainings.helpmesee")}</span>
            )}
            <span className="pill border border-white/20 bg-brand-950/45 font-mono text-[0.66rem] uppercase tracking-annotation text-white backdrop-blur">{loc(LEVEL_LABELS[t.level], lang)}</span>
            <span className="pill border border-white/20 bg-brand-950/45 text-white backdrop-blur">{tr("detail.audience")}: {loc(AUDIENCE_LABELS[t.audience], lang)}</span>
            {t.qualiopi && <span className="pill bg-brand-50 text-brand-700">✓ Qualiopi</span>}
          </div>
          <p className="mt-2 font-mono text-xs text-white/90">
            {formatDateRange(t.startDate, t.endDate, lang)} · {t.durationDays} {tr("detail.days")} · {loc(t.venue, lang)}, {t.city}
          </p>
        </div>
      </div>

      <div className="p-6">
        <Link
          href={`/trainings/${t.slug}`}
          className="mono-label-brand group inline-flex items-center gap-1.5 transition hover:gap-2.5"
        >
          {tx("Voir la fiche complète", "View full page")}
          <svg viewBox="0 0 24 24" className="h-3 w-3 transition group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>

        <p className="mt-4 leading-relaxed text-ink-soft">{loc(t.summary, lang)}</p>
        {t.isSponsored && !hms && t.sponsors && t.sponsors.length > 0 && (
          <p className="mt-1 text-xs text-ink-muted">
            {tr("trainings.sponsoredBy")}{" "}
            {t.sponsors.map((s, i) => (
              <span key={s.name}>
                {i > 0 ? ", " : ""}
                {s.website ? (
                  <a href={s.website} target="_blank" rel="noreferrer" className="underline">
                    {s.name}
                  </a>
                ) : (
                  s.name
                )}
              </span>
            ))}
          </p>
        )}

        {/* Quick-glance facts: general info, distinct from the full page's
            deep Qualiopi block (méthodes, encadrement, accessibilité...). */}
        <dl className="mt-5 grid grid-cols-2 gap-3 border-y border-line py-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="mono-label text-ink-muted">{tr("detail.days")}</dt>
            <dd className="mt-0.5 font-medium text-ink">{t.durationDays}</dd>
          </div>
          <div>
            <dt className="mono-label text-ink-muted">{tr("detail.maxParticipants")}</dt>
            <dd className="mt-0.5 font-medium text-ink">{t.capacity}</dd>
          </div>
          <div>
            <dt className="mono-label text-ink-muted">{tr("detail.audience")}</dt>
            <dd className="mt-0.5 font-medium text-ink">{loc(AUDIENCE_LABELS[t.audience], lang)}</dd>
          </div>
        </dl>

        {t.objectives.length > 0 && (
          <>
            <h4 className="mt-5 font-display text-lg">{tr("detail.objectives")}</h4>
            <ul className="mt-3 space-y-2">
              {t.objectives.map((o) => (
                <li key={o.en} className="flex gap-2.5 text-sm text-ink-soft">
                  <span className="mt-0.5 text-brand-500">✓</span> {loc(o, lang)}
                </li>
              ))}
            </ul>
          </>
        )}

        {t.prerequisites && (
          <>
            <h4 className="mt-5 font-display text-lg">{tr("detail.prerequisites")}</h4>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{loc(t.prerequisites, lang)}</p>
          </>
        )}

        {!upcoming && t.satisfaction && (
          <>
            <h4 className="mt-6 font-display text-lg">{tr("detail.results")}</h4>
            <div className="mt-3 grid grid-cols-3 gap-3">
              <MiniStat label={tr("detail.satisfaction")} value={`${t.satisfaction}%`} />
              {t.passRate != null && <MiniStat label={tr("detail.passRate")} value={`${t.passRate}%`} />}
              {t.photos && t.photos.length > 0 && (
                <MiniStat label={tr("detail.photos")} value={`${t.photos.length}`} />
              )}
            </div>
          </>
        )}
      </div>

      {/* sticky footer CTA */}
      {upcoming &&
        (hms ? (
          <div className="sticky bottom-0 space-y-2 border-t border-amber-200 bg-amber-50/95 px-6 py-4 backdrop-blur">
            <p className="flex items-start gap-2 text-sm text-amber-800">
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
        ) : (
          <div className="sticky bottom-0 space-y-2 border-t border-line bg-white/95 px-6 py-4 backdrop-blur">
            <button onClick={onRegister} disabled={full} className="btn-primary w-full">
              {full ? tr("detail.full") : tr("detail.registerThis")}
            </button>
            <p className="text-center text-xs text-ink-muted">{tr("detail.noEngagement")}</p>
          </div>
        ))}
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-mist p-3 text-center">
      <p className="stat-figure text-xl font-semibold text-brand-700">{value}</p>
      <p className="mt-0.5 text-xs text-ink-muted">{label}</p>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
        active
          ? "border-brand-400 bg-brand-50 text-brand-700"
          : "border-line text-ink-muted hover:border-brand-300 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
