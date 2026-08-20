import "server-only"
import type { ArticleBlock } from "@/const/article"
import type { BlogArticle, BlogArticleMeta } from "@/const/blog/types"
import { BLOG_ARTICLE_ENTRIES } from "@/const/blog/registry.generated"

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function isValidDate(value: string) {
  if (!DATE_PATTERN.test(value)) return false

  const date = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value)
}

function parseMeta(value: unknown, directorySlug: string): BlogArticleMeta {
  if (!isRecord(value)) {
    throw new Error(`Blog article "${directorySlug}" must export a meta object.`)
  }

  const { slug, title, description, publishedAt, updatedAt, draft, logNumber } = value

  if (typeof slug !== "string" || !SLUG_PATTERN.test(slug)) {
    throw new Error(`Blog article "${directorySlug}" has an invalid meta.slug.`)
  }
  if (slug !== directorySlug) {
    throw new Error(
      `Blog article directory "${directorySlug}" does not match meta.slug "${slug}".`,
    )
  }
  if (typeof title !== "string" || title.trim() === "") {
    throw new Error(`Blog article "${slug}" must have a title.`)
  }
  if (typeof description !== "string" || description.trim() === "") {
    throw new Error(`Blog article "${slug}" must have a description.`)
  }
  if (typeof publishedAt !== "string" || !isValidDate(publishedAt)) {
    throw new Error(`Blog article "${slug}" has an invalid publishedAt date.`)
  }
  if (updatedAt !== undefined) {
    if (typeof updatedAt !== "string" || !isValidDate(updatedAt)) {
      throw new Error(`Blog article "${slug}" has an invalid updatedAt date.`)
    }
    if (updatedAt < publishedAt) {
      throw new Error(`Blog article "${slug}" has updatedAt before publishedAt.`)
    }
  }
  if (draft !== undefined && typeof draft !== "boolean") {
    throw new Error(`Blog article "${slug}" has an invalid draft value.`)
  }
  if (typeof logNumber !== "number" || !Number.isInteger(logNumber) || logNumber < 1) {
    throw new Error(`Blog article "${slug}" must have a positive integer logNumber.`)
  }

  return value as BlogArticleMeta
}

function parseContent(value: unknown, slug: string): readonly ArticleBlock[] {
  if (!Array.isArray(value)) {
    throw new Error(`Blog article "${slug}" must export a content array.`)
  }
  if (value.length === 0) {
    throw new Error(`Blog article "${slug}" must have at least one content block.`)
  }

  return value as readonly ArticleBlock[]
}

function createBlogArticles(): readonly BlogArticle[] {
  const articles = BLOG_ARTICLE_ENTRIES.map(({ directorySlug, meta, content }) => {
    const parsedMeta = parseMeta(meta, directorySlug)

    return {
      ...parsedMeta,
      coverImage: parsedMeta.coverImage ?? {
        id: `${parsedMeta.slug}-generated-cover`,
        src: `/blog/${parsedMeta.slug}/og.png`,
        alt: `${parsedMeta.title}のOGP画像`,
        width: 1200,
        height: 630,
      },
      blocks: parseContent(content, directorySlug),
    }
  })

  const articleSlugs = new Set<string>()
  const logNumbers = new Set<number>()

  for (const article of articles) {
    if (articleSlugs.has(article.slug)) {
      throw new Error(`Duplicate blog article slug: ${article.slug}`)
    }
    if (logNumbers.has(article.logNumber)) {
      throw new Error(`Duplicate blog article logNumber: ${article.logNumber}`)
    }

    articleSlugs.add(article.slug)
    logNumbers.add(article.logNumber)
  }

  return articles
}

const BLOG_ARTICLES = createBlogArticles()

function getVisibleBlogArticles() {
  return process.env.NODE_ENV === "production"
    ? BLOG_ARTICLES.filter((article) => !article.draft)
    : BLOG_ARTICLES
}

export function getBlogArticles(): readonly BlogArticle[] {
  return [...getVisibleBlogArticles()].sort(
    (a, b) =>
      b.publishedAt.localeCompare(a.publishedAt) || b.logNumber - a.logNumber,
  )
}

export function getBlogArticle(slug: string): BlogArticle | undefined {
  return getVisibleBlogArticles().find((article) => article.slug === slug)
}

export function getBlogArticleLogNumber(slug: string): number {
  const article = getBlogArticle(slug)
  if (!article) {
    throw new Error(`Blog article not found: ${slug}`)
  }

  return article.logNumber
}

export function getBlogArticleSlugs(): readonly string[] {
  return getVisibleBlogArticles().map((article) => article.slug)
}
