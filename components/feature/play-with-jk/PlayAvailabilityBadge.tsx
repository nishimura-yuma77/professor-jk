import { CURRENT_PLAY_AVAILABILITY, PLAY_AVAILABILITY } from "@/const/playWithJk"
import style from "@/styles/feature/play-with-jk/PlayAvailabilityBadge.module.scss"

type PlayAvailabilityBadgeProps = {
  className?: string
}

export default function PlayAvailabilityBadge({ className }: PlayAvailabilityBadgeProps) {
  const statusClass = PLAY_AVAILABILITY.status === "OPEN" ? style.open : style.closed

  return (
    <p className={`${style.badge} ${statusClass} ${className ?? ""}`}>
      {CURRENT_PLAY_AVAILABILITY.label}
    </p>
  )
}
