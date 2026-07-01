export type PlanId = 'starter' | 'professional' | 'enterprise';

export type BillingCycle = 'monthly' | 'annual';

export type MembershipPlan = {
  id: PlanId;
  monthlyPrice: number | null;
  annualPrice: number | null;
  featureKeys: string[];
  popular?: boolean;
};

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'starter',
    monthlyPrice: 499,
    annualPrice: 4790,
    featureKeys: ['f1', 'f2', 'f3', 'f4', 'f5'],
  },
  {
    id: 'professional',
    monthlyPrice: 1299,
    annualPrice: 12470,
    featureKeys: ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8'],
    popular: true,
  },
  {
    id: 'enterprise',
    monthlyPrice: null,
    annualPrice: null,
    featureKeys: ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10'],
  },
];

export function getPlan(id: string | null | undefined): MembershipPlan | undefined {
  return MEMBERSHIP_PLANS.find((p) => p.id === id);
}

export function formatPrice(amount: number, locale = 'en') {
  return new Intl.NumberFormat(locale === 'ar' ? 'ar-AE' : locale === 'tr' ? 'tr-TR' : 'en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getPlanPrice(plan: MembershipPlan, cycle: BillingCycle): number | null {
  if (cycle === 'annual') return plan.annualPrice;
  return plan.monthlyPrice;
}
