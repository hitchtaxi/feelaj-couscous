'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Menu', href: '#menu' },
  { label: 'Deals', href: '#deals' },
  { label: 'Our Story', href: '#story' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between transition-all duration-500"
        animate={{
          backgroundColor: scrolled ? 'rgba(10,10,10,0.97)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(201,168,76,0.3)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <a href="#" className="font-display text-xl font-semibold tracking-widest text-feelaj-gold">
          FEELAJ COUSCOUS
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm tracking-wider text-feelaj-text/80 hover:text-feelaj-gold transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="font-body text-sm tracking-wider px-5 py-2 border border-feelaj-gold text-feelaj-gold hover:bg-feelaj-gold hover:text-feelaj-black transition-all"
          >
            Order Now
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-feelaj-gold transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-feelaj-gold transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-feelaj-gold transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-feelaj-black flex flex-col items-center justify-center gap-10"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-4xl text-feelaj-text hover:text-feelaj-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="font-body text-sm tracking-widest px-8 py-3 border border-feelaj-gold text-feelaj-gold hover:bg-feelaj-gold hover:text-feelaj-black transition-all mt-4"
            >
              ORDER NOW
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
