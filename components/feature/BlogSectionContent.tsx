"use client"

import { useState, type CSSProperties } from "react"
import SectionContainer from "@/components/primitives/SectionContainer"
import SectionTitle from "@/components/primitives/SectionTitle"
import ArchiveLink from "@/components/ui/ArchiveLink"
import BlogArticleCard, {
  type BlogArticleCardArticle,
} from "@/components/feature/blog/BlogArticleCard"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import style from "@/styles/feature/BlogSection.module.scss"

const ARTICLE_REVEAL_INTERVAL_MS = 160
const ARCHIVE_LINK_REVEAL_DELAY_MS = 180

export type HomeBlogArticle = {
  article: BlogArticleCardArticle
  logNumber: number
}

type BlogSectionContentProps = {
  articles: readonly HomeBlogArticle[]
}

export default function BlogSectionContent({ articles }: BlogSectionContentProps) {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ once: true })
  const [isContentVisible, setIsContentVisible] = useState(false)
  const archiveLinkDelay = articles.length * ARTICLE_REVEAL_INTERVAL_MS
    + ARCHIVE_LINK_REVEAL_DELAY_MS

  return (
    <SectionContainer ref={ref}>
      <SectionTitle
        title="003_BLOG"
        subtitle="LATEST LOGS"
        isVisible={isVisible}
        onAnimationEnd={() => setIsContentVisible(true)}
      />

      <div className={style.blog_area}>
        {articles.length > 0 ? (
          <div className={style.article_grid}>
            {articles.map(({ article, logNumber }, index) => (
              <div
                key={article.slug}
                className={`${style.article_reveal} ${
                  isContentVisible ? style.article_reveal_visible : ""
                }`}
                style={{
                  "--article-reveal-delay": `${index * ARTICLE_REVEAL_INTERVAL_MS}ms`,
                } as CSSProperties}
              >
                <BlogArticleCard article={article} logNumber={logNumber} />
              </div>
            ))}
          </div>
        ) : (
          <p className={style.empty}>NO LOGS FOUND</p>
        )}

        <ArchiveLink
          href="/blog"
          kicker="ARCHIVE INDEX"
          label="すべての研究ログを見る"
          isVisible={isContentVisible}
          revealDelay={archiveLinkDelay}
        />
      </div>
    </SectionContainer>
  )
}
