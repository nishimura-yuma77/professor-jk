"use client"

import { createContext, useContext, type ReactNode } from "react"
import PageTransitionOverlay from "@/components/providers/PageTransitionOverlay"
import usePageTransitionController from "@/hooks/usePageTransitionController"

type Navigate = (href: string) => void

const PageTransitionContext = createContext<Navigate | null>(null)
const PageTransitionReadyContext = createContext<boolean | null>(null)

export function usePageTransition() {
  const navigate = useContext(PageTransitionContext)

  if (!navigate) {
    throw new Error("usePageTransition must be used within PageTransitionProvider")
  }

  return navigate
}

export function usePageTransitionReady() {
  const isReady = useContext(PageTransitionReadyContext)

  if (isReady === null) {
    throw new Error("usePageTransitionReady must be used within PageTransitionProvider")
  }

  return isReady
}

export default function PageTransitionProvider({ children }: { children: ReactNode }) {
  const transition = usePageTransitionController()

  return (
    <PageTransitionContext value={transition.navigate}>
      <PageTransitionReadyContext value={transition.isReady}>
        {children}
        <PageTransitionOverlay
          phase={transition.phase}
          onCoverEnd={transition.handleCoverEnd}
          onRevealEnd={transition.handleRevealEnd}
        />
      </PageTransitionReadyContext>
    </PageTransitionContext>
  )
}
