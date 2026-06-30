import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import Preloader from './components/Preloader'
import useImagePreloader from './hooks/useImagePreloader'
import Hero from './pages/Hero'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import BrandingAgencyKochi from './pages/BrandingAgencyKochi'
import Loading from './pages/Loading'
import Portfolio from './pages/Portfolio'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import Careers from './pages/Careers'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Navbar from './components/Navbar'

function buildImageList() {
  const contentImages = [
    '/logo.webp',
    '/logo2.webp',
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
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCOniR9dn00823gIKiZU16Q0nnBwUsDPUELbO5aIeEyctdxwameRzN8QZ2zpDLtwGQiSlrEiwHVXk8wMRDZjSRmP7-zGIepYPjCR4we8w50sOm-U3m8a4doLfsnArcwhkNjvW2DkEZEy8VfxecHxdLFZoAE0fAiTrVeQMtekyGfX3cea-zNAj3whasW2bHoJuHq16hF6UpTv13wowK7OFj8x5LMtFRLWXhXAdvmdysZ9ibX4V6ZYtZc7ClAmPk1VZn607DHG5rv9FE',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDH1js_D1xV_JQ0J1Gsd06MI9RXpcpt8-mq4X-e7cDxrLxvJpEMGdDeC2l_nF8-6bItg6-w2TluHUP3Qamv_tmeKqL0Ear5XRhmt5CgRxxdTc9Yfqy3CWacpCr-_k60faTFIl3X3Ts35Ndo27nEjv7wM5uo_srW0H7hDhphNk2WWHFPVo8YZYlXdqS3V46fMwFiyiJQWYzckGrkRebJIgTM0baeX6B_lReBGDa3FhhLvGal1PtMU1xiPstdy90_vrYAJYMkdQjrrVs',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBARijy0q_LMUPiIacaLLQLJ0eqBG7eoKKa6hc5lXM9JHAYcDlyUNkzPHgf6hI4ZJ3nHbnrGUlIUpRiN7sSqKCtln-u3ECCc7J5dTheYe-r9iqrfaz_6Gzdhtw2dupuZWtbSn7ZBB2Yx5tnGX7dLAo-8bWx_3mzh3oyLZpKRq-hfFJaN0shaETQlSCiBhCTlf58pX0azB3GNZ7B1CSHSKbA-ET1IQNKnluGdOTYNtFw13j5xH0f7eCxsPEkbQaDe89CVgGeLS9v7p0',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD3fCCfhwZ3psEGZR2aqmMRkS8EOsAGJznGo7n-kFkCxj_euLi2OwAxtvEenE79GJVR1jT3fQsKqmUaC3bT6SE7M_S5UlrRZxRc10yjbtyCi1kEIlhQXFAEvgxonAgLf2buh5hCP1qn_mA3vaSF1vxq9SMx8GwjvWXS2f9G_XMMGeodvs-z3YRhriOR9dZHhJz2dyMqLsQ-xSPJ2DxRfZn_bxVTwiC0S0Ns2KQu4R1rxgl-WS33TwDJpPKqJz9vLaAl2o4uJttefDc',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAObYBjG_foNuqvX-UZGY38k5WDUusmobS9d1ovc24nEXK9iYlirPPeAic7G0SxnkODNUydxqpMGsz9IwQ4bGipy-injtY8EMQic6XITp5WBjtxp1SwT_IZC6Y5p7k1x0ufH5nDys5fWWL2xl2TdbglphHXrjOkYUN52eQYcpgznA8R97b3pDmkNnYFf2nixnuVa4_eOR55Grnyoh4pNVYxAstmfRWizTVQjnagRhHyHVe74Ss6TL2Q1wh6DhbsPDoI631bvN1Iqfc',
  ]

  return contentImages
}

export default function App() {
  const [page, setPage] = useState('loading')
  const [siteVisible, setSiteVisible] = useState(false)
  const timelineReady = useRef(false)

  const imageList = useMemo(() => buildImageList(), [])
  const { progress, done } = useImagePreloader(imageList)

  const showSite = useCallback(() => {
    setSiteVisible(true)
  }, [])

  useEffect(() => {
    if (!done || timelineReady.current) return
    timelineReady.current = true

    async function prepareAndShow() {
      try {
        if (typeof window.gsap !== 'undefined') {
          window.gsap.registerPlugin(window.ScrollTrigger)
        }
        if (typeof window.ScrollTrigger !== 'undefined') {
          window.ScrollTrigger.refresh()
        }
      } catch {
        /* GSAP not installed — proceed without it */
      }

      await new Promise(resolve => requestAnimationFrame(resolve))
      if (page !== 'loading') showSite()
    }

    prepareAndShow()
  }, [done, showSite, page])

  const isBlogPost = page.startsWith('blogpost-')
  const showNav = page !== 'home' && page !== 'loading' && !isBlogPost

  function navigate(nextPage) {
    setPage(nextPage)
    if (nextPage !== 'loading') setSiteVisible(true)
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
      {page === 'loading' && <Loading onNavigate={navigate} />}

      {page !== 'loading' && <Preloader progress={progress} visible={!siteVisible} />}

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
        {page === 'branding' && <BrandingAgencyKochi onNavigate={navigate} />}
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
