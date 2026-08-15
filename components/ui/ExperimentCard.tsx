import type { Experiment } from "@/const/experiments";
import style from "@/styles/ui/ExperimentCard.module.scss"
import ExperimentStatusBadge from "../primitives/ExperimentStatusBadge";
import StackChip from "../primitives/StackChip";
import MediaLinkIcon from "./MediaLInkIcon";
import useError from "@/hooks/useError";
import { EXPERIMENT_DETAIL_NOT_IMPLEMENTED_ERROR } from "@/const/error";

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
  const { showError } = useError();
  // TODO: 今後クリックしたらプロジェクト詳細ページに遷移するようにするが、今はエラーとしてメッセージを表示するのみ
  const handleClick = () => {
    showError({ message: EXPERIMENT_DETAIL_NOT_IMPLEMENTED_ERROR})
  }
  return (
    <div className={style.card}
      onClick={handleClick}
    >
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