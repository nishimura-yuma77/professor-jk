import Image from "next/image"
import type { ArticleImage } from "@/const/article"
import ArticleImageCarousel from "@/components/feature/blog/ArticleImageCarousel"
import style from "@/styles/feature/blog/ArticleImageGallery.module.scss"

type ArticleImageGalleryProps = {
  label: string
  images: readonly [ArticleImage, ...ArticleImage[]]
}

export default function ArticleImageGallery({ label, images }: ArticleImageGalleryProps) {
  if (images.length > 1) {
    return <ArticleImageCarousel label={label} images={images} />
  }

  const image = images[0]
  const isLandscape = image.width > image.height

  return (
    <figure className={`${style.figure} ${isLandscape ? style.landscape : ""}`} aria-label={label}>
      <div
        className={style.image_frame}
        style={isLandscape ? { aspectRatio: `${image.width} / ${image.height}` } : undefined}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 768px) 42rem, calc(100vw - 3rem)"
          className={style.image}
        />
      </div>
      {image.caption && <figcaption>{image.caption}</figcaption>}
      {isLandscape && (
        <a
          href={image.src}
          target="_blank"
          rel="noopener noreferrer"
          className={style.original_link}
          aria-label={`${label}の原寸画像を開く（新しいタブ）`}
        >
          原寸画像を開く <span aria-hidden="true">↗</span>
        </a>
      )}
    </figure>
  )
}
