"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { personal } from "@/data";

function GitHubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const NAV_ITEMS = [
  { id: "about",      label: "About",      short: "About"   },
  { id: "experience", label: "Experience", short: "Exp"     },
  { id: "projects",   label: "Projects",   short: "Proj"    },
  { id: "hobbies",    label: "Hobbies",    short: "Hobbies" },
  { id: "contact",    label: "Contact",    short: "Contact" },
] as const;

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);
  const navRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    // Disable browser scroll restoration so back-navigation always lands at the
    // top of the page — otherwise restored scroll position puts elements in the
    // viewport before React can paint their hidden state, skipping the animation.
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

    const onPageShow = () => {
      // Always land at the top — each component restarts its own animation
      window.scrollTo(0, 0);
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 60);

      // Find the last section whose top has crossed 35% from the viewport top.
      // This is purely positional, so it can never get stuck between events.
      const trigger = window.scrollY + window.innerHeight * 0.35;
      let current = "";
      for (const { id } of NAV_ITEMS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= trigger) current = id;
      }
      setActiveSection(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const updateIndicator = useCallback(() => {
    const activeEl = itemRefs.current[activeSection];
    const indicator = indicatorRef.current;
    if (!indicator) return;
    if (!activeEl) { indicator.style.opacity = "0"; return; }
    indicator.style.width = `${activeEl.offsetWidth}px`;
    indicator.style.left = `${activeEl.offsetLeft}px`;
    indicator.style.opacity = "1";
  }, [activeSection]);

  useEffect(() => {
    updateIndicator();
    const nav = navRef.current;
    if (!nav) return;
    const ro = new ResizeObserver(() => updateIndicator());
    ro.observe(nav);
    return () => ro.disconnect();
  }, [updateIndicator]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`fixed left-1/2 z-50 w-[calc(100%-2rem)] max-w-fit transition-all duration-300 ease-out ${
        scrolled ? "top-3" : "top-5"
      }`}
      style={{
        opacity: visible ? 1 : 0,
        transform: `translateX(-50%) translateY(${visible ? '0px' : '-14px'})`,
        transition: 'opacity 400ms ease, transform 400ms ease',
      }}
    >
      <div
        ref={navRef}
        className={`relative flex w-full items-center gap-0 rounded-full border px-1.5 py-1 shadow-lg backdrop-blur-sm transition-all duration-300 sm:gap-0.5 sm:px-2 sm:py-1.5 ${
          scrolled
            ? "border-white/10 bg-zinc-950/90 shadow-black/40"
            : "border-white/8 bg-zinc-950/70 shadow-black/30"
        }`}
      >
        {/* Sliding active indicator */}
        <div
          ref={indicatorRef}
          className="absolute inset-y-1 rounded-full bg-white/15 opacity-0 transition-all duration-300 ease-out"
          style={{ left: 0, width: 0 }}
        />

        {NAV_ITEMS.map(({ id, label, short }) => (
          <button
            key={id}
            ref={(el) => { itemRefs.current[id] = el; }}
            onClick={() => scrollTo(id)}
            className={`relative z-10 cursor-pointer rounded-full px-2.5 py-1 text-xs font-medium transition-colors duration-200 sm:px-4 sm:py-1.5 sm:text-sm ${
              activeSection === id
                ? "text-white"
                : "text-zinc-400 hover:text-zinc-100"
            }`}
          >
            <span className="sm:hidden">{short}</span>
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}

        <div className="mx-1 h-3.5 w-px bg-white/15 sm:mx-1.5 sm:h-4" />

        <a
          href={personal.social.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="relative z-10 rounded-full p-1.5 text-zinc-400 transition-colors hover:text-zinc-100 sm:p-2"
        >
          <GitHubIcon size={13} />
        </a>
        <a
          href={personal.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="relative z-10 rounded-full p-1.5 text-zinc-400 transition-colors hover:text-zinc-100 sm:p-2"
        >
          <LinkedInIcon size={13} />
        </a>
      </div>
    </div>
  );
}
