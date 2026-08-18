import { CONTACT_ENDPOINT } from "@/const/endpoints"

export type ContactPayload = {
  name: string
  email: string
  subject: string
  message: string
}

export type ContactResponse = {
  message: string
}

export type ContactFieldErrors = Partial<Record<keyof ContactPayload, string>>

type ContactErrorResponse = {
  message?: string
  errors?: ContactFieldErrors
}

export class ContactApiError extends Error {
  readonly fieldErrors: ContactFieldErrors

  constructor(message: string, fieldErrors: ContactFieldErrors = {}) {
    super(message)
    this.name = "ContactApiError"
    this.fieldErrors = fieldErrors
  }
}

async function parseResponse(response: Response): Promise<ContactErrorResponse> {
  try {
    return await response.json() as ContactErrorResponse
  } catch {
    return {}
  }
}

export async function sendContact(payload: ContactPayload): Promise<ContactResponse> {
  if (process.env.NEXT_PUBLIC_USE_CONTACT_API_MOCK === "true") {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { message: "Inquiry accepted." }
  }

  let response: Response

  try {
    response = await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new ContactApiError("お問い合わせの送信に失敗しました。通信環境をご確認ください。")
  }

  const body = await parseResponse(response)

  if (!response.ok) {
    throw new ContactApiError(
      body.message ?? "お問い合わせの送信に失敗しました。時間をおいて再度お試しください。",
      body.errors,
    )
  }

  return {
    message: body.message ?? "Inquiry accepted.",
  }
}
