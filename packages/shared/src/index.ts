export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  STAFF = 'STAFF',
  AUDITOR = 'AUDITOR',
  COMPANY_ADMIN = 'COMPANY_ADMIN',
  FACILITY_MANAGER = 'FACILITY_MANAGER',
  TRAINEE = 'TRAINEE',
  CLIENT = 'CLIENT',
}

export enum AuditStatus {
  DRAFT = 'DRAFT',
  IN_PROGRESS = 'IN_PROGRESS',
  UNDER_REVIEW = 'UNDER_REVIEW',
  COMPLETED = 'COMPLETED',
  FOLLOW_UP = 'FOLLOW_UP',
}

export enum EnrollmentStatus {
  ENROLLED = 'ENROLLED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
  organizationId?: string;
}

export const SERVICE_CATEGORIES = [
  'food_safety',
  'pest_control',
  'water_safety',
  'facility_audit',
  'consulting',
  'other',
] as const;

export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number];

export * from './audit';
