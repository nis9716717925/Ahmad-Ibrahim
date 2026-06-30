'use client';

import { useEffect, useState } from 'react';
import { AdminNav } from '@/components/admin/AdminNav';
import { api, type CrmContact } from '@/lib/api';

const STATUSES = ['lead', 'qualified', 'proposal', 'won', 'lost'];

export default function AdminCrmPage() {
  const [contacts, setContacts] = useState<CrmContact[]>([]);
  const [stats, setStats] = useState<{ status: string; _count: { id: number } }[]>([]);
  const [filter, setFilter] = useState('');
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', company: '', status: 'lead' });
  const [showForm, setShowForm] = useState(false);

  function load() {
    api.getCrmContacts(filter || undefined).then(setContacts);
    api.getCrmStats().then(setStats).catch(() => setStats([]));
  }

  useEffect(() => {
    load();
  }, [filter]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    await api.createCrmContact(form);
    setForm({ firstName: '', lastName: '', email: '', company: '', status: 'lead' });
    setShowForm(false);
    load();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container-page py-6 sm:py-8">
        <AdminNav />
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">CRM</h1>
            <p className="text-slate-600">Manage leads and contacts</p>
          </div>
          <button type="button" onClick={() => setShowForm(!showForm)} className="btn-primary w-full sm:w-auto">
            {showForm ? 'Cancel' : 'Add lead'}
          </button>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {STATUSES.map((s) => {
            const count = stats.find((x) => x.status === s)?._count.id ?? 0;
            return (
              <button
                key={s}
                type="button"
                onClick={() => setFilter(filter === s ? '' : s)}
                className={`rounded-xl border p-4 text-left ${
                  filter === s ? 'border-brand-500 bg-brand-50' : 'border-slate-200 bg-white'
                }`}
              >
                <p className="text-2xl font-bold">{count}</p>
                <p className="text-sm capitalize text-slate-600">{s}</p>
              </button>
            );
          })}
        </div>

        {showForm && (
          <form onSubmit={handleCreate} className="card mb-6 grid gap-4 sm:grid-cols-2">
            <input required placeholder="First name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="input-field" />
            <input required placeholder="Last name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="input-field" />
            <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" />
            <input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="input-field" />
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="input-field sm:col-span-2">
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <button type="submit" className="btn-primary sm:col-span-2">Save lead</button>
          </form>
        )}

        <div className="card overflow-hidden !p-0">
          <div className="table-wrap">
            <table>
              <thead className="bg-slate-50">
                <tr>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              {contacts.map((c) => (
                <tr key={c.id}>
                  <td className="font-medium">{c.firstName} {c.lastName}</td>
                  <td>{c.company ?? '—'}</td>
                  <td className="max-w-[160px] truncate">{c.email ?? '—'}</td>
                  <td>
                    <select
                      value={c.status}
                      onChange={(e) => api.updateCrmContact(c.id, { status: e.target.value }).then(load)}
                      className="input-field !py-1.5 !text-xs capitalize"
                    >
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => api.deleteCrmContact(c.id).then(load)}
                      className="text-sm font-medium text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
