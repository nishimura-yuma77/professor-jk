import { createExperimentOpenGraphImage } from "@/components/feature/experiments/ExperimentOpenGraphImage"
import { getExperimentsWithDetails } from "@/const/experiments"

export const dynamic = "force-static"

export function generateStaticParams() {
  return getExperimentsWithDetails().map((experiment) => ({ slug: experiment.slug }))
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  return createExperimentOpenGraphImage(slug)
}
