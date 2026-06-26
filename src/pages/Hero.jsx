import { useCallback, useEffect, useRef, useState } from 'react'

const TOTAL_FRAMES = 240
const SCROLL_SECTIONS = 5

const features = [
  {
    range: [0, 0.25],
    title: 'Media7 News Kerala',
    subtitle: 'Media & Advertising Hub',
    description: 'A complete digital media platform delivering news, branding, advertising, and audience engagement solutions across Kerala.',
  },
  {
    range: [0.25, 0.45],
    title: 'Visual Advertising',
    subtitle: '01 — Feature',
    description: 'High-impact visual channel promotions, scrolling advertisements, and banner placements designed to maximize brand visibility.',
  },
  {
    range: [0.45, 0.65],
    title: 'Multi-Platform Reach',
    subtitle: '02 — Feature',
    description: 'Promote your brand through Media7 News Portal, Visual Channel, WhatsApp Groups, and E-Directory networks from a single campaign.',
  },
  {
    range: [0.65, 0.85],
    title: 'Social Media Network',
    subtitle: '03 — Feature',
    description: 'Expand your reach across YouTube, Facebook, Instagram, Threads, X, LinkedIn, Pinterest, and WhatsApp with targeted promotions.',
  },
  {
    range: [0.85, 1],
    title: 'Performance & Growth',
    subtitle: '04 — Feature',
    description: 'Backed by millions of views and audience engagement, helping businesses build awareness and generate measurable results.',
  },
]

const LAZY_BUFFER = 10
const INITIAL_LOAD = 15
const CONCURRENCY_LIMIT = 6
const IDLE_PRELOAD = 30

export default function Hero() {
  const canvasRef = useRef(null)
  const imagesRef = useRef([])
  const loadedRef = useRef(new Set())
  const frameRef = useRef(0)
  const rafRef = useRef(null)
  const idleRef = useRef(null)
  const queueRef = useRef([])
  const activeLoadsRef = useRef(0)
  const prevFrameRef = useRef(0)
  const [progress, setProgress] = useState(0)
  const [activeFeature, setActiveFeature] = useState(0)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600)

  function getFolder() {
    return isMobile ? 'hero_mobile' : 'hero_desktop'
  }

  function createImage(folder, index, priority) {
    const img = new Image()
    img.src = `/${folder}/ezgif-frame-${String(index + 1).padStart(3, '0')}.webp`
    img.fetchPriority = priority || 'low'
    img.decoding = 'async'
    return img
  }

  function processQueue() {
    while (activeLoadsRef.current < CONCURRENCY_LIMIT && queueRef.current.length > 0) {
      const { folder, index, priority } = queueRef.current.shift()
      activeLoadsRef.current++
      const img = createImage(folder, index, priority)
      imagesRef.current[index] = img
      img.onload = () => {
        activeLoadsRef.current--
        processQueue()
        if (index === frameRef.current || index === 0) drawFrame(index)
      }
      img.onerror = () => { activeLoadsRef.current--; processQueue() }
      if (img.complete) img.onload()
    }
  }

  function preloadCritical(folder) {
    for (let i = 0; i < 3; i++) {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = `/${folder}/ezgif-frame-${String(i + 1).padStart(3, '0')}.webp`
      link.fetchPriority = 'high'
      document.head.appendChild(link)
    }
  }

  function loadFrame(index, priority) {
    if (loadedRef.current.has(index)) return
    loadedRef.current.add(index)
    queueRef.current.push({ folder: getFolder(), index, priority })
    processQueue()
  }

  function ensureWindow(center) {
    const start = Math.max(0, center - LAZY_BUFFER)
    const end = Math.min(TOTAL_FRAMES - 1, center + LAZY_BUFFER)
    for (let i = start; i <= end; i++) {
      const dist = Math.abs(i - center)
      loadFrame(i, dist <= 3 ? 'high' : 'low')
    }
  }

  function preloadIdle(center) {
    if (idleRef.current) cancelIdleCallback(idleRef.current)
    const fn = typeof requestIdleCallback === 'function'
      ? requestIdleCallback
      : (cb) => setTimeout(cb, 200)
    const direction = center >= prevFrameRef.current ? 1 : -1
    prevFrameRef.current = center
    idleRef.current = fn(() => {
      const start = Math.max(0, center + direction * (LAZY_BUFFER + 1))
      const end = direction > 0
        ? Math.min(TOTAL_FRAMES - 1, center + LAZY_BUFFER + IDLE_PRELOAD)
        : Math.max(0, center - LAZY_BUFFER - IDLE_PRELOAD)
      const step = direction
      for (let i = start; direction > 0 ? i <= end : i >= end; i += step) {
        if (!loadedRef.current.has(i)) loadFrame(i, 'low')
      }
    }, { timeout: 3000 })
  }

  function drawFrame(index) {
    const img = imagesRef.current[index]
    if (!img || !img.complete) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const cw = canvas.width
    const ch = canvas.height
    const cr = cw / ch
    const ir = img.naturalWidth / img.naturalHeight
    let sx, sy, sw, sh
    if (ir > cr) {
      sh = img.naturalHeight
      sw = sh * cr
      sx = (img.naturalWidth - sw) / 2
      sy = 0
    } else {
      sw = img.naturalWidth
      sh = sw / cr
      sx = 0
      sy = (img.naturalHeight - sh) / 2
    }
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const mobile = window.innerWidth <= 600
      setIsMobile(mobile)
      if (loadedRef.current.has(frameRef.current)) {
        drawFrame(frameRef.current)
      }
    }

    resize()
    window.addEventListener('resize', resize)

    imagesRef.current = []
    loadedRef.current = new Set()
    preloadCritical(getFolder())
    for (let i = 0; i < INITIAL_LOAD; i++) loadFrame(i)

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [isMobile]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleScroll = useCallback(() => {
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const p = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0
      setProgress(p)

      const frameIndex = Math.min(Math.floor(p * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1)
      ensureWindow(frameIndex)
      preloadIdle(frameIndex)

      if (frameIndex !== frameRef.current) {
        frameRef.current = frameIndex
        drawFrame(frameIndex)
      }

      for (let i = features.length - 1; i >= 0; i--) {
        if (p >= features[i].range[0] && p < features[i].range[1]) {
          setActiveFeature(i)
          break
        }
      }
    })
  }, [isMobile]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    return () => {
      document.documentElement.style.overflowY = 'auto'
      if (idleRef.current) cancelIdleCallback(idleRef.current)
    }
  }, [])

  return (
    <>
      <div className="fixed inset-0 bg-black">
        <canvas
          ref={canvasRef}
          className="block w-full h-full"
        />
      </div>

      {/* Starting Overlay */}
      <div
        className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none"
        style={{
          backgroundColor: 'rgba(0,0,0,0.8)',
          opacity: Math.max(0, 1 - progress / 0.15),
          transition: 'opacity 0.3s',
        }}
      >
        <p className="text-white/70 text-xs md:text-sm tracking-[0.3em] uppercase">
          Scroll to see the Media7
        </p>
      </div>

      {/* Scroll Indicator */}
      <div
        className="fixed left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-[5]"
        style={{
          bottom: isMobile ? 'auto' : '2rem',
          top: isMobile ? '1.5rem' : 'auto',
          opacity: progress > 0.5 ? 0 : 1,
          transition: 'opacity 0.8s',
        }}
      >
        <style>{`
          @keyframes scroll-bounce {
            0%, 100% { transform: translateY(0); opacity: 0.6; }
            50% { transform: translateY(8px); opacity: 1; }
          }
        `}</style>
        <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/40">
          {progress > 0.02 ? 'Continue scrolling' : 'Scroll'}
        </span>
        <span className="material-symbols-outlined text-white/60 text-2xl" style={{ animation: 'scroll-bounce 2s ease-in-out infinite' }}>
          keyboard_arrow_down
        </span>
      </div>

      <div className="fixed inset-0 flex items-end pb-12 md:pb-24 pointer-events-none">
        {features.map((f, i) => {
          const isActive = activeFeature === i
          const localP = Math.max(0, Math.min((progress - f.range[0]) / (f.range[1] - f.range[0]), 1))
          const opacity = localP < 0.1 ? localP / 0.1 : localP > 0.85 ? (1 - localP) / 0.15 : 1
          const y = localP < 0.1 ? 30 * (1 - localP / 0.1) : localP > 0.85 ? -30 * ((localP - 0.85) / 0.15) : 0

          return (
            <div
              key={i}
              className="absolute"
              style={{
                opacity: isActive ? opacity : 0,
                transition: 'opacity 0.2s',
                ...(isMobile
                  ? { bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center' }
                  : { bottom: 'clamp(80px, 12vh, 140px)', left: 'clamp(24px, 6vw, 80px)' }
                ),
              }}
            >
              <div
                className="backdrop-blur-xl rounded-r-3xl rounded-l-lg px-5 py-4 md:px-8 md:py-6 max-w-lg w-full md:w-auto"
                style={{
                  transform: isActive ? `translateY(${y}px)` : 'translateY(0px)',
                  transition: 'transform 0.2s',
                  background: 'linear-gradient(135deg, rgba(180,140,50,0.06) 0%, rgba(120,90,30,0.03) 100%)',
                  border: '1px solid rgba(218,165,32,0.15)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(218,165,32,0.08), 0 0 40px rgba(218,165,32,0.04)',
                }}
              >
                <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase mb-1.5 md:mb-2 block text-white/50">
                  {f.subtitle}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-none mb-2 md:mb-3 drop-shadow-xl">
                  {f.title}
                </h2>
                {f.description && (
                  <p className="text-xs sm:text-sm md:text-base text-white/40 leading-relaxed font-light max-w-sm">
                    {f.description}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>


      <div className="bg-black" style={{ height: `${SCROLL_SECTIONS * 100}vh` }} />
    </>
  )
}
