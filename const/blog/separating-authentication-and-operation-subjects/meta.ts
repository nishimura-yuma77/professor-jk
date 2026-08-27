import type { BlogArticleMeta } from "@/const/blog/types"

export const meta = {
  slug: "separating-authentication-and-operation-subjects",
  title: "認証主体と操作主体を分けたユーザーテーブル設計",
  description:
    "seijinbuのCMSで、email/passwordを持つusersを認証主体、admins/actorsを操作主体として分離し、actorIdをセッションとドメイン参照の中心にした設計をまとめます。",
  publishedAt: "2026-08-27",
  draft: true,
  logNumber: 7,
} as const satisfies BlogArticleMeta
