'use client';

import { useState, useTransition, useEffect, useRef } from 'react';
import { personal, contact as contactData } from '@/data';
import { useInView } from '@/lib/use-in-view';
import { sendContactEmail } from '@/app/actions/contact';

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ── Toast ────────────────────────────────────────────────────────────────────
function Toast({ visible }: { visible: boolean }) {
  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm font-medium text-zinc-100 shadow-2xl"
      style={{
        opacity:   visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 300ms ease, transform 300ms ease',
        pointerEvents: 'none',
      }}
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
        <CheckIcon />
      </span>
      {contactData.toastMessage}
    </div>
  );
}

// ── Input / Textarea shared styles ───────────────────────────────────────────
const inputCls =
  'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-white/25 focus:bg-white/8';

// ── Section ──────────────────────────────────────────────────────────────────
export function Contact() {
  const [headingRef, headingInView] = useInView();
  const [contentRef, contentInView] = useInView(0.1);
  const formRef = useRef<HTMLFormElement>(null);

  const [isPending, startTransition] = useTransition();
  const [error, setError]   = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = () => {
    setToastVisible(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 4000);
  };

  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const fd = new FormData(e.currentTarget);
    const email = (fd.get('email') as string).trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    startTransition(async () => {
      try {
        const res = await sendContactEmail(fd);
        if (res.ok) {
          formRef.current?.reset();
          showToast();
        } else {
          setError('Something went wrong — please try again.');
        }
      } catch {
        setError('Something went wrong — please try again.');
      }
    });
  };

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-3xl px-6">

        <h2
          ref={headingRef as React.RefObject<HTMLHeadingElement>}
          className="mb-3 text-3xl font-bold tracking-tight text-zinc-100"
          style={{
            opacity: headingInView ? 1 : 0,
            transform: headingInView ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 500ms ease, transform 500ms ease',
          }}
        >
          {contactData.heading}
        </h2>

        <div
          ref={contentRef as React.RefObject<HTMLDivElement>}
          className="flex flex-col gap-8"
          style={{
            opacity: contentInView ? 1 : 0,
            transform: contentInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 600ms ease 100ms, transform 600ms ease 100ms',
          }}
        >
          <p className="text-base leading-relaxed text-zinc-400">
            {contactData.copy}
          </p>

          {/* LinkedIn */}
          <a
            href={personal.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-fit items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-white/20 hover:bg-white/10"
          >
            <LinkedInIcon />
            {contactData.linkedinCta}
          </a>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-white/8" />
            <span className="text-xs text-zinc-600">{contactData.dividerLabel}</span>
            <div className="h-px flex-1 bg-white/8" />
          </div>

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                name="name"
                type="text"
                placeholder="Name (optional)"
                className={inputCls}
                disabled={isPending}
              />
              <input
                name="email"
                type="email"
                placeholder="Email *"
                className={inputCls}
                disabled={isPending}
              />
            </div>

            <textarea
              name="message"
              placeholder="Message (optional)"
              rows={4}
              className={`${inputCls} resize-none`}
              disabled={isPending}
            />

            {error && (
              <p className="text-sm text-rose-400">{error}</p>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isPending}
                className="rounded-xl bg-white px-6 py-2.5 text-sm font-semibold text-zinc-900 transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {isPending ? 'Sending…' : 'Send'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Toast visible={toastVisible} />
    </section>
  );
}
