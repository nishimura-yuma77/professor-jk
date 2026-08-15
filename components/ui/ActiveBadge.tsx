import style from "@/styles/ui/ActiveBadge.module.scss"
import { useEffect, useState } from "react";
import GlowDot from "@/components/primitives/GlowDot";

type ActiveBadgeProps = {
  isVisible: boolean
  activeTransitionDelay?: number
}

export default function ActiveBadge({
  isVisible,
  activeTransitionDelay = 1000
}: ActiveBadgeProps) {
  const [isOnline, setIsOnline] = useState<boolean>(false);
  useEffect(() => {
    if (!isVisible) return
    const timer = setTimeout(() => {
      setIsOnline(true)
    }, activeTransitionDelay)
    return () => {
      clearTimeout(timer)
    }
  }, [isVisible])
  return (
    <div className={style.container}>
      <GlowDot color={`${isOnline ? "var(--color-accent-online)" : "var(--color-accent-offline)"}`} className={style.dot}/>
      <span className={`${style.text} ${isOnline ? style.online : ""}`}>{isOnline ? "ONLINE" : "OFFLINE"}</span>
    </div>
  )
}