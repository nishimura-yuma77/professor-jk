import { ErrorType } from "@/contexts/ErrorContext"
import style from "@/styles/ui/ErrorToast.module.scss"
import TypewriterText from "../primitives/TypewriterText"

type ErrorToastProps = {
  error: ErrorType
}

export default function ErrorToast({
  error
}: ErrorToastProps) {
  return (
    <div className={style.container}>
      <div className={style.toast}><TypewriterText text={error.message} isVisible={true} animationDelay={20} displayCursor={true}/></div>
    </div>
  )
}