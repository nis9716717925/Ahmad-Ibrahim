import Link from 'next/link';
import { PlatformPreview } from './PlatformPreview';
import { Marquee } from './Marquee';

export function Hero() {
  return (
    <section className="hero-mesh relative overflow-hidden">
      {/* Animated orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -left-20 top-20 h-72 w-72 animate-aurora rounded-full bg-brand-600/20 blur-3xl" />
        <div className="absolute -right-10 top-40 h-96 w-96 animate-aurora rounded-full bg-cyan-500/15 blur-3xl" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 animate-aurora rounded-full bg-violet-600/10 blur-3xl" style={{ animationDelay: '4s' }} />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="container-page relative pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <div className="animate-in delay-100 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm sm:text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              One platform · Audits · Academy · AI
            </div>

            <h1 className="animate-in delay-200 mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[3.5rem]">
              Compliance that{' '}
              <span className="gradient-text">moves</span>
              <br className="hidden sm:block" />
              {' '}at your speed
            </h1>

            <p className="animate-in delay-300 mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg lg:mx-0">
              Run audits in the field, train your teams, issue certificates, and let AI handle the paperwork — all from one connected system.
            </p>

            <div className="animate-in delay-400 mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link href="/contact" className="btn-glow w-full sm:w-auto">
                Start free consultation
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link href="/academy" className="btn-ghost-light w-full sm:w-auto">
                Explore Academy
              </Link>
            </div>

            <div className="animate-in delay-500 mt-10 flex flex-wrap items-center justify-center gap-6 text-center lg:justify-start">
              {[
                { value: '500+', label: 'Audits' },
                { value: '2K+', label: 'Certified' },
                { value: '50+', label: 'Clients' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-xl font-bold text-white sm:text-2xl">{s.value}</p>
                  <p className="text-xs text-slate-500 sm:text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="animate-in delay-300 relative lg:pl-4">
            <PlatformPreview />
          </div>
        </div>
      </div>

      <Marquee />
    </section>
  );
}
