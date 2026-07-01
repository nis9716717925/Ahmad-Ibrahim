import { getTranslations } from 'next-intl/server';
import { PROCESS_STEPS } from './data';
import { FadeIn } from '@/components/ui/FadeIn';

export async function ProcessTimeline() {
  const t = await getTranslations('process');

  return (
    <section className="bg-surface-muted py-20 dark:bg-primary-950/50 sm:py-28">
      <div className="container-page">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <span className="badge-brand">{t('badge')}</span>
          <h2 className="section-heading mt-4">{t('title')}</h2>
          <p className="section-subheading mx-auto">{t('description')}</p>
        </FadeIn>

        <div className="relative mt-14">
          <div className="absolute start-4 top-0 hidden h-full w-px bg-gradient-to-b from-secondary-300 via-accent-300 to-transparent sm:start-1/2 sm:block" aria-hidden />
          <div className="space-y-8 sm:space-y-12">
            {PROCESS_STEPS.map((step, i) => (
              <FadeIn key={step} delay={i * 0.08}>
                <div className={`flex flex-col gap-4 sm:flex-row sm:items-center ${i % 2 === 1 ? 'sm:flex-row-reverse' : ''}`}>
                  <div className={`flex-1 ${i % 2 === 1 ? 'sm:text-end' : ''}`}>
                    <div className={`rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-primary-900 ${i % 2 === 1 ? 'sm:ms-auto sm:max-w-md' : 'sm:max-w-md'}`}>
                      <span className="text-xs font-bold text-secondary-600">0{step}</span>
                      <h3 className="mt-1 text-lg font-bold text-primary-900 dark:text-white">{t(`step${step}Title`)}</h3>
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{t(`step${step}Desc`)}</p>
                    </div>
                  </div>
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-600 text-sm font-bold text-white shadow-glow sm:mx-4">
                    0{step}
                  </div>
                  <div className="hidden flex-1 sm:block" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
