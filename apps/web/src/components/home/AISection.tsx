import Link from 'next/link';
import { ArrowRight, Brain, MessageSquare, FileText, GitCompare, Sparkles } from 'lucide-react';
import { FadeIn } from '@/components/ui/FadeIn';

const features = [
  { icon: MessageSquare, label: 'Summarize audits instantly' },
  { icon: FileText, label: 'Generate CAPA plans' },
  { icon: Sparkles, label: 'Improve audit notes' },
  { icon: GitCompare, label: 'Compare with previous audits' },
];

export function AISection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeIn direction="right">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-primary-900 to-primary-950 p-8 shadow-premium sm:p-10">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-accent-500/20 blur-3xl" />
              <Brain className="relative h-10 w-10 text-accent-400" />
              <div className="relative mt-6 space-y-4">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-white/50">You</p>
                  <p className="mt-1 text-sm text-white">Generate executive summary for AUD-2026-00042</p>
                </div>
                <div className="rounded-xl border border-accent-500/20 bg-accent-500/10 p-4">
                  <p className="text-xs text-accent-300">AI Assistant</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/80">
                    Overall compliance: 94.2%. 3 high-risk findings in Food Safety. Recommend follow-up audit in 30 days.
                  </p>
                </div>
              </div>
              <div className="relative mt-6 flex flex-wrap gap-2">
                {['Generate CAPA', 'Download PDF', 'Email Report'].map((b) => (
                  <span key={b} className="rounded-lg bg-white/10 px-3 py-1.5 text-xs text-white/70">{b}</span>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <span className="badge-brand">AI Assistant</span>
            <h2 className="section-heading mt-4">Compliance intelligence at your fingertips</h2>
            <p className="section-subheading">
              Our AI assistant transforms raw audit data into executive summaries, corrective action plans,
              and regulatory-ready reports — in seconds, not days.
            </p>
            <ul className="mt-8 space-y-4">
              {features.map((f) => (
                <li key={f.label} className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary-50 text-secondary-600 dark:bg-secondary-600/20 dark:text-secondary-400">
                    <f.icon className="h-4 w-4" />
                  </span>
                  {f.label}
                </li>
              ))}
            </ul>
            <Link href="/assistant" className="btn-primary mt-8 inline-flex">
              Try AI Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
