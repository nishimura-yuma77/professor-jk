import type { BlogArticleMeta } from "@/const/blog/types"

export const meta = {
  slug: "ai-hack-1-oshi-systems-and-ux",
  title: "【AI HACK】#1 システムを\"推す\"時代の到来とUX。",
  description:
    "AI HACKで出会ったAI執事と「かわいい」という評価から、機能が推したくなる存在へ変わるUXを考えます。",
  publishedAt: "2026-09-23",
  draft: false,
  coverImage: {
    id: "ai-hack-oshi-systems-cover",
    src: "/images/blog/ai-hack-1-oshi-systems-and-ux.png",
    alt: "AI HACK #1 システムを推す時代の到来とUX。",
    width: 1200,
    height: 630,
  },
  logNumber: 7,
} as const satisfies BlogArticleMeta
