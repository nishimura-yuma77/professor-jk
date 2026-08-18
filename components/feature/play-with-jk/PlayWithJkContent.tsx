import PlayAvailability from "@/components/feature/play-with-jk/PlayAvailability"
import PlayContact from "@/components/feature/play-with-jk/PlayContact"
import PlayExperimentNotes from "@/components/feature/play-with-jk/PlayExperimentNotes"
import PlayHero from "@/components/feature/play-with-jk/PlayHero"
import PlayIdeas from "@/components/feature/play-with-jk/PlayIdeas"
import PlayReveal from "@/components/feature/play-with-jk/PlayReveal"
import PlayRules from "@/components/feature/play-with-jk/PlayRules"
import PlayStart from "@/components/feature/play-with-jk/PlayStart"
import PlayToolkit from "@/components/feature/play-with-jk/PlayToolkit"
import style from "@/styles/feature/play-with-jk/PlayWithJkContent.module.scss"

export default function PlayWithJkContent() {
  return (
    <div className={style.page_content}>
      <PlayReveal variant="hero">
        <PlayHero />
      </PlayReveal>
      <PlayReveal variant="stamp">
        <PlayAvailability />
      </PlayReveal>

      <div className={style.collage}>
        <PlayReveal variant="fromLeft" className={style.wanted_slot}>
          <PlayIdeas className={`${style.paper} ${style.wanted}`} />
        </PlayReveal>
        <PlayReveal variant="fromRight" className={style.toolkit_slot}>
          <PlayToolkit className={`${style.paper} ${style.toolkit}`} />
        </PlayReveal>
        <PlayReveal variant="lift" className={style.experiments_slot}>
          <PlayExperimentNotes className={`${style.paper} ${style.experiments}`} />
        </PlayReveal>
        <PlayReveal variant="tilt" className={style.rules_slot}>
          <PlayRules className={`${style.paper} ${style.rules}`} />
        </PlayReveal>
        <PlayReveal variant="wipe" className={style.start_slot}>
          <PlayStart className={`${style.paper} ${style.start}`} />
        </PlayReveal>
      </div>

      <PlayReveal variant="zoom">
        <PlayContact />
      </PlayReveal>
    </div>
  )
}
