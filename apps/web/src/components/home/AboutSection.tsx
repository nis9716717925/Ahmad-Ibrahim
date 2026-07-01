import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { FadeIn } from '@/components/ui/FadeIn';

export function AboutSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeIn>
            <span className="inline-flex items-center rounded-full bg-secondary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-700 dark:bg-secondary-600/20 dark:text-secondary-300">
              About Ahmad Ibrahim
            </span>
            <h2 className="section-heading mt-4">
              A premium compliance partner for organizations that cannot afford risk
            </h2>
            <p className="section-subheading">
              For over two decades, we have helped governments, manufacturers, hospitals, and hospitality
              groups achieve and maintain world-class standards — combining accredited expertise with
              an AI-powered digital platform.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                'Accredited audit methodologies aligned with international standards',
                'Dedicated sector teams for food, water, pest, and hygiene',
                'Real-time compliance dashboards for executives and regulators',
                'Integrated training academy with digital certification',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/about" className="btn-primary mt-8 inline-flex">
              Our story <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>

          <FadeIn delay={0.15} direction="left">
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-secondary-100 to-accent-100 opacity-60 blur-2xl dark:from-secondary-900/30 dark:to-accent-900/20" />
              <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-premium dark:border-slate-700 dark:bg-primary-900">
                <div className="aspect-[4/3] bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 p-8 sm:p-10">
                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-400">Since 2004</p>
                      <p className="mt-4 text-2xl font-bold leading-tight text-white sm:text-3xl">
                        Protecting public health through precision audits
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                      {[
                        { v: '20+', l: 'Years' },
                        { v: '500+', l: 'Experts' },
                        { v: '45+', l: 'Markets' },
                      ].map((x) => (
                        <div key={x.l}>
                          <p className="text-xl font-bold text-white">{x.v}</p>
                          <p className="text-xs text-white/50">{x.l}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
