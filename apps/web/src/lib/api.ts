function resolveApiUrl() {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '');
  }
  if (typeof window !== 'undefined') {
    const { hostname, origin } = window.location;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:4000';
    }
    return origin;
  }
  return process.env.API_URL?.replace(/\/$/, '') ?? 'http://localhost:4000';
}

export function getApiUrl() {
  return resolveApiUrl();
}

function getToken() {
  return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
}

export class ApiError extends Error {
  constructor(message: string, public readonly isNetworkError = false) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  let res: Response;
  try {
    res = await fetch(`${getApiUrl()}/api/v1${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });
  } catch {
    const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    throw new ApiError(
      isLocal
        ? `Cannot reach the API at ${getApiUrl()}. Start it with: cd apps/api && npm run dev`
        : 'Cannot reach the API. Set API_URL in Vercel (your deployed backend URL) and redeploy.',
      true,
    );
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new ApiError((err as { message?: string }).message ?? `API error: ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export type ChecklistResponse = {
  answer: 'pass' | 'fail' | 'na' | boolean | number;
  score?: number;
  riskLevel?: 'LOW' | 'MEDIUM' | 'HIGH';
  notes?: string;
  photos?: string[];
  documents?: string[];
};

export type Audit = {
  id: string;
  referenceNumber: string;
  status: string;
  priority?: string;
  industry?: string;
  gpsRequired?: boolean;
  contactPerson?: string;
  siteLocation?: string;
  scheduledAt?: string;
  scheduledTime?: string;
  score?: number;
  maxScore?: number;
  notes?: string;
  aiSummary?: string;
  sectionScores?: Record<string, number>;
  responses?: Record<string, ChecklistResponse>;
  serviceType?: { name: string };
  organization?: { id: string; name: string };
  facility?: { id: string; name: string };
  auditor?: { id: string; firstName: string; lastName: string };
  template?: { items: ChecklistItem[]; scoringRules?: { passThreshold?: number } };
  correctiveActions?: CorrectiveAction[];
  findings?: AuditFinding[];
  evidence?: AuditEvidence[];
  timelineEvents?: AuditTimelineEvent[];
  fieldCheckIns?: { latitude: number; longitude: number; type?: string; createdAt: string }[];
};

export type AuditDashboardStats = {
  total: number;
  scheduled: number;
  inProgress: number;
  completed: number;
  overdue: number;
  highRiskFindings: number;
  correctiveActions: number;
  avgComplianceScore: number;
};

export type AuditFinding = {
  id: string;
  title: string;
  description?: string;
  severity: string;
  responsiblePerson?: string;
  dueDate?: string;
  status: string;
  aiSuggestion?: string;
  checklistItemId?: string;
};

export type AuditEvidence = {
  id: string;
  type: string;
  fileName?: string;
  fileUrl?: string;
  note?: string;
  latitude?: number;
  longitude?: number;
  createdAt: string;
};

export type AuditTimelineEvent = {
  id: string;
  event: string;
  detail?: string;
  createdAt: string;
};

export type ChecklistItem = {
  id: string;
  section: string;
  question: string;
  weight?: number;
};

export type CorrectiveAction = {
  id: string;
  title: string;
  description?: string;
  rootCause?: string;
  correctiveAction?: string;
  preventiveAction?: string;
  assignedTo?: string;
  severity?: string;
  aiSuggestion?: string;
  status: string;
  dueDate?: string;
};

export type CrmContact = {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  company?: string;
  status: string;
  notes?: string;
  source?: string;
};

export type Course = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  duration?: number;
  modules?: { id: string; title: string; lessons: { id: string; title: string; duration?: number }[] }[];
  exams?: { id: string; title: string; passingScore: number }[];
};

export type Exam = {
  id: string;
  title: string;
  passingScore: number;
  timeLimitMin?: number;
  questions: { id: string; question: string; options: string[] }[];
};

export type LiveSession = {
  id: string;
  title: string;
  description?: string;
  meetLink: string;
  meetCode?: string;
  scheduledAt: string;
  durationMin: number;
  course?: { title: string; slug: string };
};

export const api = {
  login: (email: string, password: string) =>
    request<{ accessToken: string; user: { id: string; email: string; role: string; firstName: string; lastName: string } }>(
      '/auth/login',
      { method: 'POST', body: JSON.stringify({ email, password }) },
    ),

  getHealth: () => request<{ status: string; database: string }>('/health'),

  getUsers: () => request<{ id: string; email: string; firstName: string; lastName: string; role: string }[]>('/users'),

  getOrganizations: () => request<{ id: string; name: string }[]>('/organizations'),

  getServiceTypes: () =>
    request<{ id: string; name: string; templates: { id: string; name: string }[] }[]>('/audits/service-types'),

  getAuditDashboard: (organizationId?: string) =>
    request<AuditDashboardStats>(`/audits/dashboard${organizationId ? `?organizationId=${organizationId}` : ''}`),

  getAudits: (params?: { organizationId?: string; auditorId?: string; today?: boolean }) => {
    const q = new URLSearchParams();
    if (params?.organizationId) q.set('organizationId', params.organizationId);
    if (params?.auditorId) q.set('auditorId', params.auditorId);
    if (params?.today) q.set('today', 'true');
    const qs = q.toString();
    return request<Audit[]>(`/audits${qs ? `?${qs}` : ''}`);
  },

  getAudit: (id: string) => request<Audit>(`/audits/${id}`),

  getAuditReport: (id: string) => request<Record<string, unknown>>(`/audits/${id}/report`),

  createAudit: (data: {
    serviceTypeId: string;
    templateId: string;
    organizationId: string;
    facilityId?: string;
    auditorId?: string;
    scheduledAt?: string;
    scheduledTime?: string;
    priority?: string;
    industry?: string;
    gpsRequired?: boolean;
    contactPerson?: string;
    siteLocation?: string;
    status?: string;
  }) => request<Audit>('/audits', { method: 'POST', body: JSON.stringify(data) }),

  updateAudit: (id: string, data: { status?: string; notes?: string }) =>
    request<Audit>(`/audits/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),

  submitAuditResponses: (id: string, responses: Record<string, ChecklistResponse>) =>
    request<Audit>(`/audits/${id}/responses`, { method: 'POST', body: JSON.stringify({ responses }) }),

  addAuditEvidence: (auditId: string, data: Partial<AuditEvidence> & { type: string }) =>
    request<AuditEvidence>(`/audits/${auditId}/evidence`, { method: 'POST', body: JSON.stringify(data) }),

  createFinding: (auditId: string, data: Partial<AuditFinding> & { title: string }) =>
    request<AuditFinding>(`/audits/${auditId}/findings`, { method: 'POST', body: JSON.stringify(data) }),

  updateFinding: (findingId: string, data: Partial<AuditFinding>) =>
    request<AuditFinding>(`/audits/findings/${findingId}`, { method: 'PATCH', body: JSON.stringify(data) }),

  runAuditAi: (auditId: string, action: string) =>
    request<{ action: string; result: string }>(`/audits/${auditId}/ai/${action}`, { method: 'POST' }),

  createCorrectiveAction: (auditId: string, data: Partial<CorrectiveAction> & { title: string }) =>
    request<CorrectiveAction>(`/audits/${auditId}/corrective-actions`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateCorrectiveAction: (actionId: string, data: Partial<CorrectiveAction> & { status?: string }) =>
    request<CorrectiveAction>(`/audits/corrective-actions/${actionId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  getCrmContacts: (status?: string) =>
    request<CrmContact[]>(`/crm${status ? `?status=${status}` : ''}`),

  getCrmStats: () => request<{ status: string; _count: { id: number } }[]>('/crm/stats'),

  createCrmContact: (data: Partial<CrmContact>) =>
    request<CrmContact>('/crm', { method: 'POST', body: JSON.stringify(data) }),

  updateCrmContact: (id: string, data: Partial<CrmContact>) =>
    request<CrmContact>(`/crm/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),

  deleteCrmContact: (id: string) => request<void>(`/crm/${id}`, { method: 'DELETE' }),

  getCourses: () => request<Course[]>('/courses'),

  getCourse: (slug: string) => request<Course>(`/courses/${slug}`),

  getCoursesAdmin: () => request<Course[]>('/courses/admin/all'),

  getExamsByCourse: (courseId: string) =>
    request<{ id: string; title: string; passingScore: number }[]>(`/exams/course/${courseId}`),

  getExam: (id: string) => request<Exam>(`/exams/${id}`),

  enrollCourse: (courseId: string) =>
    request('/exams/enroll', { method: 'POST', body: JSON.stringify({ courseId }) }),

  getMyEnrollments: () =>
    request<{ id: string; course: Course; status: string; certificate?: { id: string; certificateNo: string } }[]>(
      '/exams/enrollments/me',
    ),

  submitExam: (examId: string, answers: Record<string, number>) =>
    request<{ score: number; passed: boolean; certificate?: { id: string; certificateNo: string } }>(
      `/exams/${examId}/submit`,
      { method: 'POST', body: JSON.stringify({ answers }) },
    ),

  createExam: (data: { courseId: string; title: string; questions: unknown[]; passingScore?: number }) =>
    request('/exams', { method: 'POST', body: JSON.stringify(data) }),

  getCertificates: () =>
    request<{ id: string; certificateNo: string; enrollment: { course: { title: string } } }[]>('/certificates'),

  getCertificatePdfUrl: (id: string) => {
    const token = getToken();
    return `${getApiUrl()}/api/v1/certificates/${id}/pdf${token ? `?token=${token}` : ''}`;
  },

  downloadCertificate: async (id: string) => {
    const token = getToken();
    const res = await fetch(`${getApiUrl()}/api/v1/certificates/${id}/pdf`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) throw new Error('Download failed');
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `certificate-${id}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  },

  getSessions: (upcoming?: boolean) =>
    request<LiveSession[]>(`/sessions${upcoming ? '?upcoming=true' : ''}`),

  createSession: (data: { title: string; courseId?: string; scheduledAt: string; description?: string }) =>
    request<LiveSession>('/sessions', { method: 'POST', body: JSON.stringify(data) }),

  aiChat: (message: string, sessionId?: string) =>
    request<{ sessionId: string; reply: string }>('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message, sessionId }),
    }),

  getAiHistory: (sessionId: string) =>
    request<{ role: string; content: string; createdAt: string }[]>(`/ai/sessions/${sessionId}/messages`),
};

export { getApiUrl as API_URL };
