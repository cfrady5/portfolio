import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Open Graph / social preview image. Rendered with the Node runtime so we can
// read the real logo from disk and embed it. Brand: black field, off-white
// type, muted green accent, the white cursive frady mark.
export const runtime = 'nodejs';
export const alt = 'Caleb Frady — Portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  // Embed the actual logo as a data URL.
  const logoData = await readFile(
    join(process.cwd(), 'public/brand/frady-logo.png'),
  );
  const logoSrc = `data:image/png;base64,${logoData.toString('base64')}`;

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
          backgroundImage:
            'radial-gradient(60% 60% at 50% 0%, rgba(124,154,118,0.14) 0%, rgba(5,5,5,0) 70%)',
          padding: '80px',
          color: '#f4f1ea',
        }}
      >
        <div style={{ display: 'flex' }}>
          {/* Real white cursive frady logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt="" height={150} style={{ height: 150 }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 26, letterSpacing: 3, color: '#7c9a76' }}>
            CALEB FRADY · PORTFOLIO
          </div>
          <div style={{ fontSize: 62, lineHeight: 1.05, maxWidth: 950 }}>
            Websites, digital systems, and brand experiences built with clarity.
          </div>
          <div style={{ fontSize: 28, color: '#a3a09a' }}>
            Finance graduate, communications specialist, website builder.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
