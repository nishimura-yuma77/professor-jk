import type { BlogArticleMeta } from "@/const/blog/types"

export const meta = {
  slug: "building-a-blog-management-system",
  title: "記事データからSkillまで、ブログ管理システムを組み立てた",
  description:
    "表示Components、オブジェクトベースの記事データ、生成スクリプトを組み合わせ、リポジトリをエージェントにも扱いやすい知識基盤にしたブログ管理システムを紹介します。",
  publishedAt: "2026-08-20",
  draft: true,
  logNumber: 4,
} as const satisfies BlogArticleMeta
