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
        }`}
    >
      {deal.highlighted && !isWedding && (
        <span className="absolute -top-3 left-6 font-body text-xs tracking-widest bg-feelaj-gold text-feelaj-black px-3 py-1">
          POPULAR
        </span>
      )}

      <div className="flex items-start justify-between mb-4">
        <h3 className="font-display text-2xl text-feelaj-text">{deal.name}</h3>
        <div className="text-right ml-4">
          {isWedding ? (
            <span className="font-body text-feelaj-gold text-sm tracking-wider">Contact for quote</span>
          ) : (
            <span className="font-display text-3xl text-feelaj-gold">${deal.price as number}</span>
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
