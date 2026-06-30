import { useEffect } from 'react'
import Footer from '../components/Footer'
import LazyImage from '../components/LazyImage'

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

export default function BrandingAgencyKochi({ onNavigate }) {
  useRevealOnScroll()

  const faqs = [
    {
      q: 'What makes Media7 COK the best branding agency in Kochi?',
      a: 'Media7 COK combines strategic thinking with world-class creative execution. We are a full-service agency offering branding, digital marketing, video production, and advertising under one roof. Our team has 7+ years of experience serving clients across Kerala, India, and the GCC, and we tailor every brand identity to your unique business goals.'
    },
    {
      q: 'What branding services do you offer in Kochi?',
      a: 'We offer comprehensive branding services including brand strategy, logo design, visual identity development, brand messaging, brand guidelines, marketing collateral design, and complete rebranding. Each service is tailored to position your business for long-term success.'
    },
    {
      q: 'How much does branding cost for a business in Kochi?',
      a: 'Every branding project is unique. Our pricing depends on the scope, complexity, and deliverables. We offer customized solutions for startups, SMEs, and enterprises. Contact us for a free consultation and a detailed proposal tailored to your budget.'
    },
    {
      q: 'How long does a full branding project take?',
      a: 'A typical branding project takes 4–8 weeks from discovery to final delivery. This includes research, strategy development, concept creation, design refinement, and final asset delivery. Timelines are confirmed during the initial consultation.'
    },
    {
      q: 'Do you work with startups and small businesses in Ernakulam?',
      a: 'Absolutely. We work with businesses of all sizes — from early-stage startups to established enterprises. Our scalable branding solutions are designed to grow with your business, and we offer flexible packages that deliver professional results without compromising on quality.'
    },
    {
      q: 'Can you help with rebranding an existing business?',
      a: 'Yes. Rebranding is one of our specialties. Whether you need a complete brand overhaul or a strategic refresh, we assess your current brand equity, identify gaps, and develop a transition strategy that preserves what works while elevating your brand to the next level.'
    },
    {
      q: 'What industries does Media7 COK serve in Kerala?',
      a: 'We work across a wide range of industries including real estate, hospitality, healthcare, finance, beauty and wellness, education, retail, technology, tourism, and event management. Our diverse experience allows us to bring fresh, cross-industry insights to every project.'
    },
    {
      q: 'Do you offer digital marketing along with branding?',
      a: 'Yes. As a 360-degree creative agency, we provide seamless integration between branding and digital marketing. We can take your new brand identity and amplify it through SEO, social media marketing, paid advertising, and content marketing — ensuring consistency across every channel.'
    },
    {
      q: 'Why should I choose a branding agency in Kochi over freelancers?',
      a: 'An agency brings a multidisciplinary team — strategists, designers, copywriters, and marketers — who collaborate to deliver a cohesive brand experience. Freelancers often specialize in one area. With Media7 COK, you get a complete brand ecosystem built by a team with proven processes, quality control, and years of cross-industry expertise.'
    },
  ]

  return (
    <div className="h-screen overflow-y-auto bg-[#0B0B0B] text-on-background selection:bg-primary-container selection:text-on-primary-container font-body-md antialiased">
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

      <main className="mt-[80px]">
        {/* Hero Section */}
        <section className="reveal revealed relative h-[614px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/40 via-[#0B0B0B]/80 to-[#0B0B0B] z-10" />
            <LazyImage
              className="grayscale opacity-40"
              alt="Modern branding agency studio in Kochi with professional design workspace and creative team environment."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOniR9dn00823gIKiZU16Q0nnBwUsDPUELbO5aIeEyctdxwameRzN8QZ2zpDLtwGQiSlrEiwHVXk8wMRDZjSRmP7-zGIepYPjCR4we8w50sOm-U3m8a4doLfsnArcwhkNjvW2DkEZEy8VfxecHxdLFZoAE0fAiTrVeQMtekyGfX3cea-zNAj3whasW2bHoJuHq16hF6UpTv13wowK7OFj8x5LMtFRLWXhXAdvmdysZ9ibX4V6ZYtZc7ClAmPk1VZn607DHG5rv9FE"
              fetchPriority="high"
            />
          </div>
          <div className="relative z-20 text-center max-w-5xl px-6">
            <span className="font-label-sm text-primary-container tracking-[0.3em] uppercase mb-4 block">Media7 COK</span>
            <h1 className="font-display-xl text-on-background mb-6">Branding Agency in Kochi</h1>
            <p className="font-body-lg text-on-surface-variant max-w-3xl mx-auto">
              We build brands that command attention, build trust, and drive growth. Media7 COK is a full-service branding agency in Kochi, Kerala — delivering brand strategy, identity design, and creative excellence to businesses across India and the GCC.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
              <button onClick={() => onNavigate('contact')} className="bg-[#F5C542] text-black px-10 py-4 font-bold text-lg hover:brightness-110 active:scale-95 transition-all">Start Your Brand</button>
              <button onClick={() => onNavigate('portfolio')} className="border border-white/20 px-10 py-4 font-bold text-lg text-on-background hover:bg-white/5 transition-all">View Our Work</button>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="reveal py-section-gap max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-label-sm text-primary-container tracking-[0.3em] uppercase mb-4 block">Who We Are</span>
            <h2 className="font-headline-lg text-on-background mb-8">Your Brand Deserves More Than a Logo</h2>
            <p className="font-body-lg text-on-surface-variant mb-6 leading-relaxed">
              Your brand is the most valuable asset your business owns. It is how customers perceive you, remember you, and choose you over the competition. At Media7 COK, we don't just design logos — we build complete brand ecosystems that communicate your purpose, connect with your audience, and position your business for long-term growth.
            </p>
            <p className="font-body-lg text-on-surface-variant leading-relaxed">
              As a leading <strong>branding agency in Kochi</strong>, we combine strategic insight with world-class creative execution. Whether you are launching a startup, scaling an existing business, or rebranding for a new chapter, our team of strategists, designers, and marketers work together to create a brand identity that is authentic, memorable, and effective.
            </p>
          </div>
        </section>

        {/* Why Branding Matters */}
        <section className="reveal py-section-gap bg-[#111111] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="font-label-sm text-primary-container tracking-[0.3em] uppercase mb-4 block">Why Branding</span>
              <h2 className="font-headline-lg text-on-background mb-4">Why Branding Matters for Your Business</h2>
              <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">In a crowded marketplace, branding is the difference between being noticed and being overlooked.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="reveal reveal-delay-1 bg-[#1A1A1A] p-10 border border-white/5 group hover:border-primary-container/30 transition-all">
                <div className="w-14 h-14 bg-primary-container/10 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary-container text-3xl">visibility</span>
                </div>
                <h3 className="font-headline-md text-xl text-on-background mb-4">First Impressions Matter</h3>
                <p className="font-body-md text-on-surface-variant">Customers form an opinion about your business within seconds. A professional brand identity builds instant credibility and trust — qualities that directly influence purchasing decisions.</p>
              </div>
              <div className="reveal reveal-delay-2 bg-[#1A1A1A] p-10 border border-white/5 group hover:border-primary-container/30 transition-all">
                <div className="w-14 h-14 bg-primary-container/10 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary-container text-3xl">sell</span>
                </div>
                <h3 className="font-headline-md text-xl text-on-background mb-4">Differentiation & Recognition</h3>
                <p className="font-body-md text-on-surface-variant">A strong brand sets you apart from competitors. When your visual identity, messaging, and customer experience are consistent, your business becomes instantly recognizable and memorable.</p>
              </div>
              <div className="reveal reveal-delay-3 bg-[#1A1A1A] p-10 border border-white/5 group hover:border-primary-container/30 transition-all">
                <div className="w-14 h-14 bg-primary-container/10 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary-container text-3xl">trending_up</span>
                </div>
                <h3 className="font-headline-md text-xl text-on-background mb-4">Long-Term Business Value</h3>
                <p className="font-body-md text-on-surface-variant">Branding is an investment that compounds over time. A well-built brand commands premium pricing, attracts better talent, fosters customer loyalty, and increases enterprise valuation.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Branding Process */}
        <section className="reveal py-section-gap max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-label-sm text-primary-container tracking-[0.3em] uppercase mb-4 block">Our Process</span>
            <h2 className="font-headline-lg text-on-background mb-4">How We Build Brands</h2>
            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">A proven, four-phase process that takes your brand from concept to market with precision and purpose.</p>
          </div>
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2 hidden lg:block" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="reveal reveal-delay-1 bg-[#1A1A1A] p-8 border border-white/5 group hover:border-primary-container/30 transition-all">
                <div className="w-16 h-16 bg-primary-container flex items-center justify-center mb-6 shadow-lg shadow-primary-container/20">
                  <span className="material-symbols-outlined text-black text-3xl">search</span>
                </div>
                <span className="font-label-sm text-primary-container mb-2 block">Phase 01</span>
                <h3 className="font-headline-md text-xl text-on-background mb-3">Discovery & Research</h3>
                <p className="font-body-md text-on-surface-variant">We dive deep into your industry, competitors, target audience, and business objectives to uncover insights that inform every creative decision.</p>
              </div>
              <div className="reveal reveal-delay-2 bg-[#1A1A1A] p-8 border border-white/5 group hover:border-primary-container/30 transition-all">
                <div className="w-16 h-16 bg-primary-container flex items-center justify-center mb-6 shadow-lg shadow-primary-container/20">
                  <span className="material-symbols-outlined text-black text-3xl">strategy</span>
                </div>
                <span className="font-label-sm text-primary-container mb-2 block">Phase 02</span>
                <h3 className="font-headline-md text-xl text-on-background mb-3">Strategy & Positioning</h3>
                <p className="font-body-md text-on-surface-variant">We define your brand's positioning, personality, messaging framework, and visual direction — creating a strategic foundation that guides all creative work.</p>
              </div>
              <div className="reveal reveal-delay-3 bg-[#1A1A1A] p-8 border border-white/5 group hover:border-primary-container/30 transition-all">
                <div className="w-16 h-16 bg-primary-container flex items-center justify-center mb-6 shadow-lg shadow-primary-container/20">
                  <span className="material-symbols-outlined text-black text-3xl">palette</span>
                </div>
                <span className="font-label-sm text-primary-container mb-2 block">Phase 03</span>
                <h3 className="font-headline-md text-xl text-on-background mb-3">Design & Development</h3>
                <p className="font-body-md text-on-surface-variant">Our designers bring the strategy to life — crafting logos, color systems, typography, brand collateral, and digital assets that are cohesive and impactful.</p>
              </div>
              <div className="reveal reveal-delay-4 bg-[#1A1A1A] p-8 border border-white/5 group hover:border-primary-container/30 transition-all">
                <div className="w-16 h-16 bg-primary-container flex items-center justify-center mb-6 shadow-lg shadow-primary-container/20">
                  <span className="material-symbols-outlined text-black text-3xl">rocket_launch</span>
                </div>
                <span className="font-label-sm text-primary-container mb-2 block">Phase 04</span>
                <h3 className="font-headline-md text-xl text-on-background mb-3">Launch & Implement</h3>
                <p className="font-body-md text-on-surface-variant">We deliver a complete brand toolkit, guidelines, and assets — then support you through launch, ensuring consistency across every touchpoint and channel.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Branding Services */}
        <section className="reveal py-section-gap bg-[#111111] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="font-label-sm text-primary-container tracking-[0.3em] uppercase mb-4 block">Our Services</span>
              <h2 className="font-headline-lg text-on-background mb-4">Comprehensive Branding Services</h2>
              <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">From strategy to execution, we offer every service you need to build a brand that stands out.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="reveal reveal-delay-1 bg-[#1A1A1A] p-8 border border-white/5 group hover:border-primary-container/30 transition-all">
                <div className="w-12 h-12 bg-primary-container/10 flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-primary-container text-2xl">brand_awareness</span>
                </div>
                <h3 className="font-headline-md text-lg text-on-background mb-3">Brand Strategy</h3>
                <p className="font-body-md text-on-surface-variant">Market research, competitor analysis, audience profiling, and brand positioning that defines your unique space in the market.</p>
              </div>
              <div className="reveal reveal-delay-2 bg-[#1A1A1A] p-8 border border-white/5 group hover:border-primary-container/30 transition-all">
                <div className="w-12 h-12 bg-primary-container/10 flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-primary-container text-2xl">draw</span>
                </div>
                <h3 className="font-headline-md text-lg text-on-background mb-3">Logo Design</h3>
                <p className="font-body-md text-on-surface-variant">Custom logo design that captures your brand essence. Each concept is researched, sketched, refined, and delivered with full usage guidelines.</p>
              </div>
              <div className="reveal reveal-delay-3 bg-[#1A1A1A] p-8 border border-white/5 group hover:border-primary-container/30 transition-all">
                <div className="w-12 h-12 bg-primary-container/10 flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-primary-container text-2xl">palette</span>
                </div>
                <h3 className="font-headline-md text-lg text-on-background mb-3">Brand Identity Design</h3>
                <p className="font-body-md text-on-surface-variant">Complete visual identity including color palette, typography, iconography, patterns, and visual language that works across all media.</p>
              </div>
              <div className="reveal reveal-delay-4 bg-[#1A1A1A] p-8 border border-white/5 group hover:border-primary-container/30 transition-all">
                <div className="w-12 h-12 bg-primary-container/10 flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-primary-container text-2xl">description</span>
                </div>
                <h3 className="font-headline-md text-lg text-on-background mb-3">Brand Guidelines</h3>
                <p className="font-body-md text-on-surface-variant">Comprehensive brand manuals that ensure your identity is applied consistently across every touchpoint — from business cards to billboards.</p>
              </div>
              <div className="reveal reveal-delay-5 bg-[#1A1A1A] p-8 border border-white/5 group hover:border-primary-container/30 transition-all">
                <div className="w-12 h-12 bg-primary-container/10 flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-primary-container text-2xl">campaign</span>
                </div>
                <h3 className="font-headline-md text-lg text-on-background mb-3">Marketing Collateral</h3>
                <p className="font-body-md text-on-surface-variant">Business cards, brochures, presentations, social media templates, packaging, and all printed or digital assets your brand needs.</p>
              </div>
              <div className="reveal reveal-delay-6 bg-[#1A1A1A] p-8 border border-white/5 group hover:border-primary-container/30 transition-all">
                <div className="w-12 h-12 bg-primary-container/10 flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-primary-container text-2xl">refresh</span>
                </div>
                <h3 className="font-headline-md text-lg text-on-background mb-3">Rebranding & Refresh</h3>
                <p className="font-body-md text-on-surface-variant">Strategic rebranding services for businesses that need to evolve, modernize, or reposition. We preserve brand equity while taking you forward.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Media7 COK */}
        <section className="reveal py-section-gap max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="font-label-sm text-primary-container tracking-[0.3em] uppercase mb-4 block">Why Media7 COK</span>
              <h2 className="font-headline-lg text-on-background mb-8">Why Choose the Best Branding Agency in Kochi</h2>
              <div className="space-y-6">
                <div className="reveal reveal-delay-1 flex gap-5">
                  <div className="w-12 h-12 flex-shrink-0 bg-primary-container/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary-container">verified</span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-lg text-on-background mb-1">7+ Years of Experience</h3>
                    <p className="font-body-md text-on-surface-variant">A decade of branding expertise across India and the GCC, delivering results for startups, SMEs, and enterprise clients.</p>
                  </div>
                </div>
                <div className="reveal reveal-delay-2 flex gap-5">
                  <div className="w-12 h-12 flex-shrink-0 bg-primary-container/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary-container">hub</span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-lg text-on-background mb-1">360-Degree Creative Agency</h3>
                    <p className="font-body-md text-on-surface-variant">Branding, digital marketing, video production, web development, and advertising — all under one roof. Seamless integration, consistent results.</p>
                  </div>
                </div>
                <div className="reveal reveal-delay-3 flex gap-5">
                  <div className="w-12 h-12 flex-shrink-0 bg-primary-container/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary-container">groups</span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-lg text-on-background mb-1">Multi-Industry Expertise</h3>
                    <p className="font-body-md text-on-surface-variant">We have built brands for real estate, hospitality, beauty, finance, education, healthcare, and technology — bringing fresh insight to every project.</p>
                  </div>
                </div>
                <div className="reveal reveal-delay-4 flex gap-5">
                  <div className="w-12 h-12 flex-shrink-0 bg-primary-container/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary-container">emoji_objects</span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-lg text-on-background mb-1">Strategy-Led Creativity</h3>
                    <p className="font-body-md text-on-surface-variant">Every design decision is backed by research and strategy. We don't make things look good — we make them work.</p>
                  </div>
                </div>
                <div className="reveal reveal-delay-5 flex gap-5">
                  <div className="w-12 h-12 flex-shrink-0 bg-primary-container/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary-container">location_on</span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-lg text-on-background mb-1">Proudly Based in Kochi, Kerala</h3>
                    <p className="font-body-md text-on-surface-variant">We are a local branding agency with a global mindset. Our studio in Edappally, Ernakulam serves clients in Kochi, across Kerala, and internationally.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="reveal reveal-delay-1">
              <div className="aspect-[4/5] bg-[#1A1A1A] relative overflow-hidden rounded-lg group shadow-2xl">
                <LazyImage
                  className="transition-transform duration-700 group-hover:scale-110"
                  alt="Media7 COK creative team working on brand identity design projects at their Kochi studio."
                  src="/service1.webp"
                  wrapperClassName="w-full h-full"
                />
                <div className="absolute inset-0 border border-white/5 pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* Industries We Serve */}
        <section className="reveal py-section-gap bg-[#111111] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="font-label-sm text-primary-container tracking-[0.3em] uppercase mb-4 block">Industries</span>
              <h2 className="font-headline-lg text-on-background mb-4">Industries We Serve</h2>
              <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">We bring deep cross-industry expertise to every branding engagement.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: 'apartment', label: 'Real Estate & Property' },
                { icon: 'hotel', label: 'Hospitality & Tourism' },
                { icon: 'monetization_on', label: 'Finance & Consulting' },
                { icon: 'spa', label: 'Beauty & Wellness' },
                { icon: 'school', label: 'Education & Training' },
                { icon: 'store', label: 'Retail & E-Commerce' },
                { icon: 'computer', label: 'Technology & SaaS' },
                { icon: 'diversity_3', label: 'Events & Entertainment' },
              ].map((item, i) => (
                <div key={item.label} className={`reveal reveal-delay-${(i % 4) + 1} bg-[#1A1A1A] p-8 border border-white/5 text-center group hover:border-primary-container/30 transition-all`}>
                  <span className="material-symbols-outlined text-primary-container text-4xl mb-4 block">{item.icon}</span>
                  <h3 className="font-headline-md text-base text-on-background">{item.label}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="reveal py-section-gap max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-label-sm text-primary-container tracking-[0.3em] uppercase mb-4 block">FAQ</span>
            <h2 className="font-headline-lg text-on-background mb-4">Frequently Asked Questions</h2>
            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">Everything you need to know about branding your business with Media7 COK.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="reveal bg-[#1A1A1A] border border-white/5 group open:border-primary-container/30 transition-all">
                <summary className="font-headline-md text-base text-on-background px-8 py-6 cursor-pointer list-none flex justify-between items-center group-open:text-primary-container transition-colors">
                  {faq.q}
                  <span className="material-symbols-outlined text-primary-container transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <div className="px-8 pb-6">
                  <p className="font-body-md text-on-surface-variant leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Strong CTA */}
        <section className="reveal py-section-gap text-center px-6">
          <div className="max-w-4xl mx-auto border border-white/5 bg-[#1A1A1A] p-16 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/5 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-container/5 rounded-full -ml-24 -mb-24 blur-3xl" />
            <h2 className="font-headline-lg text-on-background mb-6 relative z-10">Ready to Build a Brand That Stands Out?</h2>
            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10 relative z-10">
              Let us help you create a brand identity that captures who you are and where you are going. Whether you are starting from scratch or ready for a rebrand, our team is here to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <button onClick={() => onNavigate('contact')} className="bg-[#F5C542] text-black px-10 py-4 font-bold text-lg hover:brightness-110 active:scale-95 transition-all">Schedule a Consultation</button>
              <button onClick={() => onNavigate('services')} className="border border-white/20 px-10 py-4 font-bold text-lg text-on-background hover:bg-white/5 transition-all">Explore All Services</button>
            </div>
          </div>
        </section>
      </main>

      <Footer onNavigate={onNavigate} currentPage="branding" />
    </div>
  )
}
