'use client'

import { useState, useEffect } from 'react'

const navItems = [
  { label: 'INICIO', href: '#hero', icon: '🏠' },
  { label: 'SOBRE MÍ', href: '#about', icon: '👤' },
  { label: 'EXP', href: '#experience', icon: '⚔️' },
  { label: 'PROYECTOS', href: '#projects', icon: '🎮' },
  { label: 'SKILLS', href: '#skills', icon: '⚡' },
  { label: 'EDUCACIÓN', href: '#education', icon: '📚' },
  { label: 'CONTACTO', href: '#contact', icon: '📡' },
]

export default function Navbar() {
  const [active, setActive] = useState('hero')
  const [lives] = useState(3)
  const [score] = useState(25)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.replace('#', ''))
      const current = sections.find(section => {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActive(current)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: 'rgba(10,10,15,0.95)', borderBottom: '2px solid #00ffff', boxShadow: '0 0 20px rgba(0,255,255,0.3)' }}>
      {/* Top ticker */}
      <div className="overflow-hidden py-1" style={{ background: '#0d0d1a', borderBottom: '1px solid #1a1a3e' }}>
        <div className="animate-marquee whitespace-nowrap" style={{ fontFamily: '"Press Start 2P"', fontSize: '8px', color: '#ffd700' }}>
          ★ PLAYER 1 - NICOLAS CUADROS ★ SENIOR PHP DEVELOPER ★ BOGOTÁ, COLOMBIA ★ DISPONIBLE PARA NUEVOS PROYECTOS ★ SCORE: {score.toLocaleString()} ★ LEVEL: SENIOR ★ INSERT COIN TO CONTINUE ★&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2">
          <span style={{ fontFamily: '"Press Start 2P"', fontSize: '10px', color: '#00ffff', textShadow: '0 0 10px #00ffff' }}>
            NC<span style={{ color: '#ffd700' }}>.</span>DEV
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = active === item.href.replace('#', '')
            return (
              <a
                key={item.label}
                href={item.href}
                className="relative px-3 py-2 transition-all duration-100 group"
                style={{
                  fontFamily: '"Press Start 2P"',
                  fontSize: '7px',
                  color: isActive ? '#00ffff' : '#ebe8e8',
                  textShadow: isActive ? '0 0 10px #00ffff' : 'none',
                  letterSpacing: '1px',
                }}
              >
                {isActive && (
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2" style={{ color: '#ffd700', fontSize: '8px' }}>▼</span>
                )}
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: '#00ffff', boxShadow: '0 0 6px #00ffff' }} />
                )}
              </a>
            )
          })}
        </div>

        {/* Lives & Score */}
        <div className="hidden md:flex items-center gap-4">
          <div style={{ fontFamily: '"Press Start 2P"', fontSize: '7px' }}>
            <span style={{ color: '#ff00aa' }}>
              {'❤️'.repeat(lives)}
            </span>
          </div>
          <div style={{ fontFamily: '"Press Start 2P"', fontSize: '7px', color: '#ffd700' }}>
            {score.toLocaleString()}
          </div>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden"
          style={{ color: '#00ffff', fontFamily: '"Press Start 2P"', fontSize: '12px' }}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4" style={{ borderTop: '1px solid #1a1a3e' }}>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 py-3"
              style={{
                fontFamily: '"Press Start 2P"',
                fontSize: '8px',
                color: active === item.href.replace('#', '') ? '#00ffff' : '#ebe8e8',
                borderBottom: '1px solid #1a1a3e',
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
