import { getTranslations } from 'next-intl/server';
import { INDUSTRY_ITEMS } from './data';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/FadeIn';

export async function IndustriesSection() {
  const t = await getTranslations('industries');

  return (
    <section id="industries" className="py-20 sm:py-28">
      <div className="container-page">
        <FadeIn className="max-w-2xl">
          <span className="badge-brand">{t('badge')}</span>
          <h2 className="section-heading mt-4">{t('title')}</h2>
          <p className="section-subheading">{t('description')}</p>
        </FadeIn>

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRY_ITEMS.map((ind) => (
            <StaggerItem key={ind.key}>
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-card dark:border-slate-700 dark:bg-primary-900">
                <div className="absolute -end-6 -top-6 h-24 w-24 rounded-full bg-secondary-50 opacity-0 transition-opacity group-hover:opacity-100 dark:bg-secondary-600/10" />
                <ind.icon className="relative h-8 w-8 text-secondary-600 dark:text-secondary-400" />
                <h3 className="relative mt-4 text-lg font-bold text-primary-900 dark:text-white">{t(ind.key)}</h3>
                <p className="relative mt-2 text-sm text-slate-500 dark:text-slate-400">{t(`${ind.key}Desc`)}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
