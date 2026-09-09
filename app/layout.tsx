import type { Metadata } from "next"
import { Zen_Kaku_Gothic_New } from "next/font/google"
import localFont from "next/font/local"
import "@/app/globals.scss"
import ErrorProvider from "@/components/providers/ErrorProvider"
import QueryProvider from "@/components/providers/QueryProvider"

const SITE_TITLE = "J.K.教授の開発ラボ | J.K. Lab"
const SITE_DESCRIPTION = "エンジニアとして活動するJ.K.教授のキャラクター紹介と、開発実験・プロジェクトを掲載するポートフォリオサイトです。"

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-zen-kaku"
})

const ibmPlexMono = localFont({
  src: [
    {
      path: "../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2",
      weight: "400",
      style: "normal"
    },
    {
      path: "../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2",
      weight: "500",
      style: "normal"
    },
    {
      path: "../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-700-normal.woff2",
      weight: "700",
      style: "normal"
    }
  ],
  display: "swap",
  variable: "--font-ibm-plex-mono"
})

export const metadata: Metadata = {
  metadataBase: new URL("https://professor-jk.net"),
  title: {
    default: "J.K. Lab",
    template: "%s | J.K. Lab"
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "/",
    siteName: "J.K. Lab",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/ogp.png",
        width: 1200,
        height: 630,
        alt: SITE_TITLE
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    creator: "@jkdeb__",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/ogp.png"]
  }
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${zenKakuGothicNew.variable} ${ibmPlexMono.variable}`}
    >
      <body className="">
        <QueryProvider>
          <ErrorProvider>
            {children}
          </ErrorProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
