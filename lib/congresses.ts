import type { L } from "./i18n";

/* Frontend-only congress data, grounded in the real gepromed.com Congrès section
   (the biennial ESVB / ISVB series on cardiovascular biomaterials, Strasbourg).
   Bilingual FR/EN, no em dashes. */

export type CongressStatus = "upcoming" | "past";

export type CongressSession = {
  when: L;
  title: L;
  body: L;
};

export type CommitteeMember = {
  name: string;
  role?: L;
  affiliation?: string;
};

export type EventType = {
  title: L;
  body: L;
};

export type CongressLocation = {
  venue: L;
  address: L;
  access?: L;
};

export type Registration = {
  info: L;
  method: L;
  url?: string;
};

export type Sponsor = {
  name: string;
  logo?: string;
};

export type Accommodation = {
  name: L;
  note?: L;
};

export type Congress = {
  slug: string;
  status: CongressStatus;
  acronym: string;
  edition?: L; // e.g. "13th edition"
  year: string;
  dates: L;
  city: L;
  venue?: L;
  title: L;
  summary: L;
  intro: L;
  program?: CongressSession[];
  featured?: boolean;

  // Shared (past + upcoming)
  committee?: CommitteeMember[];

  // §6.1 — past edition blocks
  // Reserved for a REAL proceedings/abstracts file, if Gepromed ever supplies
  // one — not currently wired to any button. The "Récapitulatif" button on
  // the congress page always calls /api/congress-recap/[slug] instead, which
  // generates an honest recap (program/committee/photos) from data we
  // actually have. See raised_questions.md → Congresses.
  ebookUrl?: string;
  photos?: string[];

  // §6.2 — upcoming event-site sections
  welcome?: L;
  location?: CongressLocation;
  eventTypes?: EventType[];
  programPdfUrl?: string;
  registration?: Registration;
  sponsors?: Sponsor[];
  accommodation?: Accommodation[];
};

export const CONGRESSES: Congress[] = [
  {
    // Real dates/venue per gepromed.com/en/symposium (verified live 2026-07-20):
    // ISVB 2026 is in Tampa, Florida, 1-2 June 2026, not a Gepromed-organized
    // Strasbourg event. Gepromed supports it but the previous Strasbourg
    // venue/access/sponsors/accommodation/day-by-day program below were
    // fabricated for a different (Strasbourg-hosted) event model and have been
    // removed rather than guessed at Tampa specifics. Only fields backed by the
    // real site's copy are kept; the rest stays unset until Gepromed confirms
    // more detail for this externally-hosted edition.
    slug: "isvb-2026",
    status: "upcoming",
    acronym: "ISVB 2026",
    year: "2026",
    dates: { fr: "1 au 2 juin 2026", en: "1 to 2 June 2026" },
    city: { fr: "Tampa, Floride, États-Unis", en: "Tampa, Florida, USA" },
    featured: true,
    title: {
      fr: "ISVB 2026 : symposium international de biomatériaux vasculaires",
      en: "ISVB 2026: International Symposium on Vascular Biomaterials",
    },
    summary: {
      fr: "Gepromed est fier de soutenir l'International Symposium on Vascular Biomaterials (ISVB 2026), à Tampa, en Floride.",
      en: "Gepromed is proud to support the International Symposium on Vascular Biomaterials (ISVB 2026), taking place in Tampa, Florida.",
    },
    intro: {
      fr: "Cet évènement de référence réunit des médecins, ingénieurs, chercheurs et industriels de premier plan pour explorer les dernières avancées en biomatériaux vasculaires, du diagnostic assisté par IA et de la robotique chirurgicale aux implants de nouvelle génération et aux thérapies cardiovasculaires. Fort de plus de deux décennies d'excellence européenne à travers l'ESVB, ISVB 2026 est une occasion unique de rejoindre la communauté vasculaire mondiale et d'être à la pointe de l'innovation cardiovasculaire.",
      en: "This landmark event brings together world-leading physicians, engineers, researchers, and industry experts to explore the latest breakthroughs in vascular biomaterials, from AI-driven diagnostics and surgical robotics to next-generation implants and cardiovascular therapies. Built on over two decades of European excellence through the ESVB, ISVB 2026 is a unique opportunity to connect with the global vascular community and be at the forefront of cardiovascular innovation.",
    },
    registration: {
      info: {
        fr: "ISVB 2026 est organisé par ses propres hôtes à Tampa ; Gepromed soutient l'évènement au titre de la série ESVB. Les inscriptions sont ouvertes sur le site officiel de l'évènement.",
        en: "ISVB 2026 is run by its own host organizers in Tampa; Gepromed supports the event as part of the ESVB series. Registration is open on the official event site.",
      },
      method: {
        fr: "Inscrivez-vous directement sur la plateforme de l'ISVB 2026.",
        en: "Register directly on the ISVB 2026 event platform.",
      },
      url: "https://events.bizzabo.com/isvbe/page/5557705/register-here",
    },
  },
  {
    slug: "esvb-2025",
    status: "past",
    acronym: "ESVB 2025",
    year: "2025",
    dates: { fr: "15 au 17 mai 2025", en: "15 to 17 May 2025" },
    city: { fr: "Strasbourg, France", en: "Strasbourg, France" },
    venue: {
      fr: "Palais de la Musique et des Congrès (PMC)",
      en: "Palais de la Musique et des Congrès (PMC)",
    },
    title: {
      fr: "ESVB 2025 : European Society for Vascular Biology",
      en: "ESVB 2025: European Society for Vascular Biology",
    },
    summary: {
      fr: "Le congrès biennal de Gepromed sur les biomatériaux cardiovasculaires, au Palais de la Musique et des Congrès de Strasbourg.",
      en: "Gepromed's biennial congress on cardiovascular biomaterials, at the Palais de la Musique et des Congrès in Strasbourg.",
    },
    intro: {
      fr: "Organisé tous les deux ans depuis 2001, l'ESVB réunit cliniciens, chercheurs et industriels autour de la recherche sur les biomatériaux cardiovasculaires. L'édition 2025 s'est tenue au Palais de la Musique et des Congrès, au cœur de l'Europe institutionnelle.",
      en: "Held every two years since 2001, the ESVB brings together clinicians, researchers and industry around cardiovascular biomaterials research. The 2025 edition took place at the Palais de la Musique et des Congrès, at the heart of institutional Europe.",
    },
    program: [
      {
        when: { fr: "14 au 15 mai", en: "14 to 15 May" },
        title: { fr: "Bootcamp Vasculaire", en: "Vascular Bootcamp" },
        body: {
          fr: "Deux jours de pratique sur les procédures endovasculaires périphériques et aortiques : 20 internes vasculaires internationaux se sont exercés aux côtés de chirurgiens vasculaires reconnus, lors d'ateliers animés par les sponsors industriels. 3 lauréats ont été récompensés lors du dîner de gala.",
          en: "Two days of practice on peripheral and aortic endovascular procedures: 20 international vascular residents practiced alongside renowned vascular surgeons in workshops led by industry sponsors. 3 winners were announced at the conference dinner.",
        },
      },
      {
        when: { fr: "15 mai", en: "15 May" },
        title: {
          fr: "Translational Research Meeting",
          en: "Translational Research Meeting",
        },
        body: {
          fr: "Session commune avec l'ESVS Translational Meeting, avec un Prix du Jeune Chercheur ouvert aux internes, doctorants et chercheurs de 35 ans ou moins en biomatériaux et chirurgie vasculaire. 3 lauréats pour la meilleure communication et 1 lauréat pour le meilleur poster ont été récompensés lors du dîner de gala du 16 mai.",
          en: "A joint session with the ESVS Translational Meeting, featuring a Young Researcher Prize open to vascular trainees, PhD students and researchers aged 35 or under in biomaterials and vascular surgery. 3 winners for best presentation and 1 winner for best poster were crowned at the May 16th conference dinner.",
        },
      },
      {
        when: { fr: "16 au 17 mai", en: "16 to 17 May" },
        title: { fr: "Symposium ESVB", en: "ESVB Symposium" },
        body: {
          fr: "Le congrès principal consacré aux biomatériaux cardiovasculaires.",
          en: "The main congress addressing cardiovascular biomaterials.",
        },
      },
    ],
    // No real e-book file exists yet (the earlier /downloads/esvb-2025-ebook.pdf
    // reference was a dead link — the file was never present). Leave ebookUrl
    // unset so the button shows its built-in "coming soon" state instead of 404ing.
    photos: [
      "/photos/doctor-goggles.jpg",
      "/photos/workshop-dsc0059.jpg",
      "/photos/workshop-dsc0104.jpg",
      "/photos/workshop-img3049.jpg",
    ],
    committee: [
      {
        name: "Pr. Nabil Chakfé",
        role: { fr: "Président du congrès", en: "Congress Chair" },
        affiliation: "Université de Strasbourg, GEPROVAS",
      },
      {
        name: "Pr. Anne Lejay",
        role: { fr: "Comité scientifique", en: "Scientific Committee" },
        affiliation: "Hôpitaux Universitaires de Strasbourg",
      },
      {
        name: "Dr. Frédéric Heim",
        role: { fr: "Biomatériaux textiles", en: "Textile Biomaterials" },
        affiliation: "Université de Haute-Alsace, LPMT",
      },
      {
        name: "Dr. Salomé Kuntz",
        role: { fr: "Recherche translationnelle", en: "Translational Research" },
        affiliation: "GEPROVAS, Strasbourg",
      },
    ],
  },
  {
    // Added per gepromed.com/en/symposium (verified live 2026-07-20) — this
    // edition was missing from the site entirely. Real photos below are
    // downloaded from the legacy site, EXIF-dated 2021-11-17, matching the
    // real 4-6 Nov 2021 dates.
    slug: "esvb-2021",
    status: "past",
    acronym: "ESVB 2021",
    year: "2021",
    dates: { fr: "4 au 6 novembre 2021", en: "4 to 6 November 2021" },
    city: { fr: "Strasbourg, France", en: "Strasbourg, France" },
    venue: {
      fr: "Palais de la Musique et des Congrès (PMC)",
      en: "Palais de la Musique et des Congrès (PMC)",
    },
    title: {
      fr: "ESVB 2021 : 20e anniversaire du symposium européen sur les biomatériaux vasculaires",
      en: "ESVB 2021: 20th anniversary of the European Symposium on Vascular Biomaterials",
    },
    summary: {
      fr: "Le Symposium Européen sur les Biomatériaux Vasculaires a célébré son 20e anniversaire.",
      en: "The European Symposium on Vascular Biomaterials celebrated its 20th anniversary.",
    },
    intro: {
      fr: "L'édition 2021 marquait 20 ans de la série ESVB organisée par Gepromed (alors GEPROVAS) depuis 2001, réunissant cliniciens, chercheurs et industriels autour des biomatériaux cardiovasculaires au Palais de la Musique et des Congrès de Strasbourg.",
      en: "The 2021 edition marked 20 years of the ESVB series organized by Gepromed (then GEPROVAS) since 2001, bringing together clinicians, researchers and industry around cardiovascular biomaterials at the Palais de la Musique et des Congrès in Strasbourg.",
    },
    // No committee list for this specific 2021 edition is confirmed by the
    // legacy site — left unset rather than reusing other editions' names.
    photos: [
      "/photos/congresses/esvb-subevent1.png",
      "/photos/congresses/esvb-dsc3076.jpg",
      "/photos/congresses/esvb-dsc3246.jpg",
    ],
  },
  {
    slug: "esvb-2023",
    status: "past",
    acronym: "ESVB 2023",
    year: "2023",
    dates: { fr: "2023", en: "2023" },
    city: { fr: "Strasbourg, France", en: "Strasbourg, France" },
    title: {
      fr: "ESVB 2023 : édition précédente",
      en: "ESVB 2023: previous edition",
    },
    summary: {
      fr: "L'édition 2023 de la série biennale de congrès sur les biomatériaux cardiovasculaires.",
      en: "The 2023 edition of the biennial congress series on cardiovascular biomaterials.",
    },
    intro: {
      fr: "L'ESVB 2023 s'inscrit dans la série biennale organisée par Gepromed depuis 2001. Les archives et actes de cette édition sont disponibles sur demande.",
      en: "ESVB 2023 is part of the biennial series organized by Gepromed since 2001. Archives and proceedings for this edition are available on request.",
    },
    program: [
      {
        when: { fr: "Jour 1", en: "Day 1" },
        title: { fr: "Bootcamp vasculaire", en: "Vascular Bootcamp" },
        body: {
          fr: "Ateliers pratiques sur les procédures endovasculaires, encadrés par le réseau de superviseurs Gepromed.",
          en: "Hands-on workshops on endovascular procedures, led by the Gepromed network of supervisors.",
        },
      },
      {
        when: { fr: "Jour 2 et 3", en: "Days 2 and 3" },
        title: { fr: "Symposium ESVB", en: "ESVB Symposium" },
        body: {
          fr: "Sessions scientifiques consacrées aux biomatériaux cardiovasculaires et aux explants.",
          en: "Scientific sessions dedicated to cardiovascular biomaterials and explant analysis.",
        },
      },
    ],
    photos: [
      "/photos/workshop-dsc0104.jpg",
      "/photos/workshop-img3049.jpg",
      "/photos/doctor-goggles.jpg",
    ],
    committee: [
      {
        name: "Pr. Nabil Chakfé",
        role: { fr: "Président du congrès", en: "Congress Chair" },
        affiliation: "Université de Strasbourg, GEPROVAS",
      },
      {
        name: "Dr. Frédéric Heim",
        role: { fr: "Comité scientifique", en: "Scientific Committee" },
        affiliation: "Université de Haute-Alsace, LPMT",
      },
      {
        name: "Pr. Anne Lejay",
        role: { fr: "Comité scientifique", en: "Scientific Committee" },
        affiliation: "Hôpitaux Universitaires de Strasbourg",
      },
    ],
  },
];

export function sortedCongresses(): Congress[] {
  const order: Record<CongressStatus, number> = { upcoming: 0, past: 1 };
  return [...CONGRESSES].sort((a, b) => {
    if (a.status !== b.status) return order[a.status] - order[b.status];
    return a.year < b.year ? 1 : -1;
  });
}

export function getCongressBySlug(slug: string): Congress | undefined {
  return CONGRESSES.find((c) => c.slug === slug);
}
