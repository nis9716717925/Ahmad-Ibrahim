'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AdminNav } from '@/components/admin/AdminNav';
import { api } from '@/lib/api';

export default function AdminDashboard() {
  const [health, setHealth] = useState<{ status: string; database: string } | null>(null);
  const [audits, setAudits] = useState<unknown[]>([]);
  const [crmStats, setCrmStats] = useState(0);
  const [courses, setCourses] = useState<unknown[]>([]);

  useEffect(() => {
    api.getHealth().then(setHealth).catch(() => setHealth({ status: 'error', database: 'unknown' }));
    const token = localStorage.getItem('token');
    if (token) {
      api.getAudits().then(setAudits).catch(() => setAudits([]));
      api.getCrmStats().then((s) => setCrmStats(s.reduce((a, x) => a + x._count.id, 0))).catch(() => {});
      api.getCourses().then(setCourses).catch(() => []);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container-page py-6 sm:py-8">
        <AdminNav />
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-slate-600">CRM · Audits · Academy · Users</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {[
            { label: 'API Status', value: health?.status ?? '...', sub: health?.database },
            { label: 'Audits', value: String(audits.length), sub: 'in system' },
            { label: 'CRM Leads', value: String(crmStats), sub: 'total contacts' },
            { label: 'Courses', value: String(courses.length), sub: 'published' },
          ].map((card) => (
            <div key={card.label} className="card">
              <p className="text-sm text-slate-500">{card.label}</p>
              <p className="mt-2 text-2xl font-bold text-slate-900 capitalize">{card.value}</p>
              <p className="text-xs text-slate-400">{card.sub}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 card">
          <h2 className="text-lg font-semibold text-slate-900">Quick actions</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/admin/audits/new" className="btn-primary !py-2 !px-4 text-sm">New audit</Link>
            <Link href="/admin/crm" className="btn-secondary !py-2 !px-4 text-sm">Add CRM lead</Link>
            <Link href="/admin/academy" className="btn-secondary !py-2 !px-4 text-sm">Schedule Meet session</Link>
            <Link href="/assistant" className="btn-secondary !py-2 !px-4 text-sm">AI Assistant</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
