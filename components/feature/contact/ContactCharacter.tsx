import Image from "next/image"
import type { TransitionEvent } from "react"
import style from "@/styles/feature/contact/ContactCharacter.module.scss"

const CHARACTER_SIZES = "(max-width: 560px) 176px, 240px"

type ContactCharacterProps = {
  isVisible: boolean
  onRevealEnd: () => void
}

export default function ContactCharacter({
  isVisible,
  onRevealEnd,
}: ContactCharacterProps) {
  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (
      isVisible
      && event.target === event.currentTarget
      && event.propertyName === "opacity"
    ) {
      onRevealEnd()
    }
  }

  return (
    <div
      className={`${style.container} ${isVisible ? style.visible : ""}`}
      aria-hidden="true"
      onTransitionEnd={handleTransitionEnd}
    >
      <Image
        className={`${style.image} ${style.default}`}
        src="/images/character/sitting_on_edge.png"
        alt=""
        width={1214}
        height={1295}
        sizes={CHARACTER_SIZES}
      />
      <Image
        className={`${style.image} ${style.blink}`}
        src="/images/character/sitting_on_edge_blink.png"
        alt=""
        width={1145}
        height={1374}
        sizes={CHARACTER_SIZES}
      />
      <Image
        className={`${style.image} ${style.closed}`}
        src="/images/character/sitting_on_edge_closed.png"
        alt=""
        width={1207}
        height={1303}
        sizes={CHARACTER_SIZES}
      />
    </div>
  )
}
