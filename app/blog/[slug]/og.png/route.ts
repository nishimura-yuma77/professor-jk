import { createBlogOpenGraphImage } from "@/components/feature/blog/BlogOpenGraphImage"
import { BLOG_ARTICLES } from "@/const/blog"

export const dynamic = "force-static"

export function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({ slug: article.slug }))
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  return createBlogOpenGraphImage(slug)
}
