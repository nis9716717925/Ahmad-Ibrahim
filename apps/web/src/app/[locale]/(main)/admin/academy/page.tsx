'use client';

import { useEffect, useState } from 'react';
import { AdminNav } from '@/components/admin/AdminNav';
import { api, type Course, type LiveSession } from '@/lib/api';

export default function AdminAcademyPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [sessions, setSessions] = useState<LiveSession[]>([]);
  const [sessionForm, setSessionForm] = useState({ title: '', courseId: '', scheduledAt: '' });

  useEffect(() => {
    api.getCoursesAdmin().then(setCourses).catch(() => api.getCourses().then(setCourses));
    api.getSessions().then(setSessions);
  }, []);

  async function scheduleSession(e: React.FormEvent) {
    e.preventDefault();
    await api.createSession({
      title: sessionForm.title,
      courseId: sessionForm.courseId || undefined,
      scheduledAt: new Date(sessionForm.scheduledAt).toISOString(),
    });
    setSessionForm({ title: '', courseId: '', scheduledAt: '' });
    api.getSessions().then(setSessions);
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AdminNav />
        <h1 className="text-2xl font-bold">Academy management</h1>
        <p className="text-slate-600">Courses, exams, and Google Meet live sessions</p>

        <section className="mt-8">
          <h2 className="text-lg font-semibold">Courses</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {courses.map((c) => (
              <div key={c.id} className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="font-semibold">{c.title}</h3>
                <p className="text-sm text-slate-500">{c.slug}</p>
                <p className="mt-2 text-sm">{c.description?.slice(0, 100)}...</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold">Schedule Google Meet session</h2>
          <p className="text-sm text-slate-500">A Meet link is generated automatically when you schedule.</p>
          <form onSubmit={scheduleSession} className="mt-4 grid gap-4 sm:grid-cols-3">
            <input
              required
              placeholder="Session title"
              value={sessionForm.title}
              onChange={(e) => setSessionForm({ ...sessionForm, title: e.target.value })}
              className="rounded-md border px-3 py-2 text-sm"
            />
            <select
              value={sessionForm.courseId}
              onChange={(e) => setSessionForm({ ...sessionForm, courseId: e.target.value })}
              className="rounded-md border px-3 py-2 text-sm"
            >
              <option value="">No course linked</option>
              {courses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
            <input
              required
              type="datetime-local"
              value={sessionForm.scheduledAt}
              onChange={(e) => setSessionForm({ ...sessionForm, scheduledAt: e.target.value })}
              className="rounded-md border px-3 py-2 text-sm"
            />
            <button type="submit" className="btn-primary sm:col-span-3">Create session</button>
          </form>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold">Live sessions</h2>
          <div className="mt-4 space-y-3">
            {sessions.map((s) => (
              <div key={s.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4">
                <div>
                  <p className="font-medium">{s.title}</p>
                  <p className="text-sm text-slate-500">
                    {new Date(s.scheduledAt).toLocaleString()} · {s.durationMin} min
                    {s.course && ` · ${s.course.title}`}
                  </p>
                </div>
                <a href={s.meetLink} target="_blank" rel="noopener noreferrer" className="btn-primary !py-2 !px-4 text-sm">
                  Open Meet
                </a>
              </div>
            ))}
            {sessions.length === 0 && <p className="text-slate-500">No sessions scheduled.</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
