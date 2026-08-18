import Image from "next/image"
import Link from "next/link"
import type { BlogArticle } from "@/const/blog"
import style from "@/styles/feature/blog/BlogArticleCard.module.scss"

type BlogArticleCardProps = {
  article: BlogArticle
  index: number
}

function formatDate(date: string) {
  return date.replaceAll("-", ".")
}

export default function BlogArticleCard({ article, index }: BlogArticleCardProps) {
  return (
    <article className={style.card}>
      <Link href={`/blog/${article.slug}`} className={style.link}>
        <div className={style.visual}>
          {article.coverImage ? (
            <Image
              src={article.coverImage.src}
              alt={article.coverImage.alt}
              width={article.coverImage.width}
              height={article.coverImage.height}
              sizes="(min-width: 941px) 19.25rem, (min-width: 768px) 33vw, 6rem"
              className={style.image}
            />
          ) : (
            <span className={style.placeholder} aria-hidden="true">NO IMAGE</span>
          )}
          <span className={style.index} aria-hidden="true">
            LOG_{String(index + 1).padStart(3, "0")}
          </span>
        </div>
        <div className={style.body}>
          <h2>{article.title}</h2>
          <time dateTime={article.publishedAt} className={style.date}>
            {formatDate(article.publishedAt)}
          </time>
        </div>
      </Link>
    </article>
  )
}
