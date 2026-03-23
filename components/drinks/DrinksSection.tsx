'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { DRINKS } from '@/lib/constants'

export default function DrinksSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="bg-feelaj-black py-16 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="font-body tracking-[0.3em] text-xs uppercase text-feelaj-gold mb-8">
            Drinks — Included in every deal
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {DRINKS.map((drink) => (
              <span
                key={drink.id}
                className="font-body text-sm text-feelaj-text/70 px-5 py-2 border border-white/10 tracking-wide"
              >
                {drink.name}
              </span>
            ))}
          </div>
          <p className="font-body text-feelaj-text/30 text-xs mt-6 tracking-wider">
            More options coming soon.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
