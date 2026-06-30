const stats = [
  { value: '500+', label: 'Audits completed' },
  { value: '50+', label: 'Corporate clients' },
  { value: '2,000+', label: 'Trainees certified' },
  { value: '15+', label: 'Service categories' },
];

export function Stats() {
  return (
    <section className="border-b border-slate-200/80 bg-white py-10 sm:py-14">
      <div className="container-page">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-center transition hover:border-brand-100 hover:shadow-lg sm:p-6"
            >
              <p className="text-2xl font-extrabold text-brand-700 sm:text-3xl lg:text-4xl">{stat.value}</p>
              <p className="mt-1.5 text-xs font-medium text-slate-600 sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
