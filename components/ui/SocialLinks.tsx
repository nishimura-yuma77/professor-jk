import { YOUTUBE_LINK, XTWITTER_LINK } from "@/const/constants"
import XTwitterIcon from "@/components/primitives/XTwitterIcon"
import YoutubeIcon from "@/components/primitives/YoutubeIcon"
import style from "@/styles/ui/SocialLinks.module.scss"
import XTwitterLinkIcon from "@/components/ui/XTwitterLinkIcon"
import YoutubeLinkIcon from "@/components/ui/YoutubeLinkIcon"

export default function SocialLinks() {
  return (
    <div className={style.container}>
      <XTwitterLinkIcon className={style.icon} />
      <YoutubeLinkIcon className={style.icon} />
    </div>
  )
}