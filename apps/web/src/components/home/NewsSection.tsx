import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { NEWS } from './data';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/FadeIn';

export function NewsSection() {
  return (
    <section className="bg-surface-muted py-20 dark:bg-primary-950/50 sm:py-28">
      <div className="container-page">
        <FadeIn className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="badge-brand">Insights</span>
            <h2 className="section-heading mt-4">Latest news & updates</h2>
          </div>
          <Link href="/about" className="flex items-center gap-1 text-sm font-semibold text-secondary-600 hover:text-secondary-700">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>

        <Stagger className="mt-10 grid gap-4 sm:grid-cols-3">
          {NEWS.map((n) => (
            <StaggerItem key={n.title}>
              <article className="group h-full rounded-2xl border border-slate-200/80 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-card-hover dark:border-slate-700 dark:bg-primary-900">
                <span className="text-xs font-semibold text-secondary-600">{n.tag}</span>
                <p className="mt-2 text-xs text-slate-400">{n.date}</p>
                <h3 className="mt-3 text-base font-bold leading-snug text-primary-900 transition-colors group-hover:text-secondary-700 dark:text-white">
                  {n.title}
                </h3>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
