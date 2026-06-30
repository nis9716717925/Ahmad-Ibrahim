const items = [
  'Food Safety',
  'HACCP',
  'Facility Audits',
  'Pest Control',
  'Water Safety',
  'ISO Compliance',
  'Live Training',
  'Certificates',
  'Field Operations',
  'AI Reporting',
  'Client Portal',
  'GPS Tracking',
];

export function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-white/5 bg-slate-950 py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-950 to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-950 to-transparent sm:w-24" />
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="mx-6 flex items-center gap-2 text-sm font-medium text-white/40 sm:mx-8 sm:text-base"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400/60" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
