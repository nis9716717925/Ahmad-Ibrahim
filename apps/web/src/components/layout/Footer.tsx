import Link from 'next/link';

const columns = [
  {
    title: 'Services',
    links: [
      { label: 'Food Safety', href: '/services' },
      { label: 'Pest Control', href: '/services' },
      { label: 'Facility Audits', href: '/services' },
      { label: 'Consulting', href: '/services' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { label: 'Client Portal', href: '/portal' },
      { label: 'Academy', href: '/academy' },
      { label: 'AI Assistant', href: '/assistant' },
      { label: 'Admin', href: '/admin' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Sign in', href: '/login' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-400">
      <div className="container-page py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-white">
                AI
              </span>
              <span className="text-lg font-bold text-white">Ahmad Ibrahim</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              Ahmad Ibrahim — audit, consulting, and training platform for companies, facilities, and professionals.
            </p>
            <p className="mt-4 text-sm">
              <a href="mailto:info@ahmadibrahim.com" className="hover:text-white transition-colors">
                info@ahmadibrahim.com
              </a>
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-white">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-center text-sm sm:text-left">
            © {new Date().getFullYear()} Ahmad Ibrahim. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-500">
            <span>ISO-ready workflows</span>
            <span className="hidden sm:inline">·</span>
            <span>GDPR-conscious design</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
