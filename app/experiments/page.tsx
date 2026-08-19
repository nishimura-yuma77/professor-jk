import type { Metadata } from "next"
import ExperimentArchiveGrid from "@/components/feature/experiments/ExperimentArchiveGrid"
import ArchiveOnlineStatus from "@/components/primitives/ArchiveOnlineStatus"
import PageBackground from "@/components/ui/PageBackground"
import { EXPERIMENTS } from "@/const/experiments"
import style from "@/app/experiments/page.module.scss"

const description = "完成、進行中、停止中を含め、J.K.教授が取り組んだ実験と制作を保存するプロジェクトアーカイブ。"

export const metadata: Metadata = {
  title: "Experiments",
  description,
  alternates: {
    canonical: "/experiments",
  },
  openGraph: {
    title: "Experiments | J.K. Lab",
    description,
    url: "/experiments",
  },
}

export default function ExperimentsPage() {
  const activeCount = EXPERIMENTS.filter((experiment) => experiment.status === "ACTIVE").length
  const pausedCount = EXPERIMENTS.filter((experiment) => experiment.status === "PAUSED").length

  return (
    <PageBackground className={style.main}>
      <section className={style.hero} aria-labelledby="experiments-title">
        <ArchiveOnlineStatus label="EXPERIMENT ARCHIVE ONLINE" />
        <h1 id="experiments-title">EXPERIMENTS</h1>
        <p>完成したものだけでなく、進行中や停止中の試行も残す実験記録。</p>
        <div className={style.status} aria-label="実験記録の集計">
          <span>RECORDS: {String(EXPERIMENTS.length).padStart(3, "0")}</span>
          <span>ACTIVE: {String(activeCount).padStart(3, "0")}</span>
          <span>PAUSED: {String(pausedCount).padStart(3, "0")}</span>
        </div>
      </section>

      <section className={style.archive} aria-labelledby="archive-title">
        <div className={style.section_heading}>
          <p>PROJECT INDEX</p>
          <h2 id="archive-title">実験一覧</h2>
        </div>
        <ExperimentArchiveGrid experiments={EXPERIMENTS} />
      </section>
    </PageBackground>
  )
}
