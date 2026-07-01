import { getTranslations } from 'next-intl/server';
import { CERTIFICATIONS } from './data';
import { FadeIn } from '@/components/ui/FadeIn';
import { Award } from 'lucide-react';

export async function CertificationsSection() {
  const t = await getTranslations('certifications');

  return (
    <section className="border-y border-slate-200/80 py-16 dark:border-slate-800 sm:py-20">
      <div className="container-page">
        <FadeIn className="flex flex-col items-center text-center">
          <Award className="h-8 w-8 text-secondary-600" />
          <h2 className="mt-4 text-lg font-bold text-primary-900 dark:text-white sm:text-xl">{t('title')}</h2>
          <p className="mt-2 max-w-lg text-sm text-slate-500">{t('description')}</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {CERTIFICATIONS.map((cert) => (
              <span
                key={cert}
                className="rounded-xl border border-slate-200/80 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-colors hover:border-secondary-200 hover:text-secondary-700 dark:border-slate-700 dark:bg-primary-900 dark:text-slate-300"
              >
                {cert}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
