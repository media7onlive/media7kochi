import { useState, useEffect, useRef } from 'react'
import Preloader from './components/Preloader'
import useImagePreloader from './hooks/useImagePreloader'
import Hero from './pages/Hero'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import Careers from './pages/Careers'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Navbar from './components/Navbar'

const ALL_CONTENT_IMAGES = [
  '/home_section_1.webp',
  '/CEO_of_Media7.webp',
  '/office.webp',
  '/service1.webp',
  '/service2.webp',
  '/service3.webp',
  '/service4.webp',
  '/service5.webp',
  '/portfolio1.webp',
  '/portfolio2.webp',
  '/portfolio3.webp',
  '/portfolio4.webp',
  '/portfolio5.webp',
  '/portfolio6.webp',
  '/grace_financials.jpg',
  '/wild_wind_logo.jpg',
  '/anvi_group_of_companies_logo.png',
  '/marina_properties_management_logo.jpg',
  'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
  'https://images.unsplash.com/photo-1552664730-d307ca884978',
  'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a',
  'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4',
  'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0',
  'https://images.unsplash.com/photo-1455390582262-044cdead277a',
  'https://images.unsplash.com/photo-1557838923-2985c318be48',
  'https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce',
  'https://images.unsplash.com/photo-1511578314322-379afb476865',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
]

export default function App() {
  const [page, setPage] = useState('home')
  const [siteVisible, setSiteVisible] = useState(false)
  const bgStarted = useRef(false)

  const { progress, ready, startBackgroundLoad } = useImagePreloader({
    onReady: () => {
      setSiteVisible(true)
    },
  })

  useEffect(() => {
    if (!ready || bgStarted.current) return
    bgStarted.current = true
    startBackgroundLoad(ALL_CONTENT_IMAGES)
  }, [ready, startBackgroundLoad])

  const isBlogPost = page.startsWith('blogpost-')
  const showNav = page !== 'home' && !isBlogPost

  function navigate(nextPage) {
    setPage(nextPage)
    window.history.pushState({ page: nextPage }, '', '')
  }

  useEffect(() => {
    function handlePopState(e) {
      if (e.state?.page) setPage(e.state.page)
    }
    window.addEventListener('popstate', handlePopState)
    if (!window.history.state) {
      window.history.replaceState({ page }, '', '')
    }
    return () => window.removeEventListener('popstate', handlePopState)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Preloader progress={progress} visible={!siteVisible} />

      <div
        style={{
          opacity: siteVisible ? 1 : 0,
          transition: 'opacity 0.8s ease-out',
        }}
      >
        {showNav && <Navbar onNavigate={navigate} currentPage={page} />}

        {page === 'home' && (
          <>
            <Hero />
            <div className="fixed inset-0 z-10" style={{ height: '100dvh' }}>
              <Home onNavigate={navigate} />
            </div>
          </>
        )}

        {page === 'about' && <About onNavigate={navigate} />}
        {page === 'services' && <Services onNavigate={navigate} />}
        {page === 'portfolio' && <Portfolio onNavigate={navigate} />}
        {page === 'blog' && <Blog onNavigate={navigate} />}
        {page === 'contact' && <Contact onNavigate={navigate} />}
        {page === 'careers' && <Careers onNavigate={navigate} />}
        {page === 'privacy' && <Privacy onNavigate={navigate} />}
        {page === 'terms' && <Terms onNavigate={navigate} />}
        {isBlogPost && <BlogPost onNavigate={navigate} page={page} />}
      </div>
    </>
  )
}
