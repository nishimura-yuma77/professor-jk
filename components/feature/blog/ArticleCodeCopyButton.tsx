"use client"

import { useEffect, useRef, useState } from "react"
import style from "@/styles/feature/blog/ArticleCodeBlock.module.scss"

const RESET_DELAY_MS = 2000

type CopyStatus = "idle" | "copied" | "failed"

type ArticleCodeCopyButtonProps = {
  code: string
}

const STATUS_LABELS: Record<CopyStatus, string> = {
  idle: "COPY",
  copied: "COPIED",
  failed: "FAILED",
}

export default function ArticleCodeCopyButton({ code }: ArticleCodeCopyButtonProps) {
  const [status, setStatus] = useState<CopyStatus>("idle")
  const resetTimerRef = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(resetTimerRef.current), [])

  const handleCopy = async () => {
    window.clearTimeout(resetTimerRef.current)

    try {
      await navigator.clipboard.writeText(code)
      setStatus("copied")
    } catch {
      setStatus("failed")
    }

    resetTimerRef.current = window.setTimeout(() => setStatus("idle"), RESET_DELAY_MS)
  }

  return (
    <button
      type="button"
      className={style.copy_button}
      aria-label="コードをクリップボードへコピー"
      onClick={handleCopy}
    >
      <span aria-live="polite">{STATUS_LABELS[status]}</span>
    </button>
  )
}
