# GEPROMED Website Redesign, Progress & Handoff

> Read this together with `DESIGN_HANDOFF.md` (data-wiring rules) and
> `../gepromed-os-ai-makers-gepromed-os/STATUS.md` (backend/console).
> This file captures the design system + what is done + what remains, so a new
> session can continue without re-deriving anything.

Last updated: session ending 2026-07-03. App: public website, Next 14, port **3001**,
folder `gepromed-ai-makers-claude-sleepy-maxwell-otfodc`.

---

## 0. Scope & hard rules (do not break)

- **Presentation/UI redesign only.** Never change data wiring, Supabase calls,
  field names, or upload logic. See `DESIGN_HANDOFF.md` for the frozen list:
  `lib/data.ts`, `lib/trainings-context.tsx` (`useTrainings()`), `lib/trainings.ts`
  (keep type shape + helper names + seed array), `RegisterPanel` field contract
  + `createLead`, `SignUpload` + `uploadSignedContract`, `.env.local`.
- **No em dashes anywhere** in the website repo (user preference). Use `:`, `,`,
  `(...)`. En dashes `–` in numeric date ranges are OK (that is correct range
  typography, not an em dash).
- **Bilingual FR/EN** everywhere via `useT()` / `loc(value, lang)` /
  `tx(fr,en)` helper / the `L = {fr,en}` type. Never hardcode one language.
- After changes: `node node_modules/typescript/bin/tsc --noEmit` (no global tsc).

---

## 1. Design system (grounded in the REAL live site, not guessed)

Pulled from `gepromed.com/build/app.4c426ae2.css` (Bootstrap tokens) and the real logo.

### Color (in `tailwind.config.ts`)
- **Brand blue** anchor `#0077bb` = real `--bs-primary` (was wrongly `#2575c4`).
  Full `brand.50..950` scale uses the site's own tint/shade stops.
- **Safety orange** anchor `#ed6d16` = real `--bs-secondary` / `--bs-orange`, the
  "FOR PATIENT SAFETY" colour in the logo. `safety.50..700`.
  **SEMANTIC ONLY**: patient-safety / explant-analysis moments (e.g. Implant Cycle
  stage 04, the "150+ explants" stat dot, "Sécurité du patient" value, "Submit an
  explant" button). NEVER a generic CTA. The client explicitly said keep it out of
  the hero CTA.
- **Cool neutral** (not cream, not flat white): `paper #f4f7f9`, `mist #e9eef2`,
  `line #d7dfe5`, `ink` (`#0e1a24` blue-black / soft `#33485c` / muted `#6b7f8f`).
- `accent` (`#f59e42`) was re-added ONLY to support the restored original hero CTA.

### Type (wired via `next/font/google` in `app/layout.tsx`)
- **Display** = `Spectral` (serif, journal gravitas) -> `font-display`, `--font-display`.
- **Body/UI** = `IBM Plex Sans` -> `font-sans`, `--font-sans`.
- **Data/mono** = `IBM Plex Mono` -> `font-mono`, `--font-mono`. Used for stats,
  ISO numbers, dates, section tags ("specimen/engineering annotation" role).

### Reusable classes (in `app/globals.css`)
- `.btn-primary` (blue), `.btn-ghost`, `.btn-onDark`, `.btn-safety` (orange, semantic),
  `.btn-accent` (original hero only).
- `.mono-label`, `.mono-label-brand` (uppercase mono section kickers),
  `.stat-figure` (tabular mono numerals), `.card`, `.pill`, `.field-label`,
  `.field-input`.
- `.tick-frame` (engineering corner registration marks), `.bg-grid` (blueprint
  grid for dark panels), `.duotone` / `.duotone-tint` / `.duotone-shadow`
  (radiographic image treatment, currently unused after hero revert, kept for reuse).
- `prefers-reduced-motion` block + `:focus-visible` ring are set globally.

### Signature element
`components/ImplantCycle.tsx` = the four real platforms (Technological Engineering,
Education, Clinical Monitoring & Research, Explant Analysis) as an **interactive
radial instrument dial** + accessible audience-wayfinding list. Data comes from
`IMPLANT_CYCLE` in `lib/content.ts` (restructured to the 4 real platforms, each with
`audience` + `href` + `safety?`). Reused on Home and About as the recurring motif.

---

## 2. What is DONE (all verified, tsc clean, routes 200)

| Area | Files | Notes |
|---|---|---|
| Tokens | `tailwind.config.ts`, `app/globals.css` | colors/fonts/classes above |
| Fonts + shell | `app/layout.tsx` | next/font, bg-paper, metadata em dash fixed |
| Logo | `components/Logo.tsx` | **ORIGINAL restored** (pulse mark + "Surgical Training"); has `tone="light"` for dark footer |
| Header | `components/SiteHeader.tsx` | line/mist tokens, gradient top hairline, mono dropdown |
| Footer | `components/SiteFooter.tsx` | dark brand-950 instrument panel + grid + mono labels |
| Hero | `components/HomeHeroes.tsx` | **ORIGINAL "V2 Image" restored** per client: Unsplash stock image, brand gradient, ORANGE `.btn-accent` CTA, +1150/96%/40+ stats bar |
| Home | `app/page.tsx` | hero + partners + Implant Cycle + Evidence/impact (real stats + real journals) + live cards + Industry path + history + testimonials (DEMO_DATA) + FAQ + blue CTA |
| Cards | `components/TrainingsExplorer.tsx` (`TrainingCardModern`) | live `useTrainings()`, restyled; **price removed** |
| Trainings list | `app/trainings/page.tsx` | mono kicker, filters/chips, FAQ |
| Detail drawer | `components/TrainingsExplorer.tsx` (`DetailPanel`) | click-through drawer; **price removed** (full-width CTA + no-engagement note) |
| Single course | `components/TrainingDetailView.tsx` + `app/trainings/[slug]/page.tsx` | dark instrument header; sidebar **price removed** -> "Réserver cette session" + details + CTA |
| Register | `components/RegisterFlow.tsx`, `components/RegisterPanel.tsx` | numbered mono sections; frozen fields + `createLead` + `doneRef` UNTOUCHED; selected-session box now shows **dates not price** |
| About cluster | `app/about/page.tsx` + `components/DocPage.tsx` (shared shell) + subpages team/funders/membership/quality/publications/legal/privacy | main page reuses ImplantCycle; DocPage restyle covers all subpages |
| Contact | `app/contact/page.tsx` | mono kicker, tick-frame form, mono address/social |
| Sign upload | `components/SignUpload.tsx` + `app/sign/page.tsx` | cosmetics only; `uploadSignedContract` UNTOUCHED |
| Copy | `lib/i18n.tsx`, `lib/content.ts` | em dashes removed; home copy regrounded to real device-safety identity |
| Seed | `lib/trainings.ts` | em dash separators -> `:` in seed titles (type/helpers unchanged; `euro()` still exported, now unused) |

**Money removal (client request):** price/`euro()` is now gone from ALL public
training views (card, drawer, single-course sidebar, register summary). `priceEUR`
/`depositEUR` remain in the data untouched; only the display was removed. `euro()`
imports were dropped from those components (helper still exported from `trainings.ts`).

---

## 3. Key client decisions / preferences (honour these)

1. **Hero = the ORIGINAL "V2 Image"**, restored exactly. The client rejected the
   redesigned duotone hero. Do NOT re-change the hero without being asked.
2. **Logo = the ORIGINAL** (pulse mark + "Surgical Training"). Do NOT swap it.
3. **Orange is semantic-only.** Never use it as a generic CTA (hero CTA stays blue
   in the system; the restored original hero's orange CTA is the client's explicit
   exception).
4. **No prices shown** anywhere in the public training UI.
5. Spectral kept for display.

---

## 4. OPEN / TODO for next session

- **`/dashboard`** (staff organizer space, `app/dashboard/page.tsx`) is the ONLY
  page NOT restyled yet. It is internal/staff-facing; flagged optional. Restyle to
  the system if the client wants it.
- **Optional final mobile sweep** across all new pages (spot-check <=390px).
- **Known, client-DEFERRED:** live Supabase training titles + program days contain
  em dashes (e.g. `Abord vasculaire périphérique — module avancé`, `Jour 1 —
  Fondamentaux`). These are BACKEND-owned data (console/DB), out of website scope.
  Client chose "leave as-is for now." They appear on the server-rendered
  `/trainings/[slug]` page and on client cards after the live fetch resolves.
  Fix path (when approved): update titles in the console course editor OR a
  hand-run SQL migration in the console repo. Do NOT mutate the shared DB from the
  website session.
- **Hero caveats the client is aware of** (offered as easy toggles, not yet actioned):
  the restored hero uses the Unsplash STOCK image and keeps the new device-safety
  headline copy (original training headline `home.title` original wording is not
  restored). Swap either only if asked.
- **DEMO_DATA** to replace before launch: `TESTIMONIALS` in `lib/content.ts`
  (placeholder practitioners). Hero/evidence stats are REAL (brief Section 4).

---

## 5. How to run / verify (Windows)

- Website dev server: from the website folder `npx next dev -p 3001`
  (the `dev` script is bare `next dev` which defaults to 3000, so pass `-p 3001`).
- Console runs separately on **3000**; leave it alone.
- **Windows gotcha (from STATUS.md):** kill project `node` processes before
  restarting; do NOT `rm -rf .next` on a running server. If a route 500s with
  "Jest worker ... exceeding retry limit", that is a dev-worker crash, not a code
  bug, restart the website dev server (kill the PID owning port 3001, relaunch).
- Screenshots (no browser extension needed), headless Chrome is installed:
  `"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --hide-scrollbars --window-size=1440,3000 --screenshot=out.png "http://localhost:3001"`
  For mobile use `--window-size=390,6600`.

---

## 6. Assets downloaded from the live site (in `public/`)

- `public/brand/logo-gepromed-color.png`, `logo-gepromed-white.png`
- `public/photos/workshop-dsc0104.jpg` (trainee at ZEISS microscope, best real photo),
  `workshop-dsc0059.jpg` (slit-lamp eye), `workshop-img3049.jpg` (sim station),
  `doctor-goggles.jpg` (STOCK, avoid). Live site only hosts these at <=480px.
  Real GEPROMED image URL pattern: `http://www.gepromed.com/var/site/storage/images/_aliases/<alias>/<path>`.
- Team headshots / funder logos / equipment photos also exist on the live subpages
  (team, funders) if the next session wants to pull real imagery for those pages.

---

## 7. Quick file map

- Design tokens: `tailwind.config.ts`, `app/globals.css`
- Shell: `app/layout.tsx`, `components/SiteHeader.tsx`, `components/SiteFooter.tsx`, `components/Logo.tsx`
- Home: `app/page.tsx`, `components/HomeHeroes.tsx` (Hero), `components/ImplantCycle.tsx`
- Trainings: `app/trainings/page.tsx`, `components/TrainingsExplorer.tsx`, `components/TrainingDetailView.tsx`, `app/trainings/[slug]/page.tsx`
- Register: `app/register/page.tsx`, `components/RegisterFlow.tsx`, `components/RegisterPanel.tsx`
- About: `app/about/page.tsx` + `app/about/*/page.tsx`, `components/DocPage.tsx`
- Contact/Sign: `app/contact/page.tsx`, `app/sign/page.tsx`, `components/SignUpload.tsx`
- Copy/data: `lib/i18n.tsx`, `lib/content.ts`, `lib/trainings.ts` (seed), `lib/data.ts` (DO NOT touch)
