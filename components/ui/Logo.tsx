import style from "@/styles/ui/Logo.module.scss"
import Link from "next/link"

export default function Logo(){
  return (
    <div className={style.container}>
      <span className={style.bar} /><span className={style.text}>PROF.J.K.</span>
    </div>
  )
}