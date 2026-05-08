'use client'

import { useState } from 'react'

const contactInfo = [
  {
    icon: '📧',
    label: 'EMAIL',
    value: 'Jose_nico2000@hotmail.com',
    href: 'mailto:Jose_nico2000@hotmail.com',
    color: '#ffd700',
  },
  {
    icon: '📞',
    label: 'TELÉFONO',
    value: '+57 313 280 3746',
    href: 'tel:+573132803746',
    color: '#00ffff',
  },
  {
    icon: '🔗',
    label: 'LINKEDIN',
    value: 'nicolas-cuadros-b099531a9',
    href: 'https://www.linkedin.com/in/nicolas-cuadros-b099531a9/',
    color: '#0066ff',
  },
  {
    icon: '📍',
    label: 'UBICACIÓN',
    value: 'Bogotá, D.C., Colombia',
    href: null,
    color: '#ff00aa',
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    setSending(true)
    await new Promise(r => setTimeout(r, 1500))
    setSending(false)
    setSent(true)
  }

  return (
    <section
      id="contact"
      className="py-24 px-4 relative"
      style={{ background: '#0d0d1a' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <div style={{ fontFamily: '"Press Start 2P"', fontSize: 'clamp(12px, 2.5vw, 20px)', color: '#ff6b00', textShadow: '0 0 20px #ff6b00' }}>
            📡 CONTACTO
          </div>
          <div className="flex-1 h-0.5" style={{ background: 'linear-gradient(90deg, #ff6b00, transparent)' }} />
          <div style={{ fontFamily: '"Press Start 2P"', fontSize: '8px', color: '#4a4a7a' }}>STAGE 06</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Info */}
          <div>
            <div className="mb-8">
              <div style={{ fontFamily: '"Press Start 2P"', fontSize: '11px', color: '#f0f0ff', marginBottom: '12px' }}>
                ¿LISTO PARA COLABORAR?
              </div>
              <p style={{ fontFamily: '"Share Tech Mono"', fontSize: '14px', color: '#6a6a9a', lineHeight: '1.8' }}>
                Disponible para proyectos freelance, posiciones senior y colaboraciones técnicas. Experiencia en equipos remotos internacionales.
              </p>
            </div>

            {/* Contact cards */}
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <div
                  key={info.label}
                  style={{
                    border: `1px solid ${info.color}40`,
                    background: `${info.color}05`,
                    padding: '12px 16px',
                  }}
                >
                  {info.href ? (
                    <a
                      href={info.href}
                      target={info.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 group"
                    >
                      <span className="text-xl">{info.icon}</span>
                      <div>
                        <div style={{ fontFamily: '"Press Start 2P"', fontSize: '7px', color: '#4a4a7a', marginBottom: '2px' }}>{info.label}</div>
                        <div style={{ fontFamily: '"Share Tech Mono"', fontSize: '13px', color: info.color, textDecoration: 'underline' }}>
                          {info.value}
                        </div>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{info.icon}</span>
                      <div>
                        <div style={{ fontFamily: '"Press Start 2P"', fontSize: '7px', color: '#4a4a7a', marginBottom: '2px' }}>{info.label}</div>
                        <div style={{ fontFamily: '"Share Tech Mono"', fontSize: '13px', color: info.color }}>{info.value}</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Availability status */}
            <div
              className="mt-8 p-4"
              style={{
                border: '2px solid #00ff41',
                boxShadow: '0 0 20px rgba(0,255,65,0.2)',
                background: 'rgba(0,255,65,0.05)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: '#00ff41', boxShadow: '0 0 10px #00ff41', animation: 'pulseNeon 2s ease-in-out infinite' }}
                />
                <div>
                  <div style={{ fontFamily: '"Press Start 2P"', fontSize: '8px', color: '#00ff41' }}>DISPONIBLE</div>
                  <div style={{ fontFamily: '"Share Tech Mono"', fontSize: '11px', color: '#4a4a7a', marginTop: '2px' }}>
                    Abierto a nuevas oportunidades
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          {/* <div
            className="p-6"
            style={{
              border: '2px solid #1a1a3e',
              background: 'rgba(13,13,26,0.8)',
            }}
          >
            {!sent ? (
              <div>
                <div style={{ fontFamily: '"Press Start 2P"', fontSize: '9px', color: '#ff6b00', marginBottom: '20px' }}>
                  {'>'} ENVIAR MENSAJE
                </div>

                <div className="space-y-5">
                  <div>
                    <label style={{ fontFamily: '"Press Start 2P"', fontSize: '7px', color: '#4a4a7a', display: 'block', marginBottom: '6px' }}>
                      NOMBRE
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full px-3 py-2 outline-none focus:border-orange-500 transition-colors"
                      style={{
                        background: '#0a0a0f',
                        border: '1px solid #1a1a3e',
                        color: '#f0f0ff',
                        fontFamily: '"Share Tech Mono"',
                        fontSize: '13px',
                      }}
                      placeholder="Tu nombre aquí..."
                    />
                  </div>

                  <div>
                    <label style={{ fontFamily: '"Press Start 2P"', fontSize: '7px', color: '#4a4a7a', display: 'block', marginBottom: '6px' }}>
                      EMAIL
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full px-3 py-2 outline-none focus:border-orange-500 transition-colors"
                      style={{
                        background: '#0a0a0f',
                        border: '1px solid #1a1a3e',
                        color: '#f0f0ff',
                        fontFamily: '"Share Tech Mono"',
                        fontSize: '13px',
                      }}
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label style={{ fontFamily: '"Press Start 2P"', fontSize: '7px', color: '#4a4a7a', display: 'block', marginBottom: '6px' }}>
                      MENSAJE
                    </label>
                    <textarea
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      rows={5}
                      className="w-full px-3 py-2 outline-none resize-none transition-colors"
                      style={{
                        background: '#0a0a0f',
                        border: '1px solid #1a1a3e',
                        color: '#f0f0ff',
                        fontFamily: '"Share Tech Mono"',
                        fontSize: '13px',
                      }}
                      placeholder="Cuéntame sobre tu proyecto..."
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={sending}
                    className="w-full py-3 transition-all duration-150 hover:scale-[1.02] active:scale-95"
                    style={{
                      fontFamily: '"Press Start 2P"',
                      fontSize: '9px',
                      color: '#0a0a0f',
                      background: sending ? '#4a4a7a' : '#ff6b00',
                      border: 'none',
                      cursor: sending ? 'wait' : 'pointer',
                      boxShadow: sending ? 'none' : '0 0 20px rgba(255,107,0,0.4)',
                    }}
                  >
                    {sending ? '⏳ ENVIANDO...' : '🚀 ENVIAR MENSAJE'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="text-6xl mb-4 animate-bounce-pixel">🎉</div>
                <div style={{ fontFamily: '"Press Start 2P"', fontSize: '12px', color: '#00ff41', textShadow: '0 0 10px #00ff41', marginBottom: '8px' }}>
                  ¡MENSAJE ENVIADO!
                </div>
                <div style={{ fontFamily: '"Share Tech Mono"', fontSize: '13px', color: '#6a6a9a' }}>
                  Te responderé lo antes posible. ¡Gracias por contactarme!
                </div>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }) }}
                  className="mt-6 arcade-btn"
                  style={{ color: '#ffd700', borderColor: '#ffd700' }}
                >
                  🔄 NUEVO MENSAJE
                </button>
              </div>
            )}
          </div> */}
        </div>
      </div>
    </section>
  )
}
