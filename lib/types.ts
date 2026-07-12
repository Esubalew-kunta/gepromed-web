import type { L } from "./i18n";

export type LeadStatus =
  | "lead"
  | "deposit_paid"
  | "contract_signed"
  | "confirmed"
  | "cancelled";

export const STATUS_FLOW: LeadStatus[] = [
  "lead",
  "deposit_paid",
  "contract_signed",
  "confirmed",
];

export const STATUS_LABELS: Record<LeadStatus, L> = {
  lead: { fr: "Lead à suivre", en: "Lead to follow up" },
  deposit_paid: { fr: "Acompte payé", en: "Deposit paid" },
  contract_signed: { fr: "Contrat signé", en: "Contract signed" },
  confirmed: { fr: "Confirmé", en: "Confirmed" },
  cancelled: { fr: "Annulé", en: "Cancelled" },
};

export const STATUS_TONE: Record<LeadStatus, string> = {
  lead: "bg-amber-50 text-amber-700",
  deposit_paid: "bg-sky-50 text-sky-700",
  contract_signed: "bg-indigo-50 text-indigo-700",
  confirmed: "bg-emerald-50 text-emerald-700",
  cancelled: "bg-slate-100 text-slate-500",
};

export type FollowUp = { at: string; note: string };

export type Registration = {
  id: string;
  createdAt: string;
  sessionSlug: string;
  sessionTitle: string;
  // participant
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profession: string;
  institution: string;
  country: string;
  // logistics
  dietary: string;
  arrival?: string;
  needsAccommodation?: boolean;
  elearningAccess?: boolean;
  notes: string;
  // funding (public form) — a self-funded seat, or a lab-sponsored one. When
  // sponsored we capture the organization so its name + logo can replace the
  // price on the participant's communications (Rule 1).
  funding?: "self" | "sponsored";
  sponsorName?: string;
  sponsorContact?: string;
  sponsorLogoUrl?: string;
  // HelpMeSee referral (private /lead/helpmesee form) — foundation intake.
  helpMeSeeRef?: string;
  coordinator?: string;
  // tracking
  status: LeadStatus;
  followUps: FollowUp[];
};

export type NewRegistration = Omit<
  Registration,
  "id" | "createdAt" | "status" | "followUps"
>;
