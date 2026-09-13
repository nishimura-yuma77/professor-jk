import type { ReactNode } from "react"
import { getExperimentsWithDetails } from "@/const/experiments"

export const dynamicParams = false

export function generateStaticParams() {
  return getExperimentsWithDetails().map((experiment) => ({ slug: experiment.slug }))
}

export default function ExperimentDetailLayout({ children }: { children: ReactNode }) {
  return children
}
