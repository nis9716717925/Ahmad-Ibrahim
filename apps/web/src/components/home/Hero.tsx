import Link from 'next/link';
import { ArrowRight, Play, ShieldCheck, Star } from 'lucide-react';
import { PlatformPreview } from './PlatformPreview';
import { Marquee } from './Marquee';
import { FadeIn } from '@/components/ui/FadeIn';

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-primary-950">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-40" />
        <div className="absolute -left-32 top-20 h-[28rem] w-[28rem] rounded-full bg-secondary-600/20 blur-[100px]" />
        <div className="absolute -right-20 top-40 h-96 w-96 rounded-full bg-accent-500/15 blur-[80px]" />
        <div className="absolute bottom-0 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-secondary-600/10 blur-[80px]" />
      </div>

      <div className="container-page relative flex min-h-[100svh] flex-col justify-center pb-8 pt-28 sm:pt-32 lg:pb-16 lg:pt-36">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="text-center lg:text-left">
            <FadeIn>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur-md sm:text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
                </span>
                Trusted by 500+ enterprises worldwide
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="mt-6 text-[2.5rem] font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[4rem]">
                World-class{' '}
                <span className="bg-gradient-to-r from-accent-400 via-secondary-400 to-accent-300 bg-clip-text text-transparent">
                  compliance
                </span>
                <br />
                for global enterprises
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg lg:mx-0">
                Food safety, water safety, pest control, ISO audits, and AI-powered compliance —
                delivered with the rigor of SGS and the innovation of a digital-first platform.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <Link href="/contact" className="btn-glow group w-full sm:w-auto">
                  Schedule consultation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link href="/admin/audits" className="btn-ghost-light group w-full sm:w-auto">
                  <Play className="h-4 w-4" />
                  Explore platform
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
                {[
                  { icon: ShieldCheck, label: 'ISO Accredited' },
                  { icon: Star, label: '4.9 Client Rating' },
                  { icon: ShieldCheck, label: '45+ Countries' },
                ].map((b) => (
                  <div key={b.label} className="flex items-center gap-2 text-sm text-slate-400">
                    <b.icon className="h-4 w-4 text-accent-400" />
                    {b.label}
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.2} direction="left" className="relative lg:pl-4">
            <PlatformPreview />
          </FadeIn>
        </div>
      </div>

      <Marquee />
    </section>
  );
}
