'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const DEG2RAD = Math.PI / 180
const STAGE   = 680
const C       = STAGE / 2          // centre of stage (340)
const PLATE_R = 130                // drawn plate radius
const EXPLODE  = 270               // how far out ingredients fly

interface Ing {
  id: string; label: string; detail: string
  angle: number; delay: number
}

const INGREDIENTS: Ing[] = [
  { id: 'grain',     label: 'Couscous',   detail: 'Hand-rolled semolina',   angle: -55,  delay: 0    },
  { id: 'lambchop',  label: 'Lamb Chop',  detail: 'On the bone, fall-apart', angle:  40,  delay: 0.14 },
  { id: 'chickpea',  label: 'Chickpeas',  detail: 'Slow-soaked, tender',     angle: 155,  delay: 0.28 },
  { id: 'sultana',   label: 'Sultanas',   detail: 'Sweet dark depth',        angle: 250,  delay: 0.42 },
]

export default function CouscousExplosion() {
  const ref     = useRef<HTMLElement>(null)
  const inView  = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="explosion"
      ref={ref}
      className="relative bg-feelaj-black flex flex-col items-center justify-center overflow-hidden py-20"
    >
      {/* Glow backdrop */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[480px] h-[480px] rounded-full bg-feelaj-gold/6 blur-3xl" />
      </div>

      {/* Headline */}
      <motion.div
        className="relative z-10 text-center mb-10 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
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

      {/* ── Stage ── */}
      <div
        className="relative mx-auto"
        style={{
          width: STAGE,
          height: STAGE,
          transform: 'scale(var(--xscale,1))',
          transformOrigin: 'top center',
        }}
      >
        <style>{`
          @media(max-width:720px){ :root{--xscale:0.52} }
          @media(min-width:721px) and (max-width:920px){ :root{--xscale:0.78} }
        `}</style>

        {/* ── Plate SVG (static, centred) ── */}
        <motion.div
          className="absolute"
          style={{ left: C - PLATE_R, top: C - PLATE_R }}
          initial={{ opacity: 0, scale: 0.75 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <PlateIllustration r={PLATE_R} />
        </motion.div>

        {/* ── Animated ingredients ── */}
        {INGREDIENTS.map(ing => {
          const rad   = ing.angle * DEG2RAD
          const cosA  = Math.cos(rad)
          const sinA  = Math.sin(rad)
          // rest position: near the edge of the couscous mound
          const restX = C + cosA * (PLATE_R * 0.52) - 40
          const restY = C + sinA * (PLATE_R * 0.52) - 40
          // explosion target
          const dx = cosA * EXPLODE
          const dy = sinA * EXPLODE

          return (
            <motion.div
              key={ing.id}
              className="absolute z-20"
              style={{ left: restX, top: restY }}
              initial={{ opacity: 0 }}
              animate={inView ? {
                opacity: [0, 1, 1, 1, 1, 1],
                x: [0, dx * 0.05, dx, dx * 0.98, dx * 0.03, 0],
                y: [0, dy * 0.05, dy, dy * 0.98, dy * 0.03, 0],
                scale:[1, 1,  1.3,  1.25,  1.05,  1],
              } : { opacity: 0 }}
              transition={{
                delay:       0.5 + ing.delay,
                duration:    4.0,
                times:       [0, 0.06, 0.30, 0.55, 0.82, 1],
                ease:        'easeInOut',
                repeat:      Infinity,
                repeatDelay: 0.8,
              }}
            >
              <IngredientCard ing={ing} />
            </motion.div>
          )
        })}
      </div>

      {/* Badge */}
      <motion.p
        className="relative z-10 mt-2 font-body text-sm tracking-[0.2em] text-feelaj-text/30 text-center px-4"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.4 }}
      >
        Not Moroccan. Not Algerian.{' '}
        <span className="text-feelaj-gold">Tunisian.</span>
      </motion.p>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PLATE ILLUSTRATION — white ceramic plate with couscous mound
// ─────────────────────────────────────────────────────────────────────────────
function PlateIllustration({ r }: { r: number }) {
  const d = r * 2
  return (
    <svg width={d} height={d} viewBox={`0 0 ${d} ${d}`}>
      <defs>
        {/* plate shadow */}
        <radialGradient id="plateShadow" cx="50%" cy="62%" r="50%">
          <stop offset="0%"   stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.55" />
        </radialGradient>
        {/* couscous grain texture */}
        <pattern id="grainPat" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1"  fill="#c8a030" fillOpacity="0.7"/>
          <circle cx="4.5" cy="4"   r="0.8" fill="#d4b040" fillOpacity="0.5"/>
        </pattern>
      </defs>

      {/* Drop shadow */}
      <ellipse cx={r} cy={r + 18} rx={r * 0.88} ry={r * 0.22}
        fill="rgba(0,0,0,0.5)" />

      {/* Plate body */}
      <circle cx={r} cy={r} r={r - 2}
        fill="#f5f0e8"
        stroke="#e0d8cc" strokeWidth="1.5" />

      {/* Rim inner shadow ring */}
      <circle cx={r} cy={r} r={r - 14}
        fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="8" />

      {/* Plate inner well */}
      <circle cx={r} cy={r} r={r - 18} fill="#ede8df" />

      {/* Couscous mound base — reddish-orange harissa-stained base */}
      <ellipse cx={r} cy={r + 8} rx={r * 0.65} ry={r * 0.52}
        fill="#b85020" fillOpacity="0.55" />

      {/* Couscous golden mound */}
      <ellipse cx={r} cy={r + 4} rx={r * 0.60} ry={r * 0.46}
        fill="#d4a830" />
      <ellipse cx={r} cy={r + 2} rx={r * 0.55} ry={r * 0.40}
        fill="#e0b840" />
      <ellipse cx={r} cy={r} rx={r * 0.50} ry={r * 0.35}
        fill="url(#grainPat)" />

      {/* Grain texture overlay */}
      <ellipse cx={r} cy={r} rx={r * 0.50} ry={r * 0.35}
        fill="url(#grainPat)" fillOpacity="0.9" />

      {/* Highlight on mound */}
      <ellipse cx={r - 14} cy={r - 18} rx={28} ry={16}
        fill="rgba(255,240,180,0.18)" />

      {/* Shadow under texture */}
      <ellipse cx={r} cy={r + 6} rx={r * 0.48} ry={r * 0.32}
        fill="url(#plateShadow)" fillOpacity="0.3" />

      {/* A few harissa drizzle dots */}
      {[[r+22,r-28],[r-30,r-10],[r+10,r+25],[r-18,r+30]].map(([cx,cy],i)=>(
        <circle key={i} cx={cx} cy={cy} r={3.5}
          fill="#8b2010" fillOpacity={0.7 - i*0.08} />
      ))}

      {/* Rim sheen */}
      <path
        d={`M ${r * 0.32 + r},${r - r * 0.94} A ${r * 0.97} ${r * 0.97} 0 0 1 ${r + r * 0.68},${r - r * 0.7}`}
        fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="6" strokeLinecap="round"
      />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// INGREDIENT CARD — drawing + arrow + label
// ─────────────────────────────────────────────────────────────────────────────
function IngredientCard({ ing }: { ing: Ing }) {
  const rad  = ing.angle * DEG2RAD
  const cosA = Math.cos(rad)
  const sinA = Math.sin(rad)

  // Arrow from blob edge toward label
  const size  = 80
  const half  = size / 2
  const edgeX = half + cosA * (half - 4)
  const edgeY = half + sinA * (half - 4)
  const tipX  = half + cosA * (half + 44)
  const tipY  = half + sinA * (half + 44)

  // Label placement
  const lx = half + cosA * (half + 50) + (cosA >= 0 ? 0 : -116)
  const ly = half + sinA * (half + 50) + (sinA >= 0 ? -4 : -36)

  const COLORS: Record<string, { bg: string; rim: string; glow: string }> = {
    grain:    { bg: '#1a1200', rim: '#d4a830', glow: '#c9a84c' },
    lambchop: { bg: '#1a0606', rim: '#c07050', glow: '#e08060' },
    chickpea: { bg: '#120e00', rim: '#c49830', glow: '#e0b840' },
    sultana:  { bg: '#12040c', rim: '#a04070', glow: '#c06090' },
  }
  const col = COLORS[ing.id] ?? COLORS.grain

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      {/* Arrow SVG */}
      <svg style={{ position:'absolute', inset:0, overflow:'visible', pointerEvents:'none' }}
        width={size} height={size}>
        <defs>
          <marker id={`arr-${ing.id}`} markerWidth="8" markerHeight="8"
            refX="6" refY="4" orient="auto">
            <polyline points="0,0 6,4 0,8" fill="none"
              stroke={col.rim} strokeWidth="1.5" strokeOpacity="0.9"/>
          </marker>
        </defs>
        <line x1={edgeX} y1={edgeY} x2={tipX} y2={tipY}
          stroke={col.rim} strokeWidth="1.5" strokeOpacity="0.8"
          strokeDasharray="5 3"
          markerEnd={`url(#arr-${ing.id})`} />
      </svg>

      {/* Circle container */}
      <div style={{
        width: size, height: size, borderRadius: '50%',
        background: col.bg,
        border: `2px solid ${col.rim}70`,
        boxShadow: `0 0 28px ${col.glow}60, 0 8px 24px rgba(0,0,0,0.6)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {ing.id === 'grain'    && <GrainSVG />}
        {ing.id === 'lambchop' && <LambChopSVG />}
        {ing.id === 'chickpea' && <ChickpeaSVG />}
        {ing.id === 'sultana'  && <SultanaSVG />}
      </div>

      {/* Label */}
      <div style={{
        position: 'absolute',
        left: lx, top: ly,
        width: 116,
        pointerEvents: 'none',
        textAlign: cosA >= 0 ? 'left' : 'right',
      }}>
        <p style={{
          fontFamily: 'var(--font-dm-sans, system-ui)',
          fontSize: 12, fontWeight: 700,
          letterSpacing: '0.07em',
          color: col.rim, lineHeight: 1.3,
        }}>{ing.label}</p>
        <p style={{
          fontFamily: 'var(--font-dm-sans, system-ui)',
          fontSize: 9.5, color: 'rgba(245,240,232,0.45)',
          lineHeight: 1.3, marginTop: 2,
        }}>{ing.detail}</p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SVG ingredient illustrations
// ─────────────────────────────────────────────────────────────────────────────

function GrainSVG() {
  // Golden semolina pellets — tiny elongated grains in a pile
  const grains: [number,number,number][] = [
    [22,14,  8],[34,16, 50],[46,14, 120],[58,16, 20],[30,22,  90],
    [42,21, 140],[54,22,  60],[18,28, 30],[28,29, 100],[40,28,  15],
    [52,30, 80],[62,27, 150],[24,36, 55],[36,35, 130],[48,36,  40],
    [58,35,  95],[30,42,  20],[42,41, 110],[54,42,  65],[46,48, 140],
  ]
  return (
    <svg width="80" height="62" viewBox="0 0 80 62">
      {grains.map(([cx,cy,rot],i)=>(
        <ellipse key={i} cx={cx} cy={cy} rx={4.2} ry={2}
          fill={i%3===0?'#f0d060':i%3===1?'#d4a830':'#e8c050'}
          fillOpacity={0.85+Math.sin(i)*0.12}
          transform={`rotate(${rot} ${cx} ${cy})`}/>
      ))}
      {/* Highlight */}
      <ellipse cx={36} cy={26} rx={18} ry={8}
        fill="rgba(255,240,160,0.18)" />
    </svg>
  )
}

function LambChopSVG() {
  // Lollipop-style lamb chop: round meat at top, long thin bone handle
  return (
    <svg width="80" height="80" viewBox="0 0 80 80">
      {/* Bone shaft */}
      <rect x="36" y="24" width="8" height="42" rx="4"
        fill="#ece8e0" />
      {/* Fat ring (white fat around base of meat) */}
      <circle cx="40" cy="26" r="22"
        fill="#f0ece4" />
      {/* Meat — main round muscle */}
      <circle cx="40" cy="26" r="18"
        fill="#a03028" />
      {/* Meat gradient for depth */}
      <circle cx="40" cy="26" r="18"
        fill="url(#meatgrad)" />
      <defs>
        <radialGradient id="meatgrad" cx="38%" cy="32%" r="60%">
          <stop offset="0%" stopColor="#c84040" />
          <stop offset="60%" stopColor="#8b2020" />
          <stop offset="100%" stopColor="#5a1010" />
        </radialGradient>
      </defs>
      {/* Marbling lines */}
      <path d="M28,22 Q35,18 42,24 Q48,20 54,26"
        stroke="rgba(240,200,180,0.35)" strokeWidth="1.8" fill="none"/>
      <path d="M30,30 Q38,26 46,32"
        stroke="rgba(240,200,180,0.25)" strokeWidth="1.4" fill="none"/>
      {/* Fat edge (lighter outer ring) */}
      <circle cx="40" cy="26" r="18"
        fill="none" stroke="#e8c0a0" strokeWidth="3" strokeOpacity="0.55"/>
      {/* Bone knob at bottom */}
      <ellipse cx="40" cy="68" rx="9" ry="6"
        fill="#ece8e0" stroke="#d0c8b8" strokeWidth="1"/>
      {/* Bone knob highlight */}
      <ellipse cx="37" cy="66" rx="3" ry="2"
        fill="rgba(255,255,255,0.4)"/>
      {/* Meat highlight */}
      <circle cx="33" cy="20" r="6"
        fill="rgba(255,180,160,0.2)"/>
    </svg>
  )
}

function ChickpeaSVG() {
  // Three chickpeas with characteristic point + crease
  return (
    <svg width="80" height="80" viewBox="0 0 80 80">
      <defs>
        <radialGradient id="cpgrad" cx="35%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#e8c860"/>
          <stop offset="55%" stopColor="#c49830"/>
          <stop offset="100%" stopColor="#8a6818"/>
        </radialGradient>
        <radialGradient id="cpgrad2" cx="35%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#d4b448"/>
          <stop offset="55%" stopColor="#b08020"/>
          <stop offset="100%" stopColor="#785810"/>
        </radialGradient>
      </defs>
      {/* Top chickpea */}
      <circle cx="40" cy="25" r="16" fill="url(#cpgrad)"/>
      {/* Characteristic pointed tip */}
      <ellipse cx="40" cy="11" rx="4" ry="3.5" fill="#b89028"/>
      <path d="M37,12 Q40,8 43,12" stroke="#9a7820" strokeWidth="1.5" fill="none"/>
      {/* Crease */}
      <path d="M28,28 Q40,34 52,28" stroke="#9a7820" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Highlight */}
      <circle cx="34" cy="18" r="5" fill="rgba(255,240,160,0.3)"/>

      {/* Bottom-left chickpea */}
      <circle cx="24" cy="54" r="14" fill="url(#cpgrad2)"/>
      <ellipse cx="24" cy="42" rx="3.5" ry="3" fill="#a07818"/>
      <path d="M14,57 Q24,62 34,57" stroke="#9a7820" strokeWidth="1.2" fill="none"/>
      <circle cx="19" cy="47" r="4" fill="rgba(255,240,160,0.25)"/>

      {/* Bottom-right chickpea */}
      <circle cx="56" cy="54" r="14" fill="url(#cpgrad)"/>
      <ellipse cx="56" cy="42" rx="3.5" ry="3" fill="#b08020"/>
      <path d="M46,57 Q56,62 66,57" stroke="#9a7820" strokeWidth="1.2" fill="none"/>
      <circle cx="51" cy="47" r="4" fill="rgba(255,240,160,0.25)"/>
    </svg>
  )
}

function SultanaSVG() {
  // Dried sultana/raisin: plump, wrinkled, dark purple-red with stem
  return (
    <svg width="80" height="80" viewBox="0 0 80 80">
      <defs>
        <radialGradient id="sultgrad" cx="36%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#8b3060"/>
          <stop offset="50%" stopColor="#5a1838"/>
          <stop offset="100%" stopColor="#2a0818"/>
        </radialGradient>
      </defs>
      {/* Main body — plump oval */}
      <ellipse cx="40" cy="44" rx="26" ry="22" fill="url(#sultgrad)"/>
      {/* Wrinkle lines (characteristic of dried fruit) */}
      <path d="M20,40 Q26,44 20,50" stroke="#3a1028" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M26,34 Q32,40 28,48" stroke="#3a1028" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M40,33 Q44,42 40,52"  stroke="#3a1028" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M52,36 Q56,44 50,50"  stroke="#3a1028" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M57,42 Q62,46 57,52"  stroke="#3a1028" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      {/* Bottom crease */}
      <path d="M24,58 Q40,65 56,58" stroke="#3a1028" strokeWidth="1.5" fill="none"/>
      {/* Stem */}
      <path d="M40,22 Q42,16 38,10"
        stroke="#4a2030" strokeWidth="3" fill="none" strokeLinecap="round"/>
      {/* Stem tip */}
      <circle cx="38" cy="10" r="2.5" fill="#3a1820"/>
      {/* Highlight */}
      <ellipse cx="30" cy="36" rx="8" ry="5"
        fill="rgba(200,120,160,0.22)"/>
      {/* Subtle rim */}
      <ellipse cx="40" cy="44" rx="26" ry="22"
        fill="none" stroke="rgba(160,80,120,0.4)" strokeWidth="1.5"/>
    </svg>
  )
}
