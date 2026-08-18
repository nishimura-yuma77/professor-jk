import type { Metadata } from "next"
import Header from "@/components/feature/Header"
import Footer from "@/components/feature/Footer"
import PlayWithJkContent from "@/components/feature/play-with-jk/PlayWithJkContent"
import PageBackground from "@/components/ui/PageBackground"
import style from "@/app/play-with-jk/page.module.scss"

const description =
  "やりたかったこと、やってみようぜ。未完成のアイデアをJ.K.教授と一緒に動かす、遊び相手募集の貼り紙です。"

export const metadata: Metadata = {
  title: "Play With J.K.",
  description,
  alternates: {
    canonical: "/play-with-jk",
  },
  openGraph: {
    title: "Play With J.K. | J.K. Lab",
    description,
    url: "/play-with-jk",
  },
}

export default function PlayWithJkPage() {
  return (
    <>
      <Header />
      <PageBackground className={style.main}>
        <PlayWithJkContent />
      </PageBackground>
      <Footer />
    </>
  )
}
