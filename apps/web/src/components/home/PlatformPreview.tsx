'use client';

export function PlatformPreview() {
  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      {/* Glow behind */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand-500/30 via-cyan-500/20 to-violet-500/20 blur-2xl" aria-hidden />

      <div className="relative animate-float">
        {/* Main dashboard card */}
        <div className="glass-panel overflow-hidden shadow-2xl">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <span className="ml-2 text-xs text-white/50">ahmadibrahim.com</span>
          </div>

          <div className="grid gap-3 p-4 sm:grid-cols-2 sm:gap-4 sm:p-5">
            <div className="rounded-xl bg-white/10 p-4">
              <p className="text-[10px] font-medium uppercase tracking-wider text-cyan-300/80 sm:text-xs">Audit score</p>
              <p className="mt-1 text-2xl font-bold text-white sm:text-3xl">94%</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-cyan-400 to-brand-400" />
              </div>
              <p className="mt-2 text-[10px] text-white/50 sm:text-xs">Food Safety · Demo Foods</p>
            </div>

            <div className="rounded-xl bg-white/10 p-4">
              <p className="text-[10px] font-medium uppercase tracking-wider text-violet-300/80 sm:text-xs">Training</p>
              <p className="mt-1 text-2xl font-bold text-white sm:text-3xl">3/4</p>
              <p className="mt-1 text-[10px] text-white/60 sm:text-xs">HACCP modules complete</p>
              <div className="mt-3 flex gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full ${i <= 3 ? 'bg-violet-400' : 'bg-white/15'}`}
                  />
                ))}
              </div>
            </div>

            <div className="col-span-1 rounded-xl bg-white/10 p-4 sm:col-span-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-emerald-300/80 sm:text-xs">Live checklist</p>
                  <p className="mt-1 text-sm font-semibold text-white">PPE compliance verified</p>
                </div>
                <span className="badge-success shrink-0 !text-[10px]">Pass</span>
              </div>
              <div className="mt-3 space-y-2">
                {['Hand washing facilities', 'Temperature logs', 'Pest control records'].map((item, i) => (
                  <div key={item} className="flex items-center gap-2 text-[11px] text-white/70 sm:text-xs">
                    <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] ${i < 2 ? 'bg-emerald-500/30 text-emerald-300' : 'bg-white/10 text-white/40'}`}>
                      {i < 2 ? '✓' : '·'}
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating AI bubble */}
        <div className="absolute -bottom-4 -left-2 max-w-[200px] animate-float-delayed rounded-2xl border border-white/15 bg-slate-900/90 p-3 shadow-xl backdrop-blur-md sm:-left-6 sm:max-w-[220px]">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-violet-500 text-[10px] text-white">AI</span>
            <p className="text-[11px] font-medium text-white sm:text-xs">Report draft ready</p>
          </div>
          <p className="mt-1.5 text-[10px] leading-snug text-white/60 sm:text-[11px]">3 findings summarized. 2 corrective actions suggested.</p>
        </div>

        {/* GPS badge */}
        <div className="absolute -right-2 -top-3 rounded-xl border border-white/15 bg-slate-900/90 px-3 py-2 shadow-xl backdrop-blur-md sm:-right-4">
          <p className="text-[10px] font-medium text-cyan-300">GPS Check-in</p>
          <p className="text-[11px] text-white/80 sm:text-xs">On-site verified ✓</p>
        </div>
      </div>
    </div>
  );
}
