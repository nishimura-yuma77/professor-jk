import PlayAvailability from "@/components/feature/play-with-jk/PlayAvailability"
import PlayContact from "@/components/feature/play-with-jk/PlayContact"
import PlayExperimentNotes from "@/components/feature/play-with-jk/PlayExperimentNotes"
import PlayHero from "@/components/feature/play-with-jk/PlayHero"
import PlayIdeas from "@/components/feature/play-with-jk/PlayIdeas"
import PlayRules from "@/components/feature/play-with-jk/PlayRules"
import PlayStart from "@/components/feature/play-with-jk/PlayStart"
import PlayToolkit from "@/components/feature/play-with-jk/PlayToolkit"
import style from "@/styles/feature/play-with-jk/PlayWithJkContent.module.scss"

export default function PlayWithJkContent() {
  return (
    <div className={style.page_content}>
      <PlayHero />
      <PlayAvailability />

      <div className={style.collage}>
        <PlayIdeas className={`${style.paper} ${style.wanted}`} />
        <PlayToolkit className={`${style.paper} ${style.toolkit}`} />
        <PlayExperimentNotes className={`${style.paper} ${style.experiments}`} />
        <PlayRules className={`${style.paper} ${style.rules}`} />
        <PlayStart className={`${style.paper} ${style.start}`} />
      </div>

      <PlayContact />
    </div>
  )
}
