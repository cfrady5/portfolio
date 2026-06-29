'use client';

import { useEffect, useState } from 'react';
import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';

// Geometric rounded sans that closely matches the frady wordmark.
// If you want a different feel, swap this font here.
const wordFont = Poppins({ subsets: ['latin'], weight: ['600'] });

const WORD = 'frady';
const SESSION_KEY = 'frady-wordmark-played';
const STAGGER = 0.085; // seconds between letters

let playedThisLoad = false;

// ---------------------------------------------------------------------------
// HeroWordmark — renders "frady" as live text and assembles it letter by
// letter (each glyph rises and renders into focus from a blur), then draws a
// thin accent line beneath. A clean, contained "digital entry" — no canvas,
// no full-screen overlay. Plays once per session, respects reduced motion.
// ---------------------------------------------------------------------------
export function HeroWordmark({ className }: { className?: string }) {
  // 'static' = show finished word (SSR / no-JS / reduced-motion / replays)
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    let alreadyPlayed = playedThisLoad;
    try {
      if (sessionStorage.getItem(SESSION_KEY)) alreadyPlayed = true;
    } catch {
      /* ignore */
    }

    if (prefersReduced || alreadyPlayed) return; // stays static

    playedThisLoad = true;
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      /* ignore */
    }
    setAnimate(true);
  }, []);

  const underlineDelay = WORD.length * STAGGER + 0.15;

  return (
    <div className={cn('relative inline-block', className)}>
      <span
        aria-label={WORD}
        className={cn(
          wordFont.className,
          'block select-none text-[19vw] leading-none tracking-tight text-white sm:text-[12rem] md:text-[13rem]',
        )}
      >
        {WORD.split('').map((ch, i) => (
          <span
            key={i}
            aria-hidden
            className={animate ? 'frady-letter' : 'inline-block'}
            style={animate ? { animationDelay: `${i * STAGGER}s` } : undefined}
          >
            {ch}
          </span>
        ))}
      </span>

      {/* Accent line draws in once the word is assembled */}
      <span
        aria-hidden
        className={cn(
          'absolute -bottom-1 left-1 right-1 h-[3px] rounded-full bg-moss/70',
          animate && 'frady-underline',
        )}
        style={animate ? { animationDelay: `${underlineDelay}s` } : undefined}
      />
    </div>
  );
}

export default HeroWordmark;
