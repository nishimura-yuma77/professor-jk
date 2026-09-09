import Link from "next/link"
import type { CSSProperties } from "react"
import style from "@/styles/ui/ArchiveLink.module.scss"

type ArchiveLinkProps = {
  href: string
  kicker: string
  label: string
  isVisible?: boolean
  revealDelay?: number
  className?: string
}

export default function ArchiveLink({
  href,
  kicker,
  label,
  isVisible = true,
  revealDelay = 0,
  className,
}: ArchiveLinkProps) {
  return (
    <Link
      href={href}
      className={[style.link, isVisible && style.visible, className].filter(Boolean).join(" ")}
      style={{ "--archive-link-delay": `${revealDelay}ms` } as CSSProperties}
    >
      <span className={style.kicker}>{kicker}</span>
      <span className={style.label}>{label}</span>
      <span className={style.access} aria-hidden="true">
        ACCESS <span className={style.arrow}>-&gt;</span>
      </span>
    </Link>
  )
}
