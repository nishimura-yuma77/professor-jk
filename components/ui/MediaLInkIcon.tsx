import { MediaLink } from "@/const/experiments"
import GithubLinkIcon from "@/components/ui/GithubLinkIcon"
import XTwitterLinkIcon from "./XTwitterLinkIcon"
import YoutubeLinkIcon from "./YoutubeLinkIcon"

type MediaLinkIconProps = {
  mediaLink: MediaLink
  className?: string
}
export default function MediaLinkIcon({
  mediaLink,
  className = undefined
}: MediaLinkIconProps) {
  switch (mediaLink.type) {
    case "GITHUB":
      return (
        <GithubLinkIcon
          href={mediaLink.href}
          className={className}
        />
      )
    case "X":
      return (
        <XTwitterLinkIcon
          className={className}
        />
      )
    case "YOUTUBE":
      return (
        <YoutubeLinkIcon
          className={className}
        />
      )
    // websiteは今度実装
    default:
      return (
        <div>error</div>
      )
  }
}