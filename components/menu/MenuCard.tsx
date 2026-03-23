import Image from 'next/image'
import type { MenuItem } from '@/lib/types'

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
          ? 'ring-1 ring-feelaj-gold/50 hover:ring-feelaj-gold shadow-[0_0_40px_rgba(201,168,76,0.1)] hover:shadow-[0_0_60px_rgba(201,168,76,0.2)]'
          : 'ring-1 ring-white/10 hover:ring-white/20'
        }`}
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={IMAGE_MAP[item.id] ?? IMAGE_MAP.couscous}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
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
