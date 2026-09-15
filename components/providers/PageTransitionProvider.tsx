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

type TransitionPhase = "idle" | "intro" | "covering" | "covered" | "revealing"
type Navigate = (href: string) => void

const INTRO_DURATION_MS = 1500
const INCOMING_REVEAL_DELAY_MS = 80
const NAVIGATION_TIMEOUT_MS = 8000
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
  const pathname = usePathname()
  const router = useRouter()
  const [phase, setPhase] = useState<TransitionPhase>("covered")
  const [isIntroVisible, setIsIntroVisible] = useState(true)
  const phaseRef = useRef<TransitionPhase>("covered")
  const pendingHrefRef = useRef<string | null>(null)
  const sourcePathnameRef = useRef<string | null>(null)
  const introTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navigationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const revealFrameRef = useRef<number | null>(null)

  const updatePhase = (nextPhase: TransitionPhase) => {
    phaseRef.current = nextPhase
    setPhase(nextPhase)
  }

  const revealPage = useCallback(() => {
    if (phaseRef.current !== "covered" && phaseRef.current !== "intro") return

    if (navigationTimerRef.current !== null) {
      clearTimeout(navigationTimerRef.current)
      navigationTimerRef.current = null
    }

    revealFrameRef.current = requestAnimationFrame(() => {
      updatePhase("revealing")
      revealFrameRef.current = null
    })
  }, [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    revealFrameRef.current = requestAnimationFrame(() => {
      if (prefersReducedMotion) {
        setIsIntroVisible(false)
        updatePhase("idle")
        revealFrameRef.current = null
        return
      }

      updatePhase("intro")
      revealFrameRef.current = null
      introTimerRef.current = setTimeout(() => {
        introTimerRef.current = null
        revealPage()
      }, INTRO_DURATION_MS)
    })

    return () => {
      if (introTimerRef.current !== null) {
        clearTimeout(introTimerRef.current)
        introTimerRef.current = null
      }
      if (revealFrameRef.current !== null) {
        cancelAnimationFrame(revealFrameRef.current)
        revealFrameRef.current = null
      }
    }
  }, [revealPage])

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
    const revealIncomingPage = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

      if (introTimerRef.current !== null) {
        clearTimeout(introTimerRef.current)
        introTimerRef.current = null
      }
      if (navigationTimerRef.current !== null) {
        clearTimeout(navigationTimerRef.current)
      }

      setIsIntroVisible(false)
      pendingHrefRef.current = null
      sourcePathnameRef.current = pathname
      updatePhase("covered")
      navigationTimerRef.current = setTimeout(
        revealPage,
        INCOMING_REVEAL_DELAY_MS
      )
    }

    const handlePopState = () => revealIncomingPage()
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) revealIncomingPage()
    }

    window.addEventListener("popstate", handlePopState)
    window.addEventListener("pageshow", handlePageShow)
    return () => {
      window.removeEventListener("popstate", handlePopState)
      window.removeEventListener("pageshow", handlePageShow)
    }
  }, [pathname, revealPage])

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
    if (introTimerRef.current !== null) {
      clearTimeout(introTimerRef.current)
    }
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
    setIsIntroVisible(false)
    updatePhase("idle")
  }

  return (
    <PageTransitionContext value={navigate}>
      <PageTransitionReadyContext value={phase === "idle"}>
        {children}
        <div
          className={`${style.overlay} ${phase !== "idle" ? style.active : ""} ${style[phase]}`}
          aria-hidden="true"
        >
          <span className={style.accent} onAnimationEnd={handleRevealEnd} />
          <span className={style.panel} onAnimationEnd={handleCoverEnd}>
            <span className={`${style.intro_copy} ${
              isIntroVisible ? style.intro_copy_visible : ""
            }`}>
              <span className={style.intro_line}>
                <span>Hello!!</span>
              </span>
              <span className={`${style.intro_line} ${style.intro_line_accent}`}>
                <span>Coworkers!!</span>
              </span>
            </span>
          </span>
        </div>
      </PageTransitionReadyContext>
    </PageTransitionContext>
  )
}
