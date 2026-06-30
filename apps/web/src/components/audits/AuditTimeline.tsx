'use client';

import type { AuditTimelineEvent } from '@/lib/api';

const DEFAULT_EVENTS = [
  'Audit Scheduled',
  'Auditor Checked In (GPS)',
  'Inspection Started',
  'Photos Captured',
  'Checklist Completed',
  'AI Summary Generated',
  'Manager Review',
  'Client Approved',
  'Certificate Issued',
];

type Props = {
  events: AuditTimelineEvent[];
};

export function AuditTimeline({ events }: Props) {
  const eventMap = new Map(events.map((e) => [e.event, e]));

  return (
    <div className="relative pl-6">
      <div className="absolute bottom-2 left-[11px] top-2 w-0.5 bg-slate-200" />
      <ul className="space-y-6">
        {DEFAULT_EVENTS.map((label) => {
          const evt = eventMap.get(label);
          const done = !!evt;
          return (
            <li key={label} className="relative">
              <span
                className={`absolute -left-6 top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                  done ? 'border-brand-600 bg-brand-600' : 'border-slate-300 bg-white'
                }`}
              >
                {done && (
                  <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </span>
              <p className={`font-medium ${done ? 'text-slate-900' : 'text-slate-400'}`}>{label}</p>
              {evt?.detail && <p className="text-xs text-slate-500">{evt.detail}</p>}
              {evt?.createdAt && (
                <p className="text-xs text-slate-400">{new Date(evt.createdAt).toLocaleString()}</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
