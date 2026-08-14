import style from "@/styles/primitives/SectionContainer.module.scss"
import { ReactNode, Ref } from "react"

type SectionContainerProps = {
  children: ReactNode
  ref?: Ref<HTMLDivElement>
  className?: string
}

export default function SectionContainer({
  children,
  ref = null,
  className = undefined
}: SectionContainerProps) {
  return (
    <div ref={ref} className={`${style.container} ${className ? className : ""}`}>
      <section className={style.section}>
        {children}
      </section>
    </div>
  )
}