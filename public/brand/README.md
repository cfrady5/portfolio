# Brand assets

## Current logo

`frady-logo.png` — the white cursive **frady** mark on a transparent field
(5000×2813, ~16:9). It's the live brand mark across the whole site and is read
from a single constant: `LOGO_SRC` in `src/components/public/LogoMark.tsx`.

## Replacing it

1. Drop your new file in as **`frady-logo.png`** (same name).
2. If your file has a different shape, update **`LOGO_ASPECT`** (width ÷ height)
   in `src/components/public/LogoMark.tsx` so it doesn't squash.

That feeds the navbar, footer, login, dashboard sidebar, contact CTA, and the
hero pixel-materialization animation.

## Favicon & social preview

- `src/app/icon.svg` — favicon/app icon (kept as a filled mark so it stays
  visible on light browser tabs).
- `src/app/opengraph-image.tsx` — generated social/Open Graph preview.

`frady-logo.svg` is an unused white-cursive fallback; safe to delete.
