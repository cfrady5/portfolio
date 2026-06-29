'use client';

import { useEffect, useRef, useState } from 'react';
import { LOGO_SRC, LOGO_ASPECT } from './LogoMark';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// HeroWordmark — builds the word "frady" pixel by pixel: blocks stream in from
// both the LEFT and RIGHT edges of the screen and lock into place to form the
// logo, then hands off to the crisp image. Sampled from the real logo so the
// shape matches exactly. Contained (no full-screen overlay), once per session,
// respects prefers-reduced-motion.
// ---------------------------------------------------------------------------

const RES_H = 600; // offscreen sampling height (higher = more faithful)
const MAX_W = 1600; // cap the canvas width
// Replays on every full page refresh (module flag only prevents replaying on
// client-side navigations within the same page load).
let playedThisLoad = false;

const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);

export function HeroWordmark({ className }: { className?: string }) {
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);
  const [phase, setPhase] = useState<'idle' | 'animating' | 'done'>('idle');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const loaded = useRef<HTMLImageElement | null>(null);

  // Measure target size + decide whether to animate.
  useEffect(() => {
    const ww = window.innerWidth;
    const h = Math.round(Math.max(64, Math.min(168, ww * 0.16)));
    setDims({ w: Math.round(h * LOGO_ASPECT), h });

    const prefersReduced = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReduced || playedThisLoad) return; // static logo stays

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      loaded.current = img;
      playedThisLoad = true;
      setPhase('animating');
    };
    img.onerror = () => setPhase('idle');
    img.src = LOGO_SRC;
  }, []);

  // Run the build.
  useEffect(() => {
    if (phase !== 'animating' || !dims) return;
    const canvas = canvasRef.current;
    const img = loaded.current;
    if (!canvas || !img) return;

    const wordW = dims.w;
    const wordH = dims.h;
    const fullW = Math.min(window.innerWidth, MAX_W);
    const H = Math.round(wordH * 2); // vertical room for the streams

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = fullW * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${fullW}px`;
    canvas.style.height = `${H}px`;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setPhase('done');
      return;
    }
    ctx.scale(dpr, dpr);

    // Offscreen render of the logo to sample the word's ink pixels.
    const offW = Math.round(RES_H * (wordW / wordH));
    const off = document.createElement('canvas');
    off.width = offW;
    off.height = RES_H;
    const octx = off.getContext('2d');
    if (!octx) {
      setPhase('done');
      return;
    }
    octx.drawImage(img, 0, 0, offW, RES_H);
    let data: Uint8ClampedArray | null = null;
    try {
      data = octx.getImageData(0, 0, offW, RES_H).data;
    } catch {
      data = null;
    }

    const block = Math.max(3, Math.round(wordH / 46));
    const sample = RES_H / wordH;
    const offX = (fullW - wordW) / 2; // centre the word in the canvas
    const offY = (H - wordH) / 2;
    const mid = fullW / 2;

    type P = { tx: number; ty: number; sx: number; sy: number; delay: number; dur: number };
    const ps: P[] = [];
    for (let y = 0; y < wordH; y += block) {
      for (let x = 0; x < wordW; x += block) {
        if (data) {
          const sx = Math.min(offW - 1, Math.floor((x + block / 2) * sample));
          const sy = Math.min(RES_H - 1, Math.floor((y + block / 2) * sample));
          if (data[(sy * offW + sx) * 4 + 3] < 50) continue; // transparent
        }
        const tx = offX + x;
        const ty = offY + y;
        const fromLeft = tx < mid;
        // Start off the matching screen edge, flowing in horizontally.
        const sxp = fromLeft
          ? -(30 + Math.random() * fullW * 0.45)
          : fullW + (30 + Math.random() * fullW * 0.45);
        const syp = ty + (Math.random() - 0.5) * wordH * 0.7;
        ps.push({
          tx,
          ty,
          sx: sxp,
          sy: syp,
          delay: Math.random() * 0.5,
          dur: 0.8 + Math.random() * 0.5,
        });
      }
    }

    let maxEnd = 0;
    for (const p of ps) maxEnd = Math.max(maxEnd, p.delay + p.dur);

    const t0 = performance.now();
    let raf = 0;
    const frame = (now: number) => {
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, fullW, H);
      ctx.fillStyle = '#ffffff';
      for (const p of ps) {
        const lp = Math.min(Math.max((t - p.delay) / p.dur, 0), 1);
        if (lp <= 0) continue;
        const e = easeOut(lp);
        ctx.globalAlpha = Math.min(1, lp * 2);
        ctx.fillRect(p.sx + (p.tx - p.sx) * e, p.sy + (p.ty - p.sy) * e, block, block);
      }
      ctx.globalAlpha = 1;
      if (t < maxEnd) {
        raf = requestAnimationFrame(frame);
      } else {
        setPhase('done'); // hand off to the crisp logo
      }
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [phase, dims]);

  const animating = phase === 'animating';

  return (
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ height: dims?.h, width: dims?.w }}
      aria-label="frady"
    >
      {/* Crisp final logo (also the static / no-JS / reduced-motion state). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LOGO_SRC}
        alt="Caleb Frady — frady logo"
        className="h-[clamp(64px,16vw,168px)] w-auto object-contain"
        style={{
          height: dims?.h,
          opacity: animating ? 0 : 1,
          transition: 'opacity 350ms ease',
        }}
        draggable={false}
      />

      {/* Full-width pixel canvas — pixels enter from both screen edges. */}
      {phase !== 'idle' && dims && (
        <canvas
          ref={canvasRef}
          aria-hidden
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: phase === 'done' ? 0 : 1,
            transition: 'opacity 350ms ease',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
}

export default HeroWordmark;
