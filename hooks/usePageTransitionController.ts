"use client"

import { usePathname, useRouter } from "next/navigation"
import { startTransition, useCallback, useEffect, useReducer } from "react"

export type PageTransitionPhase =
  | "intro-pending"
  | "intro"
  | "intro-revealing"
  | "idle"
  | "covering"
  | "covered"
  | "revealing"

type PageTransitionAction =
  | { type: "START_INTRO" }
  | {
      type: "REQUEST_NAVIGATION"
      href: string
      sourcePathname: string
    }
  | { type: "COVER_FINISHED" }
  | { type: "REVEAL_PAGE" }
  | { type: "REVEAL_FINISHED" }
  | { type: "HISTORY_NAVIGATION" }
  | { type: "SKIP_ANIMATION" }

type PageTransitionState = {
  phase: PageTransitionPhase
  navigation: {
    href: string
    sourcePathname: string
  } | null
}

const INTRO_DURATION_MS = 1500
const INCOMING_REVEAL_DELAY_MS = 80
const NAVIGATION_TIMEOUT_MS = 8000

const prefersReducedMotion = () => window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches

const initialState: PageTransitionState = {
  phase: "intro-pending",
  navigation: null,
}

const transitionReducer = (
  state: PageTransitionState,
  action: PageTransitionAction
): PageTransitionState => {
  switch (action.type) {
    case "START_INTRO":
      return state.phase === "intro-pending"
        ? { ...state, phase: "intro" }
        : state

    case "REQUEST_NAVIGATION":
      return state.phase === "idle"
        ? {
            phase: "covering",
            navigation: {
              href: action.href,
              sourcePathname: action.sourcePathname,
            },
          }
        : state

    case "COVER_FINISHED":
      return state.phase === "covering"
        ? { ...state, phase: "covered" }
        : state

    case "REVEAL_PAGE":
      if (state.phase === "intro") {
        return { ...state, phase: "intro-revealing" }
      }
      if (state.phase === "covered") {
        return { ...state, phase: "revealing" }
      }
      return state

    case "REVEAL_FINISHED":
      return state.phase === "revealing" || state.phase === "intro-revealing"
        ? { phase: "idle", navigation: null }
        : state

    case "HISTORY_NAVIGATION":
      return { phase: "covered", navigation: null }

    case "SKIP_ANIMATION":
      return { phase: "idle", navigation: null }
  }
}

export default function usePageTransitionController() {
  const pathname = usePathname()
  const router = useRouter()
  const [state, dispatch] = useReducer(transitionReducer, initialState)
  const { phase, navigation } = state

  // 初回ロードでは画面を覆ったまま挨拶を再生し、その後ページを表示する。
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      dispatch({
        type: prefersReducedMotion() ? "SKIP_ANIMATION" : "START_INTRO",
      })
    })

    return () => cancelAnimationFrame(frame)
  }, [])

  // 挨拶の表示時間が経過したら、初回ページを表示する。
  useEffect(() => {
    if (phase !== "intro") return

    const timer = setTimeout(() => {
      dispatch({ type: "REVEAL_PAGE" })
    }, INTRO_DURATION_MS)

    return () => clearTimeout(timer)
  }, [phase])

  // 通常遷移はパス更新を待ち、履歴移動は短い待機後にページを表示する。
  useEffect(() => {
    if (phase !== "covered") return

    const delay = navigation
      ? NAVIGATION_TIMEOUT_MS
      : INCOMING_REVEAL_DELAY_MS
    const timer = setTimeout(() => {
      dispatch({ type: "REVEAL_PAGE" })
    }, delay)

    return () => clearTimeout(timer)
  }, [navigation, phase])

  const navigate = useCallback((href: string) => {
    if (phase !== "idle") return

    const target = new URL(href, window.location.href)
    const current = new URL(window.location.href)
    if (
      target.pathname === current.pathname
      && target.search === current.search
    ) return

    const targetHref = `${target.pathname}${target.search}${target.hash}`
    if (prefersReducedMotion()) {
      router.push(targetHref)
      return
    }

    dispatch({
      type: "REQUEST_NAVIGATION",
      href: targetHref,
      sourcePathname: pathname,
    })
  }, [pathname, phase, router])

  // 通常の内部リンクを捕捉し、画面を覆ってからrouter.pushを実行する。
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

      const anchor = event.target instanceof Element
        ? event.target.closest<HTMLAnchorElement>("a[href]")
        : null
      if (
        !anchor
        || anchor.hasAttribute("download")
        || (anchor.target && anchor.target !== "_self")
      ) return

      const destination = new URL(anchor.href, window.location.href)
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

  // 履歴移動とBFCache復元は遷移後に発火するため、覆った状態からページを表示する。
  useEffect(() => {
    const revealIncomingPage = () => {
      if (prefersReducedMotion()) return

      dispatch({ type: "HISTORY_NAVIGATION" })
    }

    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) revealIncomingPage()
    }

    window.addEventListener("popstate", revealIncomingPage)
    window.addEventListener("pageshow", handlePageShow)
    return () => {
      window.removeEventListener("popstate", revealIncomingPage)
      window.removeEventListener("pageshow", handlePageShow)
    }
  }, [])

  // クリック遷移では、Next.jsが新しいパスを反映した時点でページを表示できる。
  useEffect(() => {
    if (
      phase === "covered"
      && navigation !== null
      && pathname !== navigation.sourcePathname
    ) {
      dispatch({ type: "REVEAL_PAGE" })
    }
  }, [navigation, pathname, phase])

  const handleCoverEnd = () => {
    if (phase !== "covering") return

    if (!navigation) {
      dispatch({ type: "SKIP_ANIMATION" })
      return
    }

    dispatch({ type: "COVER_FINISHED" })
    startTransition(() => router.push(navigation.href))
  }

  const handleRevealEnd = () => {
    if (
      phase !== "revealing"
      && phase !== "intro-revealing"
    ) return

    dispatch({ type: "REVEAL_FINISHED" })
  }

  return {
    phase,
    isReady: phase === "idle",
    navigate,
    handleCoverEnd,
    handleRevealEnd,
  }
}
