export type ProfileData = {
  header: string
  content: string
}

export const PROFILE_TEXT =
  "本業はWebエンジニア。実力を試すため、自分自身をプロデュース。企画・開発したものと、その試行錯誤を公開している。"

export const PROFILE_FLAVOR_TEXT =
  "――その実験体が、この俺、Professor. J.K.さ。"

export const PROFILE_DATA = [
  {
    header: "BIRTHDAY",
    content: "7月7日",
  },
  {
    header: "CODE",
    content: "PROFESSOR. J.K.",
  },
  {
    header: "HEIGHT",
    content: "167cm",
  },
  {
    header: "LIKES",
    content: "ゲーム / 開発",
  },
  {
    header: "DISLIKES",
    content: "野菜 / 片づけ",
  },
  {
    header: "MOTTO",
    content: "チビじゃない。器がデカい。",
  },
  {
    header: "ORIGIN",
    content: "目の下のクマは失恋由来",
  },
  {
    header: "SLEEP",
    content: "8時間",
  },
] as const satisfies readonly ProfileData[]
