import PlayAvailabilityBadge from "@/components/feature/play-with-jk/PlayAvailabilityBadge"
import { EXPERIMENTS } from "@/const/experiments"
import { CURRENT_PLAY_AVAILABILITY, PLAY_AVAILABILITY } from "@/const/playWithJk"
import style from "@/styles/feature/play-with-jk/PlayAvailability.module.scss"

export default function PlayAvailability() {
  const isOpen = PLAY_AVAILABILITY.status === "OPEN"
  const currentProject = isOpen
    ? undefined
    : EXPERIMENTS.find((experiment) => experiment.code === PLAY_AVAILABILITY.currentExperimentCode)

  return (
    <section
      className={`${style.availability} ${isOpen ? style.open : style.closed}`}
      aria-labelledby="availability-title"
    >
      <span className={style.tape} aria-hidden="true" />
      <div className={style.copy}>
        <PlayAvailabilityBadge />
        <h2 id="availability-title">{CURRENT_PLAY_AVAILABILITY.title}</h2>
        <div className={style.description}>
          {CURRENT_PLAY_AVAILABILITY.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </div>

      {currentProject && (
        <article className={style.current_project}>
          <header>
            <span>NOW IN PROGRESS</span>
            <span>{currentProject.code}</span>
          </header>
          <h3>{currentProject.title}</h3>
          {currentProject.subtitle && <p className={style.subtitle}>{currentProject.subtitle}</p>}
          <p className={style.project_description}>{currentProject.description}</p>
          <a href={`#experiment-${currentProject.code.toLowerCase()}`}>
            実験記録を見る <span aria-hidden="true">↓</span>
          </a>
        </article>
      )}
    </section>
  )
}
