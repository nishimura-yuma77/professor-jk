export type ContactGuideTemplate = {
  subject: string
  message: string
}

export type ContactGuide = {
  id: string
  label: string
  guidance: string
  hints: string[]
  template: ContactGuideTemplate
}

export const CONTACT_GUIDES: ContactGuide[] = [
  {
    id: "create-together",
    label: "J.K.教授と一緒に作りたい",
    guidance:
      "一緒に作りたい？ 面白そうじゃないか。完成した企画書はいらない。何を作りたいか、誰に使ってほしいか、今どこまで考えているか。この3つがあると話が早い。",
    hints: [
      "作りたいもの・解決したいこと",
      "誰に使ってほしいか",
      "アイデアの現在地",
    ],
    template: {
      subject: "[共同制作の相談] ○○について",
      message:
        "作りたいもの・解決したいこと：\n[ここに入力]\n\n想定している利用者：\n[ここに入力]\n\n現在考えていること・決まっていること：\n[ここに入力]\n\nJ.K.教授と一緒に取り組みたい理由：\n[ここに入力]",
    },
  },
  {
    id: "support-message",
    label: "応援メッセージ",
    guidance:
      "応援がいっちばん嬉しいんだ！！\n思ったことを素直に書く。敬語は不要。返信先は使えるものを。\nこれだけ出来てりゃ後は気持ちだけだ。",
    hints: [
      "思ったように書く",
      "敬語は不要",
      "返信先は使えるものを。返事が届かないのは悲しいぜ...",
    ],
    template: {
      subject: "J.K.教授への応援メッセージ",
      message:
        "J.K.教授へ\n\n[伝えたいメッセージをここに入力]\n\n[君の名前]より",
    },
  },
  {
    id: "work-request",
    label: "開発・出演依頼",
    guidance:
      "仕事の依頼だな。依頼したい内容、希望時期、予算の目安が分かると判断しやすい。まだ決まっていない項目は、未定と書いてくれれば構わないぞ。",
    hints: [
      "依頼内容と期待する役割",
      "希望時期・スケジュール",
      "予算の目安・未定事項",
    ],
    template: {
      subject: "[開発・出演依頼] ○○について",
      message:
        "会社・団体名：\n[ここに入力]\n\n依頼内容と期待する役割：\n[ここに入力]\n\n希望時期・スケジュール：\n[ここに入力]\n\n予算の目安：\n[ここに入力／未定]\n\n補足資料・URL：\n[ここに入力]",
    },
  },
  {
    id: "activity-question",
    label: "活動・技術への質問",
    guidance:
      "質問なら、どの活動や技術についてなのかを最初に教えてくれ。知りたいことと、自分で試したことがあれば一緒に書いてあると答えやすい。",
    hints: [
      "対象の活動・技術・Experiment",
      "具体的に知りたいこと",
      "すでに調べたこと・試したこと",
    ],
    template: {
      subject: "[質問] ○○について",
      message:
        "質問の対象：\n[動画・配信・Experiment・技術名など]\n\n知りたいこと：\n[ここに入力]\n\nすでに調べたこと・試したこと：\n[ここに入力]\n\n補足：\n[ここに入力]",
    },
  },
  {
    id: "other",
    label: "その他",
    guidance:
      "どれにも当てはまらないなら、用件の背景と伝えたいこと、それから返事が必要かを書いてくれ。それだけ分かれば、こっちで読み解く。",
    hints: [
      "連絡した理由・背景",
      "伝えたいこと",
      "返信が必要かどうか",
    ],
    template: {
      subject: "お問い合わせ",
      message:
        "連絡した理由・背景：\n[ここに入力]\n\n伝えたいこと：\n[ここに入力]\n\n返信について：\n[必要／不要]\n\n補足：\n[ここに入力]",
    },
  },
]

export type ContactGuideStage =
  | "topic"
  | "guidance"
  | "template"
  | "overwrite"
  | "result"

export type ContactGuideChoiceVariant = "default" | "primary"
export type ContactFocusField = "subject" | "message"

export const CONTACT_GUIDE_RESULTS = {
  manual: {
    label: "自分で書く",
    message: "わかった。まとまってなくても構わない。確認事項がある場合は俺から折り返すよ。",
    focusField: "message",
    variant: "default",
  },
  guide: {
    label: "ガイド表示だけ頼む",
    message: "入力欄にガイドを表示した。困ったら参考にしてくれ。",
    focusField: "message",
    variant: "default",
  },
  template: {
    label: "テンプレートが欲しい",
    message: "件名と本文にテンプレートを書き込んでおいた。必要なところを埋めて使ってくれ。",
    focusField: "subject",
    variant: "primary",
  },
} as const satisfies Record<
  string,
  {
    label: string
    message: string
    focusField: ContactFocusField
    variant: ContactGuideChoiceVariant
  }
>

export type ContactGuideResult = keyof typeof CONTACT_GUIDE_RESULTS

export type ContactGuideChoiceAction =
  | { type: "select-guide"; guideId: string }
  | { type: "move-stage"; stage: "topic" | "template" }
  | { type: "select-result"; result: ContactGuideResult }
  | { type: "apply-template" }
  | { type: "close" }

export type ContactGuideChoice = {
  id: string
  label: string
  variant: ContactGuideChoiceVariant
  action: ContactGuideChoiceAction
}

type ContactGuideConversationStep = {
  message: string | null
  supplement: "selected-guide-hints" | null
  choices: readonly ContactGuideChoice[]
}

const TOPIC_CHOICES: ContactGuideChoice[] = CONTACT_GUIDES.map((guide) => ({
  id: `guide-${guide.id}`,
  label: guide.label,
  variant: "default",
  action: {
    type: "select-guide",
    guideId: guide.id,
  },
}))

const RESULT_CHOICES: ContactGuideChoice[] = Object.entries(
  CONTACT_GUIDE_RESULTS,
).map(([result, definition]) => ({
  id: `result-${result}`,
  label: definition.label,
  variant: definition.variant,
  action: {
    type: "select-result",
    result: result as ContactGuideResult,
  },
}))

export const CONTACT_GUIDE_CONVERSATION = {
  topic: {
    message: "何を書けばいいか分からない？ なら、まずは用件を教えてくれ。",
    supplement: null,
    choices: TOPIC_CHOICES,
  },
  guidance: {
    message: null,
    supplement: "selected-guide-hints",
    choices: [
      {
        id: "select-again",
        label: "選び直す",
        variant: "default",
        action: { type: "move-stage", stage: "topic" },
      },
      {
        id: "next",
        label: "次へ",
        variant: "primary",
        action: { type: "move-stage", stage: "template" },
      },
    ],
  },
  template: {
    message: "必要ならガイド出したり、テンプレート入れたりできるぜ。\nもちろん、思いのまま書いてくれてもいい。\nどうする？",
    supplement: null,
    choices: RESULT_CHOICES,
  },
  overwrite: {
    message: "もう件名か本文が書いてあるな。今の内容をテンプレートで上書きしていいか？",
    supplement: null,
    choices: [
      {
        id: "back",
        label: "戻る",
        variant: "default",
        action: { type: "move-stage", stage: "template" },
      },
      {
        id: "overwrite",
        label: "上書きする",
        variant: "primary",
        action: { type: "apply-template" },
      },
    ],
  },
  result: {
    message: null,
    supplement: null,
    choices: [
      {
        id: "return-to-form",
        label: "フォームに戻る",
        variant: "primary",
        action: { type: "close" },
      },
    ],
  },
} as const satisfies Record<ContactGuideStage, ContactGuideConversationStep>
