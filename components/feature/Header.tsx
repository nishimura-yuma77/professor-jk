import style from "@/styles/feature/Header.module.scss"
import Logo from "@/components/ui/Logo"

export default function Header() {
  return (
    <header className={style.container}>
      <div className={style.inner}>
        <Logo />
      </div>
    </header>
  )
}