import type { BlogArticleMeta } from "@/const/blog/types"

export const meta = {
  slug: "building-a-typed-block-based-blog-renderer",
  title: "switchで組み立てる、型付きブログBlockコンポーネント",
  description:
    "記事本文を型付きBlockとして管理し、switchで表示へ変換する仕組みと、Git、terminal、コーディングエージェントを組み合わせた執筆方法を紹介します。",
  publishedAt: "2026-08-19",
  coverImage: {
    id: "typed-block-renderer-cover",
    src: "/blog/building-a-typed-block-based-blog-renderer/og.png",
    alt: "switchで組み立てる、型付きブログBlockコンポーネントのOGP画像",
    width: 1200,
    height: 630,
  },
  logNumber: 2,
} as const satisfies BlogArticleMeta
