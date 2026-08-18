import { PLAY_TOOLKIT } from "@/const/playWithJk"
import style from "@/styles/feature/play-with-jk/PlayToolkit.module.scss"

type PlayToolkitProps = {
  className: string
}

export default function PlayToolkit({ className }: PlayToolkitProps) {
  return (
    <section className={className} aria-labelledby="toolkit-title">
      <span className={style.tape} aria-hidden="true" />
      <p className={style.kicker}>J.K.&apos;S TOOLBOX</p>
      <h2 id="toolkit-title">{PLAY_TOOLKIT.title}</h2>
      <p className={style.description}>{PLAY_TOOLKIT.description}</p>
      <ol className={style.actions}>
        {PLAY_TOOLKIT.actions.map((action) => <li key={action}>{action}</li>)}
      </ol>
      <ul className={style.skills} aria-label="持ち寄れる技術">
        {PLAY_TOOLKIT.skills.map((skill) => <li key={skill}>{skill}</li>)}
      </ul>
    </section>
  )
}
