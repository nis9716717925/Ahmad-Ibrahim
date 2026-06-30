import Link from 'next/link';

export function CTA() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-700 via-brand-800 to-slate-900" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(6,182,212,0.2) 0%, transparent 50%)`,
        }}
        aria-hidden
      />
      <div className="container-page relative text-center">
        <h2 className="text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
          Ready to modernize compliance?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-brand-100 sm:text-lg">
          Join companies using our platform for audits, training, and end-to-end compliance management.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link href="/contact" className="btn-glow w-full sm:w-auto">
            Get started today
          </Link>
          <Link href="/login" className="btn-ghost-light w-full sm:w-auto">
            Sign in to portal
          </Link>
        </div>
      </div>
    </section>
  );
}
