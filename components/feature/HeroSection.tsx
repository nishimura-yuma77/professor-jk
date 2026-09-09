"use client"

import SectionContainer from "@/components/primitives/SectionContainer";
import style from "@/styles/feature/HeroSection.module.scss"
import YoutubeIcon from "@/components/primitives/YoutubeIcon";
import XTwitterIcon from "@/components/primitives/XTwitterIcon";
import ArrowIcon from "@/components/primitives/ArrowIcon";
import ActiveBadge from "@/components/ui/ActiveBadge";
import TachieImage from "@/components/ui/TachieImage";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import TypewriterText from "@/components/primitives/TypewriterText";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { PROFILE_FLAVOR_TEXT, PROFILE_TEXT } from "@/const/profile"
import { XTWITTER_LINK, YOUTUBE_LINK } from "@/const/constants"

const TRANSFER_TEXT = "START TRANSFER PROTOCOL..."

const HERO_PHASE_DURATION = {
  observer: 600,
  protocol: 800,
  transferring: 800,
  posing: 250
} as const

const HERO_PHASE_INTERVAL = {
  observerToProtocol: 400,
  protocolToTransferring: 500,
  transferringToPosing: 500,
  posingToCompleted: 100
} as const

// 表示領域に入ったら、観測から転送・ポーズまでの5フェーズを進める。
type HeroPhase = "observer" | "protocol" | "transferring" | "posing" | "completed"
type ContentPhase = "headline" | "description"

const getCharacterDelay = (text: string, duration: number) => (
  duration / Math.max(text.length - 1, 1)
)

export default function HeroSection({ children }: { children: ReactNode }) {
  const {
    ref,
    isVisible
  } = useIntersectionObserver<HTMLDivElement>({ once: true, threshold: 0.1 })
  const { ref: activityRef, isVisible: isActivityVisible } = useIntersectionObserver<HTMLDivElement>({
    once: true,
    threshold: 0.15,
  })
  const [phase, setPhase] = useState<HeroPhase>("observer")
  const [contentPhase, setContentPhase] = useState<ContentPhase>("headline")
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isHeadlineVisible = phase === "completed"
  const isDescriptionVisible = isHeadlineVisible && contentPhase !== "headline"
  const areActionsVisible = isVisible

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== null) {
        clearTimeout(transitionTimerRef.current)
      }
    }
  }, [])

  // observer　-> transferのフェーズだけ、タイマーで制御する必要がある。そのためのeffect
  useEffect(() => {
    if (!isVisible || phase !== "observer") return

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
  }, [isVisible, phase])

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
      <div className={style.profile_content}>
        <div className={style.tachie_area}>
          <div className={style.subject_frame} aria-hidden="true">
            <span className={style.subject_label}>PROF. J.K.</span>
            <span className={style.subject_caption}>EXPERIMENT / 000</span>
          </div>
          <div
            className={`${style.transfer_console} ${
              isVisible && (phase === "observer" || phase === "protocol")
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
        <div className={style.profile_copy}>
          <div className={style.intro_area}>
            <div className={style.identity_header}>
              <div className={style.name_area}>
                <div className={style.name_row}>
                  <p className={style.chara_name}>J.K.</p>
                  <ActiveBadge isOnline={phase === "completed"} />
                </div>
                <p className={style.chara_title}>WEB ENGINEER / CREATOR</p>
              </div>
              <nav className={style.channels} aria-label="J.K.のSNS">
                <a
                  href={YOUTUBE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTubeで活動を見る（新しいタブで開く）"
                  title="YouTube"
                >
                  <YoutubeIcon aria-hidden="true" />
                </a>
                <a
                  href={XTWITTER_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Xで活動を見る（新しいタブで開く）"
                  title="X"
                >
                  <XTwitterIcon aria-hidden="true" />
                </a>
              </nav>
            </div>
            <h1
              className={`${style.headline} ${isHeadlineVisible ? style.slide_in : ""}`}
              onAnimationEnd={(event) => {
                if (event.target !== event.currentTarget || event.pseudoElement) return
                setContentPhase((current) => current === "headline" ? "description" : current)
              }}
            >
              <span className={style.visually_hidden}>J.K.教授の開発ラボ。 </span>
              <span>挑戦を、</span>
              <span><em>設計で拡張する。</em></span>
            </h1>
          </div>
          <div
            className={`${style.description_area} ${isDescriptionVisible ? style.slide_in : ""}`}
          >
            <p className={style.profile_text}>{PROFILE_TEXT}</p>
            <p className={style.flavor_text}>{PROFILE_FLAVOR_TEXT}</p>
          </div>
          <div
            className={`${style.visitor_guide} ${areActionsVisible ? style.actions_visible : ""}`}
            inert={!areActionsVisible}
          >
            <nav className={style.actions} aria-label="ラボを探索する">
              <Link href="/experiments" className={style.primary_action}>
                <span>実験・制作物を見る</span>
                <ArrowIcon className={style.action_icon} />
              </Link>
              <Link href="/blog" className={style.secondary_action}>
                <span>開発ログを読む</span>
                <ArrowIcon direction="right" className={style.action_icon} />
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div
        ref={activityRef}
        className={`${style.activity_reveal} ${isActivityVisible ? style.activity_visible : ""}`}
      >
        {children}
      </div>
    </SectionContainer>
  )
}
