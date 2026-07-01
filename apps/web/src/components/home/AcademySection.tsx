import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ArrowRight, BookOpen, Video, Award, Users } from 'lucide-react';
import { FadeIn } from '@/components/ui/FadeIn';

const itemKeys = ['courses', 'live', 'certificates', 'teams'] as const;
const itemIcons = [BookOpen, Video, Award, Users];

export async function AcademySection() {
  const t = await getTranslations('academySection');

  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-premium dark:border-slate-700 dark:bg-primary-900">
          <div className="absolute -end-20 -top-20 h-60 w-60 rounded-full bg-secondary-100 blur-3xl dark:bg-secondary-600/10" />
          <div className="grid lg:grid-cols-2">
            <FadeIn className="p-8 sm:p-12 lg:p-14">
              <span className="badge-brand">{t('badge')}</span>
              <h2 className="section-heading mt-4">{t('title')}</h2>
              <p className="section-subheading">{t('description')}</p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {itemKeys.map((key, i) => {
                  const Icon = itemIcons[i];
                  return (
                    <div key={key} className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                      <Icon className="h-4 w-4 text-secondary-600" />
                      {t(key)}
                    </div>
                  );
                })}
              </div>
              <Link href="/academy" className="btn-primary mt-8 inline-flex">
                {t('cta')} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </FadeIn>
            <FadeIn delay={0.15} direction="left" className="relative min-h-[280px] bg-gradient-to-br from-secondary-600 to-primary-900 p-8 sm:min-h-0 lg:p-14">
              <div className="flex h-full flex-col justify-center">
                <p className="text-sm font-semibold uppercase tracking-wider text-accent-300">{t('featured')}</p>
                <p className="mt-3 text-2xl font-bold text-white sm:text-3xl">{t('courseTitle')}</p>
                <p className="mt-2 text-sm text-white/70">{t('courseMeta')}</p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/20">
                    <div className="h-full w-3/4 rounded-full bg-accent-400" />
                  </div>
                  <span className="text-sm font-bold text-white">75%</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
