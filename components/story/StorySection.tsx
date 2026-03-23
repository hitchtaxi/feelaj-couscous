'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

export default function StorySection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="story"
      ref={ref}
      className="bg-feelaj-cream text-feelaj-black py-24 px-6"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body tracking-[0.3em] text-xs uppercase text-feelaj-gold mb-6">
            The Origin
          </p>

          <h2 className="font-display text-5xl md:text-6xl font-light leading-tight mb-8">
            From the poorest kitchens<br />
            <span className="italic">come the greatest meals.</span>
          </h2>

          <div className="font-body text-feelaj-black/75 text-base leading-relaxed space-y-5">
            <p>
              The Béja region of northwest Tunisia — Gboulat, Mjaz el Bab, Testour,
              El Kef — is where Tunisia&apos;s wheat has grown for centuries. These are
              not wealthy towns. The families here have very little. But from those
              humble kitchens comes food so majestically crafted, so deeply flavoured,
              that it silences a table.
            </p>
            <p>
              When you have less, you cook with more intention. Every grain is counted.
              Every spice is earned. That is where couscous comes from — not a restaurant,
              not a factory. A family kitchen, a wood fire, and hands that know exactly
              what they are doing.
            </p>
            <p>
              <strong>Testour</strong>, built by Andalusian refugees in the 17th century,
              still carries their craftsmanship in its architecture and its malouf music.{' '}
              <strong>El Kef</strong>, one of the oldest continuously inhabited cities in
              Tunisia, watches over a valley from a Byzantine fortress.{' '}
              <strong>Mjaz el Bab</strong> and <strong>Gboulat</strong> sit along the
              Medjerda river — the lifeblood of Tunisian agriculture.
            </p>

            <div className="border-l-2 border-feelaj-gold pl-6 py-2 mt-8">
              <p className="font-display text-xl italic text-feelaj-black/90 leading-relaxed">
                Amal grew up in that world. Her father farmed organically — the old way,
                no shortcuts. Her mother cooked the same way. The recipes Amal learned
                were never written down. They lived in the hands, the smell, the sound
                of a pot.
              </p>
            </div>

            <p>
              She came to Sydney and looked around. She found Lebanese food, Turkish food,
              Moroccan food. But nothing Tunisian. Nothing real. She saw that gap not as a
              problem — but as an opportunity. She was optimistic from the start.
            </p>
            <p>
              She built <strong>Feelaj</strong> — the old word for the rural marketplace
              where people gathered to trade and eat — and she brought those recipes here.
              Every meal is still made the way her mother made it: organic, homemade,
              and without compromise.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative h-[600px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1548610762-4d452b80e35a?w=800&q=80"
              alt="Rural Tunisia — wheat fields and traditional life"
              fill
              className="object-cover grayscale-[20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-feelaj-cream/30 to-transparent" />
          </div>
          <p className="font-body text-xs text-feelaj-black/40 mt-3 tracking-wider">
            Northwest Tunisia — Béja Governorate
          </p>
        </motion.div>
      </div>
    </section>
  )
}
