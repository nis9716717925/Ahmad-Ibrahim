'use client';

import { useRouter } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  function enterPortal() {
    router.push('/portal');
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-md">
        <div className="card !p-8 sm:!p-10 text-center">
          <span className="badge-brand">Client Portal</span>
          <h1 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">Welcome</h1>
          <p className="mt-2 text-sm text-slate-600">
            View your compliance dashboard, audit history, and certificates.
          </p>
          <button type="button" onClick={enterPortal} className="btn-primary mt-8 w-full group">
            Enter client portal
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
          </button>
        </div>
        <p className="mt-6 text-center text-sm text-slate-600">
          <Link href="/" className="font-medium text-brand-600 hover:underline">← Back to home</Link>
        </p>
      </div>
    </div>
  );
}
