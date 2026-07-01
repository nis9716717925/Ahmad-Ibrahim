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

export const TRUSTED_LOGO_KEYS = [
  'emirates',
  'gulf',
  'medcare',
  'industrial',
  'freshchain',
  'premier',
  'national',
  'agripro',
] as const;

export const SERVICE_ITEMS: { icon: LucideIcon; key: string; href: string }[] = [
  { icon: Shield, key: 'foodSafety', href: '/services' },
  { icon: Droplets, key: 'waterSafety', href: '/services' },
  { icon: Bug, key: 'pestControl', href: '/services' },
  { icon: Sparkles, key: 'hygiene', href: '/services' },
  { icon: Building2, key: 'facility', href: '/services' },
  { icon: Award, key: 'iso', href: '/services' },
  { icon: GraduationCap, key: 'academy', href: '/academy' },
  { icon: Brain, key: 'ai', href: '/assistant' },
];

export const INDUSTRY_ITEMS: { icon: LucideIcon; key: string }[] = [
  { icon: Factory, key: 'manufacturing' },
  { icon: UtensilsCrossed, key: 'foodBeverage' },
  { icon: Hotel, key: 'hospitality' },
  { icon: Hospital, key: 'healthcare' },
  { icon: Landmark, key: 'government' },
  { icon: Building2, key: 'industrial' },
];

export const STATS = [
  { value: 1200, suffix: '+', key: 'audits' },
  { value: 98, suffix: '%', key: 'retention' },
  { value: 45, suffix: '+', key: 'countries' },
  { value: 15000, suffix: '+', key: 'trained' },
] as const;

export const PROCESS_STEPS = ['1', '2', '3', '4', '5'] as const;

export const WHY_US_KEYS = ['global', 'digital', 'ai', 'experts'] as const;

export const CERTIFICATIONS = ['ISO 17020', 'HACCP', 'ISO 22000', 'ISO 9001', 'GFSI', 'BRC', 'FSSC 22000', 'SASO'];

export const TESTIMONIAL_KEYS = ['1', '2', '3'] as const;

export const NEWS_KEYS = ['1', '2', '3'] as const;
