import type { CSSProperties } from "react"
import type { DialogueChoice } from "@/components/ui/dialogue/DialogueScreen"
import style from "@/styles/ui/dialogue/DialogueChoiceButton.module.scss"

type DialogueChoiceButtonProps = {
  label: string
  variant?: DialogueChoice["variant"]
  revealDelay: number
  onClick: () => void
}

export default function DialogueChoiceButton({
  label,
  variant,
  revealDelay,
  onClick,
}: DialogueChoiceButtonProps) {
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
