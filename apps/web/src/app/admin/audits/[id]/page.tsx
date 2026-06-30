'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AdminNav } from '@/components/admin/AdminNav';
import { ChecklistForm } from '@/components/audits/ChecklistForm';
import { SectionScores } from '@/components/audits/SectionScores';
import { AuditTimeline } from '@/components/audits/AuditTimeline';
import { AuditAIPanel } from '@/components/audits/AuditAIPanel';
import { api, type Audit, type ChecklistResponse } from '@/lib/api';

const TABS = ['Checklist', 'Scoring', 'Findings', 'CAPA', 'Evidence', 'Timeline', 'AI', 'Reports'] as const;
type Tab = (typeof TABS)[number];

export default function AuditDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [audit, setAudit] = useState<Audit | null>(null);
  const [tab, setTab] = useState<Tab>('Checklist');
  const [message, setMessage] = useState('');
  const [aiResult, setAiResult] = useState('');

  function load() {
    api.getAudit(id).then(setAudit).catch(() => setAudit(null));
  }

  useEffect(() => { load(); }, [id]);

  async function handleSubmit(responses: Record<string, ChecklistResponse>) {
    const updated = await api.submitAuditResponses(id, responses);
    setAudit(updated);
    setMessage('Checklist submitted for review.');
    setTab('Scoring');
  }

  async function completeAudit() {
    await api.updateAudit(id, { status: 'COMPLETED' });
    load();
    setMessage('Audit marked as completed.');
  }

  async function previewReport() {
    const report = await api.getAuditReport(id);
    setAiResult(JSON.stringify(report, null, 2));
    setTab('Reports');
  }

  if (!audit) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="container-page py-8">
          <AdminNav />
          <p className="text-slate-500">Loading audit...</p>
        </div>
      </div>
    );
  }

  const readOnly = ['COMPLETED', 'UNDER_REVIEW'].includes(audit.status);
  const scores = audit.sectionScores ?? {};

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container-page py-6 sm:py-8">
        <AdminNav />
        <button type="button" onClick={() => router.back()} className="mb-4 text-sm text-brand-700 hover:underline">
          ← Back to dashboard
        </button>

        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{audit.referenceNumber}</h1>
            <p className="text-slate-600">
              {audit.serviceType?.name} · {audit.organization?.name}
              {audit.facility && ` · ${audit.facility.name}`}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="badge-brand">{audit.status}</span>
              {audit.priority && (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">{audit.priority}</span>
              )}
              {audit.gpsRequired && (
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">GPS Required</span>
              )}
            </div>
          </div>
          {scores.Overall != null && (
            <div className="rounded-xl border border-brand-200 bg-white px-6 py-3 text-center">
              <p className="text-xs text-slate-500">Overall</p>
              <p className="text-3xl font-bold text-brand-700">{scores.Overall}%</p>
            </div>
          )}
        </div>

        {message && <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-800">{message}</div>}

        <div className="mb-6 flex gap-1 overflow-x-auto border-b border-slate-200 pb-px">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`whitespace-nowrap px-4 py-2 text-sm font-medium ${
                tab === t ? 'border-b-2 border-brand-600 text-brand-700' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 'Checklist' && (
          <ChecklistForm audit={audit} onSubmit={handleSubmit} readOnly={readOnly} />
        )}

        {tab === 'Scoring' && <SectionScores scores={scores} />}

        {tab === 'Findings' && (
          <div className="space-y-4">
            {(audit.findings ?? []).length === 0 ? (
              <p className="text-slate-500">No non-conformities recorded.</p>
            ) : (
              audit.findings!.map((f) => (
                <div key={f.id} className="card">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="font-semibold">{f.title}</h3>
                    <span className={`rounded px-2 py-0.5 text-xs font-medium ${
                      f.severity === 'HIGH' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                    }`}>{f.severity}</span>
                  </div>
                  {f.description && <p className="mt-2 text-sm text-slate-600">{f.description}</p>}
                  <div className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
                    <span>Responsible: {f.responsiblePerson ?? '—'}</span>
                    <span>Due: {f.dueDate ? new Date(f.dueDate).toLocaleDateString() : '—'}</span>
                    <span>Status: {f.status}</span>
                  </div>
                  {f.aiSuggestion && (
                    <p className="mt-3 rounded bg-brand-50 p-2 text-xs text-brand-800">
                      AI Suggestion: {f.aiSuggestion}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {tab === 'CAPA' && (
          <div className="space-y-4">
            {(audit.correctiveActions ?? []).map((ca) => (
              <div key={ca.id} className="card">
                <h3 className="font-semibold">{ca.title}</h3>
                <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
                  <div><span className="text-slate-500">Issue:</span> {ca.description ?? ca.title}</div>
                  <div><span className="text-slate-500">Root Cause:</span> {ca.rootCause ?? '—'}</div>
                  <div><span className="text-slate-500">Corrective Action:</span> {ca.correctiveAction ?? '—'}</div>
                  <div><span className="text-slate-500">Preventive Action:</span> {ca.preventiveAction ?? '—'}</div>
                  <div><span className="text-slate-500">Assigned To:</span> {ca.assignedTo ?? '—'}</div>
                  <div><span className="text-slate-500">Due Date:</span> {ca.dueDate ? new Date(ca.dueDate).toLocaleDateString() : '—'}</div>
                </div>
                <select
                  value={ca.status}
                  onChange={(e) => api.updateCorrectiveAction(ca.id, { status: e.target.value }).then(load)}
                  className="mt-3 rounded border border-slate-300 text-xs"
                >
                  {['OPEN', 'IN_PROGRESS', 'RESOLVED', 'VERIFIED'].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}

        {tab === 'Evidence' && (
          <div className="space-y-3">
            {(audit.evidence ?? []).length === 0 ? (
              <p className="text-slate-500">No evidence uploaded yet. Add photos from the checklist.</p>
            ) : (
              audit.evidence!.map((e) => (
                <div key={e.id} className="flex items-center gap-3 rounded-lg border border-slate-100 p-3 text-sm">
                  <span>{e.type === 'photo' ? '📷' : e.type === 'video' ? '🎥' : '📄'}</span>
                  <div>
                    <p className="font-medium">{e.fileName ?? e.type}</p>
                    <p className="text-xs text-slate-500">{new Date(e.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {tab === 'Timeline' && (
          <AuditTimeline events={audit.timelineEvents ?? []} />
        )}

        {tab === 'AI' && (
          <AuditAIPanel auditId={id} onActionComplete={load} />
        )}

        {tab === 'Reports' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={previewReport} className="btn-secondary text-sm">Preview Report</button>
              <button type="button" onClick={() => window.print()} className="btn-secondary text-sm">Download PDF</button>
              <button type="button" className="btn-secondary text-sm" onClick={() => alert('Email report — configure SMTP in production')}>Email Report</button>
              <button type="button" className="btn-secondary text-sm" onClick={() => alert('Share link copied')}>Share with Client</button>
              <button type="button" className="btn-secondary text-sm" onClick={() => alert('Certificate generation — available after completion')}>Generate Certificate</button>
            </div>
            {aiResult && (
              <pre className="overflow-auto rounded-lg bg-slate-900 p-4 text-xs text-green-400">{aiResult}</pre>
            )}
            {audit.aiSummary && (
              <div className="card">
                <h3 className="font-semibold">AI Summary</h3>
                <p className="mt-2 text-sm text-slate-600">{audit.aiSummary}</p>
              </div>
            )}
          </div>
        )}

        {audit.status === 'UNDER_REVIEW' && (
          <button type="button" onClick={completeAudit} className="btn-primary mt-8">
            Approve & complete audit
          </button>
        )}
      </div>
    </div>
  );
}
