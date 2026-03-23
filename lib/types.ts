export interface Deal {
  id: string
  name: string
  description: string
  price: number | 'contact'
  includes: string[]
  drinks: number | 'included'
  highlighted?: boolean
}

export interface MenuItem {
  id: string
  name: string
  description: string
  badge?: string
  imageQuery: string
}

export interface Drink {
  id: string
  name: string
}

export interface Ingredient {
  id: string
  label: string
  detail: string
  angle: number
  distance: number
}

export interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  color: string
}
