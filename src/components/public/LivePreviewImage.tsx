'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Renders an auto-generated screenshot of a live site over the placeholder
 * mockup. Uses a plain <img> (the provider returns the image directly) so we
 * avoid next/image remote-domain config. On error or while loading, it stays
 * transparent and the gradient placeholder underneath shows through.
 */
export function LivePreviewImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [state, setState] = useState<'loading' | 'loaded' | 'error'>('loading');

  if (state === 'error') return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onLoad={() => setState('loaded')}
      onError={() => setState('error')}
      className={cn(
        'absolute inset-0 top-9 z-10 h-[calc(100%-2.25rem)] w-full object-cover object-top transition-opacity duration-500',
        state === 'loaded' ? 'opacity-100' : 'opacity-0',
      )}
    />
  );
}

export default LivePreviewImage;
