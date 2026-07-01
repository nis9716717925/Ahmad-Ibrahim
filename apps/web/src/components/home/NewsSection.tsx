import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { NEWS_KEYS } from './data';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/FadeIn';

export async function NewsSection() {
  const t = await getTranslations('news');

  return (
    <section className="bg-surface-muted py-20 dark:bg-primary-950/50 sm:py-28">
      <div className="container-page">
        <FadeIn className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="badge-brand">{t('badge')}</span>
            <h2 className="section-heading mt-4">{t('title')}</h2>
          </div>
          <Link href="/about" className="flex items-center gap-1 text-sm font-semibold text-secondary-600 hover:text-secondary-700">
            {t('viewAll')} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </FadeIn>

        <Stagger className="mt-10 grid gap-4 sm:grid-cols-3">
          {NEWS_KEYS.map((n) => (
            <StaggerItem key={n}>
              <article className="group h-full rounded-2xl border border-slate-200/80 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-card-hover dark:border-slate-700 dark:bg-primary-900">
                <span className="text-xs font-semibold text-secondary-600">{t(`tag${n}`)}</span>
                <p className="mt-2 text-xs text-slate-400">{t(`date${n}`)}</p>
                <h3 className="mt-3 text-base font-bold leading-snug text-primary-900 transition-colors group-hover:text-secondary-700 dark:text-white">
                  {t(`title${n}`)}
                </h3>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
