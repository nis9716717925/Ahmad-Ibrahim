import type { Metadata, Viewport } from 'next';
import './globals.css';

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
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
