"use client"

import style from "@/styles/feature/Header.module.scss"
import Logo from "@/components/ui/Logo"
import BurgerMenu from "@/components/feature/BurgerMenu"

export default function Header() {
  return (
    <header className={style.container}>
      <div className={style.inner}>
        <Logo />
      </div>
    </header>
  )
}