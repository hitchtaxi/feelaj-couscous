'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ITEMS = [
  { name: 'Couscous', detail: 'The signature', color: '#c9a84c' },
  { name: 'Tunisian Tagine', detail: 'Baked, not braised', color: '#8b1a1a' },
  { name: 'Salata Mishweya', detail: 'Fire-roasted', color: '#d4a847' },
]

export default function MenuCycler() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(i => (i + 1) % ITEMS.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center gap-3 py-3">
      {ITEMS.map((item, i) => (
        <button
          key={item.name}
          onClick={() => setCurrent(i)}
          className="relative px-4 py-2 rounded-full text-sm font-body tracking-wider transition-all duration-500"
          style={{
            color: i === current ? item.color : 'rgba(245,240,232,0.4)',
          }}
        >
          <AnimatePresence>
            {i === current && (
              <motion.span
                layoutId="menu-spotlight"
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(ellipse at center, ${item.color}20 0%, transparent 70%)`,
                  border: `1px solid ${item.color}40`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
            )}
          </AnimatePresence>
          <span className="relative">{item.name}</span>
        </button>
      ))}
    </div>
  )
}
