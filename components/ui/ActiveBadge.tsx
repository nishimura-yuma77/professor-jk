import style from "@/styles/ui/ActiveBadge.module.scss"
import { useEffect, useState } from "react";

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
  }, [isVisible])
  return (
    <div className={style.container}>
      <span className={isOnline ? style.green_dot : style.red_dot} />
      <span className={`${style.text} ${isOnline ? style.online : ""}`}>{isOnline ? "online" : "offline"}</span>
    </div>
  )
}