import type { CSSProperties } from "react"
import style from "@/styles/feature/contact/ContactGuideHintList.module.scss"

type ContactGuideHintListProps = {
  hints: readonly string[]
}

export default function ContactGuideHintList({
  hints,
}: ContactGuideHintListProps) {
  return (
    <section className={style.container} aria-label="書いてほしい内容">
      <p className={style.title}>WRITING POINTS</p>
      <ol>
        {hints.map((hint, index) => (
          <li
            key={hint}
            style={{
              "--hint-delay": `${index * 60}ms`,
            } as CSSProperties}
          >
            <span className={style.number} aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{hint}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}
