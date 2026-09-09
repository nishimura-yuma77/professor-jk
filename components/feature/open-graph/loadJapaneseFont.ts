import { readFile } from "node:fs/promises"
import path from "node:path"

const fontPath = path.join(
  process.cwd(),
  "node_modules",
  "noto-sans-japanese",
  "fonts",
  "NotoSansJP-Bold.woff",
)
const fontDataPromise = readFile(fontPath).then(
  (fontData) => Uint8Array.from(fontData).buffer,
)

export default function loadJapaneseFont(): Promise<ArrayBuffer> {
  return fontDataPromise
}
