import type { Metadata } from "next"
import BlogArticleCard from "@/components/feature/blog/BlogArticleCard"
import PageBackground from "@/components/ui/PageBackground"
import { getBlogArticles } from "@/const/blog"
import style from "@/app/blog/page.module.scss"

const description = "J.K.教授の開発、実験、失敗と発見を保存する研究ログ。"

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | J.K. Lab",
    description,
    url: "/blog",
  },
}

export default function BlogPage() {
  const articles = getBlogArticles()

  return (
    <PageBackground className={style.main}>
      <section className={style.hero} aria-labelledby="blog-title">
        <div className={style.eyebrow}>
          <span aria-hidden="true">●</span>
          ARCHIVE ONLINE
        </div>
        <h1 id="blog-title">BLOG</h1>
        <p>実験、実装、考えごと。J.K. Labから回収された研究ログ。</p>
        <div className={style.status} aria-hidden="true">
          <span>RECORDS: {String(articles.length).padStart(3, "0")}</span>
          <span>ACCESS: PUBLIC</span>
        </div>
      </section>

      <section className={style.archive} aria-labelledby="archive-title">
        <div className={style.section_heading}>
          <p>LOG INDEX</p>
          <h2 id="archive-title">記録一覧</h2>
        </div>

        {articles.length > 0 ? (
          <div className={style.grid}>
            {articles.map((article, index) => (
              <BlogArticleCard key={article.slug} article={article} index={index} />
            ))}
          </div>
        ) : (
          <div className={style.empty}>
            <p>NO LOGS FOUND</p>
            <span>現在、公開中の研究記録はありません。</span>
          </div>
        )}
      </section>
    </PageBackground>
  )
}
