'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminNav } from '@/components/admin/AdminNav';
import { api } from '@/lib/api';

const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
const INDUSTRIES = ['Food Manufacturing', 'Hospitality', 'Healthcare', 'Retail', 'Industrial', 'Agriculture'];

export default function NewAuditPage() {
  const router = useRouter();
  const [orgs, setOrgs] = useState<{ id: string; name: string }[]>([]);
  const [users, setUsers] = useState<{ id: string; firstName: string; lastName: string }[]>([]);
  const [serviceTypes, setServiceTypes] = useState<
    { id: string; name: string; templates: { id: string; name: string }[] }[]
  >([]);
  const [form, setForm] = useState({
    organizationId: '',
    facilityId: '',
    serviceTypeId: '',
    templateId: '',
    auditorId: '',
    scheduledAt: '',
    scheduledTime: '09:00',
    priority: 'MEDIUM',
    industry: '',
    gpsRequired: false,
    contactPerson: '',
    siteLocation: '',
    status: 'SCHEDULED',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.getOrganizations().then(setOrgs);
    api.getServiceTypes().then(setServiceTypes);
    api.getUsers().then(setUsers).catch(() => {});
  }, []);

  const templates = serviceTypes.find((s) => s.id === form.serviceTypeId)?.templates ?? [];

  function set(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const audit = await api.createAudit({
        organizationId: form.organizationId,
        serviceTypeId: form.serviceTypeId,
        templateId: form.templateId,
        facilityId: form.facilityId || undefined,
        auditorId: form.auditorId || undefined,
        scheduledAt: form.scheduledAt || undefined,
        scheduledTime: form.scheduledTime,
        priority: form.priority,
        industry: form.industry || undefined,
        gpsRequired: form.gpsRequired,
        contactPerson: form.contactPerson || undefined,
        siteLocation: form.siteLocation || undefined,
        status: form.status,
      });
      router.push(`/admin/audits/${audit.id}`);
    } catch {
      alert('Failed to create audit. Make sure you are logged in.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container-page py-6 sm:py-8">
        <AdminNav />
        <h1 className="text-2xl font-bold">Create New Audit</h1>
        <p className="mt-1 text-slate-600">Schedule a field audit with full compliance checklist</p>

        <form onSubmit={handleCreate} className="card mt-6 max-w-2xl space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">Client / Company</label>
              <select required value={form.organizationId} onChange={(e) => set('organizationId', e.target.value)} className="input-field mt-1">
                <option value="">Select...</option>
                {orgs.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Audit Type</label>
              <select required value={form.serviceTypeId} onChange={(e) => { set('serviceTypeId', e.target.value); set('templateId', ''); }} className="input-field mt-1">
                <option value="">Select...</option>
                {serviceTypes.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Checklist Template</label>
              <select required value={form.templateId} onChange={(e) => set('templateId', e.target.value)} className="input-field mt-1">
                <option value="">Select...</option>
                {templates.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Auditor</label>
              <select value={form.auditorId} onChange={(e) => set('auditorId', e.target.value)} className="input-field mt-1">
                <option value="">Assign later...</option>
                {users.map((u) => <option key={u.id} value={u.id}>{u.firstName} {u.lastName}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Industry</label>
              <select value={form.industry} onChange={(e) => set('industry', e.target.value)} className="input-field mt-1">
                <option value="">Select...</option>
                {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Priority</label>
              <select value={form.priority} onChange={(e) => set('priority', e.target.value)} className="input-field mt-1">
                {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Date</label>
              <input type="date" value={form.scheduledAt} onChange={(e) => set('scheduledAt', e.target.value)} className="input-field mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Time</label>
              <input type="time" value={form.scheduledTime} onChange={(e) => set('scheduledTime', e.target.value)} className="input-field mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Contact Person</label>
              <input type="text" value={form.contactPerson} onChange={(e) => set('contactPerson', e.target.value)} className="input-field mt-1" placeholder="Site contact name" />
            </div>
            <div>
              <label className="block text-sm font-medium">Site Location</label>
              <input type="text" value={form.siteLocation} onChange={(e) => set('siteLocation', e.target.value)} className="input-field mt-1" placeholder="Address or zone" />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.gpsRequired} onChange={(e) => set('gpsRequired', e.target.checked)} />
            GPS Required (Yes)
          </label>
          <button type="submit" disabled={saving} className="btn-primary w-full sm:w-auto">
            {saving ? 'Creating...' : 'Create Audit'}
          </button>
        </form>
      </div>
    </div>
  );
}
