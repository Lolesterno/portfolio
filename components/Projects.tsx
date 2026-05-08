'use client'

import Image, { StaticImageData } from 'next/image'
import { useEffect, useRef, useState } from 'react'

import LogoTupsi from "@/assets/portfolio/logos/tupsilogo.webp";
import DoctorOneLogo from "@/assets/portfolio/logos/doctoronelogo.svg";
import RomodocLogo from "@/assets/portfolio/logos/romodoclogo.avif";
import MeltecLogo from "@/assets/portfolio/logos/melteclogo.png";
import LaravelLogo from '@/assets/portfolio/logos/laravellogo.svg'

type Project = {
  name: string
  tagline: string
  description: string
  tech: string[]
  category: string
  color: string
  bgColor: string
  icon: StaticImageData
  url?: string
  highlights: string[]
  status: 'LIVE' | 'WIP' | 'COMPLETED'
  featured?: boolean
}

type GitHubRepo = {
  id: number
  name: string
  description: string | null
  url: string
  updatedAt: string
  language: string | null
  stars: number
}


// REPOSITORIOS GITHUB ----------------------------------

const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  PHP: '#777bb4',
  Python: '#3572A5',
  Java: '#b07219',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Vue: '#41b883',
  default: '#ebe8e8',
}

function formatRelativeDate(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'HOY'
  if (days === 1) return 'AYER'
  if (days < 30) return `HACE ${days}D`
  const months = Math.floor(days / 30)
  if (months < 12) return `HACE ${months}M`
  return `HACE ${Math.floor(months / 12)}A`
}

// PROYECTOS TRABAJADOS -------------------------------------

const projects: Project[] = [
  {
    name: 'DoctorOne.com',
    tagline: 'Plataforma de Teleconsulta Médica',
    description: 'Plataforma web completa de telemedicina que conecta pacientes con médicos especializados. Sistema de agendamiento en línea, videoconsultas, historias clínicas digitales y pagos integrados.',
    tech: ['PHP', 'Laravel', 'FilamentPHP', 'MySQL', 'Vue.js', 'Docker'],
    category: 'HEALTH TECH',
    color: '#00ffff',
    bgColor: 'rgba(0,255,255,0.05)',
    icon: DoctorOneLogo,
    url: 'https://doctorone.com',
    highlights: [
      'Agendamiento en línea con médicos especializados',
      'Historias clínicas digitales seguras',
      'Panel administrativo con FilamentPHP',
      'Arquitectura multi-tenant escalable',
    ],
    status: 'LIVE',
    featured: true,
  },
  {
    name: 'TuPsicologo.com',
    tagline: 'Conexión con Psicólogos Profesionales',
    description: 'Plataforma especializada en salud mental que permite a usuarios encontrar y agendar sesiones con psicólogos certificados. Incluye perfiles de especialistas, reseñas verificadas y sistema de pagos.',
    tech: ['PHP', 'Laravel', 'Django', 'PostgreSQL', 'React', 'Docker'],
    category: 'MENTAL HEALTH',
    color: '#ff00aa',
    bgColor: 'rgba(255,0,170,0.05)',
    icon: LogoTupsi,
    url: 'https://tupsicologo.com',
    highlights: [
      'Directorio de psicólogos certificados',
      'Sistema de reseñas y calificaciones verificadas',
      'Agendamiento y sesiones virtuales',
      'Panel de gestión para profesionales',
    ],
    status: 'LIVE',
    featured: true,
  },
  {
    name: 'Romodoc TeleMed',
    tagline: 'App Telemedicina para EE.UU.',
    description: 'Aplicación de telemedicina desarrollada para Nu Image Medical, orientada al mercado estadounidense. Soporte multitenant para marca blanca con integraciones a servicios de terceros via API.',
    tech: ['PHP', 'Laravel Nova v4', 'MySQL', 'Vue.js', 'API Integrations'],
    category: 'TELEHEALTH USA',
    color: '#ffd700',
    bgColor: 'rgba(255,215,0,0.05)',
    icon: RomodocLogo,
    highlights: [
      'Arquitectura multitenant para marca blanca',
      'Integraciones API con servicios médicos de EE.UU.',
      'Laravel Nova v4 para panel administrativo avanzado',
      'Preparado para lanzamiento en mercado americano',
    ],
    status: 'WIP',
  },
  {
    name: 'ERP Administrativo & Financiero',
    tagline: 'Software empresarial integral',
    description: 'Sistema ERP completo para administración general y financiera de empresa. Módulos de venta integrados con CRM Bitrix24, integraciones de formularios, redes sociales y sistema PBX telefónico.',
    tech: ['PHP', 'Java', 'Python', 'Laravel', 'MySQL', 'Bitrix24', 'Node.js'],
    category: 'ENTERPRISE',
    color: '#8b00ff',
    bgColor: 'rgba(139,0,255,0.05)',
    icon: MeltecLogo,
    highlights: [
      'Módulos completos de contabilidad y ventas',
      'CRM integrado con Bitrix24',
      'Sistema PBX para seguimiento de callcenter',
      'Automatización de ventas',
    ],
    status: 'COMPLETED',
  },
  {
    name: 'Framework Interno Laravel',
    tagline: 'Arquitectura base reutilizable',
    description: 'Framework interno desarrollado en base a Laravel para estandarizar el desarrollo de nuevas aplicaciones web en Meltec Comunicaciones. Incluye módulos de CRON Jobs, automatizaciones y conectores API.',
    tech: ['PHP', 'Laravel', 'Python', 'Node.js', 'MySQL', 'SAP', 'Flokzu'],
    category: 'TOOLING',
    color: '#ff6b00',
    bgColor: 'rgba(255,107,0,0.05)',
    icon: LaravelLogo,
    highlights: [
      'Módulos reutilizables para proyectos empresariales',
      'Integración con SAP y Flokzu',
      'CRON Jobs y automatización de entregas',
      'Arquitectura extensible basada en Laravel',
    ],
    status: 'COMPLETED',
  },
  {
    name: 'Syncro 2.0',
    tagline: 'Modernización de sistema legado',
    description: 'Actualización y modernización del sistema Syncro a nuevas tecnologías. Migración a Angular con TypeScript para el frontend y nuevos endpoints de API con Laravel en el backend.',
    tech: ['Angular', 'TypeScript', 'Laravel', 'PostgreSQL', 'Docker', 'AWS EC2'],
    category: 'MIGRATION',
    color: '#00ff41',
    bgColor: 'rgba(0,255,65,0.05)',
    icon: LaravelLogo,
    highlights: [
      'Migración de sistema legado a Angular',
      'Despliegue containerizado con Docker en AWS EC2',
      'Nuevos endpoints RESTful',
      'Mejoras de UI/UX',
    ],
    status: 'COMPLETED',
  },
]

const statusColors: Record<string, string> = {
  LIVE: '#00ff41',
  WIP: '#ffd700',
  COMPLETED: '#ebe8e8',
}

export default function Projects() {
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState<number | null>(null)
  const [filter, setFilter] = useState<'ALL' | 'LIVE' | 'FEATURED'>('ALL')

  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [reposLoading, setReposLoading] = useState(true)
  const [reposError, setReposError] = useState(false);

  useEffect(() => {
    fetch('/api/github-repos')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(setRepos)
      .catch(() => setReposError(true))
      .finally(() => setReposLoading(false))
  }, [])

  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const filtered = projects.filter(p => {
    if (filter === 'LIVE') return p.status === 'LIVE'
    if (filter === 'FEATURED') return p.featured
    return true
  })

  return (
    <section
      id="projects"
      ref={ref}
      className="py-24 px-4 relative grid-bg"
      style={{ background: 'linear-gradient(180deg, #0d0d1a, #0a0a0f)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-8">
          <div style={{ fontFamily: '"Press Start 2P"', fontSize: 'clamp(12px, 2.5vw, 20px)', color: '#ff00aa', textShadow: '0 0 20px #ff00aa' }}>
            🎮 PROYECTOS
          </div>
          <div className="flex-1 h-0.5" style={{ background: 'linear-gradient(90deg, #ff00aa, transparent)' }} />
          <div style={{ fontFamily: '"Press Start 2P"', fontSize: '8px', color: '#ebe8e8' }}>STAGE 03</div>
        </div>

        {/* Filter buttons */}
        <div className="flex gap-3 mb-12 flex-wrap">
          {(['ALL', 'LIVE', 'FEATURED'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="arcade-btn"
              style={{
                color: filter === f ? '#0a0a0f' : '#ebe8e8',
                background: filter === f ? '#ff00aa' : 'transparent',
                borderColor: filter === f ? '#ff00aa' : '#ebe8e8',
                boxShadow: filter === f ? '0 0 15px #ff00aa' : 'none',
                fontSize: '7px',
              }}
            >
              {f === 'FEATURED' ? '⭐ ' : ''}{f}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <div
              key={project.name}
              className={`relative cursor-pointer transition-all duration-500 group ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{
                transitionDelay: `${i * 100}ms`,
                border: `2px solid ${selected === i ? project.color : '#1a1a3e'}`,
                background: project.bgColor,
                boxShadow: selected === i ? `0 0 25px ${project.color}50` : 'none',
              }}
              onClick={() => setSelected(selected === i ? null : i)}
            >
              {/* Featured badge */}
              {project.featured && (
                <div
                  className="absolute -top-3 -right-3 px-2 py-1"
                  style={{
                    fontFamily: '"Press Start 2P"',
                    fontSize: '6px',
                    background: '#ffd700',
                    color: '#0a0a0f',
                    boxShadow: '0 0 10px #ffd700',
                  }}
                >
                  ★ FEATURED
                </div>
              )}

              <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Image src={project.icon} alt={`${project.name}-Logo`} className='max-w-40' />

                    <div>
                      <div
                        style={{
                          fontFamily: '"Press Start 2P"',
                          fontSize: '7px',
                          color: project.color,
                          marginBottom: '2px',
                        }}
                      >
                        {project.category}
                      </div>
                      <div
                        className="group-hover:text-shadow"
                        style={{
                          fontFamily: '"Orbitron"',
                          fontSize: '14px',
                          fontWeight: 700,
                          color: '#f0f0ff',
                        }}
                      >
                        {project.name}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: '"Press Start 2P"',
                      fontSize: '6px',
                      color: statusColors[project.status],
                      border: `1px solid ${statusColors[project.status]}`,
                      padding: '3px 6px',
                      boxShadow: project.status === 'LIVE' ? `0 0 8px ${statusColors[project.status]}` : 'none',
                      flexShrink: 0,
                    }}
                  >
                    {project.status === 'LIVE' ? '● ' : ''}{project.status}
                  </div>
                </div>

                <div
                  style={{
                    fontFamily: '"Share Tech Mono"',
                    fontSize: '11px',
                    color: project.color,
                    marginBottom: '8px',
                    fontStyle: 'italic',
                  }}
                >
                  {project.tagline}
                </div>

                <p style={{ fontFamily: '"Share Tech Mono"', fontSize: '11px', color: '#f0f0f0', lineHeight: '1.6', marginBottom: '12px' }}>
                  {project.description}
                </p>

                {/* Expanded highlights */}
                {selected === i && (
                  <div className="mb-4" style={{ borderTop: `1px solid ${project.color}30`, paddingTop: '12px' }}>
                    <div style={{ fontFamily: '"Press Start 2P"', fontSize: '7px', color: project.color, marginBottom: '8px' }}>
                      ★ HIGHLIGHTS
                    </div>
                    <ul className="space-y-2">
                      {project.highlights.map((h, j) => (
                        <li key={j} className="flex gap-2">
                          <span style={{ color: project.color, fontSize: '10px', flexShrink: 0 }}>▶</span>
                          <span style={{ fontFamily: '"Share Tech Mono"', fontSize: '11px', color: '#edede4' }}>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tech.map(t => (
                    <span
                      key={t}
                      style={{
                        fontFamily: '"Share Tech Mono"',
                        fontSize: '9px',
                        color: project.color,
                        background: `${project.color}15`,
                        border: `1px solid ${project.color}40`,
                        padding: '1px 6px',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="flex-1 text-center py-2 transition-all"
                      style={{
                        fontFamily: '"Press Start 2P"',
                        fontSize: '7px',
                        color: project.color,
                        border: `1px solid ${project.color}`,
                        boxShadow: `0 0 8px ${project.color}40`,
                      }}
                    >
                      🌐 VER LIVE
                    </a>
                  )}
                  <button
                    className="flex-1 py-2"
                    style={{
                      fontFamily: '"Press Start 2P"',
                      fontSize: '7px',
                      color: '#ebe8e8',
                      border: '1px solid #1a1a3e',
                    }}
                    onClick={() => setSelected(selected === i ? null : i)}
                  >
                    {selected === i ? '▲ MENOS' : '▼ MÁS INFO'}
                  </button>
                </div>
              </div>

              {/* Bottom bar */}
              <div style={{ height: '3px', background: project.color, boxShadow: `0 0 8px ${project.color}` }} />
            </div>
          ))}
        </div>

        {/* Github Repos */}
        <div className="mt-20">
          <div className="flex items-center gap-4 mb-8">
            <div
              style={{
                fontFamily: '"Press Start 2P"',
                fontSize: 'clamp(10px, 2vw, 16px)',
                color: '#00ff41',
                textShadow: '0 0 20px #00ff41',
              }}
            >
              🐙 GITHUB REPOS
            </div>
            <div className="flex-1 h-0.5" style={{ background: 'linear-gradient(90deg, #00ff41, transparent)' }} />
            <a
              href="https://github.com/Lolesterno"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: '"Press Start 2P"',
                fontSize: '7px',
                color: '#00ff41',
                border: '1px solid #00ff41',
                padding: '4px 10px',
                boxShadow: '0 0 10px #00ff4140',
              }}
            >
              VER TODO →
            </a>
          </div>

          {reposLoading && (
            <div
              style={{ fontFamily: '"Share Tech Mono"', fontSize: '12px', color: '#ebe8e8' }}
              className="text-center py-12"
            >
              {'> FETCHING REPOS...'}
            </div>
          )}
          {reposError && (
            <div
              style={{ fontFamily: '"Share Tech Mono"', fontSize: '12px', color: '#ff4444' }}
              className="text-center py-12"
            >
              {'> ERROR: GITHUB API UNREACHABLE'}
            </div>
          )}

          {!reposLoading && !reposError && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {repos.map((repo, i) => (
                <a
                  key={repo.id}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block group transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  style={{
                    transitionDelay: `${i * 60}ms`,
                    border: '1px solid #1a1a3e',
                    background: 'rgba(0,255,65,0.03)',
                    padding: '16px',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#00ff41'
                    e.currentTarget.style.boxShadow = '0 0 15px #00ff4130'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#1a1a3e'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {/* Nombre del repo */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span
                      style={{
                        fontFamily: '"Orbitron"',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#00ff41',
                        wordBreak: 'break-all',
                      }}
                    >
                      {repo.name}
                    </span>
                    {repo.stars > 0 && (
                      <span
                        style={{
                          fontFamily: '"Share Tech Mono"',
                          fontSize: '10px',
                          color: '#ffd700',
                          flexShrink: 0,
                        }}
                      >
                        ★ {repo.stars}
                      </span>
                    )}
                  </div>

                  {/* Descripción */}
                  <p
                    style={{
                      fontFamily: '"Share Tech Mono"',
                      fontSize: '11px',
                      color: '#f0f0f0',
                      lineHeight: '1.5',
                      minHeight: '34px',
                      marginBottom: '12px',
                    }}
                  >
                    {repo.description ?? '// sin descripción'}
                  </p>

                  {/* Footer: lenguaje + fecha */}
                  <div className="flex items-center justify-between">
                    {repo.language ? (
                      <span
                        style={{
                          fontFamily: '"Share Tech Mono"',
                          fontSize: '10px',
                          color: languageColors[repo.language] ?? languageColors.default,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                        }}
                      >
                        <span
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: languageColors[repo.language] ?? languageColors.default,
                            display: 'inline-block',
                            boxShadow: `0 0 6px ${languageColors[repo.language] ?? languageColors.default}`,
                          }}
                        />
                        {repo.language}
                      </span>
                    ) : (
                      <span />
                    )}
                    <span
                      style={{
                        fontFamily: '"Press Start 2P"',
                        fontSize: '6px',
                        color: '#ebe8e8',
                      }}
                    >
                      {formatRelativeDate(repo.updatedAt)}
                    </span>
                  </div>

                  {/* Barra inferior */}
                  <div
                    className="mt-3 transition-all duration-300"
                    style={{
                      height: '2px',
                      background: languageColors[repo.language ?? ''] ?? '#1a1a3e',
                      opacity: 0.5,
                    }}
                  />
                </a>
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
