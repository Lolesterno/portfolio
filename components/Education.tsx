'use client'

import { useEffect, useRef, useState } from 'react'

const education = [
  {
    degree: 'Ingeniería de Sistemas',
    institution: 'CUN - Corporación Unificada Nacional de Educación Superior',
    period: 'Ene. 2022 - Actualmente',
    type: 'Carrera Profesional',
    status: 'EN CURSO',
    color: '#00ffff',
    icon: '🎓',
    description: 'Carrera profesional en ingeniería de sistemas con enfoque en desarrollo de software y arquitecturas modernas.',
  },
  {
    degree: 'Análisis y Desarrollo de Software',
    institution: 'SENA - Servicio Nacional de Aprendizaje',
    period: 'Oct. 2019 - Oct. 2021',
    type: 'Carrera Tecnológica',
    status: 'COMPLETADO',
    color: '#ffd700',
    icon: '🏆',
    description: 'Tecnólogo en análisis y desarrollo de software con formación práctica en programación y bases de datos.',
  },
  {
    degree: 'Tecnología en Sistemas',
    institution: 'Universidad ECCI',
    period: 'Ene. 2017 - Jul. 2019',
    type: 'Carrera Tecnológica',
    status: 'COMPLETADO',
    color: '#ff00aa',
    icon: '📱',
    description: 'Estudios tecnológicos en sistemas de información y fundamentos de ingeniería de software.',
  },
  {
    degree: 'Bachillerato',
    institution: 'Gimnasio los Sauces',
    period: 'Ene. 2016 - Nov. 2017',
    type: 'Educación Media',
    status: 'COMPLETADO',
    color: '#00ff41',
    icon: '🏫',
    description: 'Educación media con enfoque académico.',
  },
]

export default function Education() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="education"
      ref={ref}
      className="py-24 px-4 relative grid-bg"
      style={{ background: 'linear-gradient(180deg, #0a0a0f, #0d0d1a)' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <div style={{ fontFamily: '"Press Start 2P"', fontSize: 'clamp(12px, 2.5vw, 20px)', color: '#8b00ff', textShadow: '0 0 20px #8b00ff' }}>
            📚 EDUCACIÓN
          </div>
          <div className="flex-1 h-0.5" style={{ background: 'linear-gradient(90deg, #8b00ff, transparent)' }} />
          <div style={{ fontFamily: '"Press Start 2P"', fontSize: '8px', color: '#ebe8e8' }}>STAGE 05</div>
        </div>

        {/* Achievement unlocked style */}
        <div className="space-y-6">
          {education.map((edu, i) => (
            <div
              key={i}
              className={`transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div
                className="p-5 relative overflow-hidden"
                style={{
                  border: `2px solid ${edu.color}50`,
                  background: `${edu.color}05`,
                  boxShadow: `inset 0 0 30px ${edu.color}08`,
                }}
              >
                {/* Decorative corner */}
                <div
                  className="absolute top-0 left-0 w-4 h-4"
                  style={{ background: edu.color, boxShadow: `0 0 10px ${edu.color}` }}
                />
                <div
                  className="absolute top-0 right-0 w-4 h-4"
                  style={{ background: edu.color, boxShadow: `0 0 10px ${edu.color}` }}
                />

                <div className="flex flex-wrap items-start gap-4 pl-2">
                  {/* Icon */}
                  <div
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{
                      width: '56px',
                      height: '56px',
                      border: `2px solid ${edu.color}`,
                      boxShadow: `0 0 10px ${edu.color}`,
                      background: 'rgba(0,0,0,0.5)',
                      fontSize: '24px',
                    }}
                  >
                    {edu.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <div>
                        <div style={{ fontFamily: '"Orbitron"', fontSize: '15px', fontWeight: 700, color: '#f0f0ff' }}>
                          {edu.degree}
                        </div>
                        <div style={{ fontFamily: '"Share Tech Mono"', fontSize: '13px', color: edu.color, marginTop: '2px' }}>
                          {edu.institution}
                        </div>
                      </div>
                      <div
                        style={{
                          fontFamily: '"Press Start 2P"',
                          fontSize: '7px',
                          color: edu.status === 'EN CURSO' ? '#00ff41' : '#ebe8e8',
                          border: `1px solid ${edu.status === 'EN CURSO' ? '#00ff41' : '#ebe8e8'}`,
                          padding: '4px 8px',
                          boxShadow: edu.status === 'EN CURSO' ? '0 0 8px #00ff41' : 'none',
                          flexShrink: 0,
                        }}
                      >
                        {edu.status === 'EN CURSO' ? '▶ ' : '✓ '}{edu.status}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-2">
                      <span style={{ fontFamily: '"Share Tech Mono"', fontSize: '11px', color: '#ebe8e8' }}>
                        📅 {edu.period}
                      </span>
                      <span
                        style={{
                          fontFamily: '"Press Start 2P"',
                          fontSize: '7px',
                          color: edu.color,
                          padding: '2px 6px',
                          border: `1px solid ${edu.color}50`,
                        }}
                      >
                        {edu.type}
                      </span>
                    </div>

                    <p style={{ fontFamily: '"Share Tech Mono"', fontSize: '11px', color: '#f0f0f0', lineHeight: '1.6' }}>
                      {edu.description}
                    </p>
                  </div>
                </div>

                {/* Bottom bar */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: edu.color, boxShadow: `0 0 6px ${edu.color}` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Achievement unlocked popup style */}
        <div
          className={`mt-12 p-6 text-center transition-all duration-700 delay-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{
            border: '2px solid #ffd700',
            boxShadow: '0 0 30px rgba(255,215,0,0.2)',
            background: 'rgba(255,215,0,0.05)',
          }}
        >
          <div style={{ fontFamily: '"Press Start 2P"', fontSize: '10px', color: '#ffd700', textShadow: '0 0 10px #ffd700', marginBottom: '8px' }}>
            🏆 ACHIEVEMENT UNLOCKED
          </div>
          <div style={{ fontFamily: '"Orbitron"', fontSize: '18px', fontWeight: 700, color: '#f0f0ff', marginBottom: '4px' }}>
            Aprendizaje Continuo
          </div>
          <div style={{ fontFamily: '"Share Tech Mono"', fontSize: '13px', color: '#f0f0f0' }}>
            Más de 7 años de formación académica y profesional constante. La educación no termina — cada proyecto es una nueva lección.
          </div>
        </div>
      </div>
    </section>
  )
}
