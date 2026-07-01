'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import {
  ChevronDown, Menu, X, ArrowRight,
  Shield, Droplets, Bug, Award, GraduationCap, Brain, Building2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageSwitcher } from './LanguageSwitcher';

const megaServiceKeys = [
  { icon: Shield, key: 'foodSafety', href: '/services' },
  { icon: Droplets, key: 'waterSafety', href: '/services' },
  { icon: Bug, key: 'pestControl', href: '/services' },
  { icon: Building2, key: 'facilityAudits', href: '/services' },
  { icon: Award, key: 'isoCompliance', href: '/services' },
  { icon: GraduationCap, key: 'academy', href: '/academy' },
  { icon: Brain, key: 'aiSolutions', href: '/assistant' },
] as const;

const navLinkKeys = [
  { key: 'pricing', href: '/membership' },
  { key: 'industries', href: '/services#industries' },
  { key: 'platform', href: '/admin/audits' },
  { key: 'academy', href: '/academy' },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
] as const;

export function Header() {
  const t = useTranslations('nav');
  const tMega = useTranslations('megaMenu');
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

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
                {t('tagline')}
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
                {t('services')}
                <ChevronDown className={`h-4 w-4 transition-transform ${megaOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {megaOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute start-1/2 top-full z-50 mt-2 w-[36rem] -translate-x-1/2 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-premium dark:border-slate-700 dark:bg-primary-900 rtl:translate-x-1/2"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {megaServiceKeys.map((item) => (
                        <Link
                          key={item.key}
                          href={item.href}
                          className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-surface-muted dark:hover:bg-white/5"
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary-50 text-secondary-600 dark:bg-secondary-600/20 dark:text-secondary-400">
                            <item.icon className="h-5 w-5" />
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-primary-900 dark:text-white">{tMega(item.key)}</p>
                            <p className="text-xs text-slate-500">{tMega(`${item.key}Desc`)}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-700">
                      <p className="text-xs text-slate-500">{t('megaFooter')}</p>
                      <Link href="/services" className="flex items-center gap-1 text-sm font-semibold text-secondary-600">
                        {t('allServices')} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinkKeys.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? transparent ? 'bg-white/10 text-white' : 'bg-secondary-50 text-secondary-700'
                    : transparent ? `${textClass} hover:bg-white/10` : 'text-slate-600 hover:bg-slate-100 hover:text-primary-900 dark:text-slate-300'
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <LanguageSwitcher transparent={transparent} />
            <Link
              href="/portal"
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                transparent
                  ? 'border border-white/20 text-white hover:bg-white/10'
                  : 'border border-slate-200 text-primary-900 hover:bg-slate-50 dark:border-slate-600 dark:text-white'
              }`}
            >
              {t('portal')}
            </Link>
            <Link href="/contact" className="btn-primary !rounded-xl !px-5 !py-2.5 !text-sm">
              {t('getStarted')}
            </Link>
          </div>

          <button
            type="button"
            className={`flex h-10 w-10 items-center justify-center rounded-xl lg:hidden ${
              transparent ? 'border border-white/20 text-white' : 'border border-slate-200 text-primary-900'
            }`}
            onClick={() => setMobileOpen(true)}
            aria-label={t('menu')}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

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
              className="fixed inset-y-0 end-0 z-[70] flex w-full max-w-sm flex-col bg-white shadow-2xl dark:bg-primary-900 lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-700">
                <span className="font-bold text-primary-900 dark:text-white">{t('menu')}</span>
                <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close">
                  <X className="h-5 w-5 text-slate-500" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto p-4">
                <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">{t('services')}</p>
                {megaServiceKeys.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-primary-900 hover:bg-surface-muted dark:text-white"
                  >
                    <item.icon className="h-5 w-5 text-secondary-600" />
                    {tMega(item.key)}
                  </Link>
                ))}
                <div className="my-4 border-t border-slate-100 dark:border-slate-700" />
                {navLinkKeys.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-xl px-3 py-3.5 text-base font-medium text-primary-900 hover:bg-surface-muted dark:text-white"
                  >
                    {t(item.key)}
                  </Link>
                ))}
              </nav>
              <div className="space-y-2 border-t border-slate-100 p-4 dark:border-slate-700">
                <div className="mb-3 flex justify-center">
                  <LanguageSwitcher />
                </div>
                <Link href="/portal" className="btn-primary w-full text-center">{t('portal')}</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {!isHome && <div className="h-[4.25rem] lg:h-[4.75rem]" />}
    </>
  );
}
