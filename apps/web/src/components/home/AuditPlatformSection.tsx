import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ArrowRight, ClipboardCheck, MapPin, BarChart3, FileWarning } from 'lucide-react';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/FadeIn';

const featureKeys = ['checklists', 'gps', 'dashboards', 'capa'] as const;
const featureIcons = [ClipboardCheck, MapPin, BarChart3, FileWarning];

export async function AuditPlatformSection() {
  const t = await getTranslations('auditPlatform');

  return (
    <section className="bg-surface-muted py-20 dark:bg-primary-950/50 sm:py-28">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeIn>
            <span className="badge-brand">{t('badge')}</span>
            <h2 className="section-heading mt-4">{t('title')}</h2>
            <p className="section-subheading">{t('description')}</p>
            <Link href="/admin/audits" className="btn-primary mt-8 inline-flex">
              {t('cta')} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </FadeIn>

          <Stagger className="grid gap-4 sm:grid-cols-2">
            {featureKeys.map((key, i) => {
              const Icon = featureIcons[i];
              return (
                <StaggerItem key={key}>
                  <div className="h-full rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-primary-900">
                    <Icon className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
                    <h3 className="mt-3 font-bold text-primary-900 dark:text-white">{t(key)}</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t(`${key}Desc`)}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
