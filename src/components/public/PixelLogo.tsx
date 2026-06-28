'use client';

import { useEffect, useRef, useState } from 'react';
import { LOGO_SRC } from './LogoMark';

// ---------------------------------------------------------------------------
// PixelLogo — "digitalizes" the cursive mark into the hero, materializing it
// pixel-by-pixel: blocks of the logo fade in scattered across the word, each
// with a brief green digital flash, until the full mark resolves.
//
// Progressive enhancement: a real <img> of the logo is the base layer (shown
// to no-JS users, screen readers, and as the crisp final state). The canvas
// overlay runs the animation on top, then fades out to reveal the vector.
//
// Aspect-aware: `height` is fixed; width follows the logo's natural ratio, so
// the wide cursive never squashes. Plays once per session, respects
// prefers-reduced-motion, same-origin canvas (no taint).
// ---------------------------------------------------------------------------

const SESSION_KEY = 'frady-pixel-played';
const RES_H = 512; // offscreen sampling height
const DURATION = 1700; // ms for the full materialization
const FADE = 0.16; // per-block fade-in fraction of the timeline
const ACCENT = '#7c9a76';

let playedThisLoad = false;

type Phase = 'idle' | 'animating' | 'done';

export function PixelLogo({
  height = 150,
  src = LOGO_SRC,
  className,
}: {
  height?: number;
  src?: string;
  className?: string;
}) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [width, setWidth] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const loadedImg = useRef<HTMLImageElement | null>(null);

  // Decide whether to animate, and preload the image.
  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    let alreadyPlayed = playedThisLoad;
    try {
      if (sessionStorage.getItem(SESSION_KEY)) alreadyPlayed = true;
    } catch {
      /* ignore */
    }

    if (prefersReduced || alreadyPlayed) {
      setPhase('idle'); // static img stays visible
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      loadedImg.current = img;
      const aspect = img.naturalWidth / img.naturalHeight || 1;
      setWidth(Math.round(height * aspect));
      playedThisLoad = true;
      try {
        sessionStorage.setItem(SESSION_KEY, '1');
      } catch {
        /* ignore */
      }
      setPhase('animating');
    };
    img.onerror = () => setPhase('idle');
    img.src = src;
  }, [src, height]);

  // Run the materialization once the canvas is mounted with known dimensions.
  useEffect(() => {
    if (phase !== 'animating' || width == null) return;
    const canvas = canvasRef.current;
    const img = loadedImg.current;
    if (!canvas || !img) return;

    const w = width;
    const h = height;
    const aspect = w / h;
    const offW = Math.round(RES_H * aspect);
    const offH = RES_H;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setPhase('done');
      return;
    }
    ctx.scale(dpr, dpr);

    // Offscreen render of the logo for sampling + block sources.
    const off = document.createElement('canvas');
    off.width = offW;
    off.height = offH;
    const offCtx = off.getContext('2d');
    if (!offCtx) {
      setPhase('done');
      return;
    }
    offCtx.drawImage(img, 0, 0, offW, offH);

    let data: Uint8ClampedArray | null = null;
    try {
      data = offCtx.getImageData(0, 0, offW, offH).data;
    } catch {
      data = null; // tainted (shouldn't happen same-origin) — skip ink test
    }

    // Build the grid of "ink" blocks (skip transparent areas).
    const block = Math.max(4, Math.round(h / 42));
    const scale = offH / h;
    type Blk = { x: number; y: number; sx: number; sy: number; ss: number; start: number };
    const blocks: Blk[] = [];
    for (let y = 0; y < h; y += block) {
      for (let x = 0; x < w; x += block) {
        const sx = Math.floor(x * scale);
        const sy = Math.floor(y * scale);
        if (data) {
          const cx = Math.min(offW - 1, sx + Math.floor((block * scale) / 2));
          const cy = Math.min(offH - 1, sy + Math.floor((block * scale) / 2));
          const alpha = data[(cy * offW + cx) * 4 + 3];
          if (alpha < 40) continue; // transparent -> not part of the word
        }
        blocks.push({
          x,
          y,
          sx,
          sy,
          ss: Math.ceil(block * scale),
          start: Math.random() * (1 - FADE), // scatter across the timeline
        });
      }
    }

    const t0 = performance.now();
    let raf = 0;

    const frame = (now: number) => {
      const t = Math.min((now - t0) / DURATION, 1);
      ctx.clearRect(0, 0, w, h);
      for (const b of blocks) {
        const local = Math.min(Math.max((t - b.start) / FADE, 0), 1);
        if (local <= 0) continue;
        ctx.globalAlpha = local;
        ctx.drawImage(off, b.sx, b.sy, b.ss, b.ss, b.x, b.y, block, block);
        if (local < 1) {
          ctx.globalAlpha = (1 - local) * 0.75;
          ctx.fillStyle = ACCENT;
          ctx.fillRect(b.x, b.y, block, block);
        }
      }
      ctx.globalAlpha = 1;
      if (t < 1) {
        raf = requestAnimationFrame(frame);
      } else {
        setPhase('done'); // hand off to the crisp vector img
      }
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [phase, width, height]);

  const animating = phase === 'animating';

  return (
    <div
      className={className}
      style={{ position: 'relative', height, width: width ?? 'auto' }}
    >
      {/* Base / final layer: the crisp logo (accessible, no-JS safe). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Caleb Frady — frady logo"
        className="object-contain"
        style={{
          height,
          width: 'auto',
          opacity: animating ? 0 : 1,
          transition: 'opacity 350ms ease',
        }}
        draggable={false}
      />

      {/* Animation overlay. */}
      {phase !== 'idle' && width != null && (
        <canvas
          ref={canvasRef}
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            width,
            height,
            opacity: phase === 'done' ? 0 : 1,
            transition: 'opacity 350ms ease',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
}

export default PixelLogo;
