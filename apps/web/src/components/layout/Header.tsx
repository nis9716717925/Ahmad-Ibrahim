'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  ChevronDown, Menu, X, Globe, ArrowRight,
  Shield, Droplets, Bug, Award, GraduationCap, Brain, Building2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const megaServices = [
  { icon: Shield, label: 'Food Safety', href: '/services', desc: 'HACCP & ISO 22000' },
  { icon: Droplets, label: 'Water Safety', href: '/services', desc: 'Testing & compliance' },
  { icon: Bug, label: 'Pest Control', href: '/services', desc: 'IPM programs' },
  { icon: Building2, label: 'Facility Audits', href: '/services', desc: 'On-site inspections' },
  { icon: Award, label: 'ISO Compliance', href: '/services', desc: '9001 & 22000' },
  { icon: GraduationCap, label: 'Academy', href: '/academy', desc: 'LMS & certificates' },
  { icon: Brain, label: 'AI Solutions', href: '/assistant', desc: 'Smart compliance' },
];

const navLinks = [
  { label: 'Industries', href: '/services#industries' },
  { label: 'Platform', href: '/admin/audits' },
  { label: 'Academy', href: '/academy' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const languages = ['EN', 'AR'];

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [lang, setLang] = useState('EN');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  const transparent = isHome && !scrolled;
  const textClass = transparent ? 'text-white' : 'text-primary-900';
  const mutedClass = transparent ? 'text-white/70' : 'text-slate-500';

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          transparent
            ? 'border-b border-white/5 bg-transparent'
            : 'border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-primary-950/90'
        }`}
      >
        <div className="container-page flex h-[4.25rem] items-center justify-between lg:h-[4.75rem]">
          <Link href="/" className="group flex items-center gap-3">
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition-shadow ${
              transparent
                ? 'bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-sm group-hover:shadow-glow-cyan'
                : 'bg-gradient-to-br from-secondary-600 to-accent-500 text-white shadow-md'
            }`}>
              AI
            </span>
            <div className="hidden sm:block">
              <span className={`block text-base font-bold tracking-tight ${textClass}`}>Ahmad Ibrahim</span>
              <span className={`block text-[10px] font-medium uppercase tracking-[0.2em] ${mutedClass}`}>
                Compliance & Consulting
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            <div
              className="relative"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <button
                type="button"
                className={`flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  transparent ? 'hover:bg-white/10' : 'hover:bg-slate-100 dark:hover:bg-white/5'
                } ${textClass}`}
              >
                Services
                <ChevronDown className={`h-4 w-4 transition-transform ${megaOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {megaOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 top-full z-50 mt-2 w-[36rem] -translate-x-1/2 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-premium dark:border-slate-700 dark:bg-primary-900"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {megaServices.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-surface-muted dark:hover:bg-white/5"
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary-50 text-secondary-600 dark:bg-secondary-600/20 dark:text-secondary-400">
                            <item.icon className="h-5 w-5" />
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-primary-900 dark:text-white">{item.label}</p>
                            <p className="text-xs text-slate-500">{item.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-700">
                      <p className="text-xs text-slate-500">Enterprise-grade compliance programs</p>
                      <Link href="/services" className="flex items-center gap-1 text-sm font-semibold text-secondary-600">
                        All services <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? transparent ? 'bg-white/10 text-white' : 'bg-secondary-50 text-secondary-700'
                    : transparent ? `${textClass} hover:bg-white/10` : 'text-slate-600 hover:bg-slate-100 hover:text-primary-900 dark:text-slate-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <div className={`flex items-center rounded-lg border p-0.5 ${
              transparent ? 'border-white/15 bg-white/5' : 'border-slate-200 bg-slate-50 dark:border-slate-700'
            }`}>
              {languages.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={`flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                    lang === l
                      ? transparent ? 'bg-white/15 text-white' : 'bg-white text-primary-900 shadow-sm'
                      : transparent ? 'text-white/60 hover:text-white' : 'text-slate-500'
                  }`}
                >
                  {l === 'EN' && <Globe className="h-3 w-3" />}
                  {l}
                </button>
              ))}
            </div>
            <Link
              href="/portal"
              className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                transparent ? 'text-white/90 hover:text-white' : 'text-slate-600 hover:text-secondary-600'
              }`}
            >
              Portal
            </Link>
            <Link
              href="/login"
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                transparent
                  ? 'border border-white/20 text-white hover:bg-white/10'
                  : 'border border-slate-200 text-primary-900 hover:bg-slate-50 dark:border-slate-600 dark:text-white'
              }`}
            >
              Sign in
            </Link>
            <Link href="/contact" className="btn-primary !rounded-xl !px-5 !py-2.5 !text-sm">
              Get started
            </Link>
          </div>

          <button
            type="button"
            className={`flex h-10 w-10 items-center justify-center rounded-xl lg:hidden ${
              transparent ? 'border border-white/20 text-white' : 'border border-slate-200 text-primary-900'
            }`}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-primary-950/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col bg-white shadow-2xl dark:bg-primary-900 lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-700">
                <span className="font-bold text-primary-900 dark:text-white">Menu</span>
                <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close">
                  <X className="h-5 w-5 text-slate-500" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto p-4">
                <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Services</p>
                {megaServices.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-primary-900 hover:bg-surface-muted dark:text-white"
                  >
                    <item.icon className="h-5 w-5 text-secondary-600" />
                    {item.label}
                  </Link>
                ))}
                <div className="my-4 border-t border-slate-100 dark:border-slate-700" />
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-xl px-3 py-3.5 text-base font-medium text-primary-900 hover:bg-surface-muted dark:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="space-y-2 border-t border-slate-100 p-4 dark:border-slate-700">
                <Link href="/contact" className="btn-primary w-full text-center">Get started</Link>
                <Link href="/login" className="btn-secondary w-full text-center">Sign in</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header on non-home pages */}
      {!isHome && <div className="h-[4.25rem] lg:h-[4.75rem]" />}
    </>
  );
}
