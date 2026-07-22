import type { L } from "@/lib/i18n";

export type Equipment = {
  name: string;
  category: L;
  desc: L;
  image: string;
};

/* Gepromed's equipment park, from the official "Parc d'équipements" document.
   Real machine names and descriptions. Replace the placeholder images under
   public/photos/engineering/equipment/ with the real product photos (same
   filenames). */
export const EQUIPMENT_PARK: Equipment[] = [
  {
    name: "Keyence VHX-7100®",
    category: { fr: "Imagerie 3D", en: "3D imaging" },
    desc: {
      fr: "Reconstruction d'images 3D haute résolution de surface et matériaux (x20 à x2500).",
      en: "High-resolution 3D image reconstruction of surfaces and materials (x20 to x2500).",
    },
    image: "/photos/engineering/equipment/keyence-vhx-7100.jpg",
  },
  {
    name: "Faxitron™ PathVision",
    category: { fr: "Radiographie", en: "Radiography" },
    desc: {
      fr: "Radiographie haute résolution.",
      en: "High-resolution radiography.",
    },
    image: "/photos/engineering/equipment/faxitron-pathvision.jpg",
  },
  {
    name: "Zeiss SEM 300®",
    category: { fr: "Microscopie électronique", en: "Electron microscopy" },
    desc: {
      fr: "Microscopie électronique à balayage, analyse morphologique.",
      en: "Scanning electron microscopy, morphological analysis.",
    },
    image: "/photos/engineering/equipment/zeiss-sem-300.jpg",
  },
  {
    name: "Keyence VHX-S7000E® + EA-300",
    category: { fr: "Analyse de surface", en: "Surface analysis" },
    desc: {
      fr: "Analyse des caractéristiques de surface.",
      en: "Surface characteristics analysis.",
    },
    image: "/photos/engineering/equipment/keyence-vhx-s7000e.jpg",
  },
  {
    name: "Zeiss Xradia Context® (Micro-CT)",
    category: { fr: "Tomographie", en: "Tomography" },
    desc: {
      fr: "Tomographie, imagerie 3D volumétrique interne.",
      en: "Tomography, internal 3D volumetric imaging.",
    },
    image: "/photos/engineering/equipment/zeiss-xradia-context.jpg",
  },
  {
    name: "Histologie",
    category: { fr: "Histologie", en: "Histology" },
    desc: {
      fr: "Analyse histologique de sections biologiques et tissulaires.",
      en: "Histological analysis of biological and tissue sections.",
    },
    image: "/photos/engineering/equipment/histologie.jpg",
  },
  {
    name: "MTS Insight 50 kN",
    category: { fr: "Essais mécaniques", en: "Mechanical testing" },
    desc: {
      fr: "Tests de traction.",
      en: "Tensile testing.",
    },
    image: "/photos/engineering/equipment/mts-insight-50kn.jpg",
  },
  {
    name: "Blockwise Model TTR2",
    category: { fr: "Force radiale", en: "Radial force" },
    desc: {
      fr: "Mesure de force radiale des stents et endoprothèses à 37 °C.",
      en: "Radial force measurement of stents and endoprostheses at 37 °C.",
    },
    image: "/photos/engineering/equipment/blockwise-ttr2.jpg",
  },
  {
    name: "TA Instruments ElectroForce 15-325",
    category: { fr: "Fatigue", en: "Fatigue" },
    desc: {
      fr: "Tests de fatigue.",
      en: "Fatigue testing.",
    },
    image: "/photos/engineering/equipment/ta-electroforce-15-325.jpg",
  },
];
