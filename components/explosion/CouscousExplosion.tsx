'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const DEG2RAD = Math.PI / 180
const PLATE_R = 155   // plate radius px (inside a 310px circle)
const STAGE    = 660  // stage square size

interface Ingredient {
  id: string
  label: string
  detail: string
  angle: number          // degrees, 0 = right, 90 = down
  fill: string
  stroke: string
  shape: 'grain' | 'meat' | 'legume' | 'sultana'
  delay: number
}

const INGREDIENTS: Ingredient[] = [
  {
    id: 'couscous',
    label: 'Couscous Grain',
    detail: 'Hand-rolled semolina',
    angle: -55,
    fill: '#c4a030',
    stroke: '#f0d070',
    shape: 'grain',
    delay: 0,
  },
  {
    id: 'lamb',
    label: 'Lamb',
    detail: 'On the bone',
    angle: 40,
    fill: '#6b2020',
    stroke: '#e07060',
    shape: 'meat',
    delay: 0.15,
  },
  {
    id: 'chickpeas',
    label: 'Chickpeas',
    detail: 'Slow-soaked, tender',
    angle: 150,
    fill: '#a07828',
    stroke: '#e8c870',
    shape: 'legume',
    delay: 0.30,
  },
  {
    id: 'sultanas',
    label: 'Sultanas',
    detail: 'Sweet dark depth',
    angle: 248,
    fill: '#3a0e20',
    stroke: '#c070a0',
    shape: 'sultana',
    delay: 0.45,
  },
]

export default function CouscousExplosion() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const center = STAGE / 2

  return (
    <section
      id="explosion"
      ref={ref}
      className="relative bg-feelaj-black flex flex-col items-center justify-center overflow-hidden py-20"
    >
      {/* Radial ambient */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[520px] h-[520px] rounded-full bg-feelaj-gold/5 blur-3xl" />
      </div>

      {/* Headline */}
      <motion.div
        className="relative z-10 text-center mb-12 px-4"
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <p className="font-body text-feelaj-gold/60 tracking-[0.3em] text-xs uppercase mb-4">
          What&apos;s in the bowl
        </p>
        <h2 className="font-display text-5xl md:text-7xl text-feelaj-text font-light">
          Every grain,{' '}
          <span className="italic text-feelaj-gold">every cut.</span>
        </h2>
      </motion.div>

      {/* ── Explosion stage ── */}
      <div
        className="relative mx-auto"
        style={{
          width: STAGE,
          height: STAGE,
          /* scale down on small screens */
          maxWidth: '100vw',
          transform: 'scale(var(--stage-scale, 1))',
        }}
      >
        {/* CSS custom prop to shrink on mobile */}
        <style>{`
          @media (max-width: 720px) {
            :root { --stage-scale: 0.55; }
          }
          @media (min-width: 721px) and (max-width: 900px) {
            :root { --stage-scale: 0.78; }
          }
        `}</style>

        {/* Plate — lives dead-centre of stage */}
        <motion.div
          className="absolute"
          style={{
            left: center - PLATE_R,
            top: center - PLATE_R,
            width: PLATE_R * 2,
            height: PLATE_R * 2,
            perspective: 900,
          }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* 3D tilt */}
          <div
            className="w-full h-full rounded-full overflow-hidden"
            style={{
              transform: 'rotateX(22deg)',
              boxShadow:
                '0 40px 100px rgba(0,0,0,0.85), 0 0 0 2px rgba(201,168,76,0.35), 0 0 60px rgba(201,168,76,0.12)',
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=700&q=90"
              alt="Tunisian couscous plate"
              fill
              className="object-cover scale-110"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-feelaj-black/30" />
          </div>

          {/* Sheen ring */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.08) 0%, transparent 55%)',
            }}
          />
        </motion.div>

        {/* ── Ingredients ── */}
        {INGREDIENTS.map((ing) => {
          const rad      = ing.angle * DEG2RAD
          const cosA     = Math.cos(rad)
          const sinA     = Math.sin(rad)
          // where the blob sits at rest (on/near plate surface)
          const restX    = center + cosA * (PLATE_R * 0.62) - 36
          const restY    = center + sinA * (PLATE_R * 0.62) - 36
          // where it flies to when exploded
          const explDX   = cosA * (PLATE_R + 185)
          const explDY   = sinA * (PLATE_R + 185)

          return (
            <motion.div
              key={ing.id}
              className="absolute"
              style={{ left: restX, top: restY, zIndex: 20 }}
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={
                isInView
                  ? {
                      opacity: [0, 1, 1, 1, 1],
                      x: [0, explDX * 0.15, explDX, explDX * 0.05, 0],
                      y: [0, explDY * 0.15, explDY, explDY * 0.05, 0],
                      scale: [1, 1.1, 1.25, 1.1, 1],
                    }
                  : { opacity: 0 }
              }
              transition={{
                delay: 0.6 + ing.delay,
                duration: 4.2,
                times: [0, 0.08, 0.35, 0.65, 1],
                ease: 'easeInOut',
                repeat: Infinity,
                repeatDelay: 0.6,
              }}
            >
              <IngredientBlob ing={ing} />
            </motion.div>
          )
        })}
      </div>

      {/* Bottom badge */}
      <motion.p
        className="relative z-10 mt-4 font-body text-sm tracking-[0.2em] text-feelaj-text/30 text-center px-4"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.6 }}
      >
        Not Moroccan. Not Algerian.{' '}
        <span className="text-feelaj-gold">Tunisian.</span>
      </motion.p>
    </section>
  )
}

// ── One ingredient blob + dashed arrow + label ───────────────────────

function IngredientBlob({ ing }: { ing: Ingredient }) {
  const rad  = ing.angle * DEG2RAD
  const cosA = Math.cos(rad)
  const sinA = Math.sin(rad)

  // Arrow: from circle edge outward to label start
  const blobR     = 36
  const arrowLen  = 52
  const x1 = blobR + cosA * blobR
  const y1 = blobR + sinA * blobR
  const x2 = blobR + cosA * (blobR + arrowLen)
  const y2 = blobR + sinA * (blobR + arrowLen)

  // Label anchor — further out along same ray
  const lx = blobR + cosA * (blobR + arrowLen + 6)
  const ly = blobR + sinA * (blobR + arrowLen + 6)
  const labelLeft = cosA >= 0 ? lx : lx - 110
  const labelTop  = sinA >= 0 ? ly - 4 : ly - 34

  return (
    <div style={{ position: 'relative', width: blobR * 2, height: blobR * 2 }}>

      {/* SVG: dashed arrow */}
      <svg
        style={{ position: 'absolute', inset: 0, overflow: 'visible', pointerEvents: 'none' }}
        width={blobR * 2}
        height={blobR * 2}
      >
        <defs>
          <marker
            id={`hd-${ing.id}`}
            markerWidth="7" markerHeight="7"
            refX="6" refY="3.5"
            orient="auto"
          >
            <polyline
              points="0,0 6,3.5 0,7"
              fill="none"
              stroke={ing.stroke}
              strokeWidth="1.5"
              strokeOpacity="0.85"
            />
          </marker>
        </defs>
        <line
          x1={x1} y1={y1}
          x2={x2} y2={y2}
          stroke={ing.stroke}
          strokeWidth="1.5"
          strokeOpacity="0.75"
          strokeDasharray="5 3"
          markerEnd={`url(#hd-${ing.id})`}
        />
      </svg>

      {/* Circle blob */}
      <div
        style={{
          position: 'absolute',
          width: blobR * 2,
          height: blobR * 2,
          borderRadius: '50%',
          background: `radial-gradient(circle at 32% 28%, ${lighten(ing.fill, 0.4)}, ${ing.fill} 70%)`,
          boxShadow: `0 6px 28px ${ing.fill}90, 0 0 0 2px ${ing.stroke}55`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IngredientShape shape={ing.shape} color={ing.stroke} />
      </div>

      {/* Text label */}
      <div
        style={{
          position: 'absolute',
          left: labelLeft,
          top: labelTop,
          width: 110,
          pointerEvents: 'none',
          textAlign: cosA >= 0 ? 'left' : 'right',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-dm-sans), system-ui',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.08em',
            color: ing.stroke,
            lineHeight: 1.3,
          }}
        >
          {ing.label}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-dm-sans), system-ui',
            fontSize: 9.5,
            color: 'rgba(245,240,232,0.45)',
            lineHeight: 1.3,
            marginTop: 2,
          }}
        >
          {ing.detail}
        </p>
      </div>
    </div>
  )
}

// ── SVG shapes per ingredient ────────────────────────────────────────

function IngredientShape({ shape, color }: { shape: string; color: string }) {
  if (shape === 'grain') {
    // Golden semolina pellets
    const dots = [
      [9,9],[15,7],[21,10],[27,8],[10,16],[17,15],[24,16],
      [12,22],[20,23],[27,21],[9,28],[16,29],[24,27],
    ]
    return (
      <svg width={36} height={36} viewBox="0 0 36 36">
        {dots.map(([cx, cy], i) => (
          <ellipse key={i} cx={cx} cy={cy} rx={2.4} ry={1.6}
            fill={color} fillOpacity={0.75 + (i % 3) * 0.08}
            transform={`rotate(${i * 27} ${cx} ${cy})`}
          />
        ))}
      </svg>
    )
  }

  if (shape === 'meat') {
    // Lamb chunk with bone
    return (
      <svg width={36} height={36} viewBox="0 0 36 36">
        {/* meat chunk */}
        <ellipse cx={20} cy={22} rx={13} ry={9}
          fill={color} fillOpacity={0.9}
        />
        {/* bone shaft */}
        <rect x={14} y={8} width={4} height={15} rx={2}
          fill={color} fillOpacity={0.65}
        />
        {/* bone knob */}
        <circle cx={16} cy={7} r={5.5}
          fill="none" stroke={color} strokeWidth={2} strokeOpacity={0.7}
        />
        <circle cx={16} cy={7} r={2.5}
          fill={color} fillOpacity={0.6}
        />
        {/* marbling */}
        <path d="M11,20 Q16,17 21,21 Q24,19 27,22"
          stroke="rgba(0,0,0,0.25)" strokeWidth={1.2} fill="none"
        />
      </svg>
    )
  }

  if (shape === 'legume') {
    // Three chickpeas
    return (
      <svg width={36} height={36} viewBox="0 0 36 36">
        <circle cx={12} cy={21} r={7.5} fill={color} fillOpacity={0.92} />
        <circle cx={24} cy={21} r={7.5} fill={color} fillOpacity={0.92} />
        <circle cx={18} cy={13} r={7.5} fill={color} fillOpacity={0.88} />
        {/* crease */}
        <path d="M9,23 Q12,26.5 15,23" stroke="rgba(0,0,0,0.22)" strokeWidth={1.2} fill="none" />
        <path d="M21,23 Q24,26.5 27,23" stroke="rgba(0,0,0,0.22)" strokeWidth={1.2} fill="none" />
        <path d="M15,15 Q18,18.5 21,15" stroke="rgba(0,0,0,0.22)" strokeWidth={1.2} fill="none" />
      </svg>
    )
  }

  if (shape === 'sultana') {
    // Small oval raisins clustered
    const raisins: [number, number, number][] = [
      [11,14,15],[22,13,10],[17,22,12],[8,25,18],[26,23,8],[15,30,20],
    ]
    return (
      <svg width={36} height={36} viewBox="0 0 36 36">
        {raisins.map(([cx, cy, rot], i) => (
          <ellipse key={i} cx={cx} cy={cy} rx={4.5} ry={3}
            fill={color} fillOpacity={0.85 - i * 0.04}
            transform={`rotate(${rot} ${cx} ${cy})`}
          />
        ))}
      </svg>
    )
  }

  return null
}

// ── tiny color helper ────────────────────────────────────────────────
function lighten(hex: string, amount: number): string {
  const n = parseInt(hex.slice(1), 16)
  const r = Math.min(255, ((n >> 16) & 0xff) + Math.round(255 * amount))
  const g = Math.min(255, ((n >> 8) & 0xff) + Math.round(255 * amount))
  const b = Math.min(255, (n & 0xff) + Math.round(255 * amount))
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}
