import { ErrorType } from "@/contexts/ErrorContext"
import style from "@/styles/ui/ErrorToast.module.scss"

type ErrorToastProps = {
  error: ErrorType
}

export default function ErrorToast({
  error
}: ErrorToastProps) {
  return (
    <div className={style.container}>
      <div className={style.toast}>{error.message}</div>
    </div>
  )
}