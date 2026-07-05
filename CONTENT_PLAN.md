# Gepromed Website: Final Content and Design Plan

## IMPLEMENTED (this session, local only, NOT pushed)

Executed per your instructions: frontend only, real data from the old site, placeholders
for photos, demo testimonials kept, contact form left visual only, nothing pushed to GitHub.

- New `Reveal` motion primitive: one short fade + rise on scroll, reduced-motion safe, can
  never leave content hidden (`components/Reveal.tsx`).
- New Blog / News: `/news` (editorial featured lead + category filter + grid) and
  `/news/[slug]` (article with pull quotes and related posts). 5 real posts seeded from the
  old site: ESVB congress, HelpMeSee simulation, VR publications, the FEDER/EU project, the
  vascular bootcamp (`lib/news.ts`, `app/news/*`).
- New Congresses: `/congresses` (dark instrument featured panel + past-editions timeline)
  and `/congresses/[slug]` (instrument header + program timeline + sticky CTA). Real ESVB /
  ISVB data (`lib/congresses.ts`, `app/congresses/*`). Chosen over a flat list because the
  ESVB content is deep, it reuses the trainings list-to-detail pattern, and each edition gets
  its own URL.
- Team page: real operational team (Chakfé, Borcos, and 7 others) plus the scientific
  committee, placeholder initials (`app/about/team/page.tsx`).
- Funders page: real EU project stat panel (FEDER 4,013,741 EUR, total 7,096,430 EUR,
  2023 to 2027) (`app/about/funders/page.tsx`).
- Publications page: expanded to 5 real, verifiable references grouped by theme
  (`app/about/publications/page.tsx`).
- Legal page: real hosting (Render), removed the "demonstration" line
  (`app/about/legal/page.tsx`).
- Nav + footer: added Congrès and Actualités links (`SiteHeader`, `SiteFooter`, `i18n`).

Verified: `tsc --noEmit` clean, `next build` clean (exit 0), all routes 200, screenshots
of every new page reviewed. Not touched: colors, hero, logo, done page layouts, data wiring,
the contact form, the shared database.

The full plan that produced this follows.

---

Plan only. No code changes until you approve and comment.

## What this is

The redesign looks good and the structure is done. The real gap is **data and depth**:
some pages are thin, use placeholder text, or link visitors away to the old gepromed.com.
And the site is missing sections the old site had (news, congresses).

This plan does two things:
1. **Feed real data into the pages that already exist** (real data pulled from gepromed.com).
2. **Add new pages** the site needs (Blog, Congresses, and a couple more), built to a
   senior design standard.

## Hard rules (kept)
- No color changes. Same tokens, same brand blue, orange stays semantic only.
- Do not touch the done page designs, the hero, or the logo.
- Do not touch data wiring: trainings fetch, register form and `createLead`, sign upload,
  Supabase. **Contact form stays visual only, no send wiring** (your decision).
- No em dashes. Everything bilingual FR and EN.

---

# The design bar (applies to every new page)

Not negotiable. New pages must look like a senior UX/UI and frontend designer made them,
not a template.

- **Not generic.** No stock card grids dropped on a white page. Every new page gets a real
  editorial layout: a strong lead, clear hierarchy, asymmetry where it earns attention,
  purposeful whitespace. It should feel like the same hand that made the Home and About pages.
- **Not flat static content.** Use the design system's own devices already in the site: the
  mono section kickers, tick-frame registration marks, the blueprint grid on dark panels, the
  stat-figure numerals, the dark "instrument" bands. Break long text with pull data, real
  numbers, timelines, and image treatment, not walls of paragraphs.
- **Motion: restrained and meaningful.** Small, fast, on purpose. Allowed: subtle reveal on
  scroll, hover lifts on cards, the existing radial dial. Not allowed: heavy parallax,
  looping background animation, bouncy effects, anything that delays reading. Everything
  respects `prefers-reduced-motion` (already global).
- **Detail craft.** Real focus states, proper spacing rhythm, tabular numerals for figures,
  optical alignment, good empty states. Reuse existing components so it stays consistent.
- **Content first.** Design serves real content. No filler text to fill a grid.

---

# PART A: Existing pages (feed real data)

## 1. Home (`app/page.tsx`)
- **Current status:** Strong. 10 sections, 9 real, 1 live Supabase (trainings).
- **What is missing:** The Testimonials section is fake (invented names in `lib/content.ts`).
- **New plan:** Replace the 3 fake quotes. If we have real quotes, use them. If not, swap the
  section for something real and better looking: a "Trusted by" partner and funder logo row,
  or a "Latest from Gepromed" strip once the Blog exists.
- **Content and design:** Same section rhythm. If we go logos or news, it is a more honest and
  more premium block than fake quotes.
- **Why:** Fake testimonials are the one part of the home page that reads as fake.
- **What is affected:** `lib/content.ts` (`TESTIMONIALS`), one section in `app/page.tsx`.

## 2. Team (`app/about/team/page.tsx`)
- **Current status:** Thin. 6 professor surnames as initials, identical subtitles, then a link
  to the old site for the real team.
- **What is missing:** The actual operational team.
- **New plan:** Two clear groups: "Scientific committee" (the professors) and the real
  "Operational team". Designed as a proper people section, not a bland avatar grid: role tags,
  a short line each, ordered by seniority, quiet hover detail.
- **Content and design (real data, ready to use):**
  - Nabil Chakfé, President (vascular surgeon, co-founder 1993)
  - Annik Borcos, CEO
  - Nathalie Couvreur, Administrative and financial manager
  - Nicole Neumann, Development and Innovation manager
  - Wissal Lachegur, Mechatronics engineer
  - Juliette Tabouret, Textile engineer
  - Mohamed Allouche, AI software engineer
  - Noé Constans, PhD student
  - Fanny Fuchs, Tech Lab work-study student
  - Initials are fine now, real photos slot in later without a redesign.
- **Why:** A team page with no real people is the biggest "this is a demo" tell on the site.
- **What is affected:** `app/about/team/page.tsx` only. No wiring.

## 3. Funders (`app/about/funders/page.tsx`)
- **Current status:** Real names but shallow, plain text, no numbers.
- **What is missing:** The real funding story, which is strong.
- **New plan:** Keep the 4 groups, add a designed stat block for the EU project using the
  site's stat-figure and dark-panel treatment (not a plain paragraph).
- **Content and design (real data, ready to use):**
  - Project: "Imaging and Monitoring of Implantable Medical Devices and Artificial Intelligence"
  - European Union via FEDER (ERDF): 4,013,741.02 EUR (56.56 percent of the project)
  - Total project cost: 7,096,430.37 EUR
  - Period: 7 September 2023 to 31 December 2027
  - Backers: Région Grand Est, Eurométropole de Strasbourg, Collectivité européenne d'Alsace
- **Why:** Real euro figures and a named EU project make Gepromed look funded and serious.
- **What is affected:** `app/about/funders/page.tsx` only.

## 4. Publications (`app/about/publications/page.tsx`)
- **Current status:** Real but only 2 links, then defers to the old site.
- **What is missing:** A fuller, self-hosted list.
- **New plan:** Keep the 2 real PubMed links, add more real references, grouped by theme
  (Explant analysis, Device testing, Education) to match the Home grouping. I will gather real
  references for your approval, I will not invent citations.
- **Content and design:** Same list style, cleaner grouping and year sort.
- **Why:** A research institute should hold its own publications, not send people away.
- **What is affected:** `app/about/publications/page.tsx` only.

## 5. Contact (`app/contact/page.tsx`)
- **Current status:** Real addresses, email, socials. Form is visual only.
- **New plan:** **Leave the form as visual only (your decision, no send wiring).** I may polish
  the visual states (focus, validation styling) but it will not send.
- **What is affected:** Nothing functional. Optional visual polish only.

## 6. Legal notice (`app/about/legal/page.tsx`)
- **Current status:** Placeholder. Blank hosting field, a "this is a demonstration" line, and a
  link to the old site for the real notice.
- **New plan:** Fill hosting (Render), keep real office and contact, drop the "demonstration"
  line when you go live.
- **What is affected:** `app/about/legal/page.tsx` only.

## 7. Quality (`app/about/quality/page.tsx`)
- **Current status:** Good. 3 stats plus a real Qualiopi FAQ.
- **New plan:** Keep. Confirm the 96 percent and 100 percent figures are real, or soften.
- **What is affected:** Minor or none.

## 8. Membership (`app/about/membership/page.tsx`)
- **Current status:** Thin but acceptable. 2 cards linking to HelloAsso.
- **New plan:** Optional. Add a short "what your support funds" list for depth. Low priority.
- **What is affected:** `app/about/membership/page.tsx` only.

## 9. Privacy (`app/about/privacy/page.tsx`)
- **Current status:** Fine, real GDPR text. Leave it.

## 10. Dashboard (`app/dashboard/page.tsx`)
- **Current status:** Staff redirect stub, falls back to localhost if env var missing.
- **New plan:** Leave it, confirm the console URL env var on Render. Not visitor facing.
- **What is affected:** `app/dashboard/page.tsx` only.

## Pages that need nothing
Trainings list, single course, Register, Sign, About overview, header, footer. Done and live.

---

# PART B: New pages (proposed, senior design)

## NEW 1. Blog / News (Actualités)  [you asked for this]
- **Current status:** Does not exist. The old site had no real blog, so this is an upgrade.
- **New plan:** `/news` (list) and `/news/[slug]` (article). Add "Actualités / News" to the nav.
- **Content and design:** A real editorial layout, not a plain card wall: a featured lead post,
  a filterable grid by category, mono date kickers, generous type for reading, quiet hover
  reveals. Article types at launch: training recaps with photos, publication announcements,
  congress news, short device safety notes, partnership and funding news.
  - **Data source:** local typed content or Markdown files first (no backend, you add posts by
    file). Can move to Supabase later so the console manages posts.
- **Why:** Fresh content, SEO, a reason to return, proof the institute is active. You asked for it.
- **What is affected:** New files under `app/news/`, one nav link. No wiring risk.

## NEW 2. Congresses / Events (Congrès)
- **Current status:** Missing here. The old site has it and it is a real, strong asset.
- **New plan:** `/congresses` (list) and optionally `/congresses/[slug]` per event.
- **Content and design (real data, ready to use):** Designed like a real event page, reusing the
  training detail layout (dark instrument header, program timeline, real dates and venue), not a
  bare list.
  - ESVB (European Society for Vascular Biology), organised by Gepromed every 2 years since 2001,
    on cardiovascular biomaterials.
  - ESVB 2025: 15 to 17 May 2025, Palais de la Musique et des Congrès, Strasbourg. Three parts:
    Bootcamp Vasculaire (14 to 15 May), Translational Research Meeting (15 May), ESVB Symposium
    (16 to 17 May).
  - ISVB 2026: upcoming, details to confirm.
- **Why:** Congresses show Gepromed as a scientific convener, not just a training shop.
- **What is affected:** New files under `app/congresses/`, one nav link. No wiring risk.

## NEW 3. Platforms / Services detail (recommended)
- **Current status:** The 4 platforms only exist as the dial on Home and About. Industry and
  explant audiences are sent straight to `/contact` with no page to read.
- **New plan:** A designed `/platforms` page (or one page per platform), strongest for Industry
  testing and Explant analysis (the safety-orange audience).
- **Content and design:** Reuse the Home "Industry" content (ISO 13485, ZEISS Xradia, Faxitron)
  as the seed, expanded into a real service page with spec detail and clear next steps.
- **Why:** Those audiences currently have no landing content, only a button. A real page converts.
- **What is affected:** New files under `app/platforms/`. No wiring risk.

## NEW 4. HelpMeSee partnership (optional, low priority)
- **Current status:** Missing. Old site had it in the top nav.
- **New plan:** A short partnership page, or a block on the Funders page.
- **What is affected:** One small page or an existing-page block.

---

# Priority order (recommended)
1. **Team real data** (fastest credibility win)
2. **Blog / News** (you asked for it, biggest add)
3. **Congresses page** (real, missing, differentiates)
4. **Funders real numbers** (quick, strong)
5. **Home testimonials** fix (remove the one fake thing)
6. **Publications** expand
7. **Legal and Quality** cleanups (pre launch)
8. Platforms and HelpMeSee (later)

---

# What I will NOT touch
- Any color, the hero, the logo, the done page layouts.
- Data wiring: trainings, register and `createLead`, sign upload, Supabase.
- **The Contact form send** (staying visual only, your decision).
- The shared database (backend-owned em dash titles, deferred).

---

# Questions for you before I start
1. Blog data source: local files for now, or wire to Supabase so the console can post?
2. Testimonials: do you have real quotes, or replace that section with partner and funder logos?
3. Congresses: list only, or full page per congress?
4. Team and news photos: send me images, or I use initials and placeholders for now?
5. Start order: follow my priority list, or reorder?

Nothing above has been coded. Approve or comment and I will start.
