"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useLang, loc, type Lang } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";
import { CongressGallery } from "@/components/CongressGallery";
import {
  getCongressBySlug,
  type Congress,
  type CommitteeMember,
} from "@/lib/congresses";

export default function CongressDetailPage() {
  const { lang } = useLang();
  const tx = (fr: string, en: string) => (lang === "fr" ? fr : en);
  const params = useParams<{ slug: string }>();
  const c = getCongressBySlug(params.slug);
  if (!c) return notFound();

  const specs: { label: string; value: string }[] = [
    { label: tx("Dates", "Dates"), value: loc(c.dates, lang) },
    { label: tx("Lieu", "Location"), value: loc(c.city, lang) },
  ];
  if (c.venue) specs.push({ label: tx("Site", "Venue"), value: loc(c.venue, lang) });

  return (
    <>
      {/* Dark instrument header (shared) */}
      <section className="relative overflow-hidden border-b border-brand-800 bg-brand-950 text-white">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="container-page relative py-14">
          <Link
            href="/congresses"
            className="mono-label text-brand-200 transition hover:text-white"
          >
            {tx("← Tous les congrès", "← All congresses")}
          </Link>

          <div className="mt-6 flex items-center gap-3">
            <span className="pill bg-white/10 text-brand-100">
              {c.status === "upcoming"
                ? tx("À venir", "Upcoming")
                : tx("Édition passée", "Past edition")}
            </span>
            <span className="stat-figure text-brand-200">{c.acronym}</span>
          </div>

          <h1 className="mt-4 max-w-3xl font-display text-3xl leading-tight text-white sm:text-4xl">
            {loc(c.title, lang)}
          </h1>

          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            {specs.map((s) => (
              <div key={s.label}>
                <dt className="mono-label text-brand-200">{s.label}</dt>
                <dd className="mt-1 text-sm text-white/85">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Body branches on status */}
      {c.status === "past" ? (
        <PastBody c={c} lang={lang} tx={tx} />
      ) : (
        <UpcomingBody c={c} lang={lang} tx={tx} />
      )}
    </>
  );
}

/* ---- Shared building blocks ------------------------------------------- */

type Tx = (fr: string, en: string) => string;

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl">{children}</h2>;
}

function DownloadButton({
  href,
  label,
  soonLabel,
}: {
  href?: string;
  label: string;
  soonLabel: string;
}) {
  if (href) {
    return (
      <a href={href} download className="btn-primary mt-6">
        <span aria-hidden>↓</span>
        {label}
      </a>
    );
  }
  return (
    <button type="button" disabled className="btn-primary mt-6" aria-disabled>
      {soonLabel}
    </button>
  );
}

function Committee({
  members,
  lang,
}: {
  members: CommitteeMember[];
  lang: Lang;
}) {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      {members.map((m, i) => (
        <Reveal key={m.name + i} delay={i * 50}>
          <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
            <p className="font-display text-lg text-ink">{m.name}</p>
            {m.role && (
              <p className="mono-label-brand mt-1">{loc(m.role, lang)}</p>
            )}
            {m.affiliation && (
              <p className="mt-1.5 text-sm text-ink-soft">{m.affiliation}</p>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ---- §6.1 PAST edition: exactly 4 body blocks ------------------------- */

function PastBody({ c, lang, tx }: { c: Congress; lang: Lang; tx: Tx }) {
  return (
    <section className="container-page py-14">
      <div className="mx-auto max-w-3xl space-y-16">
        {/* 1. Programme */}
        {c.program && c.program.length > 0 && (
          <div>
            <SectionHeading>{tx("Programme", "Program")}</SectionHeading>
            <div className="mt-6 space-y-4">
              {c.program.map((s, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="tick-frame rounded-2xl border border-line bg-white p-6 shadow-card">
                    <span className="mono-label-brand">{loc(s.when, lang)}</span>
                    <h3 className="mt-2 font-display text-lg text-ink">
                      {loc(s.title, lang)}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                      {loc(s.body, lang)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* 2. E-book download */}
        <div>
          <SectionHeading>{tx("E-book de l'édition", "Edition e-book")}</SectionHeading>
          <p className="mt-3 text-ink-soft">
            {tx(
              "Retrouvez le recueil des actes et résumés de cette édition.",
              "Access the collected proceedings and abstracts of this edition.",
            )}
          </p>
          <DownloadButton
            href={c.ebookUrl}
            label={tx("Télécharger l'e-book", "Download the e-book")}
            soonLabel={tx(
              "E-book — bientôt disponible",
              "E-book — coming soon",
            )}
          />
        </div>

        {/* 3. Photos de l'édition */}
        {c.photos && c.photos.length > 0 && (
          <div>
            <SectionHeading>
              {tx("Photos de l'édition", "Edition photos")}
            </SectionHeading>
            <div className="mt-6">
              <CongressGallery photos={c.photos} />
            </div>
          </div>
        )}

        {/* 4. Comité scientifique */}
        {c.committee && c.committee.length > 0 && (
          <div>
            <SectionHeading>
              {tx("Comité scientifique", "Scientific committee")}
            </SectionHeading>
            <Committee members={c.committee} lang={lang} />
          </div>
        )}
      </div>
    </section>
  );
}

/* ---- §6.2 UPCOMING edition: event-site sections ----------------------- */

function UpcomingBody({ c, lang, tx }: { c: Congress; lang: Lang; tx: Tx }) {
  return (
    <section className="container-page py-14">
      <div className="mx-auto max-w-3xl space-y-16">
        {/* 1. Message de bienvenue */}
        {c.welcome && (
          <div>
            <SectionHeading>
              {tx("Message de bienvenue", "Welcome message")}
            </SectionHeading>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              {loc(c.welcome, lang)}
            </p>
          </div>
        )}

        {/* 2. Localisation */}
        {c.location && (
          <div>
            <SectionHeading>{tx("Localisation", "Location")}</SectionHeading>
            <div className="tick-frame mt-6 rounded-2xl border border-line bg-white p-6 shadow-card">
              <p className="font-display text-lg text-ink">
                {loc(c.location.venue, lang)}
              </p>
              <p className="mt-1.5 text-sm text-ink-soft">
                {loc(c.location.address, lang)}
              </p>
              {c.location.access && (
                <>
                  <p className="mono-label-brand mt-4">{tx("Accès", "Access")}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                    {loc(c.location.access, lang)}
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        {/* 3. Dates */}
        <div>
          <SectionHeading>{tx("Dates", "Dates")}</SectionHeading>
          <p className="stat-figure mt-4 text-xl text-brand-700">
            {loc(c.dates, lang)}
          </p>
        </div>

        {/* 4. Types d'événements */}
        {c.eventTypes && c.eventTypes.length > 0 && (
          <div>
            <SectionHeading>
              {tx("Types d'événements", "Event types")}
            </SectionHeading>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {c.eventTypes.map((e, i) => (
                <Reveal key={i} delay={i * 50}>
                  <div className="rounded-2xl border border-line bg-white p-6 shadow-card">
                    <h3 className="font-display text-lg text-ink">
                      {loc(e.title, lang)}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                      {loc(e.body, lang)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* 5. Programme interactif (accordion via <details>) */}
        {c.program && c.program.length > 0 && (
          <div>
            <SectionHeading>
              {tx("Programme interactif", "Interactive program")}
            </SectionHeading>
            <p className="mt-3 text-sm text-ink-soft">
              {tx(
                "Dépliez chaque journée pour en voir le détail.",
                "Expand each day to see the details.",
              )}
            </p>
            <div className="mt-6 space-y-3">
              {c.program.map((s, i) => (
                <details
                  key={i}
                  open={i === 0}
                  className="group rounded-2xl border border-line bg-white shadow-card [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6">
                    <span>
                      <span className="mono-label-brand">
                        {loc(s.when, lang)}
                      </span>
                      <span className="mt-1 block font-display text-lg text-ink">
                        {loc(s.title, lang)}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-ink-soft transition group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="px-6 pb-6 text-sm leading-relaxed text-ink-soft">
                    {loc(s.body, lang)}
                  </p>
                </details>
              ))}
            </div>
          </div>
        )}

        {/* 6. Téléchargement du programme (PDF) */}
        <div>
          <SectionHeading>
            {tx("Programme complet (PDF)", "Full program (PDF)")}
          </SectionHeading>
          <p className="mt-3 text-ink-soft">
            {tx(
              "Téléchargez le programme détaillé au format PDF.",
              "Download the detailed program as a PDF.",
            )}
          </p>
          <DownloadButton
            href={c.programPdfUrl}
            label={tx("Télécharger le programme", "Download the program")}
            soonLabel={tx(
              "Programme — bientôt disponible",
              "Program — coming soon",
            )}
          />
        </div>

        {/* 7. Comité scientifique / faculty */}
        {c.committee && c.committee.length > 0 && (
          <div>
            <SectionHeading>
              {tx("Comité scientifique", "Scientific committee")}
            </SectionHeading>
            <Committee members={c.committee} lang={lang} />
          </div>
        )}

        {/* 8. Inscription */}
        {c.registration && (
          <div>
            <SectionHeading>{tx("Inscription", "Registration")}</SectionHeading>
            <div className="mt-6 rounded-2xl border border-line bg-mist/60 p-6">
              <p className="text-sm leading-relaxed text-ink-soft">
                {loc(c.registration.info, lang)}
              </p>
              <p className="mono-label-brand mt-4">
                {tx("Méthode d'inscription", "Registration method")}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                {loc(c.registration.method, lang)}
              </p>
              {c.registration.url && (
                <Link href={c.registration.url} className="btn-primary mt-5">
                  {tx("S'inscrire", "Register")}
                </Link>
              )}
            </div>
          </div>
        )}

        {/* 9. Partenaires / sponsors */}
        {c.sponsors && c.sponsors.length > 0 && (
          <div>
            <SectionHeading>
              {tx("Partenaires & sponsors", "Partners & sponsors")}
            </SectionHeading>
            <ul className="mt-6 flex flex-wrap gap-3">
              {c.sponsors.map((s, i) => (
                <li
                  key={s.name + i}
                  className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink-soft shadow-card"
                >
                  {s.logo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={s.logo}
                      alt=""
                      className="h-6 w-auto object-contain"
                    />
                  )}
                  {s.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 10. Hébergement recommandé */}
        {c.accommodation && c.accommodation.length > 0 && (
          <div>
            <SectionHeading>
              {tx("Hébergement recommandé", "Recommended accommodation")}
            </SectionHeading>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {c.accommodation.map((a, i) => (
                <Reveal key={i} delay={i * 50}>
                  <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
                    <p className="font-display text-lg text-ink">
                      {loc(a.name, lang)}
                    </p>
                    {a.note && (
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                        {loc(a.note, lang)}
                      </p>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
