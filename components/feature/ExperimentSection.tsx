"use client"
import SectionContainer from "@/components/primitives/SectionContainer";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import SectionTitle from "@/components/primitives/SectionTitle";
import style from "@/styles/feature/ExperimentSection.module.scss"

export default function ExperimentSection() {
  const {
    ref,
    isVisible
  } = useIntersectionObserver({threshold: 0});
  return (
    <SectionContainer ref={ref}>
      <SectionTitle title={"001_EXPERIMENTS"} isVisible={isVisible} />
      <p className={`${style.container} ${style.coming_soon}`}>coming soon...</p>
    </SectionContainer>
  )
}