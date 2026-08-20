import type { BlogArticleMeta } from "@/const/blog/types"

export const meta = {
  slug: "search-console-page-with-redirect",
  title: "Search Consoleの「ページにリダイレクトがあります」に驚いた",
  description:
    "Search Consoleから届いたインデックス未登録の通知を確認したところ、HTTPからHTTPSへの意図したリダイレクトだった記録です。",
  publishedAt: "2026-08-20",
  coverImage: {
    id: "search-console-redirect-cover",
    src: "/blog/search-console-page-with-redirect/og.png",
    alt: "Search Consoleの「ページにリダイレクトがあります」に驚いたのOGP画像",
    width: 1200,
    height: 630,
  },
  logNumber: 3,
} as const satisfies BlogArticleMeta
