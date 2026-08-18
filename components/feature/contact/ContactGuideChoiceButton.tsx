import type { CSSProperties } from "react"
import type { ContactGuideChoiceVariant } from "@/const/contactGuide"
import style from "@/styles/feature/contact/ContactGuideChoiceButton.module.scss"

type ContactGuideChoiceButtonProps = {
  label: string
  variant: ContactGuideChoiceVariant
  revealDelay: number
  onClick: () => void
}

export default function ContactGuideChoiceButton({
  label,
  variant,
  revealDelay,
  onClick,
}: ContactGuideChoiceButtonProps) {
  return (
    <button
      type="button"
      className={`${style.button} ${
        variant === "primary" ? style.primary : ""
      }`}
      style={{
        "--choice-delay": `${revealDelay}ms`,
      } as CSSProperties}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
