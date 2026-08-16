import type { Experiment } from "@/const/experiments";
import style from "@/styles/ui/ExperimentCard.module.scss"
import ExperimentStatusBadge from "../primitives/ExperimentStatusBadge";
import StackChip from "../primitives/StackChip";
import MediaLinkIcon from "./MediaLInkIcon";
import useError from "@/hooks/useError";
import { EXPERIMENT_DETAIL_NOT_IMPLEMENTED_ERROR } from "@/const/error";
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
    status,
    title,
    subtitle,
    description,
    stacks,
    media
  } = experiment
  const { showError } = useError();
  const [isCardAnimationEnd, setIsCardAnimationEnd] = useState<boolean>(false)

  const handleCardAnimationEnd = (event: TransitionEvent<HTMLDivElement>) =>{
    if (
      !isVisible
      || event.target !== event.currentTarget
      || event.propertyName !== "opacity"
    ) return

    setIsCardAnimationEnd(true)
  }

  // TODO: 今後クリックしたらプロジェクト詳細ページに遷移するようにするが、今はエラーとしてメッセージを表示するのみ
  const handleClick = () => {
    showError({ message: EXPERIMENT_DETAIL_NOT_IMPLEMENTED_ERROR})
  }
  return (
    <div
      className={`${style.card} ${isVisible ? style.visible : ""} ${
        isCardAnimationEnd ? style.reveal_complete : ""
      }`}
      style={{
        "--card-reveal-delay": `${revealDelay}ms`
      } as CSSProperties}
      onTransitionEnd={handleCardAnimationEnd}
      onClick={handleClick}
    >
      <div className={style.code_and_status}>
        <p className={style.code}>{code}</p>
        <ExperimentStatusBadge
          status={status}
          className={style.status}
          animationDelay={`${-((revealDelay * 7) % 3000)}ms`}
        />
      </div>
      <div className={style.title_area}>
        <div className={style.title_and_media}>
          <h3 className={style.title}>
            <TypewriterText
              text={title}
              isVisible={isVisible}
              animationDelay={20}
              startDelay={contentDelay}
            />
          </h3>
          <div>
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
    </div>
  )
}
