import Image from "next/image"
import style from "@/styles/ui/TachieImage.module.scss"
import { useEffect, useState } from "react"

const TACHIE_PROPS = {
  width: 832,
  height: 1216
}

type TachieImageProps = {
  isVisible: boolean
  appearDuration?: number
}

export default function TachieImage({
  isVisible,
  appearDuration = 1500
}: TachieImageProps) {
  const [isThumbsUp, setIsThumbsUp] = useState(false)
  useEffect(() => {
    if (!isVisible) {
      setIsThumbsUp(false)
      return
    }
    const timer = setTimeout(() => {
      setIsThumbsUp(true)
    }, appearDuration)
    return () => {
      clearTimeout(timer)
    }
  }, [isVisible, appearDuration])
  return (
    <div className={style.container}>
      <div
        className={`${style.surprised} ${
          isVisible ? style.visible : ""
        } ${
          isThumbsUp ? style.fade_out : ""
        }`}
        style={{
          "--appear-duration": `${appearDuration}ms`
        } as React.CSSProperties}
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
        className={`${style.image} ${style.thumbs_up} ${isThumbsUp ? style.fade_in : ""}`}
      />
    </div>
  )
}