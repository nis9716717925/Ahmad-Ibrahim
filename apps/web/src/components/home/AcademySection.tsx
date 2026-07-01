import Link from 'next/link';
import { ArrowRight, BookOpen, Video, Award, Users } from 'lucide-react';
import { FadeIn } from '@/components/ui/FadeIn';

export function AcademySection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-premium dark:border-slate-700 dark:bg-primary-900">
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-secondary-100 blur-3xl dark:bg-secondary-600/10" />
          <div className="grid lg:grid-cols-2">
            <FadeIn className="p-8 sm:p-12 lg:p-14">
              <span className="badge-brand">Academy & LMS</span>
              <h2 className="section-heading mt-4">Train, certify, and upskill your workforce</h2>
              <p className="section-subheading">
                A full learning management system with courses, live Google Meet sessions,
                proctored exams, and downloadable certificates.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { icon: BookOpen, label: 'Self-paced courses' },
                  { icon: Video, label: 'Live sessions' },
                  { icon: Award, label: 'Digital certificates' },
                  { icon: Users, label: 'Team enrollment' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                    <item.icon className="h-4 w-4 text-secondary-600" />
                    {item.label}
                  </div>
                ))}
              </div>
              <Link href="/academy" className="btn-primary mt-8 inline-flex">
                Browse Academy <ArrowRight className="h-4 w-4" />
              </Link>
            </FadeIn>
            <FadeIn delay={0.15} direction="left" className="relative min-h-[280px] bg-gradient-to-br from-secondary-600 to-primary-900 p-8 sm:min-h-0 lg:p-14">
              <div className="flex h-full flex-col justify-center">
                <p className="text-sm font-semibold uppercase tracking-wider text-accent-300">Featured course</p>
                <p className="mt-3 text-2xl font-bold text-white sm:text-3xl">HACCP Fundamentals</p>
                <p className="mt-2 text-sm text-white/70">480 min · Exam included · Certificate on pass</p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/20">
                    <div className="h-full w-3/4 rounded-full bg-accent-400" />
                  </div>
                  <span className="text-sm font-bold text-white">75%</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
