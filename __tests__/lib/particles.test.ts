import {
  createParticle,
  updateParticle,
  isParticleAlive,
} from '@/lib/particles'

describe('createParticle', () => {
  it('creates a particle at the given origin', () => {
    const p = createParticle(100, 200)
    expect(p.x).toBe(100)
    expect(p.y).toBe(200)
  })

  it('gives the particle a random velocity', () => {
    const p1 = createParticle(0, 0)
    const p2 = createParticle(0, 0)
    expect(p1.vx !== p2.vx || p1.vy !== p2.vy).toBe(true)
  })

  it('starts with alpha = 1', () => {
    const p = createParticle(0, 0)
    expect(p.alpha).toBe(1)
  })
})

describe('updateParticle', () => {
  it('moves the particle by its velocity', () => {
    const p = createParticle(0, 0)
    p.vx = 5
    p.vy = -3
    const updated = updateParticle(p)
    expect(updated.x).toBe(5)
    expect(updated.y).toBe(-3)
  })

  it('applies drag (velocity decreases)', () => {
    const p = createParticle(0, 0)
    p.vx = 10
    p.vy = 0
    const updated = updateParticle(p)
    expect(Math.abs(updated.vx)).toBeLessThan(10)
  })

  it('applies gravity (vy increases)', () => {
    const p = createParticle(0, 0)
    p.vy = 0
    const updated = updateParticle(p)
    expect(updated.vy).toBeGreaterThan(0)
  })

  it('fades alpha over time', () => {
    const p = createParticle(0, 0)
    p.alpha = 1
    const updated = updateParticle(p)
    expect(updated.alpha).toBeLessThan(1)
  })
})

describe('isParticleAlive', () => {
  it('returns true when alpha > 0', () => {
    const p = createParticle(0, 0)
    p.alpha = 0.5
    expect(isParticleAlive(p)).toBe(true)
  })

  it('returns false when alpha <= 0', () => {
    const p = createParticle(0, 0)
    p.alpha = 0
    expect(isParticleAlive(p)).toBe(false)
  })
})
