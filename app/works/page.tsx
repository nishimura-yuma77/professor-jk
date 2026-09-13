import type { Metadata } from "next"
import Link from "next/link"
import ArrowIcon from "@/components/primitives/ArrowIcon"
import WorkArchiveGrid from "@/components/feature/works/WorkArchiveGrid"
import { WORKS } from "@/const/works"
import style from "@/app/works/page.module.scss"

const description = "J.K.教授が担当した業務と、課題に向き合う中で得た経験を記録する実務経験アーカイブ。"

export const metadata: Metadata = {
  title: "Works",
  description,
  alternates: { canonical: "/works" },
  openGraph: { title: "Works | J.K. Lab", description, url: "/works" },
}

export default function WorksPage() {
  return (
    <main className={style.main}>
      <div className={style.container}>
        <header className={style.hero}>
          <h1>WORKS</h1>
          <p>実務経験</p>
        </header>

        <section className={style.archive} aria-label="実務経験一覧">
          <WorkArchiveGrid works={WORKS} />
        </section>

        <nav className={style.home_navigation} aria-label="ページナビゲーション">
          <Link href="/">
            <ArrowIcon direction="right" />
            トップへ戻る
          </Link>
        </nav>
      </div>
    </main>
  )
}
