export default function Footer() {
  return (
    <footer className="bg-feelaj-black border-t border-white/5 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-display text-lg text-feelaj-gold tracking-widest">FEELAJ COUSCOUS</p>
          <p className="font-body text-feelaj-text/30 text-xs mt-1 tracking-wider">
            From the kitchens of northwest Tunisia to your door.
          </p>
        </div>
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
        <p className="font-body text-feelaj-text/20 text-xs tracking-wider">
          Sydney, Australia
        </p>
      </div>
    </footer>
  )
}
