'use client'
import { useEffect, useState } from 'react'

interface Meteor {
  id: number
  top: string
  left: string
  duration: number
  delay: number
  width: number
}

export default function Meteors({ count = 20 }: { count?: number }) {
  const [meteors, setMeteors] = useState<Meteor[]>([])

  useEffect(() => {
    setMeteors(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: `${Math.random() * 40}%`,
        left: `${Math.random() * 100}%`,
        duration: Math.random() * 6 + 4,
        delay: Math.random() * 8,
        width: Math.random() * 80 + 40,
      }))
    )
  }, [count])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {meteors.map(m => (
        <span
          key={m.id}
          className="absolute rounded-full rotate-[215deg] animate-meteor"
          style={{
            top: m.top,
            left: m.left,
            width: `${m.width}px`,
            height: '1px',
            animationDuration: `${m.duration}s`,
            animationDelay: `${m.delay}s`,
            background: `linear-gradient(to right, #c9a84c, transparent)`,
            boxShadow: '0 0 6px 1px rgba(201,168,76,0.4)',
          }}
        />
      ))}
    </div>
  )
}
