import type { L } from "./i18n";

/* Frontend-only newsroom. Content is grounded in the real gepromed.com material
   (ESVB congress, HelpMeSee simulation training, peer-reviewed publications, the
   FEDER / EU project, the vascular bootcamp). No backend: add a post by adding an
   entry here. Bilingual FR/EN, no em dashes. Images are placeholders for now:
   real workshop photos where they fit, a branded blueprint panel otherwise. */

export type NewsCategoryKey = "congress" | "training" | "research" | "institution";

export const NEWS_CATEGORIES: Record<
  NewsCategoryKey,
  { label: L; safety?: boolean }
> = {
  congress: { label: { fr: "Congrès", en: "Congress" } },
  training: { label: { fr: "Formation", en: "Training" } },
  research: { label: { fr: "Recherche", en: "Research" } },
  institution: { label: { fr: "Institution", en: "Institution" } },
};

export type Block =
  | { type: "p"; text: L }
  | { type: "h"; text: L }
  | { type: "quote"; text: L; cite?: L }
  | { type: "list"; items: L[] };

export type NewsPost = {
  slug: string;
  category: NewsCategoryKey;
  date: string; // ISO yyyy-mm-dd
  readMins: number;
  title: L;
  excerpt: L;
  image?: string; // path under /public, optional
  featured?: boolean;
  body: Block[];
};

export const NEWS: NewsPost[] = [
  {
    slug: "esvb-2025-strasbourg",
    category: "congress",
    date: "2025-05-17",
    readMins: 4,
    featured: true,
    image: "/photos/workshop-img3049.jpg",
    title: {
      fr: "ESVB 2025 : la biologie vasculaire réunie à Strasbourg",
      en: "ESVB 2025: vascular biology convenes in Strasbourg",
    },
    excerpt: {
      fr: "Organisé par Gepromed tous les deux ans depuis 2001, le congrès ESVB a rassemblé cliniciens, chercheurs et industriels autour des biomatériaux cardiovasculaires, du 15 au 17 mai au Palais de la Musique et des Congrès.",
      en: "Organized by Gepromed every two years since 2001, the ESVB congress brought together clinicians, researchers and industry around cardiovascular biomaterials, from 15 to 17 May at the Palais de la Musique et des Congrès.",
    },
    body: [
      {
        type: "p",
        text: {
          fr: "Le congrès de l'European Society for Vascular Biology (ESVB) est le rendez-vous scientifique phare de Gepromed. Biennal depuis 2001, il place la recherche sur les biomatériaux cardiovasculaires au cœur de l'Europe institutionnelle, à Strasbourg.",
          en: "The European Society for Vascular Biology (ESVB) congress is Gepromed's flagship scientific event. Held every two years since 2001, it puts cardiovascular biomaterials research at the heart of institutional Europe, in Strasbourg.",
        },
      },
      {
        type: "h",
        text: { fr: "Trois temps forts", en: "Three parts" },
      },
      {
        type: "list",
        items: [
          {
            fr: "Bootcamp Vasculaire (14 et 15 mai) : deux jours de pratique sur les procédures endovasculaires périphériques et aortiques.",
            en: "Vascular Bootcamp (14 and 15 May): two days of practice on peripheral and aortic endovascular procedures.",
          },
          {
            fr: "Translational Research Meeting (15 mai) : session commune avec l'ESVS, avec le Prix du Jeune Chercheur.",
            en: "Translational Research Meeting (15 May): a joint session with the ESVS, featuring the Young Researcher Prize.",
          },
          {
            fr: "Symposium ESVB (16 et 17 mai) : le congrès principal consacré aux biomatériaux cardiovasculaires.",
            en: "ESVB Symposium (16 and 17 May): the main congress dedicated to cardiovascular biomaterials.",
          },
        ],
      },
      {
        type: "quote",
        text: {
          fr: "Rapprocher le banc d'essai, le bloc opératoire et la recherche clinique dans une même semaine : c'est tout le sens du cycle de l'implant.",
          en: "Bringing the test bench, the operating room and clinical research together in one week: that is the whole point of the implant cycle.",
        },
      },
      {
        type: "p",
        text: {
          fr: "La prochaine édition, ISVB 2026, est en préparation. Les informations pratiques seront publiées ici et sur la page Congrès.",
          en: "The next edition, ISVB 2026, is in preparation. Practical information will be published here and on the Congresses page.",
        },
      },
    ],
  },
  {
    slug: "helpmesee-cataract-simulation",
    category: "training",
    date: "2025-04-10",
    readMins: 3,
    image: "/photos/workshop-dsc0059.jpg",
    title: {
      fr: "Chirurgie de la cataracte : la simulation HelpMeSee au Centre eXplora",
      en: "Cataract surgery: HelpMeSee simulation at the eXplora Center",
    },
    excerpt: {
      fr: "Chaque semaine, le Centre d'Éducation eXplora accueille des internes, fellows et chirurgiens séniors pour s'entraîner sur le simulateur de chirurgie oculaire HelpMeSee, un outil de réalité virtuelle haute-fidélité.",
      en: "Every week the eXplora Education Center welcomes residents, fellows and senior surgeons to train on the HelpMeSee eye surgery simulator, a high-fidelity virtual reality tool.",
    },
    body: [
      {
        type: "p",
        text: {
          fr: "Le programme HelpMeSee, opéré par Gepromed, propose des cours encadrés par des mentors certifiés, avec des procédures et complications standardisées dans un environnement contrôlé qui reproduit la chirurgie réelle.",
          en: "The HelpMeSee program, run by Gepromed, offers instructor-led courses with standardized procedures and complications in a controlled environment that mirrors real surgery, guided by certified mentors.",
        },
      },
      {
        type: "h",
        text: { fr: "Ce que l'on y pratique", en: "What trainees practice" },
      },
      {
        type: "list",
        items: [
          {
            fr: "Cours MSICS (petite incision manuelle) : plus de 24 heures de pratique sur simulateur, complétées par un eBook interactif.",
            en: "MSICS (manual small incision) course: over 24 hours of simulator practice, supplemented by an interactive eBook.",
          },
          {
            fr: "Cours de phacoémulsification sur 5 jours : de l'incision cornéenne à la pose de l'implant et la fermeture.",
            en: "5-day phacoemulsification course: from corneal incision to lens implantation and wound closure.",
          },
          {
            fr: "Techniques complémentaires : vitrectomie, sutures du tunnel scléral, gestion des complications.",
            en: "Complementary techniques: vitrectomy, scleral tunnel suturing, complications management.",
          },
        ],
      },
      {
        type: "p",
        text: {
          fr: "L'évaluation est objective et mesurable : chaque geste est noté, ce qui permet de suivre la progression du praticien, novice ou expérimenté.",
          en: "Assessment is objective and measurable: each gesture is scored, which lets both novice and experienced surgeons track their progression.",
        },
      },
    ],
  },
  {
    slug: "vr-simulator-publications-2024",
    category: "research",
    date: "2024-10-28",
    readMins: 3,
    image: "/photos/workshop-dsc0104.jpg",
    title: {
      fr: "Deux publications sur la simulation en chirurgie de la cataracte",
      en: "Two publications on simulation in cataract surgery",
    },
    excerpt: {
      fr: "Nos travaux sur la validité d'un simulateur de réalité virtuelle pour la phacoémulsification et sur l'évaluation des compétences non techniques ont été publiés dans des revues à comité de lecture.",
      en: "Our work on the validity of a virtual reality simulator for phacoemulsification and on the assessment of non-technical skills has been published in peer-reviewed journals.",
    },
    body: [
      {
        type: "p",
        text: {
          fr: "La recherche clinique nourrit directement la formation chez Gepromed. Deux publications récentes documentent la valeur pédagogique de la simulation en chirurgie oculaire.",
          en: "Clinical research feeds training directly at Gepromed. Two recent publications document the educational value of simulation in eye surgery.",
        },
      },
      {
        type: "list",
        items: [
          {
            fr: "Validity evidence of a new virtual reality simulator for phacoemulsification training in cataract surgery (PubMed, 2024).",
            en: "Validity evidence of a new virtual reality simulator for phacoemulsification training in cataract surgery (PubMed, 2024).",
          },
          {
            fr: "Virtual reality simulator-based assessment of non-technical skills in eye surgery (BMC Medical Education, 2026).",
            en: "Virtual reality simulator-based assessment of non-technical skills in eye surgery (BMC Medical Education, 2026).",
          },
        ],
      },
      {
        type: "p",
        text: {
          fr: "La liste des publications clés est disponible sur la page Publications de la section À propos.",
          en: "The list of key publications is available on the Publications page in the About section.",
        },
      },
    ],
  },
  {
    slug: "feder-imaging-ai-project",
    category: "institution",
    date: "2023-09-07",
    readMins: 3,
    title: {
      fr: "Un projet européen pour l'imagerie et l'IA des dispositifs implantables",
      en: "A European project for imaging and AI of implantable devices",
    },
    excerpt: {
      fr: "Gepromed pilote un projet soutenu par l'Union européenne via le FEDER : imagerie et suivi des dispositifs médicaux implantables et intelligence artificielle, pour un coût total de 7,1 millions d'euros.",
      en: "Gepromed leads a project supported by the European Union through the ERDF: imaging and monitoring of implantable medical devices and artificial intelligence, for a total cost of 7.1 million euros.",
    },
    body: [
      {
        type: "p",
        text: {
          fr: "Le projet Imaging and Monitoring of Implantable Medical Devices and Artificial Intelligence structure l'ambition de Gepromed : rendre les dispositifs implantables plus sûrs grâce à l'imagerie avancée et à l'analyse de données.",
          en: "The project Imaging and Monitoring of Implantable Medical Devices and Artificial Intelligence structures Gepromed's ambition: making implantable devices safer through advanced imaging and data analysis.",
        },
      },
      {
        type: "list",
        items: [
          {
            fr: "Union européenne (FEDER) : 4 013 741,02 EUR, soit 56,56 pour cent du projet.",
            en: "European Union (ERDF): 4,013,741.02 EUR, that is 56.56 percent of the project.",
          },
          {
            fr: "Coût total du projet : 7 096 430,37 EUR.",
            en: "Total project cost: 7,096,430.37 EUR.",
          },
          {
            fr: "Période : 7 septembre 2023 au 31 décembre 2027.",
            en: "Period: 7 September 2023 to 31 December 2027.",
          },
        ],
      },
      {
        type: "p",
        text: {
          fr: "Le projet est également soutenu par la Région Grand Est, l'Eurométropole de Strasbourg et la Collectivité européenne d'Alsace.",
          en: "The project is also supported by the Grand Est Region, the Eurométropole de Strasbourg and the European Collectivity of Alsace.",
        },
      },
    ],
  },
  {
    slug: "vascular-bootcamp-2026",
    category: "training",
    date: "2026-03-20",
    readMins: 2,
    image: "/photos/workshop-dsc0104.jpg",
    title: {
      fr: "Bootcamp Vasculaire : immersion sur les procédures endovasculaires",
      en: "Vascular Bootcamp: immersion in endovascular procedures",
    },
    excerpt: {
      fr: "Le Bootcamp Vasculaire reste l'un des formats les plus demandés : deux à trois jours d'immersion sur les abords périphériques et aortiques, encadrés par des superviseurs experts.",
      en: "The Vascular Bootcamp remains one of the most requested formats: two to three days of immersion in peripheral and aortic approaches, led by expert supervisors.",
    },
    body: [
      {
        type: "p",
        text: {
          fr: "Pensé pour les internes, chefs de clinique et praticiens, le bootcamp combine plateaux techniques haute-fidélité, débriefing vidéo et encadrement rapproché. L'objectif : pratiquer des gestes rarement accessibles hors du bloc.",
          en: "Designed for residents, fellows and practitioners, the bootcamp combines high-fidelity technical platforms, video debrief and close guidance. The goal: to practice gestures rarely accessible outside the operating room.",
        },
      },
      {
        type: "p",
        text: {
          fr: "Les sessions sont à effectifs limités. Consultez le catalogue des formations pour les prochaines dates et réservez sans engagement.",
          en: "Sessions have limited capacity. See the training catalogue for upcoming dates and book with no commitment.",
        },
      },
    ],
  },
];

export function sortedNews(): NewsPost[] {
  return [...NEWS].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getNewsBySlug(slug: string): NewsPost | undefined {
  return NEWS.find((n) => n.slug === slug);
}
