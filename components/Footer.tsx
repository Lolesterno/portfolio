export default function Footer() {
  return (
    <footer
      className="py-8 px-4 text-center"
      style={{
        borderTop: '2px solid #1a1a3e',
        background: '#0a0a0f',
      }}
    >
      {/* Pixel row decoration */}
      <div className="flex justify-center mb-6">
        <div className="flex gap-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="w-5 h-2"
              style={{
                background: i % 4 === 0 ? '#00ffff' : i % 4 === 1 ? '#ff00aa' : i % 4 === 2 ? '#ffd700' : 'transparent',
                opacity: 0.5,
              }}
            />
          ))}
        </div>
      </div>

      <div style={{ fontFamily: '"Press Start 2P"', fontSize: '9px', color: '#00ffff', textShadow: '0 0 10px #00ffff', marginBottom: '8px' }}>
        NC.DEV
      </div>
      <div style={{ fontFamily: '"Share Tech Mono"', fontSize: '12px', color: '#4a4a7a', marginBottom: '4px' }}>
        José Nicolás Cuadros Silva — Senior PHP Developer
      </div>
      <div style={{ fontFamily: '"Share Tech Mono"', fontSize: '11px', color: '#2a2a5a', marginBottom: '16px' }}>
        Bogotá, Colombia 🇨🇴
      </div>

      <div className="flex justify-center gap-6 mb-8">
        {[
          { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nicolas-cuadros-b099531a9/', color: '#0066ff' },
          { label: 'Email', href: 'mailto:Jose_nico2000@hotmail.com', color: '#ffd700' },
          { label: 'Teléfono', href: 'tel:+573132803746', color: '#00ffff' },
        ].map(link => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            style={{ fontFamily: '"Press Start 2P"', fontSize: '7px', color: link.color, textDecoration: 'none' }}
          >
            {link.label}
          </a>
        ))}
      </div>

      <div style={{ fontFamily: '"Press Start 2P"', fontSize: '7px', color: '#2a2a5a' }}>
        © 2025 — GAME OVER? NEVER. INSERT COIN TO CONTINUE ★
      </div>
    </footer>
  )
}
