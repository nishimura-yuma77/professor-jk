import { YOUTUBE_LINK, XTWITTER_LINK } from "@/const/constants"
import XTwitterIcon from "@/components/primitives/XTwitterIcon"
import YoutubeIcon from "@/components/primitives/YoutubeIcon"
import style from "@/styles/ui/SocialLinks.module.scss"

export default function SocialLinks() {
  return (
    <div className={style.container}>
      <a
        href={XTWITTER_LINK}
        target="_blank"
        rel="noopener noreferer"
      >
        <XTwitterIcon className={style.icon} />
      </a>
      <a
        href={YOUTUBE_LINK}
        target="_blank"
        rel="noopener noreferer"
      ><YoutubeIcon className={style.icon} /></a>
    </div>
  )
}