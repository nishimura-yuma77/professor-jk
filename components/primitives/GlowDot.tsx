import style from "@/styles/primitives/GlowDot.module.scss"

type GrowDotProps = {
  color: string
  size?: string
  className?: string
}
export default function GlowDot({
  color,
  size = "var(--font-size-exsmall)",
  className
}: GrowDotProps) {
  return (
    <span 
      className={`${style.dot} ${className}`}
      style={{
        color,
        width: size,
        height: size
      }}
    />
  )
}