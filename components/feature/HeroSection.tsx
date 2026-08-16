"use client"

import SectionContainer from "@/components/primitives/SectionContainer";
import SectionTitle from "@/components/primitives/SectionTitle"
import style from "@/styles/feature/HeroSection.module.scss"
import ActiveBadge from "@/components/ui/ActiveBadge";
import TachieImage from "@/components/ui/TachieImage";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import TypewriterText from "@/components/primitives/TypewriterText";
import { useEffect, useRef, useState } from "react";

const HERO_TITLE = "SUBJECT_000"
const TRANSFER_TEXT = "START TRANSFER PROTOCOL..."
const PROFILE_TEXT = "イカれたエンジニア。\nシャーロック・ホームズのモリアーティ教授に憧れ、教授（Professor）を自称している。\n目の下のクマは恋人に振られた時に泣きすぎて取れなくなった。睡眠時間は8時間。"

const HERO_PHASE_DURATION = {
  observer: 600,
  protocol: 800,
  transferring: 800,
  posing: 200
} as const

const HERO_PHASE_INTERVAL = {
  titleToObserver: 200,
  observerToProtocol: 400,
  protocolToTransferring: 500,
  transferringToPosing: 800,
  posingToCompleted: 200
} as const

// アニメーションのフェーズ制御。この6フェーズにあわせてアニメーションを発生させる。
type HeroPhase = "title" | "observer" | "protocol" | "transferring" | "posing" | "completed"

const getCharacterDelay = (text: string, duration: number) => (
  duration / Math.max(text.length - 1, 1)
)

export default function HeroSection() {
  const {
    ref,
    isVisible
  } = useIntersectionObserver<HTMLDivElement>({ once: true })
  const [phase, setPhase] = useState<HeroPhase>("title")
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== null) {
        clearTimeout(transitionTimerRef.current)
      }
    }
  }, [])

  // observer　-> transferのフェーズだけ、タイマーで制御する必要がある。そのためのeffect
  useEffect(() => {
    if (phase !== "observer") return

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    const observerTimer = setTimeout(() => {
      setPhase((currentPhase) => (
        currentPhase === "observer" ? "protocol" : currentPhase
      ))
    }, prefersReducedMotion
      ? 0
      : HERO_PHASE_DURATION.observer + HERO_PHASE_INTERVAL.observerToProtocol
    )

    return () => {
      clearTimeout(observerTimer)
    }
  }, [phase])

  const schedulePhaseTransition = (
    from: HeroPhase,
    to: HeroPhase,
    interval: number
  ) => {
    if (transitionTimerRef.current !== null) {
      clearTimeout(transitionTimerRef.current)
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    transitionTimerRef.current = setTimeout(() => {
      setPhase((currentPhase) => currentPhase === from ? to : currentPhase)
      transitionTimerRef.current = null
    }, prefersReducedMotion ? 0 : interval)
  }

  return (
    <SectionContainer
      ref={ref}
      className={style.hero_container}
      sectionClassName={style.hero_section}
    >
      <h1 className={style.page_title}>J.K.教授の開発ラボ</h1>
      <div className={style.title_area}>
        <SectionTitle
          title={HERO_TITLE}
          isVisible={isVisible}
          onAnimationEnd={() => {
            schedulePhaseTransition(
              "title",
              "observer",
              HERO_PHASE_INTERVAL.titleToObserver
            )
          }}
        />
        <ActiveBadge isOnline={phase === "completed"}/>
      </div>
      <div className={style.profile_content}>
        <div className={style.tachie_area}>
          <div
            className={`${style.transfer_console} ${
              phase === "observer" || phase === "protocol"
                ? ""
                : style.transfer_console_hidden
            }`}
            aria-hidden="true"
          >
            <p className={style.detection_text}>
              <span className={style.prompt_symbol}>{">"}</span>
              <span>OBSERVER DETECTED</span>
            </p>
            <p className={`${style.transfer_text} ${
              phase === "protocol" ? style.transfer_text_visible : ""
            }`}>
              <span className={style.prompt_symbol}>{">"}</span>
              <TypewriterText
                text={TRANSFER_TEXT}
                isVisible={isVisible && phase === "protocol"}
                animationDelay={getCharacterDelay(
                  TRANSFER_TEXT,
                  HERO_PHASE_DURATION.protocol
                )}
                displayCursor={true}
                onAnimationEnd={() => {
                  schedulePhaseTransition(
                    "protocol",
                    "transferring",
                    HERO_PHASE_INTERVAL.protocolToTransferring
                  )
                }}
              />
            </p>
          </div>
          <TachieImage
            phase={phase}
            transferDuration={HERO_PHASE_DURATION.transferring}
            poseDuration={HERO_PHASE_DURATION.posing}
            onTransferEnd={() => {
              schedulePhaseTransition(
                "transferring",
                "posing",
                HERO_PHASE_INTERVAL.transferringToPosing
              )
            }}
            onPoseEnd={() => {
              schedulePhaseTransition(
                "posing",
                "completed",
                HERO_PHASE_INTERVAL.posingToCompleted
              )
            }}
          />
        </div>
        <div className={style.description_area}>
          <div className={style.name_area}>
            <p className={style.chara_name}>J.K.</p>
            <p className={style.chara_title}>Prof. J.K.</p>
          </div>
          <p className={style.profile_text}>
            <TypewriterText
              text={PROFILE_TEXT}
              isVisible={phase === "completed"}
              animationDelay={1}
            />
          </p>
        </div>
      </div>
    </SectionContainer>
  )
}
