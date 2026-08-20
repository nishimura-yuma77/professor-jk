import { createBlogOpenGraphImage } from "@/components/feature/blog/BlogOpenGraphImage"
import { getBlogArticleSlugs } from "@/const/blog"

export const dynamic = "force-static"

export function generateStaticParams() {
  return getBlogArticleSlugs().map((slug) => ({ slug }))
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  return createBlogOpenGraphImage(slug)
}
