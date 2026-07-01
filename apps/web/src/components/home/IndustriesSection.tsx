import { INDUSTRIES } from './data';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/FadeIn';

export function IndustriesSection() {
  return (
    <section id="industries" className="py-20 sm:py-28">
      <div className="container-page">
        <FadeIn className="max-w-2xl">
          <span className="badge-brand">Industries</span>
          <h2 className="section-heading mt-4">Sector expertise that regulators trust</h2>
          <p className="section-subheading">
            Tailored compliance frameworks for every environment — from sterile hospitals to high-volume food factories.
          </p>
        </FadeIn>

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind) => (
            <StaggerItem key={ind.title}>
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-card dark:border-slate-700 dark:bg-primary-900">
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-secondary-50 opacity-0 transition-opacity group-hover:opacity-100 dark:bg-secondary-600/10" />
                <ind.icon className="relative h-8 w-8 text-secondary-600 dark:text-secondary-400" />
                <h3 className="relative mt-4 text-lg font-bold text-primary-900 dark:text-white">{ind.title}</h3>
                <p className="relative mt-2 text-sm text-slate-500 dark:text-slate-400">{ind.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
