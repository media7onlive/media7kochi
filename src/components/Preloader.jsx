import '../styles/preloader.css'

const orbitalDots = [0, 45, 90, 135, 180, 225, 270, 315]

export default function Preloader({ progress = 0, visible = true }) {
  const pct = progress >= 1 ? 100 : Math.min(Math.round(progress * 100), 99)
  const displayPct = progress >= 1 ? 100 : pct

  return (
    <div className={`preloader ${!visible ? 'hidden' : ''}`}>
      <div className="relative flex flex-col items-center">
        <div className="preloader-logo-ring">
          <svg viewBox="0 0 200 200">
            <defs>
              <linearGradient id="ringGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
                <stop offset="50%" stopColor="rgba(200,200,200,0.1)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="88" fill="none" stroke="url(#ringGrad1)" strokeWidth="1" strokeDasharray="3 7" />
          </svg>
        </div>
        <div className="preloader-logo-ring-2">
          <svg viewBox="0 0 200 200">
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
        <img src="/logo_href.webp" alt="Media7_href" className="preloader-logo" />
        <div className="preloader-orbital-dots">
          {orbitalDots.map((deg, i) => (
            <div
              key={i}
              className="preloader-dot"
              style={{
                width: i % 2 === 0 ? 2 : 1.5,
                height: i % 2 === 0 ? 2 : 1.5,
                background: i % 2 === 0 ? 'rgba(255,255,255,0.4)' : 'rgba(200,200,210,0.25)',
                transform: `rotate(${deg}deg) translateY(-56px)`,
              }}
            />
          ))}
        </div>
      </div>
      <div className="preloader-bottom">
        <div className="preloader-percentage">
          {displayPct}
          <span className="preloader-percentage-unit">%</span>
        </div>
        <div className="preloader-bar">
          <div className="preloader-bar-fill" style={{ width: `${displayPct}%` }} />
        </div>
        <span className={`preloader-ready ${progress >= 1 ? 'visible' : ''}`}>
          {progress >= 1 ? 'Ready' : 'Preparing Experience...'}
        </span>
      </div>
    </div>
  )
}
