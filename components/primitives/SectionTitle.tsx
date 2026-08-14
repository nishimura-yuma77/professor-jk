import style from "@/styles/primitives/SectionTitle.module.scss"
import TypewriterText from "@/components/primitives/TypewriterText"
import { useEffect, useState } from "react"

type SectionTitleProps = {
  title: string,
  isVisible: boolean
}
export default function SectionTitle({
  title,
  isVisible
}: SectionTitleProps) {
  return (
    <h2 className={style.container}>
      <span className={style.prompt_symbol}>{">"}</span>
      <TypewriterText
        text={title}
        isVisible={isVisible}
        className={style.title}
        displayCursor={true}
      />
    </h2>
  )
}