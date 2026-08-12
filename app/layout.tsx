import type { Metadata } from "next"
import { Zen_Kaku_Gothic_New, IBM_Plex_Mono } from "next/font/google"
import "./globals.scss"

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
  title: {
    default: "Welcome",
    template: "%s | J.K. Lab"
  },
  description: "J.K.教授の開発ラボ"
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${zenKakuGothicNew.variable} ${ibmPlexMono.variable}`}
    >
      <body className="">{children}</body>
    </html>
  );
}
