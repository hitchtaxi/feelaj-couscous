interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'full' | 'mark'
  className?: string
}

const SIZES = {
  sm:  { width: 120, height: 144 },
  md:  { width: 180, height: 216 },
  lg:  { width: 240, height: 288 },
  xl:  { width: 320, height: 384 },
}

export default function Logo({ size = 'md', variant = 'full', className = '' }: LogoProps) {
  const { width, height } = SIZES[size]

  if (variant === 'mark') {
    return (
      <svg
        width={width * 0.5}
        height={width * 0.5}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="Feelaj Couscous mark"
      >
        <StarMark />
      </svg>
    )
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 240 288"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Feelaj Couscous"
    >
      {/* ── 8-pointed Tunisian geometric star ── */}
      <g transform="translate(120, 82)">
        <StarMark />
      </g>

      {/* ── FEELAJ ── */}
      <text
        x="120"
        y="156"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="38"
        fontWeight="300"
        letterSpacing="8"
        fill="#c9a84c"
      >
        FEELAJ
      </text>

      {/* ── thin rule ── */}
      <line x1="60" y1="168" x2="180" y2="168" stroke="#c9a84c" strokeWidth="0.6" strokeOpacity="0.5" />

      {/* ── small diamond ornament ── */}
      <rect x="117" y="164" width="6" height="6" fill="#c9a84c" fillOpacity="0.7" transform="rotate(45 120 167)" />

      {/* ── COUSCOUS ── */}
      <text
        x="120"
        y="190"
        textAnchor="middle"
        fontFamily="'DM Sans', system-ui, sans-serif"
        fontSize="11"
        fontWeight="400"
        letterSpacing="6"
        fill="#c9a84c"
        fillOpacity="0.85"
      >
        COUSCOUS
      </text>

      {/* ── thin rule ── */}
      <line x1="80" y1="200" x2="160" y2="200" stroke="#c9a84c" strokeWidth="0.4" strokeOpacity="0.3" />

      {/* ── WESTERN SYDNEY · AUSTRALIA ── */}
      <text
        x="120"
        y="216"
        textAnchor="middle"
        fontFamily="'DM Sans', system-ui, sans-serif"
        fontSize="7"
        fontWeight="400"
        letterSpacing="3.5"
        fill="#c9a84c"
        fillOpacity="0.45"
      >
        WESTERN SYDNEY · AUSTRALIA
      </text>
    </svg>
  )
}

/* ── Tunisian 8-pointed star (zellige geometry) ── */
function StarMark() {
  // Outer 8-pointed star (two overlapping squares rotated 45°)
  // Inner couscous bowl

  return (
    <g>
      {/* Outer glow ring */}
      <circle cx="0" cy="0" r="44" fill="#c9a84c" fillOpacity="0.04" />
      <circle cx="0" cy="0" r="41" stroke="#c9a84c" strokeWidth="0.5" strokeOpacity="0.2" fill="none" />

      {/* 8-pointed star — square 1 */}
      <polygon
        points="0,-38 9,-9 38,0 9,9 0,38 -9,9 -38,0 -9,-9"
        fill="none"
        stroke="#c9a84c"
        strokeWidth="0.8"
        strokeOpacity="0.6"
      />
      {/* 8-pointed star — square 2 (rotated 45°) */}
      <polygon
        points="26.9,-26.9 9,-9 26.9,26.9 9,9 -26.9,26.9 -9,9 -26.9,-26.9 -9,-9"
        fill="none"
        stroke="#c9a84c"
        strokeWidth="0.8"
        strokeOpacity="0.6"
      />

      {/* Solid 8-pointed star fill (smaller, solid) */}
      <polygon
        points="0,-22 5.2,-5.2 22,0 5.2,5.2 0,22 -5.2,5.2 -22,0 -5.2,-5.2"
        fill="#c9a84c"
        fillOpacity="0.15"
      />
      <polygon
        points="15.6,-15.6 5.2,-5.2 15.6,15.6 5.2,5.2 -15.6,15.6 -5.2,5.2 -15.6,-15.6 -5.2,-5.2"
        fill="#c9a84c"
        fillOpacity="0.15"
      />

      {/* Bowl silhouette — center of the star */}
      {/* Bowl body */}
      <path
        d="M-12,2 Q-13,12 0,14 Q13,12 12,2 Z"
        fill="#c9a84c"
        fillOpacity="0.9"
      />
      {/* Bowl rim */}
      <rect x="-13" y="0" width="26" height="3" rx="1.5" fill="#c9a84c" fillOpacity="0.9" />
      {/* Steam dots */}
      <circle cx="-4" cy="-4" r="1.2" fill="#c9a84c" fillOpacity="0.6" />
      <circle cx="0" cy="-6" r="1.4" fill="#c9a84c" fillOpacity="0.7" />
      <circle cx="4" cy="-4" r="1.2" fill="#c9a84c" fillOpacity="0.6" />
    </g>
  )
}
