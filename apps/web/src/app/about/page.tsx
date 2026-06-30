import { PageHeader } from '@/components/layout/PageHeader';

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Building trust through connected compliance"
        description="We deliver integrated audit, consulting, and training solutions for companies, factories, and facilities worldwide."
      />
      <div className="container-page py-12 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-6 text-base leading-relaxed text-slate-600 sm:text-lg">
          <p>
            Ahmad Ibrahim brings together field audits, corrective actions, client portals,
            academy learning, and AI-assisted reporting under one unified system.
          </p>
          <p>
            Our mission is to help organizations maintain the highest standards in food safety,
            facility compliance, and professional training — without the friction of disconnected tools.
          </p>
          <div className="grid gap-4 pt-4 sm:grid-cols-3">
            {[
              { title: 'Audit-first', desc: 'Configurable per service type' },
              { title: 'People-centered', desc: 'Portals for every role' },
              { title: 'AI-powered', desc: 'Smarter workflows' },
            ].map((item) => (
              <div key={item.title} className="card !p-5 text-center sm:!p-6">
                <p className="font-bold text-slate-900">{item.title}</p>
                <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
