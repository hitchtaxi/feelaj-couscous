import type { Particle } from './types'

const GRAVITY = 0.3
const DRAG = 0.96
const FADE = 0.012
const COLORS = ['#f5f0e8', '#c9a84c', '#d4a847', '#e8d5a0', '#8b6914', '#8b1a1a', '#c0392b']

export function createParticle(originX: number, originY: number): Particle {
  const angle = Math.random() * Math.PI * 2
  const speed = 12 + Math.random() * 20
  return {
    x: originX,
    y: originY,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed - 8,
    radius: 1.5 + Math.random() * 3,
    alpha: 1,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }
}

export function updateParticle(particle: Particle): Particle {
  return {
    ...particle,
    x: particle.x + particle.vx,
    y: particle.y + particle.vy,
    vx: particle.vx * DRAG,
    vy: particle.vy * DRAG + GRAVITY,
    alpha: Math.max(0, particle.alpha - FADE),
  }
}

export function isParticleAlive(particle: Particle): boolean {
  return particle.alpha > 0
}

export function createBurst(originX: number, originY: number, count = 250): Particle[] {
  return Array.from({ length: count }, () => createParticle(originX, originY))
}
