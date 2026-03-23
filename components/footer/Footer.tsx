import Logo from '@/components/brand/Logo'

export default function Footer() {
  return (
    <footer className="bg-feelaj-black border-t border-white/5 py-14 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-8">
        {/* Full logo centrepiece */}
        <Logo size="md" variant="full" />

        {/* Nav */}
        <nav className="flex gap-8">
          {[
            { label: 'Menu', href: '#menu' },
            { label: 'Deals', href: '#deals' },
            { label: 'Our Story', href: '#story' },
            { label: 'Order', href: '#contact' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-xs text-feelaj-text/40 hover:text-feelaj-gold transition-colors tracking-wider"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Divider */}
        <div className="w-24 h-px bg-feelaj-gold/20" />

        <p className="font-body text-feelaj-text/20 text-xs tracking-[0.2em] text-center">
          From the kitchens of northwest Tunisia to your door. Sydney, Australia.
        </p>
      </div>
    </footer>
  )
}
