import type { ReactNode } from "react"
import { BLOG_ARTICLES } from "@/const/blog"

export const dynamicParams = false

export function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({ slug: article.slug }))
}

export default function BlogArticleLayout({ children }: { children: ReactNode }) {
  return children
}
