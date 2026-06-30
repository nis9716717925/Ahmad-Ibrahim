'use client';

import { useEffect, useRef, useState } from 'react';
import { api } from '@/lib/api';

export function ChatWidget({ compact }: { compact?: boolean }) {
  const [open, setOpen] = useState(!compact);
  const [sessionId, setSessionId] = useState<string>();
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: 'Hello! I\'m the Ahmad Ibrahim assistant. I can help with audits, training, certificates, and more. What do you need?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages((m) => [...m, { role: 'user', content: userMsg }]);
    setLoading(true);
    try {
      const res = await api.aiChat(userMsg, sessionId);
      setSessionId(res.sessionId);
      setMessages((m) => [...m, { role: 'assistant', content: res.reply }]);
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: 'Sorry, I could not process that request.' }]);
    } finally {
      setLoading(false);
    }
  }

  if (compact && !open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-violet-600 text-xl text-white shadow-lg shadow-brand-600/30 transition hover:scale-105 sm:bottom-6 sm:right-6"
        aria-label="Open AI assistant"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    );
  }

  return (
    <div
      className={
        compact
          ? 'fixed inset-x-4 bottom-4 z-50 flex max-h-[min(28rem,calc(100vh-6rem))] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:inset-x-auto sm:bottom-6 sm:right-6 sm:left-auto sm:h-[28rem] sm:w-96 sm:max-h-none'
          : 'flex h-[min(32rem,calc(100vh-12rem))] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg sm:h-[32rem]'
      }
    >
      <div className="flex shrink-0 items-center justify-between bg-gradient-to-r from-brand-700 to-violet-700 px-4 py-3.5 text-white">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-xs font-bold">AI</span>
          <span className="font-semibold">Assistant</span>
        </div>
        {compact && (
          <button type="button" onClick={() => setOpen(false)} className="rounded-lg p-1.5 hover:bg-white/10" aria-label="Close">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 overscroll-contain">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[90%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
              m.role === 'user'
                ? 'ml-auto bg-brand-600 text-white'
                : 'bg-slate-100 text-slate-800'
            }`}
          >
            {m.content}
          </div>
        ))}
        {loading && (
          <div className="flex gap-1 px-2">
            <span className="h-2 w-2 animate-bounce rounded-full bg-slate-300" style={{ animationDelay: '0ms' }} />
            <span className="h-2 w-2 animate-bounce rounded-full bg-slate-300" style={{ animationDelay: '150ms' }} />
            <span className="h-2 w-2 animate-bounce rounded-full bg-slate-300" style={{ animationDelay: '300ms' }} />
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="shrink-0 border-t border-slate-200 p-3 flex gap-2 safe-bottom">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Ask anything..."
          className="input-field !py-2.5 flex-1"
        />
        <button type="button" onClick={send} disabled={loading} className="btn-primary !px-4 !py-2.5 shrink-0">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  );
}
