"use client"

import Link from "next/link"
import { useState } from "react"
import SectionContainer from "@/components/primitives/SectionContainer"
import SectionTitle from "@/components/primitives/SectionTitle"
import { EXPERIMENTS } from "@/const/experiments"
import {
  CURRENT_PLAY_AVAILABILITY,
  PLAY_AVAILABILITY,
  PLAY_FLYER,
} from "@/const/playWithJk"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import style from "@/styles/feature/PlayWithJkFeatureSection.module.scss"

export default function PlayWithJkFeatureSection() {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ once: true })
  const [isFeatureVisible, setIsFeatureVisible] = useState(false)
  const isOpen = PLAY_AVAILABILITY.status === "OPEN"
  const currentProject = isOpen
    ? undefined
    : EXPERIMENTS.find((experiment) => experiment.code === PLAY_AVAILABILITY.currentExperimentCode)

  return (
    <SectionContainer ref={ref} sectionClassName={style.section}>
      <SectionTitle
        title="SPECIAL_FEATURE"
        isVisible={isVisible}
        onAnimationEnd={() => setIsFeatureVisible(true)}
      />

      <Link
        href="/play-with-jk"
        className={`${style.feature} ${isFeatureVisible ? style.feature_visible : ""}`}
        aria-label="Play With J.K.の募集ビラを見る"
      >
        <header className={style.terminal_header}>
          <span><span aria-hidden="true">&gt;</span> FEATURE CHANNEL / PWJ</span>
          <span className={isOpen ? style.online : style.busy}>
            {isOpen ? "AVAILABLE" : "BUSY"}
          </span>
        </header>

        <div className={style.poster}>
          <span className={style.tape} aria-hidden="true" />
          <div className={style.copy}>
            <p className={style.play_label}>{PLAY_FLYER.label}</p>
            <p className={style.wanted}>{PLAY_FLYER.wanted}</p>
            <h3>
              {PLAY_FLYER.titleLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h3>
          </div>

          <div className={`${style.status} ${isOpen ? style.status_open : style.status_closed}`}>
            <p className={style.status_badge}>{CURRENT_PLAY_AVAILABILITY.label}</p>
            <p className={style.status_label}>
              {isOpen ? "1 SLOT AVAILABLE" : "NOW IN PROGRESS"}
            </p>
            <strong>{isOpen ? "共同制作受付中" : currentProject?.title ?? "PROJECT IN PROGRESS"}</strong>
            <p>{isOpen ? "アイデアを受付中" : "WAITLIST OPEN / 順番待ち受付中"}</p>
          </div>

          <span className={style.cta}>
            秘密基地の募集ビラを見る <span aria-hidden="true">-&gt;</span>
          </span>
        </div>
      </Link>
    </SectionContainer>
  )
}
