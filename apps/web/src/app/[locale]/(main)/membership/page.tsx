import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { PageHeader } from '@/components/layout/PageHeader';
import { PricingCards } from '@/components/membership/PricingCards';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'membership' });
  return { title: t('pageTitle') };
}

export default async function MembershipPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('membership');

  return (
    <>
      <PageHeader
        eyebrow={t('badge')}
        title={t('pageTitle')}
        description={t('pageDescription')}
      />
      <PricingCards showHeader={false} />
    </>
  );
}
