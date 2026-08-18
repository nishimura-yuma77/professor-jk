import { useMutation } from "@tanstack/react-query"
import {
  ContactApiError,
  sendContact,
  type ContactPayload,
} from "@/api/contact"

export type ContactMutationPayload = ContactPayload

export type ContactMutationError = Error & {
  readonly fieldErrors: Partial<Record<keyof ContactMutationPayload, string>>
}

export function isContactMutationError(
  error: unknown,
): error is ContactMutationError {
  return error instanceof ContactApiError
}

export default function useContactMutation() {
  return useMutation({
    mutationFn: sendContact,
  })
}
