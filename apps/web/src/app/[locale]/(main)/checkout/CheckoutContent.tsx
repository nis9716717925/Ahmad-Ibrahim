'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { ArrowLeft, CreditCard, Lock, ShieldCheck } from 'lucide-react';
import {
  MEMBERSHIP_PLANS,
  formatPrice,
  getPlan,
  getPlanPrice,
  type BillingCycle,
  type PlanId,
} from '@/lib/membership-plans';

export default function CheckoutContent() {
  const t = useTranslations('checkout');
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPlan = (searchParams.get('plan') as PlanId) || 'professional';
  const initialCycle = (searchParams.get('cycle') as BillingCycle) || 'annual';

  const [planId, setPlanId] = useState<PlanId>(
    getPlan(initialPlan) ? initialPlan : 'professional',
  );
  const [cycle, setCycle] = useState<BillingCycle>(initialCycle === 'monthly' ? 'monthly' : 'annual');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    company: '',
    firstName: '',
    lastName: '',
    email: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const plan = useMemo(() => getPlan(planId) ?? MEMBERSHIP_PLANS[1], [planId]);
  const price = getPlanPrice(plan, cycle) ?? 0;
  const tax = Math.round(price * 0.05);
  const total = price + tax;

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
    sessionStorage.setItem(
      'lastOrder',
      JSON.stringify({
        orderId,
        planId,
        cycle,
        total,
        email: form.email,
        company: form.company,
      }),
    );
    router.push(`/checkout/success?order=${orderId}`);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="container-page flex items-center gap-4 py-6">
          <Link href="/membership" className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-secondary-600">
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {t('backToPlans')}
          </Link>
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <Lock className="h-3.5 w-3.5" />
            {t('secureCheckout')}
          </span>
        </div>
      </div>

      <div className="container-page py-10 sm:py-14">
        <h1 className="text-2xl font-extrabold text-primary-900 sm:text-3xl">{t('title')}</h1>
        <p className="mt-2 text-slate-600">{t('subtitle')}</p>

        <form onSubmit={handleSubmit} className="mt-10 grid gap-8 lg:grid-cols-5 lg:gap-12">
          <div className="space-y-8 lg:col-span-3">
            <section className="card">
              <h2 className="font-semibold text-primary-900">{t('billingDetails')}</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="label-field">{t('company')}</label>
                  <input
                    className="input-field"
                    value={form.company}
                    onChange={(e) => update('company', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="label-field">{t('firstName')}</label>
                  <input
                    className="input-field"
                    value={form.firstName}
                    onChange={(e) => update('firstName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="label-field">{t('lastName')}</label>
                  <input
                    className="input-field"
                    value={form.lastName}
                    onChange={(e) => update('lastName', e.target.value)}
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="label-field">{t('email')}</label>
                  <input
                    type="email"
                    className="input-field"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    required
                  />
                </div>
              </div>
            </section>

            <section className="card">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-secondary-600" />
                <h2 className="font-semibold text-primary-900">{t('payment')}</h2>
              </div>
              <p className="mt-1 text-xs text-slate-500">{t('demoNote')}</p>
              <div className="mt-5 space-y-4">
                <div>
                  <label className="label-field">{t('cardName')}</label>
                  <input
                    className="input-field"
                    value={form.cardName}
                    onChange={(e) => update('cardName', e.target.value)}
                    placeholder="John Smith"
                    required
                  />
                </div>
                <div>
                  <label className="label-field">{t('cardNumber')}</label>
                  <input
                    className="input-field"
                    value={form.cardNumber}
                    onChange={(e) => update('cardNumber', e.target.value.replace(/\D/g, '').slice(0, 16))}
                    placeholder="4242 4242 4242 4242"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label-field">{t('expiry')}</label>
                    <input
                      className="input-field"
                      value={form.expiry}
                      onChange={(e) => update('expiry', e.target.value)}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div>
                    <label className="label-field">{t('cvc')}</label>
                    <input
                      className="input-field"
                      value={form.cvc}
                      onChange={(e) => update('cvc', e.target.value.replace(/\D/g, '').slice(0, 4))}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>

          <aside className="lg:col-span-2">
            <div className="card sticky top-24">
              <h2 className="font-semibold text-primary-900">{t('orderSummary')}</h2>

              <div className="mt-4 space-y-2">
                <label className="label-field">{t('selectPlan')}</label>
                <select
                  className="input-field"
                  value={planId}
                  onChange={(e) => setPlanId(e.target.value as PlanId)}
                >
                  {MEMBERSHIP_PLANS.filter((p) => p.id !== 'enterprise').map((p) => (
                    <option key={p.id} value={p.id}>
                      {t(`planNames.${p.id}`)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-3 flex rounded-lg border border-slate-200 p-1">
                {(['monthly', 'annual'] as const).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCycle(c)}
                    className={`flex-1 rounded-md py-2 text-xs font-semibold transition-colors ${
                      cycle === c ? 'bg-secondary-600 text-white' : 'text-slate-500'
                    }`}
                  >
                    {c === 'monthly' ? t('monthly') : t('annual')}
                  </button>
                ))}
              </div>

              <div className="mt-6 space-y-3 border-t border-slate-100 pt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">{t('plan')}</span>
                  <span className="font-medium">{t(`planNames.${plan.id}`)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{t('subtotal')}</span>
                  <span>{formatPrice(price, locale)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{t('tax')}</span>
                  <span>{formatPrice(tax, locale)}</span>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-3 text-base font-bold text-primary-900">
                  <span>{t('total')}</span>
                  <span>{formatPrice(total, locale)}</span>
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-primary mt-6 w-full">
                {loading ? t('processing') : t('completePurchase')}
              </button>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                {t('guarantee')}
              </p>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}
