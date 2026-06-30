export const AUDIT_TYPES = [
  'Food Safety Audit',
  'Water Safety Audit',
  'Pest Control Audit',
  'Facility Inspection',
  'GMP Audit',
  'HACCP Audit',
  'ISO 9001 Audit',
  'ISO 22000 Audit',
  'Fire Safety Audit',
  'Environmental Audit',
  'Hygiene Inspection',
  'Internal Compliance Audit',
] as const;

export type ChecklistItemTemplate = {
  id: string;
  section: string;
  question: string;
  weight?: number;
};

export const FULL_AUDIT_CHECKLIST: ChecklistItemTemplate[] = [
  // General Information
  { id: 'gi-1', section: 'General Information', question: 'Company Name verified', weight: 5 },
  { id: 'gi-2', section: 'General Information', question: 'Facility confirmed', weight: 5 },
  { id: 'gi-3', section: 'General Information', question: 'Contact Person available', weight: 5 },
  { id: 'gi-4', section: 'General Information', question: 'Audit Date documented', weight: 5 },
  // Building & Facility
  { id: 'bf-1', section: 'Building & Facility', question: 'Walls clean', weight: 8 },
  { id: 'bf-2', section: 'Building & Facility', question: 'Floors maintained', weight: 8 },
  { id: 'bf-3', section: 'Building & Facility', question: 'Ceiling condition', weight: 8 },
  { id: 'bf-4', section: 'Building & Facility', question: 'Lighting adequate', weight: 8 },
  { id: 'bf-5', section: 'Building & Facility', question: 'Ventilation adequate', weight: 8 },
  { id: 'bf-6', section: 'Building & Facility', question: 'Drainage proper', weight: 8 },
  { id: 'bf-7', section: 'Building & Facility', question: 'Waste management compliant', weight: 10 },
  // Food Safety
  { id: 'fs-1', section: 'Food Safety', question: 'Storage temperature monitored', weight: 10 },
  { id: 'fs-2', section: 'Food Safety', question: 'Cold chain maintained', weight: 10 },
  { id: 'fs-3', section: 'Food Safety', question: 'Food labelling correct', weight: 8 },
  { id: 'fs-4', section: 'Food Safety', question: 'Expiry dates checked', weight: 10 },
  { id: 'fs-5', section: 'Food Safety', question: 'Cross contamination prevented', weight: 10 },
  { id: 'fs-6', section: 'Food Safety', question: 'Cleaning records up to date', weight: 8 },
  // Pest Control
  { id: 'pc-1', section: 'Pest Control', question: 'No pest activity observed', weight: 10 },
  { id: 'pc-2', section: 'Pest Control', question: 'Bait stations in place', weight: 8 },
  { id: 'pc-3', section: 'Pest Control', question: 'Rodent control effective', weight: 8 },
  { id: 'pc-4', section: 'Pest Control', question: 'Insect monitoring active', weight: 8 },
  { id: 'pc-5', section: 'Pest Control', question: 'Service records current', weight: 8 },
  // Water Safety
  { id: 'ws-1', section: 'Water Safety', question: 'Water testing completed', weight: 10 },
  { id: 'ws-2', section: 'Water Safety', question: 'Tank cleaning schedule met', weight: 8 },
  { id: 'ws-3', section: 'Water Safety', question: 'Chlorination levels correct', weight: 10 },
  { id: 'ws-4', section: 'Water Safety', question: 'Water reports available', weight: 8 },
  // Staff
  { id: 'st-1', section: 'Staff', question: 'PPE used correctly', weight: 10 },
  { id: 'st-2', section: 'Staff', question: 'Training records current', weight: 8 },
  { id: 'st-3', section: 'Staff', question: 'Medical certificates valid', weight: 8 },
  { id: 'st-4', section: 'Staff', question: 'Hygiene compliance observed', weight: 10 },
];

export const AUDIT_SECTIONS = [
  'General Information',
  'Building & Facility',
  'Food Safety',
  'Pest Control',
  'Water Safety',
  'Staff',
] as const;

export type ChecklistResponse = {
  answer: 'pass' | 'fail' | 'na';
  score: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  notes?: string;
  photos?: string[];
  documents?: string[];
};
