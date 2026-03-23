import { DEALS, MENU_ITEMS, DRINKS, INGREDIENTS } from '@/lib/constants'

describe('DEALS', () => {
  it('has 7 deals', () => {
    expect(DEALS).toHaveLength(7)
  })

  it('every deal has required fields', () => {
    DEALS.forEach((deal) => {
      expect(deal.id).toBeTruthy()
      expect(deal.name).toBeTruthy()
      expect(deal.price).toBeDefined()
      expect(Array.isArray(deal.includes)).toBe(true)
    })
  })

  it('solo deal costs $22', () => {
    const solo = DEALS.find((d) => d.id === 'solo')
    expect(solo?.price).toBe(22)
  })

  it('couple deal costs $38', () => {
    const couple = DEALS.find((d) => d.id === 'couple')
    expect(couple?.price).toBe(38)
  })

  it('family-4 deal costs $60', () => {
    const fam = DEALS.find((d) => d.id === 'family-4')
    expect(fam?.price).toBe(60)
  })

  it('wedding deal price is contact', () => {
    const wedding = DEALS.find((d) => d.id === 'wedding')
    expect(wedding?.price).toBe('contact')
  })
})

describe('MENU_ITEMS', () => {
  it('has 3 items', () => {
    expect(MENU_ITEMS).toHaveLength(3)
  })

  it('couscous has signature badge', () => {
    const couscous = MENU_ITEMS.find((m) => m.id === 'couscous')
    expect(couscous?.badge).toBe('Our Signature')
  })
})

describe('INGREDIENTS', () => {
  it('has 8 ingredients', () => {
    expect(INGREDIENTS).toHaveLength(8)
  })

  it('all ingredients have valid angles (0-360)', () => {
    INGREDIENTS.forEach((ing) => {
      expect(ing.angle).toBeGreaterThanOrEqual(0)
      expect(ing.angle).toBeLessThan(360)
    })
  })
})
