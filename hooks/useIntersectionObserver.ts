import { useEffect, useRef, useState } from "react";

type UseIntersectionObserverProps = {
  threshold?: number
  once?: boolean
}
export default function useIntersectionObserver<T extends HTMLElement>({
  threshold = 0.3,
  once = false
}: UseIntersectionObserverProps) {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(([entry])=> {
      if (entry.isIntersecting) {
        setIsVisible(true)
        if (once) {
          observer.disconnect()
        }
      } else {
        setIsVisible(false)
      }
    }, {threshold})
    observer.observe(element)
    return () => {
      observer.disconnect()
    }
  }, [once, threshold])

  return {
    ref,
    isVisible
  }
}
