import { useState, useRef, useEffect, useCallback } from 'react'
import '../styles/lazy-image.css'

function useIntersection(rootMargin = '200px 0px') {
  const ref = useRef(null)
  const [visible, setVisible] = useState(
    typeof IntersectionObserver === 'undefined'
  )

  useEffect(() => {
    const el = ref.current
    if (!el || visible) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { rootMargin }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin, visible])

  return [ref, visible]
}

export default function LazyImage({
  src,
  alt = '',
  className = '',
  wrapperClassName = '',
  skeletonClassName = '',
  rootMargin,
  aspectRatio,
  fetchPriority,
}) {
  const [wrapperRef, visible] = useIntersection(rootMargin)
  const [state, setState] = useState('pending')
  const loadingRef = useRef(false)

  const handleLoad = useCallback(() => {
    setState('loaded')
  }, [])

  const handleError = useCallback(() => {
    setState('error')
  }, [])

  useEffect(() => {
    if (!visible || state !== 'pending' || loadingRef.current) return
    if (!src) return
    loadingRef.current = true
    const img = new Image()
    if (fetchPriority) img.fetchPriority = fetchPriority
    img.onload = handleLoad
    img.onerror = handleError
    img.src = src
  }, [visible, src, fetchPriority, state, handleLoad, handleError])

  const isLoading = state === 'pending'
  const hasError = state === 'error'

  return (
    <div
      ref={wrapperRef}
      className={`lazy-image-wrapper ${wrapperClassName}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <div className={`lazy-image-skeleton ${!isLoading ? 'loaded' : ''} ${skeletonClassName}`} />
      {src && visible ? (
        <img
          src={src}
          alt={alt}
          className={`lazy-image-element ${state} ${className}`}
          onLoad={handleLoad}
          onError={handleError}
          fetchPriority={fetchPriority}
          loading="lazy"
        />
      ) : null}
      {hasError && (
        <div className="lazy-image-error">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21,15 16,10 5,21" />
          </svg>
          <span>Failed to load</span>
        </div>
      )}
    </div>
  )
}
