'use client';

import { motion } from 'framer-motion';
import {
  BarChart3, Shield, Brain, FileCheck, Award, TrendingUp,
  CheckCircle2, AlertTriangle,
} from 'lucide-react';

export function PlatformPreview() {
  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-secondary-600/20 to-accent-500/20 blur-2xl" aria-hidden />
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-primary-900/80 shadow-premium backdrop-blur-xl sm:rounded-3xl"
        style={{ perspective: '1200px' }}
      >
        {/* Window chrome */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <span className="text-[10px] font-medium text-white/40 sm:text-xs">ahmadibrahim.com / compliance</span>
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-accent-500/20">
            <Brain className="h-3.5 w-3.5 text-accent-400" />
          </div>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-2 sm:gap-4 sm:p-5">
          {/* Compliance score */}
          <div className="col-span-2 rounded-xl border border-white/10 bg-white/5 p-4 sm:p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-white/50">Overall Compliance</p>
                <p className="mt-1 text-3xl font-bold text-white sm:text-4xl">94.2%</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-emerald-400">
                  <TrendingUp className="h-3.5 w-3.5" /> +3.1% vs last quarter
                </p>
              </div>
              <div className="relative h-16 w-16 sm:h-20 sm:w-20">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
                  <circle cx="40" cy="40" r="34" fill="none" stroke="#06b6d4" strokeWidth="6" strokeDasharray="213.6" strokeDashoffset="12" strokeLinecap="round" />
                </svg>
                <Shield className="absolute inset-0 m-auto h-6 w-6 text-accent-400" />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {[
                { label: 'Food', val: 92 },
                { label: 'Water', val: 88 },
                { label: 'Staff', val: 96 },
                { label: 'Facility', val: 95 },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="mx-auto h-1 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-secondary-500 to-accent-500" style={{ width: `${s.val}%` }} />
                  </div>
                  <p className="mt-1 text-[10px] text-white/50">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* KPI cards */}
          {[
            { icon: FileCheck, label: 'Audits', value: '127', sub: 'This month', color: 'text-secondary-400' },
            { icon: AlertTriangle, label: 'Open NCs', value: '8', sub: '3 high risk', color: 'text-amber-400' },
            { icon: Award, label: 'Certificates', value: '2.4k', sub: 'Issued', color: 'text-emerald-400' },
            { icon: BarChart3, label: 'AI Reports', value: '56', sub: 'Generated', color: 'text-accent-400' },
          ].map((kpi, i) => (
            <motion.div
              key={kpi.label}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
              className="rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4"
            >
              <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              <p className="mt-2 text-lg font-bold text-white sm:text-xl">{kpi.value}</p>
              <p className="text-[10px] text-white/50 sm:text-xs">{kpi.label}</p>
              <p className="text-[10px] text-white/30">{kpi.sub}</p>
            </motion.div>
          ))}

          {/* AI assistant snippet */}
          <div className="col-span-2 rounded-xl border border-accent-500/20 bg-gradient-to-r from-accent-500/10 to-secondary-600/10 p-3 sm:p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-500/20">
                <Brain className="h-4 w-4 text-accent-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-accent-300">AI Assistant</p>
                <p className="mt-1 text-[11px] leading-relaxed text-white/70 sm:text-xs">
                  Executive summary generated. 3 corrective actions recommended for Food Safety section.
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {['Generate CAPA', 'Download PDF', 'Share'].map((a) => (
                    <span key={a} className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] text-white/60">{a}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating badge */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -right-2 top-1/4 hidden rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 backdrop-blur-sm sm:block"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-medium text-emerald-300">Audit Approved</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
