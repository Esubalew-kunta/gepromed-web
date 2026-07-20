# Client Pre-Go-Live Fixes — Plan

> Raised by the Gepromed client (review of `gepromed-web` + `gepromed-ai-console`)
> before content production. Three blocking points. This plan is **plan-only** — no
> code has been changed yet. Decisions already made are recorded per section.
>
> Cross-refs: the two-parcours + Qualiopi model in
> `../CLIENT_INPUTS_PLAIN_ENGLISH.md` (Sections A / B / C), and the running
> handoff log `../gepromed-ai-console/SESSION_SUMMARY.md`.
>
> Client's three points, verbatim:
> 1. Remove the "How is this training funded?" question from the registration form —
>    Gepromed sets the funding method (and whether price shows) per training page.
> 2. The PDF program download button is still missing, plus the Qualiopi-required
>    elements. **Blocking** — needed before go-live.
> 3. No visual difference between the HelpMeSee training and the others in the
>    catalog — the layout should distinguish it "as planned".

All three live in **`gepromed-web`** (public site). They are all facets of the
same spec model: **HelpMeSee = foundation-run / foundation-funded / referral-only**
vs **Bootcamp·Workshop = Gepromed-run, self- or lab-sponsored**.

---

## Point 1 — Remove the funding question from the registration form

**Decision:** confirmed — funding is a training-level attribute (foundation /
sponsored / self), never asked of the registrant. Aligns with spec Rule 1
(`CLIENT_INPUTS_PLAIN_ENGLISH.md` line ~131): the *training's* sponsorship drives
whether comms show a sponsor logo vs. a price.

**Where it is:** the `03 · Financement` block in
`components/RegisterPanel.tsx` (lines ~257–328) — the self/sponsored `<select>`
plus the conditional sponsor name / email / logo inputs.

**Build steps:**
1. Delete the entire `!isHms` funding `<div>` (RegisterPanel.tsx ~257–328).
2. Remove `funding`, `sponsorName`, `sponsorContact`, `sponsorLogoUrl` from the
   `EMPTY` form-state object (~25–29).
3. Renumber the remaining sections: Foundation `03`, Logistics `04` (only the
   `!isHms` public branch is affected; the HelpMeSee `03 · Fondation` block stays).
4. Leave the shared `Input`/`Select` helpers untouched.

**No backend change required (verified):** `create_lead()`
(`../gepromed-ai-console/db/intake_funding_contract_eligibility.sql` line ~116)
already **defaults `funding` to `'self'`** when the payload omits it
(`case when payload->>'funding' = 'sponsored' then 'sponsored' else 'self'`).
Omitting the fields is safe; existing leads, the `leads_funding_valid` constraint,
and the console's sponsor logic are all untouched.

**Side effect to note (not a blocker):** the console Trainee section's "Sponsored"
KPI/filter is fed by `leads.funding`. With the question gone, new public leads are
`self` until Gepromed sets sponsorship at the *training* level — this is the
intended model, but worth telling the client so the KPI isn't a surprise.

**Verify:** `/register` (public) shows no funding question; submitting still
returns a REG-… ref; the private `/lead/helpmesee` form is unchanged.

---

## Point 2 — PDF program button + Qualiopi elements (BLOCKING)

Two layers. The "missing button" is the shallower one.

### Layer A — the button renders as a disabled "coming soon" stub
The button exists (`components/TrainingDetailView.tsx` ~218–240) but only becomes a
live link when `programPdfUrl()` returns non-null, which needs the env var
**`NEXT_PUBLIC_PROGRAM_API_URL`** (`lib/trainings.ts` ~535–539). There is no
`.env.example` in `gepromed-web` and the var is unset in the deploy → the client
sees the greyed *"Programme PDF — bientôt disponible"* stub. The console middleware
**already allowlists `/api/programs`** publicly
(`../gepromed-ai-console/src/middleware.ts` PUBLIC_PREFIXES) — no auth work needed.

### Layer B — even wired, it 404s for real trainings
`GET /api/programs?session=<slug>` only knows one hard-coded demo,
`DEMO_SESSIONS = { "bootcamp-vasculaire" }`
(`../gepromed-ai-console/src/app/api/programs/route.ts` ~443–496). Real slugs
(`abord-vasculaire-peripherique-2026-09`, `phaco-initiation-2026-11`, …) aren't
there → *"Aucune session trouvée."*

### Decision: **Excel-per-training (spec-faithful)**
Per spec Section B, the generator reads one **`.xlsx` per training** and never
invents dates/prices. So each training page carries an uploaded workbook that the
route parses (the existing `parseWorkbook` / `renderProgramHtml` already handle
this exact format via the POST path — we're reusing it for GET-by-slug).

**Build steps:**

**Console side (`gepromed-ai-console`):**
1. **Storage:** a Supabase Storage bucket (e.g. `program-workbooks`) holding one
   `.xlsx` per training slug (`<slug>.xlsx`). New migration file
   `db/program_workbooks.sql` (bucket + RLS: staff write, service-role read).
   Optionally a `trainings.program_workbook_path` column instead of slug-convention.
2. **Route:** extend `GET /api/programs?session=<slug>` in `route.ts` to, when the
   slug isn't in `DEMO_SESSIONS`, **fetch the stored `.xlsx`** via the service-role
   client, run the existing `parseWorkbook()` → `renderProgramHtml()`. Keep the demo
   map as a fallback. Return the same 404 HTML only when no workbook exists.
3. **Upload UI:** add an "Upload program (.xlsx)" control to the course create/edit
   screen in the console (Courses admin) so Gepromed attaches the workbook when
   creating each training's page — this is exactly the client's "Gepromed specifies
   it when creating the training" model.
4. The Qualiopi `BLOCKS` in `route.ts` (Public visé, Prérequis, Objectifs, Durée,
   Modalités, Moyens, Évaluation, Sanction, Accessibilité handicap, Délais d'accès,
   Tarifs, Inscription, Contact, Indicateurs) are already complete + default-filled
   — no change. Unknown values stay in `[brackets]` for the RQ, per spec.

**Web side (`gepromed-web`):**
5. Set `NEXT_PUBLIC_PROGRAM_API_URL=https://gepromed-ai-console.onrender.com`
   (local `.env.local` + Render) and add a documented `.env.example` entry.
6. No component change to the button itself — once the env var is set and a workbook
   exists, `programPdfUrl()` returns a live link and the existing button "just works".

### Qualiopi elements on the detail page (spec C.2, checklist line ~245)
The five Qualiopi blocks render **conditionally** in the detail view
(`TrainingDetailView.tsx` ~129–156) but the seed data only fills them for **2 of 5**
trainings (`lib/trainings.ts`: `phaco-*` and `endovasculaire-*` are missing several).

**Build steps:**
7. Populate the missing `prerequisites`, `teachingMethods`, `pedagogicalResources`,
   `evaluationMethods`, `supervisionOrganization` (bilingual) for **every live
   training** in `lib/trainings.ts` (and the corresponding `trainings` rows in
   Supabase, since prod reads from the DB via `getTrainings`).
8. Confirm **Capacité maximale** (already in the aside) and the **public-visé tags**
   (already rendered) are present — both are on the spec checklist.

> Related but **out of scope for these three points** (spec C.1, line ~245): the spec
> also wants the *level* badge (Initiation/Avancé/Expert) *replaced* by public-visé
> tags. The detail hero + catalog still show the level badge. Flag to client as a
> separate follow-up; not touched here unless they confirm.

**Verify:** with the env var set and a workbook uploaded for a slug, the detail-page
button opens the branded print-ready program (Print → Save as PDF); every live
training shows all Qualiopi blocks; a training with no workbook shows the graceful
404 page rather than a broken link.

---

## Point 3 — Distinguish the HelpMeSee training in the catalog

**Decision:** **Full** distinction — badge + hide the public seats bar + swap the
Register CTA for a foundation-referral note.

**Root cause:** `TrainingCardModern` and `DetailPanel` in
`components/TrainingsExplorer.tsx` (~125–212, ~214–307) never call `isHelpMeSee()`
— every session gets the same specialty pill, **"X spots left" bar**, and Register
CTA. For a HelpMeSee session this is also *wrong*: the public `RegisterPanel`
explicitly **excludes** helpmesee sessions from its bookable list
(`RegisterPanel.tsx` line ~103), so the card's Register flow dead-ends. HelpMeSee is
referral-only via `/lead/helpmesee` (spec Section A).

**Build steps (all in `TrainingsExplorer.tsx`, reusing the existing
`isHelpMeSee` helper — no data-model change):**
1. In `TrainingCardModern`, branch on `isHelpMeSee(t)`:
   - Add a distinct **"HelpMeSee · Fondation" badge** + accent (ribbon / colored
     border) so it reads as a different track at a glance.
   - **Hide** the `enrolled/capacity` seats bar + "spots left" (foundation dictates
     enrollment, not a public seat counter).
   - Replace the "Details → Register" affordance with a *"Parcours fondation — sur
     référencement HelpMeSee"* note.
2. Mirror the same in `DetailPanel`: replace the sticky Register footer with the
   foundation note (optionally a link to `/lead/helpmesee`).
3. Full i18n both languages (new `trainings.helpmesee*` keys in `lib/i18n.tsx`).

**Note:** the current live HelpMeSee session in the catalog is the ophthalmology/
phaco one (`isHelpMeSee` treats `programType: 'helpmesee'`, and ophthalmology
defaults to it via the helper). Verify against whichever trainings Gepromed has
actually flagged `program_type = 'helpmesee'` in Supabase.

**Verify:** the HelpMeSee card is visually distinct, shows no seats bar, and routes
to the foundation flow (not the dead-end public Register); Bootcamp/Workshop cards
are unchanged.

---

## Build order & deploy checklist

1. **Point 1** (RegisterPanel funding removal) — smallest, reversible; do first.
2. **Point 3** (HelpMeSee catalog distinction) — web-only, no DB.
3. **Point 2** — split:
   - 2a. Web: `NEXT_PUBLIC_PROGRAM_API_URL` env + `.env.example`.
   - 2b. Web: fill Qualiopi blocks for all trainings (`lib/trainings.ts` + Supabase rows).
   - 2c. Console: `db/program_workbooks.sql` migration + storage bucket.
   - 2d. Console: `route.ts` GET-by-slug reads stored `.xlsx`.
   - 2e. Console: upload-workbook UI on course create/edit.
4. `npx tsc --noEmit` clean in **both** projects after each point.
5. **Deploy steps this introduces:**
   - Set `NEXT_PUBLIC_PROGRAM_API_URL` on the `gepromed-web` Render service.
   - Run `db/program_workbooks.sql` on Supabase (project `hdvqiiprylrrzrkydtpa`).
   - Gepromed uploads one `.xlsx` per live training via the new console UI.

## Open decisions still needed from Gepromed
- **Workbook keying:** slug-convention (`<slug>.xlsx`) vs. an explicit
  `trainings.program_workbook_path` column. (Recommendation: the column — survives
  slug renames.)
- **Level badge → public-visé** replacement (spec C.1): do it now with Point 2, or
  defer as a separate item? Currently deferred.
- **Price display:** now that funding is training-level, confirm whether the public
  detail page should ever show a price for self-pay Bootcamps, or keep price
  out of the public site entirely (it currently shows no price anywhere).

## Next action
Get Gepromed's answers to the three open decisions above, then build in the order
listed. Reply to the client only after 1–3 are verified in-browser on the deployed
site.
