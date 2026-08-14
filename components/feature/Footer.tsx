import style from "@/styles/feature/Footer.module.scss"
import Logo from "@/components/ui/Logo"
import Copyright from "@/components/primitives/Copyright"
import SocialLinks from "@/components/ui/SocialLinks"

export default function Footer() {
  return (
    <footer className={style.container}>
      <div>
        <SocialLinks />
      </div>
      <div>
        <Logo />
      </div>
      <div className={style.copyright_area}>
        <Copyright className={style.copyright_text}/>
      </div>
    </footer>
  )
}