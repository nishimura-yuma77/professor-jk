import style from "@/styles/primitives/StackChip.module.scss"

type StackChipProps = {
  text: string
}
export default function StackChip({
  text
}: StackChipProps) {
  return (
    <span className={style.chip}>
      {text}
    </span>
  )
}