import { PLAY_MONEY_NOTE, PLAY_RULES } from "@/const/playWithJk"
import style from "@/styles/feature/play-with-jk/PlayRules.module.scss"

type PlayRulesProps = {
  className: string
}

export default function PlayRules({ className }: PlayRulesProps) {
  return (
    <section className={className} aria-labelledby="rules-title">
      <span className={style.tape} aria-hidden="true" />
      <p className={style.kicker}>BEFORE WE PLAY</p>
      <h2 id="rules-title">遊ぶ前の約束</h2>
      <ol className={style.rules}>
        {PLAY_RULES.map((rule, index) => (
          <li key={rule.title}>
            <span>{index + 1}</span>
            <div>
              <h3>{rule.title}</h3>
              <p>{rule.description}</p>
            </div>
          </li>
        ))}
      </ol>
      <aside className={style.money} aria-label="金銭に関する考え方">
        <strong>{PLAY_MONEY_NOTE.quote}</strong>
        <p>{PLAY_MONEY_NOTE.description}</p>
      </aside>
    </section>
  )
}
