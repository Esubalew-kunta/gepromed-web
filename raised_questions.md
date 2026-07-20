# Raised Questions — For Gepromed/Client

> Running log of open questions and decisions that came up while polishing/updating
> `gepromed-web`, organized by page/section. Add a new dated entry under the
> relevant section whenever a question needs client input before proceeding.
> Answered items should be moved to "Resolved" with the decision recorded, not
> deleted, so the reasoning stays traceable.

---

## Homepage

- **2026-07-20** — Two different "trained since 2018" figures appear on the site:
  the hero/evidence stats bar says **1,150+**, while the homepage's "3 Platforms"
  storytelling copy (from the v2 brief) says **1,800+**. Which is current/correct?
- **2026-07-20** — `96%` satisfaction and `40+` supervisors (hero stats bar) are not
  sourced from the legacy gepromed.com homepage — confirm the source, or replace/remove
  if unverifiable.
- **2026-07-20** — The v2 brief's homepage "3 Platforms" story (Explant Analysis /
  Testing / Education & Digital Twin) diverges from the site's own canonical
  4-platform `ImplantCycle` structure (Technological Engineering, Education, Clinical
  Monitoring & Research, Explant Analysis — confirmed on both gepromed-web and the
  legacy Implant Cycle page). Intentional simplification for the homepage, or should
  it be reconciled to 4 platforms?

## Trainings (catalog + detail + register)

- **2026-07-20** — The live training catalog's course names/dates/content (Bootcamp
  Vasculaire Avance, Abord vasculaire périphérique, etc.) don't match any currently-listed
  course on the legacy gepromed.com/courses page (which lists "18th Vascular Bootcamp,"
  "Workshop Ophthalmology Johnson&Johnson," "Workshop Ophthalmology Horus Pharma," etc.).
  Is the current catalog intentional placeholder/demo content, or does it need to be
  replaced with the real, currently-running course list? This affects names, dates,
  pricing, and the uploaded Qualiopi program workbooks already in progress.
- **2026-07-20** — Trainings specialty categories are narrower than the real site:
  gepromed-web only has `vascular | ophthalmology | simulation`, while the legacy
  Courses page filters on 6 (adds Orthopedics, Hand surgery, Neurosurgery, Nurse), and
  the legacy Quality page names 8+ total disciplines (adds Urology, Digestive surgery,
  Gynecology). Which specialties should be added to the data model, even before there's
  live content for them?
- **2026-07-20** — HelpMeSee has no public course catalog on gepromed-web (only the
  private `/lead/helpmesee` referral form), while the legacy site has a full public
  `/helpmesee` page with 5 distinct courses (Complications, Phacoemulsification,
  Vitrectomy, Suturing, MSICS). Rebuild the public catalog, or confirm referral-only
  is the permanent model going forward?
- **2026-07-20** — The PDF/Qualiopi program generator's visual output is currently a
  plain print-to-PDF HTML page; the v2 brief asked for a Canva/InDesign-templated,
  visually polished export instead. Confirm this redesign is still wanted, and if so,
  whether Gepromed will supply a branded template or needs one designed.
- **2026-07-20** — 5 of 8 live trainings are missing an uploaded `.xlsx` Qualiopi
  program workbook (draft workbooks were generated and are ready in scratch, format
  verified against the working generator) — need Gepromed to review/finalize and
  upload via the console's course-edit screen.
- **2026-07-20** — Found and fixed a systemic data bug on `phaco-initiation-helpmesee-2026-10`:
  every French-language field in Supabase (`title`, `summary`, `objectives`, `program`,
  `supervisors`, `prerequisites`, `teaching_methods`, `evaluation_methods`,
  `accessibility_info`, `registration_info`, `price_note`, `certificate_delivered`,
  `target_audience`) was missing accents throughout (e.g. "Realiser", "etapes",
  "cles", "Presentiel"), while English fields were fine — suggests this record was
  entered without a proper accented-character input method. Also enriched the generic
  objectives/program with the real procedure steps from the legacy site's
  Phacoemulsification course description (corneal incision, capsulorhexis, nucleus
  emulsification, IOL implantation, wound-hydration closure). **Other trainings
  likely have the same missing-accent issue** — spotted "haute-fidelite" and
  "financee" (missing accents) in `bootcamp-vasculaire-avance-2026-11` and
  `workshop-simulation-innovation-2026-12` in passing; worth a full sweep across all
  8 trainings' French text fields rather than fixing one-by-one as they're noticed.

## Congresses

- **2026-07-20** — ISVB 2026 is confirmed (from the legacy site) to be hosted in
  Tampa, Florida (1–2 June 2026), organized by an external host, with Gepromed only
  "supporting" it — not a Strasbourg event Gepromed runs. The previously-built
  "upcoming congress" page template (venue/access, local sponsors, accommodation,
  day-by-day program) doesn't apply to an externally-hosted event. Confirm: does
  Gepromed want a thinner "we support this external event" page (current state after
  the fix), or is there a next Gepromed-organized Strasbourg edition that should be
  featured as the primary "upcoming congress" instead?

- **2026-07-20** — Added the missing **ESVB 2021** edition (4–6 Nov 2021, 20th
  anniversary of the ESVB series) — it existed on the legacy Symposium page but was
  entirely absent from gepromed-web's congress list. Used 3 real photos downloaded
  from the legacy site (EXIF-dated 2021-11-17, matching the real dates). No
  scientific committee list is confirmed for this specific edition — left unset
  rather than reusing other editions' names.
- **2026-07-20** — Fixed a dead link: ESVB 2025's `ebookUrl` pointed to
  `/downloads/esvb-2025-ebook.pdf`, a file that never existed in the repo (404 on
  click). Removed it so the button now shows its existing "coming soon" disabled
  state instead. **No real e-book file exists for any edition** — confirm whether
  Gepromed has real proceedings PDFs to upload for ESVB 2025/2023/2021.
- **2026-07-20** — Enriched ESVB 2025's Bootcamp/Translational Research Meeting
  program text with real specifics from the legacy site (20 international
  residents, 3 presentation winners + 1 poster winner, May 16th gala dinner,
  35-and-under eligibility for the Young Researcher Prize).
- **2026-07-20** — **No real ESVB-2025-specific photos were found** on the legacy
  site — its photo gallery still reuses generic training photos
  (`doctor-goggles.jpg`, `workshop-*.jpg`) as placeholders, same for ESVB 2023.
  Only ESVB 2021 had real, congress-specific photos available. If Gepromed has real
  2025/2023 congress photos, they should replace these placeholders.
- **2026-07-20** — Two additional real photos were found on the legacy Symposium
  page but not used: a generic PMC/building exterior shot, and a group photo with
  large "...SVB" signage and a US flag (likely ISVB-related, business-casual
  attire, not a Gepromed-run event) — left unused since I couldn't confidently
  attribute them to a specific edition; worth asking Gepromed to confirm before
  using either.

## Engineering

- **2026-07-21** — Added real photos (downloaded from gepromed.com/en/implant-cycle)
  as hero images for each of the 3 Engineering bands: Explant Analysis (Zeiss
  micro-CT scan screen — matches the exact photo the legacy site itself labels
  "Explant Analysis"), Testing Platform (custom test-bench demo — matches the
  legacy site's "Technological Engineering" photo), Equipment Rental (Keyence VHX
  microscope/equipment, not used in the legacy 4-card grid, generic equipment fit).
- **2026-07-21** — Two other real photos found on the same legacy page were **not**
  used here since they belong to categories this page doesn't have: a clinical-study
  consent-form photo (legacy tag: "Clinical research") and a real wet-lab surgical
  simulation photo (legacy tag: "Education"). The Education one in particular could
  be a strong fit for the Trainings section's imagery if that's ever revisited —
  flagging in case it's useful there.
- **2026-07-21** — Content quality on this page was already excellent — real,
  specific institutional facts (ISO 9001 explant protocol certified since 6 Dec
  2012, testing platform founded 2009 with LPMT/Université de Haute-Alsace, ISO
  13485/9001 since 2013), no missing-accent issues like the trainings had. No
  changes needed to the copy itself.

## Footer / site-wide

- **2026-07-20** — Confirmed via the real logo artwork downloaded from gepromed.com:
  "CEA" in the funders list is **Collectivité européenne d'Alsace**, not the atomic
  energy commission. Flagging in case this was assumed differently anywhere else in
  planning docs or client communication.
- **2026-07-20** — `formation@gepromed.com` is used as the public contact email
  throughout the site, but is not visible anywhere on the current legacy site (no
  phone number or email found in the legacy site's HTML either). Confirm this is the
  correct, currently-monitored address before go-live.

---

## Resolved

- ~~Footer funder logos didn't match the real 4 (Grand Est, EU, Eurométropole, CEA)~~
  → fixed, real logo images downloaded from gepromed.com and wired in (2026-07-20).
- ~~Second office address (Bureaux, Bâtiment d'Anesthésiologie) was missing from the
  footer~~ → added (2026-07-20).
- ~~ISVB 2026 had a fabricated Strasbourg venue/date~~ → corrected to the real Tampa,
  Florida / 1–2 June 2026 data (2026-07-20). See open question above re: whether a
  Strasbourg-hosted edition should be featured instead.
- ~~Header/footer logo was a hand-coded reconstruction, not the real Gepromed logo~~
  → replaced with real, full-resolution logo assets downloaded from gepromed.com
  (2026-07-20).
- ~~Copyright footer said "Démo de refonte et rebranding"~~ → replaced with a real
  copyright line; legal/privacy/quality links converted from plain text to real,
  working links (2026-07-20).
