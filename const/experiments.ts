export type Experiment = {
  code: string
  slug: string
  title: string
  subtitle?: string
  status: ExperimentStatus
  visibility: ExperimentVisibility
  featured: boolean
  description: string
  stacks: readonly string[]
  media?: readonly MediaLink[]
}
export type ExperimentStatus = "PAUSED" | "ACTIVE" | "COMPLETED" | "ARCHIVED"
export type ExperimentVisibility = "PUBLIC" | "PRIVATE"
export type MediaType = "GITHUB" | "X" | "YOUTUBE" | "WEBSITE"
export type MediaLink = {
  type: MediaType
  href: string
}

export const EXPERIMENTS = [
  {
    code: "EXP_001",
    slug: "jk-lab",
    title: "J.K. Lab",
    subtitle: "Character Brand Website",
    description: "J.K.教授の世界観を表現するキャラクターサイト。\nキャラデザ・WEBデザイン・設計・実装・インフラ構築・CI/CDまで一貫して担当。",
    status: "ACTIVE",
    visibility: "PUBLIC",
    featured: true,
    stacks: [
      "Next.js",
      "TypeScript",
      "Python",
      "SCSS",
      "Terraform",
      "AWS"
    ],
    media: [{
      type: "GITHUB",
      href: "https://github.com/nishimura-yuma77/professor-jk"
    }]
  },
  {
    code: "EXP_002",
    slug: "emotion-mike",
    title: "Emotion Mike",
    subtitle: "Condition-Aware Face Tracking",
    description: "PNG Tuber向けのフェイストラッキングアプリ。\n現在実際の表情とアニメ表現のマッピングの限界を感じ、表情以外の情報から表情を調整する実験的機能を検討中。",
    status: "PAUSED",
    visibility: "PRIVATE",
    featured: true,
    stacks: [
      "Python",
      "MediaPipe",
      "PySide6",
    ]
  }
] as const satisfies readonly Experiment[]

export function getExperiment(slug: string): Experiment | undefined {
  return EXPERIMENTS.find((experiment) => experiment.slug === slug)
}
