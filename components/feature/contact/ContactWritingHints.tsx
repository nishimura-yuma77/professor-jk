import type { ContactGuide as ContactGuideData } from "@/const/contactGuide"
import style from "@/styles/feature/contact/ContactWritingHints.module.scss"

type ContactWritingHintsProps = {
  guide: ContactGuideData
}

export default function ContactWritingHints({ guide }: ContactWritingHintsProps) {
  return (
    <aside
      id="message-writing-guide"
      className={style.container}
      aria-label="お問い合わせ内容の書き方ガイド"
    >
      <div className={style.header}>
        <span>WRITING GUIDE</span>
        <span>{guide.label}</span>
      </div>
      <ul>
        {guide.hints.map((hint) => (
          <li key={hint}>{hint}</li>
        ))}
      </ul>
    </aside>
  )
}
