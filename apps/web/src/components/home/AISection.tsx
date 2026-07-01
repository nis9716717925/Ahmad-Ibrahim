import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ArrowRight, Brain, MessageSquare, FileText, GitCompare, Sparkles } from 'lucide-react';
import { FadeIn } from '@/components/ui/FadeIn';

const featureKeys = ['feature1', 'feature2', 'feature3', 'feature4'] as const;
const featureIcons = [MessageSquare, FileText, Sparkles, GitCompare];

export async function AISection() {
  const t = await getTranslations('ai');

  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeIn direction="right">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-primary-900 to-primary-950 p-8 shadow-premium sm:p-10">
              <div className="absolute end-0 top-0 h-40 w-40 rounded-full bg-accent-500/20 blur-3xl" />
              <Brain className="relative h-10 w-10 text-accent-400" />
              <div className="relative mt-6 space-y-4">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-white/50">{t('demoYou')}</p>
                  <p className="mt-1 text-sm text-white">{t('demoPrompt')}</p>
                </div>
                <div className="rounded-xl border border-accent-500/20 bg-accent-500/10 p-4">
                  <p className="text-xs text-accent-300">AI Assistant</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/80">{t('demoReply')}</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <span className="badge-brand">{t('badge')}</span>
            <h2 className="section-heading mt-4">{t('title')}</h2>
            <p className="section-subheading">{t('description')}</p>
            <ul className="mt-8 space-y-4">
              {featureKeys.map((key, i) => {
                const Icon = featureIcons[i];
                return (
                  <li key={key} className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary-50 text-secondary-600 dark:bg-secondary-600/20 dark:text-secondary-400">
                      <Icon className="h-4 w-4" />
                    </span>
                    {t(key)}
                  </li>
                );
              })}
            </ul>
            <Link href="/assistant" className="btn-primary mt-8 inline-flex">
              {t('cta')} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
