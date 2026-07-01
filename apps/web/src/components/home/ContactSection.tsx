import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import { FadeIn } from '@/components/ui/FadeIn';

export async function ContactSection() {
  const t = await getTranslations('contact');

  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeIn>
            <span className="badge-brand">{t('badge')}</span>
            <h2 className="section-heading mt-4">{t('title')}</h2>
            <p className="section-subheading">{t('description')}</p>
            <ul className="mt-8 space-y-4">
              {[
                { icon: Mail, label: 'info@ahmadibrahim.com', href: 'mailto:info@ahmadibrahim.com' },
                { icon: Phone, label: '+971 4 000 0000', href: 'tel:+97140000000' },
                { icon: MapPin, label: t('location'), href: '/contact' },
              ].map((c) => (
                <li key={c.label}>
                  <Link href={c.href} className="flex items-center gap-3 text-sm text-slate-600 transition-colors hover:text-secondary-600 dark:text-slate-400">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-50 text-secondary-600 dark:bg-secondary-600/20">
                      <c.icon className="h-4 w-4" />
                    </span>
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.1} direction="left">
            <form className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card dark:border-slate-700 dark:bg-primary-900 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label-field">{t('firstName')}</label>
                  <input type="text" className="input-field" />
                </div>
                <div>
                  <label className="label-field">{t('lastName')}</label>
                  <input type="text" className="input-field" />
                </div>
              </div>
              <div className="mt-4">
                <label className="label-field">{t('company')}</label>
                <input type="text" className="input-field" />
              </div>
              <div className="mt-4">
                <label className="label-field">{t('email')}</label>
                <input type="email" className="input-field" />
              </div>
              <div className="mt-4">
                <label className="label-field">{t('message')}</label>
                <textarea className="input-field min-h-[100px] resize-y" placeholder={t('messagePlaceholder')} rows={4} />
              </div>
              <Link href="/contact" className="btn-primary mt-6 flex w-full items-center justify-center gap-2">
                {t('submit')} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
