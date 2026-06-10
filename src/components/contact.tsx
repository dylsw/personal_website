'use client';

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

// ── Section ───────────────────────────────────────────────────────────────────
export function Contact() {
  const [headingRef, headingInView] = useInView();
  const [contentRef, contentInView] = useInView(0.1);

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
        </div>
      </div>
    </section>
  );
}
