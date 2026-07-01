'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AdminNav } from '@/components/admin/AdminNav';
import { api, type Audit, type AuditDashboardStats } from '@/lib/api';

const KPI_CARDS: { key: keyof AuditDashboardStats; label: string; color: string }[] = [
  { key: 'total', label: 'Total Audits', color: 'bg-slate-100 text-slate-800' },
  { key: 'scheduled', label: 'Scheduled', color: 'bg-blue-50 text-blue-800' },
  { key: 'inProgress', label: 'In Progress', color: 'bg-amber-50 text-amber-800' },
  { key: 'completed', label: 'Completed', color: 'bg-green-50 text-green-800' },
  { key: 'overdue', label: 'Overdue', color: 'bg-red-50 text-red-800' },
  { key: 'highRiskFindings', label: 'High Risk Findings', color: 'bg-red-100 text-red-900' },
  { key: 'correctiveActions', label: 'Corrective Actions', color: 'bg-orange-50 text-orange-800' },
  { key: 'avgComplianceScore', label: 'Avg Compliance Score', color: 'bg-brand-50 text-brand-800' },
];

export default function AdminAuditsPage() {
  const [stats, setStats] = useState<AuditDashboardStats | null>(null);
  const [audits, setAudits] = useState<Audit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getAuditDashboard(), api.getAudits()])
      .then(([s, a]) => {
        setStats(s);
        setAudits(a);
      })
      .catch(() => {
        setStats(null);
        setAudits([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container-page py-6 sm:py-8">
        <AdminNav />
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Audit Dashboard</h1>
            <p className="text-slate-600">Monitor compliance, findings, and field inspections</p>
          </div>
          <Link href="/admin/audits/new" className="btn-primary w-full text-center sm:w-auto">
            Create New Audit
          </Link>
        </div>

        {loading ? (
          <p className="text-slate-500">Loading dashboard...</p>
        ) : (
          <>
            <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
              {KPI_CARDS.map(({ key, label, color }) => (
                <div key={key} className={`rounded-xl p-4 ${color}`}>
                  <p className="text-xs font-medium opacity-80 sm:text-sm">{label}</p>
                  <p className="mt-1 text-2xl font-bold sm:text-3xl">
                    {stats?.[key] ?? 0}
                    {key === 'avgComplianceScore' && '%'}
                  </p>
                </div>
              ))}
            </div>

            <div className="card overflow-hidden !p-0">
              <div className="border-b border-slate-100 px-4 py-3 sm:px-6">
                <h2 className="font-semibold text-slate-900">All Audits</h2>
              </div>
              {audits.length === 0 ? (
                <p className="p-6 text-center text-slate-500">No audits yet. Create one to get started.</p>
              ) : (
                <div className="table-wrap">
                  <table>
                    <thead className="bg-slate-50">
                      <tr>
                        <th>Reference</th>
                        <th>Type</th>
                        <th>Client</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Score</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {audits.map((a) => (
                        <tr key={a.id}>
                          <td className="font-medium text-slate-900">{a.referenceNumber}</td>
                          <td>{a.serviceType?.name}</td>
                          <td className="max-w-[120px] truncate sm:max-w-none">{a.organization?.name}</td>
                          <td>
                            <span className={`rounded px-2 py-0.5 text-xs font-medium ${
                              a.priority === 'HIGH' || a.priority === 'CRITICAL'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}>
                              {a.priority ?? 'MEDIUM'}
                            </span>
                          </td>
                          <td><span className="badge-brand">{a.status}</span></td>
                          <td>
                            {a.sectionScores?.Overall != null
                              ? `${a.sectionScores.Overall}%`
                              : a.score != null
                                ? `${Math.round((a.score / (a.maxScore || 1)) * 100)}%`
                                : '—'}
                          </td>
                          <td>
                            <Link href={`/admin/audits/${a.id}`} className="font-semibold text-brand-600 hover:underline">
                              Open →
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
