import type { L } from "./i18n";

/* History: grounded in the real Gepromed homepage copy.
   work initiated 1993, 2020 expansion across specialties (Profs Bourcier,
   Ehlinger, Liverneaux, Proust, Cebula, Romain), 2022 GEPROVAS → Gepromed. */
export const HISTORY: { year: string; title: L; body: L }[] = [
  {
    year: "1993",
    title: { fr: "Les origines : GEPROVAS", en: "The origins: GEPROVAS" },
    body: {
      fr: "Le travail initié en 1993 autour de l'analyse des explants vasculaires pose les fondations d'une expertise unique en sécurité des dispositifs médicaux à Strasbourg.",
      en: "The work initiated in 1993 around vascular explant analysis lays the foundations of a unique expertise in medical-device safety in Strasbourg.",
    },
  },
  {
    year: "2018",
    title: { fr: "Montée en puissance de la formation", en: "Scaling up training" },
    body: {
      fr: "La formation des professionnels de santé s'industrialise : plus de 1 150 praticiens formés depuis 2018 sur des plateaux techniques dédiés.",
      en: "Training of healthcare professionals scales up: more than 1,150 practitioners trained since 2018 on dedicated technical platforms.",
    },
  },
  {
    year: "2020",
    title: { fr: "Élargissement aux spécialités", en: "Expansion across specialties" },
    body: {
      fr: "Des activités de formation, de R&D et d'analyse d'explants sont organisées avec les équipes d'ophtalmologie, d'orthopédie, de chirurgie de la main, de neurochirurgie, digestive, urologique et gynécologique (Prs Bourcier, Ehlinger, Liverneaux, Proust, Cebula, Romain).",
      en: "Training, R&D and explant-analysis activities are organized with the ophthalmology, orthopedics, hand surgery, neurosurgery, digestive, urological and gynecological teams (Profs Bourcier, Ehlinger, Liverneaux, Proust, Cebula, Romain).",
    },
  },
  {
    year: "2022",
    title: { fr: "GEPROVAS devient Gepromed", en: "GEPROVAS becomes Gepromed" },
    body: {
      fr: "Le nouveau nom Gepromed affirme un lien fort avec l'histoire, donne de la visibilité aux dispositifs médicaux et structure l'identité autour des quatre niveaux du cycle de l'implant.",
      en: "The new name Gepromed asserts a strong link with history, gives visibility to medical devices and structures the identity around the four levels of the implant cycle.",
    },
  },
  {
    year: "2026",
    title: { fr: "Cap sur l'Europe", en: "Heading for Europe" },
    body: {
      fr: "Soutenu par les collectivités locales et des fonds européens, Gepromed déploie son modèle de formation supervisée de Strasbourg vers toute l'Europe.",
      en: "Supported by local authorities and European funds, Gepromed extends its supervised-training model from Strasbourg across Europe.",
    },
  },
];

/* Surgical safety: Gepromed's three complementary platforms forming a single
   "boucle de sécurité" (safety loop). Each platform is also a doorway for one
   real audience. `audience` labels the visitor; `href` routes them. The explant
   analysis platform is the safety-critical entry point and is marked in the
   safety orange in the signature dial. */
export const IMPLANT_CYCLE: {
  n: string;
  title: L;
  body: L;
  audience: L;
  href: string;
  safety?: boolean;
}[] = [
  {
    n: "01",
    title: { fr: "Analyse des explants", en: "Explant Analysis" },
    audience: {
      fr: "Chercheurs, autorités de santé, fabricants",
      en: "Researchers, health authorities, manufacturers",
    },
    href: "/about/publications",
    safety: true,
    body: {
      fr: "Un dispositif explanté est une preuve. Depuis sa création, Gepromed a analysé plus de 1 800 dispositifs médicaux implantables explantés selon des protocoles standardisés, nourrissant près de 290 publications scientifiques. Ces données objectives améliorent la conception des futurs dispositifs et construisent une base de connaissance indépendante.",
      en: "An explanted device is evidence. Since its creation, Gepromed has analyzed more than 1,800 explanted implantable medical devices using standardized protocols, feeding nearly 290 scientific publications. This objective data improves the design of future devices and builds an independent knowledge base.",
    },
  },
  {
    n: "02",
    title: {
      fr: "Parc technologique d'essais (ISO 13485)",
      en: "Testing Technology Park (ISO 13485)",
    },
    audience: { fr: "Industriels & fabricants", en: "Industry & manufacturers" },
    href: "/engineering",
    body: {
      fr: "Avant qu'un dispositif n'atteigne un bloc opératoire, il doit prouver sa sécurité. Gepromed met à disposition des fabricants un parc de bancs d'essais mécaniques et hydrauliques (traction, fatigue, perméabilité, compliance), opéré sous certification ISO 13485, pour constituer les dossiers de marquage CE. Résultats indépendants et reproductibles.",
      en: "Before a device reaches an operating room, it must prove its safety. Gepromed provides manufacturers with a park of mechanical and hydraulic test benches (tensile, fatigue, permeability, compliance), operated under ISO 13485 certification, to build CE-marking files. Independent and reproducible results.",
    },
  },
  {
    n: "03",
    title: {
      fr: "Éducation par simulation & jumeau numérique",
      en: "Simulation & Digital-Twin Education",
    },
    audience: {
      fr: "Chirurgiens, internes, IBODE, ingénieurs biomédicaux",
      en: "Surgeons, residents, OR nurses, biomedical engineers",
    },
    href: "/trainings",
    body: {
      fr: "Plus de 1 800 professionnels de santé formés depuis 2018 sur un large parc de simulateurs et deux blocs opératoires connectés, avec un taux de satisfaction supérieur à 95 %. Gepromed développe un jumeau numérique chirurgical pour objectiver la performance technique et détecter les situations à risque. Objectif : former et certifier plus de 4 000 professionnels d'ici 2030.",
      en: "More than 1,800 healthcare professionals trained since 2018 on a broad park of simulators and two connected operating rooms, with a satisfaction rate above 95%. Gepromed is developing a surgical digital twin to objectify technical performance and detect at-risk situations. Goal: train and certify more than 4,000 professionals by 2030.",
    },
  },
];

export const FAQ: { q: L; a: L }[] = [
  {
    q: { fr: "À qui s'adressent les formations Gepromed ?", en: "Who are Gepromed trainings for?" },
    a: {
      fr: "Aux internes, chefs de clinique, praticiens hospitaliers et chirurgiens séniors souhaitant acquérir ou perfectionner un geste en chirurgie vasculaire, endovasculaire ou ophtalmologique.",
      en: "Residents, fellows, hospital practitioners and senior surgeons who want to acquire or refine a gesture in vascular, endovascular or ophthalmic surgery.",
    },
  },
  {
    q: { fr: "Les formations sont-elles certifiées Qualiopi ?", en: "Are the trainings Qualiopi certified?" },
    a: {
      fr: "Oui. Gepromed est certifié Qualiopi. Pour chaque session, les indicateurs de satisfaction, les taux de réussite et les preuves de formation sont documentés et publiés.",
      en: "Yes. Gepromed is Qualiopi certified. For every session, satisfaction indicators, pass rates and training evidence are documented and published.",
    },
  },
  {
    q: { fr: "Comment fonctionne l'inscription ?", en: "How does registration work?" },
    a: {
      fr: "Vous envoyez une demande sans engagement : elle est enregistrée comme lead. La place est confirmée après versement de l'acompte puis signature du contrat de formation. Vous gardez la visibilité sur chaque étape.",
      en: "You submit a no-commitment request: it is saved as a lead. The seat is confirmed after the deposit is paid and the training contract is signed. You keep visibility at each step.",
    },
  },
  {
    q: { fr: "Un certificat est-il délivré ?", en: "Is a certificate issued?" },
    a: {
      fr: "Oui, un certificat de réalisation est délivré à l'issue de chaque formation validée, conformément aux exigences Qualiopi.",
      en: "Yes, a certificate of completion is issued at the end of every validated training, in line with Qualiopi requirements.",
    },
  },
  {
    q: { fr: "La logistique (repas, hébergement) est-elle prise en charge ?", en: "Is logistics (meals, accommodation) handled?" },
    a: {
      fr: "Les repas et le programme sont organisés par Gepromed. Vos contraintes alimentaires, votre arrivée et un éventuel besoin d'hébergement sont collectés au moment de l'inscription afin de tout préparer en amont.",
      en: "Meals and the program are organized by Gepromed. Your dietary constraints, arrival and any accommodation need are collected at registration so everything is prepared in advance.",
    },
  },
  {
    q: { fr: "Proposez-vous des sessions sur-mesure pour un établissement ?", en: "Do you offer tailor-made sessions for an institution?" },
    a: {
      fr: "Oui. Nous concevons des sessions dédiées pour les hôpitaux, cliniques et industriels, en français ou ouvertes à un public européen. Contactez-nous pour définir le projet pédagogique.",
      en: "Yes. We design dedicated sessions for hospitals, clinics and industry, in French or open to a European audience. Contact us to define the educational project.",
    },
  },
  {
    q: { fr: "Quelle est la politique d'annulation ?", en: "What is the cancellation policy?" },
    a: {
      fr: "Tant que l'acompte n'est pas versé, la demande reste un lead sans engagement. Les conditions d'annulation après confirmation sont précisées dans le contrat de formation.",
      en: "Until the deposit is paid, the request remains a no-commitment lead. Cancellation terms after confirmation are set out in the training contract.",
    },
  },
];

// DEMO_DATA: placeholder practitioner testimonials for the design pass. Replace
// with real, attributed quotes once the client approves.
export const TESTIMONIALS: { quote: L; name: string; role: L }[] = [
  {
    quote: {
      fr: "Un format dense et concret : j'ai pratiqué des gestes que je n'aurais jamais osé tenter en bloc sans cette préparation.",
      en: "A dense, hands-on format: I practiced gestures I would never have dared attempt in the OR without this preparation.",
    },
    name: "Dr. Camille R.",
    role: { fr: "Chirurgien vasculaire, CHU", en: "Vascular surgeon, University Hospital" },
  },
  {
    quote: {
      fr: "L'encadrement par les superviseurs fait toute la différence. Le débriefing vidéo est redoutablement efficace.",
      en: "Guidance from the supervisors makes all the difference. The video debrief is remarkably effective.",
    },
    name: "Dr. Liam S.",
    role: { fr: "Fellow, ophtalmologie", en: "Fellow, ophthalmology" },
  },
  {
    quote: {
      fr: "Organisation impeccable, du programme aux repas. On se concentre uniquement sur l'apprentissage.",
      en: "Flawless organization, from the program to the meals. You focus only on learning.",
    },
    name: "Pr. M. Costa",
    role: { fr: "Superviseur réseau Gepromed", en: "Gepromed network supervisor" },
  },
];

// Public funders that support Gepromed (only these four). Logos live under
// /public/brand/funders and are rendered greyscale on the light home strip.
export const PARTNERS: { name: string; logo: string }[] = [
  { name: "Eurométropole de Strasbourg", logo: "/brand/funders/eurometropole-strasbourg.svg" },
  { name: "Collectivité européenne d'Alsace", logo: "/brand/funders/collectivite-europeenne-alsace.svg" },
  { name: "Région Grand Est", logo: "/brand/funders/region-grand-est.svg" },
  { name: "Université de Strasbourg", logo: "/brand/funders/universite-de-strasbourg.svg" },
];
