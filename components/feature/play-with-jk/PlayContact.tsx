import Link from "next/link"
import PlayAvailabilityBadge from "@/components/feature/play-with-jk/PlayAvailabilityBadge"
import { CURRENT_PLAY_AVAILABILITY, PLAY_CONTACT } from "@/const/playWithJk"
import style from "@/styles/feature/play-with-jk/PlayContact.module.scss"

export default function PlayContact() {
  return (
    <section className={style.contact} aria-labelledby="play-contact-title">
      <span className={style.tape} aria-hidden="true" />
      <p className={style.kicker}>KNOCK, KNOCK.</p>
      <PlayAvailabilityBadge className={style.status} />
      <h2 id="play-contact-title">{PLAY_CONTACT.title}</h2>
      <p className={style.description}>{CURRENT_PLAY_AVAILABILITY.contactDescription}</p>
      <Link href="/contact" className={style.link}>
        <span>{CURRENT_PLAY_AVAILABILITY.cta}</span>
        <span aria-hidden="true">-&gt;</span>
      </Link>
    </section>
  )
}
