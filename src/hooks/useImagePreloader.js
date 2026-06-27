import { useState, useEffect, useRef } from 'react'
import ImagePreloader from '../utils/ImagePreloader'

const CONCURRENCY = 6

export default function useImagePreloader(imageList) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [stats, setStats] = useState({ loaded: 0, failed: 0, total: 0 })
  const preloaderRef = useRef(null)

  useEffect(() => {
    if (!imageList || imageList.length === 0) {
      const id = setTimeout(() => {
        setProgress(1)
        setDone(true)
      }, 0)
      return () => clearTimeout(id)
    }

    let cancelled = false

    const preloader = new ImagePreloader({
      concurrency: CONCURRENCY,
      onProgress: (p, loaded, failed) => {
        if (cancelled) return
        setProgress(p)
        setStats({ loaded, failed, total: imageList.length })
      },
      onComplete: ({ loaded, failed }) => {
        if (cancelled) return
        setProgress(1)
        setStats({ loaded: loaded.length, failed: failed.length, total: imageList.length })
        setDone(true)
      },
    })

    preloaderRef.current = preloader

    for (const url of imageList) {
      preloader.add(url)
    }

    preloader.start()

    return () => {
      cancelled = true
      preloader.abort()
    }
  }, [imageList])

  return { progress, done, stats }
}
