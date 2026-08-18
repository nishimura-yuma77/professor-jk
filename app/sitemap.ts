import type { MetadataRoute } from "next"
import { getBlogArticles } from "@/const/blog"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: "https://professor-jk.net/"
    },
    {
      url: "https://professor-jk.net/play-with-jk"
    },
    {
      url: "https://professor-jk.net/contact"
    },
    {
      url: "https://professor-jk.net/blog"
    }
  ]

  return [
    ...staticPages,
    ...getBlogArticles().map((article) => ({
      url: `https://professor-jk.net/blog/${article.slug}`,
      lastModified: article.updatedAt ?? article.publishedAt,
    })),
  ]
}
