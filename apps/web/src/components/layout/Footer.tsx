import Link from 'next/link';
import { Share2, Globe, Mail, MapPin } from 'lucide-react';

const columns = [
  {
    title: 'Services',
    links: [
      { label: 'Food Safety Audits', href: '/services' },
      { label: 'Water Safety', href: '/services' },
      { label: 'Pest Control', href: '/services' },
      { label: 'ISO Compliance', href: '/services' },
      { label: 'Hygiene Consulting', href: '/services' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { label: 'Audit Dashboard', href: '/admin/audits' },
      { label: 'Client Portal', href: '/portal' },
      { label: 'Academy / LMS', href: '/academy' },
      { label: 'AI Assistant', href: '/assistant' },
      { label: 'Mobile Auditor App', href: '/admin/audits' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Industries', href: '/services#industries' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/contact' },
      { label: 'Sign in', href: '/login' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-primary-950 text-slate-400">
      <div className="container-page py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-secondary-600 to-accent-500 text-sm font-bold text-white">
                AI
              </span>
              <div>
                <span className="block text-lg font-bold text-white">Ahmad Ibrahim</span>
                <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
                  Compliance & Consulting
                </span>
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              Premium international compliance partner for food safety, water safety, pest control,
              hygiene, ISO audits, and AI-powered business solutions.
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <a href="mailto:info@ahmadibrahim.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="h-4 w-4 text-accent-400" /> info@ahmadibrahim.com
              </a>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent-400" /> Dubai, United Arab Emirates
              </p>
            </div>
            <div className="mt-6 flex gap-3">
              {[Share2, Globe].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:border-white/20 hover:text-white"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
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

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-center text-sm sm:text-left">
            © {new Date().getFullYear()} Ahmad Ibrahim. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-500">
            <span>ISO 17020 Aligned</span>
            <span>GDPR Conscious</span>
            <span>AI-Powered Platform</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
