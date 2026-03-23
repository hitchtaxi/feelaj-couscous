'use client'
import { useEffect, useRef, useState, CSSProperties } from 'react'

interface Sparkle {
  id: number
  x: string
  y: string
  color: string
  delay: number
  scale: number
  lifespan: number
}

const COLORS = ['#c9a84c', '#e8d5a0', '#fff8e7', '#d4a847', '#ffd700']

function random(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function generateSparkle(color: string): Sparkle {
  return {
    id: Date.now() + Math.random(),
    x: `${random(5, 95)}%`,
    y: `${random(5, 95)}%`,
    color,
    delay: random(0, 600),
    scale: random(0.4, 1.2),
    lifespan: random(500, 1200),
  }
}

interface SparklesTextProps {
  children: React.ReactNode
  className?: string
  sparkleCount?: number
}

export default function SparklesText({ children, className = '', sparkleCount = 12 }: SparklesTextProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      const sparkle = generateSparkle(color)
      setSparkles(prev => {
        const filtered = prev.filter(s => Date.now() - s.id < 1500)
        return [...filtered.slice(-sparkleCount + 1), sparkle]
      })
    }, 180)
    return () => clearInterval(interval)
  }, [sparkleCount])

  return (
    <span className={`relative inline-block ${className}`}>
      {sparkles.map(sparkle => (
        <SparkleInstance key={sparkle.id} sparkle={sparkle} />
      ))}
      <span className="relative z-10">{children}</span>
    </span>
  )
}

function SparkleInstance({ sparkle }: { sparkle: Sparkle }) {
  const style: CSSProperties = {
    position: 'absolute',
    left: sparkle.x,
    top: sparkle.y,
    zIndex: 20,
    pointerEvents: 'none',
    animation: `sparkle-pop ${sparkle.lifespan}ms ease-in-out ${sparkle.delay}ms forwards`,
    color: sparkle.color,
    transform: `scale(${sparkle.scale})`,
  }

  return (
    <span style={style} aria-hidden>
      <svg width="20" height="20" viewBox="0 0 160 160" fill="none">
        <path
          d="M80 7C80 7 84 45 107 68C130 91 153 95 153 95C153 95 130 99 107 122C84 145 80 153 80 153C80 153 76 145 53 122C30 99 7 95 7 95C7 95 30 91 53 68C76 45 80 7 80 7Z"
          fill="currentColor"
        />
      </svg>
    </span>
  )
}
