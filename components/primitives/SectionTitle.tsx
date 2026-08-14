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
  const [isAnimationEnd, setIsAnimationEnd] = useState<Boolean>(false);
  useEffect(() => {
    if (isVisible) return
    setIsAnimationEnd(false)
  }, [isVisible])
  return (
    <h2 className={style.container}>
      <span className={style.prompt_symbol}>{">"}</span>
      <TypewriterText
        text={title}
        isVisible={isVisible}
        className={style.title}
        onAnimationEnd={() => setIsAnimationEnd(true)}
      />
      <span className={style.prompt_cursor} />
    </h2>
  )
}