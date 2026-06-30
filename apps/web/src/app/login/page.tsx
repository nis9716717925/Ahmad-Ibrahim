'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api, ApiError } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@connect.local');
  const [password, setPassword] = useState('Admin123!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await api.login(email, password);
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      if (['SUPER_ADMIN', 'STAFF', 'AUDITOR'].includes(data.user.role)) {
        router.push('/admin');
      } else {
        router.push('/portal');
      }
    } catch (err) {
      if (err instanceof ApiError && err.isNetworkError) {
        setError(err.message);
      } else if (err instanceof ApiError) {
        setError(err.message === 'Invalid credentials' ? 'Invalid email or password' : err.message);
      } else {
        setError('Sign in failed. Check that the API server is running.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-md">
        <div className="card !p-8 sm:!p-10">
          <div className="mb-8 text-center sm:text-left">
            <span className="badge-brand">Welcome back</span>
            <h1 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">Sign in</h1>
            <p className="mt-2 text-sm text-slate-600">Access your portal, audits, or admin dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="label-field">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                required
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="password" className="label-field">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                required
                autoComplete="current-password"
              />
            </div>
            {error && (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                {error}
              </p>
            )}
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500">
            Demo: admin@connect.local / Admin123!
          </p>
        </div>
        <p className="mt-6 text-center text-sm text-slate-600">
          <Link href="/" className="font-medium text-brand-600 hover:underline">← Back to home</Link>
        </p>
      </div>
    </div>
  );
}
