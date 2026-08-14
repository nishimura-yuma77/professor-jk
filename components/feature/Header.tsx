"use client"

import style from "@/styles/feature/Header.module.scss"
import Logo from "@/components/ui/Logo"

export default function Header() {
  return (
    <header className={style.container}>
      <div className={style.inner}>
        <div className={style.logo_area}>
          <span className={style.bar} /><Logo />  
        </div>
      </div>
    </header>
  )
}