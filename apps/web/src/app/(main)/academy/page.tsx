'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { api, type Course, type LiveSession } from '@/lib/api';

export default function AcademyPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [sessions, setSessions] = useState<LiveSession[]>([]);

  useEffect(() => {
    api.getCourses().then(setCourses);
    api.getSessions(true).then(setSessions);
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Academy"
        title="Learn. Certify. Grow."
        description="Online courses, live Google Meet training, exams, and certificates — all linked to your account."
      />

      <section className="container-page py-12 sm:py-16">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {courses.map((course) => (
            <article key={course.slug} className="card-hover flex flex-col">
              <div className="flex h-36 items-center justify-center rounded-xl bg-gradient-to-br from-brand-100 to-violet-100">
                <svg className="h-12 w-12 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                </svg>
              </div>
              <h2 className="mt-5 text-lg font-bold text-slate-900">{course.title}</h2>
              <p className="mt-1 text-sm text-slate-500">
                {course.duration ? `${Math.round(course.duration / 60)} hours` : 'Self-paced'}
              </p>
              {course.description && (
                <p className="mt-3 flex-1 text-sm text-slate-600 line-clamp-2">{course.description}</p>
              )}
              <Link href={`/academy/${course.slug}`} className="btn-primary mt-5 w-full text-center !py-2.5">
                View course
              </Link>
            </article>
          ))}
          {courses.length === 0 && (
            <p className="col-span-full text-center text-slate-500">Courses coming soon.</p>
          )}
        </div>
      </section>

      {sessions.length > 0 && (
        <section className="border-t border-slate-200 bg-white py-12 sm:py-16">
          <div className="container-page">
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Upcoming live sessions</h2>
            <p className="mt-1 text-sm text-slate-500">Join via Google Meet</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {sessions.map((s) => (
                <div key={s.id} className="card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{s.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{new Date(s.scheduledAt).toLocaleString()}</p>
                  </div>
                  <a href={s.meetLink} target="_blank" rel="noopener noreferrer" className="btn-primary shrink-0 text-center !py-2.5">
                    Join Meet
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
