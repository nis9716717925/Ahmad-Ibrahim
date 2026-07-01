'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { Globe } from 'lucide-react';
import type { Locale } from '@/i18n/routing';

const locales: { code: Locale; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'AR' },
  { code: 'tr', label: 'TR' },
];

type Props = {
  transparent?: boolean;
};

export function LanguageSwitcher({ transparent }: Props) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className={`flex items-center rounded-lg border p-0.5 ${
        transparent ? 'border-white/15 bg-white/5' : 'border-slate-200 bg-slate-50 dark:border-slate-700'
      }`}
      role="group"
      aria-label="Language"
    >
      {locales.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => router.replace(pathname, { locale: l.code })}
          className={`flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors ${
            locale === l.code
              ? transparent
                ? 'bg-white/15 text-white'
                : 'bg-white text-primary-900 shadow-sm dark:bg-primary-800 dark:text-white'
              : transparent
                ? 'text-white/60 hover:text-white'
                : 'text-slate-500 hover:text-primary-900 dark:hover:text-white'
          }`}
          aria-current={locale === l.code ? 'true' : undefined}
        >
          {l.code === locale && <Globe className="h-3 w-3" />}
          {l.label}
        </button>
      ))}
    </div>
  );
}
