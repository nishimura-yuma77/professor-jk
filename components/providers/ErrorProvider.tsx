"use client"

import { useCallback, useState, type ReactNode } from "react"
import { ErrorContext, ErrorType } from "@/contexts/ErrorContext"
import ErrorToast from "@/components/ui/ErrorToast"
import { ERROR_DISPLAY_TIME } from "@/const/error"

type ErrorToast = {
  id: number
  error: ErrorType
}

export default function ErrorProvider({
  children,
}: {
  children: ReactNode
}) {
  const [errors, setErrors] = useState<ErrorToast[]>([])

  const showError = useCallback((error: ErrorType) => {
    const id = Date.now()

    setErrors((prev) => [
      ...prev,
      { id, error },
    ])

    setTimeout(() => {
      setErrors((prev) =>
        prev.filter((error) => error.id !== id)
      )
    }, ERROR_DISPLAY_TIME)
  }, [])

  return (
    <ErrorContext.Provider value={{ showError }}>
      {children}

      {errors.map((error) => (
        <ErrorToast
          key={error.id}
          error={error.error}
        />
      ))}
    </ErrorContext.Provider>
  )
}