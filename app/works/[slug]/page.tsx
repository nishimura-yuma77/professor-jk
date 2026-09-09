import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import WorkDetailRenderer from "@/components/feature/works/WorkDetailRenderer"
import { getWork } from "@/const/works"
import style from "@/app/works/[slug]/page.module.scss"

const SOCIAL_IMAGE = {
  url: "/images/ogp.png",
  width: 1200,
  height: 630,
  alt: "J.K. Lab",
}

export async function generateMetadata({
  params,
}: PageProps<"/works/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const work = getWork(slug)
  if (!work) return {}

  const title = `${work.code} ${work.title}`
  const description = work.summary[0]

  return {
    title,
    description,
    alternates: {
      canonical: `/works/${work.slug}`,
    },
    openGraph: {
      title: `${work.title} | J.K. Lab Works`,
      description,
      url: `/works/${work.slug}`,
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@jkdeb__",
      title: `${work.title} | J.K. Lab Works`,
      description,
      images: [SOCIAL_IMAGE.url],
    },
  }
}

export default async function WorkDetailPage({
  params,
}: PageProps<"/works/[slug]">) {
  const { slug } = await params
  const work = getWork(slug)

  if (!work) notFound()

  return (
    <main className={style.main}>
      <article className={style.article}>
        <Link href="/works" className={style.back_link}>
          ← WORKS <span>/ {work.code}</span>
        </Link>

        <header className={style.header}>
          <div className={style.identity}>
            <span className={style.code}>{work.category}</span>
            <span className={style.period}>{work.period === "現在" ? "● 現在参画中" : work.period}</span>
          </div>
          <h1>{work.shortTitle}</h1>
          <p className={style.project_title}>{work.title}</p>
          <p className={style.lead}>{work.lead}</p>
        </header>

        <div className={style.content_layout}>
          <aside className={style.facts} aria-label="案件の基本情報">
            <dl>
              <div><dt>ROLE / 役割</dt><dd>{work.role}</dd></div>
              <div><dt>PERIOD / 担当時期</dt><dd>{work.period}</dd></div>
              <div>
                <dt>TEAM / チーム</dt>
                <dd><ul>{work.team.map((member) => <li key={member}>{member}</li>)}</ul></dd>
              </div>
              <div>
                <dt>STACK / 使用技術</dt>
                <dd>
                  <ul className={style.technologies}>
                    {work.technologies.map((technology) => (
                      <li key={technology.name}>
                        {technology.name}
                        {technology.children && <ul>{technology.children.map((child) => <li key={child}>{child}</li>)}</ul>}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </aside>
          <div className={style.content}>
            <WorkDetailRenderer work={work} />
          </div>
        </div>

        <footer className={style.article_footer}>
          <span>{work.code} / END OF RECORD</span>
          <Link href="/works">実務経験一覧へ戻る →</Link>
        </footer>
      </article>
    </main>
  )
}
