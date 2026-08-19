const FONT_USER_AGENT =
  "Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko"

export default async function loadJapaneseFont(text: string) {
  const cssUrl = new URL("https://fonts.googleapis.com/css2")
  cssUrl.searchParams.set("family", "Noto Sans JP:wght@700")
  cssUrl.searchParams.set("text", text)

  const cssResponse = await fetch(cssUrl, {
    headers: { "User-Agent": FONT_USER_AGENT },
  })
  if (!cssResponse.ok) {
    throw new Error(`Failed to fetch OGP font CSS: ${cssResponse.status}`)
  }

  const css = await cssResponse.text()
  const fontUrl = css.match(/src: url\(([^)]+)\) format\('woff'\)/)?.[1]
  if (!fontUrl) {
    throw new Error("OGP font URL was not found in Google Fonts CSS")
  }

  const fontResponse = await fetch(fontUrl)
  if (!fontResponse.ok) {
    throw new Error(`Failed to fetch OGP font: ${fontResponse.status}`)
  }

  return fontResponse.arrayBuffer()
}
