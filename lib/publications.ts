import type { L } from "@/lib/i18n";

export type Publication = {
  authors: string;
  title: string;
  journal: string;
  year: string;
  /** volume/pages or "Online ahead of print" */
  ref?: string;
  href?: string;
};

export type PubCategory = {
  id: string;
  theme: L;
  items: Publication[];
};

/* Real citations mirrored from gepromed.com/en/about-us/key-publications.
   Bibliographic references are reproduced verbatim; only category labels are localized. */
export const PUB_CATEGORIES: PubCategory[] = [
  {
    id: "explant",
    theme: { fr: "Analyse d'explants", en: "Explant analysis" },
    items: [
      {
        authors: "Lejay A, Durbas J, Tabouret J, Christ L, Neumann N, Kuntz S, Chakfé N.",
        title: "Latest vascular devices surveillance news: an overview.",
        journal: "Int Angiol",
        year: "2025",
        ref: "Online ahead of print",
      },
      {
        authors: "Christ L, Boisramé T, Neumann N, Geringer J, Akladios C, Pasquinelli G, Lejay A, Tabouret J, Chakfé N.",
        title: "Analysis of explanted Essure® devices.",
        journal: "Eur J Obstet Gynecol Reprod Biol",
        year: "2025",
        ref: "Sep 1, online ahead of print",
      },
      {
        authors: "Kuntz SH, Bellissard A, Finn AV, Lejay A, Chakfé N, Virmani R.",
        title: "What Have We Learned From Explanted Peripheral Stents Analysis?",
        journal: "J Endovasc Ther",
        year: "2025",
        ref: "Online ahead of print",
        href: "https://journals.sagepub.com/doi/10.1177/15266028251349486",
      },
      {
        authors: "Vakhitov D, Chakfé N, Heim F, Chaudhuri A.",
        title: "The Impact of Heli-FX EndoAnchor Application on Endograft Material: An Experimental Study.",
        journal: "EJVES Vasc Forum",
        year: "2024",
        ref: "62:72-77",
      },
      {
        authors: "Bellissard A, Kuntz S, Lejay A, Chakfé N.",
        title: "Systematic Review of Femoral Artery Stent Fractures.",
        journal: "EJVES Vasc Forum",
        year: "2024",
        ref: "62:48-56",
      },
      {
        authors: "Kuntz S, Deslarzes C, Nguyen ATV, Longchamp A, D'Amico R, Longchamp J, Lejay A, Chakfé N, Déglise S.",
        title: "Midterm outcomes with the Nellix endograft alone or with chimneys.",
        journal: "EJVES Vasc Forum",
        year: "2024",
        ref: "62:8-14",
      },
      {
        authors: "Christ L, Kuntz S, Vakhitov D, Raibaut L, Neumann N, Heim F, Chakfé N, Lejay A.",
        title: "Nellix Device Failure Mechanisms Analysis on Explanted Grafts.",
        journal: "J Endovasc Ther",
        year: "2024",
        ref: "Online ahead of print",
      },
      {
        authors: "Grandhomme J, Vakhitov D, Kuntz S, Lejay A, Chakfé N.",
        title: "What We Know From Reports on Type III Endoleak in the Literature.",
        journal: "EJVES Vasc Forum",
        year: "2024",
        ref: "61:81-84",
      },
      {
        authors: "Kuntz S, Thaveau F, Ohana M, Pasquinelli G, Chakfé N, Lejay A.",
        title: "Calcium in the (Big) Pipes: Intra-TEVAR Calcifications!",
        journal: "EJVES Vasc Forum",
        year: "2023",
        ref: "60:64-67",
      },
      {
        authors: "Vakhitov D, Grandhomme J, Kuntz S, Christ L, Neumann N, Heim F, Chakfé N, Lejay A.",
        title: "Type IIIb Endoleaks: Fabric Perforations of Explanted New Generation Endoprostheses.",
        journal: "Eur J Vasc Endovasc Surg",
        year: "2023",
        ref: "Online ahead of print",
        href: "https://www.ejves.com/article/S1078-5884(23)00781-5/fulltext",
      },
      {
        authors: "Lejay A, Bratu B, Kuntz S, Neumann N, Heim F, Chakfé N.",
        title: "Calcification of Synthetic Vascular Grafts: A Systematic Review.",
        journal: "EJVES Vasc Forum",
        year: "2023",
        ref: "60:1-7",
      },
      {
        authors: "Bellissard A, Chakfe N, Kuntz S, Dion D, Schmitt L, Heim F, Lejay A.",
        title: "Degradation phenomena on last generations of polyethylene terephthalate knitted vascular prostheses.",
        journal: "JVS Vasc Sci",
        year: "2023",
        ref: "4:100097",
      },
      {
        authors: "Helfer E, Kuntz S, Dion D, Heim F, Georg Y, Thaveau F, Lejay A, Chakfé N.",
        title: "Vascular grafts collagen coating resorption and healing process in humans.",
        journal: "JVS Vasc Sci",
        year: "2022",
        ref: "3:193-204",
      },
      {
        authors: "Cao SH, Canonge J, Gaudric J, Dion D, Kuntz S, Jayet J, Koskas F, Heim F, Lejay A, Chakfé N.",
        title: "Degradation Phenomena on \"Homemade\" Explanted Aortic Textile Endografts.",
        journal: "EJVES Vasc Forum",
        year: "2021",
        ref: "53:2-8",
      },
      {
        authors: "Kuntz S, Lejay A, Chakfé N.",
        title: "Subintimal Angioplasty in the Superficial Femoral Artery: A Real Long Term Option Demonstrated by Histology.",
        journal: "EJVES Vasc Forum",
        year: "2021",
        ref: "52:49-50",
      },
      {
        authors: "Grandhomme J, Chakfe N, Chaudhuri A, Wyss TR, Chiesa R, Chakfe J, Dion D, Heim F, Lejay A.",
        title: "The Impact of EndoAnchor Penetration on Endograft Structure: First Report of Explant Analysis.",
        journal: "EJVES Vasc Forum",
        year: "2020",
        ref: "49:4-10",
      },
      {
        authors: "Kuntz S, Gangloff H, Naamoune H, Lejay A, Virmani R, Chakfé N.",
        title: "Automated Histological Segmentation on Micro Computed Tomography Images of Atherosclerotic Arteries.",
        journal: "Eur J Vasc Endovasc Surg",
        year: "2021",
        ref: "61:714-715",
      },
      {
        authors: "Kuntz SH, Jinnouchi H, Kutyna M, Torii S, Cornelissen A, Sakamoto A, Sato Y, Fuller DT, Schwein A, Ohana M, Gangloff H, Lejay A, Finn AV, Chakfé N, Virmani R.",
        title: "Co-Registration of Peripheral Atherosclerotic Plaques Assessed by Conventional CT Angiography, MicroCT and Histology in Patients with Chronic Limb Threatening Ischaemia.",
        journal: "Eur J Vasc Endovasc Surg",
        year: "2021",
        ref: "61:146-154",
      },
      {
        authors: "Bonnin E, Lermusiaux P, Chakfe N, Dion D, Lejay A.",
        title: "Disruption of a Covered Nitinol Self Expanding Stent Graft Implanted in the Common Femoral Artery.",
        journal: "EJVES Vasc Forum",
        year: "2020",
        ref: "47:55-59",
      },
      {
        authors: "Kuntz SH, Torii S, Jinnouchi H, Cornelissen A, Sakamoto A, Sato Y, Kutyna M, Romero ME, Lejay A, Schwein A, Bonnin E, Finn AV, Chakfé N, Virmani R.",
        title: "Pathology and Multimodality Imaging of Acute and Chronic Femoral Stenting in Humans.",
        journal: "JACC Cardiovasc Interv",
        year: "2020",
        ref: "13:418-427",
      },
    ],
  },
  {
    id: "testing",
    theme: { fr: "Essais sur dispositifs cardiovasculaires", en: "Cardiovascular device testing" },
    items: [
      {
        authors: "Ramella A, Barati S, De Campo D, Luraghi G, Matas JFR, Heim F, Chakfé N, Mandigers TJ, Fulgheri I, Domanin M, Trimarchi S, Migliavacca F.",
        title: "Mechanical Performance of Thoracic Aortic Stent-Grafts: An In Vitro and In Silico Study.",
        journal: "Ann Biomed Eng",
        year: "2025",
        ref: "Online ahead of print",
      },
      {
        authors: "Jayet J, Canonge J, Heim F, Coggia M, Chakfé N, Coscas R.",
        title: "Mechanical Comparison between Fenestrated Endograft and Physician-Made Fenestrations.",
        journal: "J Clin Med",
        year: "2023",
        ref: "12:4911",
      },
      {
        authors: "Canonge J, Heim F, Chakfé N, Coscas R, Cochennec F, Jayet J.",
        title: "Mechanical Performances Assessment Of Physician-Modified Aortic Stent-Graft.",
        journal: "Eur J Vasc Endovasc Surg",
        year: "2023",
        ref: "65:435-443",
      },
      {
        authors: "Chaudhuri A, Heim F, Chakfe N.",
        title: "Quantifying the Functional Stiffness of Pullthrough Wires Used for Endovascular Aneurysm Repairs Using Comparative Tension Dynamometry.",
        journal: "EJVES Vasc Forum",
        year: "2022",
        ref: "56:12-15",
      },
      {
        authors: "Jayet J, Heim F, Canonge J, Coggia M, Chakfé N, Coscas R.",
        title: "Mechanical Behaviour of Fenestrations in Current Aortic Endografts.",
        journal: "Eur J Vasc Endovasc Surg",
        year: "2021",
        ref: "62:945-952",
      },
      {
        authors: "Chaudhuri A, Heim F, Chakfe N.",
        title: "Are All Wires Created the Same? A Quality Assurance Study of the Stiffness of Wires Typically Employed During Endovascular Surgery Using Tension Dynamometry.",
        journal: "EJVES Vasc Forum",
        year: "2021",
        ref: "52:20-24",
      },
      {
        authors: "Finotello A, Schuurmann R, Gregorio SD, Boschetti GA, Chakfé N, Pane B, Spinella G, de Vries JP, Palombo D, Pratesi G.",
        title: "Initial Clinical Experience With a New Conformable Abdominal Aortic Endograft: Aortic Neck Coverage and Curvature Analysis in Challenging Aortic Necks.",
        journal: "J Endovasc Ther",
        year: "2021",
        ref: "28:407-414",
      },
      {
        authors: "Canonge J, Jayet J, Heim F, Chakfé N, Coggia M, Coscas R, Cochennec F.",
        title: "Comprehensive Review of Physician Modified Aortic Stent Grafts: Technical and Clinical Outcomes.",
        journal: "Eur J Vasc Endovasc Surg",
        year: "2021",
        ref: "61:560-569",
      },
      {
        authors: "Zaccaria A, Migliavacca F, Contassot D, Heim F, Chakfe N, Pennati G, Petrini L.",
        title: "Finite Element Simulations of the ID Venous System to Treat Venous Compression Disorders: From Model Validation to Realistic Implant Prediction.",
        journal: "Ann Biomed Eng",
        year: "2021",
        ref: "49:1493-1506",
      },
      {
        authors: "Chakfe N, Nicolini P, Contassot D.",
        title: "Flat Spring to Ensure an Elastic and Compliant Branch Connection Between Two Stents.",
        journal: "Eur J Vasc Endovasc Surg",
        year: "2021",
        ref: "61:157",
      },
      {
        authors: "Lucereau B, Koffhi F, Lejay A, Georg Y, Durand B, Thaveau F, Heim F, Chakfe N.",
        title: "Compliance of Textile Vascular Prostheses Is a Fleeting Reality.",
        journal: "Eur J Vasc Endovasc Surg",
        year: "2020",
        ref: "60:773-779",
      },
      {
        authors: "Meddahi-Pelle A, Pavon-Djavid G, Chakfe N, Heim F.",
        title: "How yarn orientation limits fibrotic tissue ingrowth in a woven polyester heart valve scaffold: a case report.",
        journal: "Biomed Tech (Berl)",
        year: "2020",
        ref: "66:225-230",
      },
    ],
  },
  {
    id: "education",
    theme: { fr: "Éducation & simulation", en: "Education & simulation" },
    items: [
      {
        authors: "Dormegny L, Yaïci R, Koestel E, Dhubhghaill SN, Ahiwalay C, Bacchav A, Bourges J-L, Dechriste G, Dick HB, Prior Filipe H, Flockerzi E, Gaucher D, Lansingh VC, Gonzalez P, Henderson BA, Kuntz S, Rafanomezantsoa R, Andre J-M, Rocha G, Rousseau A, Sauer A, Schaeffer M, Seitz B, Solecki L, Skou Thomsen AS, Chakfe N, Lejay A, Bourcier T.",
        title: "Global trends and practice patterns in virtual reality simulation training for ophthalmic surgery: an international survey.",
        journal: "Sci Rep",
        year: "2025",
        ref: "15:30886",
      },
      {
        authors: "Trapé A, Favreau H, Facca S, Chakfé N, Peterson B, Liverneaux P.",
        title: "Study of the performance of resident surgeon-in-training during distal fibula lateral plate placement according to 2 learning methods: naive practice versus deliberate practice.",
        journal: "Eur J Orthop Surg Traumatol",
        year: "2025",
        ref: "35:105",
      },
      {
        authors: "Dormegny L, Lansingh VC, Lejay A, Chakfe N, Yaici R, Sauer A, Gaucher D, Henderson BA, Thomsen ASS, Bourcier T.",
        title: "Virtual reality simulation and real-life training programs for cataract surgery: a scoping review of the literature.",
        journal: "BMC Med Educ",
        year: "2024",
        ref: "24(1):1245",
      },
      {
        authors: "Yaïci R, Poirot J, Dormegny L, Neumann N, Bazarya E, Solecki L, Sauer A, Gaucher D, Lejay A, Thomsen AS, Chakfe N, Bourcier T.",
        title: "Validity evidence of a new virtual reality simulator for phacoemulsification training in cataract surgery.",
        journal: "Sci Rep",
        year: "2024",
        ref: "14:25524",
        href: "https://pubmed.ncbi.nlm.nih.gov/39461993/",
      },
      {
        authors: "Klein P, Goetsch T, Clavert P, Chakfé N, El Amir L, Liverneaux P.",
        title: "Study of surgical performance during clavicle plate placements using 2 learning methods: naive practice versus deliberate practice.",
        journal: "Orthop Traumatol Surg Res",
        year: "2024",
        ref: "Online ahead of print",
      },
      {
        authors: "Rouby AF, Neumann N, Vento V, Lejay A, Kuntz S, Bourcier T, Oulehri W, Bismuth J, Chakfé N.",
        title: "Fundamental Technical Skills of Endovascular Surgery: A Preliminary Study on Its Impact on Skills and Stress during Procedures.",
        journal: "Ann Vasc Surg",
        year: "2024",
        ref: "108:84-91",
      },
      {
        authors: "Sidhoum L, Dormegny L, Neumann N, Rouby AF, Sauer A, Gaucher D, Lejay A, Chakfé N, Bourcier T.",
        title: "Assessment method of cognitive load and stress inducer factors of surgeons and anesthetists in the operating room.",
        journal: "J Fr Ophtalmol",
        year: "2023",
        ref: "46:536-551",
      },
      {
        authors: "Dormegny L, Neumann N, Lejay A, Sauer A, Gaucher D, Proust F, Chakfe N, Bourcier T.",
        title: "Multiple metrics assessment method for a reliable evaluation of corneal suturing skills.",
        journal: "Sci Rep",
        year: "2023",
        ref: "13:2920",
      },
      {
        authors: "Treil L, Neumann N, Chanes N, Lejay A, Bourcier T, Bismuth J, Lee JT, Sheahan M, Rouby AF, Chakfé N.",
        title: "Objective Evaluation of Clock Face Suture Using the Objective Structured Assessment of Technical Skill (OSATS) Checklist.",
        journal: "EJVES Vasc Forum",
        year: "2022",
        ref: "57:5-11",
      },
      {
        authors: "Cafarelli L, El Amiri L, Facca S, Chakfé N, Sapa MC, Liverneaux P.",
        title: "Anterior plating technique for distal radius: comparing performance after learning through naive versus deliberate practice.",
        journal: "Int Orthop",
        year: "2022",
        ref: "46:1821-1829",
      },
      {
        authors: "Debucquois A, Vento V, Neumann N, Mertz L, Lejay A, Rouby AF, Bourcier T, Lee JT, Chakfe N.",
        title: "Xray Exposure Time in Dedicated Academic Simulation Programs Is Realistic of Patient Procedures.",
        journal: "EJVES Vasc Forum",
        year: "2022",
        ref: "55:5-8",
      },
    ],
  },
];
