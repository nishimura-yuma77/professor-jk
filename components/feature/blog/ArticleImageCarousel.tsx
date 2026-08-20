"use client"

import Image from "next/image"
import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  type FocusEvent,
  type UIEvent,
} from "react"
import type { ArticleImage } from "@/const/article"
import style from "@/styles/feature/blog/ArticleImageCarousel.module.scss"

const AUTOPLAY_INTERVAL_MS = 5000

type ArticleImageCarouselProps = {
  label: string
  images: readonly ArticleImage[]
}

export default function ArticleImageCarousel({
  label,
  images,
}: ArticleImageCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocusWithin, setIsFocusWithin] = useState(false)
  const [isDocumentHidden, setIsDocumentHidden] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const shouldAutoplay = isAutoplayEnabled
    && !isHovered
    && !isFocusWithin
    && !isDocumentHidden
    && !prefersReducedMotion

  const goTo = (index: number) => {
    const nextIndex = (index + images.length) % images.length
    const viewport = viewportRef.current
    if (!viewport) return

    viewport.scrollTo({
      left: viewport.clientWidth * nextIndex,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    })
    setActiveIndex(nextIndex)
  }

  const advance = useEffectEvent(() => {
    goTo(activeIndex + 1)
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)
    updatePreference()
    mediaQuery.addEventListener("change", updatePreference)
    return () => mediaQuery.removeEventListener("change", updatePreference)
  }, [])

  useEffect(() => {
    const handleVisibilityChange = () => setIsDocumentHidden(document.hidden)
    handleVisibilityChange()
    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [])

  useEffect(() => {
    if (!shouldAutoplay) return

    const timer = window.setInterval(advance, AUTOPLAY_INTERVAL_MS)
    return () => window.clearInterval(timer)
  }, [shouldAutoplay])

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const viewport = event.currentTarget
    if (viewport.clientWidth === 0) return

    const nextIndex = Math.round(viewport.scrollLeft / viewport.clientWidth)
    if (nextIndex >= 0 && nextIndex < images.length) {
      setActiveIndex(nextIndex)
    }
  }

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsFocusWithin(false)
    }
  }

  return (
    <section
      className={style.carousel}
      aria-label={label}
      aria-roledescription="carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocusWithin(true)}
      onBlurCapture={handleBlur}
    >
      <div className={style.toolbar}>
        <span className={style.counter} aria-live="polite">
          {String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
        <button
          type="button"
          className={style.autoplay_button}
          aria-pressed={!isAutoplayEnabled}
          disabled={prefersReducedMotion}
          onClick={() => setIsAutoplayEnabled((enabled) => !enabled)}
        >
          {prefersReducedMotion
            ? "AUTO OFF"
            : isAutoplayEnabled
              ? "PAUSE"
              : "PLAY"}
        </button>
      </div>

      <div className={style.stage}>
        <button
          type="button"
          className={`${style.nav_button} ${style.nav_previous}`}
          aria-label="前の画像"
          onClick={() => goTo(activeIndex - 1)}
        >
          <span aria-hidden="true">←</span>
        </button>

        <div
          ref={viewportRef}
          className={style.viewport}
          onScroll={handleScroll}
        >
          {images.map((image, index) => (
            <figure
              key={image.id}
              className={style.slide}
              aria-label={`${images.length}枚中${index + 1}枚目`}
              aria-roledescription="slide"
            >
              <div className={style.image_frame}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 768px) 42rem, calc(100vw - 3rem)"
                  className={style.image}
                />
              </div>
              {image.caption && <figcaption>{image.caption}</figcaption>}
            </figure>
          ))}
        </div>

        <button
          type="button"
          className={`${style.nav_button} ${style.nav_next}`}
          aria-label="次の画像"
          onClick={() => goTo(activeIndex + 1)}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <div className={style.thumbnails} aria-label="表示する画像を選択">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            className={`${style.thumbnail} ${
              index === activeIndex ? style.thumbnail_active : ""
            }`}
            aria-label={`${index + 1}枚目を表示`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => goTo(index)}
          >
            <Image
              src={image.src}
              alt=""
              width={72}
              height={72}
              className={style.thumbnail_image}
            />
          </button>
        ))}
      </div>
    </section>
  )
}
