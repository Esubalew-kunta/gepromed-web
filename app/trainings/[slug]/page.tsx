import { notFound } from "next/navigation";
import { getTraining } from "@/lib/trainings";
import { getTrainingBySlug } from "@/lib/data";
import { TrainingDetailView } from "@/components/TrainingDetailView";

export const dynamic = "force-dynamic";

export default async function TrainingDetail({
  params,
}: {
  params: { slug: string };
}) {
  // Live from Supabase; fall back to the bundled seed if unconfigured.
  const t = (await getTrainingBySlug(params.slug)) ?? getTraining(params.slug);
  if (!t) notFound();
  return <TrainingDetailView t={t} />;
}
