'use client'
import { ThreeDCarousel, CarouselCard } from '@/components/ui/3d-carousel'

const CAROUSEL_CARDS: CarouselCard[] = [
  {
    id: 'couscous',
    imgUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80',
    label: 'Tunisian Couscous',
    sublabel: 'Our signature dish',
    price: 'In every deal',
  },
  {
    id: 'family-4',
    imgUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80',
    label: 'Family of 4',
    sublabel: 'A proper family spread',
    price: 60,
  },
  {
    id: 'tagine',
    imgUrl: 'https://images.unsplash.com/photo-1606756790138-261d2b21cd75?w=400&q=80',
    label: 'Tunisian Tagine',
    sublabel: 'Baked, not braised',
    price: 'In every deal',
  },
  {
    id: 'family-7',
    imgUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80',
    label: 'Family of 7',
    sublabel: 'For the bigger household',
    price: 105,
  },
  {
    id: 'salata',
    imgUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80',
    label: 'Salata Mishweya',
    sublabel: 'Fire-roasted peppers',
    price: 'In every deal',
  },
  {
    id: 'family-10',
    imgUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80',
    label: 'Family of 10',
    sublabel: 'Feed the whole crew',
    price: 150,
  },
  {
    id: 'event-20',
    imgUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80',
    label: 'Event of 20',
    sublabel: 'Gatherings & celebrations',
    price: 300,
  },
  {
    id: 'wedding',
    imgUrl: 'https://images.unsplash.com/photo-1530062845289-9109b2c9c868?w=400&q=80',
    label: 'Wedding / Large Event',
    sublabel: 'We cook on-site',
    price: 'Contact us',
  },
]

export default function FoodCarouselSection() {
  return (
    <section id="order-carousel" className="relative bg-feelaj-black py-24 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-feelaj-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center mb-12 px-4">
        <p className="font-body text-feelaj-gold/60 tracking-[0.3em] text-xs uppercase mb-4">
          Spin &amp; Choose
        </p>
        <h2 className="font-display text-5xl md:text-6xl text-feelaj-text font-light">
          What will you <span className="italic text-feelaj-gold">order?</span>
        </h2>
        <p className="font-body text-feelaj-text/40 text-sm mt-4 tracking-wider">
          Drag to explore &middot; click to select &middot; order via WhatsApp
        </p>
      </div>

      <ThreeDCarousel cards={CAROUSEL_CARDS} />
    </section>
  )
}
