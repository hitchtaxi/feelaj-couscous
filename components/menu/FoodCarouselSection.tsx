'use client'
import { ThreeDCarousel, CarouselCard } from '@/components/ui/3d-carousel'

const CAROUSEL_CARDS: CarouselCard[] = [
  {
    id: 'couscous',
    // Tunisian-style couscous: red broth, vegetables, lamb — reddish-orange bowl
    imgUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=85',
    label: 'Tunisian Couscous',
    sublabel: 'Harissa · Lamb · Chickpeas',
    price: 'In every deal',
  },
  {
    id: 'family-4',
    // Overhead shot of a big North African family spread on a wooden table
    imgUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=85',
    label: 'Family of 4',
    sublabel: 'A proper family spread',
    price: 60,
  },
  {
    id: 'tagine',
    // Tunisian tagine — egg/cheese baked layered dish, golden top, deep dish
    imgUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=85',
    label: 'Tunisian Tagine',
    sublabel: 'Baked · Layered · Spiced',
    price: 'In every deal',
  },
  {
    id: 'family-7',
    // Large spread, multiple clay bowls on table
    imgUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=85',
    label: 'Family of 7',
    sublabel: 'For the bigger household',
    price: 105,
  },
  {
    id: 'salata',
    // Roasted red/orange pepper salad, chunky, rustic bowl
    imgUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=85',
    label: 'Salata Mishweya',
    sublabel: 'Fire-roasted peppers',
    price: 'In every deal',
  },
  {
    id: 'family-10',
    // Long banquet table, feast style
    imgUrl: 'https://images.unsplash.com/photo-1530062845289-9109b2c9c868?w=600&q=85',
    label: 'Family of 10',
    sublabel: 'Feed the whole crew',
    price: 150,
  },
  {
    id: 'event-20',
    // Catering-style large event food spread
    imgUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=85',
    label: 'Event of 20',
    sublabel: 'Gatherings & celebrations',
    price: 300,
  },
  {
    id: 'wedding',
    // Elegant wedding banquet table setting
    imgUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=85',
    label: 'Wedding / Large Event',
    sublabel: 'We cook on-site',
    price: 'Contact us',
  },
]

export default function FoodCarouselSection() {
  return (
    <section id="order-carousel" className="relative bg-feelaj-black py-20 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-feelaj-gold/4 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center mb-10 px-4">
        <p className="font-body text-feelaj-gold/60 tracking-[0.3em] text-xs uppercase mb-4">
          What&apos;s on the table
        </p>
        <h2 className="font-display text-5xl md:text-6xl text-feelaj-text font-light">
          Drag &amp; <span className="italic text-feelaj-gold">explore</span>
        </h2>
        <p className="font-body text-feelaj-text/40 text-sm mt-3 tracking-wider">
          Spin to see every dish &middot; click to order via WhatsApp
        </p>
      </div>

      <ThreeDCarousel cards={CAROUSEL_CARDS} />
    </section>
  )
}
