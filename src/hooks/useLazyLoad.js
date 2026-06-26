import { useEffect, useRef, useState } from 'react'

export default function useLazyLoad({ rootMargin = '200px 0px', threshold = 0 } = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(
    typeof IntersectionObserver === 'undefined'
  )

  useEffect(() => {
    const el = ref.current
    if (!el || isVisible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { rootMargin, threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin, threshold, isVisible])

  return [ref, isVisible]
}
