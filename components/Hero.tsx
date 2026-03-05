'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const TITLES = [
  'SENIOR PHP DEVELOPER',
  'MID JAVASCRIPT DEVELOPER',
  'BACKEND ARCHITECT',
  'LARAVEL SPECIALIST',
  'FULLSTACK ENGINEER',
  'API BUILDER',
  'TI ARCHITECT',
]

const PIXELS = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() > 0.5 ? 4 : 8,
  color: ['#00ffff', '#ff00aa', '#ffd700', '#00ff41', '#8b00ff'][Math.floor(Math.random() * 5)],
  delay: Math.random() * 3,
}))

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [insertCoin, setInsertCoin] = useState(true)
  const [started, setStarted] = useState(false)
  const [konami, setKonami] = useState<string[]>([])

  const router = useRouter();

  // Typewriter effect
  useEffect(() => {
    const current = TITLES[titleIndex]
    const speed = isDeleting ? 50 : 100

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(current.slice(0, charIndex + 1))
        setCharIndex(c => c + 1)
        if (charIndex >= current.length) {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        setDisplayText(current.slice(0, charIndex - 1))
        setCharIndex(c => c - 1)
        if (charIndex <= 0) {
          setIsDeleting(false)
          setTitleIndex(i => (i + 1) % TITLES.length)
        }
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [charIndex, isDeleting, titleIndex])


  useEffect(() => {
    const timer = setInterval(() => setInsertCoin(c => !c), 700)
    return () => clearInterval(timer)
  }, [])

  // Konami code easter egg
  useEffect(() => {
    const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']
    const handler = (e: KeyboardEvent) => {
      setKonami(prev => {
        const next = [...prev, e.key].slice(-10)
        if (next.join(',') === KONAMI.join(',')) {
          alert('🎮 ERES UN CRACK!! +100 VIDAS EN TU CORAZON ★★★')
          
          return []
        }
        return next
      })
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  void konami

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg stars-bg"
      style={{ paddingTop: '80px' }}
    >
      {/* Floating pixel decorations */}
      {PIXELS.map(px => (
        <div
          key={px.id}
          className="absolute animate-float pointer-events-none"
          style={{
            left: `${px.x}%`,
            top: `${px.y}%`,
            width: px.size,
            height: px.size,
            background: px.color,
            boxShadow: `0 0 6px ${px.color}`,
            animationDelay: `${px.delay}s`,
            opacity: 0.6,
          }}
        />
      ))}

      {/* Scanline moving */}
      <div
        className="absolute left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(transparent, rgba(0,255,255,0.03), transparent)',
          animation: 'scanline 8s linear infinite',
          zIndex: 1,
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">

        {/* Game title */}
        <div className="mb-4" style={{ fontFamily: '"Press Start 2P"', fontSize: 'clamp(8px, 2vw, 12px)', color: '#4a4a7a', letterSpacing: '4px' }}>
          ▶ PLAYER 1 SELECT ◀
        </div>

        {/* Main name with glitch */}
        <div className="mb-6 relative">
          <h1
            className="glitch-text"
            data-text="NICOLÁS CUADROS"
            style={{
              fontFamily: '"Orbitron"',
              fontSize: 'clamp(32px, 8vw, 80px)',
              fontWeight: 900,
              color: '#f0f0ff',
              letterSpacing: '4px',
              lineHeight: 1,
              textShadow: '0 0 40px rgba(0,255,255,0.3)',
            }}
          >
            NICOLÁS CUADROS
          </h1>
          {/* Decorative underline */}
          <div className="mt-2 flex justify-center gap-1">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-1"
                style={{
                  width: '20px',
                  background: i % 3 === 0 ? '#00ffff' : i % 3 === 1 ? '#ff00aa' : '#ffd700',
                  boxShadow: `0 0 6px ${i % 3 === 0 ? '#00ffff' : i % 3 === 1 ? '#ff00aa' : '#ffd700'}`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Typewriter title */}
        <div
          className="mb-8 flex items-center justify-center gap-2"
          style={{ fontFamily: '"Press Start 2P"', fontSize: 'clamp(9px, 2.5vw, 16px)', color: '#00ffff', minHeight: '40px' }}
        >
          <span style={{ color: '#ffd700' }}>{'=>'}</span>
          <span style={{ textShadow: '0 0 10px #00ffff' }}>{displayText}</span>
          <span className="animate-blink" style={{ color: '#00ffff' }}>|</span>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {[
            { label: 'EXP', value: 'DEV 6+ AÑOS', color: '#ffd700' },
            { label: 'EXP TI', value: 'TI 1+ AÑO', color: '#ff4400' },
            { label: 'PROYECTOS', value: '20+', color: '#00ffff' },
            { label: 'STACKS', value: 'FULL STACK', color: '#ff00aa' },
            { label: 'NIVEL', value: 'MID SENIOR', color: '#00ff41' },
          ].map(stat => (
            <div
              key={stat.label}
              className="px-4 py-3"
              style={{
                border: `2px solid ${stat.color}`,
                boxShadow: `0 0 10px ${stat.color}`,
                background: 'rgba(0,0,0,0.5)',
                minWidth: '100px',
              }}
            >
              <div style={{ fontFamily: '"Press Start 2P"', fontSize: '7px', color: '#4a4a7a', marginBottom: '4px' }}>{stat.label}</div>
              <div style={{ fontFamily: '"Press Start 2P"', fontSize: '10px', color: stat.color, textShadow: `0 0 8px ${stat.color}` }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <a
            href="#projects"
            className="arcade-btn"
            style={{ color: '#00ffff', borderColor: '#00ffff', boxShadow: '0 0 15px rgba(0,255,255,0.3)' }}
          >
            🎮 VER PROYECTOS
          </a>
          <a
            href="#contact"
            className="arcade-btn"
            style={{ color: '#ffd700', borderColor: '#ffd700', boxShadow: '0 0 15px rgba(255,215,0,0.3)' }}
          >
            📡 CONTACTAR
          </a>
          <a
            href="https://www.linkedin.com/in/nicolas-cuadros-b099531a9/"
            target="_blank"
            rel="noopener noreferrer"
            className="arcade-btn"
            style={{ color: '#ff00aa', borderColor: '#ff00aa', boxShadow: '0 0 15px rgba(255,0,170,0.3)' }}
          >
            🔗 LINKEDIN
          </a>
        </div>

        {/* Insert coin */}
        {!started && (
          <div
            onClick={
              () => {
                setStarted(true);
                router.push('#about')
              }
            }
            className="cursor-pointer"
            style={{
              fontFamily: '"Press Start 2P"',
              fontSize: 'clamp(8px, 2vw, 12px)',
              color: '#ffd700',
              textShadow: '0 0 10px #ffd700',
              opacity: insertCoin ? 1 : 0,
              transition: 'opacity 0.1s',
              letterSpacing: '2px',
            }}
          >
            ★ INSERT COIN TO CONTINUE ★
          </div>
        )}

        {/* Bogotá tag */}
        <div className="mt-6 flex justify-center items-center gap-2" style={{ fontFamily: '"Share Tech Mono"', fontSize: '12px', color: '#fff' }}>
          <span style={{ color: '#ff0033' }}>●</span>
          <span>BOGOTÁ, COLOMBIA</span>
          <span style={{ color: '#00ff41' }}>●</span>
          <span>DISPONIBLE</span>
        </div>
      </div>

      {/* Bottom border decoration */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
        <div className="flex gap-0">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="w-6 h-3"
              style={{
                background: i % 4 === 0 ? '#00ffff' : i % 4 === 1 ? '#ff00aa' : i % 4 === 2 ? '#ffd700' : 'transparent',
                opacity: 0.6,
              }}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 animate-bounce-pixel" style={{ fontFamily: '"Press Start 2P"', fontSize: '10px', color: '#4a4a7a' }}>
        ↓ SCROLL
      </div>
    </section>
  )
}
