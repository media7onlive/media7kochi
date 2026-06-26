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

export default function Services({ onNavigate }) {
  useRevealOnScroll()
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
        {/* Hero Header */}
        <section className="reveal revealed relative h-[614px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/40 via-[#0B0B0B]/80 to-[#0B0B0B] z-10" />
            <LazyImage
              className="grayscale opacity-40"
              alt="A cinematic, low-angle shot of a high-end corporate skyscraper interior with polished obsidian surfaces and golden ambient lighting."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDH1js_D1xV_JQ0J1Gsd06MI9RXpcpt8-mq4X-e7cDxrLxvJpEMGdDeC2l_nF8-6bItg6-w2TluHUP3Qamv_tmeKqL0Ear5XRhmt5CgRxxdTc9Yfqy3CWacpCr-_k60faTFIl3X3Ts35Ndo27nEjv7wM5uo_srW0H7hDhphNk2WWHFPVo8YZYlXdqS3V46fMwFiyiJQWYzckGrkRebJIgTM0baeX6B_lReBGDa3FhhLvGal1PtMU1xiPstdy90_vrYAJYMkdQjrrVs"
              fetchPriority="high"
            />
          </div>
          <div className="relative z-20 text-center max-w-4xl px-6">
            <span className="font-label-sm text-primary-container tracking-[0.3em] uppercase mb-4 block">Our Expertise</span>
            <h1 className="font-display-xl text-on-background mb-6">Expertise &amp; Solutions</h1>
            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">Elevating brands through a fusion of strategic marketing, cinematic media creation, and world-class event execution.</p>
          </div>
        </section>

        {/* Services Breakdown */}
        <section className="py-section-gap max-w-7xl mx-auto px-6">
          <div className="space-y-section-gap">
            {/* Branding & Marketing */}
            <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <span className="font-label-sm text-primary-container tracking-widest uppercase block mb-4">01. Branding & Advertising</span>
                <h2 className="font-headline-lg text-on-background mb-8">Building Brands That Stand Out</h2>
                <p className="font-body-lg text-on-surface-variant mb-8">We help businesses create strong, memorable brand identities and strategic advertising campaigns that capture attention, build trust, and drive growth. Our creative approach combines storytelling, design, and market insights to position your brand for long-term success.</p>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-center gap-3 font-body-md text-on-surface">
                    <span className="material-symbols-outlined text-primary-container">check_circle</span>
                    Brand Identity & Logo Design
                  </li>
                  <li className="flex items-center gap-3 font-body-md text-on-surface">
                    <span className="material-symbols-outlined text-primary-container">check_circle</span>
                    Creative Advertising Campaigns
                  </li>
                  <li className="flex items-center gap-3 font-body-md text-on-surface">
                    <span className="material-symbols-outlined text-primary-container">check_circle</span>
                    Strategic Brand Positioning
                  </li>
                </ul>
                <button onClick={() => window.open('https://www.instagram.com/media7entertainments/', '_blank')} className="border border-white/20 px-8 py-3 font-bold text-on-background hover:bg-white/5 transition-all">Explore Branding</button>
              </div>
              <div className="order-1 lg:order-2">
                <div className="aspect-[4/5] bg-[#1A1A1A] relative overflow-hidden rounded-lg group shadow-2xl">
                  <LazyImage
                    className="transition-transform duration-700 group-hover:scale-110"
                    alt="Branding and Advertising"
                    src="/service1.webp"
                    wrapperClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 border border-white/5 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Media Solutions */}
            <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="aspect-[16/9] bg-[#1A1A1A] relative overflow-hidden rounded-lg group shadow-2xl">
                  <LazyImage
                    className="transition-transform duration-700 group-hover:scale-110"
                    alt="Media Production"
                    src="/service2.webp"
                    wrapperClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 border border-white/5 pointer-events-none" />
                </div>
              </div>
              <div className="pl-0 lg:pl-12">
                <span className="font-label-sm text-primary-container tracking-widest uppercase block mb-4">02. Media Production</span>
                <h2 className="font-headline-lg text-on-background mb-8">Ad Films & Corporate Videos</h2>
                <p className="font-body-lg text-on-surface-variant mb-8">We create compelling visual stories that captivate audiences and communicate your brand message with clarity, creativity, and impact. From concept development to final production, we deliver content that leaves a lasting impression.</p>
                <div className="grid grid-cols-2 gap-6 mb-10">
                  <div className="reveal reveal-delay-1 p-6 bg-[#1A1A1A] border border-white/5">
                    <span className="material-symbols-outlined text-primary-container text-3xl mb-4">videocam</span>
                    <h4 className="font-headline-md text-lg mb-2">Ad Film Production</h4>
                    <p className="text-sm text-on-surface-variant">Instagram, YouTube and Other Platforms Ads</p>
                  </div>
                  <div className="reveal reveal-delay-2 p-6 bg-[#1A1A1A] border border-white/5">
                    <span className="material-symbols-outlined text-primary-container text-3xl mb-4">photo_camera</span>
                    <h4 className="font-headline-md text-lg mb-2">Corporate Videos & Documentaries</h4>
                    <p className="text-sm text-on-surface-variant">Brand Films, Short Movies, Documentaries, Social Media Content</p>
                  </div>
                  <div className="reveal reveal-delay-3 p-6 bg-[#1A1A1A] border border-white/5">
                    <span className="material-symbols-outlined text-primary-container text-3xl mb-4">photo_camera</span>
                    <h4 className="font-headline-md text-lg mb-2">Photography</h4>
                    <p className="text-sm text-on-surface-variant">High-End Brand Assets</p>
                  </div>
                </div>
                <button onClick={() => window.open('https://www.instagram.com/media7entertainments/reels/', '_blank')} className="border border-white/20 px-8 py-3 font-bold text-on-background hover:bg-white/5 transition-all">View our Reels</button>
              </div>
            </div>

            {/* Digital Marketing */}
            <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <span className="font-label-sm text-primary-container tracking-widest uppercase block mb-4">03. Digital Marketing</span>
                <h2 className="font-headline-lg text-on-background mb-8">Growth Through Strategy</h2>
                <p className="font-body-lg text-on-surface-variant mb-8">Our digital marketing solutions combine creativity, analytics, and technology to help brands reach the right audience, generate engagement, and achieve measurable business growth.</p>
                <div className="space-y-6">
                  <div className="reveal reveal-delay-1 flex gap-6 items-start">
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-primary-container text-primary-container font-headline-md">1</div>
                    <div>
                      <h4 className="font-bold text-on-background">Social Media Marketing</h4>
                      <p className="text-on-surface-variant">Building brand awareness and audience engagement through strategic content and platform management.</p>
                    </div>
                  </div>
                  <div className="reveal reveal-delay-2 flex gap-6 items-start">
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-primary-container text-primary-container font-headline-md">2</div>
                    <div>
                      <h4 className="font-bold text-on-background">SEO & Search Visibility</h4>
                      <p className="text-on-surface-variant">Optimizing your digital presence to improve search rankings, organic traffic, and online discoverability.</p>
                    </div>
                  </div>
                  <div className="reveal reveal-delay-3 flex gap-6 items-start">
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-primary-container text-primary-container font-headline-md">3</div>
                    <div>
                      <h4 className="font-bold text-on-background">Targeted Ad Campaigns</h4>
                      <p className="text-on-surface-variant">Running focused advertising campaigns across platforms to reach specific demographics and drive conversions.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="aspect-[4/3] bg-[#1A1A1A] relative overflow-hidden rounded-lg group shadow-2xl">
                  <LazyImage
                    className="transition-transform duration-700 group-hover:scale-110"
                    alt="Digital Marketing"
                    src="/service3.webp"
                    wrapperClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 border border-white/5 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Events & Experiences */}
            <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="aspect-[4/5] bg-[#1A1A1A] relative overflow-hidden rounded-lg group shadow-2xl">
                  <LazyImage
                    className="transition-transform duration-700 group-hover:scale-110"
                    alt="Events and Experiences"
                    src="/service4.webp"
                    wrapperClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 border border-white/5 pointer-events-none" />
                </div>
              </div>
              <div>
                <span className="font-label-sm text-primary-container tracking-widest uppercase block mb-4">04. Events &amp; Experiences</span>
                <h2 className="font-headline-lg text-on-background mb-8">Creating Memorable Moments</h2>
                <p className="font-body-lg text-on-surface-variant mb-8">We plan and execute impactful events that strengthen brand presence, engage audiences, and deliver unforgettable experiences. From corporate gatherings to large-scale brand activations, every detail is managed with precision.</p>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-center gap-3 font-body-md text-on-surface">
                    <span className="material-symbols-outlined text-primary-container">check_circle</span>
                    Corporate Events
                  </li>
                  <li className="flex items-center gap-3 font-body-md text-on-surface">
                    <span className="material-symbols-outlined text-primary-container">check_circle</span>
                    Brand Activations
                  </li>
                  <li className="flex items-center gap-3 font-body-md text-on-surface">
                    <span className="material-symbols-outlined text-primary-container">check_circle</span>
                    Event Planning &amp; Management
                  </li>
                </ul>
                <button onClick={() => window.open('https://www.instagram.com/glamhair2026_/', '_blank')} className="border border-white/20 px-8 py-3 font-bold text-on-background hover:bg-white/5 transition-all">Explore our Events</button>
              </div>
            </div>

            {/* Podcasting Video */}
            <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <span className="font-label-sm text-primary-container tracking-widest uppercase block mb-4">05. Podcasting Studio</span>
                <h2 className="font-headline-lg text-on-background mb-8">Amplifying Voices That Matter</h2>
                <p className="font-body-lg text-on-surface-variant mb-8">We provide a professional podcasting environment designed to help creators, brands, and businesses produce high-quality audio and video content. From recording and production to branding and distribution support, we help transform ideas into engaging conversations that connect with audiences.</p>
                <div className="space-y-6">
                  <div className="reveal reveal-delay-1 flex gap-6 items-start">
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-primary-container text-primary-container font-headline-md">1</div>
                    <div>
                      <h4 className="font-bold text-on-background">Professional Audio & Video Podcast Production</h4>
                    </div>
                  </div>
                  <div className="reveal reveal-delay-2 flex gap-6 items-start">
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-primary-container text-primary-container font-headline-md">2</div>
                    <div>
                      <h4 className="font-bold text-on-background">Multi-Camera Recording Setup</h4>
                    </div>
                  </div>
                  <div className="reveal reveal-delay-3 flex gap-6 items-start">
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-primary-container text-primary-container font-headline-md">3</div>
                    <div>
                      <h4 className="font-bold text-on-background">Podcast Branding, Editing & Distribution</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="aspect-[4/3] bg-[#1A1A1A] relative overflow-hidden rounded-lg group shadow-2xl">
                  <LazyImage
                    className="transition-transform duration-700 group-hover:scale-110"
                    alt="Digital Marketing"
                    src="/service5.webp"
                    wrapperClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 border border-white/5 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className="reveal py-section-gap bg-[#111111] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="font-headline-lg text-on-background mb-4">From Idea to Impact</h2>
              <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">Our streamlined creative process ensures every project is executed with strategy, precision, and measurable results.</p>
            </div>
            <div className="relative">
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2 hidden md:block" />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
                {/* Step 1 */}
                <div className="reveal reveal-delay-1 bg-[#1A1A1A] p-8 relative group hover:bg-[#222222] transition-colors">
                  <div className="w-16 h-16 bg-primary-container flex items-center justify-center mb-8 mx-auto md:mx-0 shadow-lg shadow-primary-container/20">
                    <span className="material-symbols-outlined text-black text-3xl">lightbulb</span>
                  </div>
                  <span className="font-label-sm text-primary-container mb-2 block">Phase 01</span>
                  <h3 className="font-headline-md text-xl mb-4">Discovery & Strategy</h3>
                  <p className="text-sm text-on-surface-variant">We understand your brand, objectives, audience, and market landscape to create a strong foundation for success.</p>
                </div>
                {/* Step 2 */}
                <div className="reveal reveal-delay-2 bg-[#1A1A1A] p-8 relative group hover:bg-[#222222] transition-colors">
                  <div className="w-16 h-16 bg-primary-container flex items-center justify-center mb-8 mx-auto md:mx-0 shadow-lg shadow-primary-container/20">
                    <span className="material-symbols-outlined text-black text-3xl">architecture</span>
                  </div>
                  <span className="font-label-sm text-primary-container mb-2 block">Phase 02</span>
                  <h3 className="font-headline-md text-xl mb-4">Planning & Concept Development</h3>
                  <p className="text-sm text-on-surface-variant">Our team develops creative concepts, campaign strategies, and content plans tailored to your business goals.</p>
                </div>
                {/* Step 3 */}
                <div className="reveal reveal-delay-3 bg-[#1A1A1A] p-8 relative group hover:bg-[#222222] transition-colors">
                  <div className="w-16 h-16 bg-primary-container flex items-center justify-center mb-8 mx-auto md:mx-0 shadow-lg shadow-primary-container/20">
                    <span className="material-symbols-outlined text-black text-3xl">brush</span>
                  </div>
                  <span className="font-label-sm text-primary-container mb-2 block">Phase 03</span>
                  <h3 className="font-headline-md text-xl mb-4">Production & Execution</h3>
                  <p className="text-sm text-on-surface-variant">From branding and video production to digital marketing and events, we bring ideas to life with creativity and precision.</p>
                </div>
                {/* Step 4 */}
                <div className="reveal reveal-delay-4 bg-[#1A1A1A] p-8 relative group hover:bg-[#222222] transition-colors">
                  <div className="w-16 h-16 bg-primary-container flex items-center justify-center mb-8 mx-auto md:mx-0 shadow-lg shadow-primary-container/20">
                    <span className="material-symbols-outlined text-black text-3xl">trophy</span>
                  </div>
                  <span className="font-label-sm text-primary-container mb-2 block">Phase 04</span>
                  <h3 className="font-headline-md text-xl mb-4">Growth & Optimization</h3>
                  <p className="text-sm text-on-surface-variant">We monitor performance, analyze results, and continuously optimize strategies to maximize engagement, visibility, and business growth.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="reveal py-section-gap text-center px-6">
          <div className="max-w-3xl mx-auto border border-white/5 bg-[#1A1A1A] p-16 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/5 rounded-full -mr-16 -mt-16 blur-3xl" />
            <h2 className="font-headline-lg text-on-background mb-6">Ready to elevate?</h2>
            <p className="font-body-lg text-on-surface-variant mb-10">Connect with our executive team to discuss your next high-impact project.</p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <button onClick={() => onNavigate('contact')} className="bg-[#F5C542] text-black px-10 py-4 font-bold text-lg hover:brightness-110 active:scale-95 transition-all">Start a Project</button>
              <button onClick={() => onNavigate('portfolio')} className="border border-white/20 px-10 py-4 font-bold text-lg text-on-background hover:bg-white/5 transition-all">Our Portfolio</button>
            </div>
          </div>
        </section>
      </main>

        <Footer onNavigate={onNavigate} currentPage="services" />
    </div>
  )
}
