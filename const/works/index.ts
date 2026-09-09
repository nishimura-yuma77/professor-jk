import type { Work } from "@/const/works/types"
import { EC_SITE_OPERATIONS } from "@/const/works/ec-site-operations"
import { EXPERIMENT_DATA_MANAGEMENT } from "@/const/works/experiment-data-management"

export const WORKS = [
  EC_SITE_OPERATIONS,
  EXPERIMENT_DATA_MANAGEMENT,
] as const satisfies readonly Work[]

export function getWorks(): readonly Work[] {
  return WORKS
}

export function getWork(slug: string): Work | undefined {
  return WORKS.find((work) => work.slug === slug)
}

export function getWorkSlugs(): readonly string[] {
  return WORKS.map((work) => work.slug)
}

export type { Work, WorkDetailSection, WorkTechnology } from "@/const/works/types"
