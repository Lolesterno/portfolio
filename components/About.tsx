'use client'

import { useEffect, useRef, useState } from 'react'

const stats = [
  { label: 'PHP / Laravel', value: 95, color: '#7c3aed' },
  { label: 'JavaScript / TS', value: 85, color: '#ffd700' },
  { label: 'Vue.js / React', value: 80, color: '#00ffff' },
  { label: 'MySQL / PostgreSQL', value: 85, color: '#00ff41' },
  { label: 'Docker / DevOps', value: 75, color: '#ff6b00' },
  { label: 'Python', value: 65, color: '#ff00aa' },
]

export default function About() {
  const [visible, setVisible] = useState(false)
  const [bars, setBars] = useState<Record<string, number>>({})
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          setTimeout(() => {
            const newBars: Record<string, number> = {}
            stats.forEach(s => { newBars[s.label] = s.value })
            setBars(newBars)
          }, 300)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 px-4 relative grid-bg"
      style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #0d0d1a 100%)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <div style={{ fontFamily: '"Press Start 2P"', fontSize: 'clamp(14px, 3vw, 22px)', color: '#00ffff', textShadow: '0 0 20px #00ffff' }}>
            👤 SOBRE MÍ
          </div>
          <div className="flex-1 h-0.5" style={{ background: 'linear-gradient(90deg, #00ffff, transparent)' }} />
          <div style={{ fontFamily: '"Press Start 2P"', fontSize: '8px', color: '#ebe8e8' }}>STAGE 01</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Bio */}
          <div
            className={`transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
          >
            {/* Pixel character card */}
            <div className="pixel-border p-6 mb-6" style={{ background: 'rgba(0,255,255,0.03)' }}>
              <div className="flex items-start gap-4">
                {/* Pixel avatar */}
                <div className="flex-shrink-0">
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, #1a1a3e, #0d0d1a)',
                      border: '2px solid #ffd700',
                      boxShadow: '0 0 15px #ffd700',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '36px',
                    }}
                  >
                    🧑‍💻
                  </div>
                  <div className="mt-2 text-center" style={{ fontFamily: '"Press Start 2P"', fontSize: '6px', color: '#ffd700' }}>
                    P1
                  </div>
                </div>

                <div>
                  <div style={{ fontFamily: '"Orbitron"', fontSize: '18px', fontWeight: 700, color: '#f0f0ff', marginBottom: '4px' }}>
                    José Nicolás
                  </div>
                  <div style={{ fontFamily: '"Orbitron"', fontSize: '18px', fontWeight: 700, color: '#00ffff', textShadow: '0 0 10px #00ffff' }}>
                    Cuadros Silva
                  </div>
                  <div className="mt-2" style={{ fontFamily: '"Press Start 2P"', fontSize: '7px', color: '#ff00aa' }}>
                    ★ SENIOR DEVELOPER ★
                  </div>
                </div>
              </div>
            </div>

            {/* Bio text */}
            <div className="space-y-4">
              <div
                className="p-4"
                style={{
                  border: '1px solid #1a1a3e',
                  background: 'rgba(255,215,0,0.03)',
                  fontFamily: '"Share Tech Mono"',
                  fontSize: '14px',
                  lineHeight: '1.8',
                  color: '#edede4',
                }}
              >
                <span style={{ color: '#ffd700' }}>{'> '}</span>
                Desarrollador de software apasionado por construir soluciones robustas y escalables. Con más de 6 años en el mundo del desarrollo, me especializo en el ecosistema PHP/Laravel para backend, con sólidas habilidades en frontend con las diferentes librerias de desarrollo, espeialmente React.
              </div>
              <div
                className="p-4"
                style={{
                  border: '1px solid #1a1a3e',
                  background: 'rgba(0,255,255,0.03)',
                  fontFamily: '"Share Tech Mono"',
                  fontSize: '14px',
                  lineHeight: '1.8',
                  color: '#edede4',
                }}
              >
                <span style={{ color: '#00ffff' }}>{'> '}</span>
                Actualmente trabajo de forma presencial e nuevos proyectos para un grupo empresarial especializado en salud virtual (DoctorOne, TuPsicologo), manejo de servidores en el area de tecnologia y de manera freelance para clientes a nivel mundial.
              </div>
              <div
                className="p-4"
                style={{
                  border: '1px solid #1a1a3e',
                  background: 'rgba(255,0,170,0.03)',
                  fontFamily: '"Share Tech Mono"',
                  fontSize: '14px',
                  lineHeight: '1.8',
                  color: '#edede4',
                }}
              >
                <span style={{ color: '#ff00aa' }}>{'> '}</span>
                Fuera del código: gym 🏋️, natacion 🏊🏻, motos 🏍️, videojuegos 🎮, series y peliculas 📺 ,cocinar 👨‍🍳, viajes ✈️ y mas. El mismo nivel de dedicación en cada boss.
              </div>
            </div>

            {/* Contact quick */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              {[
                { icon: '📧', label: 'Jose_nico2000@hotmail.com', color: '#ffd700' },
                { icon: '📍', label: 'Bogotá, Colombia', color: '#00ffff' },
                { icon: '🌐', label: 'EN/ES Bilingüe', color: '#ff00aa' },
              ].map(item => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 px-4 py-2"
                  style={{
                    border: `1px solid ${item.color}`,
                    fontFamily: '"Share Tech Mono"',
                    fontSize: '11px',
                    color: item.color,
                    background: 'rgba(0,0,0,0.3)',
                  }}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Power bars */}
          <div
            className={`transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
          >
            <div
              className="p-6"
              style={{
                border: '2px solid #1a1a3e',
                background: 'rgba(13,13,26,0.8)',
                boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)',
              }}
            >
              <div style={{ fontFamily: '"Press Start 2P"', fontSize: '9px', color: '#ffd700', marginBottom: '20px', textAlign: 'center' }}>
                ⚡ POWER STATS ⚡
              </div>

              <div className="space-y-5">
                {stats.map((stat, i) => (
                  <div key={stat.label}>
                    <div className="flex justify-between mb-1">
                      <span style={{ fontFamily: '"Share Tech Mono"', fontSize: '12px', color: '#edede4' }}>{stat.label}</span>
                      <span style={{ fontFamily: '"Press Start 2P"', fontSize: '8px', color: stat.color }}>
                        {bars[stat.label] ?? 0}%
                      </span>
                    </div>
                    <div
                      className="pixel-progress"
                      style={{ borderColor: stat.color }}
                    >
                      <div
                        className="pixel-progress-fill"
                        style={{
                          width: `${bars[stat.label] ?? 0}%`,
                          color: stat.color,
                          transitionDelay: `${i * 100}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* XP Bar */}
              <div className="mt-8 pt-6" style={{ borderTop: '1px solid #1a1a3e' }}>
                <div className="flex justify-between mb-2">
                  <span style={{ fontFamily: '"Press Start 2P"', fontSize: '7px', color: '#ebe8e8' }}>LVL 6</span>
                  <span style={{ fontFamily: '"Press Start 2P"', fontSize: '7px', color: '#ffd700' }}>XP: 8450 / 10000</span>
                  <span style={{ fontFamily: '"Press Start 2P"', fontSize: '7px', color: '#ebe8e8' }}>LVL 7</span>
                </div>
                <div style={{ height: '20px', border: '2px solid #ffd700', background: '#0a0a0f', position: 'relative', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: visible ? '84.5%' : '0%',
                      background: 'repeating-linear-gradient(90deg, #ffd700 0px, #ffd700 10px, #ff6b00 10px, #ff6b00 12px)',
                      boxShadow: '0 0 10px #ffd700',
                      transition: 'width 2s ease',
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span style={{ fontFamily: '"Press Start 2P"', fontSize: '7px', color: '#0a0a0f', mixBlendMode: 'difference' }}>
                      EXPERIENCE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
