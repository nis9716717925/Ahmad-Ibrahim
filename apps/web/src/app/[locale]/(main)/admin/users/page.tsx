'use client';

import { useEffect, useState } from 'react';
import { AdminNav } from '@/components/admin/AdminNav';
import { api } from '@/lib/api';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<{ id: string; email: string; firstName: string; lastName: string; role: string; isActive?: boolean }[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    api.getUsers().then(setUsers).catch(() => setUsers([]));
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AdminNav />
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-slate-600">Platform users and roles</p>

        <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="px-4 py-3">{u.firstName} {u.lastName}</td>
                  <td className="px-4 py-3">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs">{u.role}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <p className="p-8 text-center text-slate-500">Sign in as admin to view users.</p>
          )}
        </div>
      </div>
    </div>
  );
}
