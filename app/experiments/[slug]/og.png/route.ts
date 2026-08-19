import { createExperimentOpenGraphImage } from "@/components/feature/experiments/ExperimentOpenGraphImage"
import { EXPERIMENTS } from "@/const/experiments"

export const dynamic = "force-static"

export function generateStaticParams() {
  return EXPERIMENTS.map((experiment) => ({ slug: experiment.slug }))
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  return createExperimentOpenGraphImage(slug)
}
