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
            className="absolute"
            style={{
              left: endX,
              top: endY,
              transform: `translate(${isRight ? '8px' : 'calc(-100% - 8px)'}, -50%)`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.5 + i * 0.08, duration: 0.3 }}
          >
            <p className="font-display text-feelaj-gold text-sm font-semibold leading-tight whitespace-nowrap">
              {ing.label}
            </p>
            <p className="font-body text-feelaj-text/60 text-xs leading-tight whitespace-nowrap">
              {ing.detail}
            </p>
          </motion.div>
        )
      })}
    </div>
  )
}
