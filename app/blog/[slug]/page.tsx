import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import ArticleRenderer from "@/components/feature/blog/ArticleRenderer"
import PageBackground from "@/components/ui/PageBackground"
import { getBlogArticle } from "@/const/blog"
import style from "@/app/blog/[slug]/page.module.scss"

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const article = getBlogArticle(slug)

  if (!article) return {}

  const socialImage = {
    url: `/blog/${article.slug}/og.png`,
    width: 1200,
    height: 630,
    alt: `${article.title} | J.K. Lab`,
  }

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
    openGraph: {
      type: "article",
      title: `${article.title} | J.K. Lab`,
      description: article.description,
      url: `/blog/${article.slug}`,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@jkdeb__",
      title: `${article.title} | J.K. Lab`,
      description: article.description,
      images: [socialImage.url],
    },
  }
}

function formatDate(date: string) {
  return date.replaceAll("-", ".")
}

export default async function BlogArticlePage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params
  const article = getBlogArticle(slug)

  if (!article) notFound()

  return (
    <PageBackground className={style.main}>
      <article className={style.article}>
        <Link href="/blog" className={style.back_link}>
          ← BACK TO LOG INDEX
        </Link>

        <header className={style.header}>
          <div className={style.meta}>
            <span>RESEARCH LOG</span>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            {article.updatedAt && (
              <span>
                UPDATED <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
              </span>
            )}
          </div>
          <h1>{article.title}</h1>
          <p>{article.description}</p>
        </header>

        <figure className={style.cover}>
          <Image
            src={article.coverImage.src}
            alt={article.coverImage.alt}
            width={article.coverImage.width}
            height={article.coverImage.height}
            sizes="(min-width: 768px) 48rem, calc(100vw - 3rem)"
            priority
          />
        </figure>

        <ArticleRenderer blocks={article.blocks} />

        <footer className={style.article_footer}>
          <span>END OF LOG</span>
          <Link href="/blog">記録一覧へ戻る →</Link>
        </footer>
      </article>
    </PageBackground>
  )
}
