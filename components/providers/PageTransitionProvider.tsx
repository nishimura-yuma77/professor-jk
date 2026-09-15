"use client"

import { usePathname, useRouter } from "next/navigation"
import {
  createContext,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type AnimationEvent,
  type ReactNode,
} from "react"
import style from "@/styles/providers/PageTransitionProvider.module.scss"

type TransitionPhase = "idle" | "covering" | "covered" | "revealing"
type Navigate = (href: string) => void

const NAVIGATION_TIMEOUT_MS = 8000
const PageTransitionContext = createContext<Navigate | null>(null)

export function usePageTransition() {
  const navigate = useContext(PageTransitionContext)

  if (!navigate) {
    throw new Error("usePageTransition must be used within PageTransitionProvider")
  }

  return navigate
}

export default function PageTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [phase, setPhase] = useState<TransitionPhase>("idle")
  const phaseRef = useRef<TransitionPhase>("idle")
  const pendingHrefRef = useRef<string | null>(null)
  const sourcePathnameRef = useRef<string | null>(null)
  const navigationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const revealFrameRef = useRef<number | null>(null)

  const updatePhase = (nextPhase: TransitionPhase) => {
    phaseRef.current = nextPhase
    setPhase(nextPhase)
  }

  const revealPage = useCallback(() => {
    if (phaseRef.current !== "covered") return

    if (navigationTimerRef.current !== null) {
      clearTimeout(navigationTimerRef.current)
      navigationTimerRef.current = null
    }

    revealFrameRef.current = requestAnimationFrame(() => {
      updatePhase("revealing")
      revealFrameRef.current = null
    })
  }, [])

  const navigate = useCallback<Navigate>((href) => {
    if (phaseRef.current !== "idle") return

    const target = new URL(href, window.location.href)
    const targetHref = `${target.pathname}${target.search}${target.hash}`
    const current = new URL(window.location.href)

    if (
      target.pathname === current.pathname
      && target.search === current.search
    ) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      router.push(targetHref)
      return
    }

    pendingHrefRef.current = targetHref
    sourcePathnameRef.current = pathname
    updatePhase("covering")
  }, [pathname, router])

  useEffect(() => {
    const handleDocumentClick = (event: globalThis.MouseEvent) => {
      if (
        event.defaultPrevented
        || event.button !== 0
        || event.metaKey
        || event.ctrlKey
        || event.shiftKey
        || event.altKey
      ) return

      const target = event.target instanceof Element
        ? event.target.closest<HTMLAnchorElement>("a[href]")
        : null

      if (
        !target
        || target.hasAttribute("download")
        || (target.target && target.target !== "_self")
      ) return

      const destination = new URL(target.href, window.location.href)
      if (destination.origin !== window.location.origin) return

      const current = new URL(window.location.href)
      if (
        destination.pathname === current.pathname
        && destination.search === current.search
      ) return

      event.preventDefault()
      navigate(`${destination.pathname}${destination.search}${destination.hash}`)
    }

    document.addEventListener("click", handleDocumentClick, true)
    return () => document.removeEventListener("click", handleDocumentClick, true)
  }, [navigate])

  useEffect(() => {
    if (
      phaseRef.current === "covered"
      && sourcePathnameRef.current !== null
      && pathname !== sourcePathnameRef.current
    ) {
      revealPage()
    }
  }, [pathname, revealPage])

  useEffect(() => () => {
    if (navigationTimerRef.current !== null) {
      clearTimeout(navigationTimerRef.current)
    }
    if (revealFrameRef.current !== null) {
      cancelAnimationFrame(revealFrameRef.current)
    }
  }, [])

  const handleCoverEnd = (event: AnimationEvent<HTMLSpanElement>) => {
    if (event.target !== event.currentTarget || phaseRef.current !== "covering") return

    const href = pendingHrefRef.current
    if (!href) {
      updatePhase("idle")
      return
    }

    updatePhase("covered")
    navigationTimerRef.current = setTimeout(revealPage, NAVIGATION_TIMEOUT_MS)
    startTransition(() => router.push(href))
  }

  const handleRevealEnd = (event: AnimationEvent<HTMLSpanElement>) => {
    if (event.target !== event.currentTarget || phaseRef.current !== "revealing") return

    pendingHrefRef.current = null
    sourcePathnameRef.current = null
    updatePhase("idle")
  }

  return (
    <PageTransitionContext value={navigate}>
      {children}
      <div
        className={`${style.overlay} ${phase !== "idle" ? style.active : ""} ${style[phase]}`}
        aria-hidden="true"
      >
        <span className={style.accent} onAnimationEnd={handleRevealEnd} />
        <span className={style.panel} onAnimationEnd={handleCoverEnd} />
      </div>
    </PageTransitionContext>
  )
}
