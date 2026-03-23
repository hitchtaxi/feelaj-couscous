'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function EventsSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative bg-feelaj-surface py-24 px-6 overflow-hidden">
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #c9a84c 0, #c9a84c 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px',
        }}
      />
      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="font-body tracking-[0.3em] text-xs uppercase text-feelaj-gold mb-6">
            Weddings & Events
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-feelaj-text font-light mb-8">
            We bring the<br />
            <span className="italic text-feelaj-gold">kitchen to you.</span>
          </h2>
          <p className="font-body text-feelaj-text/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            For weddings, corporate events, and gatherings of 20 or more — we come to your venue
            and cook fresh on-site. The way it&apos;s done at Tunisian weddings: the whole tent fills
            with the smell of couscous, and everyone eats together.
          </p>
          <a
            href="#contact"
            className="inline-block font-body text-sm tracking-widest px-10 py-4 border border-feelaj-gold text-feelaj-gold hover:bg-feelaj-gold hover:text-feelaj-black transition-all"
          >
            ENQUIRE ABOUT YOUR EVENT →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
