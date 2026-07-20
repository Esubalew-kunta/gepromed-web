import type { TrainingSession } from "./trainings";
import type { NewRegistration } from "./types";

/**
 * Website data access — plain fetch to Supabase REST with the anon
 * (publishable) key. Works in both server and client components, no
 * supabase-js dependency. Reads trainings (public per RLS) and creates leads
 * via the create_lead RPC (the only write anon is allowed).
 */

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function isConfigured(): boolean {
  return Boolean(URL && ANON);
}

const headers = () => ({
  apikey: ANON as string,
  Authorization: `Bearer ${ANON}`,
  "Content-Type": "application/json",
});

/** Map a Supabase trainings row to the site's TrainingSession shape. */
function mapTraining(r: Record<string, unknown>): TrainingSession {
  return {
    slug: r.slug as string,
    title: r.title as TrainingSession["title"],
    specialty: r.specialty as TrainingSession["specialty"],
    level: r.level as TrainingSession["level"],
    audience: r.audience as TrainingSession["audience"],
    targetAudience: (r.target_audience ?? []) as TrainingSession["targetAudience"],
    city: r.city as string,
    venue: r.venue as TrainingSession["venue"],
    startDate: r.start_date as string,
    endDate: r.end_date as string,
    durationDays: Number(r.duration_days ?? 1),
    priceEUR: Number(r.price_eur ?? 0),
    depositEUR: Number(r.deposit_eur ?? 0),
    capacity: Number(r.capacity ?? 0),
    enrolled: Number(r.enrolled ?? 0),
    qualiopi: Boolean(r.qualiopi),
    summary: r.summary as TrainingSession["summary"],
    objectives: (r.objectives ?? []) as TrainingSession["objectives"],
    program: (r.program ?? []) as TrainingSession["program"],
    supervisors: (r.supervisors ?? []) as TrainingSession["supervisors"],
    prerequisites: (r.prerequisites ?? undefined) as TrainingSession["prerequisites"],
    pedagogicalResources: (r.pedagogical_resources ?? undefined) as TrainingSession["pedagogicalResources"],
    teachingMethods: (r.teaching_methods ?? undefined) as TrainingSession["teachingMethods"],
    evaluationMethods: (r.evaluation_methods ?? undefined) as TrainingSession["evaluationMethods"],
    supervisionOrganization: (r.supervision_organization ?? undefined) as TrainingSession["supervisionOrganization"],
    accessibilityInfo: (r.accessibility_info ?? undefined) as TrainingSession["accessibilityInfo"],
    accessibilityReferent: (r.accessibility_referent ?? undefined) as string | undefined,
    certificateDelivered: (r.certificate_delivered ?? undefined) as TrainingSession["certificateDelivered"],
    registrationInfo: (r.registration_info ?? undefined) as TrainingSession["registrationInfo"],
    priceNote: (r.price_note ?? undefined) as TrainingSession["priceNote"],
    satisfaction: (r.satisfaction ?? undefined) as number | undefined,
    passRate: (r.pass_rate ?? undefined) as number | undefined,
    photos: (r.photos ?? []) as TrainingSession["photos"],
    imageUrl: (r.image_url ?? undefined) as string | undefined,
    programType:
      (r.program_type as TrainingSession["programType"]) ??
      (r.specialty === "ophthalmology" ? "helpmesee" : "bootcamp"),
    isSponsored: Boolean(r.is_sponsored),
    sponsors: (r.sponsors ?? []) as TrainingSession["sponsors"],
  };
}

export async function getTrainings(): Promise<TrainingSession[]> {
  if (!isConfigured()) return [];
  const res = await fetch(
    `${URL}/rest/v1/trainings?select=*&order=start_date.asc`,
    { headers: headers(), cache: "no-store" },
  );
  if (!res.ok) return [];
  const rows = (await res.json()) as Record<string, unknown>[];
  return rows.map(mapTraining);
}

export async function getTrainingBySlug(
  slug: string,
): Promise<TrainingSession | undefined> {
  if (!isConfigured()) return undefined;
  const res = await fetch(
    `${URL}/rest/v1/trainings?select=*&slug=eq.${encodeURIComponent(slug)}&limit=1`,
    { headers: headers(), cache: "no-store" },
  );
  if (!res.ok) return undefined;
  const rows = (await res.json()) as Record<string, unknown>[];
  return rows[0] ? mapTraining(rows[0]) : undefined;
}

/** Create a lead via the SECURITY DEFINER RPC. Returns the human ref (REG-…). */
export async function createLead(data: NewRegistration): Promise<string> {
  if (!isConfigured()) throw new Error("Registration is not configured.");
  const res = await fetch(`${URL}/rest/v1/rpc/create_lead`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ payload: data }),
  });
  if (!res.ok) {
    const e = await res.json().catch(() => ({}));
    throw new Error(e.message || "Failed to submit registration.");
  }
  // The function returns the ref as a JSON string.
  return (await res.json()) as string;
}

export type EngineeringRequestInput = {
  kind: "explant" | "test" | "equipment";
  name: string;
  email: string;
  institution?: string;
  desiredDate?: string;
  notes?: string;
  meta?: Record<string, unknown>;
};

/** Create an engineering request (explant / test / equipment) via the RPC. Returns ENG-… ref. */
export async function createEngineeringRequest(
  input: EngineeringRequestInput,
): Promise<string> {
  if (!isConfigured()) throw new Error("Requests are not configured.");
  const res = await fetch(`${URL}/rest/v1/rpc/create_engineering_request`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ payload: input }),
  });
  if (!res.ok) {
    const e = await res.json().catch(() => ({}));
    throw new Error(e.message || "Failed to submit request.");
  }
  return (await res.json()) as string;
}

/** Upload a signed contract for a lead ref → stored + attached as pending verification. */
export async function uploadSignedContract(ref: string, file: File): Promise<void> {
  if (!isConfigured()) throw new Error("Uploads are not configured.");
  const ext = (file.name.split(".").pop() || "pdf").toLowerCase();
  const path = `uploads/${ref}-${Date.now()}.${ext}`;

  const up = await fetch(`${URL}/storage/v1/object/documents/${path}`, {
    method: "POST",
    headers: {
      apikey: ANON as string,
      Authorization: `Bearer ${ANON}`,
      "Content-Type": file.type || "application/octet-stream",
    },
    body: file,
  });
  if (!up.ok) {
    throw new Error("Upload failed. Please check the file and try again.");
  }

  const rpc = await fetch(`${URL}/rest/v1/rpc/submit_signed_document`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ p_ref: ref, p_path: path }),
  });
  if (!rpc.ok) {
    const e = await rpc.json().catch(() => ({}));
    throw new Error(e.message || "We could not attach the document.");
  }
}
