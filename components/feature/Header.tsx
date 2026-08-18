"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  useRef,
  useState,
  type AnimationEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react"
import style from "@/styles/feature/Header.module.scss"
import TypewriterText from "@/components/primitives/TypewriterText"
import Logo from "@/components/ui/Logo"
import useBodyScrollLock from "@/hooks/useBodyScrollLock"
import { MENU_CHARACTER_DELAY_MS } from "@/const/animation"
import { EXTERNAL_MENU, MENU } from "@/const/menu"

const menuItems = Object.values(MENU)
const externalMenuItems = Object.values(EXTERNAL_MENU)
type MenuPhase = "closed" | "background" | "terminal" | "typing" | "ready"

export default function Header() {
  const pathname = usePathname()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLElement>(null)
  const completedMenuItemsRef = useRef(new Set<string>())
  const [menuPhase, setMenuPhase] = useState<MenuPhase>("closed")
  const [hoveredMenuHref, setHoveredMenuHref] = useState<string | null>(null)
  const isMenuOpen = menuPhase !== "closed"
  const isTerminalVisible = menuPhase === "terminal"
    || menuPhase === "typing"
    || menuPhase === "ready"
  const isTypingVisible = menuPhase === "typing" || menuPhase === "ready"
  const isMenuInteractive = menuPhase === "ready"
  const isMenuAnimating = isMenuOpen && !isMenuInteractive
  const menuButtonLabel = menuPhase === "closed"
    ? "MENU"
    : isMenuInteractive
      ? "CLOSE"
      : "EXEC"

  useBodyScrollLock(isMenuOpen)

  const openMenu = () => {
    completedMenuItemsRef.current.clear()
    setHoveredMenuHref(null)
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    setMenuPhase(prefersReducedMotion ? "ready" : "background")
  }

  const closeMenu = (restoreFocus = false) => {
    completedMenuItemsRef.current.clear()
    setHoveredMenuHref(null)
    setMenuPhase("closed")
    if (restoreFocus) {
      requestAnimationFrame(() => menuButtonRef.current?.focus())
    }
  }

  const toggleMenu = () => {
    if (isMenuAnimating) return

    if (isMenuOpen) {
      closeMenu()
    } else {
      openMenu()
    }
  }

  const handleBackgroundAnimationEnd = (event: AnimationEvent<HTMLElement>) => {
    if (event.target === event.currentTarget && menuPhase === "background") {
      setMenuPhase("terminal")
    }
  }

  const handleTerminalAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && menuPhase === "terminal") {
      setMenuPhase("typing")
    }
  }

  const handleMenuItemTypeEnd = (href: string) => {
    if (menuPhase !== "typing") return

    completedMenuItemsRef.current.add(href)
    if (completedMenuItemsRef.current.size === menuItems.length) {
      setMenuPhase("ready")
      requestAnimationFrame(() => {
        menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus()
      })
    }
  }

  const handleHeaderKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!isMenuOpen) return

    if (event.key === "Escape") {
      event.preventDefault()
      closeMenu(true)
      return
    }

    if (event.key !== "Tab") return

    const menuLinks = Array.from(
      menuRef.current?.querySelectorAll<HTMLAnchorElement>(
        'a:not([tabindex="-1"])',
      ) ?? [],
    )
    const focusableElements: HTMLElement[] = [
      ...(menuButtonRef.current ? [menuButtonRef.current] : []),
      ...menuLinks,
    ]
    const currentIndex = focusableElements.indexOf(
      document.activeElement as HTMLElement,
    )

    if (event.shiftKey && currentIndex <= 0) {
      event.preventDefault()
      focusableElements.at(-1)?.focus()
    } else if (!event.shiftKey && currentIndex === focusableElements.length - 1) {
      event.preventDefault()
      focusableElements[0]?.focus()
    }
  }

  const handleMenuBackdropClick = (event: MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) closeMenu(true)
  }

  return (
    <header className={style.container} onKeyDown={handleHeaderKeyDown}>
      <div className={style.inner}>
        <div className={style.logo_area}>
          <span className={style.bar} aria-hidden="true" />
          <Logo />
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className={`${style.menu_button} ${
            isMenuInteractive ? style.menu_button_active : ""
          } ${
            isMenuAnimating ? style.menu_button_busy : ""
          }`}
          aria-controls="main-menu"
          aria-expanded={isMenuOpen}
          aria-disabled={isMenuAnimating}
          onClick={toggleMenu}
        >
          <span className={style.visually_hidden}>
            {isMenuAnimating
              ? "メニューを展開しています"
              : isMenuOpen
                ? "メニューを閉じる"
                : "メニューを開く"}
          </span>
          <span className={style.menu_command} aria-hidden="true">
            <span className={style.menu_command_prompt}>
              {isMenuInteractive ? "×" : ">"}
            </span>
            <span>{menuButtonLabel}</span>
            <span className={style.menu_command_cursor} />
          </span>
        </button>

        <nav
          ref={menuRef}
          id="main-menu"
          className={`${style.menu} ${isMenuOpen ? style.menu_open : ""} ${
            menuPhase === "background" ? style.menu_background : ""
          }`}
          aria-label="メインメニュー"
          onClick={handleMenuBackdropClick}
          onAnimationEnd={handleBackgroundAnimationEnd}
        >
          <div
            className={`${style.terminal_panel} ${
              isTerminalVisible ? style.terminal_panel_visible : ""
            } ${menuPhase === "terminal" ? style.terminal_panel_drop : ""}`}
            onAnimationEnd={handleTerminalAnimationEnd}
          >
            <div className={style.terminal_header} aria-hidden="true">
              <span>NAVIGATION TERMINAL</span>
              <span>SESSION ACTIVE</span>
            </div>
            <ul className={style.menu_list}>
              {menuItems.map((item) => {
                const isCurrent = item.href === "/"
                  ? pathname === item.href
                  : pathname === item.href || pathname.startsWith(`${item.href}/`)

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`${style.menu_link} ${
                        isCurrent ? style.menu_link_current : ""
                      }`}
                      aria-current={isCurrent ? "page" : undefined}
                      aria-disabled={isMenuOpen && !isMenuInteractive}
                      tabIndex={isMenuOpen && !isMenuInteractive ? -1 : undefined}
                      onMouseEnter={() => setHoveredMenuHref(item.href)}
                      onMouseLeave={() => setHoveredMenuHref(null)}
                      onClick={(event) => {
                        if (isMenuOpen && !isMenuInteractive) {
                          event.preventDefault()
                          return
                        }
                        if (isMenuOpen) closeMenu(true)
                      }}
                    >
                      <span
                        className={`${style.menu_prompt} ${
                          isTypingVisible ? style.menu_prompt_visible : ""
                        }`}
                        aria-hidden="true"
                      >
                        &gt;
                      </span>
                      <span className={style.menu_text}>
                        <span className={style.menu_label}>
                          <TypewriterText
                            text={item.label}
                            isVisible={isTypingVisible}
                            animationDelay={MENU_CHARACTER_DELAY_MS}
                            displayCursor={menuPhase === "typing"
                              || (isMenuInteractive && hoveredMenuHref === item.href)}
                            onAnimationEnd={() => handleMenuItemTypeEnd(item.href)}
                          />
                        </span>
                        {item.subLabel && (
                          <span className={`${style.menu_sublabel} ${
                            isMenuInteractive ? style.menu_sublabel_visible : ""
                          }`}>
                            {item.subLabel}
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
            <div
              className={`${style.external_menu} ${
                isMenuInteractive ? style.external_menu_visible : ""
              }`}
              aria-hidden={!isMenuInteractive}
            >
              <p className={style.external_menu_title}>EXTERNAL CHANNELS</p>
              <ul className={style.external_menu_list}>
                {externalMenuItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={style.external_menu_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${item.label}を新しいタブで開く`}
                      tabIndex={isMenuInteractive ? undefined : -1}
                    >
                      <span className={style.external_menu_prompt} aria-hidden="true">
                        &gt;
                      </span>
                      <span>{item.label}</span>
                      <span className={style.external_menu_arrow} aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
