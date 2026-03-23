'use client'
import { CSSProperties } from 'react'

interface ShimmerButtonProps {
  href: string
  children: React.ReactNode
  className?: string
  variant?: 'gold' | 'outline'
}

export default function ShimmerButton({ href, children, className = '', variant = 'gold' }: ShimmerButtonProps) {
  const isGold = variant === 'gold'

  const style: CSSProperties = {
    '--shimmer-color': isGold ? 'rgba(255,255,255,0.25)' : 'rgba(201,168,76,0.3)',
  } as CSSProperties

  return (
    <a
      href={href}
      style={style}
      className={`
        group relative inline-flex overflow-hidden font-body tracking-widest text-sm px-8 py-4 transition-all duration-300
        ${isGold
          ? 'bg-feelaj-gold text-feelaj-black hover:bg-feelaj-gold/90'
          : 'border border-feelaj-text/40 text-feelaj-text hover:border-feelaj-gold hover:text-feelaj-gold'
        }
        ${className}
      `}
    >
      {/* Shimmer sweep */}
      <span
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
        style={{
          background: 'linear-gradient(105deg, transparent 30%, var(--shimmer-color) 50%, transparent 70%)',
        }}
      />
      <span className="relative z-10">{children}</span>
    </a>
  )
}
