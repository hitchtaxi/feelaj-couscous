import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'Feelaj Couscous — Authentic Tunisian Delivery, Sydney',
  description:
    'Order authentic Tunisian couscous, tagine, and Salata Mishweya delivered anywhere in Sydney. Family deals from $22. No delivery fee. Order 7pm–11pm.',
  openGraph: {
    title: 'Feelaj Couscous',
    description: 'Authentic Tunisian home cooking, delivered across Sydney.',
    type: 'website',
  },
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  )
}
