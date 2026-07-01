import { TESTIMONIALS } from './data';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/FadeIn';
import { Quote } from 'lucide-react';

export function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <span className="badge-brand">Testimonials</span>
          <h2 className="section-heading mt-4">Trusted by industry leaders</h2>
        </FadeIn>

        <Stagger className="mt-14 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <StaggerItem key={t.name}>
              <div className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-7 shadow-card dark:border-slate-700 dark:bg-primary-900">
                <Quote className="h-8 w-8 text-secondary-200 dark:text-secondary-800" />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 border-t border-slate-100 pt-5 dark:border-slate-700">
                  <p className="font-bold text-primary-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                  <p className="text-xs font-medium text-secondary-600">{t.company}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
