import { createContext } from "react"

// warningなど拡張するときはここにtypeを入れる。
export type ErrorType = {
  message: string
}
export type ErrorContextType = {
  showError: (error: ErrorType) => void
}

export const ErrorContext =
  createContext<ErrorContextType | undefined>(undefined)