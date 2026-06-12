'use client';

import { useState, useEffect } from 'react';
import { personal, contact as contactData } from '@/data';
import { useInView } from '@/lib/use-in-view';

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ResumeModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950"
        style={{ height: 'min(90vh, 900px)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between border-b border-white/8 px-5 py-3.5">
          <p className="text-sm font-medium text-zinc-200">Resume</p>
          <div className="flex items-center gap-2">
            <a
              href={contactData.resume.path}
              download
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-white/20 hover:bg-white/10"
            >
              <DownloadIcon />
              Download
            </a>
            <button
              onClick={onClose}
              className="flex items-center justify-center rounded-lg border border-white/10 bg-white/5 p-1.5 text-zinc-400 transition-colors hover:border-white/20 hover:text-zinc-200"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* PDF iframe */}
        <iframe
          src={contactData.resume.path}
          className="flex-1 w-full"
          title="Resume"
        />
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export function Contact() {
  const [headingRef, headingInView] = useInView();
  const [contentRef, contentInView] = useInView(0.1);
  const [showResume, setShowResume] = useState(false);

  const openResume = () => {
    document.body.classList.add('modal-open');
    setTimeout(() => setShowResume(true), 300);
  };

  const closeResume = () => {
    setShowResume(false);
    document.body.classList.remove('modal-open');
  };

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-3xl px-6">

        <h2
          ref={headingRef as React.RefObject<HTMLHeadingElement>}
          className="mb-3 text-3xl font-bold tracking-tight text-zinc-100"
          style={{
            opacity:   headingInView ? 1 : 0,
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
            opacity:   contentInView ? 1 : 0,
            transform: contentInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 600ms ease 100ms, transform 600ms ease 100ms',
          }}
        >
          <div className="flex flex-col gap-6">
            {contactData.copy.map((line, i) => (
              <p key={i} className="text-base leading-relaxed text-zinc-400">
                {line}
              </p>
            ))}
          </div>

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

          {/* Resume */}
          <div className="flex flex-col gap-3">
            <p className="text-sm text-zinc-500">Or grab my latest resume below.</p>
            <div className="flex gap-2.5">
              <button
                onClick={openResume}
                className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-white/20 hover:bg-white/10"
              >
                <EyeIcon />
                Preview
              </button>
              <a
                href={contactData.resume.path}
                download
                className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-white/20 hover:bg-white/10"
              >
                <DownloadIcon />
                Download
              </a>
            </div>
          </div>
        </div>
      </div>

      {showResume && <ResumeModal onClose={closeResume} />}
    </section>
  );
}
