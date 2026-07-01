'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { api, type Exam } from '@/lib/api';

export default function ExamPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [exam, setExam] = useState<Exam | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ score: number; passed: boolean; certificate?: { id: string } } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.getCourse(slug).then((course) => {
      const examId = course.exams?.[0]?.id;
      if (examId) api.getExam(examId).then(setExam);
    });
  }, [slug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!exam) return;
    setSubmitting(true);
    try {
      const res = await api.submitExam(exam.id, answers);
      setResult(res);
    } catch {
      alert('Please enroll and sign in first.');
    } finally {
      setSubmitting(false);
    }
  }

  if (!exam) return <div className="p-16 text-center">Loading exam...</div>;

  if (result) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <div className={`rounded-2xl p-8 ${result.passed ? 'bg-green-50' : 'bg-red-50'}`}>
          <h1 className="text-2xl font-bold">{result.passed ? 'Congratulations!' : 'Not passed'}</h1>
          <p className="mt-2">Score: {result.score.toFixed(0)}%</p>
          {result.passed && result.certificate && (
            <Link href={`/academy/${slug}/certificate`} className="btn-primary mt-6 inline-block">
              View certificate
            </Link>
          )}
          {!result.passed && (
            <button type="button" onClick={() => setResult(null)} className="btn-secondary mt-6">
              Retry exam
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <Link href={`/academy/${slug}`} className="text-sm text-brand-700 hover:underline">← Back to course</Link>
      <h1 className="mt-4 text-2xl font-bold">{exam.title}</h1>
      <p className="text-slate-600">Pass score: {exam.passingScore}%</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        {exam.questions.map((q, i) => (
          <div key={q.id} className="rounded-xl border border-slate-200 bg-white p-6">
            <p className="font-medium">{i + 1}. {q.question}</p>
            <div className="mt-4 space-y-2">
              {q.options.map((opt, idx) => (
                <label key={idx} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name={q.id}
                    required
                    onChange={() => setAnswers({ ...answers, [q.id]: idx })}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button type="submit" disabled={submitting} className="btn-primary w-full">
          {submitting ? 'Submitting...' : 'Submit exam'}
        </button>
      </form>
    </div>
  );
}
