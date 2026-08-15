export type Experiment = {
  code: string
  title: string
  subtitle?: string
  status: ExperimentStatus
  description: string
  published: boolean
  stacks: string[]
  media?: MediaLink[]
}
export type ExperimentStatus = "PAUSED" | "ACTIVE" | "COMPLETED" | "ARCHIVED"
export type MediaType = "GITHUB" | "X" | "YOUTUBE" | "WEBSITE"
export type MediaLink = {
  type: MediaType
  href: string
}

export const EXPERIMENTS: Experiment[] = [
  {
    code: "EXP_001",
    title: "J.K. Lab",
    subtitle: "Character Brand Website",
    description: "J.K.教授の世界観を表現するキャラクターサイト。キャラクターデザイン・設計・実装・インフラ構築・CI/CDまで一貫して構築。",
    status: "ACTIVE",
    published: true,
    stacks: [
      "Next.js",
      "TypeScript",
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
    title: "Emotion Mike",
    subtitle: "Condition-Aware Face Tracking",
    description: "PNG Tuber向けのフェイストラッキングアプリ。表情以外の情報から表情を調整する実験的機能を検討中",
    status: "PAUSED",
    published: false,
    stacks: [
      "Python",
      "MediaPipe",
      "PySide6",
    ]
  }
] as const