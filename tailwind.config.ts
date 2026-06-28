import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Core brand palette: premium black / off-white / muted green accent.
        ink: {
          DEFAULT: '#0a0a0a',
          950: '#050505',
          900: '#0a0a0a',
          800: '#141414',
          700: '#1c1c1c',
          600: '#262626',
        },
        bone: {
          DEFAULT: '#f4f1ea',
          muted: '#cbc8c0',
          soft: '#a3a09a',
        },
        moss: {
          // Muted green accent — confident, not neon.
          DEFAULT: '#7c9a76',
          400: '#8fae88',
          500: '#7c9a76',
          600: '#637d5e',
          700: '#4d6349',
        },
        line: 'rgba(244, 241, 234, 0.10)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      maxWidth: {
        content: '1200px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'fade-in': 'fade-in 0.8s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
