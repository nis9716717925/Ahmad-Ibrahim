'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';

export default function CertificatePage() {
  const { slug } = useParams<{ slug: string }>();
  const [cert, setCert] = useState<{ id: string; certificateNo: string } | null>(null);

  useEffect(() => {
    api.getMyEnrollments().then((enrollments) => {
      const match = enrollments.find((e) => e.course.slug === slug && e.certificate);
      if (match?.certificate) setCert(match.certificate);
    });
  }, [slug]);

  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <Link href={`/academy/${slug}`} className="text-sm text-brand-700 hover:underline">← Back to course</Link>
      {cert ? (
        <div className="mt-8 rounded-2xl border-4 border-brand-700 bg-white p-12 shadow-lg">
          <p className="text-sm uppercase tracking-wider text-brand-600">Certificate of Completion</p>
          <h1 className="mt-4 text-2xl font-bold text-slate-900">Course completed</h1>
          <p className="mt-4 text-slate-600">Certificate No: {cert.certificateNo}</p>
          <button
            type="button"
            onClick={() => api.downloadCertificate(cert.id)}
            className="btn-primary mt-8"
          >
            Download PDF
          </button>
        </div>
      ) : (
        <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-8">
          <p className="text-slate-600">No certificate yet. Pass the final exam to earn your certificate.</p>
          <Link href={`/academy/${slug}/exam`} className="btn-primary mt-4 inline-block">
            Take exam
          </Link>
        </div>
      )}
    </div>
  );
}
