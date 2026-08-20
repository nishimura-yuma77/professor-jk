import { access, mkdtemp, readdir, readFile, rename, rm, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const slug = process.argv[2]

function getJstDate() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date())
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]))
  return `${values.year}-${values.month}-${values.day}`
}

if (!slug || !SLUG_PATTERN.test(slug)) {
  console.error("Usage: npm run blog:new -- <kebab-case-slug>")
  process.exitCode = 1
} else {
  const projectRoot = fileURLToPath(new URL("..", import.meta.url))
  const blogDirectory = path.join(projectRoot, "const", "blog")
  const articleDirectory = path.join(blogDirectory, slug)
  try {
    await access(articleDirectory)
    throw new Error(`Blog article already exists: ${slug}`)
  } catch (error) {
    if (!error || typeof error !== "object" || !("code" in error) || error.code !== "ENOENT") {
      throw error
    }
  }

  const entries = await readdir(blogDirectory, { withFileTypes: true })
  let maximumLogNumber = 0

  for (const entry of entries) {
    if (!entry.isDirectory()) continue

    const metaPath = path.join(blogDirectory, entry.name, "meta.ts")
    let source
    try {
      source = await readFile(metaPath, "utf8")
    } catch (error) {
      if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
        continue
      }
      throw error
    }

    const matches = [...source.matchAll(/\blogNumber\s*:\s*(\d+)/g)]
    if (matches.length !== 1) {
      throw new Error(`Could not determine logNumber from ${metaPath}`)
    }

    maximumLogNumber = Math.max(maximumLogNumber, Number(matches[0][1]))
  }

  const publishedAt = getJstDate()
  const metaSource = `import type { BlogArticleMeta } from "@/const/blog/types"

export const meta = {
  slug: "${slug}",
  title: "${slug}",
  description: "ブログ記事の概要をここに記載します。",
  publishedAt: "${publishedAt}",
  draft: true,
  logNumber: ${maximumLogNumber + 1},
} as const satisfies BlogArticleMeta
`
  const contentSource = `import type { ArticleBlock } from "@/const/article"

export const content = [
  {
    id: "opening",
    type: "paragraph",
    text: "ここに記事の導入文を書きます。paragraph Blockは通常の本文に使用します。",
  },
  {
    id: "section-heading",
    type: "heading",
    level: 2,
    text: "セクション見出し",
    anchor: "section-heading",
  },
  {
    id: "section-description",
    type: "paragraph",
    text: "heading Blockの後に、セクションの本文を書きます。",
  },
  {
    id: "section-list",
    type: "list",
    style: "unordered",
    items: [
      {
        id: "list-item-1",
        text: "unorderedは箇条書きに使用します。",
      },
      {
        id: "list-item-2",
        text: "番号付きにする場合はstyleをorderedへ変更します。",
      },
    ],
  },
] as const satisfies readonly ArticleBlock[]
`

  let temporaryDirectory = await mkdtemp(path.join(path.dirname(blogDirectory), ".blog-article-"))
  try {
    await Promise.all([
      writeFile(path.join(temporaryDirectory, "meta.ts"), metaSource, "utf8"),
      writeFile(path.join(temporaryDirectory, "content.ts"), contentSource, "utf8"),
    ])
    await rename(temporaryDirectory, articleDirectory)
    temporaryDirectory = undefined
  } finally {
    if (temporaryDirectory) {
      await rm(temporaryDirectory, { recursive: true, force: true })
    }
  }

  console.log(`Created const/blog/${slug}/meta.ts`)
  console.log(`Created const/blog/${slug}/content.ts`)
  console.log("Replace the template metadata and content, then run npm run blog:generate.")
}
