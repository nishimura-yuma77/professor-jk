import Image from "next/image"
import type { ArticleImage } from "@/const/blog"
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

  return (
    <figure className={style.figure} aria-label={label}>
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
  )
}
