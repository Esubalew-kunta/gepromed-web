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
};

export const CONGRESSES: Congress[] = [
  {
    slug: "isvb-2026",
    status: "upcoming",
    acronym: "ISVB 2026",
    year: "2026",
    dates: { fr: "Dates à confirmer", en: "Dates to be confirmed" },
    city: { fr: "Strasbourg, France", en: "Strasbourg, France" },
    featured: true,
    title: {
      fr: "ISVB 2026 : prochaine édition du congrès de biologie vasculaire",
      en: "ISVB 2026: the next vascular biology congress",
    },
    summary: {
      fr: "La prochaine édition de la série biennale organisée par Gepromed. Programme et informations pratiques en préparation.",
      en: "The next edition of the biennial series organized by Gepromed. Program and practical information in preparation.",
    },
    intro: {
      fr: "Dans la continuité de l'ESVB, l'édition 2026 poursuivra le rapprochement entre recherche sur les biomatériaux, pratique chirurgicale et industrie. Les informations pratiques (dates, lieu, inscription, appel à communications) seront publiées ici et relayées dans les Actualités.",
      en: "Continuing the ESVB series, the 2026 edition will keep bringing together biomaterials research, surgical practice and industry. Practical information (dates, venue, registration, call for abstracts) will be published here and relayed in the News section.",
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
          fr: "Deux jours de pratique sur les procédures endovasculaires périphériques et aortiques, pour l'amélioration des dispositifs chirurgicaux.",
          en: "Two days of practice on peripheral and aortic endovascular procedures, for surgical device improvement.",
        },
      },
      {
        when: { fr: "15 mai", en: "15 May" },
        title: {
          fr: "Translational Research Meeting",
          en: "Translational Research Meeting",
        },
        body: {
          fr: "Session commune avec l'ESVS, avec un Prix du Jeune Chercheur pour valoriser les talents scientifiques émergents.",
          en: "A joint session with the ESVS, featuring a Young Researcher Prize to promote emerging scientific talent.",
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
