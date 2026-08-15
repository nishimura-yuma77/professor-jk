import type { Experiment } from "@/const/experiments";
import style from "@/styles/ui/ExperimentCard.module.scss"
import ExperimentStatusBadge from "../primitives/ExperimentStatusBadge";
import StackChip from "../primitives/StackChip";
import MediaLinkIcon from "./MediaLInkIcon";
import useError from "@/hooks/useError";
import { EXPERIMENT_DETAIL_NOT_IMPLEMENTED_ERROR } from "@/const/error";
import TypewriterText from "../primitives/TypewriterText";
import { useEffect, useState } from "react";

type ExperimentCardProps = {
  experiment: Experiment
  isVisible: boolean
}
export default function ExperimentCard({
  experiment,
  isVisible
}: ExperimentCardProps) {
  const {
    code,
    status,
    title,
    subtitle,
    description,
    stacks,
    media
  } = experiment
  const { showError } = useError();
  const [isCardAnimationEnd, setIsCardAnimationEnd] = useState<boolean>(false)
  const handleCardAnimationEnd = () =>{
    if (!isVisible) return
    setIsCardAnimationEnd(true)
  }
  useEffect(() =>{
    if (isVisible) return
    setIsCardAnimationEnd(false)
  },[isVisible]);
  // TODO: 今後クリックしたらプロジェクト詳細ページに遷移するようにするが、今はエラーとしてメッセージを表示するのみ
  const handleClick = () => {
    showError({ message: EXPERIMENT_DETAIL_NOT_IMPLEMENTED_ERROR})
  }
  return (
    <div className={`${style.card} ${isVisible ? style.visible : ""}`} onTransitionEnd={handleCardAnimationEnd}
      onClick={handleClick}
    >
      <div className={style.code_and_status}>
        <p className={style.code}>{code}</p>
        <ExperimentStatusBadge status={status} className={style.status} animationDelay={`${-Math.random() * 3}s`} />
      </div>
      <div className={style.title_area}>
        <div className={style.title_and_media}>
          <h3 className={style.title}><TypewriterText text={title} isVisible={isVisible} animationDelay={20}/></h3>
          <div>
            {media?.map((m, index) => {
              return (
                <MediaLinkIcon key={index} mediaLink={m} className={style.media_icon} />
              )
            })}
          </div>
        </div>
        <p className={style.subtitle}><TypewriterText text={subtitle ? subtitle : ""} isVisible={isVisible} animationDelay={20}/></p>
      </div>
      <p className={style.description}><TypewriterText text={description} isVisible={isVisible} animationDelay={20} /></p>
      <div className={`${style.stack_area} ${isCardAnimationEnd ? style.visible : ""}`}>
        <p className={style.stack_title}>STACKS</p>
        <p className={style.stack_list}>
          {stacks?.map((stack, index) => {
            const isLast = index === stacks.length - 1
            return (
              <StackChip 
                key={index}
                text={stack}
              />
            )
          })}
        </p>
      </div>
    </div>
  )
}