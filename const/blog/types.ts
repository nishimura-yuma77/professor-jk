import type { ArticleBlock, ArticleImage } from "@/const/article"

export type BlogArticleMeta = {
  slug: string
  title: string
  description: string
  publishedAt: string
  updatedAt?: string
  draft?: boolean
  coverImage?: ArticleImage
  logNumber: number
}

export type BlogArticle = Omit<BlogArticleMeta, "coverImage"> & {
  coverImage: ArticleImage
  blocks: readonly ArticleBlock[]
}

export type BlogArticleRegistryEntry = {
  directorySlug: string
  meta: BlogArticleMeta
  content: readonly ArticleBlock[]
}
