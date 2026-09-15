import Link from "next/link"
import type { CSSProperties } from "react"
import { DiPython } from "react-icons/di"
import {
  SiCloudflareworkers,
  SiMediapipe,
  SiTanstack,
  SiTypescript,
} from "react-icons/si"
import ArrowIcon from "@/components/primitives/ArrowIcon"
import type { Experiment } from "@/const/experiments"
import style from "@/styles/feature/experiments/HomeExperimentFileCard.module.scss"

type HomeExperimentFileCardProps = {
  experiment: Experiment
  isVisible: boolean
  revealDelay: number
}

export default function HomeExperimentFileCard({
  experiment,
  isVisible,
  revealDelay,
}: HomeExperimentFileCardProps) {
  const firstSentenceEnd = experiment.description.indexOf("。")
  const summary = firstSentenceEnd === -1
    ? experiment.description
    : experiment.description.slice(0, firstSentenceEnd + 1)
  const isActive = experiment.status === "ACTIVE"
  const titleId = `home-experiment-title-${experiment.slug}`
  const technologies = experiment.code === "EXP_003"
    ? [
        { label: "TanStack Start", Icon: SiTanstack, className: style.tanstack },
        { label: "TypeScript", Icon: SiTypescript, className: style.typescript },
        {
          label: "Cloudflare Workers",
          Icon: SiCloudflareworkers,
          className: style.cloudflare,
        },
      ]
    : [
        {
          label: "Python",
          Icon: DiPython,
          className: style.python,
          isDuotone: true,
        },
        { label: "MediaPipe", Icon: SiMediapipe, className: style.mediapipe },
      ]

  return (
    <article
      className={`${style.card} ${isVisible ? style.visible : ""} ${
        isActive ? style.active : style.paused
      }`}
      style={{ "--file-reveal-delay": `${revealDelay}ms` } as CSSProperties}
      inert={!isVisible}
    >
      <Link
        href={`/experiments/${experiment.slug}`}
        className={style.link}
        aria-labelledby={titleId}
      >
        <span className={style.back_sheet} aria-hidden="true" />
        <span className={style.file_tab} aria-hidden="true">
          {experiment.code}
        </span>

        <div className={style.file_cover}>
          <span className={style.registration_mark} aria-hidden="true" />
          <span className={style.classification}>
            {experiment.visibility} / {experiment.status}
          </span>

          <div className={style.file_content}>
            <p className={style.document_type}>PROJECT DOSSIER</p>
            <h3 id={titleId} className={style.title}>{experiment.title}</h3>
            <p className={style.summary}>{summary}</p>
          </div>

          <footer className={style.file_footer}>
            <ul className={style.technology_icons} aria-label="主要技術">
              {technologies.map(({ label, Icon, className, isDuotone }) => (
                <li
                  key={label}
                  className={`${style.technology_icon} ${className}`}
                  title={label}
                >
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
        </div>
      </Link>
    </article>
  )
}
