import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import ArticleRenderer from "@/components/feature/blog/ArticleRenderer"
import ExperimentStatusBadge from "@/components/primitives/ExperimentStatusBadge"
import StackChip from "@/components/primitives/StackChip"
import GithubLinkIcon from "@/components/ui/GithubLinkIcon"
import PageBackground from "@/components/ui/PageBackground"
import { getExperimentDetail } from "@/const/experimentDetails"
import { getExperiment } from "@/const/experiments"
import style from "@/app/experiments/[slug]/page.module.scss"

export async function generateMetadata({
  params,
}: PageProps<"/experiments/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const experiment = getExperiment(slug)
  if (!experiment) return {}

  const socialImage = {
    url: `/experiments/${experiment.slug}/og.png`,
    width: 1200,
    height: 630,
    alt: `${experiment.title} | J.K. Lab Experiments`,
  }

  return {
    title: `${experiment.code} ${experiment.title}`,
    description: experiment.description.replaceAll("\n", " "),
    alternates: {
      canonical: `/experiments/${experiment.slug}`,
    },
    openGraph: {
      title: `${experiment.title} | J.K. Lab Experiments`,
      description: experiment.description.replaceAll("\n", " "),
      url: `/experiments/${experiment.slug}`,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@jkdeb__",
      title: `${experiment.title} | J.K. Lab Experiments`,
      description: experiment.description.replaceAll("\n", " "),
      images: [socialImage.url],
    },
  }
}

export default async function ExperimentDetailPage({
  params,
}: PageProps<"/experiments/[slug]">) {
  const { slug } = await params
  const experiment = getExperiment(slug)
  const detail = getExperimentDetail(slug)

  if (!experiment || !detail) notFound()

  return (
    <PageBackground className={style.main}>
      <article className={style.article}>
        <Link href="/experiments" className={style.back_link}>
          ← BACK TO EXPERIMENT INDEX
        </Link>

        <header className={style.header}>
          <div className={style.identity}>
            <span className={style.code}>{experiment.code}</span>
            <div className={style.state_group}>
              <span className={`${style.visibility} ${
                experiment.visibility === "PUBLIC" ? style.public : style.private
              }`}>
                {experiment.visibility}
              </span>
              <div className={style.progress_status}>
                <ExperimentStatusBadge status={experiment.status} className={style.status} />
              </div>
            </div>
          </div>
          <h1>{experiment.title}</h1>
          {experiment.subtitle && <p className={style.subtitle}>{experiment.subtitle}</p>}
          <p className={style.description}>{experiment.description}</p>
        </header>

        <section className={style.project_data} aria-label="実験データ">
          <div className={`${style.data_card} ${style.stacks_card}`}>
            <p className={style.data_label}>STACKS</p>
            <div className={style.stacks}>
              {experiment.stacks.map((stack) => <StackChip key={stack} text={stack} />)}
            </div>
          </div>
          {experiment.media && experiment.media.length > 0 && (
            <div className={`${style.data_card} ${style.links_card}`}>
              <p className={style.data_label}>EXTERNAL LINKS</p>
              <div className={style.links}>
                {experiment.media.map((media) => media.type === "GITHUB" ? (
                  <GithubLinkIcon
                    key={media.href}
                    href={media.href}
                    className={style.external_link_icon}
                  />
                ) : (
                  <a key={media.href} href={media.href} target="_blank" rel="noopener noreferrer">
                    {media.type} <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </section>

        <div className={style.content}>
          <ArticleRenderer blocks={detail.blocks} />
        </div>

        <footer className={style.article_footer}>
          <span>END OF EXPERIMENT FILE</span>
          <Link href="/experiments">実験一覧へ戻る →</Link>
        </footer>
      </article>
    </PageBackground>
  )
}
