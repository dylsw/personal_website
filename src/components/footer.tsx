'use client';

import { personal, footer as footerData } from '@/data';

function ArrowUpIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  );
}

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative z-10 border-t border-white/6 py-10">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-6 text-center">

        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-zinc-300"
        >
          <ArrowUpIcon />
          Back to top
        </button>

        <p className="text-xs text-zinc-500">
          © {new Date().getFullYear()} {personal.name} · {footerData.credit}
        </p>

      </div>
    </footer>
  );
}
