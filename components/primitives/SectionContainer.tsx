import style from "@/styles/primitives/SectionContainer.module.scss"
import { ReactNode, Ref } from "react"

type SectionContainerProps = {
  children: ReactNode
  ref?: Ref<HTMLDivElement>
  className?: string
  sectionClassName?: string
}

export default function SectionContainer({
  children,
  ref = null,
  className = undefined,
  sectionClassName = undefined
}: SectionContainerProps) {
  return (
    <div ref={ref} className={`${style.container} ${className ? className : ""}`}>
      <section className={`${style.section} ${sectionClassName ? sectionClassName : ""}`}>
        {children}
      </section>
    </div>
  )
}
