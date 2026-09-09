import type { ReactNode } from "react"
import Footer from "@/components/feature/Footer"
import Header from "@/components/feature/Header"

export default function WorksLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
