import style from "@/styles/ui/Logo.module.scss"
import Link from "next/link"

export default function Logo(){
  return (
    <Link href="/" className={style.text} aria-label="ホームへ戻る">
      PROF.J.K.
    </Link>
  )
}
