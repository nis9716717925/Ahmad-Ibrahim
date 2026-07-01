'use client';

import { useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { DEMO_AUDITS, DEMO_ENROLLMENTS, DEMO_STATS } from '@/lib/portal-demo';

export default function PortalPage() {
  const t = useTranslations('checkout');
  const [membership, setMembership] = useState<string | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('lastOrder');
    if (raw) {
      try {
        const order = JSON.parse(raw) as { planId: string };
        setMembership(order.planId);
      } catch {
        setMembership('professional');
      }
    } else {
      setMembership('professional');
    }
  }, []);

  const audits = DEMO_AUDITS;
  const stats = DEMO_STATS;
  const enrollments = DEMO_ENROLLMENTS;

  const openIssues = audits.flatMap((a) => (a.findings ?? []).filter((f) => f.status === 'OPEN'));
  const upcoming = audits.filter((a) => ['SCHEDULED', 'DRAFT'].includes(a.status));
  const completed = audits.filter((a) => a.status === 'COMPLETED');

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="container-page py-8 sm:py-10">
          <span className="badge-brand">Client Portal</span>
          <h1 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">Your Compliance Dashboard</h1>
          <p className="mt-2 text-slate-600">Audit history, compliance scores, issues, and certificates.</p>
          {membership && (
            <p className="mt-3 inline-flex items-center rounded-full bg-secondary-50 px-3 py-1 text-xs font-semibold text-secondary-700">
              {t(`planNames.${membership}`)} {t('plan')}
            </p>
          )}
        </div>
      </div>

      <div className="container-page py-8 sm:py-12">
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="card text-center">
            <p className="text-2xl font-bold text-brand-700">{stats.avgComplianceScore}%</p>
            <p className="text-sm text-slate-500">Compliance Score</p>
          </div>
          <div className="card text-center">
            <p className="text-2xl font-bold text-red-600">{openIssues.length}</p>
            <p className="text-sm text-slate-500">Open Issues</p>
          </div>
          <div className="card text-center">
            <p className="text-2xl font-bold text-green-600">{completed.length}</p>
            <p className="text-sm text-slate-500">Completed Audits</p>
          </div>
          <div className="card text-center">
            <p className="text-2xl font-bold text-blue-600">{upcoming.length}</p>
            <p className="text-sm text-slate-500">Upcoming Audits</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="card">
            <h2 className="font-semibold">Audit History</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {audits.map((a) => (
                <li key={a.id} className="flex justify-between border-b border-slate-100 pb-2">
                  <div>
                    <span className="font-medium">{a.referenceNumber}</span>
                    <p className="text-xs text-slate-500">{a.serviceType?.name}</p>
                  </div>
                  <span className="text-slate-500">
                    {a.sectionScores?.Overall != null ? `${a.sectionScores.Overall}%` : a.status}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="card">
            <h2 className="font-semibold">Open Issues</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {openIssues.map((f) => (
                <li key={f.id} className="rounded border border-red-100 bg-red-50 p-2">
                  <span className="font-medium">{f.title}</span>
                  <span className="ms-2 text-xs text-red-600">{f.severity}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="card">
            <h2 className="font-semibold">Upcoming Audits</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {upcoming.map((a) => (
                <li key={a.id} className="flex justify-between">
                  <span>{a.referenceNumber}</span>
                  <span className="text-slate-500">
                    {a.scheduledAt ? new Date(a.scheduledAt).toLocaleDateString() : 'TBD'}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="card">
            <h2 className="font-semibold">Certificates & Reports</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {enrollments.filter((e) => e.certificate).map((e) => (
                <li key={e.certificate!.certificateNo}>
                  <span className="text-brand-700">
                    {e.course.title} — {e.certificate!.certificateNo}
                  </span>
                </li>
              ))}
              {completed.map((a) => (
                <li key={a.id}>
                  <span className="text-brand-700">Report: {a.referenceNumber}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <Link href="/assistant" className="card-hover mt-8 block text-center">
          <p className="font-semibold text-brand-900">Need help? Ask the AI Assistant</p>
          <p className="text-sm text-brand-700">Get answers about audits, training, and compliance</p>
        </Link>
      </div>
    </div>
  );
}
