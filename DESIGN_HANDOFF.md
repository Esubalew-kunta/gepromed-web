# Website — Design Handoff (READ FIRST)

This is the **public Gepromed website** (Next 14, runs on **:3001**). Your job in
this session is **visual/UI redesign only**. The site is already wired to the
shared Supabase backend and the staff console. **The data wiring must keep working.**

> ⚠️ **Get the new UI design direction from the user (Esubalew) before starting.**
> Do not invent a design. Ask for the design instructions, then redesign the
> presentation while preserving every data connection listed below.

Full backend context: the sibling console folder's `STATUS.md`.

---

## How this site is connected (do not break this)

One shared Supabase project (`aablleekwyjqdxsscyeo`) backs both this site and the
staff console. This site uses the **anon** key only (`.env.local`,
`NEXT_PUBLIC_SUPABASE_*`). Data flows through these files:

| File | Role | Rule |
|---|---|---|
| `lib/data.ts` | Supabase REST calls: `getTrainings`, `getTrainingBySlug`, `createLead`, `uploadSignedContract` | **DO NOT change the logic, URLs, or field names.** Presentation only elsewhere. |
| `lib/trainings-context.tsx` | `TrainingsProvider` fetches trainings once, `useTrainings()` feeds the cards | **DO NOT touch.** |
| `lib/trainings.ts` | `TrainingSession` type + helpers (`isUpcoming`, `spotsLeft`, `euro`, `formatDateRange`, `SPECIALTY_IMAGE`, label maps) + a seed fallback array | Keep the type shape + helper names. |
| `app/trainings/[slug]/page.tsx` | server-fetches a course from Supabase | keep the fetch. |
| `components/SignUpload.tsx`, `app/sign/page.tsx` | lead uploads a signed contract → Supabase | **DO NOT touch the upload logic.** |
| `.env.local` | anon key + `NEXT_PUBLIC_CONSOLE_URL` (footer link) | never commit/change keys. |

## The cards — DATA WIRING MUST NOT BE TOUCHED

The training **cards live in `components/TrainingsExplorer.tsx`** (component
`TrainingCardModern`) and pull their data from `useTrainings()` (Supabase, live).

- ✅ **You MAY** restyle the card markup/CSS/layout freely (make it beautiful).
- ❌ **You MUST NOT** change where the data comes from or the fields read:
  `t.title` (bilingual, via `loc(t.title, lang)`), `t.imageUrl || SPECIALTY_IMAGE[t.specialty]`,
  `t.city`, `t.priceEUR`, `spotsLeft(t)`, `t.enrolled/t.capacity`, `t.specialty/level`,
  the `onOpen` → detail drawer, and the register flow.
- ❌ Do not remove `useTrainings()`, the provider, or the seed fallback.

If a training you created in the console (with an uploaded image) shows on the
site, the wiring is working. Keep it that way.

## The registration form — FIELD CONTRACT IS FROZEN

`components/RegisterPanel.tsx` collects the lead and calls `createLead(...)`
(→ the `create_lead` RPC → the console's Lead pipeline). You may restyle it, but:

- ❌ **Do not rename, add, or remove form fields.** The field names map 1:1 to the
  lead schema (firstName, lastName, email, phone, profession, institution, country,
  dietary, arrival, needsAccommodation, elearningAccess, notes, sessionSlug).
- ❌ **Do not change the `createLead(...)` call** or the success screen's `doneRef`.
- ✅ You may restyle inputs, layout, sections, and copy.

## Safe to redesign (presentation)
Home (`app/page.tsx`), trainings list + cards + detail drawer (`TrainingsExplorer.tsx`,
`TrainingDetailView.tsx`), about pages, header/footer (`SiteHeader`/`SiteFooter`),
`RegisterPanel` visuals, `globals.css`, Tailwind config. Bilingual copy lives in
`lib/i18n.tsx` (FR/EN pairs) and `lib/content.ts`.

## Rules
- **No em dashes anywhere** (user preference).
- Keep it **bilingual FR/EN** (use `useT()` / `loc(value, lang)` / the `L = {fr,en}` type). Do not hardcode one language.
- After changes, run `node node_modules/typescript/bin/tsc --noEmit` (no `tsc` global) and `npm run dev` on **:3001**.

## Quick start for the new session
1. Read this file + the console `STATUS.md`.
2. **Ask the user for the UI design direction/instructions.**
3. Redesign presentation only; keep every data connection above intact.
4. Verify a course created in the console still renders on the site (cards) and the register form still submits (a lead appears in the console).
