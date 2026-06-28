'use client';

import { useEffect, useRef, useState } from 'react';
import { LOGO_SRC } from './LogoMark';

// ---------------------------------------------------------------------------
// BrandIntro — a one-time, on-load intro that "draws out" the cursive frady
// mark. Because the logo is a black circle with the white cursive word, on a
// black field only the cursive shows — so a left-to-right clip-path wipe reads
// like the word being handwritten.
//
// Plays once per browser session (sessionStorage) and once per page-load
// lifetime (module flag, so client-side navigations never replay it).
// Respects prefers-reduced-motion (skips straight through).
// ---------------------------------------------------------------------------

const SESSION_KEY = 'frady-intro-played';
const DRAW_MS = 1500; // length of the draw
const HOLD_MS = 450; // pause on the finished word
const FADE_MS = 650; // overlay fade-out

// Survives client-side navigations within the same page load.
let playedThisLoad = false;

type Phase = 'pending' | 'drawing' | 'leaving' | 'done';

export function BrandIntro() {
  // Deterministic initial render (same on server + client) to avoid hydration
  // mismatch: the overlay is present but the word is hidden until the effect
  // decides whether to play or skip.
  const [phase, setPhase] = useState<Phase>('pending');
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    let alreadyPlayed = playedThisLoad;
    try {
      if (sessionStorage.getItem(SESSION_KEY)) alreadyPlayed = true;
    } catch {
      /* sessionStorage may be unavailable */
    }

    if (prefersReduced || alreadyPlayed) {
      setPhase('done');
      return;
    }

    // Mark as played and lock scroll for the duration.
    playedThisLoad = true;
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      /* ignore */
    }
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Kick off the draw on the next frame so the initial (hidden) state paints
    // first and the clip-path transition actually animates.
    const raf = requestAnimationFrame(() => setPhase('drawing'));

    timers.current.push(
      setTimeout(() => setPhase('leaving'), DRAW_MS + HOLD_MS),
      setTimeout(() => {
        setPhase('done');
        document.body.style.overflow = prevOverflow;
      }, DRAW_MS + HOLD_MS + FADE_MS),
    );

    const captured = timers.current;
    return () => {
      cancelAnimationFrame(raf);
      captured.forEach(clearTimeout);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (phase === 'done') return null;

  const revealed = phase === 'drawing' || phase === 'leaving';

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950"
      style={{
        opacity: phase === 'leaving' ? 0 : 1,
        transition: `opacity ${FADE_MS}ms ease`,
        pointerEvents: phase === 'leaving' ? 'none' : 'auto',
      }}
    >
      <div
        className="relative"
        style={{ width: 'min(72vw, 560px)', aspectRatio: '1 / 1' }}
      >
        {/* The cursive mark, revealed left-to-right like handwriting. */}
        <div
          style={{
            width: '100%',
            height: '100%',
            opacity: revealed ? 1 : 0,
            clipPath: revealed
              ? 'inset(0 0% 0 0)'
              : 'inset(0 100% 0 0)',
            transition: `clip-path ${DRAW_MS}ms cubic-bezier(0.65, 0, 0.35, 1), opacity 400ms ease`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LOGO_SRC}
            alt=""
            className="h-full w-full object-contain"
            draggable={false}
          />
        </div>

        {/* Soft trailing gleam at the pen tip while drawing. */}
        <div
          className="pointer-events-none absolute inset-y-0"
          style={{
            left: revealed ? '100%' : '0%',
            width: 80,
            marginLeft: -40,
            background:
              'linear-gradient(90deg, transparent, rgba(124,154,118,0.35), transparent)',
            opacity: phase === 'drawing' ? 1 : 0,
            transition: `left ${DRAW_MS}ms cubic-bezier(0.65, 0, 0.35, 1), opacity 300ms ease`,
            filter: 'blur(6px)',
          }}
        />
      </div>
    </div>
  );
}

export default BrandIntro;
