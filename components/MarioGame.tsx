'use client'

import { useEffect, useRef } from "react";

interface Rect { x: number; y: number; w: number; h: number }
interface Platform extends Rect { }
interface Coin { x: number; y: number; col: boolean }
interface Enemy extends Rect { vx: number; vy: number; alive: boolean; stomped: boolean; sfr: number; og: boolean }
interface Player extends Rect { vx: number; vy: number; og: boolean; fr: boolean; af: number; at: number; inv: number }
interface Building { bx: number; by: number; bw: number; bh: number; wins: [number, number, boolean][] }

type Phase = 'ready' | 'playing' | 'over' | 'win';

interface GameState {
    phase: Phase; score: number; lives: number; camX: number;
    platforms: Platform[]; coins: Coin[]; enemies: Enemy[]; player: Player;
    keys: { l: number; r: number; j: number; }
}


// Tip: mejorar pronto para que sean selecciones de plataformas aleatorias

const PLAT_DATA: [number, number, number, number][] = [
    [0, 344, 1508, 36], [1588, 344, 892, 36], [2556, 344, 964, 36],
    [200, 280, 80, 16], [350, 248, 64, 16], [490, 280, 96, 16], [660, 212, 80, 16],
    [840, 248, 96, 16], [1020, 280, 96, 16], [1200, 212, 64, 16], [1350, 248, 80, 16],
    [1648, 280, 80, 16], [1808, 212, 96, 16], [1988, 248, 80, 16], [2148, 280, 96, 16], [2318, 212, 64, 16],
    [2620, 280, 80, 16], [2790, 212, 96, 16], [2970, 248, 80, 16], [3130, 280, 64, 16], [3260, 316, 96, 16],
];

const COIN_DATA: [number, number][] = [
    [235, 330], [263, 330], [291, 330], [865, 330], [893, 330], [1270, 330],
    [215, 256], [247, 256], [366, 224], [504, 256], [538, 256],
    [675, 188], [707, 188], [854, 224], [1035, 256], [1068, 256], [1214, 188], [1363, 224],
    [1662, 256], [1822, 188], [1856, 188], [2004, 224], [2164, 256], [2200, 256], [2332, 188],
    [2635, 256], [2806, 188], [2840, 188], [2985, 224], [3146, 256],
];

const ENEMY_DATA = [448, 804, 1108, 1440, 1864, 2224, 2710, 3048];

const W = 640, H = 380, GV = 0.44, JF = -10.5, SPD = 3.8, LW = 3520;
const $ = (x: number) => x | 0;

// Mapa precomputado

const BUILDINGS: Building[] = [
    { bx: 180, by: 288, bw: 55, bh: 56 },
    { bx: 295, by: 264, bw: 75, bh: 80 },
    { bx: 468, by: 276, bw: 65, bh: 68 },
    { bx: 648, by: 248, bw: 52, bh: 96 },
    { bx: 808, by: 264, bw: 88, bh: 80 },
    { bx: 1015, by: 244, bw: 64, bh: 100 },
].map(b => ({
    ...b,
    wins: (() => {
        const w: [number, number, boolean][] = []
        for (let wy = b.by + 10; wy < b.by + b.bh - 8; wy += 16)
            for (let rx = 8; rx < b.bw - 8; rx += 13)
                w.push([rx, wy, Math.random() > 0.4])
        return w
    })(),
}))

export default function MarioGame({ onClose }: { onClose?: () => void }) {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')!;
        if (!ctx) return;

        const s: GameState = {
            phase: 'ready', score: 0, lives: 3, camX: 0,
            platforms: [], coins: [], enemies: [],
            player: {} as Player,
            keys: { l: 0, r: 0, j: 0 },
        }

        function initLevel() {
            s.platforms = PLAT_DATA.map(([x, y, w, h]) => ({ x, y, w, h }))
            s.coins = COIN_DATA.map(([x, y]) => ({ x, y, col: false }))
            s.enemies = ENEMY_DATA.map(x => ({
                x, y: 316, w: 28, h: 28, vx: -1.3, vy: 0,
                alive: true, stomped: false, sfr: 0, og: false,
            }))
            s.player = { x: 64, y: 312, w: 24, h: 32, vx: 0, vy: 0, og: false, fr: true, af: 0, at: 0, inv: 0 }
            s.camX = 0
        }

        const KM: Record<string, 'l' | 'r' | 'j'> = {
            ArrowLeft: 'l',
            KeyA: 'l',
            ArrowRight: 'r',
            KeyD: 'r',
            ArrowUp: 'j',
            KeyW: 'j',
            Space: 'j',
        }

        function onKeyDown(e: KeyboardEvent) {
            if (KM[e.code]) {
                s.keys[KM[e.code]] = 1;
                e.preventDefault();
            }

            if (e.code === 'KeyR' && (s.phase === 'over' || s.phase === 'win')) {
                initLevel();
                s.score = 0;
                s.lives = 3;
                s.phase = 'playing';
            }

            if ((e.code === 'Space' || e.code === 'Enter') && s.phase === 'ready') s.phase = 'playing';

            if (e.code === 'Escape') onClose?.();
        }

        function onKeyUp(e: KeyboardEvent) { if (KM[e.code]) s.keys[KM[e.code]] = 0 }

        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);

        function ov(a: Rect, b: Rect) {
            return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
        }

        function stepX(e: Rect & { vx: number }, isP: boolean) {
            e.x += e.vx
            if (e.x < 0) { e.x = 0; if (!isP) e.vx = Math.abs(e.vx); else e.vx = 0 }
            if (e.x + e.w > LW) { e.x = LW - e.w; if (!isP) e.vx = -Math.abs(e.vx); else e.vx = 0 }
            for (const p of s.platforms) {
                if (!ov(e, p)) continue
                if (e.vx > 0) { e.x = p.x - e.w; if (!isP) e.vx = -Math.abs(e.vx); else e.vx = 0 }
                else { e.x = p.x + p.w; if (!isP) e.vx = Math.abs(e.vx); else e.vx = 0 }
            }
        }

        function stepY(e: Rect & { vy: number; og: boolean }) {
            e.y += e.vy; e.og = false
            for (const p of s.platforms) {
                if (!ov(e, p)) continue
                if (e.vy >= 0) { e.y = p.y - e.h; e.vy = 0; e.og = true }
                else { e.y = p.y + p.h; e.vy = 0 }
            }
        }

        function die() {
            if (--s.lives <= 0) { s.phase = 'over'; return }
            const p = s.player;
            p.x = 64;
            p.y = 312;
            p.vx = 0;
            p.vy = 0;
            p.inv = 110;
            s.camX = 0;
        }

        function update() {
            if (s.phase !== 'playing') return
            const p = s.player
            if (s.keys.l) { p.vx = -SPD; p.fr = false }
            else if (s.keys.r) { p.vx = SPD; p.fr = true }
            else p.vx *= 0.72
            if (s.keys.j && p.og) { p.vy = JF; p.og = false }
            p.vy += GV; stepX(p, true); stepY(p)
            if (p.y > H + 80) { die(); return }
            s.camX = Math.max(0, Math.min(p.x - W / 3, LW - W))
            for (const c of s.coins) {
                if (!c.col && ov(p, { x: c.x, y: c.y, w: 14, h: 14 })) { c.col = true; s.score += 100 }
            }
            for (const e of s.enemies) {
                if (e.stomped) { if (e.sfr > 0) e.sfr--; continue }
                if (!e.alive) continue
                e.vy += GV; stepX(e, false); stepY(e)
                if (e.y > H + 80) { e.alive = false; continue }
                if (p.inv === 0 && ov(p, e)) {
                    if (p.vy > 0 && p.y + p.h < e.y + e.h * 0.6) {
                        e.alive = false; e.stomped = true; e.sfr = 45; p.vy = -9; s.score += 200
                    } else { die(); return }
                }
            }
            if (p.inv > 0) p.inv--
            if (p.x > 3400) { s.phase = 'win'; s.score += 1000 }
            if (Math.abs(p.vx) > 0.4) { if (++p.at > 6) { p.at = 0; p.af = (p.af + 1) % 4 } } else p.af = 0
        }

        function drawBg() {
            ctx.fillStyle = '#08081a'; ctx.fillRect(0, 0, W, H)
            ctx.strokeStyle = 'rgba(255,0,170,0.03)'; ctx.lineWidth = 1
            const ox = $(s.camX * 0.07) % 32
            for (let x = -ox; x < W; x += 32) { ctx.beginPath(); ctx.moveTo($(x), 0); ctx.lineTo($(x), H); ctx.stroke() }
            for (let y = 0; y < H; y += 32) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke() }
            ctx.fillStyle = '#9999cc'
            const S = [42, 24, 135, 74, 215, 17, 375, 54, 518, 38, 612, 84, 98, 146, 316, 116, 466, 153, 548, 27, 85, 196, 430, 46, 168, 106, 388, 177]
            for (let i = 0; i < S.length; i += 2) ctx.fillRect($(((S[i] - s.camX * 0.12) % W + W) % W), S[i + 1], 2, 2)
            for (const b of BUILDINGS) {
                const px = $(((b.bx - s.camX * 0.28) % (W + 220) + W + 220) % (W + 220) - 110)
                ctx.fillStyle = '#0e0e28'; ctx.fillRect(px, b.by, b.bw, b.bh)
                for (const [rx, wy, lit] of b.wins) {
                    ctx.fillStyle = lit ? '#ffff4416' : '#ffff440a'; ctx.fillRect(px + rx, wy, 7, 9)
                }
            }
        }

        function drawPlatform(p: Platform) {
            const sx = $(p.x - s.camX)
            if (sx + p.w < -2 || sx > W + 2) return
            if (p.y >= 340) {
                for (let i = 0, tx = sx; tx < sx + p.w; tx += 32, i++) {
                    ctx.fillStyle = i % 2 ? '#141438' : '#1a1a44'
                    ctx.fillRect(tx, p.y, Math.min(32, sx + p.w - tx), p.h)
                }
                ctx.shadowColor = '#ff00aa'; ctx.shadowBlur = 10
                ctx.fillStyle = '#ff00aa'; ctx.fillRect(sx, p.y, p.w, 2); ctx.shadowBlur = 0
                ctx.fillStyle = 'rgba(255,0,170,0.22)'; ctx.fillRect(sx, p.y + 3, p.w, 1)
            } else {
                ctx.fillStyle = '#0c1030'; ctx.fillRect(sx, p.y, p.w, p.h)
                ctx.shadowColor = '#00ffff'; ctx.shadowBlur = 8
                ctx.fillStyle = '#00ffff'; ctx.fillRect(sx, p.y, p.w, 2); ctx.shadowBlur = 0
                ctx.fillStyle = 'rgba(0,255,255,0.09)'; ctx.fillRect(sx, p.y + 2, p.w, p.h - 2)
            }
        }

        function drawCoin(c: Coin) {
            if (c.col) return
            const ccx = $(c.x - s.camX + 7), ccy = $(c.y + 7)
            ctx.shadowColor = '#ffd700'; ctx.shadowBlur = 8
            ctx.fillStyle = '#ffd700'; ctx.beginPath(); ctx.arc(ccx, ccy, 7, 0, Math.PI * 2); ctx.fill()
            ctx.shadowBlur = 0
            ctx.fillStyle = '#cc8800'; ctx.beginPath(); ctx.arc(ccx, ccy, 4, 0, Math.PI * 2); ctx.fill()
            ctx.fillStyle = '#ffe860'; ctx.beginPath(); ctx.arc(ccx - 2, ccy - 2, 2.5, 0, Math.PI * 2); ctx.fill()
        }

        function drawEnemy(e: Enemy) {
            if (e.stomped) {
                if (e.sfr > 0) {
                    const sx = $(e.x - s.camX)
                    ctx.fillStyle = '#aa3300'; ctx.fillRect(sx, e.y + e.h - 8, e.w, 8)
                    ctx.fillStyle = '#ff6600'; ctx.fillRect(sx + 3, e.y + e.h - 6, e.w - 6, 4)
                }
                return
            }
            if (!e.alive) return
            const sx = $(e.x - s.camX), sy = $(e.y)
            ctx.fillStyle = '#cc4400'; ctx.fillRect(sx + 2, sy + 13, e.w - 4, e.h - 13)
            ctx.fillStyle = '#ff6622'; ctx.fillRect(sx, sy, e.w, 15)
            ctx.fillStyle = '#fff'; ctx.fillRect(sx + 3, sy + 3, 8, 7); ctx.fillRect(sx + e.w - 11, sy + 3, 8, 7)
            ctx.fillStyle = '#ee0000'; ctx.fillRect(sx + 5, sy + 5, 5, 4); ctx.fillRect(sx + e.w - 10, sy + 5, 5, 4)
            ctx.fillStyle = '#000'; ctx.fillRect(sx + 6, sy + 6, 3, 3); ctx.fillRect(sx + e.w - 9, sy + 6, 3, 3)
            ctx.fillStyle = '#882200'
            ctx.fillRect(sx + 2, sy + 1, 10, 2); ctx.fillRect(sx + e.w - 12, sy + 1, 10, 2)
            ctx.fillRect(sx, sy + e.h - 6, 10, 6); ctx.fillRect(sx + e.w - 10, sy + e.h - 6, 10, 6)
        }

        function drawPlayer() {
            const p = s.player
            if (p.inv > 0 && Math.floor(p.inv / 4) % 2 === 1) return
            const bx = $(p.x - s.camX), by = $(p.y)
            ctx.save()
            if (!p.fr) { ctx.translate(bx + 12, by); ctx.scale(-1, 1); ctx.translate(-12, 0) }
            else ctx.translate(bx, by)
            ctx.fillStyle = '#cc0000'; ctx.fillRect(2, 0, 20, 5); ctx.fillRect(0, 5, 24, 4)
            ctx.fillStyle = '#552200'; ctx.fillRect(0, 9, 4, 4); ctx.fillRect(20, 9, 4, 4)
            ctx.fillStyle = '#ffcc88'; ctx.fillRect(4, 9, 16, 10)
            ctx.fillStyle = '#000'; ctx.fillRect(7, 12, 4, 4)
            ctx.fillStyle = '#552200'; ctx.fillRect(3, 16, 18, 3)
            ctx.fillStyle = '#cc8844'; ctx.fillRect(10, 13, 6, 3)
            ctx.fillStyle = '#0055dd'; ctx.fillRect(2, 19, 20, 10)
            ctx.fillStyle = '#cc0000'; ctx.fillRect(0, 19, 2, 10); ctx.fillRect(22, 19, 2, 10)
            ctx.fillStyle = '#ffd700'; ctx.fillRect(7, 21, 3, 3); ctx.fillRect(14, 21, 3, 3)
            ctx.fillStyle = '#cc0000'
            if (!p.og) { ctx.fillRect(1, 29, 9, 4); ctx.fillRect(14, 29, 9, 4) }
            else if (p.af === 0) { ctx.fillRect(2, 29, 8, 4); ctx.fillRect(14, 29, 8, 4) }
            else if (p.af === 1) { ctx.fillRect(0, 29, 9, 4); ctx.fillRect(13, 29, 11, 4) }
            else if (p.af === 2) { ctx.fillRect(2, 29, 11, 4); ctx.fillRect(11, 29, 11, 4) }
            else { ctx.fillRect(4, 29, 9, 4); ctx.fillRect(11, 29, 9, 4) }
            ctx.fillStyle = '#220000'; ctx.fillRect(0, 31, 11, 2); ctx.fillRect(13, 31, 11, 2)
            ctx.restore()
        }

        function drawFlag() {
            const fx = $(3420 - s.camX)
            if (fx < -80 || fx > W + 80) return
            ctx.fillStyle = '#556688'; ctx.fillRect(fx + 7, 88, 6, 256)
            ctx.shadowColor = '#00ff41'; ctx.shadowBlur = 14
            ctx.fillStyle = '#00dd33'; ctx.fillRect(fx + 13, 88, 38, 26)
            ctx.fillStyle = '#009920'; ctx.fillRect(fx + 13, 88, 38, 5)
            ctx.shadowBlur = 0
            ctx.fillStyle = '#ffd700'; ctx.font = 'bold 17px serif'; ctx.fillText('★', fx + 17, 110)
            ctx.fillStyle = '#1a1a3e'; ctx.fillRect(fx + 2, 340, 20, 8)
        }

        function drawHUD() {
            const fn = '9px "Press Start 2P","Courier New",monospace'
            ctx.font = fn
            ctx.shadowBlur = 5; ctx.shadowColor = '#00ffff'; ctx.fillStyle = '#00ffff'; ctx.fillText('SCORE', 14, 24)
            ctx.shadowBlur = 0; ctx.fillStyle = '#eeeeff'; ctx.fillText(String(s.score).padStart(6, '0'), 14, 40)
            ctx.shadowBlur = 5; ctx.shadowColor = '#ff00aa'; ctx.fillStyle = '#ff00aa'; ctx.fillText('LIVES', W / 2 - 42, 24)
            ctx.shadowBlur = 0; ctx.fillStyle = '#eeeeff'; ctx.fillText(`x ${s.lives}`, W / 2 - 22, 40)
            const cc = s.coins.filter(c => c.col).length
            ctx.shadowBlur = 5; ctx.shadowColor = '#ffd700'; ctx.fillStyle = '#ffd700'; ctx.fillText(`★ ${cc}/${s.coins.length}`, W - 158, 24); ctx.shadowBlur = 0
            const prog = Math.min(s.player.x / (LW - W), 1)
            ctx.fillStyle = '#1a1a3e'; ctx.fillRect(0, H - 4, W, 4)
            ctx.shadowColor = '#ff00aa'; ctx.shadowBlur = 4; ctx.fillStyle = '#ff00aa'; ctx.fillRect(0, H - 4, $(W * prog), 4); ctx.shadowBlur = 0
            ctx.fillStyle = '#3a3a6a'; ctx.font = '5.5px "Press Start 2P","Courier New",monospace'
            ctx.fillText('ARROWS/WASD MOVE  ↑/SPACE JUMP  R RESTART  ESC CLOSE', 14, H - 8)
        }

        function overlay(title: string, sub: string, col: string, hint = '') {
            ctx.fillStyle = 'rgba(4,4,18,0.87)'; ctx.fillRect(0, 0, W, H)
            ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.shadowColor = col; ctx.shadowBlur = 22
            ctx.strokeRect(16, H / 2 - 80, W - 32, 160); ctx.shadowBlur = 0
            ctx.textAlign = 'center'
            ctx.font = '15px "Press Start 2P","Courier New",monospace'
            ctx.shadowColor = col; ctx.shadowBlur = 14; ctx.fillStyle = col; ctx.fillText(title, W / 2, H / 2 - 16); ctx.shadowBlur = 0
            ctx.fillStyle = '#ffd700'; ctx.font = '8.5px "Press Start 2P","Courier New",monospace'; ctx.fillText(sub, W / 2, H / 2 + 20)
            if (hint) { ctx.fillStyle = '#4a4a7a'; ctx.font = '7px "Press Start 2P","Courier New",monospace'; ctx.fillText(hint, W / 2, H / 2 + 50) }
            ctx.textAlign = 'left'
        }

        let rafId: number
        function loop() {
            update()
            drawBg()
            s.platforms.forEach(drawPlatform)
            drawFlag()
            s.coins.forEach(drawCoin)
            s.enemies.forEach(drawEnemy)
            drawPlayer()
            drawHUD()
            if (s.phase === 'ready') overlay('WORLD  1-1', 'PRESS SPACE TO START', '#ff00aa', 'ARROWS / WASD TO MOVE')
            if (s.phase === 'over') overlay('GAME  OVER', `FINAL SCORE: ${s.score}`, '#ff3344', 'PRESS R TO RETRY')
            if (s.phase === 'win') overlay('LEVEL  CLEAR!', `SCORE: ${s.score}`, '#00ff41', 'PRESS R TO PLAY AGAIN')
            rafId = requestAnimationFrame(loop)
        }

        initLevel()
        rafId = requestAnimationFrame(loop)

        return () => {
            cancelAnimationFrame(rafId)
            document.removeEventListener('keydown', onKeyDown)
            document.removeEventListener('keyup', onKeyUp)
        }

    }, [onclose])

    function bindTouch(key: 'l' | 'r' | 'j') {
        return {
            onTouchStart: (e: React.TouchEvent) => { e.preventDefault(); },
            onMouseDown: () => { },
        }
    }

    const mobileRef = useRef<Record<string, HTMLDivElement | null>>({})
    useEffect(() => {
        const keys = ['bl', 'br', 'bjump'] as const;
        const keyMap: Record<string, 'l' | 'r' | 'j'> = { bl: 'l', br: 'r', bjump: 'j' }
    }, [])



    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#050510', padding: '0' }}>
            <canvas
                ref={canvasRef}
                width={W}
                height={H}
                style={{
                    display: 'block',
                    border: '2px solid #ff00aa',
                    boxShadow: '0 0 40px rgba(255,0,170,0.3), 0 0 80px rgba(255,0,170,0.1)',
                    imageRendering: 'pixelated',
                    width: 'min(640px, 100vw)',
                    height: 'auto',
                }}
            />
            {/* Mobile controls — handled via the useEffect key bindings above */}
            <MobileControls />
        </div>
    )
}

function MobileControls() {
    function press(code: string) {
        document.dispatchEvent(new KeyboardEvent('keydown', { code, bubbles: true }));
    }
    function release(code: string) {
        document.dispatchEvent(new KeyboardEvent('keyup', { code, bubbles: true }))
    }

    const btn = (label: string, code: string, style?: React.CSSProperties) => (
        <div
            style={{
                width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,0,170,0.1)', border: '2px solid rgba(255,0,170,0.35)',
                color: '#ff00aa', fontSize: 20, cursor: 'pointer', touchAction: 'none', userSelect: 'none',
                ...style,
            }}
            onTouchStart={e => { e.preventDefault(); press(code) }}
            onTouchEnd={e => { e.preventDefault(); release(code) }}
            onMouseDown={() => press(code)}
            onMouseUp={() => release(code)}
            onMouseLeave={() => release(code)}
        >
            {label}
        </div>

    )

    return (
        <div className="md:hidden" style={{ display: 'flex', marginTop: 10, justifyContent: 'space-between', width: 'min(640px,100vw)', padding: '0 8px' }}>
            <div style={{ display: 'flex', gap: 6 }}>
                {btn('◀', 'ArrowLeft')}
                {btn('▶', 'ArrowRight')}
            </div>
            {btn('JUMP', 'Space', {
                width: 68, height: 68, fontSize: 9,
                fontFamily: '"Press Start 2P", monospace',
                background: 'rgba(0,255,255,0.08)',
                border: '2px solid rgba(0,255,255,0.35)',
                color: '#00ffff',
            })}
        </div>
    )
}