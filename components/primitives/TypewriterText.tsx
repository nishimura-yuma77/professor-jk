"use client"

import { useEffect, useState } from "react"
import style from "@/styles/primitives/TypewriterText.module.scss"

type TypewriterTextProps = {
  text: string
  isVisible: boolean
  className?: string
  animationDelay?: number
  onAnimationEnd?: () => void
  displayCursor?: boolean
}

export default function TypewriterText({
  text,
  isVisible,
  className,
  animationDelay = 80,
  onAnimationEnd,
  displayCursor = false
}: TypewriterTextProps) {
  const [currentIndex, setCurrentIndex] = useState(-1)

  useEffect(() => {
    if (!isVisible) {
      setCurrentIndex(-1)
    }
  }, [isVisible])

  return (
    <span className={style.text}>
      {currentIndex === -1 && isVisible && displayCursor && (
        <span className={style.cursor} />
      )}

      {text.split("").map((char, index) => {
        const isLast = index === text.length - 1

        return (
          <span key={index}>
            <span
              style={{
                animationDelay: `${animationDelay * index}ms`
              }}
              className={`${style.char} ${
                isVisible ? style.char_active : ""
              } ${className ?? ""}`}
              onAnimationEnd={() => {
                setCurrentIndex(index)

                if (isLast) {
                  onAnimationEnd?.()
                }
              }}
            >
              {char}
            </span>

            {currentIndex === index && displayCursor && (
              <span className={style.cursor} />
            )}
          </span>
        )
      })}
    </span>
  )
}