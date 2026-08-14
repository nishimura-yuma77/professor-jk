import style from "@/styles/primitives/TypewriterText.module.scss"

type TypewriterTextProps = {
  text: string
  isVisible: boolean
  className?: string,
  animationDelay?: number // ms
}

export default function TypewriterText({
  text,
  isVisible,
  className,
  animationDelay = 80
}: TypewriterTextProps) {
  return (
    <span className={style.text}>
      {text.split("").map((char, index) => {
        return (
          <span
            key={index}
            style={{animationDelay: `${animationDelay * index}ms`}}
            className={`${style.char} ${isVisible ? style.char_active : ""} ${className ?? className}`}
          >{char}</span>
        )
      })}
    </span>
  )
}