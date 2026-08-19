"use client"

import Link from "next/link"
import type { Experiment } from "@/const/experiments";
import style from "@/styles/ui/ExperimentCard.module.scss"
import ExperimentStatusBadge from "../primitives/ExperimentStatusBadge";
import StackChip from "../primitives/StackChip";
import MediaLinkIcon from "./MediaLInkIcon";
import TypewriterText from "../primitives/TypewriterText";
import { useState } from "react";
import type { CSSProperties, TransitionEvent } from "react";

type ExperimentCardProps = {
  experiment: Experiment
  isVisible: boolean
  revealDelay: number
  contentDelay: number
}
export default function ExperimentCard({
  experiment,
  isVisible,
  revealDelay,
  contentDelay
}: ExperimentCardProps) {
  const {
    code,
    slug,
    status,
    visibility,
    title,
    subtitle,
    description,
    stacks,
    media
  } = experiment
  const [isCardAnimationEnd, setIsCardAnimationEnd] = useState(isVisible)

  const handleCardAnimationEnd = (event: TransitionEvent<HTMLElement>) =>{
    if (
      !isVisible
      || event.target !== event.currentTarget
      || event.propertyName !== "opacity"
    ) return

    setIsCardAnimationEnd(true)
  }

  return (
    <article
      className={`${style.card} ${isVisible ? style.visible : ""} ${
        isCardAnimationEnd ? style.reveal_complete : ""
      }`}
      style={{
        "--card-reveal-delay": `${revealDelay}ms`
      } as CSSProperties}
      onTransitionEnd={handleCardAnimationEnd}
    >
      <div className={style.code_and_status}>
        <p className={style.code}>{code}</p>
        <div className={style.badges}>
          <span className={`${style.visibility} ${
            visibility === "PUBLIC" ? style.public : style.private
          }`}>
            {visibility}
          </span>
          <ExperimentStatusBadge
            status={status}
            className={style.status}
            animationDelay={`${-((revealDelay * 7) % 3000)}ms`}
          />
        </div>
      </div>
      <div className={style.title_area}>
        <div className={style.title_and_media}>
          <h3 className={style.title}>
            <Link href={`/experiments/${slug}`} className={style.detail_link}>
              <TypewriterText
                text={title}
                isVisible={isVisible}
                animationDelay={20}
                startDelay={contentDelay}
              />
            </Link>
          </h3>
          <div className={style.media_links}>
            {media?.map((m, index) => {
              return (
                <MediaLinkIcon key={index} mediaLink={m} className={style.media_icon} />
              )
            })}
          </div>
        </div>
        <p className={style.subtitle}>
          <TypewriterText
            text={subtitle ? subtitle : ""}
            isVisible={isVisible}
            animationDelay={20}
            startDelay={contentDelay}
          />
        </p>
      </div>
      <p className={style.description}>
        <TypewriterText
          text={description}
          isVisible={isVisible}
          animationDelay={20}
          startDelay={contentDelay}
        />
      </p>
      <div className={`${style.stack_area} ${isCardAnimationEnd ? style.visible : ""}`}>
        <p className={style.stack_title}>STACKS</p>
        <p className={style.stack_list}>
          {stacks?.map((stack, index) => {
            return (
              <StackChip 
                key={index}
                text={stack}
              />
            )
          })}
        </p>
      </div>
      <span className={style.detail_hint} aria-hidden="true">
        OPEN FILE -&gt;
      </span>
    </article>
  )
}
