import Link from "next/link"
import { DiLaravel, DiPhp, DiPython, DiReact } from "react-icons/di"
import { FaAws } from "react-icons/fa6"
import ArrowIcon from "@/components/primitives/ArrowIcon"
import type { Work } from "@/const/works"
import style from "@/styles/feature/works/HomeWorkCard.module.scss"

export default function HomeWorkCard({ work }: { work: Work }) {
  const isCurrent = work.period === "現在"
  const titleId = `home-work-title-${work.slug}`
  const recordNumber = work.code.replace("WORK_", "")
  const firstSentenceEnd = work.lead.indexOf("。")
  const summary = firstSentenceEnd === -1
    ? work.lead
    : work.lead.slice(0, firstSentenceEnd + 1)
  const technologies = work.code === "WORK_002"
    ? [
        { label: "AWS", Icon: FaAws, className: style.aws },
        { label: "React", Icon: DiReact, className: style.react },
        { label: "Python", Icon: DiPython, className: style.python, isDuotone: true },
      ]
    : [
        { label: "PHP", Icon: DiPhp, className: style.php },
        { label: "Laravel", Icon: DiLaravel, className: style.laravel },
      ]

  return (
    <article className={`${style.card} ${isCurrent ? style.current : style.archived}`}>
      <Link
        href={`/works/${work.slug}`}
        className={style.link}
        aria-labelledby={titleId}
      >
        <span className={style.record_number} aria-hidden="true">{recordNumber}</span>
        <header className={style.meta}>
          <span className={style.code}>{work.code}</span>
          <span className={style.separator} aria-hidden="true">·</span>
          <span className={style.period}>
            {isCurrent && <span className={style.status_dot} aria-hidden="true" />}
            {isCurrent ? "ACTIVE" : `ARCHIVED / ${work.period}`}
          </span>
        </header>

        <div className={style.summary}>
          <h3 id={titleId} className={style.title}>{work.shortTitle}</h3>
          <p className={style.lead}>{summary}</p>
        </div>

        <footer className={style.footer}>
          <ul className={style.technology_icons} aria-label="主要技術">
            {technologies.map(({ label, Icon, className, isDuotone }) => (
              <li key={label} className={`${style.technology_icon} ${className}`} title={label}>
                <Icon aria-hidden="true" focusable="false" />
                {isDuotone && (
                  <Icon
                    className={style.python_yellow}
                    aria-hidden="true"
                    focusable="false"
                  />
                )}
                <span className={style.visually_hidden}>{label}</span>
              </li>
            ))}
          </ul>
          <ArrowIcon direction="right" className={style.arrow} />
        </footer>
      </Link>
    </article>
  )
}
