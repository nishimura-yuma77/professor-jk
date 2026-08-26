import { readFile } from "node:fs/promises"
import { createRequire } from "node:module"

const localRequire = createRequire(import.meta.url)
const fontPath = localRequire.resolve(
  "noto-sans-japanese/fonts/NotoSansJP-Bold.woff",
)
const fontDataPromise = readFile(fontPath).then(
  (fontData) => Uint8Array.from(fontData).buffer,
)

export default function loadJapaneseFont(): Promise<ArrayBuffer> {
  return fontDataPromise
}
