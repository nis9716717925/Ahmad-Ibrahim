import type { Audit, AuditDashboardStats } from '@/lib/api';

export const DEMO_STATS: AuditDashboardStats = {
  total: 24,
  scheduled: 3,
  inProgress: 2,
  completed: 18,
  overdue: 1,
  highRiskFindings: 2,
  correctiveActions: 5,
  avgComplianceScore: 94,
};

export const DEMO_AUDITS: Audit[] = [
  {
    id: 'demo-1',
    referenceNumber: 'AUD-2026-00042',
    status: 'COMPLETED',
    scheduledAt: '2026-03-15T09:00:00.000Z',
    score: 94,
    sectionScores: { Overall: 94 },
    serviceType: { name: 'Food Safety Audit' },
    findings: [
      { id: 'f1', title: 'Cold storage temperature log incomplete', severity: 'HIGH', status: 'OPEN' },
    ],
  },
  {
    id: 'demo-2',
    referenceNumber: 'AUD-2026-00038',
    status: 'COMPLETED',
    scheduledAt: '2026-02-20T09:00:00.000Z',
    score: 97,
    sectionScores: { Overall: 97 },
    serviceType: { name: 'Hygiene Inspection' },
    findings: [],
  },
  {
    id: 'demo-3',
    referenceNumber: 'AUD-2026-00051',
    status: 'SCHEDULED',
    scheduledAt: '2026-04-10T10:00:00.000Z',
    serviceType: { name: 'Water Safety Audit' },
    findings: [
      { id: 'f2', title: 'Pest control documentation pending review', severity: 'MEDIUM', status: 'OPEN' },
    ],
  },
  {
    id: 'demo-4',
    referenceNumber: 'AUD-2026-00029',
    status: 'COMPLETED',
    scheduledAt: '2026-01-08T09:00:00.000Z',
    score: 91,
    sectionScores: { Overall: 91 },
    serviceType: { name: 'ISO 22000 Compliance' },
    findings: [],
  },
];

export const DEMO_ENROLLMENTS = [
  {
    course: { title: 'HACCP Fundamentals', slug: 'haccp-fundamentals' },
    certificate: { certificateNo: 'CERT-2026-00481' },
  },
  {
    course: { title: 'Food Hygiene Level 2', slug: 'food-hygiene-level-2' },
    certificate: { certificateNo: 'CERT-2026-00392' },
  },
];
