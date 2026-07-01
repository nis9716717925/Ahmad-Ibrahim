import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FadeIn } from '@/components/ui/FadeIn';

export function CTA() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="container-page">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-900 via-primary-950 to-secondary-900 px-8 py-16 text-center shadow-premium sm:px-16 sm:py-20">
            <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-grid opacity-[0.05]" aria-hidden />
            <div className="absolute -left-20 top-0 h-60 w-60 rounded-full bg-accent-500/20 blur-[80px]" aria-hidden />
            <div className="absolute -right-20 bottom-0 h-60 w-60 rounded-full bg-secondary-500/20 blur-[80px]" aria-hidden />
            <div className="relative">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Ready to elevate your compliance?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-slate-400 sm:text-lg">
                Join leading organizations using Ahmad Ibrahim for audits, training, and AI-powered compliance intelligence.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/contact" className="btn-glow w-full sm:w-auto">
                  Book a consultation <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/portal" className="btn-ghost-light w-full sm:w-auto">
                  Client portal
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
