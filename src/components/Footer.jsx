export default function Footer({ onNavigate, currentPage }) {
  const navLinks = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Services', page: 'services' },
    { label: 'Branding', page: 'branding' },
    { label: 'Portfolio', page: 'portfolio' },
    { label: 'Blog', page: 'blog' },
    { label: 'Careers', page: 'careers' },
  ]

  return (
    <footer className="bg-[#0B0B0B] w-full py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-1">
          <span className="text-lg font-bold text-[#F5C542] mb-6 block">Media7</span>
          <p className="font-manrope text-sm text-zinc-500 max-w-xs">
            Redefining excellence in branding, media production, digital marketing, and creative storytelling for ambitious brands and growing businesses.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-6">Navigation</h4>
          <ul className="space-y-4 font-manrope text-sm">
            {navLinks.map(link => (
              <li key={link.page}>
                <button
                  onClick={() => onNavigate?.(link.page)}
                  className={`transition-colors duration-200 ${currentPage === link.page ? 'text-[#F5C542]' : 'text-zinc-500 hover:text-white'}`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-6">Connect</h4>
          <ul className="space-y-4 font-manrope text-sm">
            <li><a className="text-zinc-500 hover:text-white transition-colors duration-200" href="https://media7news.com" target="_blank" rel="noopener noreferrer">News Portal</a></li>
            <li><a className="text-zinc-500 hover:text-white transition-colors duration-200" href="https://www.facebook.com/profile.php?id=61583516706710" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a className="text-zinc-500 hover:text-white transition-colors duration-200" href="#">LinkedIn</a></li>
            <li><a className="text-zinc-500 hover:text-white transition-colors duration-200" href="https://www.instagram.com/media7entertainments/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a className="text-zinc-500 hover:text-white transition-colors duration-200" href="https://x.com/media7onlive" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a className="text-zinc-500 hover:text-white transition-colors duration-200" href="https://www.youtube.com/@media7onlive" target="_blank" rel="noopener noreferrer">Youtube</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-6">Office</h4>
          <p className="font-manrope text-sm text-zinc-500 mb-2">3rd floor, National Pearl Star Building National Builders,3C, behind Changampuzha Metro Station, Edappally, Kochi, Kerala 682024</p>
          <p className="font-manrope text-sm text-zinc-500">Media 7</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="font-manrope text-sm text-zinc-500">&copy; 2026 Media7. All rights reserved.</p>
          <p className="font-manrope text-xs text-zinc-600">
            Website created by <a href="https://astrivix.in" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-gold transition-colors">astrivix.in</a>
          </p>
        </div>
        <div className="flex gap-8 font-manrope text-xs text-zinc-600 uppercase tracking-widest">
          <button onClick={() => onNavigate?.('privacy')} className="hover:text-gold transition-colors uppercase tracking-widest">Privacy Policy</button>
          <button onClick={() => onNavigate?.('terms')} className="hover:text-gold transition-colors uppercase tracking-widest">Terms of Service</button>
        </div>
      </div>
    </footer>
  )
}
