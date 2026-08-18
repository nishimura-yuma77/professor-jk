"use client"

import type { ReactNode } from "react"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import style from "@/styles/feature/play-with-jk/PlayReveal.module.scss"

export type PlayRevealVariant =
  | "hero"
  | "stamp"
  | "fromLeft"
  | "fromRight"
  | "lift"
  | "tilt"
  | "wipe"
  | "zoom"

type PlayRevealProps = {
  children: ReactNode
  variant: PlayRevealVariant
  className?: string
}

const variantClasses: Record<PlayRevealVariant, string> = {
  hero: style.hero,
  stamp: style.stamp,
  fromLeft: style.from_left,
  fromRight: style.from_right,
  lift: style.lift,
  tilt: style.tilt,
  wipe: style.wipe,
  zoom: style.zoom,
}

export default function PlayReveal({
  children,
  variant,
  className,
}: PlayRevealProps) {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.15,
    once: true,
  })

  return (
    <div
      ref={ref}
      className={`${style.observer} ${className ?? ""}`}
    >
      <div className={`${style.reveal} ${variantClasses[variant]} ${isVisible ? style.visible : ""}`}>
        {children}
      </div>
    </div>
  )
}
