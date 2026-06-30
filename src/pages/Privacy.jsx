import { useEffect } from 'react'
import Footer from '../components/Footer'

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

export default function Privacy({ onNavigate }) {
  useRevealOnScroll()
  return (
    <div className="h-screen overflow-y-auto bg-[#0B0B0B] text-on-background selection:bg-primary-container selection:text-on-primary-container">
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
      <main className="pt-24">
        {/* Hero Section */}
        <section className="reveal revealed relative h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/40 via-[#0B0B0B]/80 to-[#0B0B0B] z-10" />
            <img
              className="w-full h-full object-cover grayscale opacity-40"
              alt="Privacy Policy"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDH1js_D1xV_JQ0J1Gsd06MI9RXpcpt8-mq4X-e7cDxrLxvJpEMGdDeC2l_nF8-6bItg6-w2TluHUP3Qamv_tmeKqL0Ear5XRhmt5CgRxxdTc9Yfqy3CWacpCr-_k60faTFIl3X3Ts35Ndo27nEjv7wM5uo_srW0H7hDhphNk2WWHFPVo8YZYlXdqS3V46fMwFiyiJQWYzckGrkRebJIgTM0baeX6B_lReBGDa3FhhLvGal1PtMU1xiPstdy90_vrYAJYMkdQjrrVs"
            />
          </div>
          <div className="relative z-20 text-center max-w-4xl px-6">
            <span className="font-label-sm text-primary-container tracking-[0.3em] uppercase mb-4 block">Legal</span>
            <h1 className="font-display-xl text-on-background mb-6">Privacy Policy</h1>
            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">How we collect, use, and protect your information.</p>
          </div>
        </section>

        {/* Content Section */}
        <section className="reveal py-section-gap max-w-4xl mx-auto px-6">
          <div className="space-y-stack-lg">
            <div className="reveal reveal-delay-1">
              <h2 className="font-headline-md text-on-surface mb-4">Information We Collect</h2>
              <p className="font-body-lg text-on-surface-variant leading-relaxed">We collect information you provide directly to us, such as when you fill out a contact form, subscribe to our newsletter, or communicate with us via email or WhatsApp. This may include your name, email address, phone number, and any other details you choose to share.</p>
            </div>

            <div className="reveal reveal-delay-2">
              <h2 className="font-headline-md text-on-surface mb-4">How We Use Your Information</h2>
              <p className="font-body-lg text-on-surface-variant leading-relaxed">We use the information we collect to respond to your inquiries, provide our services, improve our website, send promotional materials (with your consent), and comply with legal obligations.</p>
            </div>

            <div className="reveal reveal-delay-3">
              <h2 className="font-headline-md text-on-surface mb-4">Data Sharing & Disclosure</h2>
              <p className="font-body-lg text-on-surface-variant leading-relaxed">We do not sell, trade, or rent your personal information to third parties. We may share your data with trusted service providers who assist us in operating our website and conducting our business, provided they agree to keep your information confidential.</p>
            </div>

            <div className="reveal reveal-delay-4">
              <h2 className="font-headline-md text-on-surface mb-4">Cookies</h2>
              <p className="font-body-lg text-on-surface-variant leading-relaxed">Our website may use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, though this may affect certain features of the site.</p>
            </div>

            <div className="reveal reveal-delay-5">
              <h2 className="font-headline-md text-on-surface mb-4">Data Security</h2>
              <p className="font-body-lg text-on-surface-variant leading-relaxed">We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</p>
            </div>

            <div className="reveal reveal-delay-6">
              <h2 className="font-headline-md text-on-surface mb-4">Your Rights</h2>
              <p className="font-body-lg text-on-surface-variant leading-relaxed">You have the right to access, correct, or delete your personal data held by us. You may also withdraw consent for marketing communications at any time by contacting us.</p>
            </div>

            <div className="reveal">
              <h2 className="font-headline-md text-on-surface mb-4">Contact Us</h2>
              <p className="font-body-lg text-on-surface-variant leading-relaxed">If you have any questions about this Privacy Policy, please contact us at md@media7news.com mail or via WhatsApp at +91 99955 33809.</p>
            </div>

            <div className="reveal pt-8 border-t border-white/5">
              <p className="font-body-md text-on-surface-variant">Last updated: June 2025</p>
            </div>
          </div>
        </section>
      </main>

      <Footer onNavigate={onNavigate} currentPage="privacy" />
    </div>
  )
}
