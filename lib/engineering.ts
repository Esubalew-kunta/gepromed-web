import type { L } from "@/lib/i18n";

export type EngineeringCategory = "explant" | "testing" | "rental";

export type EngineeringItem = {
  id: string;
  category: EngineeringCategory;
  /** short label shown on the gradient header (e.g. lead time, standard) */
  tag: L;
  title: L;
  summary: L;
  /** long-form description paragraphs shown in the detail drawer */
  description: L[];
  /** bullet highlights (deliverables, methods, standards) */
  highlights: L[];
};

// ── Band 1 · Explant Analysis ──────────────────────────────────────────────
export const EXPLANT_ITEMS: EngineeringItem[] = [
  {
    id: "analyze-my-explant",
    category: "explant",
    tag: { fr: "Analyse d'explant", en: "Explant analysis" },
    title: {
      fr: "Je souhaite faire analyser mon explant",
      en: "I want my explant analyzed",
    },
    summary: {
      fr: "Analyse complète d'un dispositif explanté : caractérisation des défaillances, corrosion, dégradation et retour d'expérience clinique.",
      en: "Full analysis of an explanted device: failure characterization, corrosion, degradation and clinical feedback.",
    },
    description: [
      {
        fr: "Notre plateau d'analyse des explants examine les dispositifs médicaux retirés afin de comprendre leurs mécanismes de défaillance et d'orienter l'amélioration des futures générations d'implants.",
        en: "Our explant analysis platform examines retrieved medical devices to understand their failure mechanisms and to guide the improvement of future implant generations.",
      },
      {
        fr: "Chaque explant est reçu, tracé et documenté selon un protocole conforme aux exigences de matériovigilance. Le rapport final réunit imagerie, caractérisation des matériaux et interprétation clinique.",
        en: "Each explant is received, traced and documented under a protocol aligned with post-market surveillance requirements. The final report brings together imaging, material characterization and clinical interpretation.",
      },
    ],
    highlights: [
      { fr: "Microscopie électronique à balayage (MEB)", en: "Scanning electron microscopy (SEM)" },
      { fr: "Analyse de la corrosion et des dépôts", en: "Corrosion and deposit analysis" },
      { fr: "Micro-tomographie (micro-CT)", en: "Micro-computed tomography (micro-CT)" },
      { fr: "Rapport d'expertise avec interprétation clinique", en: "Expert report with clinical interpretation" },
    ],
  },
  {
    id: "analyze-another-sample",
    category: "explant",
    tag: { fr: "Échantillon", en: "Sample" },
    title: {
      fr: "Je souhaite faire analyser un autre échantillon",
      en: "I want another sample analyzed",
    },
    summary: {
      fr: "Caractérisation de biomatériaux, tissus, prototypes ou échantillons de recherche hors dispositif explanté.",
      en: "Characterization of biomaterials, tissues, prototypes or research samples beyond explanted devices.",
    },
    description: [
      {
        fr: "Au-delà des explants, nous analysons une large gamme d'échantillons : biomatériaux, revêtements, prototypes industriels et éprouvettes de recherche.",
        en: "Beyond explants, we analyze a broad range of samples: biomaterials, coatings, industrial prototypes and research specimens.",
      },
      {
        fr: "Nous définissons avec vous le plan d'analyse le plus adapté à votre problématique, du simple contrôle morphologique à la caractérisation physico-chimique complète.",
        en: "We define with you the most suitable analysis plan for your question, from simple morphological inspection to complete physico-chemical characterization.",
      },
    ],
    highlights: [
      { fr: "Caractérisation morphologique et dimensionnelle", en: "Morphological and dimensional characterization" },
      { fr: "Analyse physico-chimique de surface", en: "Physico-chemical surface analysis" },
      { fr: "Plan d'analyse sur-mesure", en: "Tailor-made analysis plan" },
      { fr: "Confidentialité et traçabilité garanties", en: "Guaranteed confidentiality and traceability" },
    ],
  },
];

// ── Band 2 · Testing platform ──────────────────────────────────────────────
export const TESTING_ITEMS: EngineeringItem[] = [
  {
    id: "mechanical-testing",
    category: "testing",
    tag: { fr: "ISO 7198", en: "ISO 7198" },
    title: {
      fr: "Essais mécaniques (traction / fatigue)",
      en: "Mechanical testing (tensile / fatigue)",
    },
    summary: {
      fr: "Essais de traction, de fatigue et de résistance sur dispositifs implantables et biomatériaux, selon les normes en vigueur.",
      en: "Tensile, fatigue and strength testing on implantable devices and biomaterials, following applicable standards.",
    },
    description: [
      {
        fr: "Notre plateforme d'essais mécaniques évalue la tenue des dispositifs et matériaux dans des conditions représentatives de leur usage physiologique.",
        en: "Our mechanical testing platform evaluates the durability of devices and materials under conditions representative of their physiological use.",
      },
      {
        fr: "Les campagnes d'essais sont conçues pour répondre aux exigences des dossiers réglementaires et des normes ISO applicables aux dispositifs vasculaires.",
        en: "Test campaigns are designed to meet the requirements of regulatory files and ISO standards applicable to vascular devices.",
      },
    ],
    highlights: [
      { fr: "Essais de traction jusqu'à rupture", en: "Tensile testing to failure" },
      { fr: "Essais de fatigue en cycles accélérés", en: "Accelerated cyclic fatigue testing" },
      { fr: "Bancs instrumentés et acquisition de données", en: "Instrumented benches and data acquisition" },
      { fr: "Rapports conformes aux dossiers réglementaires", en: "Reports aligned with regulatory files" },
    ],
  },
  {
    id: "permeability-compliance",
    category: "testing",
    tag: { fr: "Hémodynamique", en: "Hemodynamics" },
    title: {
      fr: "Perméabilité & compliance",
      en: "Permeability & compliance",
    },
    summary: {
      fr: "Mesure de la perméabilité, de la compliance et du comportement hydraulique des prothèses et substituts vasculaires.",
      en: "Measurement of permeability, compliance and hydraulic behavior of vascular grafts and substitutes.",
    },
    description: [
      {
        fr: "Nous caractérisons le comportement hydraulique des prothèses vasculaires afin de vérifier leur adéquation avec les conditions physiologiques de flux et de pression.",
        en: "We characterize the hydraulic behavior of vascular grafts to verify their suitability with physiological flow and pressure conditions.",
      },
      {
        fr: "Les bancs de perfusion permettent de reproduire des régimes pulsatiles et de mesurer précisément la compliance radiale des dispositifs.",
        en: "The perfusion benches reproduce pulsatile regimes and precisely measure the radial compliance of devices.",
      },
    ],
    highlights: [
      { fr: "Mesure de perméabilité à l'eau et au sang", en: "Water and blood permeability measurement" },
      { fr: "Compliance radiale sous pression pulsée", en: "Radial compliance under pulsed pressure" },
      { fr: "Bancs de perfusion pulsatile", en: "Pulsatile perfusion benches" },
      { fr: "Corrélation avec les données cliniques", en: "Correlation with clinical data" },
    ],
  },
  {
    id: "imaging-microct",
    category: "testing",
    tag: { fr: "Imagerie", en: "Imaging" },
    title: {
      fr: "Imagerie & micro-tomographie",
      en: "Imaging & micro-tomography",
    },
    summary: {
      fr: "Inspection interne non destructive des dispositifs et assemblages par micro-tomographie haute résolution.",
      en: "Non-destructive internal inspection of devices and assemblies by high-resolution micro-tomography.",
    },
    description: [
      {
        fr: "La micro-tomographie permet de visualiser l'intérieur d'un dispositif sans le détruire : porosité, défauts d'assemblage, intégrité des soudures.",
        en: "Micro-tomography reveals the inside of a device without destroying it: porosity, assembly defects, weld integrity.",
      },
      {
        fr: "Les volumes 3D reconstruits servent au contrôle qualité, à la R&D et à l'analyse de défaillance.",
        en: "The reconstructed 3D volumes support quality control, R&D and failure analysis.",
      },
    ],
    highlights: [
      { fr: "Reconstruction 3D haute résolution", en: "High-resolution 3D reconstruction" },
      { fr: "Détection de porosités et défauts internes", en: "Detection of porosity and internal defects" },
      { fr: "Contrôle non destructif", en: "Non-destructive inspection" },
      { fr: "Export des volumes et rapports d'imagerie", en: "Volume export and imaging reports" },
    ],
  },
];

// ── Band 3 · Equipment Rental ──────────────────────────────────────────────
export const RENTAL_ITEMS: EngineeringItem[] = [
  {
    id: "rental-wet-lab",
    category: "rental",
    tag: { fr: "Plateau technique", en: "Technical platform" },
    title: {
      fr: "Wet-lab & plateau de simulation chirurgicale",
      en: "Wet-lab & surgical simulation platform",
    },
    summary: {
      fr: "Location de notre plateau de simulation chirurgicale haute-fidélité, équipé pour la chirurgie vasculaire et ophtalmologique.",
      en: "Rental of our high-fidelity surgical simulation platform, equipped for vascular and ophthalmic surgery.",
    },
    description: [
      {
        fr: "Notre wet-lab accueille vos sessions de formation, d'évaluation de dispositifs ou de recherche appliquée, avec un environnement conforme aux standards hospitaliers.",
        en: "Our wet-lab hosts your training sessions, device evaluation or applied research, in an environment aligned with hospital standards.",
      },
      {
        fr: "Le plateau est disponible à la journée ou pour des campagnes plus longues, avec ou sans accompagnement technique.",
        en: "The platform is available per day or for longer campaigns, with or without technical support.",
      },
    ],
    highlights: [
      { fr: "Postes de travail instrumentés", en: "Instrumented workstations" },
      { fr: "Éclairage et imagerie per-opératoire", en: "Intra-operative lighting and imaging" },
      { fr: "Accompagnement technique en option", en: "Optional technical support" },
      { fr: "Disponible à la journée ou à la semaine", en: "Available per day or per week" },
    ],
  },
  {
    id: "rental-pulsatile-bench",
    category: "rental",
    tag: { fr: "Banc d'essai", en: "Test bench" },
    title: {
      fr: "Banc de perfusion pulsatile",
      en: "Pulsatile perfusion bench",
    },
    summary: {
      fr: "Mise à disposition d'un banc de perfusion pulsatile pour vos essais hydrodynamiques sur dispositifs vasculaires.",
      en: "Access to a pulsatile perfusion bench for your hydrodynamic testing on vascular devices.",
    },
    description: [
      {
        fr: "Le banc reproduit des régimes de flux physiologiques et pathologiques, avec réglage fin de la fréquence, du débit et de la pression.",
        en: "The bench reproduces physiological and pathological flow regimes, with fine control of frequency, flow rate and pressure.",
      },
      {
        fr: "Idéal pour la R&D, la validation de prototypes et les démonstrations, il est loué avec sa métrologie et son support logiciel.",
        en: "Ideal for R&D, prototype validation and demonstrations, it is rented with its metrology and software support.",
      },
    ],
    highlights: [
      { fr: "Régimes pulsatiles paramétrables", en: "Configurable pulsatile regimes" },
      { fr: "Acquisition pression / débit synchronisée", en: "Synchronized pressure / flow acquisition" },
      { fr: "Métrologie et logiciel inclus", en: "Metrology and software included" },
      { fr: "Assistance à la mise en service", en: "Commissioning assistance" },
    ],
  },
  {
    id: "rental-microct-scanner",
    category: "rental",
    tag: { fr: "Équipement", en: "Equipment" },
    title: {
      fr: "Micro-tomographe (micro-CT)",
      en: "Micro-CT scanner",
    },
    summary: {
      fr: "Créneaux de mesure sur notre micro-tomographe haute résolution, avec ou sans opérateur.",
      en: "Measurement slots on our high-resolution micro-CT scanner, with or without an operator.",
    },
    description: [
      {
        fr: "Réservez des créneaux sur notre micro-tomographe pour l'inspection interne non destructive de vos échantillons et dispositifs.",
        en: "Book slots on our micro-CT scanner for non-destructive internal inspection of your samples and devices.",
      },
      {
        fr: "Un opérateur qualifié peut prendre en charge l'acquisition et la reconstruction, ou vous former à l'utilisation autonome.",
        en: "A qualified operator can handle acquisition and reconstruction, or train you for autonomous use.",
      },
    ],
    highlights: [
      { fr: "Créneaux à la demi-journée", en: "Half-day booking slots" },
      { fr: "Acquisition et reconstruction 3D", en: "3D acquisition and reconstruction" },
      { fr: "Opérateur qualifié en option", en: "Optional qualified operator" },
      { fr: "Export des données brutes", en: "Raw data export" },
    ],
  },
];
