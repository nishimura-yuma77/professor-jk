import { content as buildingJkLabContent } from "@/const/blog/building-jk-lab-as-an-activity-base/content"
import { meta as buildingJkLabMeta } from "@/const/blog/building-jk-lab-as-an-activity-base/meta"
import { content as typedBlockRendererContent } from "@/const/blog/building-a-typed-block-based-blog-renderer/content"
import { meta as typedBlockRendererMeta } from "@/const/blog/building-a-typed-block-based-blog-renderer/meta"
import { content as searchConsoleContent } from "@/const/blog/search-console-page-with-redirect/content"
import { meta as searchConsoleMeta } from "@/const/blog/search-console-page-with-redirect/meta"
import type { BlogArticle } from "@/const/blog/types"

const BLOG_ARTICLES = [
  { ...buildingJkLabMeta, blocks: buildingJkLabContent },
  { ...typedBlockRendererMeta, blocks: typedBlockRendererContent },
  { ...searchConsoleMeta, blocks: searchConsoleContent },
] as const satisfies readonly BlogArticle[]

export function getBlogArticles(): readonly BlogArticle[] {
  return [...BLOG_ARTICLES].sort(
    (a, b) =>
      b.publishedAt.localeCompare(a.publishedAt) || b.logNumber - a.logNumber,
  )
}

export function getBlogArticle(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find((article) => article.slug === slug)
}

export function getBlogArticleLogNumber(slug: string): number {
  const article = getBlogArticle(slug)
  if (!article) {
    throw new Error(`Blog article not found: ${slug}`)
  }

  return article.logNumber
}

export function getBlogArticleSlugs(): readonly string[] {
  return BLOG_ARTICLES.map((article) => article.slug)
}
