import type { MetadataRoute } from "next"
import { getBlogArticles } from "@/const/blog"
import { EXPERIMENTS } from "@/const/experiments"
import { WORKS } from "@/const/works"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getBlogArticles()
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
    },
    {
      url: "https://professor-jk.net/experiments"
    },
    {
      url: "https://professor-jk.net/works"
    }
  ]

  return [
    ...staticPages,
    ...articles.map((article) => ({
      url: `https://professor-jk.net/blog/${article.slug}`,
      lastModified: article.updatedAt ?? article.publishedAt,
    })),
    ...EXPERIMENTS.map((experiment) => ({
      url: `https://professor-jk.net/experiments/${experiment.slug}`,
    })),
    ...WORKS.map((work) => ({
      url: `https://professor-jk.net/works/${work.slug}`,
    })),
  ]
}
