'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api, type Audit, type AuditDashboardStats } from '@/lib/api';

export default function PortalPage() {
  const [audits, setAudits] = useState<Audit[]>([]);
  const [stats, setStats] = useState<AuditDashboardStats | null>(null);
  const [enrollments, setEnrollments] = useState<{ course: { title: string; slug: string }; certificate?: { certificateNo: string } }[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    api.getAudits().then(setAudits).catch(() => {});
    api.getAuditDashboard().then(setStats).catch(() => {});
    api.getMyEnrollments().then(setEnrollments).catch(() => {});
  }, []);

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
        </div>
      </div>

      <div className="container-page py-8 sm:py-12">
        {stats && (
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
        )}

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
              {audits.length === 0 && <li className="text-slate-500">Sign in to view audits</li>}
            </ul>
          </section>

          <section className="card">
            <h2 className="font-semibold">Open Issues</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {openIssues.slice(0, 5).map((f, i) => (
                <li key={i} className="rounded border border-red-100 bg-red-50 p-2">
                  <span className="font-medium">{f.title}</span>
                  <span className="ml-2 text-xs text-red-600">{f.severity}</span>
                </li>
              ))}
              {openIssues.length === 0 && <li className="text-slate-500">No open issues</li>}
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
              {upcoming.length === 0 && <li className="text-slate-500">No upcoming audits</li>}
            </ul>
          </section>

          <section className="card">
            <h2 className="font-semibold">Certificates & Reports</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {enrollments.filter((e) => e.certificate).map((e, i) => (
                <li key={i}>
                  <Link href={`/academy/${e.course.slug}/certificate`} className="text-brand-700 hover:underline">
                    {e.course.title} — {e.certificate!.certificateNo}
                  </Link>
                </li>
              ))}
              {completed.map((a) => (
                <li key={a.id}>
                  <Link href={`/admin/audits/${a.id}`} className="text-brand-700 hover:underline">
                    Report: {a.referenceNumber}
                  </Link>
                </li>
              ))}
              {enrollments.filter((e) => e.certificate).length === 0 && completed.length === 0 && (
                <li className="text-slate-500">Complete audits or courses to see certificates</li>
              )}
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
