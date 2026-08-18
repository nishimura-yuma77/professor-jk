import { PLAY_WANTED_NOTES } from "@/const/playWithJk"
import style from "@/styles/feature/play-with-jk/PlayIdeas.module.scss"

type PlayIdeasProps = {
  className: string
}

export default function PlayIdeas({ className }: PlayIdeasProps) {
  return (
    <section className={className} aria-labelledby="wanted-title">
      <span className={style.tape} aria-hidden="true" />
      <p className={style.kicker}>IDEAS WANTED</p>
      <h2 id="wanted-title">やってみたいを形にする</h2>
      <p className={style.note}>どれかひとつでも、まだ言葉になってなくてもいい。</p>
      <div className={style.notes}>
        {PLAY_WANTED_NOTES.map((note, index) => (
          <article key={note.title} className={style.card}>
            <span aria-hidden="true">{index + 1}</span>
            <h3>{note.title}</h3>
            <p>{note.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
