import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from './data';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/FadeIn';

export function Services() {
  return (
    <section className="bg-surface-muted py-20 dark:bg-primary-950/50 sm:py-28">
      <div className="container-page">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <span className="badge-brand">Services</span>
          <h2 className="section-heading mt-4">Comprehensive compliance services</h2>
          <p className="section-subheading mx-auto">
            End-to-end programs spanning audit, consulting, training, and AI — designed for enterprise scale.
          </p>
        </FadeIn>

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {SERVICES.map((s) => (
            <StaggerItem key={s.title}>
              <Link
                href={s.href}
                className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-secondary-200 hover:shadow-card-hover dark:border-slate-700 dark:bg-primary-900 dark:hover:border-secondary-600/50"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-secondary-50 to-accent-50 text-secondary-600 transition-transform group-hover:scale-105 dark:from-secondary-600/20 dark:to-accent-600/10 dark:text-secondary-400">
                  <s.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-base font-bold text-primary-900 dark:text-white">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{s.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-secondary-600 opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn className="mt-12 text-center">
          <Link href="/services" className="btn-secondary">View all services</Link>
        </FadeIn>
      </div>
    </section>
  );
}
