"use client"

import type { Experiment } from "@/const/experiments"
import ExperimentCard from "@/components/ui/ExperimentCard"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import style from "@/styles/feature/experiments/ExperimentArchiveGrid.module.scss"

const CARD_REVEAL_INTERVAL_MS = 160
const CARD_CONTENT_DELAY_MS = 80

type ExperimentArchiveGridProps = {
  experiments: readonly Experiment[]
}

export default function ExperimentArchiveGrid({
  experiments,
}: ExperimentArchiveGridProps) {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.15,
    once: true,
  })

  return (
    <div ref={ref} className={style.grid}>
      {experiments.map((experiment, index) => (
        <ExperimentCard
          key={experiment.code}
          experiment={experiment}
          isVisible={isVisible}
          revealDelay={index * CARD_REVEAL_INTERVAL_MS}
          contentDelay={index * CARD_REVEAL_INTERVAL_MS + CARD_CONTENT_DELAY_MS}
        />
      ))}
    </div>
  )
}
