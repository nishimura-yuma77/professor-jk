"use client"

import style from "@/styles/primitives/TypewriterText.module.scss"

type TypewriterTextProps = {
  text: string
  isVisible: boolean
  className?: string,
  animationDelay?: number // ms
  onAnimationEnd?: () => void
}

export default function TypewriterText({
  text,
  isVisible,
  className,
  animationDelay = 80,
  onAnimationEnd
}: TypewriterTextProps) {
  return (
    <span className={style.text}>
      {text.split("").map((char, index) => {
        const isLast = index === text.length - 1
        return (
          <span
            key={index}
            style={{animationDelay: `${animationDelay * index}ms`}}
            className={`${style.char} ${isVisible ? style.char_active : ""} ${className ?? className}`}
            onAnimationEnd={isLast ? () => onAnimationEnd : undefined}
          >{char}</span>
        )
      })}
    </span>
  )
}