import { YOUTUBE_LINK } from "@/const/constants";
import YoutubeIcon from "@/components/primitives/YoutubeIcon";

type YoutubeLinkIconProps = {
  className?: string
}

export default function YoutubeLinkIcon({
  className = undefined
}: YoutubeLinkIconProps) {
  return (
  <a
    href={YOUTUBE_LINK}
    target="_blank"
    rel="noopener noreferer"
  >
    <YoutubeIcon className={className ? className : ""} />
  </a>
  )
}