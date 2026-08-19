import type { ReactNode } from "react"
import { EXPERIMENTS } from "@/const/experiments"

export const dynamicParams = false

export function generateStaticParams() {
  return EXPERIMENTS.map((experiment) => ({ slug: experiment.slug }))
}

export default function ExperimentDetailLayout({ children }: { children: ReactNode }) {
  return children
}
