import style from "@/styles/ui/ActiveBadge.module.scss"
import GlowDot from "@/components/primitives/GlowDot";

type ActiveBadgeProps = {
  isOnline: boolean
}

export default function ActiveBadge({
  isOnline
}: ActiveBadgeProps) {
  return (
    <div
      className={`${style.container} ${isOnline ? style.active : ""}`}
      role="status"
      aria-live="polite"
    >
      <GlowDot color={`${isOnline ? "var(--color-accent-online)" : "var(--color-accent-offline)"}`} className={style.dot}/>
      <span className={`${style.text} ${isOnline ? style.online : ""}`}>{isOnline ? "ONLINE" : "OFFLINE"}</span>
    </div>
  )
}
