import type { ExperimentStatus } from "@/const/experiments"
import style from "@/styles/primitives/ExperimentStatusBadge.module.scss"
import GlowDot from "./GlowDot"

const dotColor = {
  ACTIVE: "var(--color-accent-online)",
  PAUSED: "var(--color-accent-yellow)",
  COMPLETED: "var(--color-accent-blue)",
  ARCHIVED: "var(--color-accent-gray)"
}

type ExperimentStatusBadgeProps = {
  status: ExperimentStatus
  className?: string
  animationDelay?: string
}
export default function ExperimentStatusBadge({
  status,
  className = undefined,
  animationDelay = undefined
}: ExperimentStatusBadgeProps) {
  return (
    <p 
      className={`${style.container} ${className ? className : ""}`}
      style={{animationDelay: animationDelay}}
    >
      <GlowDot color={dotColor[status]} className={style.dot} /><span className={`${style.text}`}>{status}</span>
    </p>
  )
}
