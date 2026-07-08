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
    slug: "isvb-2026",
    status: "upcoming",
    acronym: "ISVB 2026",
    year: "2026",
    dates: { fr: "12 au 14 mars 2026", en: "12 to 14 March 2026" },
    city: { fr: "Strasbourg, France", en: "Strasbourg, France" },
    venue: {
      fr: "Palais de la Musique et des Congrès (PMC)",
      en: "Palais de la Musique et des Congrès (PMC)",
    },
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
    welcome: {
      fr: "Au nom de Gepromed et du comité d'organisation, nous avons le plaisir de vous convier à l'ISVB 2026, à Strasbourg. Fidèle à l'esprit de la série ESVB engagée depuis 2001, cette édition réunira cliniciens, chercheurs, ingénieurs et industriels autour d'un objectif commun : rendre les dispositifs cardiovasculaires plus sûrs, du banc d'essai au bloc opératoire. Nous vous attendons nombreux au cœur de l'Europe institutionnelle.",
      en: "On behalf of Gepromed and the organizing committee, we are delighted to invite you to ISVB 2026 in Strasbourg. True to the spirit of the ESVB series running since 2001, this edition will bring together clinicians, researchers, engineers and industry around a shared goal: making cardiovascular devices safer, from the test bench to the operating room. We look forward to welcoming you at the heart of institutional Europe.",
    },
    location: {
      venue: {
        fr: "Palais de la Musique et des Congrès (PMC)",
        en: "Palais de la Musique et des Congrès (PMC)",
      },
      address: {
        fr: "Place de Bordeaux, 67000 Strasbourg, France",
        en: "Place de Bordeaux, 67000 Strasbourg, France",
      },
      access: {
        fr: "À 10 minutes de la gare de Strasbourg en tramway (lignes B et E, arrêt Wacken). L'aéroport de Strasbourg-Entzheim est relié au centre-ville en 20 minutes par navette ferroviaire.",
        en: "10 minutes from Strasbourg station by tram (lines B and E, Wacken stop). Strasbourg-Entzheim airport connects to the city center in 20 minutes via rail shuttle.",
      },
    },
    eventTypes: [
      {
        title: { fr: "Bootcamp vasculaire", en: "Vascular Bootcamp" },
        body: {
          fr: "Deux jours de pratique intensive sur simulateurs et modèles ex vivo, dédiés aux procédures endovasculaires périphériques et aortiques.",
          en: "Two days of intensive hands-on practice on simulators and ex vivo models, dedicated to peripheral and aortic endovascular procedures.",
        },
      },
      {
        title: { fr: "Symposium ISVB", en: "ISVB Symposium" },
        body: {
          fr: "Le congrès principal : conférences plénières, sessions thématiques et communications libres sur les biomatériaux cardiovasculaires.",
          en: "The main congress: plenary lectures, thematic sessions and free communications on cardiovascular biomaterials.",
        },
      },
      {
        title: {
          fr: "Translational Research Meeting",
          en: "Translational Research Meeting",
        },
        body: {
          fr: "Une session translationnelle avec Prix du Jeune Chercheur, pour rapprocher la paillasse de la pratique clinique.",
          en: "A translational session with a Young Researcher Prize, bridging the bench and clinical practice.",
        },
      },
    ],
    program: [
      {
        when: { fr: "12 mars", en: "12 March" },
        title: { fr: "Jour 1 — Bootcamp vasculaire", en: "Day 1 — Vascular Bootcamp" },
        body: {
          fr: "Ateliers pratiques sur les procédures endovasculaires périphériques, encadrés par des superviseurs experts. Sessions du matin et de l'après-midi.",
          en: "Hands-on workshops on peripheral endovascular procedures, led by expert supervisors. Morning and afternoon sessions.",
        },
      },
      {
        when: { fr: "13 mars", en: "13 March" },
        title: { fr: "Jour 2 — Symposium ISVB", en: "Day 2 — ISVB Symposium" },
        body: {
          fr: "Conférences plénières sur les biomatériaux cardiovasculaires, sessions thématiques et communications libres. Dîner de gala en soirée.",
          en: "Plenary lectures on cardiovascular biomaterials, thematic sessions and free communications. Gala dinner in the evening.",
        },
      },
      {
        when: { fr: "14 mars", en: "14 March" },
        title: {
          fr: "Jour 3 — Translational Research Meeting",
          en: "Day 3 — Translational Research Meeting",
        },
        body: {
          fr: "Session commune avec l'ESVS, remise du Prix du Jeune Chercheur et table ronde de clôture avec les partenaires industriels.",
          en: "Joint session with the ESVS, Young Researcher Prize ceremony and closing round table with industry partners.",
        },
      },
    ],
    programPdfUrl: undefined,
    committee: [
      {
        name: "Pr. Nabil Chakfé",
        role: { fr: "Président du congrès", en: "Congress Chair" },
        affiliation: "Université de Strasbourg, GEPROVAS",
      },
      {
        name: "Dr. Frédéric Heim",
        role: { fr: "Coordination scientifique", en: "Scientific Coordination" },
        affiliation: "Université de Haute-Alsace, LPMT",
      },
      {
        name: "Pr. Anne Lejay",
        role: { fr: "Comité scientifique", en: "Scientific Committee" },
        affiliation: "Hôpitaux Universitaires de Strasbourg",
      },
      {
        name: "Dr. Salomé Kuntz",
        role: { fr: "Recherche translationnelle", en: "Translational Research" },
        affiliation: "GEPROVAS, Strasbourg",
      },
    ],
    registration: {
      info: {
        fr: "Les inscriptions ouvriront à l'automne 2025. Tarifs préférentiels pour les membres, internes et étudiants. L'inscription inclut l'accès à toutes les sessions, les pauses et le déjeuner.",
        en: "Registration will open in autumn 2025. Preferential rates for members, residents and students. Registration includes access to all sessions, coffee breaks and lunch.",
      },
      method: {
        fr: "Inscription en ligne via le portail Gepromed, avec paiement sécurisé par carte ou virement. Une confirmation et une facture vous seront adressées par e-mail.",
        en: "Online registration via the Gepromed portal, with secure payment by card or bank transfer. A confirmation and invoice will be sent to you by email.",
      },
      url: "/contact",
    },
    sponsors: [
      { name: "GEPROVAS" },
      { name: "Université de Strasbourg" },
      { name: "Université de Haute-Alsace" },
      { name: "European Society for Vascular Surgery (ESVS)" },
      { name: "Eurométropole de Strasbourg" },
    ],
    accommodation: [
      {
        name: { fr: "Hilton Strasbourg", en: "Hilton Strasbourg" },
        note: {
          fr: "À 5 minutes à pied du PMC. Tarif négocié pour les congressistes.",
          en: "A 5-minute walk from the PMC. Negotiated rate for congress attendees.",
        },
      },
      {
        name: { fr: "Novotel Strasbourg Centre Halles", en: "Novotel Strasbourg Centre Halles" },
        note: {
          fr: "Proche de la gare et du centre-ville, accès direct en tramway.",
          en: "Near the station and city center, with direct tram access.",
        },
      },
      {
        name: { fr: "Maison Rouge Strasbourg, Autograph Collection", en: "Maison Rouge Strasbourg, Autograph Collection" },
        note: {
          fr: "Hôtel de charme au cœur de la Grande-Île classée à l'UNESCO.",
          en: "A charming hotel in the heart of the UNESCO-listed Grande-Île.",
        },
      },
    ],
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
    ebookUrl: "/downloads/esvb-2025-ebook.pdf",
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
