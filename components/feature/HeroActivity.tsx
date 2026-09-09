import Link from "next/link"
import ArrowIcon from "@/components/primitives/ArrowIcon"
import { getBlogArticles } from "@/const/blog"
import { EXPERIMENTS } from "@/const/experiments"
import { PLAY_AVAILABILITY } from "@/const/playWithJk"
import style from "@/styles/feature/HeroSection.module.scss"

export default function HeroActivity() {
  const activeExperiments = EXPERIMENTS.filter((experiment) => experiment.status === "ACTIVE")
  const currentExperiment = activeExperiments.find(
    (experiment) => experiment.code === PLAY_AVAILABILITY.currentExperimentCode,
  ) ?? activeExperiments[0]
  const latestArticle = getBlogArticles().find((article) => !article.draft)

  if (!currentExperiment && !latestArticle) return null

  return (
    <nav className={style.activity} aria-label="ラボの最新情報">
      {currentExperiment && (
        <Link href={`/experiments/${currentExperiment.slug}`} className={style.activity_link}>
          <span className={style.activity_meta}>
            <span className={style.activity_label}>
              <span className={style.activity_dot} aria-hidden="true" />
              NOW BUILDING
            </span>
            <span>{currentExperiment.code}</span>
          </span>
          <span className={style.activity_title}>
            <span>{currentExperiment.title}</span>
            <ArrowIcon className={style.activity_arrow} />
          </span>
          <span className={style.activity_description}>
            {currentExperiment.description.split("\n")[0]}
          </span>
        </Link>
      )}
      {latestArticle && (
        <Link href={`/blog/${latestArticle.slug}`} className={style.activity_link}>
          <span className={style.activity_meta}>
            <span className={style.activity_label}>LATEST LOG</span>
            <time dateTime={latestArticle.publishedAt}>
              {latestArticle.publishedAt.replaceAll("-", ".")}
            </time>
          </span>
          <span className={style.activity_title}>
            <span>{latestArticle.title}</span>
            <ArrowIcon className={style.activity_arrow} />
          </span>
          <span className={style.activity_description}>設計の判断と、開発の試行錯誤を読む</span>
        </Link>
      )}
    </nav>
  )
}
