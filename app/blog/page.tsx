import type { Metadata } from "next"
import BlogArchiveGrid, {
  type BlogArchiveEntry,
} from "@/components/feature/blog/BlogArchiveGrid"
import ArchiveOnlineStatus from "@/components/primitives/ArchiveOnlineStatus"
import PageBackground from "@/components/ui/PageBackground"
import { getBlogArticleLogNumber, getBlogArticles } from "@/const/blog"
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
  const archiveEntries: BlogArchiveEntry[] = articles.map((article) => ({
    article: {
      slug: article.slug,
      title: article.title,
      publishedAt: article.publishedAt,
      coverImage: article.coverImage,
    },
    logNumber: getBlogArticleLogNumber(article.slug),
  }))

  return (
    <PageBackground className={style.main}>
      <section className={style.hero} aria-labelledby="blog-title">
        <ArchiveOnlineStatus label="ARCHIVE ONLINE" />
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
          <BlogArchiveGrid entries={archiveEntries} />
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
