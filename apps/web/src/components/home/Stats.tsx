'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { STATS } from './data';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/FadeIn';

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const dur = 1800;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - (1 - p) ** 3;
          setCount(Math.floor(eased * value));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export function Stats() {
  const t = useTranslations('stats');

  return (
    <section className="relative border-y border-slate-200/80 bg-white py-16 dark:border-slate-800 dark:bg-primary-950 sm:py-20">
      <div className="absolute inset-0 bg-mesh-light opacity-60" aria-hidden />
      <div className="container-page relative">
        <Stagger className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
          {STATS.map((s) => (
            <StaggerItem key={s.key} className="text-center">
              <p className="text-3xl font-extrabold tracking-tight text-primary-900 dark:text-white sm:text-4xl lg:text-5xl">
                <AnimatedNumber value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">{t(s.key)}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
