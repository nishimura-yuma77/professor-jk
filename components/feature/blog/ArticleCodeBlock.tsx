import { codeToHtml, type BundledLanguage } from "shiki"
import ArticleCodeCopyButton from "@/components/feature/blog/ArticleCodeCopyButton"
import style from "@/styles/feature/blog/ArticleCodeBlock.module.scss"

type ArticleCodeBlockProps = {
  code: string
  language: BundledLanguage
  filename?: string
}

export default async function ArticleCodeBlock({
  code,
  language,
  filename,
}: ArticleCodeBlockProps) {
  const normalizedCode = code.replace(/\n$/, "")
  const highlightedCode = await codeToHtml(normalizedCode, {
    lang: language,
    theme: "vesper",
  })
  const label = filename ? `${filename} (${language})` : `${language} code`

  return (
    <figure className={style.code_block} aria-label={label}>
      <figcaption className={style.toolbar}>
        <span className={style.file_information}>
          {filename && <span className={style.filename}>{filename}</span>}
          <span className={style.language}>{language}</span>
        </span>
        <ArticleCodeCopyButton code={normalizedCode} />
      </figcaption>
      <div
        className={style.highlighted_code}
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </figure>
  )
}
