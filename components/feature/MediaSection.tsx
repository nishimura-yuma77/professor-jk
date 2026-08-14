"use client"

import SectionContainer from "@/components/primitives/SectionContainer";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import SectionTitle from "@/components/primitives/SectionTitle";
import ComingSoon from "@/components/primitives/ComingSoon";

export default function MediaSection() {
  const {
    ref,
    isVisible
  } = useIntersectionObserver({threshold: 0})
  return (
    <SectionContainer ref={ref}>
      <SectionTitle title={"002_MEDIA"} isVisible={isVisible} />
      <ComingSoon />
    </SectionContainer>
  )
}