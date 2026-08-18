import type { MetadataRoute } from "next"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://professor-jk.net/"
    },
    {
      url: "https://professor-jk.net/play-with-jk"
    },
    {
      url: "https://professor-jk.net/contact"
    }
  ]
}
