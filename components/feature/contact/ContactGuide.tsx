"use client"

import Image from "next/image"
import { useRef, useState, type MouseEvent } from "react"
import ContactDialogueText from "@/components/feature/contact/ContactDialogueText"
import ContactGuideCard from "@/components/feature/contact/ContactGuideCard"
import ContactGuideChoiceButton from "@/components/feature/contact/ContactGuideChoiceButton"
import ContactGuideHintList from "@/components/feature/contact/ContactGuideHintList"
import useBodyScrollLock from "@/hooks/useBodyScrollLock"
import {
  CONTACT_GUIDE_CONVERSATION,
  CONTACT_GUIDE_RESULTS,
  CONTACT_GUIDES,
  type ContactFocusField,
  type ContactGuide as ContactGuideData,
  type ContactGuideChoiceAction,
  type ContactGuideResult,
  type ContactGuideStage,
  type ContactGuideTemplate,
} from "@/const/contactGuide"
import { CONTACT_DIALOGUE_CHARACTER_DELAY_MS } from "@/const/animation"
import style from "@/styles/feature/contact/ContactGuide.module.scss"

type ContactGuideProps = {
  isVisible: boolean
  hintGuide: ContactGuideData | null
  hasExistingDraft: () => boolean
  onHintGuideChange: (guide: ContactGuideData | null) => void
  onApplyTemplate: (template: ContactGuideTemplate) => void
  onReturnToForm: (field: ContactFocusField) => void
  onRevealEnd: () => void
}

export default function ContactGuide({
  isVisible,
  hintGuide,
  hasExistingDraft,
  onHintGuideChange,
  onApplyTemplate,
  onReturnToForm,
  onRevealEnd,
}: ContactGuideProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [stage, setStage] = useState<ContactGuideStage>("topic")
  const [selectedGuide, setSelectedGuide] = useState<ContactGuideData | null>(null)
  const [isMessageComplete, setIsMessageComplete] = useState(false)
  const [result, setResult] = useState<ContactGuideResult | null>(null)
  const [conversationSession, setConversationSession] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useBodyScrollLock(isDialogOpen)

  const currentStep = CONTACT_GUIDE_CONVERSATION[stage]
  const currentMessage = stage === "guidance"
    ? selectedGuide?.guidance ?? ""
    : stage === "result" && result
      ? CONTACT_GUIDE_RESULTS[result].message
      : currentStep.message ?? ""

  const openGuide = () => {
    setConversationSession((current) => current + 1)
    setStage("topic")
    setSelectedGuide(null)
    setResult(null)
    setIsMessageComplete(false)
    const dialog = dialogRef.current
    if (dialog) {
      dialog.showModal()
      setIsDialogOpen(true)
    }
  }

  const closeGuide = () => {
    dialogRef.current?.close()
  }

  const moveToStage = (nextStage: ContactGuideStage) => {
    setStage(nextStage)
    setIsMessageComplete(false)
  }

  const selectTopic = (guide: ContactGuideData) => {
    setSelectedGuide(guide)
    moveToStage("guidance")
  }

  const applyTemplate = () => {
    if (!selectedGuide) return

    onHintGuideChange(null)
    onApplyTemplate(selectedGuide.template)
    setResult("template")
    moveToStage("result")
  }

  const acceptTemplate = () => {
    if (hasExistingDraft()) {
      moveToStage("overwrite")
      return
    }

    applyTemplate()
  }

  const writeWithGuide = () => {
    if (selectedGuide) {
      onHintGuideChange(selectedGuide)
      setResult("guide")
      moveToStage("result")
    }
  }

  const writeManually = () => {
    onHintGuideChange(null)
    setResult("manual")
    moveToStage("result")
  }

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) {
      closeGuide()
    }
  }

  const handleChoice = (action: ContactGuideChoiceAction) => {
    switch (action.type) {
      case "select-guide": {
        const guide = CONTACT_GUIDES.find(({ id }) => id === action.guideId)
        if (guide) selectTopic(guide)
        return
      }
      case "move-stage":
        if (action.stage === "topic") {
          setSelectedGuide(null)
        }
        moveToStage(action.stage)
        return
      case "select-result":
        if (action.result === "manual") {
          writeManually()
        } else if (action.result === "guide") {
          writeWithGuide()
        } else {
          acceptTemplate()
        }
        return
      case "apply-template":
        applyTemplate()
        return
      case "close":
        closeGuide()
    }
  }

  return (
    <>
      <ContactGuideCard
        isVisible={isVisible}
        hintGuide={hintGuide}
        onOpen={openGuide}
        onRevealEnd={onRevealEnd}
      />

      <dialog
        ref={dialogRef}
        className={style.dialog}
        aria-labelledby="contact-guide-title"
        onClick={handleBackdropClick}
        onClose={() => {
          setIsDialogOpen(false)

          const focusField = result
            ? CONTACT_GUIDE_RESULTS[result].focusField
            : null

          setStage("topic")
          setSelectedGuide(null)
          setResult(null)
          setIsMessageComplete(false)

          if (focusField) {
            onReturnToForm(focusField)
          }
        }}
      >
        <div className={style.dialog_header}>
          <p>PROFESSOR SUPPORT CHANNEL</p>
          <button type="button" onClick={closeGuide}>
            <span className={style.visually_hidden}>閉じる</span>
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className={style.dialog_body}>
          <h2 id="contact-guide-title" className={style.visually_hidden}>
            J.K.教授へのお問い合わせ相談
          </h2>
          <div className={style.professor_area} aria-hidden="true">
            <Image
              src="/images/character/tachie.png"
              alt=""
              width={832}
              height={1216}
              sizes="(max-width: 560px) 128px, 240px"
            />
          </div>

          <div className={style.conversation}>
            {selectedGuide && (
              <p className={style.selected_topic}>{selectedGuide.label}</p>
            )}
            <div className={style.message}>
              <p className={style.speaker}>J.K.教授</p>
              <ContactDialogueText
                key={`${conversationSession}-${stage}-${selectedGuide?.id ?? "none"}`}
                text={currentMessage}
                animationDelay={CONTACT_DIALOGUE_CHARACTER_DELAY_MS}
                onComplete={() => setIsMessageComplete(true)}
              />
            </div>

            {isMessageComplete && (
              <div className={style.choices}>
                {currentStep.supplement === "selected-guide-hints"
                  && selectedGuide && (
                    <ContactGuideHintList hints={selectedGuide.hints} />
                  )}
                {currentStep.choices.map((choice, index) => (
                  <ContactGuideChoiceButton
                    key={choice.id}
                    label={choice.label}
                    variant={choice.variant}
                    revealDelay={index * 60}
                    onClick={() => handleChoice(choice.action)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </dialog>
    </>
  )
}
