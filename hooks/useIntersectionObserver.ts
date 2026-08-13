import { useEffect, useRef, useState } from "react";

type UseIntersectionObserverProps = {
  threshold: number
}
export default function useIntersectionObserver<T>(props: UseIntersectionObserverProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const {
    threshold
  } = props

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