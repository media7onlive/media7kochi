import { useState, useEffect, useRef, useCallback } from 'react'
import ImagePreloader from '../utils/ImagePreloader'

const CRITICAL_FRAMES = 20
const CONCURRENCY = 6

function getFolder() {
  return window.innerWidth <= 600 ? 'hero_mobile' : 'hero_desktop'
}

function buildFrameUrls(start, count) {
  return Array.from({ length: count }, (_, i) =>
    `/${getFolder()}/ezgif-frame-${String(start + i + 1).padStart(3, '0')}.webp`
  )
}

const LOGO = '/logo.webp'

export default function useImagePreloader({ onReady } = {}) {
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)
  const [backgroundStats, setBackgroundStats] = useState({ loaded: 0, total: 0 })

  const bgRef = useRef(null)
  const bgStarted = useRef(false)

  useEffect(() => {
    const preloader = new ImagePreloader({
      concurrency: CONCURRENCY,
      onProgress: (p) => setProgress(p),
      onComplete: () => {
        setProgress(1)
        setReady(true)
        onReady?.()
      },
    })

    preloader.add(LOGO, 'high')
    buildFrameUrls(0, CRITICAL_FRAMES).forEach(url => preloader.add(url, 'high'))

    preloader.start()

    return () => preloader.abort()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const startBackgroundLoad = useCallback((imageList) => {
    if (bgStarted.current) return
    bgStarted.current = true

    const bg = new ImagePreloader({
      concurrency: CONCURRENCY,
      onProgress: (p, loaded, failed) => {
        const total = loaded + failed + bg._queue.length + bg._active
        setBackgroundStats({ loaded, total })
      },
      onComplete: () => {
        setBackgroundStats(s => ({ ...s, loaded: s.total }))
      },
    })

    bgRef.current = bg

    buildFrameUrls(CRITICAL_FRAMES, 240 - CRITICAL_FRAMES).forEach(
      url => bg.add(url, 'low')
    )

    if (imageList?.length) {
      imageList.forEach(url => bg.add(url, 'normal'))
    }

    const start = typeof requestIdleCallback === 'function'
      ? (cb) => requestIdleCallback(cb, { timeout: 3000 })
      : (cb) => setTimeout(cb, 500)

    start(() => bg.start())

    return () => bg.abort()
  }, [])

  return { progress, ready, backgroundStats, startBackgroundLoad }
}
