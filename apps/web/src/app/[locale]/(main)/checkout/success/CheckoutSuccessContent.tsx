'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/membership-plans';

type Order = {
  orderId: string;
  planId: string;
  cycle: string;
  total: number;
  email: string;
  company: string;
};

export default function CheckoutSuccessContent() {
  const t = useTranslations('checkout');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('lastOrder');
    if (raw) {
      try {
        setOrder(JSON.parse(raw));
      } catch {
        setOrder(null);
      }
    }
  }, []);

  const orderId = searchParams.get('order') ?? order?.orderId ?? '—';

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
          <CheckCircle2 className="h-9 w-9 text-success" />
        </div>
        <h1 className="mt-6 text-2xl font-extrabold text-primary-900 sm:text-3xl">{t('successTitle')}</h1>
        <p className="mt-3 text-slate-600">{t('successDescription')}</p>

        <div className="card mt-8 text-start text-sm">
          <div className="flex justify-between border-b border-slate-100 py-3">
            <span className="text-slate-500">{t('orderNumber')}</span>
            <span className="font-mono font-semibold">{orderId}</span>
          </div>
          {order && (
            <>
              <div className="flex justify-between border-b border-slate-100 py-3">
                <span className="text-slate-500">{t('plan')}</span>
                <span className="font-medium">{t(`planNames.${order.planId}`)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 py-3">
                <span className="text-slate-500">{t('total')}</span>
                <span className="font-bold">{formatPrice(order.total, locale)}</span>
              </div>
              {order.email && (
                <div className="flex justify-between py-3">
                  <span className="text-slate-500">{t('confirmationSent')}</span>
                  <span className="font-medium">{order.email}</span>
                </div>
              )}
            </>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/portal" className="btn-primary group">
            {t('goToPortal')}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
          <Link href="/membership" className="btn-secondary">
            {t('viewPlans')}
          </Link>
        </div>
      </div>
    </div>
  );
}
