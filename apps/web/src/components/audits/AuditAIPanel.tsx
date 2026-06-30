'use client';

import { useState } from 'react';
import { api } from '@/lib/api';

const AI_ACTIONS = [
  { id: 'summarize', label: 'Summarize Audit' },
  { id: 'generate-capa', label: 'Generate CAPA' },
  { id: 'suggest-actions', label: 'Suggest Corrective Actions' },
  { id: 'improve-notes', label: 'Improve Audit Notes' },
  { id: 'executive-summary', label: 'Generate Executive Summary' },
  { id: 'compare', label: 'Compare with Previous Audit' },
] as const;

type Props = {
  auditId: string;
  onActionComplete?: () => void;
};

export function AuditAIPanel({ auditId, onActionComplete }: Props) {
  const [loading, setLoading] = useState<string | null>(null);
  const [result, setResult] = useState('');

  async function run(action: string) {
    setLoading(action);
    try {
      const res = await api.runAuditAi(auditId, action);
      setResult(res.result);
      onActionComplete?.();
    } catch {
      setResult('AI action failed. Please try again.');
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {AI_ACTIONS.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => run(a.id)}
            disabled={!!loading}
            className="rounded-lg border border-brand-200 bg-brand-50 px-3 py-2 text-sm font-medium text-brand-800 hover:bg-brand-100 disabled:opacity-50"
          >
            {loading === a.id ? 'Processing...' : a.label}
          </button>
        ))}
      </div>
      {result && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="whitespace-pre-wrap text-sm text-slate-700">{result}</p>
        </div>
      )}
    </div>
  );
}
