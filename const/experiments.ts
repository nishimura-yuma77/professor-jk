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
export type ExperimentVisibility = "PUBLIC" | "PRIVATE" | "SECRET"
export type MediaType = "GITHUB" | "X" | "YOUTUBE" | "WEBSITE"
export type MediaLink = {
  type: MediaType
  href: string
}

export const EXPERIMENTS = [
  {
    code: "EXP_003",
    slug: "secret-project-003",
    title: "Secret Project",
    subtitle: "Undisclosed Project",
    description: "NovelAIと連携してキャラクターコンテンツの制作ワークフローを自動化するプロジェクト。\n同人声優との協力も通じ、キャラクターIPを育成する拠点を目指す。",
    status: "ACTIVE",
    visibility: "SECRET",
    featured: true,
    stacks: [],
  },
  {
    code: "EXP_001",
    slug: "jk-lab",
    title: "J.K. Lab",
    subtitle: "Character Brand Website",
    description: "J.K.教授を通して、理念・人柄・実務経験を伝えるポートフォリオサイト。\n制作物と開発過程を公開し、仕事を任せる相手として判断できる情報を提供する。",
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
    description: "PNG Tuber向けに、状況に応じた表情制御を検討する開発プロジェクト。\nPCの音量変化を表情切り替えのトリガーに用いる方針で、現在はモデル化を進めている。",
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

export function getExperimentsWithDetails(): readonly Experiment[] {
  return EXPERIMENTS
}

export function getExperiment(slug: string): Experiment | undefined {
  return getExperimentsWithDetails().find((experiment) => experiment.slug === slug)
}
