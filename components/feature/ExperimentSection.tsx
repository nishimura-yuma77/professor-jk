"use client"
import SectionContainer from "@/components/primitives/SectionContainer";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import SectionTitle from "@/components/primitives/SectionTitle";
import ComingSoon from "@/components/primitives/ComingSoon";

export default function ExperimentSection() {
  const {
    ref,
    isVisible
  } = useIntersectionObserver<HTMLDivElement>({});
  return (
    <SectionContainer ref={ref}>
      <SectionTitle title={"001_EXPERIMENTS"} isVisible={isVisible} />
      <ComingSoon isVisible={isVisible} />
    </SectionContainer>
  )
}