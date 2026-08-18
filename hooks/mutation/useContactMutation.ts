import { useMutation } from "@tanstack/react-query"
import { sendContact } from "@/api/contact"

export default function useContactMutation() {
  return useMutation({
    mutationFn: sendContact,
  })
}
