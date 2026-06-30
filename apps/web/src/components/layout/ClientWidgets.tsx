'use client';

import { usePathname } from 'next/navigation';
import { ChatWidget } from '@/components/ai/ChatWidget';

export function ClientWidgets() {
  const pathname = usePathname();
  if (pathname === '/assistant') return null;
  return <ChatWidget compact />;
}
