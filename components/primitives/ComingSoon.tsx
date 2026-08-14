import style from "@/styles/primitives/ComingSoon.module.scss"
import TypewriterText from "./TypewriterText"

type ComingSoonProps = {
  isVisible: boolean
}
export default function ComingSoon({
  isVisible
}: ComingSoonProps) {
  return (
    <div className={style.container}>
      <TypewriterText text={"Coming Soon..."} isVisible={isVisible} className={style.coming_soon} />
    </div>
  )
}