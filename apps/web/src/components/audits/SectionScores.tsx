'use client';

type Props = {
  scores: Record<string, number>;
};

function CircleProgress({ label, value }: { label: string; value: number }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  const color = value >= 90 ? '#059669' : value >= 70 ? '#d97706' : '#dc2626';

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-24 w-24">
        <svg className="h-24 w-24 -rotate-90" viewBox="0 0 88 88">
          <circle cx="44" cy="44" r={r} fill="none" stroke="#e2e8f0" strokeWidth="8" />
          <circle
            cx="44"
            cy="44"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-slate-900">
          {value}%
        </span>
      </div>
      <span className="mt-2 text-center text-xs font-medium text-slate-600">{label}</span>
    </div>
  );
}

export function SectionScores({ scores }: Props) {
  const entries = Object.entries(scores).filter(([k]) => k !== 'Overall');
  const overall = scores['Overall'] ?? 0;

  if (entries.length === 0) {
    return (
      <p className="text-sm text-slate-500">Complete the checklist to see section scores.</p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
        {entries.map(([section, value]) => (
          <CircleProgress key={section} label={section} value={value} />
        ))}
      </div>
      <div className="rounded-xl border border-brand-200 bg-brand-50 p-4 text-center">
        <p className="text-sm font-medium text-brand-800">Overall Compliance</p>
        <p className="text-3xl font-extrabold text-brand-900">{overall}%</p>
        <div className="mx-auto mt-2 h-3 max-w-md overflow-hidden rounded-full bg-brand-100">
          <div
            className="h-full rounded-full bg-brand-600 transition-all"
            style={{ width: `${overall}%` }}
          />
        </div>
      </div>
    </div>
  );
}
