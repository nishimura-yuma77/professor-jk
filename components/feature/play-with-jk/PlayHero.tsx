import Image from "next/image"
import PlayAvailabilityBadge from "@/components/feature/play-with-jk/PlayAvailabilityBadge"
import { PLAY_FLYER } from "@/const/playWithJk"
import style from "@/styles/feature/play-with-jk/PlayHero.module.scss"

export default function PlayHero() {
  return (
    <section className={style.hero} aria-labelledby="play-with-jk-title">
      <div className={style.poster}>
        <span className={`${style.tape} ${style.tape_top}`} aria-hidden="true" />
        <span className={`${style.tape} ${style.tape_side}`} aria-hidden="true" />

        <div className={style.copy}>
          <div className={style.meta}>
            <p className={style.label}>{PLAY_FLYER.label}</p>
            <PlayAvailabilityBadge />
          </div>
          <h1 id="play-with-jk-title">
            <span className={style.wanted}>{PLAY_FLYER.wanted}</span>
            <span className={style.title}>
              {PLAY_FLYER.titleLines.map((line) => (
                <span key={line} className={style.title_line}>{line}</span>
              ))}
            </span>
          </h1>
          <div className={style.description}>
            {PLAY_FLYER.description.map((line) => <p key={line}>{line}</p>)}
          </div>
          <p className={style.note}>{PLAY_FLYER.note}</p>
        </div>

        <div className={style.character}>
          <Image
            className={`${style.character_image} ${style.character_default}`}
            src="/images/character/sitting_on_edge.png"
            alt="貼り紙の端に座るJ.K.教授"
            width={1214}
            height={1295}
            sizes="(max-width: 767px) 208px, 320px"
            priority
          />
          <Image
            className={`${style.character_image} ${style.character_blink}`}
            src="/images/character/sitting_on_edge_blink.png"
            alt=""
            width={1145}
            height={1374}
            sizes="(max-width: 767px) 208px, 320px"
            aria-hidden="true"
          />
          <Image
            className={`${style.character_image} ${style.character_closed}`}
            src="/images/character/sitting_on_edge_closed.png"
            alt=""
            width={1207}
            height={1303}
            sizes="(max-width: 767px) 208px, 320px"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  )
}
