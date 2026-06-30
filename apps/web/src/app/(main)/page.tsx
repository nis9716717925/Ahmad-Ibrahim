import Link from 'next/link';
import { Hero } from '@/components/home/Hero';
import { Services } from '@/components/home/Services';
import { Stats } from '@/components/home/Stats';
import { CTA } from '@/components/home/CTA';

const platformTiles = [
  {
    label: 'Audit & Consulting',
    desc: 'Configurable checklists & scoring',
    href: '/services',
    color: 'from-brand-500 to-cyan-500',
  },
  {
    label: 'Academy / LMS',
    desc: 'Courses, exams & certificates',
    href: '/academy',
    color: 'from-violet-500 to-purple-500',
  },
  {
    label: 'Field Operations',
    desc: 'GPS check-in & mobile audits',
    href: '/admin/audits',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    label: 'AI Assistant',
    desc: 'Smart help & report drafts',
    href: '/assistant',
    color: 'from-amber-500 to-orange-500',
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />

      <section className="py-16 sm:py-24">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="badge-brand">Unified platform</span>
              <h2 className="section-heading mt-4">One system. Every stakeholder.</h2>
              <p className="section-subheading">
                Trainees, companies, factories, and internal staff work from the same connected
                system — audits, courses, certificates, and AI under one account.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/portal" className="btn-primary">
                  Client Portal
                </Link>
                <Link href="/academy" className="btn-secondary">
                  Explore Academy
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {platformTiles.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6"
                >
                  <div className={`mb-4 h-1 w-10 rounded-full bg-gradient-to-r ${item.color}`} />
                  <p className="font-bold text-slate-900 group-hover:text-brand-700 transition-colors">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                    Explore
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
