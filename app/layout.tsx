import type { Metadata } from "next"
import { Zen_Kaku_Gothic_New, IBM_Plex_Mono } from "next/font/google"
import "@/app/globals.scss"
import "@/components/providers/ErrorProvider"
import ErrorProvider from "@/components/providers/ErrorProvider"

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-zen-kaku"
})

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ibm-plex-mono"
})

export const metadata: Metadata = {
  metadataBase: new URL("https://professor-jk.net"),
  title: {
    default: "J.K. Lab",
    template: "%s | J.K. Lab"
  },
  description: "エンジニアとして活動するJ.K.教授のキャラクター紹介と、開発実験・プロジェクトを掲載するポートフォリオサイトです。",
  alternates: {
    canonical: "/"
  }
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${zenKakuGothicNew.variable} ${ibmPlexMono.variable}`}
    >
      <body className="">
        <ErrorProvider>
          {children}
        </ErrorProvider>
      </body>
    </html>
  );
}
