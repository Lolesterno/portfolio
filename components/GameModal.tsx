'use client'

import { useEffect, useRef } from "react"
import MarioGame from "./MarioGame";

interface GameModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function GameModal({ isOpen, onClose }: GameModalProps) {
    const ovelayRef = useRef<HTMLDivElement>(null);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === ovelayRef.current) return onClose();
    }

    useEffect(() => {
        if (!isOpen) return

        const onKey = (e: KeyboardEvent) => {
            if (e.code === 'Escape') return onClose();
        }

        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);

    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; }
    }, []);

    if (!isOpen) return null;

    return (
        <div
            ref={ovelayRef}
            onClick={handleOverlayClick}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(5, 5, 16, 0.92)',
                backdropFilter: 'blur(4px)',
                animation: 'fadeIn 0.15s ease-out',
                padding: '16px',
            }}
        >
            {/* Modal container */}
            <div
                style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    animation: 'slideUp 0.18s ease-out',
                }}
            >
                {/* Header bar */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: 'min(640px, 100vw)',
                        padding: '0 4px 8px',
                    }}
                >
                    <span
                        style={{
                            fontFamily: '"Press Start 2P", monospace',
                            fontSize: 10,
                            color: '#ff00aa',
                            textShadow: '0 0 10px #ff00aa',
                            letterSpacing: '1px',
                        }}
                    >
                        ★ NEON RUNNER
                    </span>
                    <button
                        onClick={onClose}
                        aria-label="Cerrar juego"
                        style={{
                            background: 'transparent',
                            border: '1px solid rgba(255,0,170,0.4)',
                            color: '#ff00aa',
                            fontFamily: '"Press Start 2P", monospace',
                            fontSize: 10,
                            cursor: 'pointer',
                            padding: '4px 10px',
                            letterSpacing: '1px',
                            lineHeight: 1,
                        }}
                    >
                        ✕ ESC
                    </button>
                </div>

                {/* Game */}
                <MarioGame onClose={onClose} />

                {/* Footer hint */}
                <p
                    style={{
                        marginTop: 8,
                        fontFamily: '"Press Start 2P", monospace',
                        fontSize: 7,
                        color: 'rgba(100,100,160,0.7)',
                        letterSpacing: '1px',
                        textAlign: 'center',
                    }}
                >
                    CLICK OUTSIDE OR ESC TO CLOSE
                </p>
            </div>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
        </div>

    )
}