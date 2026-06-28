# Brand assets

## Replace the logo with your real file

The site currently ships with `frady-logo.svg` — a placeholder that mirrors
your real mark (black circle, white cursive "frady").

To use your real logo everywhere on the site:

1. Add your real file here as **`frady-logo.png`** (the path the project expects).
2. Open `src/components/public/LogoMark.tsx` and change:

   ```ts
   const LOGO_SRC = '/brand/frady-logo.svg';
   ```

   to:

   ```ts
   const LOGO_SRC = '/brand/frady-logo.png';
   ```

That single constant feeds the navbar, footer, login page, dashboard sidebar,
portfolio hero, and contact CTA.

## Favicon & social preview

- `src/app/icon.svg` is the favicon/app icon.
- `src/app/opengraph-image.tsx` generates the social/Open Graph preview.

Both reference the same mark. If you want them to use your PNG, swap the file
references there too (comments mark the spot).
