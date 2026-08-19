import { ImageResponse } from "next/og"
import { getBlogArticle, getBlogArticleLogNumber } from "@/const/blog"
import loadJapaneseFont from "@/components/feature/open-graph/loadJapaneseFont"

export const BLOG_OPEN_GRAPH_SIZE = {
  width: 1200,
  height: 630,
}

function getTitleFontSize(title: string) {
  const length = Array.from(title).length
  if (length <= 18) return 68
  if (length <= 30) return 58
  return 48
}

export async function createBlogOpenGraphImage(slug: string) {
  const article = getBlogArticle(slug)
  if (!article) {
    throw new Error(`Blog article not found: ${slug}`)
  }

  const logNumber = String(getBlogArticleLogNumber(article.slug)).padStart(3, "0")
  const publishedAt = article.publishedAt.replaceAll("-", ".")
  const fontText = `${article.title}${publishedAt}PROF.J.K.RESEARCH LOGJK LABSTATIC ARCHIVELOG_${logNumber}`
  const fontData = await loadJapaneseFont(fontText)

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          border: "2px solid #3a3833",
          color: "#ead3bb",
          backgroundColor: "#11100e",
          backgroundImage:
            "linear-gradient(rgba(232,146,58,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(232,146,58,0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          padding: "58px 64px",
          fontFamily: "Noto Sans JP",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#e8923a",
            fontSize: 25,
            letterSpacing: "0.08em",
          }}
        >
          <span>PROF.J.K.</span>
          <span>LOG_{logNumber}</span>
        </div>

        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: "#e8923a",
              fontSize: 22,
              letterSpacing: "0.12em",
            }}
          >
            <span
              style={{
                display: "flex",
                width: 10,
                height: 10,
                borderRadius: 999,
                backgroundColor: "#e8923a",
              }}
            />
            <span>RESEARCH LOG</span>
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 980,
              fontSize: getTitleFontSize(article.title),
              lineHeight: 1.35,
              letterSpacing: "0.02em",
            }}
          >
            {article.title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#8a684f",
            fontSize: 20,
            letterSpacing: "0.08em",
          }}
        >
          <span>{publishedAt}</span>
          <span>JK LAB // STATIC ARCHIVE</span>
        </div>

        <div
          style={{
            position: "absolute",
            right: 64,
            bottom: 105,
            display: "flex",
            width: 240,
            height: 3,
            backgroundColor: "#e8923a",
          }}
        />
      </div>
    ),
    {
      ...BLOG_OPEN_GRAPH_SIZE,
      fonts: [
        {
          name: "Noto Sans JP",
          data: fontData,
          weight: 700,
          style: "normal",
        },
      ],
    },
  )
}
