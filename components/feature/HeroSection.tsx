"use client"

import SectionContainer from "@/components/primitives/SectionContainer";
import SectionTitle from "@/components/primitives/SectionTitle"
import style from "@/styles/feature/HeroSection.module.scss"
import ActiveBadge from "@/components/ui/ActiveBadge";
import TachieImage from "@/components/ui/TachieImage";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import TypewriterText from "../primitives/TypewriterText";

const PROFILE_TEXT = "イカれたエンジニア。\nシャーロック・ホームズのモリアーティ教授に憧れ、教授（Professor）を自称している。\n目の下のクマは恋人に振られた時に泣きすぎて取れなくなった。睡眠時間は8時間。"
export default function HeroSection() {
  const {
    ref,
    isVisible
  } = useIntersectionObserver({threshold: 0})
  return (
    <SectionContainer ref={ref}>
      <div className={style.title_area}>
        <SectionTitle title={"SUBJECT_000"} isVisible={isVisible} />
        <ActiveBadge isVisible={isVisible}/>
      </div>
      <div className={style.profile_content}>
        <div className={style.tachie_area}>
          <TachieImage isVisible={true}/>
        </div>
        <div className={style.description_area}>
          <div className={style.name_area}>
            <h1 className={style.chara_name}>J.K.</h1>
            <p className={style.chara_title}>Prof. J.K.</p>
          </div>
          <p className={style.profile_text}>
            <TypewriterText text={PROFILE_TEXT} isVisible={true} animationDelay={20}/>
          </p>
        </div>
      </div>
    </SectionContainer>
  )
}