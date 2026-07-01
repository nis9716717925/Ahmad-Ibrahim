import { getTranslations } from 'next-intl/server';
import { TRUSTED_LOGO_KEYS } from './data';

export async function Marquee() {
  const t = await getTranslations('trusted');
  const logos = [...TRUSTED_LOGO_KEYS, ...TRUSTED_LOGO_KEYS];

  return (
    <div className="relative border-t border-white/10 bg-primary-950/80 py-5 backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-16 bg-gradient-to-r from-primary-950 to-transparent sm:w-24 rtl:bg-gradient-to-l" />
      <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-16 bg-gradient-to-l from-primary-950 to-transparent sm:w-24 rtl:bg-gradient-to-r" />
      <div className="flex animate-marquee whitespace-nowrap">
        {logos.map((key, i) => (
          <span
            key={`${key}-${i}`}
            className="mx-8 flex items-center gap-2 text-sm font-semibold tracking-wide text-white/30 sm:mx-12 sm:text-base"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-500/50" />
            {t(key)}
          </span>
        ))}
      </div>
    </div>
  );
}
