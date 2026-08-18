"use client"

import { useState } from "react"
import style from "@/styles/primitives/TypewriterText.module.scss"

type TypewriterTextProps = {
  text: string
  isVisible: boolean
  className?: string
  animationDelay?: number
  startDelay?: number
  onAnimationEnd?: () => void
  displayCursor?: boolean
}

export default function TypewriterText({
  text,
  isVisible,
  ...props
}: TypewriterTextProps) {
  return (
    <TypewriterAnimation
      key={isVisible ? "visible" : "hidden"}
      text={text}
      isVisible={isVisible}
      {...props}
    />
  )
}

function TypewriterAnimation({
  text,
  isVisible,
  className,
  animationDelay = 80,
  startDelay = 0,
  onAnimationEnd,
  displayCursor = false
}: TypewriterTextProps) {
  const [currentIndex, setCurrentIndex] = useState(-1)

  return (
    <span className={`${style.text} ${className ?? ""}`}>
      {currentIndex === -1 && isVisible && displayCursor && (
        <span className={style.cursor} />
      )}

      {text.split("").map((char, index) => {
        const isLast = index === text.length - 1

        return (
          <span key={index}>
            <span
              style={{
                animationDelay: `${startDelay + animationDelay * index}ms`
              }}
              className={`${style.char} ${
                isVisible ? style.char_active : ""
              }`}
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
