import type { ArticleBlock, ArticleImage } from "@/const/article"

export type BlogArticleMeta = {
  slug: string
  title: string
  description: string
  publishedAt: string
  updatedAt?: string
  coverImage?: ArticleImage
  logNumber: number
}

export type BlogArticle = BlogArticleMeta & {
  blocks: readonly ArticleBlock[]
}
