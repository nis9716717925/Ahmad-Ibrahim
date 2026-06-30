import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ClientWidgets } from '@/components/layout/ClientWidgets';

export const metadata: Metadata = {
  title: {
    default: 'Ahmad Ibrahim | Audit, Consulting & Training',
    template: '%s | Ahmad Ibrahim',
  },
  description:
    'Ahmad Ibrahim — integrated audit, consulting, and academy platform for food safety, facility compliance, and professional training.',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#070b14',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ClientWidgets />
      </body>
    </html>
  );
}
