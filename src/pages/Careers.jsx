import { useEffect } from 'react'
import Footer from '../components/Footer'
import LazyImage from '../components/LazyImage'
import { jobs } from '../data/jobs'

function useRevealOnScroll() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!els.length) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

export default function Careers({ onNavigate }) {
  useRevealOnScroll()
  return (
    <div className="h-screen overflow-y-auto bg-[#0B0B0B] text-on-surface selection:bg-primary-container selection:text-on-primary-container">
      <style>{`
  .reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.7s ease-out, transform 0.7s ease-out;
  }
  .reveal.revealed {
    opacity: 1;
    transform: translateY(0);
  }
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }
  .reveal-delay-4 { transition-delay: 0.4s; }
  .reveal-delay-5 { transition-delay: 0.5s; }
  .reveal-delay-6 { transition-delay: 0.6s; }
`}</style>
      <main>
        {/* Hero Section */}
        <section className="reveal revealed relative h-[819px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <LazyImage
              alt="A wide-angle shot of a high-end, contemporary corporate office environment at twilight. The space features minimalist architectural lines, floor-to-ceiling glass windows reflecting city lights, and warm ambient spotlighting. Polished concrete floors and dark charcoal walls create a sophisticated, luxury agency atmosphere. The mood is professional, exclusive, and serene, utilizing a palette of deep blacks, grays, and subtle gold reflections."
              className="opacity-40"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3fCCfhwZ3psEGZR2aqmMRkS8EOsAGJznGo7n-kFkCxj_euLi2OwAxtvEenE79GJVR1jT3fQsKqmUaC3bT6SE7M_S5UlrRZxRc10yjbtyCi1kEIlhQXFAEvgxonAgLf2buh5hCP1qn_mA3vaSF1vxq9SMx8GwjvWXS2f9G_XMMGeodvs-z3YRhriOR9dZHhJz2dyMqLsQ-xSPJ2DxRfZn_bxVTwiC0S0Ns2KQu4R1rxgl-WS33TwDJpPKqJz9vLaAl2o4uJttefDc"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/0 via-[#0B0B0B]/60 to-[#0B0B0B]" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            <span className="font-label-sm text-primary-container mb-4 block">JOIN OUR TEAM</span>
            <h1 className="font-display-xl text-on-surface mb-6">Create. Innovate. Inspire.</h1>
            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">At Media7, we're always looking for passionate creatives, innovative marketers, talented storytellers, and ambitious professionals who are ready to make an impact. Join our team and collaborate on exciting projects in branding, media production, digital marketing, advertising, and events.</p>
          </div>
        </section>

        {/* Careers Grid Section */}
        <section className="reveal max-w-7xl mx-auto px-6 py-section-gap">
          <div className="flex flex-col gap-stack-lg">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="font-headline-lg text-on-surface">Open Positions</h2>
                <p className="text-on-surface-variant font-body-md mt-2">browse all roles below.</p>
              </div>
            </div>

            {/* Job Listing Cards */}
            <div className="space-y-6">
              {jobs.map((job, i) => (
                <div key={job.id} className={`reveal reveal-delay-${(i % 6) + 1} group bg-[#1A1A1A] p-8 border border-white/5 hover:shadow-2xl hover:shadow-black/40 transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-6 hover:scale-[1.01]`}>
                  <div className="flex-1">
                    <span className="font-label-sm text-primary-container">{job.department}</span>
                    <h3 className="font-headline-md text-on-surface mt-2">{job.title}</h3>
                    <div className="flex gap-6 mt-4 text-on-surface-variant font-body-md">
                      <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">location_on</span> {job.location}</span>
                      <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">schedule</span> {job.type}</span>
                    </div>
                  </div>
                  <button onClick={() => window.open(`https://wa.me/919995533809?text=${encodeURIComponent(`Full name : \nJob title: ${job.title}\nFull time or Internship : `)}`, '_blank')} className="bg-primary-container text-on-primary-fixed px-10 py-4 font-bold active:scale-95 transition-transform">Apply Now</button>
                </div>
              ))}
            </div>
          </div>
        </section>

      
        <section className="reveal bg-surface-container-low py-section-gap">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-headline-lg text-on-surface">The Media7 Experience</h2>
              <p className="text-on-surface-variant font-body-lg max-w-2xl mx-auto mt-4">Where Creativity Meets Innovation. <br/> At Media7, we foster a culture of collaboration, creativity, and continuous growth. Our team thrives in an environment that encourages bold ideas, strategic thinking, and a passion for delivering exceptional results.</p>
            </div>
            <div className="grid grid-cols-12 gap-6 h-[700px]">
              <div className="reveal reveal-delay-1 col-span-8 relative group overflow-hidden">
                <LazyImage
                  alt="Office"
                  className="transition-all duration-700"
                  src="/office.webp"
                  wrapperClassName="w-full h-full"
                />
                <div className="absolute bottom-0 left-0 p-8 bg-gradient-to-t from-black/80 to-transparent w-full">
                  <p className="font-headline-md text-white">Collaborative Excellence</p>
                </div>
              </div>
              <div className="col-span-4 flex flex-col gap-6">
                <div className="reveal reveal-delay-2 flex-1 relative group overflow-hidden">
                  <LazyImage
                    alt="Office Space"
                    className="grayscale hover:grayscale-0 transition-all duration-700"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAObYBjG_foNuqvX-UZGY38k5WDUusmobS9d1ovc24nEXK9iYlirPPeAic7G0SxnkODNUydxqpMGsz9IwQ4bGipy-injtY8EMQic6XITp5WBjtxp1SwT_IZC6Y5p7k1x0ufH5nDys5fWWL2xl2TdbglphHXrjOkYUN52eQYcpgznA8R97b3pDmkNnYFf2nixnuVa4_eOR55Grnyoh4pNVYxAstmfRWizTVQjnagRhHyHVe74Ss6TL2Q1wh6DhbsPDoI631bvN1Iqfc"
                    wrapperClassName="w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/80 to-transparent w-full">
                    <p className="font-body-lg font-bold text-white">Inspiring Spaces</p>
                  </div>
                </div>
                <div className="reveal reveal-delay-3 flex-1 bg-primary-container p-8 flex flex-col justify-end">
                  <span className="material-symbols-outlined text-4xl mb-4 text-on-primary-fixed">star</span>
                  <p className="font-headline-md text-on-primary-fixed leading-tight">Voted #1 Media Workplace 2024</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="reveal max-w-7xl mx-auto px-6 py-section-gap">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-on-surface mb-4">Get in Touch</h2>
            <p className="text-on-surface-variant font-body-lg max-w-2xl mx-auto">Have questions or ready to start a conversation? Reach out to us directly.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <a
              href="mailto:talent@media7.agency"
              className="reveal reveal-delay-1 group bg-[#1A1A1A] border border-white/5 p-10 flex flex-col items-center text-center gap-6 hover:shadow-2xl hover:shadow-black/40 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-surface-container group-hover:bg-primary-container/20 transition-colors">
                <span className="material-symbols-outlined text-4xl text-primary-container">mail</span>
              </div>
              <div>
                <h3 className="font-headline-md text-on-surface mb-2">Gmail</h3>
                <p className="text-on-surface-variant font-body-md">media7onlive@gmail.com</p>
              </div>
              <span className="font-label-sm text-primary-container uppercase tracking-widest">Send an Email</span>
            </a>
            <a
              href="https://wa.me/+919995533809"
              target="_blank"
              rel="noopener noreferrer"
              className="reveal reveal-delay-2 group bg-[#1A1A1A] border border-white/5 p-10 flex flex-col items-center text-center gap-6 hover:shadow-2xl hover:shadow-black/40 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-surface-container group-hover:bg-[#25D366]/20 transition-colors">
                <span className="material-symbols-outlined text-4xl text-[#25D366]">chat</span>
              </div>
              <div>
                <h3 className="font-headline-md text-on-surface mb-2">WhatsApp</h3>
                <p className="text-on-surface-variant font-body-md">+91 99955 33988</p>
              </div>
              <span className="font-label-sm text-[#25D366] uppercase tracking-widest">Start a Chat</span>
            </a>
          </div>
        </section>

      </main>

      <Footer onNavigate={onNavigate} currentPage="careers" />
    </div>
  )
}
