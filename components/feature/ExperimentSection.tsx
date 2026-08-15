"use client"
import SectionContainer from "@/components/primitives/SectionContainer";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import SectionTitle from "@/components/primitives/SectionTitle";
import { EXPERIMENTS } from "@/const/experiments";
import ExperimentCard from "@/components/ui/ExperimentCard";
import style from "@/styles/feature/ExperimentSection.module.scss"

export default function ExperimentSection() {
  const {
    ref,
    isVisible
  } = useIntersectionObserver<HTMLDivElement>({});
  return (
    <SectionContainer ref={ref}>
      <SectionTitle title={"001_EXPERIMENTS"} isVisible={isVisible} />
      <div className={style.experiment_area}>
        {EXPERIMENTS.map((ex, index) => {
          return (
            <ExperimentCard key={index} experiment={ex} />
          )
        })}
      </div>
    </SectionContainer>
  )
}