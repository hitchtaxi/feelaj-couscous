'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import SparklesText from '@/components/ui/SparklesText'
import Meteors from '@/components/ui/Meteors'
import ShimmerButton from '@/components/ui/ShimmerButton'

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-feelaj-black">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1920&q=80"
          alt="Tunisian couscous"
          fill
          className="object-cover opacity-25"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-feelaj-black/60 via-transparent to-feelaj-black" />
      </div>

      {/* Shooting meteors */}
      <Meteors count={18} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-body text-feelaj-gold tracking-[0.3em] text-xs uppercase mb-6"
        >
          Delivering across Sydney
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-display text-6xl md:text-8xl font-light text-feelaj-text leading-tight mb-6"
        >
          Couscous, the way<br />
          <SparklesText className="italic text-feelaj-gold" sparkleCount={14}>
            it was meant to be.
          </SparklesText>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="font-body text-feelaj-text/70 text-lg md:text-xl mb-12 max-w-xl mx-auto"
        >
          Authentic Tunisian home cooking. No delivery fee. Order 7pm–11pm, delivered next morning.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <ShimmerButton href="#contact" variant="gold">
            ORDER NOW
          </ShimmerButton>
          <ShimmerButton href="#deals" variant="outline">
            SEE OUR DEALS
          </ShimmerButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="font-body text-feelaj-gold/60 text-xs tracking-widest">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-feelaj-gold/60 to-transparent" />
      </motion.div>
    </section>
  )
}
