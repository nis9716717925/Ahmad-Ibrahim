'use client';

import { useState, useRef } from 'react';
import type { Audit, ChecklistItem, ChecklistResponse } from '@/lib/api';
import { api } from '@/lib/api';

type Props = {
  audit: Audit;
  onSubmit: (responses: Record<string, ChecklistResponse>) => Promise<void>;
  readOnly?: boolean;
};

export function ChecklistForm({ audit, onSubmit, readOnly }: Props) {
  const items = (audit.template?.items ?? []) as ChecklistItem[];
  const existing = (audit.responses ?? {}) as Record<string, ChecklistResponse>;
  const [responses, setResponses] = useState(existing);
  const [saving, setSaving] = useState(false);
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const sections = [...new Set(items.map((i) => i.section))];

  function update(id: string, patch: Partial<ChecklistResponse>) {
    setResponses((prev) => ({
      ...prev,
      [id]: { ...prev[id], answer: prev[id]?.answer ?? 'pass', ...patch },
    }));
  }

  async function handlePhotoUpload(itemId: string, file: File) {
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      const photos = [...(responses[itemId]?.photos ?? []), dataUrl];
      update(itemId, { photos });
      await api.addAuditEvidence(audit.id, {
        type: 'photo',
        fileName: file.name,
        fileUrl: dataUrl,
      });
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit() {
    setSaving(true);
    try {
      await onSubmit(responses);
    } finally {
      setSaving(false);
    }
  }

  const answered = items.filter((i) => responses[i.id]?.answer !== undefined).length;

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-wrap gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm sm:gap-4 sm:p-5">
        <span>Progress: <strong>{answered}/{items.length}</strong></span>
        {audit.score != null && (
          <span>Score: <strong>{Math.round(audit.score)}/{audit.maxScore}</strong></span>
        )}
      </div>

      {sections.map((section) => (
        <div key={section} className="card !p-5 sm:!p-6">
          <h3 className="text-lg font-semibold text-brand-800">{section}</h3>
          <div className="mt-4 space-y-6">
            {items.filter((i) => i.section === section).map((item) => {
              const resp = responses[item.id];
              return (
                <div key={item.id} className="rounded-lg border border-slate-100 p-4">
                  <p className="font-medium text-slate-900">{item.question}</p>
                  {item.weight && <p className="text-xs text-slate-500">Weight: {item.weight} pts</p>}

                  <div className="mt-3 flex flex-wrap gap-3">
                    {(['pass', 'fail', 'na'] as const).map((opt) => (
                      <label key={opt} className="flex items-center gap-2 text-sm capitalize">
                        <input
                          type="radio"
                          name={`q-${item.id}`}
                          checked={resp?.answer === opt}
                          disabled={readOnly}
                          onChange={() => update(item.id, { answer: opt })}
                        />
                        {opt === 'na' ? 'N/A' : opt}
                      </label>
                    ))}
                  </div>

                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="text-xs text-slate-500">Score (0–10)</label>
                      <input
                        type="range"
                        min={0}
                        max={10}
                        value={resp?.score ?? 10}
                        disabled={readOnly}
                        onChange={(e) => update(item.id, { score: Number(e.target.value) })}
                        className="w-full"
                      />
                      <span className="text-xs font-medium">{resp?.score ?? 10}/10</span>
                    </div>
                    <div>
                      <label className="text-xs text-slate-500">Risk Level</label>
                      <select
                        value={resp?.riskLevel ?? 'LOW'}
                        disabled={readOnly}
                        onChange={(e) => update(item.id, { riskLevel: e.target.value as ChecklistResponse['riskLevel'] })}
                        className="input-field !py-2 text-sm"
                      >
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                      </select>
                    </div>
                  </div>

                  <textarea
                    placeholder="Notes..."
                    className="input-field mt-3 !py-2 text-sm"
                    rows={2}
                    value={resp?.notes ?? ''}
                    disabled={readOnly}
                    onChange={(e) => update(item.id, { notes: e.target.value })}
                  />

                  {!readOnly && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => fileRefs.current[item.id]?.click()}
                        className="rounded border border-slate-200 px-3 py-1 text-xs text-slate-600 hover:bg-slate-50"
                      >
                        📷 Photo
                      </button>
                      <input
                        ref={(el) => { fileRefs.current[item.id] = el; }}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handlePhotoUpload(item.id, f);
                        }}
                      />
                      {(resp?.photos?.length ?? 0) > 0 && (
                        <span className="text-xs text-green-600">{resp!.photos!.length} photo(s)</span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {!readOnly && (
        <button type="button" onClick={handleSubmit} disabled={saving} className="btn-primary w-full sm:w-auto">
          {saving ? 'Submitting...' : 'Submit checklist for review'}
        </button>
      )}
    </div>
  );
}
