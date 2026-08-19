"use client"
import Link from "next/link"
import SectionContainer from "@/components/primitives/SectionContainer";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import SectionTitle from "@/components/primitives/SectionTitle";
import { EXPERIMENTS } from "@/const/experiments";
import ExperimentCard from "@/components/ui/ExperimentCard";
import style from "@/styles/feature/ExperimentSection.module.scss"
import { useState } from "react";

const CARD_REVEAL_INTERVAL = 200
const CARD_CONTENT_DELAY = 100
const FEATURED_EXPERIMENT_LIMIT = 4

const featuredExperiments = EXPERIMENTS
  .filter((experiment) => experiment.featured)
  .slice(0, FEATURED_EXPERIMENT_LIMIT)

export default function ExperimentSection() {
  const {
    ref,
    isVisible
  } = useIntersectionObserver<HTMLDivElement>({ once: true });
  const [areCardsVisible, setAreCardsVisible] = useState(false)

  return (
    <SectionContainer ref={ref}>
      <SectionTitle
        title={"001_EXPERIMENTS"}
        isVisible={isVisible}
        onAnimationEnd={() => setAreCardsVisible(true)}
      />
      <div className={style.experiment_area}>
        {featuredExperiments.map((ex, index) => {
          return (
            <ExperimentCard
              key={ex.code}
              experiment={ex}
              isVisible={areCardsVisible}
              revealDelay={index * CARD_REVEAL_INTERVAL}
              contentDelay={index * CARD_REVEAL_INTERVAL + CARD_CONTENT_DELAY}
            />
          )
        })}
      </div>
      <Link
        href="/experiments"
        className={`${style.archive_link} ${areCardsVisible ? style.archive_link_visible : ""}`}
      >
        <span>EXPERIMENT ARCHIVE</span>
        <span>すべての実験記録を見る -&gt;</span>
      </Link>
    </SectionContainer>
  )
}
