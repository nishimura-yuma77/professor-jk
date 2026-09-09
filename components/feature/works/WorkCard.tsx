import Link from "next/link"
import type { CSSProperties } from "react"
import type { Work } from "@/const/works"
import ArrowIcon from "@/components/primitives/ArrowIcon"
import style from "@/styles/feature/works/WorkCard.module.scss"

type WorkCardProps = {
  work: Work
  index: number
  headingLevel?: 2 | 3
}

export default function WorkCard({ work, index, headingLevel = 2 }: WorkCardProps) {
  const isCurrent = work.period === "現在"
  const Heading = headingLevel === 3 ? "h3" : "h2"

  return (
    <article
      className={style.card}
      style={{ "--reveal-delay": `${index * 100 + 160}ms` } as CSSProperties}
      aria-labelledby={`work-title-${work.slug}`}
    >
      <header className={style.header}>
        <div className={style.identity}>
          <span className={style.code}>{work.code}</span>
          <span className={style.period}>
            {isCurrent && <span className={style.status_dot} aria-hidden="true" />}
            {isCurrent ? "現在参画中" : work.period}
          </span>
        </div>
        <Heading id={`work-title-${work.slug}`} className={style.title}>{work.shortTitle}</Heading>
      </header>

      <p className={style.lead}>{work.lead}</p>

      <div className={style.footer}>
        <dl className={style.facts}>
          <div className={style.role_fact}>
            <dt>役割</dt>
            <dd className={style.role}>{work.role}</dd>
          </div>
          <div>
            <dt>使用技術</dt>
            <dd className={style.technologies}>
              {work.technologies.map((technology) => (
                <span key={technology.name} className={style.technology}>{technology.name}</span>
              ))}
              {work.technologies.length > 3 && (
                <span className={style.technology_more} aria-label={`ほか${work.technologies.length - 3}件`}>
                  +{work.technologies.length - 3}
                </span>
              )}
            </dd>
          </div>
        </dl>
        <Link
          href={`/works/${work.slug}`}
          className={style.detail_link}
          aria-label={`${work.shortTitle}の担当内容を見る`}
        >
          担当内容を見る <ArrowIcon />
        </Link>
      </div>
    </article>
  )
}
