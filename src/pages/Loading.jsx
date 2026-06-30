import { useEffect, useRef, useState } from 'react'

const TOTAL_FRAMES = 240

export default function Loading({ onNavigate }) {
  const [progress, setProgress] = useState(0)
  const [display, setDisplay] = useState(0)
  const ready = useRef(false)
  const canvasRef = useRef(null)
  const imagesRef = useRef([])

  useEffect(() => {
    if (ready.current) return
    ready.current = true

    let loaded = 0
    const folder = window.innerWidth <= 600 ? 'hero_mobile' : 'hero_desktop'
    const loadedImgs = []

    function drawFrame(index) {
      const img = loadedImgs[index]
      if (!img) return
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

    function onFrameLoad(i) {
      loaded = loaded + 1
      setProgress(loaded / TOTAL_FRAMES)
      const max = loaded
      for (let j = 0; j < max; j++) {
        if (loadedImgs[j] && loadedImgs[j].complete) {
          drawFrame(j)
          break
        }
      }
      if (loaded === TOTAL_FRAMES) {
        imagesRef.current = loadedImgs
        setTimeout(function () { onNavigate('home') }, 600)
      }
    }

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image()
      const padded = String(i + 1).padStart(3, '0')
      img.src = '/' + folder + '/ezgif-frame-' + padded + '.webp'
      loadedImgs[i] = img
      img.onload = function () { onFrameLoad(i) }
      img.onerror = function () { onFrameLoad(i) }
    }
  }, [onNavigate])

  useEffect(function () {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }, [])

  useEffect(function () {
    if (display >= 100) return
    var target = Math.min(progress * 100, 99.9)
    if (display >= target) return
    var speed = display < 60 ? 4 : 2
    var id = setTimeout(function () { setDisplay(function (d) { return Math.min(d + speed, target) }) }, 30)
    return function () { clearTimeout(id) }
  }, [display, progress])

  var pct = progress >= 1 ? 100 : Math.round(display)

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center" style={{ background: 'radial-gradient(ellipse at center, #0a0f1a 0%, #060a12 50%, #030508 100%)' }}>
      <style>{`
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        @keyframes spin-slower { to { transform: rotate(-360deg); } }
        @keyframes logo-pulse {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.03); opacity: 1; }
        }
        @keyframes ring-fade {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes count-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(245,197,66,0.15), 0 0 60px rgba(245,197,66,0.05); }
          50% { text-shadow: 0 0 40px rgba(245,197,66,0.3), 0 0 80px rgba(245,197,66,0.1); }
        }
      `}</style>

      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full object-cover opacity-20"
      />

      <div className="relative flex flex-col items-center z-10">
        <div className="absolute -inset-14" style={{ animation: 'spin-slow 5s linear infinite' }}>
          <svg viewBox="0 0 200 200" className="w-full h-full" style={{ animation: 'ring-fade 4s ease-in-out infinite' }}>
            <defs>
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
                <stop offset="50%" stopColor="rgba(200,200,200,0.1)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="88" fill="none" stroke="url(#ringGrad)" strokeWidth="1" strokeDasharray="3 7" />
          </svg>
        </div>
        <div className="absolute -inset-10" style={{ animation: 'spin-slower 7s linear infinite' }}>
          <svg viewBox="0 0 200 200" className="w-full h-full" style={{ animation: 'ring-fade 5s ease-in-out infinite 1s' }}>
            <defs>
              <linearGradient id="ringGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(220,220,225,0.25)" />
                <stop offset="50%" stopColor="rgba(180,180,185,0.08)" />
                <stop offset="100%" stopColor="rgba(220,220,225,0)" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="78" fill="none" stroke="url(#ringGrad2)" strokeWidth="1.5" strokeDasharray="1 5" />
          </svg>
        </div>
        <div style={{ animation: 'logo-pulse 3.5s ease-in-out infinite' }}>
          <img src="/logo.webp" alt="Media7" className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain select-none relative z-10" style={{ filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.12)) drop-shadow(0 0 40px rgba(200,200,210,0.08))' }} />
        </div>
        <div className="absolute w-full h-full" style={{ animation: 'spin-slow 10s linear infinite' }}>
          {[0, 45, 90, 135, 180, 225, 270, 315].map(function (deg, i) {
            return (
              <div key={i} className="absolute rounded-full" style={{
                width: i % 2 === 0 ? 2 : 1.5,
                height: i % 2 === 0 ? 2 : 1.5,
                background: i % 2 === 0 ? 'rgba(255,255,255,0.4)' : 'rgba(200,200,210,0.25)',
                top: '50%',
                left: '50%',
                transform: 'rotate(' + deg + 'deg) translateY(-56px)',
                transformOrigin: '0 0',
              }} />
            )
          })}
        </div>
      </div>
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10">
        <div className="font-display-xl text-7xl md:text-8xl text-gold tabular-nums leading-none" style={{ animation: 'count-glow 2s ease-in-out infinite' }}>
          {pct}<span className="text-3xl md:text-4xl text-white/20">%</span>
        </div>
        <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gold rounded-full transition-all duration-300" style={{ width: pct + '%' }} />
        </div>
        <span className="text-xs tracking-widest uppercase text-white/40">{pct >= 100 ? 'Ready' : 'Loading'}</span>
      </div>
    </div>
  )
}
