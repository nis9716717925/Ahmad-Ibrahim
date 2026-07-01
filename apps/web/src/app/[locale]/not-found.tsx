import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function NotFound() {
  const t = await getTranslations('notFound');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">{t('code')}</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">{t('title')}</h1>
      <p className="mt-3 max-w-md text-slate-600">{t('description')}</p>
      <Link href="/" className="btn-primary mt-8">
        {t('home')}
      </Link>
    </div>
  );
}
