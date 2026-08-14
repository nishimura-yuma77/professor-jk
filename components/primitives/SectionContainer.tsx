import style from "@/styles/primitives/SectionContainer.module.scss"
import { ReactNode, Ref } from "react"

type SectionContainerProps = {
  children: ReactNode
  ref?: Ref<HTMLElement>
}

export default function SectionContainer({
  children,
  ref = null,
}: SectionContainerProps) {
  return (
    <section ref={ref} className={style.container}>{children}</section>
  )
}