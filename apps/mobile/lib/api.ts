const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:4000';

let authToken: string | null = null;

export function setToken(token: string | null) {
  authToken = token;
}

export function getToken() {
  return authToken;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}/api/v1${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...options.headers,
    },
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

export type ChecklistResponse = {
  answer: 'pass' | 'fail' | 'na' | boolean;
  score?: number;
  riskLevel?: string;
  notes?: string;
};

export type Audit = {
  id: string;
  referenceNumber: string;
  status: string;
  priority?: string;
  gpsRequired?: boolean;
  scheduledAt?: string;
  scheduledTime?: string;
  siteLocation?: string;
  score?: number;
  maxScore?: number;
  sectionScores?: Record<string, number>;
  responses?: Record<string, ChecklistResponse>;
  serviceType?: { name: string };
  organization?: { name: string };
  facility?: { name: string };
  template?: { items: { id: string; section: string; question: string; weight?: number }[] };
};

export const mobileApi = {
  login: (email: string, password: string) =>
    request<{ accessToken: string; user: { id: string; firstName: string; lastName: string } }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getAudits: (today?: boolean) =>
    request<Audit[]>(`/audits${today ? '?today=true' : ''}`),

  getAudit: (id: string) => request<Audit>(`/audits/${id}`),

  submitResponses: (id: string, responses: Record<string, ChecklistResponse>) =>
    request<Audit>(`/audits/${id}/responses`, { method: 'POST', body: JSON.stringify({ responses }) }),

  checkIn: (id: string, latitude: number, longitude: number, accuracy?: number, type: 'CHECK_IN' | 'CHECK_OUT' = 'CHECK_IN') =>
    request(`/audits/${id}/check-in`, {
      method: 'POST',
      body: JSON.stringify({ latitude, longitude, accuracy, type }),
    }),

  addEvidence: (id: string, data: { type: string; fileName?: string; note?: string; latitude?: number; longitude?: number }) =>
    request(`/audits/${id}/evidence`, { method: 'POST', body: JSON.stringify(data) }),

  runAi: (id: string, action: string) =>
    request<{ result: string }>(`/audits/${id}/ai/${action}`, { method: 'POST' }),

  updateAudit: (id: string, status: string) =>
    request(`/audits/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }),
};
