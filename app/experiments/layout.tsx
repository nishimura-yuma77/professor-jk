import type { ReactNode } from "react"
import Header from "@/components/feature/Header"
import Footer from "@/components/feature/Footer"

export default function ExperimentsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
