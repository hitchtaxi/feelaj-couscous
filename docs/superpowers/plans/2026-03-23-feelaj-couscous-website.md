# Feelaj Couscous Website Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page, cinematic, dark-themed Tunisian food delivery website for Feelaj Couscous — featuring a physics-based couscous explosion interaction, Amal's story, deal tiers, and a WhatsApp ordering flow — deployed on Vercel.

**Architecture:** Single Next.js 15 App Router page rendered as a full scroll experience. Each section is an independent React component. The couscous explosion uses HTML5 Canvas for particle physics and Framer Motion for label animations. No backend, no database — static content, WhatsApp/phone for orders.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v3, Framer Motion v11, HTML5 Canvas, Google Fonts (Cormorant Garamond + DM Sans), Next.js Image, Vercel.

---

## File Structure

```
app/
  layout.tsx              # Root layout: fonts, global metadata, OG tags
  page.tsx                # Single page — composes all section components
  globals.css             # Tailwind directives + CSS custom properties

components/
  nav/
    Navbar.tsx            # Sticky nav: transparent → dark on scroll, hamburger
  hero/
    Hero.tsx              # Full-viewport cinematic hero with CTAs
  explosion/
    CouscousExplosion.tsx # Section wrapper + orchestrates canvas + labels
    ParticleCanvas.tsx    # HTML5 Canvas particle physics engine
    IngredientLabels.tsx  # SVG path draw + Framer Motion label entries
  story/
    StorySection.tsx      # White/cream section: Béja region + Amal's story
  menu/
    MenuSection.tsx       # 3 menu cards section
    MenuCard.tsx          # Individual menu card component
  deals/
    DealsSection.tsx      # All deal tier cards section
    DealCard.tsx          # Individual deal card
  events/
    EventsSection.tsx     # Wedding & events full-width pitch
  drinks/
    DrinksSection.tsx     # Drinks grid
  contact/
    ContactSection.tsx    # WhatsApp CTA + order info + delivery details
  footer/
    Footer.tsx            # Minimal footer

lib/
  constants.ts            # All data: menu items, deals, drinks, colors, copy
  types.ts                # TypeScript types: Deal, MenuItem, Drink, Ingredient
  particles.ts            # Particle physics pure functions (testable)

public/
  favicon.svg             # Gold "F" lettermark
  og-image.jpg            # Couscous bowl with Feelaj logotype

__tests__/
  lib/particles.test.ts   # Unit tests for particle physics functions
  lib/constants.test.ts   # Smoke tests: all deals have required fields
  components/DealCard.test.tsx
  components/MenuCard.test.tsx
  components/ContactSection.test.tsx
```

---

## Task 1: Project Initialisation

**Files:**
- Create: `package.json` (via npx)
- Create: `tailwind.config.ts`
- Create: `app/globals.css`
- Create: `lib/types.ts`
- Create: `lib/constants.ts`

- [ ] **Step 1: Scaffold Next.js 15 project**

```bash
cd "C:/Users/moeyk/new website"
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=no --import-alias="@/*"
```

When prompted: accept all defaults. This gives us Next.js 15 + TypeScript + Tailwind + ESLint + App Router.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install framer-motion
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event jest jest-environment-jsdom @types/jest ts-jest
```

- [ ] **Step 3: Configure Jest**

Create `jest.config.ts`:
```typescript
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEach: ['<rootDir>/jest.setup.ts'],
}

export default createJestConfig(config)
```

Create `jest.setup.ts`:
```typescript
import '@testing-library/jest-dom'
```

- [ ] **Step 4: Configure Tailwind with Feelaj design tokens**

Replace `tailwind.config.ts` with:
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'feelaj-black': '#0a0a0a',
        'feelaj-surface': '#141414',
        'feelaj-cream': '#faf8f4',
        'feelaj-text': '#f5f0e8',
        'feelaj-gold': '#c9a84c',
        'feelaj-red': '#8b1a1a',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
```

- [ ] **Step 5: Write TypeScript types**

Create `lib/types.ts`:
```typescript
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
  imageQuery: string  // Unsplash search query for image selection
}

export interface Drink {
  id: string
  name: string
}

export interface Ingredient {
  id: string
  label: string
  detail: string
  angle: number  // degrees from center (0 = top, clockwise)
  distance: number  // px from center
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
```

- [ ] **Step 6: Write constants — all site data in one place**

Create `lib/constants.ts`:
```typescript
import type { Deal, MenuItem, Drink, Ingredient } from './types'

export const DEALS: Deal[] = [
  {
    id: 'solo',
    name: 'Solo Meal',
    description: 'The full experience, just for you.',
    price: 22,
    includes: ['Couscous', 'Tunisian Tagine', 'Salata Mishweya', 'Salad'],
    drinks: 1,
  },
  {
    id: 'couple',
    name: 'Meal for Two',
    description: 'Perfect for couples. No kids required.',
    price: 38,
    includes: ['Couscous', 'Tunisian Tagine', 'Salata Mishweya', 'Salad'],
    drinks: 2,
  },
  {
    id: 'family-4',
    name: 'Family of 4',
    description: 'A proper family spread.',
    price: 60,
    includes: ['Couscous', 'Tunisian Tagine', 'Salata Mishweya', 'Salad'],
    drinks: 4,
    highlighted: true,
  },
  {
    id: 'family-7',
    name: 'Family of 7',
    description: 'For the bigger household.',
    price: 105,
    includes: ['Couscous', 'Tunisian Tagine', 'Salata Mishweya', 'Salad'],
    drinks: 7,
  },
  {
    id: 'family-10',
    name: 'Family of 10',
    description: 'Feed the whole crew.',
    price: 150,
    includes: ['Couscous', 'Tunisian Tagine', 'Salata Mishweya', 'Salad'],
    drinks: 10,
  },
  {
    id: 'event-20',
    name: 'Event of 20',
    description: 'Conferences, gatherings, celebrations.',
    price: 300,
    includes: ['Couscous', 'Tunisian Tagine', 'Salata Mishweya', 'Salad'],
    drinks: 20,
  },
  {
    id: 'wedding',
    name: 'Wedding / Large Event',
    description: 'We come to you. Fresh couscous, cooked on-site.',
    price: 'contact',
    includes: ['On-site cooking', 'Full spread', 'Custom serving'],
    drinks: 'included',
    highlighted: true,
  },
]

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'couscous',
    name: 'Tunisian Couscous',
    description:
      'Red, harissa-based, slow-cooked. Topped with chickpeas, sultanas, and lamb on the bone. The way it\'s served at weddings in northwest Tunisia.',
    badge: 'Our Signature',
    imageQuery: 'tunisian couscous bowl',
  },
  {
    id: 'tagine',
    name: 'Tunisian Tagine',
    description:
      'Don\'t confuse this with the Moroccan version. Tunisian tagine is a baked, layered dish — deeply spiced, rich, and unlike anything else.',
    imageQuery: 'tunisian tagine baked',
  },
  {
    id: 'salata',
    name: 'Salata Mishweya',
    description:
      'Fire-roasted peppers, tomatoes, garlic, olive oil. A Tunisian classic that cuts through the richness of the couscous perfectly.',
    imageQuery: 'tunisian salata mishweya roasted pepper',
  },
]

export const DRINKS: Drink[] = [
  { id: 'coke', name: 'Coke' },
  { id: 'solo', name: 'Solo' },
  { id: 'v-green', name: 'V Green' },
  { id: 'water', name: 'Water' },
  { id: 'sunkist', name: 'Sunkist' },
]

export const INGREDIENTS: Ingredient[] = [
  { id: 'semolina', label: 'Semolina', detail: 'hand-rolled, fine-grain', angle: 330, distance: 220 },
  { id: 'harissa', label: 'Harissa', detail: 'fire-roasted Tunisian chilli paste', angle: 30, distance: 240 },
  { id: 'chickpeas', label: 'Chickpeas', detail: 'slow-soaked, tender', angle: 70, distance: 230 },
  { id: 'sultanas', label: 'Sultanas', detail: 'for sweetness & depth', angle: 120, distance: 220 },
  { id: 'lamb', label: 'Lamb', detail: 'slow-cooked on the bone', angle: 160, distance: 240 },
  { id: 'saffron', label: 'Saffron broth', detail: 'golden, aromatic', angle: 210, distance: 230 },
  { id: 'ras-el-hanout', label: 'Ras el Hanout', detail: '12-spice blend', angle: 255, distance: 220 },
  { id: 'coriander', label: 'Fresh coriander', detail: 'finish & fragrance', angle: 295, distance: 230 },
]

export const WHATSAPP_NUMBER = '+61400000000' // placeholder — replace before launch
export const PHONE_NUMBER = '+61 4XX XXX XXX'  // placeholder — replace before launch
export const ORDER_WINDOW = '7:00pm – 11:00pm'
export const DELIVERY_WINDOW = 'next morning from 8:00am'
```

- [ ] **Step 7: Update globals.css**

Replace `app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font-cormorant: '';
  --font-dm-sans: '';
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: #0a0a0a;
  color: #f5f0e8;
}

/* Custom scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #0a0a0a; }
::-webkit-scrollbar-thumb { background: #c9a84c; border-radius: 3px; }
```

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: initialise Feelaj Couscous Next.js project with design tokens and constants"
```

---

## Task 2: Root Layout & Metadata

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Write layout with fonts and full SEO metadata**

Replace `app/layout.tsx`:
```typescript
import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'Feelaj Couscous — Authentic Tunisian Delivery, Sydney',
  description:
    'Order authentic Tunisian couscous, tagine, and Salata Mishweya delivered anywhere in Sydney. Family deals from $22. No delivery fee. Order 7pm–11pm.',
  openGraph: {
    title: 'Feelaj Couscous',
    description: 'Authentic Tunisian home cooking, delivered across Sydney.',
    images: ['/og-image.jpg'],
    type: 'website',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  )
}
```

- [ ] **Step 2: Create placeholder favicon**

Create `public/favicon.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#0a0a0a"/>
  <text x="16" y="24" text-anchor="middle" font-family="Georgia,serif"
    font-size="22" font-weight="600" fill="#c9a84c">F</text>
</svg>
```

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx public/favicon.svg
git commit -m "feat: add root layout with Cormorant Garamond + DM Sans fonts and SEO metadata"
```

---

## Task 3: Data Layer Tests

**Files:**
- Create: `__tests__/lib/constants.test.ts`
- Create: `__tests__/lib/particles.test.ts`
- Create: `lib/particles.ts`

- [ ] **Step 1: Write failing tests for constants data integrity**

Create `__tests__/lib/constants.test.ts`:
```typescript
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
```

- [ ] **Step 2: Run — expect pass (data is already correct)**

```bash
npx jest __tests__/lib/constants.test.ts --no-coverage
```
Expected: All PASS

- [ ] **Step 3: Write failing tests for particle physics**

Create `__tests__/lib/particles.test.ts`:
```typescript
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
    // With overwhelming probability, two random particles differ
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
```

- [ ] **Step 4: Run — expect FAIL (lib/particles.ts doesn't exist)**

```bash
npx jest __tests__/lib/particles.test.ts --no-coverage
```
Expected: FAIL — "Cannot find module '@/lib/particles'"

- [ ] **Step 5: Implement particle physics**

Create `lib/particles.ts`:
```typescript
import type { Particle } from './types'

const GRAVITY = 0.25
const DRAG = 0.97
const FADE = 0.018
const COLORS = ['#f5f0e8', '#c9a84c', '#d4a847', '#e8d5a0', '#8b6914']

export function createParticle(originX: number, originY: number): Particle {
  const angle = Math.random() * Math.PI * 2
  const speed = 3 + Math.random() * 8
  return {
    x: originX,
    y: originY,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed - 4, // slight upward bias
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

export function createBurst(originX: number, originY: number, count = 120): Particle[] {
  return Array.from({ length: count }, () => createParticle(originX, originY))
}
```

- [ ] **Step 6: Run — expect PASS**

```bash
npx jest __tests__/lib/particles.test.ts --no-coverage
```
Expected: All PASS

- [ ] **Step 7: Commit**

```bash
git add lib/particles.ts __tests__/lib/particles.test.ts __tests__/lib/constants.test.ts
git commit -m "feat: particle physics engine with full test coverage"
```

---

## Task 4: Navigation

**Files:**
- Create: `components/nav/Navbar.tsx`

- [ ] **Step 1: Build Navbar component**

Create `components/nav/Navbar.tsx`:
```typescript
'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Menu', href: '#menu' },
  { label: 'Deals', href: '#deals' },
  { label: 'Our Story', href: '#story' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between transition-all duration-500"
        animate={{
          backgroundColor: scrolled ? 'rgba(10,10,10,0.97)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(201,168,76,0.3)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <a href="#" className="font-display text-xl font-semibold tracking-widest text-feelaj-gold">
          FEELAJ COUSCOUS
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm tracking-wider text-feelaj-text/80 hover:text-feelaj-gold transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="font-body text-sm tracking-wider px-5 py-2 border border-feelaj-gold text-feelaj-gold hover:bg-feelaj-gold hover:text-feelaj-black transition-all"
          >
            Order Now
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-feelaj-gold transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-feelaj-gold transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-feelaj-gold transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-feelaj-black flex flex-col items-center justify-center gap-10"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-4xl text-feelaj-text hover:text-feelaj-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="font-body text-sm tracking-widest px-8 py-3 border border-feelaj-gold text-feelaj-gold hover:bg-feelaj-gold hover:text-feelaj-black transition-all mt-4"
            >
              ORDER NOW
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/nav/Navbar.tsx
git commit -m "feat: sticky navbar with scroll transition and mobile overlay"
```

---

## Task 5: Hero Section

**Files:**
- Create: `components/hero/Hero.tsx`

- [ ] **Step 1: Build Hero component**

Create `components/hero/Hero.tsx`:
```typescript
'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-feelaj-black">
      {/* Background couscous image with overlay */}
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
          <span className="italic text-feelaj-gold">it was meant to be.</span>
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
          <a
            href="#contact"
            className="font-body tracking-widest text-sm px-8 py-4 bg-feelaj-gold text-feelaj-black hover:bg-feelaj-gold/90 transition-all"
          >
            ORDER NOW
          </a>
          <a
            href="#deals"
            className="font-body tracking-widest text-sm px-8 py-4 border border-feelaj-text/40 text-feelaj-text hover:border-feelaj-gold hover:text-feelaj-gold transition-all"
          >
            SEE OUR DEALS
          </a>
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
```

**Note on the hero image:** The Unsplash URL above is a placeholder pattern. During implementation, search Unsplash for "tunisian couscous" or "north african couscous bowl overhead" and use a real image URL. Next.js Image requires the domain to be whitelisted in `next.config.ts`:

```typescript
// next.config.ts
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
}
export default nextConfig
```

- [ ] **Step 2: Add Unsplash domain to next.config.ts**

- [ ] **Step 3: Commit**

```bash
git add components/hero/Hero.tsx next.config.ts
git commit -m "feat: cinematic hero section with Framer Motion entry animations"
```

---

## Task 6: Particle Canvas (Couscous Explosion)

**Files:**
- Create: `components/explosion/ParticleCanvas.tsx`

- [ ] **Step 1: Build HTML5 Canvas particle renderer**

Create `components/explosion/ParticleCanvas.tsx`:
```typescript
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

  // Resize canvas to fill parent
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
```

- [ ] **Step 2: Commit**

```bash
git add components/explosion/ParticleCanvas.tsx
git commit -m "feat: HTML5 Canvas particle explosion engine"
```

---

## Task 7: Ingredient Labels (SVG Animated)

**Files:**
- Create: `components/explosion/IngredientLabels.tsx`

- [ ] **Step 1: Build animated ingredient label overlay**

Create `components/explosion/IngredientLabels.tsx`:
```typescript
'use client'
import { motion } from 'framer-motion'
import { INGREDIENTS } from '@/lib/constants'

interface IngredientLabelsProps {
  visible: boolean
  centerX: number
  centerY: number
}

function degToRad(deg: number) {
  return (deg * Math.PI) / 180
}

export default function IngredientLabels({
  visible,
  centerX,
  centerY,
}: IngredientLabelsProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="absolute inset-0 w-full h-full">
        {INGREDIENTS.map((ing, i) => {
          const rad = degToRad(ing.angle - 90)
          const endX = centerX + Math.cos(rad) * ing.distance
          const endY = centerY + Math.sin(rad) * ing.distance
          const midX = centerX + Math.cos(rad) * (ing.distance * 0.6)
          const midY = centerY + Math.sin(rad) * (ing.distance * 0.6)

          return (
            <motion.line
              key={ing.id}
              x1={centerX}
              y1={centerY}
              x2={endX}
              y2={endY}
              stroke="#c9a84c"
              strokeWidth="1"
              strokeOpacity="0.6"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={visible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
            />
          )
        })}
      </svg>

      {INGREDIENTS.map((ing, i) => {
        const rad = degToRad(ing.angle - 90)
        const endX = centerX + Math.cos(rad) * ing.distance
        const endY = centerY + Math.sin(rad) * ing.distance
        const isRight = Math.cos(rad) >= 0

        return (
          <motion.div
            key={ing.id}
            className={`absolute text-${isRight ? 'left' : 'right'}`}
            style={{
              left: endX,
              top: endY,
              transform: `translate(${isRight ? '8px' : 'calc(-100% - 8px)'}, -50%)`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.5 + i * 0.08, duration: 0.3 }}
          >
            <p className="font-display text-feelaj-gold text-sm font-semibold leading-tight">
              {ing.label}
            </p>
            <p className="font-body text-feelaj-text/60 text-xs leading-tight">
              {ing.detail}
            </p>
          </motion.div>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/explosion/IngredientLabels.tsx
git commit -m "feat: animated SVG ingredient labels for couscous explosion"
```

---

## Task 8: Couscous Explosion Section (Orchestrator)

**Files:**
- Create: `components/explosion/CouscousExplosion.tsx`

- [ ] **Step 1: Build the full explosion section**

Create `components/explosion/CouscousExplosion.tsx`:
```typescript
'use client'
import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
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
      // Reset
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
```

- [ ] **Step 2: Commit**

```bash
git add components/explosion/CouscousExplosion.tsx
git commit -m "feat: couscous explosion section with canvas particles and animated labels"
```

---

## Task 9: Amal's Story Section

**Files:**
- Create: `components/story/StorySection.tsx`

- [ ] **Step 1: Build the white Story section**

Create `components/story/StorySection.tsx`:
```typescript
'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

export default function StorySection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="story"
      ref={ref}
      className="bg-feelaj-cream text-feelaj-black py-24 px-6"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body tracking-[0.3em] text-xs uppercase text-feelaj-gold mb-6">
            The Origin
          </p>

          <h2 className="font-display text-5xl md:text-6xl font-light leading-tight mb-8">
            From the poorest kitchens<br />
            <span className="italic">come the greatest meals.</span>
          </h2>

          <div className="font-body text-feelaj-black/75 text-base leading-relaxed space-y-5">
            <p>
              The Béja region of northwest Tunisia — Gboulat, Mjaz el Bab, Testour,
              El Kef — is where Tunisia&apos;s wheat has grown for centuries. These are
              not wealthy towns. The families here have very little. But from those
              humble kitchens comes food so majestically crafted, so deeply flavoured,
              that it silences a table.
            </p>
            <p>
              When you have less, you cook with more intention. Every grain is counted.
              Every spice is earned. That is where couscous comes from — not a restaurant,
              not a factory. A family kitchen, a wood fire, and hands that know exactly
              what they are doing.
            </p>
            <p>
              <strong>Testour</strong>, built by Andalusian refugees in the 17th century,
              still carries their craftsmanship in its architecture and its malouf music.{' '}
              <strong>El Kef</strong>, one of the oldest continuously inhabited cities in
              Tunisia, watches over a valley from a Byzantine fortress.{' '}
              <strong>Mjaz el Bab</strong> and <strong>Gboulat</strong> sit along the
              Medjerda river — the lifeblood of Tunisian agriculture.
            </p>

            <div className="border-l-2 border-feelaj-gold pl-6 py-2 mt-8">
              <p className="font-display text-xl italic text-feelaj-black/90 leading-relaxed">
                Amal grew up in that world. Her father farmed organically — the old way,
                no shortcuts. Her mother cooked the same way. The recipes Amal learned
                were never written down. They lived in the hands, the smell, the sound
                of a pot.
              </p>
            </div>

            <p>
              She came to Sydney and looked around. She found Lebanese food, Turkish food,
              Moroccan food. But nothing Tunisian. Nothing real. She saw that gap not as a
              problem — but as an opportunity. She was optimistic from the start.
            </p>
            <p>
              She built <strong>Feelaj</strong> — the old word for the rural marketplace
              where people gathered to trade and eat — and she brought those recipes here.
              Every meal is still made the way her mother made it: organic, homemade,
              and without compromise.
            </p>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative h-[600px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1548610762-4d452b80e35a?w=800&q=80"
              alt="Rural Tunisia — wheat fields and traditional life"
              fill
              className="object-cover grayscale-[20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-feelaj-cream/30 to-transparent" />
          </div>
          {/* Caption */}
          <p className="font-body text-xs text-feelaj-black/40 mt-3 tracking-wider">
            Northwest Tunisia — Béja Governorate
          </p>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/story/StorySection.tsx
git commit -m "feat: Amal's story section with Béja region history and editorial copy"
```

---

## Task 10: Menu Section

**Files:**
- Create: `components/menu/MenuCard.tsx`
- Create: `components/menu/MenuSection.tsx`
- Create: `__tests__/components/MenuCard.test.tsx`

- [ ] **Step 1: Write failing MenuCard test**

Create `__tests__/components/MenuCard.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import MenuCard from '@/components/menu/MenuCard'

const mockItem = {
  id: 'couscous',
  name: 'Tunisian Couscous',
  description: 'Red, harissa-based.',
  badge: 'Our Signature',
  imageQuery: 'tunisian couscous',
}

describe('MenuCard', () => {
  it('renders the item name', () => {
    render(<MenuCard item={mockItem} featured={false} />)
    expect(screen.getByText('Tunisian Couscous')).toBeInTheDocument()
  })

  it('renders the badge when provided', () => {
    render(<MenuCard item={mockItem} featured={false} />)
    expect(screen.getByText('Our Signature')).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(<MenuCard item={mockItem} featured={false} />)
    expect(screen.getByText('Red, harissa-based.')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run — expect FAIL**

```bash
npx jest __tests__/components/MenuCard.test.tsx --no-coverage
```

- [ ] **Step 3: Implement MenuCard**

Create `components/menu/MenuCard.tsx`:
```typescript
import Image from 'next/image'
import type { MenuItem } from '@/lib/types'

// Curated Unsplash image map — replace with real photos when available
const IMAGE_MAP: Record<string, string> = {
  couscous: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80',
  tagine: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=600&q=80',
  salata: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80',
}

interface MenuCardProps {
  item: MenuItem
  featured?: boolean
}

export default function MenuCard({ item, featured = false }: MenuCardProps) {
  return (
    <div
      className={`relative overflow-hidden group transition-all duration-500
        ${featured
          ? 'md:col-span-1 ring-1 ring-feelaj-gold/50 hover:ring-feelaj-gold shadow-[0_0_40px_rgba(201,168,76,0.1)] hover:shadow-[0_0_60px_rgba(201,168,76,0.2)]'
          : 'ring-1 ring-white/10 hover:ring-white/20'
        }`}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={IMAGE_MAP[item.id] ?? IMAGE_MAP.couscous}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {featured && (
          <div className="absolute inset-0 bg-gradient-to-t from-feelaj-black via-transparent to-transparent" />
        )}
      </div>

      {/* Content */}
      <div className="p-6 bg-feelaj-surface">
        {item.badge && (
          <span className="inline-block font-body text-xs tracking-widest text-feelaj-gold border border-feelaj-gold/40 px-3 py-1 mb-4">
            {item.badge}
          </span>
        )}
        <h3 className="font-display text-2xl text-feelaj-text mb-3">{item.name}</h3>
        <p className="font-body text-feelaj-text/60 text-sm leading-relaxed">{item.description}</p>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run — expect PASS**

```bash
npx jest __tests__/components/MenuCard.test.tsx --no-coverage
```

- [ ] **Step 5: Build MenuSection**

Create `components/menu/MenuSection.tsx`:
```typescript
'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MENU_ITEMS } from '@/lib/constants'
import MenuCard from './MenuCard'

export default function MenuSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="menu" ref={ref} className="bg-feelaj-black py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="font-body tracking-[0.3em] text-xs uppercase text-feelaj-gold mb-4">
            The Menu
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-feelaj-text font-light">
            Three dishes. <span className="italic text-feelaj-gold">One centrepiece.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {MENU_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
            >
              <MenuCard item={item} featured={item.id === 'couscous'} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add components/menu/ __tests__/components/MenuCard.test.tsx
git commit -m "feat: menu section with 3 cards, couscous featured"
```

---

## Task 11: Deals Section

**Files:**
- Create: `components/deals/DealCard.tsx`
- Create: `components/deals/DealsSection.tsx`
- Create: `__tests__/components/DealCard.test.tsx`

- [ ] **Step 1: Write failing DealCard test**

Create `__tests__/components/DealCard.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import DealCard from '@/components/deals/DealCard'

const mockDeal = {
  id: 'solo',
  name: 'Solo Meal',
  description: 'The full experience, just for you.',
  price: 22,
  includes: ['Couscous', 'Tagine', 'Salata Mishweya', 'Salad'],
  drinks: 1,
}

describe('DealCard', () => {
  it('renders deal name', () => {
    render(<DealCard deal={mockDeal} />)
    expect(screen.getByText('Solo Meal')).toBeInTheDocument()
  })

  it('renders formatted price', () => {
    render(<DealCard deal={mockDeal} />)
    expect(screen.getByText('$22')).toBeInTheDocument()
  })

  it('renders contact text for contact price', () => {
    render(<DealCard deal={{ ...mockDeal, price: 'contact' }} />)
    expect(screen.getByText(/contact/i)).toBeInTheDocument()
  })

  it('renders all includes', () => {
    render(<DealCard deal={mockDeal} />)
    expect(screen.getByText('Couscous')).toBeInTheDocument()
    expect(screen.getByText('Tagine')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run — expect FAIL**

```bash
npx jest __tests__/components/DealCard.test.tsx --no-coverage
```

- [ ] **Step 3: Implement DealCard**

Create `components/deals/DealCard.tsx`:
```typescript
import type { Deal } from '@/lib/types'

interface DealCardProps {
  deal: Deal
}

export default function DealCard({ deal }: DealCardProps) {
  const isWedding = deal.price === 'contact'

  return (
    <div
      className={`relative p-6 transition-all duration-300 group
        ${deal.highlighted
          ? 'ring-1 ring-feelaj-gold bg-feelaj-surface hover:shadow-[0_0_40px_rgba(201,168,76,0.15)]'
          : 'ring-1 ring-white/10 bg-feelaj-surface hover:ring-feelaj-gold/40'
        }
        ${isWedding ? 'md:col-span-2 bg-gradient-to-br from-feelaj-surface to-feelaj-black' : ''}
      `}
    >
      {deal.highlighted && !isWedding && (
        <span className="absolute -top-3 left-6 font-body text-xs tracking-widest bg-feelaj-gold text-feelaj-black px-3 py-1">
          POPULAR
        </span>
      )}

      <div className="flex items-start justify-between mb-4">
        <h3 className="font-display text-2xl text-feelaj-text">{deal.name}</h3>
        <div className="text-right">
          {isWedding ? (
            <span className="font-body text-feelaj-gold text-sm tracking-wider">Contact for quote</span>
          ) : (
            <>
              <span className="font-display text-3xl text-feelaj-gold">${deal.price as number}</span>
            </>
          )}
        </div>
      </div>

      <p className="font-body text-feelaj-text/50 text-sm mb-5">{deal.description}</p>

      <ul className="space-y-1.5">
        {deal.includes.map((item) => (
          <li key={item} className="font-body text-sm text-feelaj-text/70 flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-feelaj-gold flex-shrink-0" />
            {item}
          </li>
        ))}
        {typeof deal.drinks === 'number' && (
          <li className="font-body text-sm text-feelaj-text/70 flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-feelaj-gold flex-shrink-0" />
            {deal.drinks} drink{deal.drinks > 1 ? 's' : ''} (your choice)
          </li>
        )}
        {deal.drinks === 'included' && (
          <li className="font-body text-sm text-feelaj-text/70 flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-feelaj-gold flex-shrink-0" />
            Drinks included
          </li>
        )}
      </ul>

      {isWedding && (
        <a
          href="#contact"
          className="inline-block mt-6 font-body text-xs tracking-widest px-6 py-3 border border-feelaj-gold text-feelaj-gold hover:bg-feelaj-gold hover:text-feelaj-black transition-all"
        >
          ENQUIRE NOW →
        </a>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Run — expect PASS**

```bash
npx jest __tests__/components/DealCard.test.tsx --no-coverage
```

- [ ] **Step 5: Build DealsSection**

Create `components/deals/DealsSection.tsx`:
```typescript
'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { DEALS } from '@/lib/constants'
import DealCard from './DealCard'

export default function DealsSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="deals" ref={ref} className="bg-feelaj-black py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="font-body tracking-[0.3em] text-xs uppercase text-feelaj-gold mb-4">
            The Deals
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-feelaj-text font-light">
            Feed yourself.{' '}
            <span className="italic text-feelaj-gold">Feed your family.</span>
            <br />Feed the whole event.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEALS.map((deal, i) => (
            <motion.div
              key={deal.id}
              className={deal.id === 'wedding' ? 'sm:col-span-2 lg:col-span-3' : ''}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
            >
              <DealCard deal={deal} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add components/deals/ __tests__/components/DealCard.test.tsx
git commit -m "feat: deals section with all 7 tiers, wedding card spans full width"
```

---

## Task 12: Events, Drinks, Contact, Footer

**Files:**
- Create: `components/events/EventsSection.tsx`
- Create: `components/drinks/DrinksSection.tsx`
- Create: `components/contact/ContactSection.tsx`
- Create: `components/footer/Footer.tsx`
- Create: `__tests__/components/ContactSection.test.tsx`

- [ ] **Step 1: Write failing ContactSection test**

Create `__tests__/components/ContactSection.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react'
import ContactSection from '@/components/contact/ContactSection'

describe('ContactSection', () => {
  it('renders WhatsApp order button', () => {
    render(<ContactSection />)
    expect(screen.getByRole('link', { name: /whatsapp/i })).toBeInTheDocument()
  })

  it('renders order window information', () => {
    render(<ContactSection />)
    expect(screen.getByText(/7:00pm/i)).toBeInTheDocument()
  })

  it('renders Sydney delivery copy', () => {
    render(<ContactSection />)
    expect(screen.getByText(/sydney/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run — expect FAIL**

```bash
npx jest __tests__/components/ContactSection.test.tsx --no-coverage
```

- [ ] **Step 3: Implement all four remaining sections**

Create `components/events/EventsSection.tsx`:
```typescript
'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function EventsSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative bg-feelaj-surface py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: 'repeating-linear-gradient(45deg, #c9a84c 0, #c9a84c 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }}
      />
      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="font-body tracking-[0.3em] text-xs uppercase text-feelaj-gold mb-6">
            Weddings & Events
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-feelaj-text font-light mb-8">
            We bring the<br />
            <span className="italic text-feelaj-gold">kitchen to you.</span>
          </h2>
          <p className="font-body text-feelaj-text/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            For weddings, corporate events, and gatherings of 20 or more — we come to your venue
            and cook fresh on-site. The way it&apos;s done at Tunisian weddings: the whole tent fills
            with the smell of couscous, and everyone eats together.
          </p>
          <a
            href="#contact"
            className="inline-block font-body text-sm tracking-widest px-10 py-4 border border-feelaj-gold text-feelaj-gold hover:bg-feelaj-gold hover:text-feelaj-black transition-all"
          >
            ENQUIRE ABOUT YOUR EVENT →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
```

Create `components/drinks/DrinksSection.tsx`:
```typescript
'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { DRINKS } from '@/lib/constants'

export default function DrinksSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="bg-feelaj-black py-16 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="font-body tracking-[0.3em] text-xs uppercase text-feelaj-gold mb-8">
            Drinks — Included in every deal
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {DRINKS.map((drink) => (
              <span
                key={drink.id}
                className="font-body text-sm text-feelaj-text/70 px-5 py-2 border border-white/10 tracking-wide"
              >
                {drink.name}
              </span>
            ))}
          </div>
          <p className="font-body text-feelaj-text/30 text-xs mt-6 tracking-wider">
            More options coming soon.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
```

Create `components/contact/ContactSection.tsx`:
```typescript
'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { WHATSAPP_NUMBER, PHONE_NUMBER, ORDER_WINDOW, DELIVERY_WINDOW } from '@/lib/constants'

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent("Hi, I'd like to place an order from Feelaj Couscous.")}`

  return (
    <section id="contact" ref={ref} className="bg-feelaj-surface py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="font-body tracking-[0.3em] text-xs uppercase text-feelaj-gold mb-6">
            Order Now
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-feelaj-text font-light mb-6">
            Ready to order?
          </h2>
          <p className="font-body text-feelaj-text/60 text-base mb-4 leading-relaxed">
            Orders taken <span className="text-feelaj-gold">{ORDER_WINDOW}</span>.
            Your food is freshly made and delivered <span className="text-feelaj-gold">{DELIVERY_WINDOW}</span>.
            No delivery fee. No minimum order.
          </p>
          <p className="font-body text-feelaj-text/40 text-sm mb-10">
            Simply WhatsApp or call us with your deal choice, address, and preferred delivery time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp order"
              className="flex items-center justify-center gap-3 font-body text-sm tracking-widest px-10 py-4 bg-[#25D366] text-white hover:bg-[#1ebe5c] transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              ORDER ON WHATSAPP
            </a>
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex items-center justify-center gap-3 font-body text-sm tracking-widest px-10 py-4 border border-feelaj-gold text-feelaj-gold hover:bg-feelaj-gold hover:text-feelaj-black transition-all"
            >
              CALL TO ORDER
            </a>
          </div>

          <div className="border-t border-white/10 pt-10">
            <p className="font-body text-feelaj-text/40 text-sm tracking-wide leading-relaxed">
              We deliver across all of Sydney — Western Suburbs, Eastern Suburbs,<br />
              Southern Suburbs, Northern Beaches, CBD, and everywhere in between.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

Create `components/footer/Footer.tsx`:
```typescript
export default function Footer() {
  return (
    <footer className="bg-feelaj-black border-t border-white/5 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-display text-lg text-feelaj-gold tracking-widest">FEELAJ COUSCOUS</p>
          <p className="font-body text-feelaj-text/30 text-xs mt-1 tracking-wider">
            From the kitchens of northwest Tunisia to your door.
          </p>
        </div>
        <nav className="flex gap-8">
          {[
            { label: 'Menu', href: '#menu' },
            { label: 'Deals', href: '#deals' },
            { label: 'Our Story', href: '#story' },
            { label: 'Order', href: '#contact' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-xs text-feelaj-text/40 hover:text-feelaj-gold transition-colors tracking-wider"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <p className="font-body text-feelaj-text/20 text-xs tracking-wider">
          Sydney, Australia
        </p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Run ContactSection test — expect PASS**

```bash
npx jest __tests__/components/ContactSection.test.tsx --no-coverage
```

- [ ] **Step 5: Commit**

```bash
git add components/events/ components/drinks/ components/contact/ components/footer/ __tests__/components/ContactSection.test.tsx
git commit -m "feat: events, drinks, contact, and footer sections"
```

---

## Task 13: Compose the Full Page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Wire all sections together**

Replace `app/page.tsx`:
```typescript
import Navbar from '@/components/nav/Navbar'
import Hero from '@/components/hero/Hero'
import CouscousExplosion from '@/components/explosion/CouscousExplosion'
import StorySection from '@/components/story/StorySection'
import MenuSection from '@/components/menu/MenuSection'
import DealsSection from '@/components/deals/DealsSection'
import EventsSection from '@/components/events/EventsSection'
import DrinksSection from '@/components/drinks/DrinksSection'
import ContactSection from '@/components/contact/ContactSection'
import Footer from '@/components/footer/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <CouscousExplosion />
      <StorySection />
      <MenuSection />
      <DealsSection />
      <EventsSection />
      <DrinksSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 2: Run dev server and visually verify**

```bash
npm run dev
```

Open `http://localhost:3000` and check:
- [ ] Nav is transparent, goes dark on scroll
- [ ] Hero renders with image and CTAs
- [ ] Couscous bowl section loads and click triggers explosion
- [ ] Story section is cream/white with text
- [ ] Menu shows 3 cards
- [ ] Deals shows all 7 tiers
- [ ] Events, Drinks, Contact, Footer all render
- [ ] Mobile layout works (use browser devtools)

- [ ] **Step 3: Run all tests**

```bash
npx jest --no-coverage
```
Expected: All PASS

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: compose full Feelaj Couscous single-page site"
```

---

## Task 14: Polish Pass

**Files:**
- Various minor tweaks across components

- [ ] **Step 1: Add scroll-triggered section dividers**

Between dark sections, add a subtle gold hairline divider (1px, 20% opacity) to give visual breathing room. Add to `globals.css`:
```css
.section-divider {
  width: 60px;
  height: 1px;
  background: #c9a84c;
  opacity: 0.4;
  margin: 0 auto;
}
```

- [ ] **Step 2: Generate Apple touch icon**

Create `public/apple-touch-icon.png` — a 180×180 PNG version of the favicon (gold "F" on dark background). Use any online SVG-to-PNG converter, or run:
```bash
# If sharp is available:
npx sharp-cli --input public/favicon.svg --output public/apple-touch-icon.png --resize 180
# Or just create a simple 180x180 dark square with gold F using any image editor
```

- [ ] **Step 3: Verify all Framer Motion animations feel smooth**

Check: fade-up on scroll works for each section. If any section animates too early/late, adjust the `margin` in `useInView`.

- [ ] **Step 3: Verify mobile across breakpoints**

Test at 375px (iPhone SE), 390px (iPhone 14), 768px (iPad), 1280px (desktop). Fix any overflow or spacing issues.

- [ ] **Step 4: Replace placeholder Unsplash image IDs with real searches**

Search Unsplash manually for:
- "tunisian couscous lamb" → **hero background** + **couscous explosion bowl** + couscous menu card
- "tunisian tagine baked eggs" → tagine card
- "tunisian salata mishweya" → salata card
- "northwest tunisia wheat fields" → story section

Update the `src` props with real URLs. All Unsplash URLs follow: `https://images.unsplash.com/photo-{ID}?w={width}&q=80`

- [ ] **Step 5: Final test run**

```bash
npx jest --no-coverage
npm run build
```

Expected: All tests PASS. Build succeeds with no errors.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "feat: Feelaj Couscous website — complete, polished, production-ready"
```

---

## Task 15: Vercel Deployment

- [ ] **Step 1: Push to GitHub**

```bash
git remote add origin https://github.com/<username>/feelaj-couscous.git
git push -u origin main
```

- [ ] **Step 2: Deploy to Vercel**

- Go to vercel.com → New Project → Import from GitHub
- Select the repo
- Framework: Next.js (auto-detected)
- Deploy

- [ ] **Step 3: Update WhatsApp and phone number before sharing**

In `lib/constants.ts`, replace:
```typescript
export const WHATSAPP_NUMBER = '+61400000000'
export const PHONE_NUMBER = '+61 4XX XXX XXX'
```
with the real numbers when ready.

---

## Summary

| Task | What it delivers |
|---|---|
| 1 | Project scaffold, Tailwind tokens, all data constants |
| 2 | Root layout, fonts, SEO metadata, favicon |
| 3 | Particle physics engine (tested) + data integrity tests |
| 4 | Sticky navbar with mobile overlay |
| 5 | Cinematic hero section |
| 6 | HTML5 Canvas particle burst engine |
| 7 | SVG animated ingredient labels |
| 8 | Full couscous explosion interaction |
| 9 | Amal's story — white section with Béja region history |
| 10 | Menu section — 3 cards, couscous featured |
| 11 | Deals section — all 7 tiers |
| 12 | Events, Drinks, Contact (WhatsApp), Footer |
| 13 | Full page composition + visual QA |
| 14 | Polish pass — dividers, mobile, images, final build |
| 15 | Vercel deployment |
