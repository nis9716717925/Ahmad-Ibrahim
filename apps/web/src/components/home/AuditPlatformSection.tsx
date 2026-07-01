import Link from 'next/link';
import { ArrowRight, ClipboardCheck, MapPin, BarChart3, FileWarning } from 'lucide-react';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/FadeIn';

const features = [
  { icon: ClipboardCheck, title: 'Digital Checklists', desc: 'Pass/Fail scoring, risk levels, photo evidence per item.' },
  { icon: MapPin, title: 'GPS Field Audits', desc: 'Verified check-in/out with mobile auditor app.' },
  { icon: BarChart3, title: 'Live Dashboards', desc: 'Section scores, KPIs, and compliance trends.' },
  { icon: FileWarning, title: 'CAPA Tracking', desc: 'Non-conformities with AI-suggested corrective actions.' },
];

export function AuditPlatformSection() {
  return (
    <section className="bg-surface-muted py-20 dark:bg-primary-950/50 sm:py-28">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeIn>
            <span className="badge-brand">Audit Platform</span>
            <h2 className="section-heading mt-4">Enterprise audit & compliance management</h2>
            <p className="section-subheading">
              From scheduling to certification — manage the entire audit lifecycle on one platform
              trusted by auditors, managers, and clients.
            </p>
            <Link href="/admin/audits" className="btn-primary mt-8 inline-flex">
              Open audit dashboard <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>

          <Stagger className="grid gap-4 sm:grid-cols-2">
            {features.map((f) => (
              <StaggerItem key={f.title}>
                <div className="h-full rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-primary-900">
                  <f.icon className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
                  <h3 className="mt-3 font-bold text-primary-900 dark:text-white">{f.title}</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{f.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
