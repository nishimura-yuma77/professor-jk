export const PLAY_FLYER = {
  label: "PLAY WITH J.K.",
  wanted: "WANTED!!",
  titleLines: ["やりたかったこと、", "やってみようぜ。"],
  description: [
    "完成した企画書はいらない。",
    "「こんなのあったら面白い」だけ持ってこい。",
    "できることを突き詰めて、動くところまでもっていこう。",
  ],
  note: "連絡先は、この貼り紙のいちばん下。",
} as const

export const PLAY_WANTED_NOTES = [
  {
    title: "キャラクターや世界観で遊びたい",
    description: "Webや仕掛けを使って、眺めるだけじゃない体験にしたい。",
  },
  {
    title: "動画・配信・SNSをもっと変にしたい",
    description: "見る人が触れたり参加したりできる、新しい遊び方を試したい。",
  },
  {
    title: "活動で使える小さな道具がほしい",
    description: "面倒なことを少し楽にする、自分たち専用の仕組みを作りたい。",
  },
  {
    title: "用途は不明。でも一回動かしたい",
    description: "役に立つかは後で考える。まず、その変な仮説を触れる形にしたい。",
  },
] as const

export const PLAY_TOOLKIT = {
  title: "俺ができること",
  description: "企画を整理して、必要なところを作って、外へ出すところまで一緒にやれる。",
  actions: ["何を作るか具体化する", "プロトタイプを作る", "次のアクションを考える"],
  skills: ["企画", "UI", "Web", "プロトタイプ", "インフラ", "公開"],
} as const

export const PLAY_EXPERIMENT_CODES = ["EXP_001", "EXP_002"] as const

export type PlayAvailabilityStatus = "OPEN" | "CLOSED"

export const PLAY_AVAILABILITY = {
  status: "CLOSED" as PlayAvailabilityStatus,
  currentExperimentCode: "EXP_001",
  states: {
    OPEN: {
      label: "OPEN",
      title: "いまは、1件受け付けられる。",
      description: [
        "いまは新しい共同制作を1件受け付けています。",
        "一緒に進める相手が決まったら、CURRENTLY CLOSEDへ切り替えます。",
      ],
      contactDescription: "Contact / Fan Letterで「J.K.教授と一緒に作りたい」を選んでくれ。",
      cta: "話を持ち込む",
    },
    CLOSED: {
      label: "CURRENTLY CLOSED",
      title: "現在、1件進行中。",
      description: [
        "確実に形にするため、プロジェクトは1件だけに絞っています。",
        "新しい制作をすぐに始めることはできません。",
        "相談や順番待ちはいつでも歓迎です。"
      ],
      contactDescription: "いまは順番待ち。Contact / Fan Letterで「J.K.教授と一緒に作りたい（順番待ち）」を選んでくれ。",
      cta: "順番待ちでアイデアを置いていく",
    },
  },
} as const

export const CURRENT_PLAY_AVAILABILITY = PLAY_AVAILABILITY.states[PLAY_AVAILABILITY.status]

export const PLAY_RULES = [
  {
    title: "小さく作る",
    description: "まずは小さく。大きなアイデアも小さな検証から。",
  },
  {
    title: "合わなければ断る",
    description: "興味から外れるものや、誰かを傷つけるものは扱わない。嫌な提案はお互い断ろう。",
  },
  {
    title: "作った跡は見せる",
    description: "制作過程と成果は原則公開する。隠したい事情があるなら、始める前に相談しよう。",
  },
  {
    title: "大事な話は先にする",
    description: "権利、クレジット、費用、収益の話が必要なら、作り始める前に一緒に決める。",
  },
] as const

export const PLAY_MONEY_NOTE = {
  quote: "面白さが先。ついでに金になったら最高。",
  description: "お仕事の依頼はまた今度。",
} as const

export const PLAY_STEPS = ["話す", "小さく作る", "遊ぶ"] as const

export const PLAY_CONTACT = {
  title: "で、何して遊ぶ？",
  replyNote: "連絡は原則返す。遅かったらすまん。",
} as const
