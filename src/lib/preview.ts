// ---------------------------------------------------------------------------
// Live screenshot previews.
//
// Given a project's live URL, this returns the URL of an auto-generated
// screenshot of that page. It works for sites that block <iframe> embedding
// (GitHub Pages, gov/defense, Wix, Higher Logic, etc.) because the screenshot
// is rendered server-side by the provider, not framed in the browser.
//
// Default provider: thum.io (no API key needed for basic use).
// To switch providers or add a key, set the env vars below or edit buildUrl().
//   NEXT_PUBLIC_SCREENSHOT_PROVIDER = 'thumio' | 'microlink' | 'none'
// ---------------------------------------------------------------------------

type Provider = 'thumio' | 'microlink' | 'none';

const PROVIDER = (process.env.NEXT_PUBLIC_SCREENSHOT_PROVIDER as Provider) ||
  'thumio';

/**
 * Build a screenshot URL for a live site.
 * Returns null when there's no usable URL or previews are disabled — callers
 * then fall back to the gradient placeholder mockup.
 */
export function livePreviewUrl(
  liveUrl: string | null | undefined,
  opts: { width?: number } = {},
): string | null {
  if (!liveUrl) return null;
  if (PROVIDER === 'none') return null;

  // Only screenshot real, absolute http(s) URLs.
  let url: URL;
  try {
    url = new URL(liveUrl);
  } catch {
    return null;
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;

  const width = opts.width ?? 1200;
  const target = url.toString();

  switch (PROVIDER) {
    case 'microlink': {
      // Microlink renders the screenshot and `embed` redirects to the image.
      const params = new URLSearchParams({
        url: target,
        screenshot: 'true',
        meta: 'false',
        embed: 'screenshot.url',
        'viewport.width': String(width),
        'viewport.height': String(Math.round((width * 3) / 4)),
      });
      return `https://api.microlink.io/?${params.toString()}`;
    }
    case 'thumio':
    default:
      // thum.io returns the image directly. Crop to a 4:3-ish hero shot.
      return `https://image.thum.io/get/width/${width}/crop/${Math.round(
        (width * 3) / 4,
      )}/noanimate/${target}`;
  }
}
