'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'explosion', label: 'Ingredients' },
  { id: 'story', label: 'Story' },
  { id: 'menu', label: 'Menu' },
  { id: 'deals', label: 'Deals' },
  { id: 'contact', label: 'Order' },
]

export default function ScrollProgress() {
  const [activeSection, setActiveSection] = useState('hero')
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0)

      // Find active section
      for (const section of [...SECTIONS].reverse()) {
        const el = document.getElementById(section.id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.5) {
          setActiveSection(section.id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-1">
      {/* Vertical line track */}
      <div className="relative w-px h-48 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full bg-feelaj-gold rounded-full"
          style={{ height: `${scrollProgress * 100}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Section dots */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-48 flex flex-col justify-between py-0">
        {SECTIONS.map((section, i) => (
          <button
            key={section.id}
            onClick={() => {
              const el = document.getElementById(section.id)
              el?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group relative flex items-center"
            aria-label={`Scroll to ${section.label}`}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              animate={{
                backgroundColor: activeSection === section.id ? '#c9a84c' : 'rgba(255,255,255,0.3)',
                scale: activeSection === section.id ? 1.6 : 1,
              }}
            />
            {/* Label on hover */}
            <span className="absolute right-5 text-xs font-body tracking-wider text-feelaj-gold/70 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-feelaj-black/80 px-2 py-0.5 rounded">
              {section.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
