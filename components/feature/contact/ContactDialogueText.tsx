"use client"

import { useEffect, useState } from "react"
import style from "@/styles/feature/contact/ContactDialogueText.module.scss"

type ContactDialogueTextProps = {
  text: string
  animationDelay?: number
  onComplete: () => void
}

export default function ContactDialogueText({
  text,
  animationDelay = 35,
  onComplete,
}: ContactDialogueTextProps) {
  const [visibleLength, setVisibleLength] = useState(0)
  const [hasAdvanced, setHasAdvanced] = useState(false)

  useEffect(() => {
    if (visibleLength >= text.length) return

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    if (prefersReducedMotion) {
      const timer = setTimeout(() => setVisibleLength(text.length), 0)
      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => {
      setVisibleLength((current) => current + 1)
    }, animationDelay)

    return () => clearTimeout(timer)
  }, [animationDelay, text.length, visibleLength])

  const advanceDialogue = () => {
    if (visibleLength < text.length) {
      setVisibleLength(text.length)
      return
    }

    if (hasAdvanced) return

    setHasAdvanced(true)
    onComplete()
  }

  const isTextComplete = visibleLength >= text.length

  return (
    <button
      type="button"
      className={style.container}
      aria-label={isTextComplete
        ? `${text}。クリックすると選択肢を表示します`
        : `${text}。クリックすると全文を表示します`}
      disabled={hasAdvanced}
      onClick={advanceDialogue}
    >
      <span aria-hidden="true">{text.slice(0, visibleLength)}</span>
      {!isTextComplete && <span className={style.cursor} aria-hidden="true" />}
      {isTextComplete && !hasAdvanced && (
        <span className={style.next} aria-hidden="true">CLICK TO NEXT</span>
      )}
    </button>
  )
}
