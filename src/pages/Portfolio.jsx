import { useEffect } from 'react'
import Footer from '../components/Footer'
import LazyImage from '../components/LazyImage'
import { projects } from '../data/portfolio'

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

const Portfolio = ({ onNavigate }) => {
  useRevealOnScroll()
  return (
    <div className="bg-[#0B0B0B] text-on-surface font-body-md h-screen overflow-y-auto">
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
      {/* Nav Spacer */}
      <div className="h-20" />

      <main className="pb-section-gap">
        {/* Hero Title */}
        <section className="reveal revealed max-w-7xl mx-auto px-6 mb-stack-lg">
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-stack-sm">The Creative Showcase</h1>
          <p className="text-on-surface-variant max-w-2xl font-body-lg text-body-lg">A collection of our finest work in branding, advertising, media production, digital marketing, and event management. Every project reflects our passion for creativity, strategic thinking, and delivering meaningful results for our clients.</p>
        </section>

        {/* Portfolio Grid */}
        <section className="reveal max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {projects.map((project, i) => (
              <div key={project.id} className={`reveal reveal-delay-${(i % 6) + 1} ${project.gridClass} group relative overflow-hidden bg-[#1A1A1A] border border-white/5 ${project.aspect} project-card`}>
                <LazyImage className="transition-transform duration-700 group-hover:scale-105" alt={project.alt} src={project.img} wrapperClassName="w-full h-full" />
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-stack-lg backdrop-blur-[2px]">
                  <span className="text-[#F5C542] font-label-sm text-label-sm mb-2">{project.category}</span>
                  <h3 className="font-headline-md text-headline-md text-[#F5C542]">{project.title}</h3>
                  {project.description && (
                    <p className="text-white/70 font-body-md mt-4 max-w-lg">{project.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="reveal max-w-7xl mx-auto px-6 mt-section-gap">
          <div className="bg-[#1A1A1A] border border-white/5 p-12 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6">Ready to curate your next chapter?</h2>
              <p className="text-on-surface-variant font-body-lg text-body-lg mb-8 max-w-xl mx-auto">Join a roster of elite brands who trust Media7 with their creative and strategic narrative.</p>
              <button onClick={() => onNavigate('contact')} className="bg-[#F5C542] text-[#0B0B0B] px-12 py-4 text-lg font-bold transition-transform active:scale-95">
                Start Your Project
              </button>
            </div>
          </div>
        </section>
      </main>

        <Footer onNavigate={onNavigate} currentPage="portfolio" />
    </div>
  )
}

export default Portfolio
