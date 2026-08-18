import type { ComponentPropsWithoutRef } from "react"
import style from "@/styles/ui/PageBackground.module.scss"

type PageBackgroundProps = ComponentPropsWithoutRef<"main">

export default function PageBackground({
  children,
  className,
  ...props
}: PageBackgroundProps) {
  return (
    <main
      className={`${style.background} ${className ?? ""}`}
      {...props}
    >
      <div className={style.glow} aria-hidden="true" />
      {children}
    </main>
  )
}
