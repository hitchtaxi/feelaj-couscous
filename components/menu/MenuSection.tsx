'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MENU_ITEMS } from '@/lib/constants'
import MenuCard from './MenuCard'

export default function MenuSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="menu" ref={ref} className="bg-feelaj-black py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="font-body tracking-[0.3em] text-xs uppercase text-feelaj-gold mb-4">
            The Menu
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-feelaj-text font-light">
            Three dishes. <span className="italic text-feelaj-gold">One centrepiece.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {MENU_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
            >
              <MenuCard item={item} featured={item.id === 'couscous'} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
