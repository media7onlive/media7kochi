import { useState, useEffect } from 'react'
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

export default function Contact({ onNavigate }) {
  useRevealOnScroll()
  const [form, setForm] = useState({
    name: '',
    email: '',
    projectType: 'Brand Identity',
    budget: '₹10,000 - ₹30,000',
    brief: '',
  })

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const subject = encodeURIComponent('New Project Proposal - ' + form.projectType)
    const body = encodeURIComponent([
      'Dear Media7 Team,',
      '',
      'I would like to submit a proposal for a new project.',
      '',
      '---',
      'Contact Information -',
      'Full Name: ' + form.name,
      'Email Address: ' + form.email,
      '',
      '---',
      'Project Details -',
      'Project Type: ' + form.projectType,
      'Budget Range: ' + form.budget,
      '',
      '---',
      'Project Brief',
      form.brief,
      '',
      '---',
      '',
      'I look forward to discussing this opportunity further.',
      '',
      'Best regards,',
      form.name,
    ].join('\n'))
    window.location.href = 'mailto:media7onlive@gmail.com?subject=' + subject + '&body=' + body
  }

  return (
    <div className="h-screen overflow-y-auto bg-[#0B0B0B] text-on-surface font-body-md selection:bg-primary-container selection:text-on-primary-container">
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

      <main className="pb-24">
        {/* Hero Section */}
        <section className="reveal revealed max-w-7xl mx-auto px-6 mb-stack-lg">
          <h1 className="text-5xl md:text-display-4xl font-semibold text-on-surface mb-stack-md">Get in Touch</h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Ready to elevate your digital presence? Our executive team is available for private consultations and strategic partnership discussions.
          </p>
        </section>

        {/* Dual Column Layout */}
        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Cards */}
          <div className="reveal lg:col-span-4 space-y-gutter">
            {/* Email Card */}
            <div className="reveal reveal-delay-1 bg-[#1A1A1A] border border-white/5 p-stack-lg transition-all duration-300 hover:shadow-2xl hover:shadow-black/40 group">
              <div className="flex items-center gap-4 mb-stack-md">
                <div className="w-12 h-12 flex items-center justify-center bg-surface-container">
                  <span className="material-symbols-outlined text-[#F5C542] text-2xl">mail</span>
                </div>
                <span className="font-label-sm text-label-sm text-zinc-500 uppercase tracking-widest">Email Us</span>
              </div>
              <p className="font-body-lg text-body-lg text-on-surface group-hover:text-[#F5C542] transition-colors">media7onlive@gmail.com</p>
            </div>

            {/* Phone Card */}
            <div className="reveal reveal-delay-2 bg-[#1A1A1A] border border-white/5 p-stack-lg transition-all duration-300 hover:shadow-2xl hover:shadow-black/40 group">
              <div className="flex items-center gap-4 mb-stack-md">
                <div className="w-12 h-12 flex items-center justify-center bg-surface-container">
                  <span className="material-symbols-outlined text-[#F5C542] text-2xl">call</span>
                </div>
                <span className="font-label-sm text-label-sm text-zinc-500 uppercase tracking-widest">Call Directly</span>
              </div>
              <p className="font-body-lg text-body-lg text-on-surface group-hover:text-[#F5C542] transition-colors">+91 99955 33809</p>
            </div>

            {/* Address Card */}
            <div className="reveal reveal-delay-3 bg-[#1A1A1A] border border-white/5 p-stack-lg transition-all duration-300 hover:shadow-2xl hover:shadow-black/40 group">
              <div className="flex items-center gap-4 mb-stack-md">
                <div className="w-12 h-12 flex items-center justify-center bg-surface-container">
                  <span className="material-symbols-outlined text-[#F5C542] text-2xl">location_on</span>
                </div>
                <span className="font-label-sm text-label-sm text-zinc-500 uppercase tracking-widest">Visit Studio</span>
              </div>
              <p className="font-body-lg text-body-lg text-on-surface group-hover:text-[#F5C542] transition-colors">3rd floor, National Pearl Star Building National Builders,<br /> 3C, behind Changampuzha Metro Station,<br /> Edappally, Kochi, Kerala 682024</p>
            </div>
          </div>

          {/* Right Column: Project Inquiry Form */}
          <div className="reveal lg:col-span-8 bg-[#1A1A1A] border border-white/5 p-stack-lg">
            <h2 className="font-headline-md text-headline-md mb-stack-lg text-on-surface">Project Inquiry</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Full Name</label>
                  <input value={form.name} onChange={e => handleChange('name', e.target.value)} className="w-full bg-[#0B0B0B] border border-white/5 focus:border-[#F5C542] focus:ring-0 text-on-surface font-body-md p-4 transition-colors" placeholder="Your/Company Name" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Email Address</label>
                  <input value={form.email} onChange={e => handleChange('email', e.target.value)} className="w-full bg-[#0B0B0B] border border-white/5 focus:border-[#F5C542] focus:ring-0 text-on-surface font-body-md p-4 transition-colors" placeholder="Your/Company Email Address" type="email" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Project Type</label>
                  <select value={form.projectType} onChange={e => handleChange('projectType', e.target.value)} className="w-full bg-[#0B0B0B] border border-white/5 focus:border-[#F5C542] focus:ring-0 text-on-surface font-body-md p-4 transition-colors">
                    <option>Brand Identity</option>
                    <option>Digital Strategy</option>
                    <option>High-End Web Development</option>
                    <option>Media Production</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Budget Range</label>
                  <select value={form.budget} onChange={e => handleChange('budget', e.target.value)} className="w-full bg-[#0B0B0B] border border-white/5 focus:border-[#F5C542] focus:ring-0 text-on-surface font-body-md p-4 transition-colors">
                    <option>₹10,000 - ₹30,000</option>
                    <option>₹40,000 - ₹80,000</option>
                    <option>₹80,000+</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Project Brief</label>
                <textarea value={form.brief} onChange={e => handleChange('brief', e.target.value)} className="w-full bg-[#0B0B0B] border border-white/5 focus:border-[#F5C542] focus:ring-0 text-on-surface font-body-md p-4 transition-colors" placeholder="Tell us about your vision and goals..." rows="6"></textarea>
              </div>
              <div className="pt-4">
                <button className="w-full bg-[#F5C542] text-black font-bold py-6 text-label-sm uppercase tracking-widest hover:brightness-110 transition-all active:scale-[0.98]" type="submit">
                  Submit Proposal
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Map Section */}
        <section className="reveal max-w-7xl mx-auto px-6 mt-stack-lg">
          <div className="w-full overflow-hidden border border-white/5">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.123!2d76.3024694!3d10.0151273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080da588e92727%3A0xfb57d7fdb58a3559!2sMedia7!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Media7 Location"
            />
          </div>
        </section>

      </main>

      <Footer onNavigate={onNavigate} currentPage="contact" />
    </div>
  )
}
