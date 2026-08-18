"use client"

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
  type TransitionEvent,
} from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import ContactCharacter from "@/components/feature/contact/ContactCharacter"
import ContactGuide from "@/components/feature/contact/ContactGuide"
import ContactWritingHints from "@/components/feature/contact/ContactWritingHints"
import type {
  ContactGuide as ContactGuideData,
  ContactGuideTemplate,
} from "@/const/contactGuide"
import Header from "@/components/feature/Header"
import Footer from "@/components/feature/Footer"
import SectionTitle from "@/components/primitives/SectionTitle"
import useContactMutation, {
  isContactMutationError,
  type ContactMutationPayload,
} from "@/hooks/mutation/useContactMutation"
import useBodyScrollLock from "@/hooks/useBodyScrollLock"
import useError from "@/hooks/useError"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import { CONTACT_PHASE_INTERVAL_MS } from "@/const/animation"
import style from "@/app/contact/page.module.scss"

type DialogPhase = "confirm" | "complete"
type ContactPhase = "contact" | "form" | "character" | "guide" | "completed"

const requiredMessage = "必須項目です。"

export default function ContactPage() {
  const router = useRouter()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const phaseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const contactMutation = useContactMutation()
  const { showError } = useError()
  const { ref: titleRef, isVisible: isTitleVisible } =
    useIntersectionObserver<HTMLDivElement>({ once: true })
  const [dialogPhase, setDialogPhase] = useState<DialogPhase>("confirm")
  const [contactPhase, setContactPhase] = useState<ContactPhase>("contact")
  const [contactPayload, setContactPayload] = useState<ContactMutationPayload | null>(null)
  const [hintGuide, setHintGuide] = useState<ContactGuideData | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useBodyScrollLock(isDialogOpen)

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setError,
    setFocus,
    setValue,
    formState: { errors },
  } = useForm<ContactMutationPayload>({ mode: "onBlur" })

  useEffect(() => {
    return () => {
      if (phaseTimerRef.current !== null) {
        clearTimeout(phaseTimerRef.current)
      }
    }
  }, [])

  const schedulePhaseTransition = (
    from: ContactPhase,
    to: ContactPhase,
    interval: number,
  ) => {
    if (phaseTimerRef.current !== null) {
      clearTimeout(phaseTimerRef.current)
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    phaseTimerRef.current = setTimeout(() => {
      setContactPhase((currentPhase) => currentPhase === from ? to : currentPhase)
      phaseTimerRef.current = null
    }, prefersReducedMotion ? 0 : interval)
  }

  const isFormVisible = contactPhase !== "contact"
  const isCharacterVisible = contactPhase === "character"
    || contactPhase === "guide"
    || contactPhase === "completed"
  const isGuideVisible = contactPhase === "guide" || contactPhase === "completed"

  const handleFormRevealEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (
      contactPhase !== "form"
      || event.target !== event.currentTarget
      || event.propertyName !== "opacity"
    ) return

    schedulePhaseTransition(
      "form",
      "character",
      CONTACT_PHASE_INTERVAL_MS.formToCharacter,
    )
  }

  const hasExistingContactDraft = () => {
    const { subject, message } = getValues()
    return Boolean(subject?.trim() || message?.trim())
  }

  const applyContactTemplate = (template: ContactGuideTemplate) => {
    setValue("subject", template.subject, {
      shouldDirty: true,
      shouldValidate: true,
    })
    setValue("message", template.message, {
      shouldDirty: true,
      shouldValidate: true,
    })
  }

  const returnToContactForm = (field: "subject" | "message") => {
    requestAnimationFrame(() => setFocus(field))
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    void handleSubmit((payload) => {
      setContactPayload({
        name: payload.name.trim(),
        email: payload.email.trim(),
        subject: payload.subject.trim(),
        message: payload.message.trim(),
      })
      setDialogPhase("confirm")
      const dialog = dialogRef.current
      if (dialog) {
        dialog.showModal()
        setIsDialogOpen(true)
      }
    })(event)
  }

  const closeDialog = () => {
    if (!contactMutation.isPending) {
      dialogRef.current?.close()
    }
  }

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) {
      closeDialog()
    }
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)

    if (dialogPhase === "complete") {
      reset()
      setHintGuide(null)
      setContactPayload(null)
      setDialogPhase("confirm")
      contactMutation.reset()
    }
  }

  const handleConfirmedSubmit = () => {
    if (!contactPayload) return

    contactMutation.mutate(contactPayload, {
      onSuccess: () => {
        setDialogPhase("complete")
      },
      onError: (error) => {
        if (isContactMutationError(error)) {
          const fieldErrors = Object.entries(error.fieldErrors) as [
            keyof ContactMutationPayload,
            string,
          ][]

          if (fieldErrors.length > 0) {
            fieldErrors.forEach(([field, message]) => {
              setError(field, { type: "server", message })
            })
            showError({ message: "入力内容にエラーがあります。各項目をご確認ください。" })
            dialogRef.current?.close()
            requestAnimationFrame(() => setFocus(fieldErrors[0][0]))
            return
          }

          showError({ message: error.message })
          return
        }

        showError({
          message: "お問い合わせの送信に失敗しました。時間をおいて再度お試しください。",
        })
      },
    })
  }

  const handleHome = () => {
    reset()
    setHintGuide(null)
    setContactPayload(null)
    dialogRef.current?.close()
    router.push("/")
  }

  return (
    <>
      <Header />
      <main className={style.main}>
        <div className={style.glow} aria-hidden="true" />
        <section className={style.container}>
          <div className={style.form_panel_wrapper}>
            <div className={style.top_content}>
              <div className={style.assistant_column}>
                <div ref={titleRef} className={style.introduction}>
                  <h1 className={style.visually_hidden}>お問い合わせ</h1>
                  <SectionTitle
                    title="CONTACT"
                    isVisible={isTitleVisible}
                    onAnimationEnd={() => {
                      schedulePhaseTransition(
                        "contact",
                        "form",
                        CONTACT_PHASE_INTERVAL_MS.contactToForm,
                      )
                    }}
                  />
                </div>
                <ContactGuide
                  isVisible={isGuideVisible}
                  hintGuide={hintGuide}
                  hasExistingDraft={hasExistingContactDraft}
                  onHintGuideChange={setHintGuide}
                  onApplyTemplate={applyContactTemplate}
                  onReturnToForm={returnToContactForm}
                  onRevealEnd={() => {
                    schedulePhaseTransition(
                      "guide",
                      "completed",
                      CONTACT_PHASE_INTERVAL_MS.guideToCompleted,
                    )
                  }}
                />
              </div>
              <ContactCharacter
                isVisible={isCharacterVisible}
                onRevealEnd={() => {
                  schedulePhaseTransition(
                    "character",
                    "guide",
                    CONTACT_PHASE_INTERVAL_MS.characterToGuide,
                  )
                }}
              />
            </div>
            <div
              className={`${style.form_panel} ${
                isFormVisible ? style.form_panel_visible : ""
              }`}
              inert={!isFormVisible}
              onTransitionEnd={handleFormRevealEnd}
            >
              <div className={style.panel_header}>
                <span>NEW MESSAGE</span>
                <span className={style.panel_code}>FORM-01</span>
              </div>

              <form className={style.form} onSubmit={handleFormSubmit} noValidate>
                <div className={`${style.field} ${style.field_half}`}>
                  <label htmlFor="name">お名前</label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    placeholder="J.K."
                    {...register("name", {
                      required: requiredMessage,
                      maxLength: { value: 100, message: "100文字以内で入力してください。" },
                      validate: (value) => value.trim().length > 0 || requiredMessage,
                    })}
                  />
                  {errors.name?.message && (
                    <p id="name-error" className={style.field_error}>{errors.name.message}</p>
                  )}
                </div>

              <div className={`${style.field} ${style.field_half}`}>
                <label htmlFor="email">メールアドレス</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  placeholder="you@example.com"
                  {...register("email", {
                    required: requiredMessage,
                    maxLength: { value: 254, message: "254文字以内で入力してください。" },
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "正しいメールアドレスを入力してください。",
                    },
                  })}
                />
                {errors.email?.message && (
                  <p id="email-error" className={style.field_error}>{errors.email.message}</p>
                )}
              </div>

              <div className={`${style.field} ${style.field_full}`}>
                <label htmlFor="subject">件名</label>
                <input
                  id="subject"
                  type="text"
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                  placeholder="お問い合わせの件名"
                  {...register("subject", {
                    required: requiredMessage,
                    maxLength: { value: 200, message: "200文字以内で入力してください。" },
                    validate: {
                      notBlank: (value) => value.trim().length > 0 || requiredMessage,
                      noControlCharacters: (value) =>
                        !/[\u0000-\u001f\u007f]/.test(value)
                        || "制御文字は使用できません。",
                    },
                  })}
                />
                {errors.subject?.message && (
                  <p id="subject-error" className={style.field_error}>{errors.subject.message}</p>
                )}
              </div>

              <div className={`${style.field} ${style.field_full}`}>
                <div className={style.label_row}>
                  <label htmlFor="message">お問い合わせ内容</label>
                  <span>MAX 5000</span>
                </div>
                {hintGuide && <ContactWritingHints guide={hintGuide} />}
                <textarea
                  id="message"
                  rows={8}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={[
                    hintGuide ? "message-writing-guide" : "",
                    errors.message ? "message-error" : "",
                  ].filter(Boolean).join(" ") || undefined}
                  placeholder="メッセージをご入力ください"
                  {...register("message", {
                    required: requiredMessage,
                    maxLength: { value: 5000, message: "5000文字以内で入力してください。" },
                    validate: (value) => value.trim().length > 0 || requiredMessage,
                  })}
                />
                {errors.message?.message && (
                  <p id="message-error" className={style.field_error}>{errors.message.message}</p>
                )}
              </div>

                <button className={style.submit_button} type="submit">
                  <span>CONFIRM MESSAGE</span>
                  <span aria-hidden="true">→</span>
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <dialog
        ref={dialogRef}
        className={style.dialog}
        aria-labelledby="contact-dialog-title"
        onCancel={(event) => {
          if (contactMutation.isPending) event.preventDefault()
        }}
        onClose={handleDialogClose}
        onClick={handleBackdropClick}
      >
        {dialogPhase === "confirm" ? (
          <div className={style.dialog_content}>
            <div className={style.dialog_header}>
              <p>MESSAGE PREVIEW</p>
              <button type="button" onClick={closeDialog} disabled={contactMutation.isPending}>
                <span className={style.visually_hidden}>閉じる</span>
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className={style.dialog_body}>
              <p className={style.dialog_kicker}>FINAL CHECK</p>
              <h2 id="contact-dialog-title">この内容で送信しますか？</h2>
              <p className={style.dialog_description}>
                内容に間違いがないか、送信前にご確認ください。
              </p>

              <dl className={style.confirmation_list}>
                <div>
                  <dt>お名前</dt>
                  <dd>{contactPayload?.name}</dd>
                </div>
                <div>
                  <dt>メールアドレス</dt>
                  <dd>{contactPayload?.email}</dd>
                </div>
                <div>
                  <dt>件名</dt>
                  <dd>{contactPayload?.subject}</dd>
                </div>
                <div>
                  <dt>お問い合わせ内容</dt>
                  <dd>{contactPayload?.message}</dd>
                </div>
              </dl>

              <div className={style.dialog_actions}>
                <button
                  className={style.secondary_button}
                  type="button"
                  onClick={closeDialog}
                  disabled={contactMutation.isPending}
                >
                  修正する
                </button>
                <button
                  className={style.primary_button}
                  type="button"
                  onClick={handleConfirmedSubmit}
                  disabled={contactMutation.isPending}
                >
                  {contactMutation.isPending ? "送信中..." : "送信する"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={style.dialog_content}>
            <div className={style.dialog_header}>
              <p>TRANSMISSION COMPLETE</p>
            </div>
            <div className={`${style.dialog_body} ${style.complete_body}`}>
              <span className={style.complete_icon} aria-hidden="true">✓</span>
              <p className={style.dialog_kicker}>MESSAGE ACCEPTED</p>
              <h2 id="contact-dialog-title">送信が完了しました</h2>
              <p className={style.dialog_description}>
                お問い合わせありがとうございます。内容を確認後、メールでご連絡します。
              </p>
              <div className={style.dialog_actions}>
                <button className={style.secondary_button} type="button" onClick={closeDialog}>
                  閉じる
                </button>
                <button className={style.primary_button} type="button" onClick={handleHome}>
                  Homeに戻る
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  )
}
