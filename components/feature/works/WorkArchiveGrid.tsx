import WorkCard from "@/components/feature/works/WorkCard"
import type { Work } from "@/const/works"
import style from "@/styles/feature/works/WorkArchiveGrid.module.scss"

type WorkArchiveGridProps = {
  works: readonly Work[]
  headingLevel?: 2 | 3
}

export default function WorkArchiveGrid({ works, headingLevel = 2 }: WorkArchiveGridProps) {
  const sortedWorks = [...works].sort(
    (a, b) => Number(b.period === "現在") - Number(a.period === "現在")
  )

  return (
    <div className={style.grid}>
      {sortedWorks.map((work, index) => (
        <WorkCard key={work.code} work={work} index={index} headingLevel={headingLevel} />
      ))}
    </div>
  )
}
