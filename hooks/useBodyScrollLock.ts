import { useEffect } from "react"

type BodyStyleSnapshot = {
  position: string
  top: string
  left: string
  right: string
  width: string
  overflow: string
  paddingRight: string
}

let lockCount = 0
let lockedScrollX = 0
let lockedScrollY = 0
let bodyStyleSnapshot: BodyStyleSnapshot | null = null

const lockBodyScroll = () => {
  if (lockCount === 0) {
    const { body, documentElement } = document

    lockedScrollX = window.scrollX
    lockedScrollY = window.scrollY
    bodyStyleSnapshot = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    }

    const scrollbarWidth = window.innerWidth - documentElement.clientWidth
    const currentPaddingRight = Number.parseFloat(
      window.getComputedStyle(body).paddingRight,
    ) || 0

    body.style.position = "fixed"
    body.style.top = `-${lockedScrollY}px`
    body.style.left = `-${lockedScrollX}px`
    body.style.right = "0"
    body.style.width = "100%"
    body.style.overflow = "hidden"
    body.style.paddingRight = `${currentPaddingRight + scrollbarWidth}px`
  }

  lockCount += 1
}

const unlockBodyScroll = () => {
  if (lockCount === 0) return

  lockCount -= 1
  if (lockCount > 0 || !bodyStyleSnapshot) return

  const { body } = document
  body.style.position = bodyStyleSnapshot.position
  body.style.top = bodyStyleSnapshot.top
  body.style.left = bodyStyleSnapshot.left
  body.style.right = bodyStyleSnapshot.right
  body.style.width = bodyStyleSnapshot.width
  body.style.overflow = bodyStyleSnapshot.overflow
  body.style.paddingRight = bodyStyleSnapshot.paddingRight

  bodyStyleSnapshot = null
  window.scrollTo(lockedScrollX, lockedScrollY)
}

export default function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return

    lockBodyScroll()
    return unlockBodyScroll
  }, [isLocked])
}
