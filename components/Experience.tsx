'use client'

import { useEffect, useRef, useState } from 'react'

type Job = {
  title: string
  company: string
  location: string
  period: string
  duration: string
  type: 'remote' | 'hybrid' | 'onsite'
  description: string[]
  tech: string[]
  color: string
  icon: string
  level: number
}

const jobs: Job[] = [
  {
    title: 'Senior PHP Developer',
    company: 'Nu Image Medical',
    location: 'Tampa, Florida, EE.UU.',
    period: 'Nov. 2024 - Actualmente',
    duration: '7 meses',
    type: 'remote',
    description: [
      'Desarrollo y mejoras de app de telemedicina Romodoc para lanzamiento en EE.UU.',
      'Manejo de PHP avanzado con Laravel Nova v4 y MySQL.',
      'Integraciones API de servicios tercerizados y multitenant para marca blanca.',
    ],
    tech: ['PHP', 'Laravel v10', 'Laravel Nova v4', 'MySQL', 'Vue.js', 'Trello', 'ClickUp'],
    color: '#00ffff',
    icon: '🏥',
    level: 10,
  },
  {
    title: 'Desarrollador Full Stack',
    company: 'Xorex de Colombia',
    location: 'Bogotá, Colombia',
    period: 'Oct. 2024 - Actualmente',
    duration: '7 meses',
    type: 'hybrid',
    description: [
      'Desarrollo de aplicativos web basados en proyectos empresariales.',
      'Uso de Docker y Ubuntu Server para despliegues en contenedores.',
      'Proyectos destacados: doctoren.com y tupsicologo.com.',
    ],
    tech: ['PHP', 'Laravel v10-12', 'FilamentPHP v3', 'Livewire', 'MySQL', 'PostgreSQL', 'Docker', 'React', 'Vue.js'],
    color: '#ffd700',
    icon: '🏢',
    level: 9,
  },
  {
    title: 'Desarrollador Web Semi-Senior',
    company: 'El Tiempo Casa Editorial (via Michael Page)',
    location: 'Bogotá, Colombia',
    period: 'Jun. 2024 - Sep. 2024',
    duration: '3 meses',
    type: 'hybrid',
    description: [
      'Apoyo en nuevas estrategias de desarrollo e integraciones en proyectos existentes.',
      'Automatizaciones y gestión de suscripciones mediante Piano.',
      'Solución de casos de Servicio al Cliente.',
    ],
    tech: ['PHP', 'Laravel 8/9/10', 'Zend Framework', 'MySQL', 'MongoDB', 'PgSQL', 'Azure', 'Jenkins', 'Loopback.js'],
    color: '#ff00aa',
    icon: '📰',
    level: 8,
  },
  {
    title: 'Desarrollador Angular Junior',
    company: 'Synergica Solutions S.A.S',
    location: 'Bogotá, Colombia',
    period: 'Mar. 2024 - Jun. 2024',
    duration: '2 meses',
    type: 'onsite',
    description: [
      'Desarrollo y actualización de sistema Syncro2.0 con Angular y Laravel.',
      'Despliegues con Docker y AWS EC2.',
      'Mejoramiento de interfaces y desarrollo de nuevos Endpoints de API.',
    ],
    tech: ['Angular', 'TypeScript', 'Laravel', 'PostgreSQL', 'Docker', 'AWS EC2', 'Jira'],
    color: '#00ff41',
    icon: '⚡',
    level: 7,
  },
  {
    title: 'Desarrollador de Transformación Digital',
    company: 'Meltec Comunicaciones',
    location: 'Bogotá, Colombia',
    period: 'Mar. 2023 - Dic. 2023',
    duration: '9 meses',
    type: 'onsite',
    description: [
      'Desarrollo de páginas web para Meltec y aliados comerciales.',
      'Integración API con SAP y Flokzu.',
      'Automatización de procesos y desarrollo de framework interno basado en Laravel.',
    ],
    tech: ['PHP', 'Python', 'Node.js', 'Laravel', 'MySQL', 'JavaScript'],
    color: '#ff6b00',
    icon: '🔧',
    level: 6,
  },
  {
    title: 'Ingeniero de Software',
    company: 'Alfastreet Colombia SAS',
    location: 'Bogotá, Colombia',
    period: 'Jul. 2022 - Feb. 2023',
    duration: '7 meses',
    type: 'onsite',
    description: [
      'Desarrollo de software ERP para administración general y financiera.',
      'CRM Bitrix24 con integraciones de formularios y redes sociales.',
      'Integración de sistema PBX telefónico para callcenter.',
    ],
    tech: ['PHP', 'Python', 'Java', 'Node.js', 'Laravel', 'MySQL'],
    color: '#8b00ff',
    icon: '💼',
    level: 5,
  },
  {
    title: 'DevOps & Web Developer',
    company: 'Sense Digital',
    location: 'Bogotá, Colombia',
    period: 'Feb. 2022 - Jul. 2022',
    duration: '5 meses',
    type: 'onsite',
    description: [
      'Creación y mantenimiento de sitios web con WordPress y Shopify.',
      'Diagnóstico y mantenimiento de bases de datos.',
      'Optimización de servidores mediante cPanel.',
    ],
    tech: ['PHP', 'WordPress', 'Shopify', 'cPanel', 'Zabbrix'],
    color: '#00ffff',
    icon: '🌐',
    level: 4,
  },
  {
    title: 'Programador Jr.',
    company: 'FF Soluciones S.A.',
    location: 'Bogotá, Colombia',
    period: 'Dic. 2020 - Feb. 2022',
    duration: '1 Año 2 Meses',
    type: 'onsite',
    description: [
      'Rediseño total del sitio web ffsoluciones.com.',
      'Incremento de ventas por internet y publicidad en redes sociales.',
      'Creación de CMS para el área comercial interior y exterior.',
    ],
    tech: ['PHP', 'Shopify', 'WordPress', 'JavaScript', 'Node.js', 'Laravel', 'MySQL'],
    color: '#ff00aa',
    icon: '🚀',
    level: 1,
  },
]

export default function Experience() {
  const [visible, setVisible] = useState(false)
  const [activeJob, setActiveJob] = useState<number | null>(null)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="experience"
      ref={ref}
      className="py-24 px-4 relative"
      style={{ background: '#0d0d1a' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <div style={{ fontFamily: '"Press Start 2P"', fontSize: 'clamp(12px, 2.5vw, 20px)', color: '#ffd700', textShadow: '0 0 20px #ffd700' }}>
            ⚔️ EXPERIENCIA
          </div>
          <div className="flex-1 h-0.5" style={{ background: 'linear-gradient(90deg, #ffd700, transparent)' }} />
          <div style={{ fontFamily: '"Press Start 2P"', fontSize: '8px', color: '#4a4a7a' }}>STAGE 02</div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-0.5 hidden md:block"
            style={{
              background: 'linear-gradient(180deg, #00ffff, #ffd700, #ff00aa, #00ff41)',
              boxShadow: '0 0 6px rgba(0,255,255,0.5)',
              transition: 'height 2s ease',
            }}
          />

          <div className="space-y-6">
            {jobs.map((job, i) => (
              <div
                key={i}
                className={`relative transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-3.5 top-6 w-5 h-5 hidden md:flex items-center justify-center"
                  style={{
                    background: job.color,
                    boxShadow: `0 0 10px ${job.color}`,
                    fontSize: '10px',
                    zIndex: 10,
                  }}
                >
                </div>

                {/* Job card */}
                <div
                  className="md:ml-16 cursor-pointer transition-all duration-200 hover:scale-[1.01]"
                  onClick={() => setActiveJob(activeJob === i ? null : i)}
                  style={{
                    border: `2px solid ${activeJob === i ? job.color : '#1a1a3e'}`,
                    background: activeJob === i ? `rgba(0,0,0,0.5)` : 'rgba(13,13,26,0.8)',
                    boxShadow: activeJob === i ? `0 0 20px ${job.color}40` : 'none',
                  }}
                >
                  {/* Header */}
                  <div className="p-4 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{job.icon}</span>
                      <div>
                        <div style={{ fontFamily: '"Orbitron"', fontSize: '14px', fontWeight: 700, color: job.color }}>
                          {job.title}
                        </div>
                        <div style={{ fontFamily: '"Share Tech Mono"', fontSize: '13px', color: '#f0f0ff', marginTop: '2px' }}>
                          {job.company}
                        </div>
                        <div className="flex flex-wrap gap-3 mt-1">
                          <span style={{ fontFamily: '"Share Tech Mono"', fontSize: '11px', color: '#4a4a7a' }}>
                            📍 {job.location}
                          </span>
                          <span style={{ fontFamily: '"Share Tech Mono"', fontSize: '11px', color: '#4a4a7a' }}>
                            📅 {job.period}
                          </span>
                          <span
                            style={{
                              fontFamily: '"Press Start 2P"',
                              fontSize: '7px',
                              color: job.type === 'remote' ? '#00ff41' : job.type === 'hybrid' ? '#ffd700' : '#4a4a7a',
                              padding: '2px 6px',
                              border: `1px solid ${job.type === 'remote' ? '#00ff41' : job.type === 'hybrid' ? '#ffd700' : '#4a4a7a'}`,
                            }}
                          >
                            {job.type.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-shrink-0 text-right">
                      <div style={{ fontFamily: '"Press Start 2P"', fontSize: '7px', color: '#4a4a7a' }}>{job.duration}</div>
                      <div style={{ fontFamily: '"Press Start 2P"', fontSize: '8px', color: job.color, marginTop: '4px' }}>
                        LVL {job.level}
                      </div>
                      <div style={{ fontFamily: '"Press Start 2P"', fontSize: '10px', color: '#4a4a7a', marginTop: '4px' }}>
                        {activeJob === i ? '▲' : '▼'}
                      </div>
                    </div>
                  </div>

                  {/* Expanded */}
                  {activeJob === i && (
                    <div
                      className="px-4 pb-4 pt-0"
                      style={{ borderTop: `1px solid ${job.color}40` }}
                    >
                      <ul className="space-y-2 mb-4 mt-3">
                        {job.description.map((d, j) => (
                          <li key={j} className="flex gap-2">
                            <span style={{ color: job.color, flexShrink: 0 }}>▶</span>
                            <span style={{ fontFamily: '"Share Tech Mono"', fontSize: '12px', color: '#a0a0c0', lineHeight: '1.6' }}>{d}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {job.tech.map(t => (
                          <span
                            key={t}
                            style={{
                              fontFamily: '"Share Tech Mono"',
                              fontSize: '10px',
                              color: job.color,
                              background: `${job.color}15`,
                              border: `1px solid ${job.color}50`,
                              padding: '2px 8px',
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
