'use client'
import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Image from 'next/image'
import ParticleCanvas from './ParticleCanvas'
import IngredientLabels from './IngredientLabels'

export default function CouscousExplosion() {
  const [exploded, setExploded] = useState(false)
  const [showLabels, setShowLabels] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const bowlRef = useRef<HTMLDivElement>(null)
  const [origin, setOrigin] = useState({ x: 0, y: 0 })
  const [center, setCenter] = useState({ x: 0, y: 0 })
  const isInView = useInView(sectionRef, { once: true })

  const handleClick = useCallback(() => {
    if (exploded) {
      setExploded(false)
      setShowLabels(false)
      return
    }

    if (!bowlRef.current || !sectionRef.current) return
    const bowlRect = bowlRef.current.getBoundingClientRect()
    const sectionRect = sectionRef.current.getBoundingClientRect()

    const ox = bowlRect.left + bowlRect.width / 2 - sectionRect.left
    const oy = bowlRect.top + bowlRect.height / 2 - sectionRect.top

    setOrigin({ x: ox, y: oy })
    setCenter({ x: ox, y: oy })
    setExploded(true)
  }, [exploded])

  return (
    <section
      id="explosion"
      ref={sectionRef}
      className="relative min-h-screen bg-feelaj-black flex flex-col items-center justify-center overflow-hidden py-24"
    >
      <ParticleCanvas
        triggered={exploded}
        originX={origin.x}
        originY={origin.y}
        onComplete={() => setShowLabels(true)}
      />

      <IngredientLabels
        visible={showLabels}
        centerX={center.x}
        centerY={center.y}
      />

      {/* Section headline */}
      <motion.div
        className="relative z-10 text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="font-body text-feelaj-gold/60 tracking-[0.3em] text-xs uppercase mb-4">
          The Ingredients
        </p>
        <h2 className="font-display text-5xl md:text-7xl text-feelaj-text font-light">
          What&apos;s inside <span className="italic text-feelaj-gold">matters.</span>
        </h2>
      </motion.div>

      {/* Bowl */}
      <motion.div
        ref={bowlRef}
        className="relative z-10 cursor-pointer group"
        onClick={handleClick}
        animate={exploded ? { scale: [1, 1.05, 0.95, 1] } : {}}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Steam effect */}
        <AnimatePresence>
          {!exploded && (
            <>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-0.5 bg-gradient-to-t from-white/20 to-transparent rounded-full"
                  style={{ left: `${30 + i * 20}%`, bottom: '100%', height: '40px' }}
                  animate={{ y: [-10, -40], opacity: [0.4, 0] }}
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.4 }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Bowl image */}
        <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden ring-1 ring-feelaj-gold/30 group-hover:ring-feelaj-gold/60 transition-all shadow-[0_0_80px_rgba(201,168,76,0.15)]">
          <Image
            src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80"
            alt="Tunisian couscous bowl — click to explore ingredients"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-feelaj-black/30 to-transparent" />
        </div>

        {/* Click prompt */}
        <AnimatePresence>
          {!exploded && (
            <motion.p
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 font-body text-feelaj-gold text-xs tracking-widest whitespace-nowrap"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              exit={{ opacity: 0 }}
            >
              CLICK THE BOWL
            </motion.p>
          )}
        </AnimatePresence>

        {/* Reset prompt */}
        <AnimatePresence>
          {showLabels && (
            <motion.p
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 font-body text-feelaj-text/40 text-xs tracking-widest whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              ↺ click to reset
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* TUNISIAN badge */}
      <AnimatePresence>
        {showLabels && (
          <motion.div
            className="relative z-10 mt-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1 }}
          >
            <p className="font-display text-4xl md:text-5xl font-semibold tracking-widest">
              <span className="text-feelaj-gold underline decoration-feelaj-red decoration-2 underline-offset-4">
                TUNISIAN
              </span>
            </p>
            <p className="font-body text-feelaj-text/50 text-sm mt-2 tracking-wider">
              Not Moroccan. Not Algerian. <span className="text-feelaj-gold">Tunisian.</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
