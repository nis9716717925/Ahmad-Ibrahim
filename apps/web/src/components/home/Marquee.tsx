import { TRUSTED_LOGOS } from './data';

export function Marquee() {
  const logos = [...TRUSTED_LOGOS, ...TRUSTED_LOGOS];

  return (
    <div className="relative border-t border-white/10 bg-primary-950/80 py-5 backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-primary-950 to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-primary-950 to-transparent sm:w-24" />
      <div className="flex animate-marquee whitespace-nowrap">
        {logos.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="mx-8 flex items-center gap-2 text-sm font-semibold tracking-wide text-white/30 sm:mx-12 sm:text-base"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-500/50" />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
