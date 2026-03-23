'use client'
import { useEffect, useRef, useCallback } from 'react'
import { createBurst, updateParticle, isParticleAlive } from '@/lib/particles'
import type { Particle } from '@/lib/types'

interface ParticleCanvasProps {
  triggered: boolean
  originX: number
  originY: number
  onComplete?: () => void
}

export default function ParticleCanvas({
  triggered,
  originX,
  originY,
  onComplete,
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animFrameRef = useRef<number>(0)
  const hasTriggeredRef = useRef(false)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particlesRef.current = particlesRef.current
      .map(updateParticle)
      .filter(isParticleAlive)

    particlesRef.current.forEach((p) => {
      ctx.save()
      ctx.globalAlpha = p.alpha
      ctx.fillStyle = p.color
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    })

    if (particlesRef.current.length > 0) {
      animFrameRef.current = requestAnimationFrame(draw)
    } else {
      onComplete?.()
    }
  }, [onComplete])

  useEffect(() => {
    if (triggered && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true
      particlesRef.current = createBurst(originX, originY, 150)
      animFrameRef.current = requestAnimationFrame(draw)
    }
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [triggered, originX, originY, draw])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}
