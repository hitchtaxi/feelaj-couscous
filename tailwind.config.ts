import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'feelaj-black': '#0a0a0a',
        'feelaj-surface': '#141414',
        'feelaj-cream': '#faf8f4',
        'feelaj-text': '#f5f0e8',
        'feelaj-gold': '#c9a84c',
        'feelaj-red': '#8b1a1a',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
