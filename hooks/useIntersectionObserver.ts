import { useEffect, useRef, useState } from "react";

type UseIntersectionObserverProps = {
  threshold?: number
}
export default function useIntersectionObserver<T extends HTMLElement>({
  threshold = 0.3
}: UseIntersectionObserverProps) {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(([entry])=> {
      if (entry.isIntersecting) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }, {threshold})
    observer.observe(element)
    return () => {
      observer.disconnect()
    }
  }, [])

  return {
    ref,
    isVisible
  }
}