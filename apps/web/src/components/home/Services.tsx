import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { SERVICE_ITEMS } from './data';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/FadeIn';

export async function Services() {
  const t = await getTranslations('services');

  return (
    <section className="bg-surface-muted py-20 dark:bg-primary-950/50 sm:py-28">
      <div className="container-page">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <span className="badge-brand">{t('badge')}</span>
          <h2 className="section-heading mt-4">{t('title')}</h2>
          <p className="section-subheading mx-auto">{t('description')}</p>
        </FadeIn>

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {SERVICE_ITEMS.map((s) => (
            <StaggerItem key={s.key}>
              <Link
                href={s.href}
                className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-secondary-200 hover:shadow-card-hover dark:border-slate-700 dark:bg-primary-900 dark:hover:border-secondary-600/50"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-secondary-50 to-accent-50 text-secondary-600 transition-transform group-hover:scale-105 dark:from-secondary-600/20 dark:to-accent-600/10 dark:text-secondary-400">
                  <s.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-base font-bold text-primary-900 dark:text-white">{t(s.key)}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{t(`${s.key}Desc`)}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-secondary-600 opacity-0 transition-opacity group-hover:opacity-100">
                  {t('learnMore')} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn className="mt-12 text-center">
          <Link href="/services" className="btn-secondary">{t('viewAll')}</Link>
        </FadeIn>
      </div>
    </section>
  );
}
