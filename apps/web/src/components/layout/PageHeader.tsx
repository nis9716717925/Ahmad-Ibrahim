type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  dark?: boolean;
};

export function PageHeader({ eyebrow, title, description, children, dark }: PageHeaderProps) {
  return (
    <section
      className={
        dark
          ? 'hero-mesh border-b border-white/5 py-14 sm:py-20'
          : 'border-b border-slate-200/80 bg-white py-12 sm:py-16'
      }
    >
      <div className="container-page">
        {eyebrow && (
          <span className={dark ? 'badge border border-white/10 bg-white/10 text-white/80' : 'badge-brand'}>
            {eyebrow}
          </span>
        )}
        <h1
          className={`mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl ${
            dark ? 'text-white' : 'text-slate-900'
          }`}
        >
          {title}
        </h1>
        {description && (
          <p className={`mt-4 max-w-2xl text-base sm:text-lg ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
            {description}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
