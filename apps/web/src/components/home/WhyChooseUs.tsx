import { getTranslations } from 'next-intl/server';
import { WHY_US_KEYS } from './data';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/FadeIn';
import { Globe2, Smartphone, Sparkles, Users } from 'lucide-react';

const icons = [Globe2, Smartphone, Sparkles, Users];

export async function WhyChooseUs() {
  const t = await getTranslations('whyUs');

  return (
    <section className="relative overflow-hidden bg-primary-950 py-20 text-white sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-grid opacity-[0.04]" aria-hidden />
      <div className="absolute -end-40 top-0 h-80 w-80 rounded-full bg-secondary-600/20 blur-[100px]" aria-hidden />
      <div className="container-page relative">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-400">
            {t('badge')}
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {t('title')}
          </h2>
        </FadeIn>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_US_KEYS.map((key, i) => {
            const Icon = icons[i] ?? Globe2;
            return (
              <StaggerItem key={key}>
                <div className="glass-panel h-full p-6 transition-colors hover:border-white/20 hover:bg-white/10">
                  <Icon className="h-7 w-7 text-accent-400" />
                  <h3 className="mt-4 font-bold text-white">{t(key)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{t(`${key}Desc`)}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
