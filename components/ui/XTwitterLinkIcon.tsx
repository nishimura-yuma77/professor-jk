import { XTWITTER_LINK } from "@/const/constants";
import XTwitterIcon from "@/components/primitives/XTwitterIcon";

type XTwitterLinkIconProps = {
  className?: string
}

export default function XTwitterLinkIcon({
  className = undefined
}: XTwitterLinkIconProps) {
  return (
  <a
    href={XTWITTER_LINK}
    target="_blank"
    rel="noopener noreferer"
  >
    <XTwitterIcon className={className ? className : ""} />
  </a>
  )
}