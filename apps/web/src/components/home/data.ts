import {
  Shield,
  Droplets,
  Bug,
  Sparkles,
  Building2,
  Award,
  GraduationCap,
  Brain,
  Factory,
  Hotel,
  UtensilsCrossed,
  Hospital,
  Landmark,
  type LucideIcon,
} from 'lucide-react';

export const TRUSTED_LOGOS = [
  'Emirates Food Group',
  'Gulf Hospitality',
  'MedCare Hospitals',
  'Industrial Zone Co.',
  'FreshChain Logistics',
  'Premier Hotels',
  'National Health Authority',
  'AgriPro Manufacturing',
];

export const SERVICES: { icon: LucideIcon; title: string; desc: string; href: string }[] = [
  { icon: Shield, title: 'Food Safety Audits', desc: 'HACCP, ISO 22000, and end-to-end food safety compliance programs.', href: '/services' },
  { icon: Droplets, title: 'Water Safety', desc: 'Potable water testing, tank hygiene, chlorination, and regulatory reporting.', href: '/services' },
  { icon: Bug, title: 'Pest Control', desc: 'Integrated pest management audits with digital evidence and CAPA tracking.', href: '/services' },
  { icon: Sparkles, title: 'Hygiene Consulting', desc: 'Operational hygiene standards for kitchens, clinics, and public facilities.', href: '/services' },
  { icon: Building2, title: 'Facility Inspections', desc: 'Building, sanitation, and operational readiness assessments at scale.', href: '/services' },
  { icon: Award, title: 'ISO Compliance', desc: 'ISO 9001, 22000, and management system audits with executive reporting.', href: '/services' },
  { icon: GraduationCap, title: 'Training & Academy', desc: 'Certified courses, live sessions, exams, and digital credentialing.', href: '/academy' },
  { icon: Brain, title: 'AI Business Solutions', desc: 'Intelligent audit summaries, CAPA generation, and compliance intelligence.', href: '/assistant' },
];

export const INDUSTRIES: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Factory, title: 'Manufacturing', desc: 'Production plants, cold chain, and export-ready facilities.' },
  { icon: UtensilsCrossed, title: 'Food & Beverage', desc: 'Restaurants, central kitchens, and QSR chains.' },
  { icon: Hotel, title: 'Hospitality', desc: 'Hotels, resorts, and catering operations.' },
  { icon: Hospital, title: 'Healthcare', desc: 'Hospitals, clinics, and infection control programs.' },
  { icon: Landmark, title: 'Government', desc: 'Municipal inspections and public health initiatives.' },
  { icon: Building2, title: 'Industrial', desc: 'Warehouses, logistics hubs, and heavy industry sites.' },
];

export const STATS = [
  { value: 1200, suffix: '+', label: 'Audits Completed' },
  { value: 98, suffix: '%', label: 'Client Retention' },
  { value: 45, suffix: '+', label: 'Countries Served' },
  { value: 15000, suffix: '+', label: 'Professionals Trained' },
];

export const PROCESS = [
  { step: '01', title: 'Discovery & Scope', desc: 'Regulatory mapping, site profiling, and audit planning.' },
  { step: '02', title: 'On-Site Inspection', desc: 'GPS-verified field audits with photo evidence and checklists.' },
  { step: '03', title: 'Analysis & Scoring', desc: 'Section-level compliance scores and non-conformity classification.' },
  { step: '04', title: 'CAPA & Follow-Up', desc: 'AI-assisted corrective actions with accountable timelines.' },
  { step: '05', title: 'Certification', desc: 'Executive reports, certificates, and continuous monitoring.' },
];

export const CERTIFICATIONS = ['ISO 17020', 'HACCP', 'ISO 22000', 'ISO 9001', 'GFSI', 'BRC', 'FSSC 22000', 'SASO'];

export const TESTIMONIALS = [
  {
    quote: 'Ahmad Ibrahim transformed our multi-site audit program. Executive dashboards gave our board instant visibility into compliance risk.',
    name: 'Sarah Al-Mansoori',
    role: 'VP Quality Assurance',
    company: 'Emirates Food Group',
  },
  {
    quote: 'The AI assistant reduced our CAPA drafting time by 70%. Field teams love the mobile checklist with GPS check-in.',
    name: 'James Okonkwo',
    role: 'Operations Director',
    company: 'Gulf Hospitality',
  },
  {
    quote: 'Their academy platform certified 2,000 staff across 12 facilities in one quarter. World-class LMS experience.',
    name: 'Dr. Lina Hassan',
    role: 'Chief Medical Officer',
    company: 'MedCare Hospitals',
  },
];

export const NEWS = [
  { date: 'Mar 2026', title: 'AI-Powered Audit Summaries Now Available', tag: 'Product' },
  { date: 'Feb 2026', title: 'ISO 22000:2026 Readiness Guide for Food Manufacturers', tag: 'Insights' },
  { date: 'Jan 2026', title: 'Expanding Water Safety Programs Across the GCC', tag: 'Company' },
];

export const WHY_US = [
  { title: 'Global Standards', desc: 'Benchmarked against SGS, Bureau Veritas, and TÜV methodologies.' },
  { title: 'Digital-First Audits', desc: 'Real-time scoring, evidence capture, and client portals.' },
  { title: 'AI Intelligence', desc: 'Automated summaries, CAPA suggestions, and trend analysis.' },
  { title: 'Accredited Experts', desc: 'Senior auditors with deep sector and regulatory expertise.' },
];
