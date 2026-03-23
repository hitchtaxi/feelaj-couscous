'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { DEALS } from '@/lib/constants'
import DealCard from './DealCard'

export default function DealsSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="deals" ref={ref} className="bg-feelaj-black py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="font-body tracking-[0.3em] text-xs uppercase text-feelaj-gold mb-4">
            The Deals
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-feelaj-text font-light">
            Feed yourself.{' '}
            <span className="italic text-feelaj-gold">Feed your family.</span>
            <br />Feed the whole event.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEALS.map((deal, i) => (
            <motion.div
              key={deal.id}
              className={deal.id === 'wedding' ? 'sm:col-span-2 lg:col-span-3' : ''}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
            >
              <DealCard deal={deal} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
