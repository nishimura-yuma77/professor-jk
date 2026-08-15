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
  isVisible?: boolean
  className?: string
}
export default function ExperimentStatusBadge({
  status,
  isVisible = true,
  className = undefined
}: ExperimentStatusBadgeProps) {
  return (
    <p className={style.container}>
      <GlowDot color={dotColor[status]} className={style.dot} /><span className={`${style.text} ${className ? className : ""}`}>{status}</span>
    </p>
  )
}