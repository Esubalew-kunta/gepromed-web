import type { L } from "@/lib/i18n";

export type EngineeringCategory = "explant" | "testing" | "rental";

export type EngineeringItem = {
  id: string;
  category: EngineeringCategory;
  image?: string;
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
        fr: "Notre objectif n'est pas d'évaluer des cas de matériovigilance, mais d'offrir un service unique d'étude et de catégorisation des défauts pouvant survenir sur les implants vasculaires ou d'autres spécialités chirurgicales. Tous les dispositifs explantés (compliqués ou non) sont analysés dans le cadre d'un réseau européen de chirurgiens vasculaires.",
        en: "Our goal is not to assess vigilance cases, but to offer a unique service that studies and categorizes the defects that can arise on vascular implants and other surgical specialties. Every explanted device (complicated or not) is analyzed within a European network of vascular surgeons.",
      },
      {
        fr: "Au fil des années, nous avons constitué la plus grande base de données d'explants vasculaires au monde. Depuis le 6 décembre 2012, notre protocole d'analyse des explants est certifié ISO 9001. Chaque explant est référencé dès sa réception, analysé de façon macroscopique puis lavé ; sur demande, des analyses complémentaires (faxitron, histologie, macro et microscopie après lavage enzymatique) donnent lieu à un rapport détaillé.",
        en: "Over the years we have built the world's largest database of vascular explants. Since 6 December 2012 our explant analysis protocol is ISO 9001 certified. Each explant is logged on reception, analyzed macroscopically then cleaned; on request, complementary analyses (faxitron, histology, macro and microscopy after enzymatic cleaning) produce a detailed report.",
      },
      {
        fr: "Comment nous envoyer un explant : placez l'échantillon dans un flacon scellé contenant 10% de formol (environ 4% de formaldéhyde) avec la fiche de recueil de données, puis expédiez-le à Gepromed, Faculté de médecine - Bâtiment d'anesthésiologie, 4 rue Kirschleger, 67085 Strasbourg Cedex. Plus de kit de transport ? Écrivez-nous à explant@gepromed.com avec votre adresse postale professionnelle et nous vous enverrons flacons et fiches.",
        en: "How to send us an explant: place the sample in a sealed bottle containing 10% formalin (approx. 4% formaldehyde) with the data collection sheet, then ship it to Gepromed, Faculté de médecine - Bâtiment d'anesthésiologie, 4 rue Kirschleger, 67085 Strasbourg Cedex, France. Out of transport kits? Email explant@gepromed.com with your work postal address and we will send you bottles and collection sheets.",
      },
    ],
    highlights: [
      { fr: "Référencement et traçabilité dès la réception", en: "Logging and traceability on reception" },
      { fr: "Analyse macroscopique systématique", en: "Systematic macroscopic analysis" },
      { fr: "Faxitron, histologie, MEB et micro-CT sur demande", en: "Faxitron, histology, SEM and micro-CT on request" },
      { fr: "Protocole certifié ISO 9001 depuis 2012", en: "ISO 9001 certified protocol since 2012" },
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
        fr: "Créée en 2009 sur le site des Hôpitaux Universitaires de Strasbourg avec le LPMT de l'Université de Haute-Alsace, notre plateforme de tests est un environnement technique indépendant dédié à l'évaluation mécanique des dispositifs médicaux implantables et de leurs matériaux. Ces activités sont réalisées sous certification ISO 13485 et ISO 9001 depuis 2013.",
        en: "Created in 2009 at the Strasbourg University Hospitals with the LPMT of the University of Haute-Alsace, our testing platform is an independent technical environment dedicated to the mechanical evaluation of implantable medical devices and their materials. These activities are ISO 13485 and ISO 9001 certified since 2013.",
      },
      {
        fr: "Nous réalisons des essais standards, principalement sur les textiles et implants vasculaires (norme ISO 7198) ou sur les stents et endoprothèses (norme ISO 25539), ainsi que la conception de tests sur-mesure lorsque les performances recherchées ne figurent pas dans les normes existantes. Notre vocation est le conseil : identifier tôt les limites et les mécanismes de dégradation pour optimiser la fiabilité, y compris pour les start-ups.",
        en: "We run standard tests, mainly on vascular textiles and implants (ISO 7198) or on stents and endoprostheses (ISO 25539), plus the design of custom tests when the target performance is not covered by existing standards. Our vocation is advisory: identifying limits and degradation mechanisms early to optimize reliability, including for start-ups.",
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
// export const RENTAL_ITEMS: EngineeringItem[] = [
//   {
//     id: "rental-wet-lab",
//     category: "rental",
//     tag: { fr: "Plateau technique", en: "Technical platform" },
//     title: {
//       fr: "Wet-lab & plateau de simulation chirurgicale",
//       en: "Wet-lab & surgical simulation platform",
//     },
//     summary: {
//       fr: "Location de notre plateau de simulation chirurgicale haute-fidélité, équipé pour la chirurgie vasculaire et ophtalmologique.",
//       en: "Rental of our high-fidelity surgical simulation platform, equipped for vascular and ophthalmic surgery.",
//     },
//     description: [
//       {
//         fr: "Notre wet-lab accueille vos sessions de formation, d'évaluation de dispositifs ou de recherche appliquée, avec un environnement conforme aux standards hospitaliers.",
//         en: "Our wet-lab hosts your training sessions, device evaluation or applied research, in an environment aligned with hospital standards.",
//       },
//       {
//         fr: "Le plateau est disponible à la journée ou pour des campagnes plus longues, avec ou sans accompagnement technique.",
//         en: "The platform is available per day or for longer campaigns, with or without technical support.",
//       },
//     ],
//     highlights: [
//       { fr: "Postes de travail instrumentés", en: "Instrumented workstations" },
//       { fr: "Éclairage et imagerie per-opératoire", en: "Intra-operative lighting and imaging" },
//       { fr: "Accompagnement technique en option", en: "Optional technical support" },
//       { fr: "Disponible à la journée ou à la semaine", en: "Available per day or per week" },
//     ],
//   },
//   {
//     id: "rental-pulsatile-bench",
//     category: "rental",
//     tag: { fr: "Banc d'essai", en: "Test bench" },
//     title: {
//       fr: "Banc de perfusion pulsatile",
//       en: "Pulsatile perfusion bench",
//     },
//     summary: {
//       fr: "Mise à disposition d'un banc de perfusion pulsatile pour vos essais hydrodynamiques sur dispositifs vasculaires.",
//       en: "Access to a pulsatile perfusion bench for your hydrodynamic testing on vascular devices.",
//     },
//     description: [
//       {
//         fr: "Le banc reproduit des régimes de flux physiologiques et pathologiques, avec réglage fin de la fréquence, du débit et de la pression.",
//         en: "The bench reproduces physiological and pathological flow regimes, with fine control of frequency, flow rate and pressure.",
//       },
//       {
//         fr: "Idéal pour la R&D, la validation de prototypes et les démonstrations, il est loué avec sa métrologie et son support logiciel.",
//         en: "Ideal for R&D, prototype validation and demonstrations, it is rented with its metrology and software support.",
//       },
//     ],
//     highlights: [
//       { fr: "Régimes pulsatiles paramétrables", en: "Configurable pulsatile regimes" },
//       { fr: "Acquisition pression / débit synchronisée", en: "Synchronized pressure / flow acquisition" },
//       { fr: "Métrologie et logiciel inclus", en: "Metrology and software included" },
//       { fr: "Assistance à la mise en service", en: "Commissioning assistance" },
//     ],
//   },
//   {
//     id: "rental-microct-scanner",
//     category: "rental",
//     tag: { fr: "Équipement", en: "Equipment" },
//     title: {
//       fr: "Micro-tomographe (micro-CT)",
//       en: "Micro-CT scanner",
//     },
//     summary: {
//       fr: "Créneaux de mesure sur notre micro-tomographe haute résolution, avec ou sans opérateur.",
//       en: "Measurement slots on our high-resolution micro-CT scanner, with or without an operator.",
//     },
//     description: [
//       {
//         fr: "Réservez des créneaux sur notre micro-tomographe pour l'inspection interne non destructive de vos échantillons et dispositifs.",
//         en: "Book slots on our micro-CT scanner for non-destructive internal inspection of your samples and devices.",
//       },
//       {
//         fr: "Un opérateur qualifié peut prendre en charge l'acquisition et la reconstruction, ou vous former à l'utilisation autonome.",
//         en: "A qualified operator can handle acquisition and reconstruction, or train you for autonomous use.",
//       },
//     ],
//     highlights: [
//       { fr: "Créneaux à la demi-journée", en: "Half-day booking slots" },
//       { fr: "Acquisition et reconstruction 3D", en: "3D acquisition and reconstruction" },
//       { fr: "Opérateur qualifié en option", en: "Optional qualified operator" },
//       { fr: "Export des données brutes", en: "Raw data export" },
//     ],
//   },
// ];


export const RENTAL_ITEMS: EngineeringItem[] = [
  {
    id: "keyence-vhx-7100",
    category: "rental",
    image: "/photos/equipment/keyence-vhx-7100.png",
    tag: { fr: "Imagerie 3D", en: "3D imaging" },
    title: {
      fr: "Keyence VHX-7100",
      en: "Keyence VHX-7100",
    },
    summary: {
      fr: "Reconstruction d'images 3D haute résolution de surfaces et de matériaux, avec grossissement de ×20 à ×2500.",
      en: "High-resolution 3D image reconstruction of surfaces and materials, with magnification from ×20 to ×2500.",
    },
    description: [
      {
        fr: "Le Keyence VHX-7100 permet la reconstruction d'images 3D haute résolution pour l'observation des surfaces et des matériaux.",
        en: "The Keyence VHX-7100 provides high-resolution 3D image reconstruction for observing surfaces and materials.",
      },
    ],
    highlights: [
      {
        fr: "Reconstruction d'images 3D",
        en: "3D image reconstruction",
      },
      {
        fr: "Grossissement de ×20 à ×2500",
        en: "Magnification from ×20 to ×2500",
      },
    ],
  },
  {
    id: "faxitron-pathvision",
    category: "rental",
    image: "/photos/equipment/faxitron-pathvision.webp",
    tag: { fr: "Radiographie", en: "Radiography" },
    title: {
      fr: "Faxitron PathVision",
      en: "Faxitron PathVision",
    },
    summary: {
      fr: "Système de radiographie haute résolution pour l'imagerie détaillée des échantillons.",
      en: "High-resolution radiography system for detailed sample imaging.",
    },
    description: [
      {
        fr: "Le Faxitron PathVision est dédié à la radiographie haute résolution.",
        en: "The Faxitron PathVision is designed for high-resolution radiography.",
      },
    ],
    highlights: [
      {
        fr: "Radiographie haute résolution",
        en: "High-resolution radiography",
      },
      {
        fr: "Imagerie détaillée des échantillons",
        en: "Detailed sample imaging",
      },
    ],
  },
  {
    id: "zeiss-sem-300",
    category: "rental",
    image: "/photos/equipment/zeiss-sem-300.png",
    tag: { fr: "Microscopie", en: "Microscopy" },
    title: {
      fr: "ZEISS SEM 300",
      en: "ZEISS SEM 300",
    },
    summary: {
      fr: "Microscopie électronique à balayage pour l'analyse morphologique.",
      en: "Scanning electron microscopy for morphological analysis.",
    },
    description: [
      {
        fr: "Le ZEISS SEM 300 permet l'observation par microscopie électronique à balayage et l'analyse morphologique des échantillons.",
        en: "The ZEISS SEM 300 enables scanning electron microscopy and morphological analysis of samples.",
      },
    ],
    highlights: [
      {
        fr: "Microscopie électronique à balayage",
        en: "Scanning electron microscopy",
      },
      {
        fr: "Analyse morphologique",
        en: "Morphological analysis",
      },
    ],
  },
  {
    id: "keyence-vhx-s7000e-ea300",
    category: "rental",
    image: "/photos/equipment/keyence-vhx-s7000e-ea300.png",
    tag: {
      fr: "Analyse de surface",
      en: "Surface analysis",
    },
    title: {
      fr: "Keyence VHX-S7000E + EA-300",
      en: "Keyence VHX-S7000E + EA-300",
    },
    summary: {
      fr: "Système dédié à l'analyse des caractéristiques de surface.",
      en: "System dedicated to the analysis of surface characteristics.",
    },
    description: [
      {
        fr: "L'ensemble Keyence VHX-S7000E et EA-300 permet d'analyser les caractéristiques de surface des échantillons.",
        en: "The Keyence VHX-S7000E and EA-300 system analyzes the surface characteristics of samples.",
      },
    ],
    highlights: [
      {
        fr: "Analyse des caractéristiques de surface",
        en: "Surface characteristics analysis",
      },
      {
        fr: "Système Keyence VHX-S7000E et EA-300",
        en: "Keyence VHX-S7000E and EA-300 system",
      },
    ],
  },
  {
    id: "zeiss-xradia-context",
    category: "rental",
    image: "/photos/equipment/zeiss-xradia-context.png",
    tag: { fr: "Micro-CT", en: "Micro-CT" },
    title: {
      fr: "ZEISS Xradia Context (Micro-CT)",
      en: "ZEISS Xradia Context (Micro-CT)",
    },
    summary: {
      fr: "Tomographie et imagerie 3D volumétrique interne.",
      en: "Tomography and internal volumetric 3D imaging.",
    },
    description: [
      {
        fr: "Le ZEISS Xradia Context réalise des acquisitions de tomographie pour produire une imagerie 3D volumétrique interne.",
        en: "The ZEISS Xradia Context performs tomography acquisitions to produce internal volumetric 3D imaging.",
      },
    ],
    highlights: [
      {
        fr: "Tomographie Micro-CT",
        en: "Micro-CT tomography",
      },
      {
        fr: "Imagerie 3D volumétrique interne",
        en: "Internal volumetric 3D imaging",
      },
    ],
  },
  {
    id: "histology",
    category: "rental",
    image: "/photos/equipment/histology.png",
    tag: { fr: "Histologie", en: "Histology" },
    title: {
      fr: "Histologie",
      en: "Histology",
    },
    summary: {
      fr: "Analyse histologique de sections biologiques et tissulaires.",
      en: "Histological analysis of biological and tissue sections.",
    },
    description: [
      {
        fr: "La plateforme d'histologie permet l'analyse de sections biologiques et tissulaires.",
        en: "The histology platform enables the analysis of biological and tissue sections.",
      },
    ],
    highlights: [
      {
        fr: "Analyse histologique",
        en: "Histological analysis",
      },
      {
        fr: "Sections biologiques et tissulaires",
        en: "Biological and tissue sections",
      },
    ],
  },
  {
    id: "mts-insight-50kn",
    category: "rental",
    image: "/photos/equipment/mts-insight-50kn.jpg",
    tag: { fr: "Traction", en: "Tensile testing" },
    title: {
      fr: "MTS Insight 50 kN",
      en: "MTS Insight 50 kN",
    },
    summary: {
      fr: "Équipement pour la réalisation de tests de traction jusqu'à 50 kN.",
      en: "Equipment for tensile testing up to 50 kN.",
    },
    description: [
      {
        fr: "La MTS Insight 50 kN est utilisée pour réaliser des tests de traction.",
        en: "The MTS Insight 50 kN is used to perform tensile tests.",
      },
    ],
    highlights: [
      {
        fr: "Tests de traction",
        en: "Tensile testing",
      },
      {
        fr: "Capacité de 50 kN",
        en: "50 kN capacity",
      },
    ],
  },
  {
    id: "blockwise-ttr2",
    category: "rental",
    image: "/photos/equipment/blockwise-ttr2.png",
    tag: {
      fr: "Force radiale",
      en: "Radial force",
    },
    title: {
      fr: "Blockwise Model TTR2",
      en: "Blockwise Model TTR2",
    },
    summary: {
      fr: "Mesure de la force radiale des stents et des endoprothèses à 37 °C.",
      en: "Radial force measurement of stents and endoprostheses at 37°C.",
    },
    description: [
      {
        fr: "Le Blockwise Model TTR2 mesure la force radiale des stents et des endoprothèses dans des conditions à 37 °C.",
        en: "The Blockwise Model TTR2 measures the radial force of stents and endoprostheses under conditions at 37°C.",
      },
    ],
    highlights: [
      {
        fr: "Mesure de force radiale",
        en: "Radial force measurement",
      },
      {
        fr: "Essais à 37 °C",
        en: "Testing at 37°C",
      },
    ],
  },
  {
    id: "ta-electroforce-15-325",
    category: "rental",
    image: "/photos/equipment/ta-electroforce-15-325.jpg",
    tag: {
      fr: "Fatigue",
      en: "Fatigue testing",
    },
    title: {
      fr: "TA Instruments ElectroForce 15-325",
      en: "TA Instruments ElectroForce 15-325",
    },
    summary: {
      fr: "Équipement dédié à la réalisation de tests de fatigue.",
      en: "Equipment dedicated to fatigue testing.",
    },
    description: [
      {
        fr: "Le TA Instruments ElectroForce 15-325 est utilisé pour réaliser des tests de fatigue.",
        en: "The TA Instruments ElectroForce 15-325 is used to perform fatigue tests.",
      },
    ],
    highlights: [
      {
        fr: "Tests de fatigue",
        en: "Fatigue testing",
      },
      {
        fr: "Système ElectroForce 15-325",
        en: "ElectroForce 15-325 system",
      },
    ],
  },
];