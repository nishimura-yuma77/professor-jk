"use client"

import Image from "next/image"
import { useState, type ReactNode } from "react"
import DialogueText from "@/components/ui/dialogue/DialogueText"
import DialogueChoiceButton from "@/components/ui/dialogue/DialogueChoiceButton"
import style from "@/styles/ui/dialogue/DialogueScreen.module.scss"

export type DialogueChoice = {
  id: string
  label: string
  variant?: "default" | "primary"
}

export type DialogueScene = {
  speaker: { name: string; image: string }
  text: string
  choices: readonly DialogueChoice[]
  onSelect: (id: string) => void
  caption?: string
  supplement?: ReactNode
}

type DialogueScreenProps = {
  scene: DialogueScene
  animationDelay?: number
}

// シーンや会話セッションが切り替わる際は、呼び出し側でkeyを変えて再開する。
export default function DialogueScreen({ scene, animationDelay }: DialogueScreenProps) {
  const [isMessageComplete, setIsMessageComplete] = useState(false)

  return (
    <div className={style.screen}>
      <div className={style.character_area} aria-hidden="true">
        <Image
          src={scene.speaker.image}
          alt=""
          width={832}
          height={1216}
          sizes="(max-width: 560px) 128px, 240px"
        />
      </div>
      <div className={style.conversation}>
        {scene.caption && <p className={style.caption}>{scene.caption}</p>}
        <div className={style.message}>
          <p className={style.speaker}>{scene.speaker.name}</p>
          <DialogueText
            text={scene.text}
            animationDelay={animationDelay}
            onComplete={() => setIsMessageComplete(true)}
          />
        </div>
        {isMessageComplete && (
          <div className={style.choices}>
            {scene.supplement}
            {scene.choices.map((choice, index) => (
              <DialogueChoiceButton
                key={choice.id}
                label={choice.label}
                variant={choice.variant}
                revealDelay={index * 60}
                onClick={() => scene.onSelect(choice.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
