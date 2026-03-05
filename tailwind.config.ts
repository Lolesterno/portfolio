import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        arcade: {
          black: '#0a0a0f',
          darkbg: '#0d0d1a',
          panel: '#12122a',
          border: '#1a1a3e',
          yellow: '#ffd700',
          orange: '#ff6b00',
          cyan: '#00ffff',
          pink: '#ff00aa',
          green: '#00ff41',
          purple: '#8b00ff',
          red: '#ff0033',
          blue: '#0066ff',
          white: '#f0f0ff',
          gray: '#4a4a7a',
        },
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        mono: ['"Share Tech Mono"', 'monospace'],
        display: ['"Orbitron"', 'sans-serif'],
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'scanline': 'scanline 8s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'glitch': 'glitch 2s infinite',
        'marquee': 'marquee 20s linear infinite',
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-pixel': 'bouncePixel 1s step-end infinite',
        'flicker': 'flicker 0.15s infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)', textShadow: '2px 0 #ff00aa, -2px 0 #00ffff' },
          '10%': { transform: 'translate(-2px, 2px)', textShadow: '-2px 0 #ff00aa, 2px 0 #00ffff' },
          '20%': { transform: 'translate(2px, -2px)', textShadow: '2px 0 #00ffff, -2px 0 #ffd700' },
          '30%': { transform: 'translate(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        pulseNeon: {
          '0%, 100%': { boxShadow: '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 40px #00ffff' },
          '50%': { boxShadow: '0 0 5px #00ffff, 0 0 10px #00ffff' },
        },
        bouncePixel: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        flicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: '1' },
          '20%, 24%, 55%': { opacity: '0.4' },
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 40px #00ffff',
        'neon-pink': '0 0 10px #ff00aa, 0 0 20px #ff00aa, 0 0 40px #ff00aa',
        'neon-yellow': '0 0 10px #ffd700, 0 0 20px #ffd700, 0 0 40px #ffd700',
        'neon-green': '0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 40px #00ff41',
        'pixel': '4px 4px 0px #000000',
        'pixel-cyan': '4px 4px 0px #00ffff',
        'pixel-yellow': '4px 4px 0px #ffd700',
      },
    },
  },
  plugins: [],
}

export default config
