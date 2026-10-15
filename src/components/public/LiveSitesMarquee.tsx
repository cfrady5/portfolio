import { ProjectMockup } from './ProjectMockup';
import { primarySites, eventSites, type LiveSite } from '@/data/sites';
import { cn } from '@/lib/utils';

function SiteCard({ site }: { site: LiveSite }) {
  return (
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group/card mr-5 block w-[280px] shrink-0 sm:w-[340px]"
      aria-label={`Open ${site.name} in a new tab`}
    >
      <div className="overflow-hidden rounded-xl border border-line bg-ink-800/50 transition-all duration-300 group-hover/card:border-bone/25 group-hover/card:-translate-y-1">
        {/* Live screenshot of the real site (falls back to a gradient). */}
        <ProjectMockup title={site.name} accent={site.accent} liveUrl={site.url} />
        <div className="flex items-center justify-between gap-2 px-4 py-3">
          <span className="truncate text-sm font-medium text-bone">
            {site.name}
          </span>
          <span className="shrink-0 text-xs text-bone-soft transition-colors group-hover/card:text-moss-400">
            Open ↗
          </span>
        </div>
      </div>
    </a>
  );
}

function MarqueeRow({
  sites,
  reverse,
  durationSeconds,
}: {
  sites: LiveSite[];
  reverse?: boolean;
  durationSeconds: number;
}) {
  // Duplicate the set so the loop is seamless (track shifts by exactly 50%).
  const doubled = [...sites, ...sites];
  return (
    <div className="marquee py-1">
      <div
        className={cn('marquee-track', reverse && 'reverse')}
        style={{ ['--marquee-dur' as string]: `${durationSeconds}s` }}
      >
        {doubled.map((site, i) => (
          <SiteCard key={`${site.url}-${i}`} site={site} />
        ))}
      </div>
    </div>
  );
}

export function LiveSitesMarquee() {
  return (
    <div className="flex flex-col gap-5">
      <MarqueeRow sites={primarySites} durationSeconds={70} />
      <MarqueeRow sites={eventSites} reverse durationSeconds={64} />
    </div>
  );
}

export default LiveSitesMarquee;
