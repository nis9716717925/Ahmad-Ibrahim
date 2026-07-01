import { PROCESS } from './data';
import { FadeIn } from '@/components/ui/FadeIn';

export function ProcessTimeline() {
  return (
    <section className="bg-surface-muted py-20 dark:bg-primary-950/50 sm:py-28">
      <div className="container-page">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <span className="badge-brand">Our process</span>
          <h2 className="section-heading mt-4">From discovery to certification</h2>
          <p className="section-subheading mx-auto">
            A proven five-stage methodology that delivers measurable compliance outcomes.
          </p>
        </FadeIn>

        <div className="relative mt-14">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-secondary-300 via-accent-300 to-transparent sm:left-1/2 sm:block" aria-hidden />
          <div className="space-y-8 sm:space-y-12">
            {PROCESS.map((step, i) => (
              <FadeIn key={step.step} delay={i * 0.08}>
                <div className={`flex flex-col gap-4 sm:flex-row sm:items-center ${i % 2 === 1 ? 'sm:flex-row-reverse' : ''}`}>
                  <div className={`flex-1 ${i % 2 === 1 ? 'sm:text-right' : ''}`}>
                    <div className={`rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-primary-900 ${i % 2 === 1 ? 'sm:ml-auto sm:max-w-md' : 'sm:max-w-md'}`}>
                      <span className="text-xs font-bold text-secondary-600">{step.step}</span>
                      <h3 className="mt-1 text-lg font-bold text-primary-900 dark:text-white">{step.title}</h3>
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{step.desc}</p>
                    </div>
                  </div>
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-600 text-sm font-bold text-white shadow-glow sm:mx-4">
                    {step.step}
                  </div>
                  <div className="hidden flex-1 sm:block" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
