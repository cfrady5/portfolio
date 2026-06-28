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
// Plays once per session, respects prefers-reduced-motion, same-origin canvas
// (no taint). Reads the same LOGO_SRC as the rest of the site.
// ---------------------------------------------------------------------------

const SESSION_KEY = 'frady-pixel-played';
const RES = 512; // offscreen sampling resolution
const DURATION = 1700; // ms for the full materialization
const FADE = 0.16; // per-block fade-in fraction of the timeline
const ACCENT = '#7c9a76';

let playedThisLoad = false;

type Phase = 'idle' | 'animating' | 'done';

export function PixelLogo({
  size = 176,
  src = LOGO_SRC,
  className,
}: {
  size?: number;
  src?: string;
  className?: string;
}) {
  const [phase, setPhase] = useState<Phase>('idle');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgElRef = useRef<HTMLImageElement | null>(null);
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
  }, [src]);

  // Run the materialization once the canvas is mounted.
  useEffect(() => {
    if (phase !== 'animating') return;
    const canvas = canvasRef.current;
    const img = loadedImg.current;
    if (!canvas || !img) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setPhase('done');
      return;
    }
    ctx.scale(dpr, dpr);

    // Offscreen render of the logo for sampling + block sources.
    const off = document.createElement('canvas');
    off.width = RES;
    off.height = RES;
    const offCtx = off.getContext('2d');
    if (!offCtx) {
      setPhase('done');
      return;
    }
    offCtx.drawImage(img, 0, 0, RES, RES);

    let data: Uint8ClampedArray | null = null;
    try {
      data = offCtx.getImageData(0, 0, RES, RES).data;
    } catch {
      data = null; // tainted (shouldn't happen same-origin) — skip ink test
    }

    // Build the grid of "ink" blocks (skip transparent areas).
    const block = Math.max(4, Math.round(size / 42));
    const scale = RES / size;
    type Blk = { x: number; y: number; sx: number; sy: number; ss: number; start: number };
    const blocks: Blk[] = [];
    for (let y = 0; y < size; y += block) {
      for (let x = 0; x < size; x += block) {
        const sx = Math.floor(x * scale);
        const sy = Math.floor(y * scale);
        if (data) {
          const cx = Math.min(RES - 1, sx + Math.floor((block * scale) / 2));
          const cy = Math.min(RES - 1, sy + Math.floor((block * scale) / 2));
          const alpha = data[(cy * RES + cx) * 4 + 3];
          if (alpha < 40) continue; // transparent -> not part of the word
        }
        blocks.push({
          x,
          y,
          sx,
          sy,
          ss: Math.ceil(block * scale),
          // scatter the reveal across the timeline for a digital materialize
          start: Math.random() * (1 - FADE),
        });
      }
    }

    const t0 = performance.now();
    let raf = 0;

    const frame = (now: number) => {
      const t = Math.min((now - t0) / DURATION, 1);
      ctx.clearRect(0, 0, size, size);
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
  }, [phase, size]);

  const animating = phase === 'animating';

  return (
    <div
      className={className}
      style={{ position: 'relative', width: size, height: size }}
    >
      {/* Base / final layer: the crisp vector logo (accessible, no-JS safe). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgElRef}
        src={src}
        alt="Caleb Frady — frady logo"
        width={size}
        height={size}
        className="h-full w-full object-contain"
        style={{
          opacity: animating ? 0 : 1,
          transition: 'opacity 350ms ease',
        }}
        draggable={false}
      />

      {/* Animation overlay. */}
      {phase !== 'idle' && (
        <canvas
          ref={canvasRef}
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            width: size,
            height: size,
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
