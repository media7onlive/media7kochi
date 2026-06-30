import { useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LazyImage from '../components/LazyImage'
import { projects } from '../data/portfolio'
import { posts } from '../data/blog'

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

export default function Home({ onNavigate }) {
  const ref = useRef(null)
  useRevealOnScroll()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let revealed = false

    function reveal() {
      if (revealed) return
      revealed = true
      el.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease-out'
      el.style.transform = 'translateY(0)'
      el.style.opacity = '1'
      document.body.style.overflow = 'hidden'
      window.removeEventListener('scroll', handleScroll)
    }

    let ticking = false
    const handleScroll = () => {
      if (revealed) return
      if (!ticking) {
        ticking = true
        requestAnimationFrame(() => {
          ticking = false
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight
          const p = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0
          if (p >= 1) reveal()
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div
      ref={ref}
      className="h-dvh w-full bg-[#0B0B0B]"
      style={{ transform: 'translateY(100%)', opacity: 0, willChange: 'transform, opacity' }}
    >
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
        .luxury-card {
          transition: transform 0.4s ease-out, box-shadow 0.4s ease-out;
        }
        .luxury-card:hover {
          transform: translateY(-6px);
        }
      `}</style>
      <Navbar onNavigate={onNavigate} currentPage="home" />
      {/* Scrollable content */}
      <main className="h-dvh overflow-y-auto overscroll-behavior-contain pt-20">
        {/* Hero Section */}
        <section className="relative h-[921px] flex items-center justify-center overflow-hidden reveal revealed">
          <div className="absolute inset-0 z-0">
            <LazyImage
              className="opacity-40"
              alt="A cinematic, low-key photograph of a high-end, minimalist creative studio with sleek black surfaces and ambient golden backlighting."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOniR9dn00823gIKiZU16Q0nnBwUsDPUELbO5aIeEyctdxwameRzN8QZ2zpDLtwGQiSlrEiwHVXk8wMRDZjSRmP7-zGIepYPjCR4we8w50sOm-U3m8a4doLfsnArcwhkNjvW2DkEZEy8VfxecHxdLFZoAE0fAiTrVeQMtekyGfX3cea-zNAj3whasW2bHoJuHq16hF6UpTv13wowK7OFj8x5LMtFRLWXhXAdvmdysZ9ibX4V6ZYtZc7ClAmPk1VZn607DHG5rv9FE"
              fetchPriority="high"
            />
            <div className="absolute inset-0 gradient-overlay" />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <span className="font-label-sm text-gold tracking-[0.3em] uppercase block mb-6">Est. 2017 in UAE</span>
            <h1 className="font-display-xl mb-8 leading-tight">
              <span className="text-gold">Media7</span>{' '}
              <span className="text-on-background">a 360° creative agency based in Kerala, India.</span>
            </h1>
            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12">
              Media7 is a full-service media and marketing agency specializing in branding, digital marketing, media strategy, video production, advertising, and event management. We help businesses build strong brand identities, increase visibility, and achieve sustainable growth through creative and result-driven solutions.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <button onClick={() => onNavigate?.('contact')} className="bg-gold text-[#0B0B0B] px-10 py-5 font-bold uppercase text-sm tracking-widest transition-all hover:scale-105">
                Start Your Project
              </button>
              <a href="https://media7news.com/" target="_blank" rel="noopener noreferrer" className="border border-white/20 text-white px-10 py-5 font-bold uppercase text-sm tracking-widest transition-all hover:bg-white/5 inline-block">
                View Our News Portal
              </a>
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section className="py-section-gap max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl reveal">
              <span className="font-label-sm text-gold tracking-[0.2em] uppercase block mb-4">Our Expertise</span>
              <h2 className="font-headline-lg">Strategic solutions designed to help businesses build strong brands</h2>
            </div>
            <p className="font-body-md text-on-surface-variant max-w-xs border-l border-gold/30 pl-6 reveal reveal-delay-1">
              A comprehensive range of media and marketing services tailored to enhance your brand visibility, engagement, and market presence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="luxury-card p-10 flex flex-col h-full reveal">
              <span className="material-symbols-outlined text-gold mb-8 text-4xl">workspace_premium</span>
              <h3 className="font-headline-md mb-4">Branding</h3>
              <p className="font-body-md text-on-surface-variant mb-8 flex-grow">
                Developing memorable brand identities through strategic design, storytelling, and creative solutions that establish trust and recognition.
              </p>
              <button onClick={() => onNavigate?.('services')} className="text-gold font-label-sm flex items-center gap-2 group">
                EXPLORE SERVICE <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
            {/* Service 2 */}
            <div className="luxury-card p-10 flex flex-col h-full reveal reveal-delay-1">
              <span className="material-symbols-outlined text-gold mb-8 text-4xl">play_circle</span>
              <h3 className="font-headline-md mb-4">Media Production</h3>
              <p className="font-body-md text-on-surface-variant mb-8 flex-grow">
                Creating high-quality videos, creative content, and media campaigns that engage audiences and communicate your brand message effectively.
              </p>
              <button onClick={() => onNavigate?.('services')} className="text-gold font-label-sm flex items-center gap-2 group">
                EXPLORE SERVICE <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
            {/* Service 3 */}
            <div className="luxury-card p-10 flex flex-col h-full reveal reveal-delay-2">
              <span className="material-symbols-outlined text-gold mb-8 text-4xl">event_seat</span>
              <h3 className="font-headline-md mb-4">Event Management</h3>
              <p className="font-body-md text-on-surface-variant mb-8 flex-grow">
                Planning and executing corporate events, brand activations, product launches, and promotional campaigns with professional precision.
              </p>
              <button onClick={() => onNavigate?.('services')} className="text-gold font-label-sm flex items-center gap-2 group">
                EXPLORE SERVICE <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
              {/* Service 4 */}
            <div className="luxury-card p-10 flex flex-col h-full reveal reveal-delay-3">
              <span className="material-symbols-outlined text-gold mb-8 text-4xl">campaign</span>
              <h3 className="font-headline-md mb-4">Digital Marketing</h3>
              <p className="font-body-md text-on-surface-variant mb-8 flex-grow">
                Driving business growth through social media marketing, SEO, content marketing, and data-driven digital strategies.
              </p>
              <button onClick={() => onNavigate?.('services')} className="text-gold font-label-sm flex items-center gap-2 group">
                EXPLORE SERVICE <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
            {/* Service 5 */}
            <div className="luxury-card p-10 flex flex-col h-full reveal reveal-delay-4">
              <span className="material-symbols-outlined text-gold mb-8 text-4xl">ads_click</span>
              <h3 className="font-headline-md mb-4">Advertising</h3>
              <p className="font-body-md text-on-surface-variant mb-8 flex-grow">
                Delivering impactful advertising campaigns that maximize reach, engagement, and brand awareness across multiple platforms.
              </p>
              <button onClick={() => onNavigate?.('services')} className="text-gold font-label-sm flex items-center gap-2 group">
                EXPLORE SERVICE <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
              {/* Service 6 */}
            <div className="luxury-card p-10 flex flex-col h-full reveal reveal-delay-5">
              <span className="material-symbols-outlined text-gold mb-8 text-4xl">rocket_launch</span>
              <h3 className="font-headline-md mb-4">Business Promotions</h3>
              <p className="font-body-md text-on-surface-variant mb-8 flex-grow">
                 Helping businesses increase visibility and attract customers through innovative promotional activities and strategic marketing initiatives.
              </p>
              <button onClick={() => onNavigate?.('services')} className="text-gold font-label-sm flex items-center gap-2 group">
                EXPLORE SERVICE <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="bg-[#110e06] py-section-gap overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-20">
            <div className="relative reveal reveal-delay-1">
              <div className="aspect-[4/5] relative z-10">
                <LazyImage
                  alt="Media7 Studio"
                  src="/home_section_1.webp"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-gold flex items-center justify-center p-8 z-20">
                <span className="text-[#0B0B0B] font-display-xl leading-none">11</span>
                <span className="text-[#0B0B0B] font-bold text-xs uppercase tracking-tighter -rotate-90">Years of Excellence</span>
              </div>
            </div>
            <div className="reveal reveal-delay-2">
              <span className="font-label-sm text-gold tracking-[0.2em] uppercase block mb-4">The Media7 Story</span>
              <h2 className="font-headline-lg mb-8">Empowering brands through creativity, strategy, and innovation.</h2>
              <div className="space-y-6 text-on-surface-variant font-body-md">
                <p>Media7 Kochi was founded with a vision to help businesses build meaningful connections with their audiences through impactful media and marketing solutions. By combining creativity, technology, and strategic thinking, we create powerful brand experiences that drive engagement and business growth.</p>
                <p>Our approach is centered on understanding each client's unique goals and delivering customized solutions that generate measurable results. From branding and digital marketing to video production, advertising, and event management, we partner with businesses to strengthen their presence and achieve lasting success.</p>
              </div>
              <button onClick={() => onNavigate?.('services')} className="mt-12 border-b-2 border-gold pb-2 text-gold font-bold uppercase tracking-widest hover:text-white hover:border-white transition-all">
                Discover Our Services
              </button>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-section-gap max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <span className="font-label-sm text-gold tracking-[0.2em] uppercase block mb-4">Portfolio</span>
            <h2 className="font-headline-lg">Showcasing creativity, innovation, and impactful brand experiences.</h2>
          </div>
          <div className="grid grid-cols-12 gap-6 auto-rows-[300px]">
            {projects.slice(0, 4).map((project, i) => {
              const isLarge = i === 0 || i === 3
              return (
                <div key={project.id} className={`col-span-12 ${isLarge ? 'md:col-span-8' : 'md:col-span-4'} relative group overflow-hidden reveal reveal-delay-${i + 1}`}>
                  <LazyImage
                    className="transition-transform duration-700 group-hover:scale-110"
                    alt={project.alt}
                    src={project.img}
                    wrapperClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-10">
                    <div>
                      <span className="font-label-sm text-gold uppercase mb-2 block">{project.category}</span>
                      <h3 className="font-headline-md text-white">{project.title}</h3>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-section-gap bg-[#1A1A1A] overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center reveal">
              <span className="material-symbols-outlined text-gold text-4xl md:text-6xl mb-6 md:mb-8">MEDIA 7</span>
              <p className="font-headline-md text-headline-sm md:text-headline-md italic mb-8 md:mb-10 text-on-surface">
                &quot;At Media7, we believe every brand has a story worth telling. Our mission is to create impactful content, innovative marketing strategies, and memorable brand experiences that help businesses connect with their audiences and achieve meaningful growth. We combine creativity, technology, and strategic thinking to deliver results that make a lasting impact.&quot;
              </p>
              <div className="flex flex-col items-center gap-4">
                <div className="w-28 h-28 md:w-64 md:h-64 bg-zinc-800 rounded-full overflow-hidden">
                  <LazyImage
                    alt="CEO of Media7"
                    src="/CEO_of_Media7.webp"
                    wrapperClassName="w-full h-full"
                  />
                </div>
                <div className="text-center">
                  <p className="font-bold text-on-surface">Shanty Thomas</p>
                  <p className="text-gold text-xs uppercase tracking-widest font-label-sm">CEO, Media7 Kochi</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Thinking / Blog */}
        <section className="py-section-gap max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-16 reveal">
            <h2 className="font-headline-lg">Latest Thinking.</h2>
            <button onClick={() => onNavigate?.('blog')} className="text-gold font-bold uppercase tracking-widest text-xs hover:text-white transition-colors">Read all Articles</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.slice(0, 3).map((post, i) => (
              <div key={post.id} onClick={() => onNavigate?.(`blogpost-${post.id}`)} className={`group cursor-pointer reveal reveal-delay-${i + 1}`}>
                <div className="aspect-[16/9] overflow-hidden mb-6">
                  <LazyImage
                    className="transition-transform duration-500 group-hover:scale-105"
                    alt={post.alt}
                    src={post.img}
                    wrapperClassName="w-full h-full"
                  />
                </div>
                <span className="font-label-sm text-gold uppercase tracking-widest mb-3 block">{post.category}</span>
                <h3 className="font-headline-md text-on-surface group-hover:text-gold transition-colors mb-4">{post.title}</h3>
                <p className="font-body-md text-on-surface-variant line-clamp-2">{post.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-section-gap relative overflow-hidden bg-gold reveal">
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <h2 className="font-display-xl text-[#0B0B0B] mb-8">Ready to elevate your <span className="italic underline decoration-2">presence</span>?</h2>
            <p className="font-body-lg text-[#0B0B0B]/80 max-w-2xl mx-auto mb-12">
              Partner with an agency that understands the gravity of your ambition. Let&apos;s discuss your next milestone.
            </p>
            <button onClick={() => onNavigate?.('contact')} className="bg-[#0B0B0B] text-white px-12 py-6 font-bold uppercase text-sm tracking-widest transition-all hover:scale-105 active:scale-95">
              Schedule a Consultation
            </button>
          </div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 border-[40px] border-[#0B0B0B]/10 rounded-full" />
        </section>

        <Footer onNavigate={onNavigate} currentPage="home" />
      </main>
    </div>
  )
}
