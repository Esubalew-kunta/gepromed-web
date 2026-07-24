# Gepromed-web — Client Comments Fix Plan

> Source: client comments (@Esubalew / @nathanim), 2026-07-22.
> Decisions captured: ISO 13485 removed from engineering hero only; sponsors =
> web display only for now; Teams board/committee scaffolded (real members
> later); equipment images, equipment→email map, ISVB/ESVB logos and donation
> URL are available and will be dropped in.

**Status legend:** ✅ ready to build · 🟡 needs an asset you have (drop-in) ·
🔗 cross-repo (console / Supabase / n8n) · ⚠️ decision or content to confirm

---

## 1. Training

### 1.1 Cards link straight to the detail page (remove the side slide) ✅
- **Comment:** cards should open the individual page directly, not a pop-up side slide.
- **Change:** in [components/TrainingsExplorer.tsx](components/TrainingsExplorer.tsx) the card `onOpen` currently opens the detail `Sheet` (drawer, lines ~142–157 + `DetailPanel`). Make the card navigate to `/trainings/[slug]` instead and retire the detail drawer. Keep the **Register** `Sheet` modal (lines ~159–168).

### 1.2 Card buttons: left "Register", right "Details →" ✅
- **Comment:** bottom-right keeps "Details →"; add a "Register" button on the left.
- **Change:** the card footer gets two actions — left **S'inscrire / Register** (opens the existing register modal / `RegisterPanel`), right **Détails / Details →** (→ `/trainings/[slug]`).
- **Files:** `components/TrainingsExplorer.tsx` (`Card`).

### 1.3 Sponsor section at the bottom of the detail page ✅
- **Comment:** each training detail page needs a Sponsor section at the end (logo + name).
- **Finding:** sponsors already render *inline near the price* in [components/TrainingDetailView.tsx](components/TrainingDetailView.tsx) (~line 256) and the `sponsors` field already exists in [lib/trainings.ts](lib/trainings.ts) (`sponsors?: { name; logoUrl?; website? }[]`).
- **Change:** add a dedicated **Sponsors** section at the very bottom of `TrainingDetailView.tsx` — heading + logo(s) + name + optional website link. Data-driven from `t.sponsors`.

### 1.4 / 1.5 Console sponsor picker + "add new sponsor" pop-up 🔗 (follow-up)
- **Comment:** AI console training-creation page needs a sponsor picker (single + multiple) and an "add new sponsor" pop-up (logo required, name required, website optional) that persists to a reusable list.
- **Scope decision:** *web display only for now.* This console + Supabase (table + logo storage bucket) work is a **separate follow-up**, tracked here but not in this pass. For now sponsor rows are added directly in Supabase.

---

## 2. Congress

### 2.1 More color / interactivity ✅
- **Comment:** the page looks bland; add interactive elements like the rest of the site.
- **Change:** design pass on [app/congresses/page.tsx](app/congresses/page.tsx) (and light touches on the detail) — brand color, `Reveal`/motion stagger, hover states, matching the site's animation system.

### 2.2 "Next Edition" logo (ISVB=US / ESVB=EU), static 🟡
- **Comment:** the first "Next Edition" block must show the ISVB logo (US) or ESVB logo (EU); no need to be dynamic — push the latest one.
- **Change:** add a `logo` field to the congress record in [lib/congresses.ts](lib/congresses.ts) (or hardcode on the featured block) and render it in the "Prochaine édition / Next edition" card in `app/congresses/page.tsx` (~line 47).
- **Needs:** the ISVB + ESVB logo image files → `public/photos/congresses/…`.

### 2.3 "Explore congress" is broken/incomplete — restore map / address / time / details ⚠️🟡
- **Finding:** the detail page's `UpcomingBody` ([app/congresses/[slug]/page.tsx](app/congresses/[slug]/page.tsx)) supports welcome message, venue, address, program, sponsors, accommodation — but the **ISVB 2026** record had its (fabricated Strasbourg) venue/program **removed** earlier because the event is actually in **Tampa, Florida** and Gepromed only supports it. That's why it looks empty.
- **Change:** (a) repopulate ISVB 2026 with **real** venue/address/dates/time in `lib/congresses.ts`; (b) add a **Map** section (static image or embedded map keyed off the address) + a time/schedule block in the detail page.
- **Needs:** confirmed real ISVB 2026 (Tampa) venue, address, date/time. Map builds once the address is known.

---

## 3. Engineering

### 3.1 ISO 9001 stays everywhere ✅ — no change.

### 3.2 Remove ISO 13485 from the engineering hero (top) only ✅ ⚠️
- **Change:** [app/engineering/page.tsx](app/engineering/page.tsx) line ~34 `ISO 9001 · 13485` → `ISO 9001`.
- **⚠️ Note:** the client wrote "13485 only for testing topics, nowhere else," but the chosen scope is **engineering-hero-only**. That leaves `ISO 9001 · 13485` in the **site footer** ([components/SiteFooter.tsx](components/SiteFooter.tsx) line ~36) and the **trainings page** ([app/trainings/page.tsx](app/trainings/page.tsx) line ~37). Confirm those should stay.

### 3.3 Remove ISO 7198 site-wide ✅
- **Change:** remove `ISO 7198` from: `app/engineering/page.tsx` (~line 37 badge), [lib/engineering.ts](lib/engineering.ts) `tag` (~line 89 — becomes 13485, see 3.4) and body-text mentions (~lines 104–105 "norme ISO 7198"). Grep confirms these are the only occurrences.

### 3.4 Testing section "02" gets the ISO 13485 mention, same badge format as the hero ✅
- **Change:** in `lib/engineering.ts` the testing platform item's `tag` (~line 89) changes `ISO 7198` → `ISO 13485`, rendered as the same badge style used at the top.

### 3.5 Real equipment images from Wissal's email 🟡
- **Change:** replace the placeholder JPGs in `public/photos/engineering/equipment/` (same filenames as [lib/equipment-park.ts](lib/equipment-park.ts)); adjust `equipment-park.ts` if any machine names/filenames differ.
- **Needs:** Wissal's image files.

### 3.6 New email automation from the equipment→email map 🟡🔗
- **Comment:** add email automation based on the equipment-email map Wissal shared.
- **Change:** cross-repo — define the mapping, then build an n8n workflow (same pattern as the existing engineering/expense email automations) and wire the trigger. Console side if the trigger lives there.
- **Needs:** Wissal's equipment→email map; clarification of the trigger (which user action sends which email).

### 3.7 Bigger hero image area in the engineering side drawer ✅
- **Change:** in [components/EngineeringExplorer.tsx](components/EngineeringExplorer.tsx) (and `components/ui/Sheet` if needed) increase the hero image height/area in the drawer so the images read clearly.

---

## 4. Teams

### 4.1 Add "Board" section (president in the board) ✅ 🟡
- **Change:** in [app/about/team/page.tsx](app/about/team/page.tsx) add a **Conseil d'administration / Board** section above/near the team; place the president (Nabil Chakfé) in it. Scaffold remaining board seats as placeholders.

### 4.2 Current team section — no change ✅

### 4.3 Add "Scientific Committee" section ✅ 🟡
- **Change:** add a **Comité scientifique / Scientific Committee** section (scaffolded, placeholder members).
- **Needs (4.1 + 4.3):** real Board + Scientific Committee member lists (names, roles, photos) to replace placeholders.

---

## 5. Global — Donation floating button 🟡

- **Comment:** add a donation floating button across the site, like fondation-force.fr.
- **Change:** new `components/DonateButton.tsx` — fixed/floating "Faire un don / Donate" button (bottom corner, brand color, persistent, subtle motion), added once in [app/layout.tsx](app/layout.tsx) so it shows on every page. Links to the donation URL (new tab).
- **Needs:** the donation link URL.

---

## Inputs to collect (you said these are available)
1. Equipment images (Wissal) → `public/photos/engineering/equipment/`.
2. Equipment→email map (Wissal) + which action triggers which email.
3. ISVB + ESVB logo files.
4. Donation link URL.
5. Real ISVB 2026 (Tampa) venue / address / date-time (for congress explore).
6. *(later)* Board + Scientific Committee members; sponsor rows/console feature.

---

## Suggested phasing

- **Phase 1 — no inputs needed (build now):** 1.1, 1.2, 1.3, 2.1, 3.2, 3.3, 3.4, 3.7, 4.1/4.3 (scaffold), plus the donation button *shell* (URL wired in Phase 2).
- **Phase 2 — drop-in assets:** 2.2 (logos), 3.5 (equipment images), donation URL.
- **Phase 3 — content/data:** 2.3 (real Tampa data + map), Teams real members.
- **Phase 4 — cross-repo:** 1.4/1.5 (console sponsor UI), 3.6 (email automation).
