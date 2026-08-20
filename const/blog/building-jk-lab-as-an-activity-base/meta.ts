import type { BlogArticleMeta } from "@/const/blog/types"

export const meta = {
  slug: "building-jk-lab-as-an-activity-base",
  title: "今後の活動拠点として、J.K. Labを作った",
  description:
    "活動や制作物、その過程で考えたことを継続して残すために作った、J.K. Labの目的と構成を紹介します。",
  publishedAt: "2026-08-19",
  coverImage: {
    id: "jk-lab-cover",
    src: "/images/ogp.png",
    alt: "六角形のJ.K.ロゴとPROF. J.K.の文字",
    width: 1200,
    height: 630,
  },
  logNumber: 1,
} as const satisfies BlogArticleMeta
