import type { BlogArticleMeta } from "@/const/blog/types"

export const meta = {
  slug: "tanstack-start-cloudflare-workers-d1-cms",
  title: "TanStack Start + Cloudflare Workers + D1でCMS基盤を構築する",
  description:
    "TanStack StartとCloudflare Workers + D1でCMS基盤を作り、実行境界、環境切り替え、認証、GitHub Actionsで苦戦した点をまとめた作業ログです。",
  publishedAt: "2026-08-22",
  draft: false,
  logNumber: 5,
} as const satisfies BlogArticleMeta
