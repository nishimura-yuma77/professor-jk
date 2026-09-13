import Link from "next/link"
import type { CSSProperties } from "react"
import type { Work } from "@/const/works"
import ArrowIcon from "@/components/primitives/ArrowIcon"
import cardStyle from "@/styles/feature/works/WorkCardBase.module.scss"
import style from "@/styles/feature/works/WorkCard.module.scss"

type WorkCardProps = {
  work: Work
  index: number
  headingLevel?: 2 | 3
}

export default function WorkCard({ work, index, headingLevel = 2 }: WorkCardProps) {
  const isCurrent = work.period === "現在"
  const Heading = headingLevel === 3 ? "h3" : "h2"
  const titleId = `work-title-${work.slug}`
  const actionId = `work-action-${work.slug}`

  return (
    <article
      className={`${cardStyle.card} ${style.card}`}
      style={{ "--reveal-delay": `${index * 100 + 160}ms` } as CSSProperties}
      aria-labelledby={titleId}
    >
      <Link
        href={`/works/${work.slug}`}
        className={cardStyle.link}
        aria-labelledby={`${titleId} ${actionId}`}
      >
        <div className={cardStyle.identity}>
          <span>{work.code}</span>
          <span className={cardStyle.period}>
            {isCurrent && <span className={cardStyle.status_dot} aria-hidden="true" />}
            {isCurrent ? "現在参画中" : work.period}
          </span>
        </div>

        <div className={style.overview}>
          <header className={style.heading}>
            <Heading id={titleId} className={cardStyle.title}>{work.shortTitle}</Heading>
            <p className={style.lead}>{work.lead}</p>
            <p className={style.role}><span>ROLE</span>{work.role}</p>
          </header>
          <div className={style.stack}>
            <p className={cardStyle.stack_label}>TECH STACK</p>
            <ul className={`${cardStyle.technologies} ${style.technologies}`} aria-label="使用技術">
              {work.technologies.map((technology) => <li key={technology.name}>{technology.name}</li>)}
            </ul>
          </div>
        </div>

        <div className={cardStyle.action}>
          <span id={actionId}>担当内容を見る</span>
          <span className={cardStyle.arrow} aria-hidden="true"><ArrowIcon /></span>
        </div>
      </Link>
    </article>
  )
}
