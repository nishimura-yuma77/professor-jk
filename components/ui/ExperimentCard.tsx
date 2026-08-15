import type { Experiment } from "@/const/experiments";
import style from "@/styles/ui/ExperimentCard.module.scss"
import ExperimentStatusBadge from "../primitives/ExperimentStatusBadge";
import StackChip from "../primitives/StackChip";
import MediaLinkIcon from "./MediaLInkIcon";

type ExperimentCardProps = {
  experiment: Experiment
}
export default function ExperimentCard({
  experiment
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
  return (
    <div className={style.card}>
      <div className={style.code_and_status}>
        <p className={style.code}>{code}</p>
        <ExperimentStatusBadge status={status} className={style.status} />
      </div>
      <div className={style.title_area}>
        <div className={style.title_and_media}>
          <h3 className={style.title}>{title}</h3>
          <div>
            {media?.map((m, index) => {
              return (
                <MediaLinkIcon key={index} mediaLink={m} className={style.media_icon} />
              )
            })}
          </div>
        </div>
        <p className={style.subtitle}>{subtitle}</p>
      </div>
      <p className={style.description}>{description}</p>
      <div className={style.stack_area}>
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