'use client'

import { useEffect, useRef, useState } from 'react'

type Skill = { name: string; icon: string; level: number; color: string }
type Category = { label: string; icon: string; color: string; skills: Skill[] }

const categories: Category[] = [
  {
    label: 'BACKEND',
    icon: '⚙️',
    color: '#7c3aed',
    skills: [
      { name: 'PHP', icon: '🐘', level: 95, color: '#7c3aed' },
      { name: 'Laravel', icon: '🔺', level: 95, color: '#ff2d20' },
      { name: 'Python', icon: '🐍', level: 65, color: '#3776ab' },
      { name: 'Java', icon: '☕', level: 55, color: '#f89820' },
      { name: 'Node.js', icon: '🟢', level: 70, color: '#339933' },
      { name: 'Laravel Nova', icon: '⭐', level: 85, color: '#ff2d20' },
      { name: 'FilamentPHP', icon: '🔥', level: 85, color: '#f59e0b' },
      { name: 'Livewire', icon: '⚡', level: 80, color: '#fb70a9' },
    ],
  },
  {
    label: 'FRONTEND',
    icon: '🎨',
    color: '#00ffff',
    skills: [
      { name: 'JavaScript', icon: '🟡', level: 85, color: '#f7df1e' },
      { name: 'TypeScript', icon: '🔷', level: 80, color: '#3178c6' },
      { name: 'Vue.js', icon: '💚', level: 80, color: '#42b883' },
      { name: 'React', icon: '⚛️', level: 75, color: '#61dafb' },
      { name: 'Angular', icon: '🔴', level: 65, color: '#dd0031' },
      { name: 'Tailwind CSS', icon: '🌊', level: 80, color: '#06b6d4' },
    ],
  },
  {
    label: 'BASES DE DATOS',
    icon: '🗄️',
    color: '#00ff41',
    skills: [
      { name: 'MySQL', icon: '🐬', level: 90, color: '#4479a1' },
      { name: 'PostgreSQL', icon: '🐘', level: 80, color: '#336791' },
      { name: 'MongoDB', icon: '🍃', level: 65, color: '#13aa52' },
      { name: 'SQL Avanzado', icon: '📊', level: 85, color: '#00ff41' },
    ],
  },
  {
    label: 'CLOUD & DEVOPS',
    icon: '☁️',
    color: '#ff6b00',
    skills: [
      { name: 'Docker', icon: '🐳', level: 80, color: '#2496ed' },
      { name: 'AWS EC2', icon: '☁️', level: 70, color: '#ff9900' },
      { name: 'Azure', icon: '🔵', level: 60, color: '#0078d4' },
      { name: 'Jenkins', icon: '🔧', level: 60, color: '#d33833' },
      { name: 'Ubuntu Server', icon: '🐧', level: 75, color: '#e95420' },
      { name: 'cPanel', icon: '🖥️', level: 75, color: '#ff6c2c' },
    ],
  },
  {
    label: 'HERRAMIENTAS',
    icon: '🛠️',
    color: '#ff00aa',
    skills: [
      { name: 'Git', icon: '🌿', level: 90, color: '#f05032' },
      { name: 'Jira / Scrum', icon: '📋', level: 85, color: '#0052cc' },
      { name: 'ClickUp', icon: '✅', level: 85, color: '#7b68ee' },
      { name: 'WordPress', icon: '🔵', level: 80, color: '#21759b' },
      { name: 'Shopify', icon: '🛍️', level: 75, color: '#96bf48' },
      { name: 'SAP', icon: '🏢', level: 55, color: '#0078d4' },
    ],
  },
]

const levelToRank = (level: number): string => {
  if (level >= 90) return 'MASTER'
  if (level >= 80) return 'EXPERT'
  if (level >= 70) return 'ADVANCED'
  if (level >= 60) return 'INTERMEDIATE'
  return 'JUNIOR'
}

const levelToStars = (level: number): number => {
  if (level >= 90) return 5
  if (level >= 80) return 4
  if (level >= 70) return 3
  if (level >= 60) return 2
  return 1
}

export default function Skills() {
  const [visible, setVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState(0)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const category = categories[activeCategory]

  return (
    <section
      id="skills"
      ref={ref}
      className="py-24 px-4 relative"
      style={{ background: '#0a0a0f' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-12">
          <div style={{ fontFamily: '"Press Start 2P"', fontSize: 'clamp(12px, 2.5vw, 20px)', color: '#00ff41', textShadow: '0 0 20px #00ff41' }}>
            ⚡ SKILLS
          </div>
          <div className="flex-1 h-0.5" style={{ background: 'linear-gradient(90deg, #00ff41, transparent)' }} />
          <div style={{ fontFamily: '"Press Start 2P"', fontSize: '8px', color: '#4a4a7a' }}>STAGE 04</div>
        </div>

        {/* Category selector */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat, i) => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(i)}
              className="px-4 py-3 transition-all duration-150"
              style={{
                fontFamily: '"Press Start 2P"',
                fontSize: '7px',
                color: activeCategory === i ? '#0a0a0f' : cat.color,
                background: activeCategory === i ? cat.color : 'transparent',
                border: `2px solid ${cat.color}`,
                boxShadow: activeCategory === i ? `0 0 15px ${cat.color}` : `0 0 5px ${cat.color}40`,
                cursor: 'pointer',
              }}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div
          className={`transition-all duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
        >
          <div
            className="p-6 mb-6"
            style={{
              border: `2px solid ${category.color}`,
              boxShadow: `0 0 20px ${category.color}30`,
              background: `${category.color}05`,
            }}
          >
            <div style={{ fontFamily: '"Press Start 2P"', fontSize: '9px', color: category.color, marginBottom: '16px' }}>
              {category.icon} {category.label} — {category.skills.length} TECNOLOGÍAS
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {category.skills.map((skill, i) => (
                <div
                  key={skill.name}
                  className="p-4 group hover:scale-105 transition-all duration-150"
                  style={{
                    border: `1px solid ${skill.color}50`,
                    background: `${skill.color}08`,
                    transitionDelay: `${i * 50}ms`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{skill.icon}</span>
                    <div>
                      <div style={{ fontFamily: '"Orbitron"', fontSize: '11px', fontWeight: 700, color: '#f0f0ff' }}>
                        {skill.name}
                      </div>
                      <div style={{ fontFamily: '"Press Start 2P"', fontSize: '6px', color: skill.color }}>
                        {levelToRank(skill.level)}
                      </div>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <span
                        key={j}
                        style={{
                          fontSize: '10px',
                          color: j < levelToStars(skill.level) ? skill.color : '#1a1a3e',
                          textShadow: j < levelToStars(skill.level) ? `0 0 6px ${skill.color}` : 'none',
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Mini progress */}
                  <div style={{ height: '4px', background: '#1a1a3e', border: `1px solid ${skill.color}30` }}>
                    <div
                      style={{
                        height: '100%',
                        width: visible ? `${skill.level}%` : '0%',
                        background: skill.color,
                        boxShadow: `0 0 4px ${skill.color}`,
                        transition: `width 1.2s ease ${i * 60}ms`,
                      }}
                    />
                  </div>
                  <div className="flex justify-end mt-1">
                    <span style={{ fontFamily: '"Press Start 2P"', fontSize: '6px', color: '#4a4a7a' }}>
                      {skill.level}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { lang: 'Español', level: 'NATIVO', pct: 100, color: '#00ff41', flag: '🇨🇴' },
              { lang: 'English', level: 'INTERMEDIATE', pct: 65, color: '#ffd700', flag: '🇺🇸' },
            ].map(l => (
              <div key={l.lang} className="p-4" style={{ border: `1px solid ${l.color}40`, background: `${l.color}05` }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{l.flag}</span>
                  <div>
                    <div style={{ fontFamily: '"Orbitron"', fontSize: '14px', fontWeight: 700, color: '#f0f0ff' }}>{l.lang}</div>
                    <div style={{ fontFamily: '"Press Start 2P"', fontSize: '7px', color: l.color }}>{l.level}</div>
                  </div>
                </div>
                <div style={{ height: '8px', background: '#1a1a3e', border: `1px solid ${l.color}30` }}>
                  <div
                    style={{
                      height: '100%',
                      width: visible ? `${l.pct}%` : '0%',
                      background: `repeating-linear-gradient(90deg, ${l.color} 0px, ${l.color} 8px, transparent 8px, transparent 10px)`,
                      boxShadow: `0 0 6px ${l.color}`,
                      transition: 'width 1.5s ease',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
