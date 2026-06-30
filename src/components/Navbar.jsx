import { useState } from 'react'

export default function Navbar({ onNavigate, currentPage }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const links = ['Home', 'About', 'Services', 'Branding', 'Portfolio', 'Blog', 'Careers']

  const handleNav = (page) => {
    setMobileOpen(false)
    onNavigate(page)
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0B0B0B]/90 backdrop-blur-md border-b border-white/5 shadow-2xl shadow-black/50">
      <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <span
            className="material-symbols-outlined text-[#F5C542] active:scale-95 transition-transform cursor-pointer md:hidden"
            onClick={() => setMobileOpen(prev => !prev)}
          >
            {mobileOpen ? 'close' : 'menu'}
          </span>
          <img
            src="/logo2.webp"
            alt="Media7"
            className="h-8 w-auto cursor-pointer"
            onClick={() => handleNav('home')}
          />
          <span
            className="max-sm:text-sm sm:text-lg md:text-xl font-black tracking-widest text-[#F5C542] uppercase font-headline-lg cursor-pointer"
            onClick={() => handleNav('home')}
          >
            Media7
          </span>
        </div>
        <div className="hidden md:flex gap-8 items-center font-manrope antialiased tracking-tight">
          {links.map(link => (
            <button
              key={link}
              onClick={() => handleNav(link.toLowerCase())}
              className={`transition-colors duration-300 ${
                currentPage === link.toLowerCase()
                  ? 'text-[#F5C542] font-bold'
                  : 'text-white/70 hover:text-[#F5C542]'
              }`}
            >
              {link}
            </button>
          ))}
        </div>
        <button
          onClick={() => handleNav('contact')}
          className="bg-[#F5C542] text-[#0B0B0B] px-6 py-2.5 font-bold uppercase text-xs tracking-widest active:scale-95 transition-all hover:bg-[#ffe5aa]"
        >
          Get in Touch
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0B0B0B] border-t border-white/5 shadow-2xl shadow-black/50">
          <div className="px-6 py-6 space-y-4">
            {links.map(link => (
              <button
                key={link}
                onClick={() => handleNav(link.toLowerCase())}
                className={`block w-full text-left py-3 px-4 transition-colors duration-300 ${
                  currentPage === link.toLowerCase()
                    ? 'text-[#F5C542] font-bold bg-[#F5C542]/10'
                    : 'text-white/70 hover:text-[#F5C542] hover:bg-white/5'
                }`}
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
