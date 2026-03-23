import type { Deal, MenuItem, Drink, Ingredient } from './types'

export const DEALS: Deal[] = [
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
      "Red, harissa-based, slow-cooked. Topped with chickpeas, sultanas, and lamb on the bone. The way it's served at weddings in northwest Tunisia.",
    badge: 'Our Signature',
    imageQuery: 'tunisian couscous bowl',
  },
  {
    id: 'tagine',
    name: 'Tunisian Tagine',
    description:
      "Don't confuse this with the Moroccan version. Tunisian tagine is a baked, layered dish — deeply spiced, rich, and unlike anything else.",
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
  { id: 'chickpeas', label: 'Chickpeas', detail: 'slow-soaked, tender', angle: 40, distance: 240 },
  { id: 'lamb', label: 'Lamb', detail: 'on the bone, fall-apart tender', angle: 110, distance: 250 },
  { id: 'harissa', label: 'Harissa broth', detail: 'deep red, slow-cooked', angle: 180, distance: 240 },
  { id: 'sultanas', label: 'Sultanas', detail: 'sweet depth', angle: 250, distance: 240 },
  { id: 'semolina', label: 'Semolina', detail: 'hand-rolled, fine-grain', angle: 320, distance: 230 },
]

export const WHATSAPP_NUMBER = '+61400000000'
export const PHONE_NUMBER = '+61 4XX XXX XXX'
export const ORDER_WINDOW = '7:00pm – 11:00pm'
export const DELIVERY_WINDOW = 'next morning from 8:00am'
