import type { BlogArticleMeta } from "@/const/blog/types"

export const meta = {
  slug: "designing-user-api-key-storage",
  title: "ユーザーのAPIキーを預かるシステムを設計した",
  description:
    "外部サービスのAPIキーをユーザーごとに預かるために、ハッシュではなく暗号化を選び、復号済みCredentialをServer Function内部へ閉じ込めた設計をまとめます。",
  publishedAt: "2026-08-26",
  draft: false,
  logNumber: 6,
} as const satisfies BlogArticleMeta
