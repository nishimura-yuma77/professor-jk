"use client"

import type { CSSProperties } from "react"
import BlogArticleCard, {
  type BlogArticleCardArticle,
} from "@/components/feature/blog/BlogArticleCard"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import style from "@/styles/feature/blog/BlogArchiveGrid.module.scss"

const ARTICLE_REVEAL_INTERVAL_MS = 160

export type BlogArchiveEntry = {
  article: BlogArticleCardArticle
  logNumber: number
}

type BlogArchiveGridProps = {
  entries: readonly BlogArchiveEntry[]
}

export default function BlogArchiveGrid({ entries }: BlogArchiveGridProps) {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.15,
    once: true,
  })

  return (
    <div ref={ref} className={style.grid}>
      {entries.map(({ article, logNumber }, index) => (
        <div
          key={article.slug}
          className={`${style.article_reveal} ${
            isVisible ? style.article_reveal_visible : ""
          }`}
          style={{
            "--article-reveal-delay": `${index * ARTICLE_REVEAL_INTERVAL_MS}ms`,
          } as CSSProperties}
        >
          <BlogArticleCard article={article} logNumber={logNumber} />
        </div>
      ))}
    </div>
  )
}
