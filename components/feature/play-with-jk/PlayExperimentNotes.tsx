import { EXPERIMENTS, type Experiment } from "@/const/experiments"
import { PLAY_EXPERIMENT_CODES } from "@/const/playWithJk"
import style from "@/styles/feature/play-with-jk/PlayExperimentNotes.module.scss"

type PlayExperimentNotesProps = {
  className: string
}

const featuredExperiments = PLAY_EXPERIMENT_CODES
  .map((code) => EXPERIMENTS.find((experiment) => experiment.code === code))
  .filter((experiment) => experiment !== undefined)

function ExperimentNote({ experiment }: { experiment: Experiment }) {
  const isActive = experiment.status === "ACTIVE"

  return (
    <article
      id={`experiment-${experiment.code.toLowerCase()}`}
      className={style.card}
    >
      <header>
        <span>{experiment.code}</span>
        <span className={isActive ? style.active : style.paused}>
          {isActive ? "ACTIVE / 実験中" : "PAUSED / ひと休み"}
        </span>
      </header>
      <h3>{experiment.title}</h3>
      {experiment.subtitle && <p className={style.subtitle}>{experiment.subtitle}</p>}
      <p className={style.description}>{experiment.description}</p>
      <ul className={style.stacks} aria-label="使用技術">
        {experiment.stacks.map((stack) => <li key={stack}>{stack}</li>)}
      </ul>
      {experiment.media && experiment.media.length > 0 && (
        <div className={style.links}>
          {experiment.media.map((media) => (
            <a key={media.href} href={media.href} target="_blank" rel="noopener noreferrer">
              {media.type} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      )}
    </article>
  )
}

export default function PlayExperimentNotes({ className }: PlayExperimentNotesProps) {
  return (
    <section className={className} aria-labelledby="experiments-title">
      <p className={style.kicker}>EXPERIMENT NOTES</p>
      <h2 id="experiments-title">実験ノート</h2>
      <p className={style.note}>成功も停止も、そのまま壁に残しておく。</p>
      <div className={style.notes}>
        {featuredExperiments.map((experiment) => (
          <ExperimentNote key={experiment.code} experiment={experiment} />
        ))}
      </div>
    </section>
  )
}
