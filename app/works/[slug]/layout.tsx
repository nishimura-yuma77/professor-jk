import type { ReactNode } from "react"
import { getWorkSlugs } from "@/const/works"

export const dynamicParams = false

export function generateStaticParams() {
  return getWorkSlugs().map((slug) => ({ slug }))
}

export default function WorkDetailLayout({ children }: { children: ReactNode }) {
  return children
}
