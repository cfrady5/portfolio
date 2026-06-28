import { ImageResponse } from 'next/og';

// Open Graph / social preview image, generated at the edge.
// Mirrors the brand: black field, off-white type, muted green accent.
export const runtime = 'edge';
export const alt = 'Caleb Frady — Portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#050505',
          padding: '80px',
          color: '#f4f1ea',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {/* Brand mark stand-in (circle + cursive). Replace with your PNG if preferred. */}
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 9999,
              backgroundColor: '#0a0a0a',
              border: '1px solid rgba(244,241,234,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 52,
              fontStyle: 'italic',
            }}
          >
            f
          </div>
          <div style={{ fontSize: 28, letterSpacing: 2, color: '#7c9a76' }}>
            CALEB FRADY
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 64, lineHeight: 1.05, maxWidth: 900 }}>
            Websites, digital systems, and brand experiences built with clarity.
          </div>
          <div style={{ fontSize: 30, color: '#a3a09a' }}>
            Caleb Frady — finance graduate, communications specialist, website builder.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
