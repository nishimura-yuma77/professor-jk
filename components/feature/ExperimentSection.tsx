"use client"
import ArchiveLink from "@/components/ui/ArchiveLink"
import SectionContainer from "@/components/primitives/SectionContainer";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import SectionTitle from "@/components/primitives/SectionTitle";
import { EXPERIMENTS } from "@/const/experiments";
import HomeExperimentFileCard from "@/components/feature/experiments/HomeExperimentFileCard";
import style from "@/styles/feature/ExperimentSection.module.scss"
import { useState } from "react";

const CARD_REVEAL_INTERVAL = 120
const HOME_EXPERIMENT_LIMIT = 2

const recentExperiments = [...EXPERIMENTS]
  .filter((experiment) => experiment.featured)
  .sort((a, b) => b.code.localeCompare(a.code))
  .slice(0, HOME_EXPERIMENT_LIMIT)

export default function ExperimentSection() {
  const {
    ref,
    isVisible
  } = useIntersectionObserver<HTMLDivElement>({ once: true });
  const [areCardsVisible, setAreCardsVisible] = useState(false)

  return (
    <SectionContainer ref={ref} className={style.container}>
      <SectionTitle
        title={"002_EXPERIMENTS"}
        isVisible={isVisible}
        onAnimationEnd={() => setAreCardsVisible(true)}
      />
      <div className={style.experiment_area}>
        <div className={style.desk_documents} aria-hidden="true">
          <span className={`${style.desk_document} ${style.document_one}`} />
          <span className={`${style.desk_document} ${style.document_two}`} />
          <span className={`${style.desk_document} ${style.document_three}`} />
          <span className={`${style.desk_document} ${style.document_four}`} />
        </div>
        {recentExperiments.map((experiment, index) => {
          return (
            <HomeExperimentFileCard
              key={experiment.code}
              experiment={experiment}
              isVisible={areCardsVisible}
              revealDelay={index * CARD_REVEAL_INTERVAL}
            />
          )
        })}
      </div>
      <ArchiveLink
        href="/experiments"
        kicker="EXPERIMENT ARCHIVE"
        label="すべての実験記録を見る"
        isVisible={areCardsVisible}
        revealDelay={360}
        className={style.archive_link}
      />
    </SectionContainer>
  )
}
