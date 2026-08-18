import type { ArticleBlock } from "@/const/blog"
import ArticleImageGallery from "@/components/feature/blog/ArticleImageGallery"
import style from "@/styles/feature/blog/ArticleRenderer.module.scss"

type ArticleRendererProps = {
  blocks: readonly ArticleBlock[]
}

function assertNever(block: never): never {
  throw new Error(`Unsupported article block: ${JSON.stringify(block)}`)
}

function renderBlock(block: ArticleBlock) {
  switch (block.type) {
    case "heading": {
      const Heading = block.level === 2 ? "h2" : "h3"
      return (
        <Heading id={block.anchor} className={style.heading}>
          <a href={`#${block.anchor}`}>{block.text}</a>
        </Heading>
      )
    }
    case "paragraph":
      return <p className={style.paragraph}>{block.text}</p>
    case "list": {
      const List = block.style === "ordered" ? "ol" : "ul"
      return (
        <List className={style.list}>
          {block.items.map((item) => <li key={item.id}>{item.text}</li>)}
        </List>
      )
    }
    case "imageGallery":
      return <ArticleImageGallery label={block.label} images={block.images} />
    case "externalLink":
      return (
        <a
          href={block.href}
          className={style.external_link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={style.external_link_label}>
            {block.label}
            <span aria-hidden="true"> ↗</span>
          </span>
          <span className={style.external_link_description}>{block.description}</span>
        </a>
      )
    default:
      return assertNever(block)
  }
}

export default function ArticleRenderer({ blocks }: ArticleRendererProps) {
  return (
    <div className={style.content}>
      {blocks.map((block) => (
        <div key={block.id} className={style.block}>
          {renderBlock(block)}
        </div>
      ))}
    </div>
  )
}
