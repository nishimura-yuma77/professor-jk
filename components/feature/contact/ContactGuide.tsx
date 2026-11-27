"use client"

import { useRef, useState, type MouseEvent } from "react"
import DialogueScreen, { type DialogueScene } from "@/components/ui/dialogue/DialogueScreen"
import ContactGuideCard from "@/components/feature/contact/ContactGuideCard"
import ContactGuideHintList from "@/components/feature/contact/ContactGuideHintList"
import useBodyScrollLock from "@/hooks/useBodyScrollLock"
import {
  CONTACT_GUIDE_MESSAGES,
  CONTACT_GUIDE_RESULTS,
  CONTACT_GUIDES,
  type ContactFocusField,
  type ContactGuide as ContactGuideData,
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

const PROFESSOR = {
  name: "J.K.教授",
  image: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/character/tachie.png`,
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
  const [result, setResult] = useState<ContactGuideResult | null>(null)
  const [conversationSession, setConversationSession] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useBodyScrollLock(isDialogOpen)

  const openGuide = () => {
    setConversationSession((current) => current + 1)
    setStage("topic")
    setSelectedGuide(null)
    setResult(null)
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

  const sceneContext = { speaker: PROFESSOR, caption: selectedGuide?.label }
  const scenes: Record<ContactGuideStage, DialogueScene> = {
    topic: {
      ...sceneContext,
      text: CONTACT_GUIDE_MESSAGES.topic,
      choices: CONTACT_GUIDES.map((guide) => ({ id: guide.id, label: guide.label })),
      onSelect: (id) => {
        const guide = CONTACT_GUIDES.find((guide) => guide.id === id)
        if (guide) selectTopic(guide)
      },
    },
    guidance: {
      ...sceneContext,
      text: selectedGuide?.guidance ?? "",
      supplement: selectedGuide && <ContactGuideHintList hints={selectedGuide.hints} />,
      choices: [
        { id: "select-again", label: "選び直す" },
        { id: "next", label: "次へ", variant: "primary" },
      ],
      onSelect: (id) => {
        if (id === "select-again") {
          setSelectedGuide(null)
          moveToStage("topic")
        } else if (id === "next") {
          moveToStage("template")
        }
      },
    },
    template: {
      ...sceneContext,
      text: CONTACT_GUIDE_MESSAGES.template,
      choices: Object.entries(CONTACT_GUIDE_RESULTS).map(([id, definition]) => ({
        id,
        label: definition.label,
        variant: definition.variant,
      })),
      onSelect: (id) => {
        if (id === "manual") writeManually()
        else if (id === "guide") writeWithGuide()
        else if (id === "template") acceptTemplate()
      },
    },
    overwrite: {
      ...sceneContext,
      text: CONTACT_GUIDE_MESSAGES.overwrite,
      choices: [
        { id: "back", label: "戻る" },
        { id: "overwrite", label: "上書きする", variant: "primary" },
      ],
      onSelect: (id) => {
        if (id === "back") moveToStage("template")
        else if (id === "overwrite") applyTemplate()
      },
    },
    result: {
      ...sceneContext,
      text: result ? CONTACT_GUIDE_RESULTS[result].message : "",
      choices: [{ id: "return-to-form", label: "フォームに戻る", variant: "primary" }],
      onSelect: () => closeGuide(),
    },
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

        <h2 id="contact-guide-title" className={style.visually_hidden}>
          J.K.教授へのお問い合わせ相談
        </h2>
        <DialogueScreen
          key={`${conversationSession}-${stage}-${selectedGuide?.id ?? "none"}`}
          scene={scenes[stage]}
          animationDelay={CONTACT_DIALOGUE_CHARACTER_DELAY_MS}
        />
      </dialog>
    </>
  )
}
