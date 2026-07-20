# Legacy Site Parity — Plan

> Source of truth for this audit: the live legacy site, **https://www.gepromed.com/en**
> (a traditional server-rendered CMS — no client-side JSON/API calls; verified via
> network log, everything is baked into server HTML). "Real data" below means
> content actually published on that live site, not invented copy.
>
> This plan is **plan-only** — nothing has been changed yet. It catalogs every gap
> found between the legacy site and `gepromed-web` (the redesign), split into three
> tiers by risk: factual errors (wrong, published, public-facing data), missing
> sections (real content with nothing built), and structural differences (a
> deliberate decision was made, may need revisiting). Fix in that order.
>
> Cross-refs: `GEPROMED_CLIENT_FIXES_PLAN.md` (PDF/Qualiopi generator, funding
> question, HelpMeSee catalog distinction — separate, already in progress),
> `REDESIGN_PROGRESS.md` (design system + what's shipped).

---

## Tier 1 — Factual errors (published, public-facing, currently wrong)

### 1.1 ISVB 2026 — wrong location and dates
- **Real** (`gepromed.com/en/symposium`): ISVB 2026, **Tampa, Florida**, **1–2 June 2026**.
- **gepromed-web** (`lib/congresses.ts`): ISVB 2026, **Strasbourg**, **12–14 March 2026**.
- Entirely fabricated venue and dates for a real, named, upcoming international event.
  This is the exact page the v2 brief asked to be fleshed out (welcome message,
  venue/access, accommodation, program) — all of that detail is now confidently
  wrong and would need a full rewrite, not a date tweak.
- **Fix**: rewrite the ISVB 2026 entry in `lib/congresses.ts` (and the matching
  Supabase rows if congresses are DB-backed) with the real venue, dates, and intro
  copy. Re-verify every other congress entry (ESVB 2025, ESVB 2023) against the
  legacy Symposium page while at it — I only deep-checked ISVB 2026.

### 1.2 Footer funder logos — two of four are wrong entities
- **Real** (`gepromed.com/en/about-us/our-funders`): **Grand Est Region**, **European
  Union**, **Eurométropole de Strasbourg**, **CEA**.
- **gepromed-web footer** (`components/SiteFooter.tsx`): Eurométropole de Strasbourg,
  **Collectivité européenne d'Alsace**, Région Grand Est, **Université de
  Strasbourg**.
- Two of the four logos (Collectivité européenne d'Alsace, Université de Strasbourg)
  are not on the real funders list at all; European Union and CEA are missing.
- Note: the `/about/funders` **subpage** content is already correct per
  `REDESIGN_PROGRESS.md` (cites Grand Est/Eurométropole/CEA) — this is specifically
  a footer-vs-subpage inconsistency, not a project-wide data error.
- **Fix**: replace the 4 SVGs referenced in `SiteFooter.tsx` with Grand Est, European
  Union, Eurométropole de Strasbourg, and CEA logos (assets need sourcing/exporting
  from the legacy site or Gepromed's brand kit).

### 1.3 Missing second office address
- **Real site footer**: two locations —
  1. **Bureaux**: Bâtiment d'Anesthésiologie, 1 place de l'Hôpital, 67085 Strasbourg
  2. **Centre d'Éducation**: Bâtiment eXplora, 2 rue Marie Hamm, 67000 Strasbourg
- **gepromed-web footer**: only lists the Centre d'Éducation address. The
  administrative offices (Bâtiment d'Anesthésiologie) address is missing entirely.
- **Fix**: add the second address block to `SiteFooter.tsx` (and `app/contact/page.tsx`
  if it duplicates footer contact info), matching the "Bureaux / Centre d'Éducation"
  two-location structure.

### Verified correct, no action needed
- Social links (LinkedIn, X, Instagram) — exact URL match confirmed against real
  site HTML (`linkedin.com/company/gepromed`, `twitter.com/gepromed`,
  `instagram.com/Gepromed`).
- Homepage stats — `+1150` HCP trained since 2018, `+150` vascular explants received
  in 2023, `+20` clinical research studies — all three match the real homepage
  exactly. (`96% satisfaction` and `40+ supervisors`, also shown on the redesign,
  are **not sourced from the legacy homepage** — not necessarily wrong, but
  unverified against this source; confirm where they came from before treating them
  as equally authoritative.)
- Certifications — ISO 9001, ISO 13485, Qualiopi — all confirmed on the real
  `/about-us/quality` page, matching badges already used across gepromed-web.
- Implant Cycle 4-platform structure (Technological Engineering, Education, Clinical
  Monitoring & Research, Explant Analysis) — matches `ImplantCycle` component
  exactly (see Tier 3.1 for the related homepage-copy discrepancy).

---

## Tier 2 — Missing sections (real public content, nothing built)

### 2.1 HelpMeSee — entire public course catalog missing
- **Real site**: dedicated public `/helpmesee` marketing page — intro copy about the
  HelpMeSee Eye Surgery Simulator, plus **5 distinct course listings**, each with its
  own detail page:
  1. Complications (ACIOL implantation, sphincterotomy, CTR implantation)
  2. Phacoemulsification (5-day course, full procedure walkthrough)
  3. Vitrectomy (posterior capsular rupture, Pars Plana approach)
  4. Suturing (scleral tunnel suturing)
  5. MSICS — Manual Small Incision Cataract Surgery (24h+ practice, interactive eBook)
- **gepromed-web**: **no public HelpMeSee page at all.** Only `/lead/helpmesee`
  exists, a private referral-intake form — nothing for a prospective participant to
  read before being referred.
- **Decision needed**: is the intent to keep HelpMeSee fully referral-only going
  forward (in which case this is an intentional removal, confirm with client), or
  does the public catalog need rebuilding? If rebuilding: reuse the Trainings
  page/detail pattern (`app/trainings`, `TrainingDetailView`) for a `/helpmesee`
  index + 5 sub-pages, sourced from the real copy above.

### 2.2 Trainings specialty categories — narrower than the real catalog
- **Real site** `Courses` filter: Vascular surgery, Ophthalmology, **Orthopedics,
  Hand surgery, Neurosurgery, Nurse** (6 categories). The Quality page additionally
  names **urology, digestive surgery, gynecology** as active disciplines (8+ total).
- **gepromed-web** (`lib/trainings.ts`, `Specialty` type): only
  `vascular | ophthalmology | simulation` — 3 values, hardcoded in the type itself.
- **Fix**: extend the `Specialty` union type and `SPECIALTY_LABELS`/`SPECIALTY_IMAGE`
  maps to include at least Orthopedics, Hand surgery, Neurosurgery, and Nurse (the
  ones with an active filter chip on the real site); confirm with Gepromed whether
  Urology/Digestive/Gynecology need seed placeholders too even with zero live
  sessions today, since the real Quality page names them as active disciplines.

---

## Tier 3 — Structural differences (deliberate decisions, may need revisiting)

### 3.1 Implant Cycle: 4 platforms (real + `ImplantCycle` component) vs. 3 platforms (v2 doc homepage story, already shipped)
- Real site and gepromed-web's own `ImplantCycle` component agree: **4** platforms
  (Technological Engineering, Education, Clinical Monitoring & Research, Explant
  Analysis).
- The v2 client brief's "3 Platforms" homepage storytelling section (already built,
  confirmed live) collapses this to **3**, dropping "Clinical Monitoring & Research"
  as its own pillar (folded implicitly into Education/Explant framing).
- Not a bug — this was an explicit ask in the v2 doc — but it now contradicts the
  site's own canonical 4-platform structure (still shown via `ImplantCycle` on
  Home/About/Engineering). **Flag to client**: intentional messaging simplification,
  or should the homepage story be reconciled back to 4 platforms?

### 3.2 Additions with no legacy equivalent (not gaps — just noting for completeness)
- News/Actualités (`app/news`) — new, doesn't exist on the legacy site.
- Dedicated Engineering page (`app/engineering`) — legacy folds this into the
  Implant Cycle page; gepromed-web gives it a standalone page with request-form
  flows (Explant Analysis / Testing / Rental). This is a genuine improvement, not
  a parity gap.
- About-us subpages — 1:1 parity confirmed: Team, Funders, Membership, Quality,
  Legal, Privacy, Publications all exist on both sites with matching structure.

---

## Suggested build order

1. **1.1 ISVB 2026 data fix** — highest risk, public-facing, about a real event.
2. **1.2 Footer funder logos** — quick asset swap, currently misrepresents who
   funds Gepromed.
3. **1.3 Second office address** — small addition, footer/contact page.
4. **2.2 Specialty categories** — type/data model extension, unblocks future
   trainings in those disciplines even before content exists.
5. **2.1 HelpMeSee public catalog** — biggest lift of this batch; needs a client
   decision first (rebuild vs. intentionally referral-only) before scoping pages.
6. **3.1 Implant Cycle platform count** — copy-only decision, resolve whenever
   convenient once the client weighs in.

## Open decisions needed from Gepromed/client
- Confirm `96%` satisfaction and `40+` supervisors stats — source, or remove/replace
  if unverifiable.
- HelpMeSee: rebuild the public catalog, or confirm referral-only is the permanent
  model (Tier 2.1).
- 3-platform vs. 4-platform homepage story (Tier 3.1).
- Full specialty list to seed going forward: just the 4 real ones with an active
  filter (Orthopedics, Hand surgery, Neurosurgery, Nurse), or all 8+ named on the
  Quality page (adds Urology, Digestive, Gynecology) (Tier 2.2).
