import type { BundledLanguage } from "shiki"

export type ArticleImage = {
  id: string
  src: string
  alt: string
  width: number
  height: number
  caption?: string
}

export type ArticleBlock =
  | {
      id: string
      type: "heading"
      level: 2 | 3
      text: string
      anchor: string
    }
  | {
      id: string
      type: "paragraph"
      text: string
    }
  | {
      id: string
      type: "list"
      style: "ordered" | "unordered"
      items: readonly [
        { id: string; text: string },
        ...{ id: string; text: string }[],
      ]
    }
  | {
      id: string
      type: "imageGallery"
      label: string
      images: readonly [ArticleImage, ...ArticleImage[]]
    }
  | {
      id: string
      type: "externalLink"
      label: string
      description: string
      href: string
    }
  | {
      id: string
      type: "code"
      language: BundledLanguage
      filename?: string
      code: string
    }
