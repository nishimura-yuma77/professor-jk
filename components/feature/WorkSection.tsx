"use client"

import { useState, type ReactNode } from "react"
import SectionContainer from "@/components/primitives/SectionContainer"
import SectionTitle from "@/components/primitives/SectionTitle"
import ArchiveLink from "@/components/ui/ArchiveLink"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import style from "@/styles/feature/WorkSection.module.scss"

export default function WorkSection({ children }: { children: ReactNode }) {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ once: true, threshold: 0.1 })
  const [isContentVisible, setIsContentVisible] = useState(false)

  return (
    <SectionContainer ref={ref} className={style.container}>
      <SectionTitle
        title="001_WORKS"
        isVisible={isVisible}
        onAnimationEnd={() => setIsContentVisible(true)}
      />
      <div
        className={`${style.content} ${isContentVisible ? style.content_visible : ""}`}
        inert={!isContentVisible}
      >
        {children}
        <ArchiveLink
          href="/works"
          kicker="WORK ARCHIVE"
          label="実務記録一覧を見る"
        />
      </div>
    </SectionContainer>
  )
}
