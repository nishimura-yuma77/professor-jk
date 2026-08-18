import style from "@/styles/primitives/SectionTitle.module.scss"
import TypewriterText from "@/components/primitives/TypewriterText"
import { SECTION_TITLE_CHARACTER_DELAY_MS } from "@/const/animation"

type SectionTitleProps = {
  title: string,
  subtitle?: string
  isVisible: boolean
  animationDelay?: number
  onAnimationEnd?: () => void
}
export default function SectionTitle({
  title,
  subtitle,
  isVisible,
  animationDelay = SECTION_TITLE_CHARACTER_DELAY_MS,
  onAnimationEnd
}: SectionTitleProps) {
  return (
    <h2 className={style.container}>
      <span className={style.prompt_symbol}>{">"}</span>
      <span className={style.title_group}>
        <TypewriterText
          text={title}
          isVisible={isVisible}
          className={style.title}
          displayCursor={true}
          animationDelay={animationDelay}
          onAnimationEnd={onAnimationEnd}
        />
        {subtitle && (
          <span className={`${style.subtitle} ${
            isVisible ? style.subtitle_visible : ""
          }`}>
            {subtitle}
          </span>
        )}
      </span>
    </h2>
  )
}
