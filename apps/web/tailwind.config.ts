import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F172A',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        secondary: {
          DEFAULT: '#2563EB',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        accent: {
          DEFAULT: '#06B6D4',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        success: '#10B981',
        warning: '#F59E0B',
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F8FAFC',
        },
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        display: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 80px -20px rgba(37, 99, 235, 0.45)',
        'glow-cyan': '0 0 60px -15px rgba(6, 182, 212, 0.4)',
        card: '0 4px 32px -8px rgba(15, 23, 42, 0.08)',
        'card-hover': '0 16px 48px -12px rgba(15, 23, 42, 0.14)',
        glass: '0 8px 32px rgba(15, 23, 42, 0.06), inset 0 1px 0 rgba(255,255,255,0.6)',
        premium: '0 24px 64px -16px rgba(15, 23, 42, 0.18)',
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(15,23,42,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.03) 1px, transparent 1px)`,
        'hero-gradient': 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        'mesh-light': 'radial-gradient(ellipse 80% 50% at 20% 40%, rgba(37,99,235,0.08), transparent), radial-gradient(ellipse 60% 40% at 80% 20%, rgba(6,182,212,0.06), transparent)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards',
        float: 'float 7s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out 2s infinite',
        marquee: 'marquee 40s linear infinite',
        shimmer: 'shimmer 2.5s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2s ease-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.95)', opacity: '0.8' },
          '100%': { transform: 'scale(1.4)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
