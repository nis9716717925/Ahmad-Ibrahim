'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Check, Sparkles } from 'lucide-react';
import {
  MEMBERSHIP_PLANS,
  formatPrice,
  getPlanPrice,
  type BillingCycle,
  type PlanId,
} from '@/lib/membership-plans';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/FadeIn';

type Props = {
  showHeader?: boolean;
};

export function PricingCards({ showHeader = true }: Props) {
  const t = useTranslations('membership');
  const locale = useLocale();
  const [cycle, setCycle] = useState<BillingCycle>('annual');

  return (
    <section id="membership" className="bg-surface-muted py-20 dark:bg-primary-950/50 sm:py-28">
      <div className="container-page">
        {showHeader && (
          <FadeIn className="mx-auto max-w-2xl text-center">
            <span className="badge-brand">{t('badge')}</span>
            <h2 className="section-heading mt-4">{t('title')}</h2>
            <p className="section-subheading mx-auto">{t('description')}</p>
          </FadeIn>
        )}

        <FadeIn delay={0.1} className="mt-10 flex justify-center">
          <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-primary-900">
            <button
              type="button"
              onClick={() => setCycle('monthly')}
              className={`rounded-lg px-5 py-2 text-sm font-semibold transition-colors ${
                cycle === 'monthly'
                  ? 'bg-white text-primary-900 shadow-sm dark:bg-primary-800 dark:text-white'
                  : 'text-slate-500 hover:text-primary-900'
              }`}
            >
              {t('monthly')}
            </button>
            <button
              type="button"
              onClick={() => setCycle('annual')}
              className={`flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold transition-colors ${
                cycle === 'annual'
                  ? 'bg-white text-primary-900 shadow-sm dark:bg-primary-800 dark:text-white'
                  : 'text-slate-500 hover:text-primary-900'
              }`}
            >
              {t('annual')}
              <span className="rounded-full bg-accent-100 px-2 py-0.5 text-[10px] font-bold uppercase text-accent-700">
                {t('save')}
              </span>
            </button>
          </div>
        </FadeIn>

        <Stagger className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-8">
          {MEMBERSHIP_PLANS.map((plan) => {
            const price = getPlanPrice(plan, cycle);
            const isEnterprise = plan.id === 'enterprise';

            return (
              <StaggerItem key={plan.id}>
                <div
                  className={`relative flex h-full flex-col rounded-3xl border p-8 transition-shadow ${
                    plan.popular
                      ? 'border-secondary-300 bg-white shadow-premium ring-2 ring-secondary-500/20 dark:border-secondary-600 dark:bg-primary-900'
                      : 'border-slate-200/80 bg-white shadow-card dark:border-slate-700 dark:bg-primary-900'
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 start-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-secondary-600 px-4 py-1 text-xs font-bold uppercase tracking-wide text-white">
                      <Sparkles className="h-3 w-3" />
                      {t('popular')}
                    </span>
                  )}

                  <h3 className="text-lg font-bold text-primary-900 dark:text-white">
                    {t(`plans.${plan.id}.name`)}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    {t(`plans.${plan.id}.description`)}
                  </p>

                  <div className="mt-6">
                    {isEnterprise ? (
                      <p className="text-3xl font-extrabold text-primary-900 dark:text-white">{t('custom')}</p>
                    ) : (
                      <>
                        <p className="text-4xl font-extrabold tracking-tight text-primary-900 dark:text-white">
                          {formatPrice(price!, locale)}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          {cycle === 'annual' ? t('perYear') : t('perMonth')}
                        </p>
                      </>
                    )}
                  </div>

                  <ul className="mt-8 flex-1 space-y-3">
                    {plan.featureKeys.map((key) => (
                      <li key={key} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        {t(`features.${key}`)}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={
                      isEnterprise
                        ? '/contact'
                        : `/checkout?plan=${plan.id}&cycle=${cycle}`
                    }
                    className={`mt-8 w-full text-center ${
                      plan.popular ? 'btn-primary' : 'btn-secondary'
                    }`}
                  >
                    {isEnterprise ? t('contactSales') : t('buyNow')}
                  </Link>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <FadeIn delay={0.2} className="mt-12 text-center text-sm text-slate-500">
          {t('footnote')}
        </FadeIn>
      </div>
    </section>
  );
}

export function checkoutHref(plan: PlanId, cycle: BillingCycle = 'annual') {
  return `/checkout?plan=${plan}&cycle=${cycle}`;
}
