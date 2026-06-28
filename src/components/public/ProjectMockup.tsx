import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProjectMockupProps {
  title: string;
  accent?: string;
  /** Real screenshot path. When provided, it replaces the placeholder. */
  imageUrl?: string | null;
  imageAlt?: string;
  category?: string;
  className?: string;
}

/**
 * Elegant placeholder "browser window" mockup.
 * - If `imageUrl` is provided (and not a placeholder path), it renders the real
 *   screenshot instead. Drop screenshots in /public/projects and set their path
 *   in the project data / Supabase project_screenshots table to replace these.
 */
export function ProjectMockup({
  title,
  accent = '#7c9a76',
  imageUrl,
  imageAlt,
  category,
  className,
}: ProjectMockupProps) {
  // A path under /projects is treated as "may not exist yet" — we still attempt
  // to load it, but the gradient placeholder sits underneath as a fallback.
  const hasReal = Boolean(imageUrl);

  return (
    <div
      className={cn(
        'relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-line bg-ink-800',
        className,
      )}
    >
      {/* Browser chrome */}
      <div className="absolute inset-x-0 top-0 z-20 flex h-9 items-center gap-1.5 border-b border-line bg-ink-900/90 px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-bone/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-bone/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-bone/15" />
        <span className="ml-3 hidden truncate rounded-md bg-ink-700/80 px-3 py-1 text-[10px] text-bone-soft sm:block">
          {category ? `${category.toLowerCase().replace(/\s+/g, '')}.frady` : 'frady.studio'}
        </span>
      </div>

      {/* Gradient placeholder canvas */}
      <div
        className="absolute inset-0 top-9"
        style={{
          background: `radial-gradient(120% 120% at 0% 0%, ${accent}33 0%, transparent 55%), radial-gradient(120% 120% at 100% 100%, ${accent}22 0%, transparent 50%), #0e0e0e`,
        }}
        aria-hidden
      >
        {/* Subtle interface shapes */}
        <div className="absolute left-6 top-8 flex flex-col gap-3">
          <span
            className="h-2.5 w-24 rounded-full"
            style={{ backgroundColor: `${accent}cc` }}
          />
          <span className="h-2 w-40 rounded-full bg-bone/15" />
          <span className="h-2 w-32 rounded-full bg-bone/10" />
        </div>
        <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-3">
          <span className="h-12 rounded-lg border border-line bg-bone/[0.03]" />
          <span className="h-12 rounded-lg border border-line bg-bone/[0.03]" />
          <span className="h-12 rounded-lg border border-line bg-bone/[0.03]" />
        </div>
        {/* Project name watermark */}
        <span className="absolute inset-0 top-9 flex items-center justify-center px-6 text-center text-lg font-semibold tracking-tight text-bone/70">
          {title}
        </span>
      </div>

      {/* Real screenshot overlay (if provided) */}
      {hasReal && (
        <Image
          src={imageUrl as string}
          alt={imageAlt ?? `${title} screenshot`}
          fill
          sizes="(max-width: 768px) 100vw, 600px"
          className="z-10 object-cover object-top pt-9"
        />
      )}
    </div>
  );
}

export default ProjectMockup;
