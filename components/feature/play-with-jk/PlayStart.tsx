import { PLAY_CONTACT, PLAY_STEPS } from "@/const/playWithJk"
import style from "@/styles/feature/play-with-jk/PlayStart.module.scss"

type PlayStartProps = {
  className: string
}

export default function PlayStart({ className }: PlayStartProps) {
  return (
    <section className={className} aria-labelledby="start-title">
      <p className={style.kicker}>HOW TO START</p>
      <h2 id="start-title">始め方は、これだけ</h2>
      <ol className={style.steps}>
        {PLAY_STEPS.map((step) => <li key={step}>{step}</li>)}
      </ol>
      <p className={style.note}>{PLAY_CONTACT.replyNote}</p>
    </section>
  )
}
