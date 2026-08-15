import GithubIcon from "@/components/primitives/GithubIcon";

type GithubLinkIconProps = {
  href: string
  className?: string
}

export default function GithubLinkIcon({
  href,
  className = undefined
}: GithubLinkIconProps) {
  return (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferer"
  >
    <GithubIcon className={className ? className : ""} />
  </a>
  )
}