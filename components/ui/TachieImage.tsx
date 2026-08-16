import Image from "next/image"
import style from "@/styles/ui/TachieImage.module.scss"
import type { AnimationEvent, CSSProperties } from "react"

const TACHIE_PROPS = {
  width: 832,
  height: 1216
}

export type TachieImagePhase = "title" | "observer" | "protocol" | "transferring" | "posing" | "completed"

type TachieImageProps = {
  phase: TachieImagePhase
  transferDuration: number
  poseDuration: number
  onTransferEnd: () => void
  onPoseEnd: () => void
}

export default function TachieImage({
  phase,
  transferDuration,
  poseDuration,
  onTransferEnd,
  onPoseEnd
}: TachieImageProps) {
  const isPoseVisible = phase === "posing" || phase === "completed"

  const handleAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.pseudoElement) return

    if (phase === "transferring") {
      onTransferEnd()
    } else if (phase === "posing") {
      onPoseEnd()
    }
  }

  return (
    <div
      className={style.container}
      style={{
        "--transfer-duration": `${transferDuration}ms`,
        "--pose-duration": `${poseDuration}ms`
      } as CSSProperties}
    >
      <div
        className={`${style.surprised} ${
          phase === "transferring" ? style.transferring : ""
        } ${isPoseVisible ? style.fade_out : ""
        }`}
        onAnimationEnd={handleAnimationEnd}
      >
        <Image
          src="/images/character/tachie_surprised.png"
          alt="J.K. 立ち絵 驚き"
          width={TACHIE_PROPS.width}
          height={TACHIE_PROPS.height}
          loading="eager"
          className={style.image}
        />
      </div>
      <Image
        src="/images/character/tachie.png"
        alt="J.K. 立ち絵"
        width={TACHIE_PROPS.width}
        height={TACHIE_PROPS.height}
        loading="eager"
        className={`${style.image} ${style.thumbs_up} ${isPoseVisible ? style.fade_in : ""}`}
      />
    </div>
  )
}
