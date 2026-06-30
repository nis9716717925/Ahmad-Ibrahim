'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { api, type Course, type LiveSession } from '@/lib/api';

export default function CoursePage() {
  const { slug } = useParams<{ slug: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [sessions, setSessions] = useState<LiveSession[]>([]);
  const [enrolled, setEnrolled] = useState(false);
  const [activeLesson, setActiveLesson] = useState<string | null>(null);

  useEffect(() => {
    api.getCourse(slug).then(setCourse);
    api.getSessions(true).then((all) =>
      setSessions(all.filter((s) => s.course?.slug === slug)),
    );
    const token = localStorage.getItem('token');
    if (token) {
      api.getMyEnrollments().then((e) => {
        setEnrolled(e.some((x) => x.course.slug === slug));
      }).catch(() => {});
    }
  }, [slug]);

  async function handleEnroll() {
    if (!course) return;
    await api.enrollCourse(course.id);
    setEnrolled(true);
  }

  if (!course) return <div className="p-16 text-center">Loading course...</div>;

  const modules = course.modules ?? [];

  return (
    <div>
      <section className="bg-brand-50 py-12">
        <div className="mx-auto max-w-4xl px-4">
          <Link href="/academy" className="text-sm text-brand-700 hover:underline">← Academy</Link>
          <h1 className="mt-4 text-3xl font-bold">{course.title}</h1>
          <p className="mt-2 text-slate-600">{course.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {!enrolled ? (
              <button type="button" onClick={handleEnroll} className="btn-primary">
                Enroll now
              </button>
            ) : (
              <>
                {course.exams?.[0] && (
                  <Link href={`/academy/${slug}/exam`} className="btn-primary">
                    Take final exam
                  </Link>
                )}
                <Link href={`/academy/${slug}/certificate`} className="btn-secondary">
                  My certificate
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="text-xl font-semibold">Course content</h2>
        <div className="mt-6 space-y-6">
          {modules.map((mod) => (
            <div key={mod.id} className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="font-semibold text-brand-800">{mod.title}</h3>
              <ul className="mt-3 space-y-2">
                {mod.lessons.map((lesson) => (
                  <li key={lesson.id}>
                    <button
                      type="button"
                      onClick={() => setActiveLesson(lesson.id)}
                      className={`w-full rounded-lg px-4 py-3 text-left text-sm transition ${
                        activeLesson === lesson.id ? 'bg-brand-50 text-brand-900' : 'hover:bg-slate-50'
                      }`}
                    >
                      ▶ {lesson.title}
                      {lesson.duration && <span className="ml-2 text-slate-400">{lesson.duration} min</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {activeLesson && (
          <div className="mt-8 rounded-xl border border-slate-200 bg-slate-900 p-8 text-center text-white">
            <p className="text-lg">Video lesson player</p>
            <p className="mt-2 text-sm text-slate-400">
              Lesson ID: {activeLesson} — Connect your video host (Vimeo/Mux) here
            </p>
          </div>
        )}

        {sessions.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold">Live sessions (Google Meet)</h2>
            <div className="mt-4 space-y-3">
              {sessions.map((s) => (
                <div key={s.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4">
                  <div>
                    <p className="font-medium">{s.title}</p>
                    <p className="text-sm text-slate-500">{new Date(s.scheduledAt).toLocaleString()}</p>
                  </div>
                  <a href={s.meetLink} target="_blank" rel="noopener noreferrer" className="btn-primary !py-2 text-sm">
                    Join Meet
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
