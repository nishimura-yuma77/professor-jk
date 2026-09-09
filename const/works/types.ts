export type WorkTechnology = {
  name: string
  children?: readonly string[]
}

export type WorkDetailSection = {
  id: string
  title: string
  paragraphs?: readonly string[]
  items?: readonly string[]
}

export type Work = {
  code: string
  slug: string
  title: string
  shortTitle: string
  category: string
  lead: string
  summary: readonly [string, ...string[]]
  role: string
  responsibilities: readonly string[]
  technologies: readonly WorkTechnology[]
  period: string
  team: readonly string[]
  details: readonly WorkDetailSection[]
}
