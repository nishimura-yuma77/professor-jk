"use client"

import { useState, type TransitionEvent } from "react"
import type { ContactGuide as ContactGuideData } from "@/const/contactGuide"
import style from "@/styles/feature/contact/ContactGuideCard.module.scss"

type ContactGuideCardProps = {
  isVisible: boolean
  hintGuide: ContactGuideData | null
  onOpen: () => void
  onRevealEnd: () => void
}

export default function ContactGuideCard({
  isVisible,
  hintGuide,
  onOpen,
  onRevealEnd,
}: ContactGuideCardProps) {
  const [isActionVisible, setIsActionVisible] = useState(false)

  const handleTransitionEnd = (event: TransitionEvent<HTMLButtonElement>) => {
    if (
      isVisible
      && event.target === event.currentTarget
      && event.propertyName === "opacity"
    ) {
      setIsActionVisible(true)
    }
  }

  const handleActionTransitionEnd = (event: TransitionEvent<HTMLSpanElement>) => {
    if (
      isActionVisible
      && event.target === event.currentTarget
      && event.propertyName === "opacity"
    ) {
      onRevealEnd()
    }
  }

  return (
    <div className={style.guide_area}>
      {hintGuide ? (
        <div className={style.hint_card}>
          <p className={style.hint_message}>
            入力欄にガイドを表示した。<br />
            困ったら参考にしてくれ。
          </p>
          <button type="button" onClick={onOpen}>もう一度聞く</button>
        </div>
      ) : (
        <div className={`${style.float_layer} ${
          isActionVisible ? style.float_active : ""
        }`}>
          <button
            type="button"
            className={`${style.card} ${isVisible ? style.card_visible : ""}`}
            disabled={!isActionVisible}
            onClick={onOpen}
            onTransitionEnd={handleTransitionEnd}
          >
            <span className={style.eyebrow}>NEED HELP?</span>
            <span className={style.question}>
              何を書いたらいいかわからない
            </span>
            <span className={`${style.action} ${
              isActionVisible ? style.action_visible : ""
            }`} onTransitionEnd={handleActionTransitionEnd}>
              J.K.教授に聞いてみる
              <span aria-hidden="true">→</span>
            </span>
          </button>
        </div>
      )}
    </div>
  )
}
