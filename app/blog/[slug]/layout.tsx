import type { ReactNode } from "react"
import { getBlogArticleSlugs } from "@/const/blog"

export const dynamicParams = false

export function generateStaticParams() {
  return getBlogArticleSlugs().map((slug) => ({ slug }))
}

export default function BlogArticleLayout({ children }: { children: ReactNode }) {
  return children
}
