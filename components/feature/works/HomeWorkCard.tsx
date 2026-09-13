import Link from "next/link"
import ArrowIcon from "@/components/primitives/ArrowIcon"
import type { Work } from "@/const/works"
import style from "@/styles/feature/works/WorkCardBase.module.scss"

export default function HomeWorkCard({ work }: { work: Work }) {
  const isCurrent = work.period === "現在"
  const titleId = `home-work-title-${work.slug}`
  const actionId = `home-work-action-${work.slug}`

  return (
    <article className={style.card}>
      <Link
        href={`/works/${work.slug}`}
        className={style.link}
        aria-labelledby={`${titleId} ${actionId}`}
      >
        <div className={style.identity}>
          <span>{work.code}</span>
          <span className={style.period}>
            {isCurrent && <span className={style.status_dot} aria-hidden="true" />}
            {isCurrent ? "参画中" : work.period}
          </span>
        </div>

        <div className={style.heading}>
          <h3 id={titleId} className={style.title}>{work.shortTitle}</h3>
        </div>

        <p className={style.stack_label}>TECH STACK</p>
        <ul className={style.technologies} aria-label="使用技術">
          {work.technologies.map((technology) => (
            <li key={technology.name}>{technology.name}</li>
          ))}
        </ul>

        <div className={style.action}>
          <span id={actionId}>担当内容を見る</span>
          <span className={style.arrow} aria-hidden="true"><ArrowIcon /></span>
        </div>
      </Link>
    </article>
  )
}
