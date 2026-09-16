import type { AnimationEvent } from "react"
import type { PageTransitionPhase } from "@/hooks/usePageTransitionController"
import style from "@/styles/providers/PageTransitionProvider.module.scss"

type PageTransitionOverlayProps = {
  phase: PageTransitionPhase
  onCoverEnd: () => void
  onRevealEnd: () => void
}

const getVisualPhase = (phase: PageTransitionPhase) => {
  if (phase === "intro-pending") return "covered"
  if (phase === "intro-revealing") return "revealing"
  return phase
}

export default function PageTransitionOverlay({
  phase,
  onCoverEnd,
  onRevealEnd,
}: PageTransitionOverlayProps) {
  const visualPhase = getVisualPhase(phase)
  const isActive = phase !== "idle"
  const showsIntro = phase.startsWith("intro")

  const handleCoverEnd = (event: AnimationEvent<HTMLSpanElement>) => {
    if (event.target === event.currentTarget) onCoverEnd()
  }

  const handleRevealEnd = (event: AnimationEvent<HTMLSpanElement>) => {
    if (event.target === event.currentTarget) onRevealEnd()
  }

  return (
    <div
      className={`${style.overlay} ${isActive ? style.active : ""} ${style[visualPhase]}`}
      aria-hidden="true"
    >
      <span className={style.accent} onAnimationEnd={handleRevealEnd} />
      <span className={style.panel} onAnimationEnd={handleCoverEnd}>
        <span className={`${style.intro_copy} ${
          showsIntro ? style.intro_copy_visible : ""
        }`}>
          <span className={style.intro_line}>
            <span>Hello!!</span>
          </span>
          <span className={`${style.intro_line} ${style.intro_line_accent}`}>
            <span>Coworkers!!</span>
          </span>
        </span>
      </span>
    </div>
  )
}
