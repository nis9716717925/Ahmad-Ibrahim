import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Share2, Globe, Mail, MapPin } from 'lucide-react';

export async function Footer() {
  const t = await getTranslations('footer');
  const tNav = await getTranslations('nav');

  const columns = [
    {
      title: t('services'),
      links: [
        { label: t('foodSafetyAudits'), href: '/services' },
        { label: t('waterSafety'), href: '/services' },
        { label: t('pestControl'), href: '/services' },
        { label: t('isoCompliance'), href: '/services' },
        { label: t('hygieneConsulting'), href: '/services' },
      ],
    },
    {
      title: t('platform'),
      links: [
        { label: t('auditDashboard'), href: '/admin/audits' },
        { label: t('clientPortal'), href: '/portal' },
        { label: t('academyLms'), href: '/academy' },
        { label: t('aiAssistant'), href: '/assistant' },
        { label: t('mobileApp'), href: '/admin/audits' },
      ],
    },
    {
      title: t('company'),
      links: [
        { label: t('aboutUs'), href: '/about' },
        { label: t('industries'), href: '/services#industries' },
        { label: tNav('contact'), href: '/contact' },
        { label: t('careers'), href: '/contact' },
        { label: t('signIn'), href: '/login' },
      ],
    },
  ];

  return (
    <footer className="border-t border-white/10 bg-primary-950 text-slate-400">
      <div className="container-page py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-secondary-600 to-accent-500 text-sm font-bold text-white">
                AI
              </span>
              <div>
                <span className="block text-lg font-bold text-white">Ahmad Ibrahim</span>
                <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
                  {tNav('tagline')}
                </span>
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed">{t('description')}</p>
            <div className="mt-6 space-y-2 text-sm">
              <a href="mailto:info@ahmadibrahim.com" className="flex items-center gap-2 transition-colors hover:text-white">
                <Mail className="h-4 w-4 text-accent-400" /> info@ahmadibrahim.com
              </a>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent-400" /> Dubai, United Arab Emirates
              </p>
            </div>
            <div className="mt-6 flex gap-3">
              {[Share2, Globe].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:border-white/20 hover:text-white"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-white">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-center text-sm sm:text-left">
            © {new Date().getFullYear()} Ahmad Ibrahim. {t('rights')}
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-500">
            <span>{t('isoAligned')}</span>
            <span>{t('gdpr')}</span>
            <span>{t('aiPowered')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
