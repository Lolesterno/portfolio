import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nicolás Cuadros | Senior Fullstack Developer',
  description: 'Portfolio arcade de José Nicolás Cuadros Silva - Senior Fullstack Developer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
