import GithubIcon from "@/components/primitives/GithubIcon";

type GithubLinkIconProps = {
  href: string
  className?: string
  label?: string
}

export default function GithubLinkIcon({
  href,
  className = undefined,
  label = "GitHubを開く",
}: GithubLinkIconProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      <GithubIcon className={className ? className : ""} />
    </a>
  )
}
