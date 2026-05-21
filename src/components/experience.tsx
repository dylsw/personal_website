"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { experiences } from "@/data";
import { renderRichText } from "@/lib/rich-text";
import { useInView } from "@/lib/use-in-view";

const COMPANIES = [...new Set(experiences.map((e) => e.company))];
const BY_COMPANY = COMPANIES.reduce<Record<string, typeof experiences>>(
  (acc, co) => ({ ...acc, [co]: experiences.filter((e) => e.company === co) }),
  {},
);

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`flex-shrink-0 text-zinc-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function CompanyLogo({ src, name }: { src: string; name: string }) {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return (
      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-white/10 text-xs font-bold text-zinc-400">
        {name[0]}
      </div>
    );
  }
  return (
    <div className="relative h-7 w-7 flex-shrink-0 overflow-hidden rounded-lg bg-white/10">
      <Image
        src={src}
        alt={name}
        fill
        sizes="28px"
        className="object-contain p-0.5"
        onError={() => setErrored(true)}
      />
    </div>
  );
}

function RoleSection({
  exp,
  open,
  onToggle,
}: {
  exp: (typeof experiences)[number];
  open: boolean;
  onToggle: () => void;
}) {
  const [expanded, setExpanded] = useState(open);
  const [flavourVisible, setFlavourVisible] = useState(!open);
  const [contentVisible, setContentVisible] = useState(open);
  const prevOpen = useRef(open);

  useEffect(() => {
    if (open === prevOpen.current) return;
    prevOpen.current = open;

    if (open) {
      // Flavour height collapses instantly + expansion starts in the same frame —
      // ease-out grows ~33px in the first 16ms, cancelling the ~34px flavour slot loss
      const t0 = setTimeout(() => {
        setFlavourVisible(false);
        setExpanded(true);
      }, 0);
      // Reveal content after expansion finishes
      const t1 = setTimeout(() => setContentVisible(true), 280);
      return () => {
        clearTimeout(t0);
        clearTimeout(t1);
      };
    } else {
      // Content fades out + collapse starts + flavour height restores all at once —
      // card body loses ~300px while flavour gains ~34px: net is a continuous shrink
      const t0 = setTimeout(() => {
        setContentVisible(false);
        setExpanded(false);
        setFlavourVisible(true);
      }, 0);
      return () => clearTimeout(t0);
    }
  }, [open]);

  return (
    <div className="transition-colors [&:has(>button:hover)]:bg-white/5">
      <button
        onClick={onToggle}
        className="flex w-full items-start gap-3 px-4 py-3 text-left"
      >
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-sm font-semibold text-zinc-200">
            {exp.role}
          </span>
          <span className="text-xs text-zinc-500">{exp.period}</span>

          {/* Flavour: instant height collapse when hiding, animated restore when showing */}
          <div
            style={{
              display: "grid",
              gridTemplateRows: flavourVisible ? "1fr" : "0fr",
              marginTop: flavourVisible ? "10px" : "0px",
              transition: flavourVisible
                ? "grid-template-rows 200ms ease, margin-top 200ms ease"
                : "none",
            }}
          >
            <span
              className="overflow-hidden text-sm leading-relaxed text-zinc-500 italic"
              style={{
                opacity: flavourVisible ? 1 : 0,
                transition: "opacity 150ms ease",
              }}
            >
              {exp.flavour}
            </span>
          </div>
        </div>

        <div className="flex flex-shrink-0 items-center pt-0.5">
          <ChevronIcon open={open} />
        </div>
      </button>

      {/* Card body: grid trick for smooth height from actual content size */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: expanded ? "1fr" : "0fr",
          transition: "grid-template-rows 280ms ease-out",
        }}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-3.5 px-4 pb-4 pt-1">
            {/* Description: wipes in left-to-right on open, fades out on close */}
            <p
              className="text-sm text-zinc-400"
              style={{
                clipPath: contentVisible
                  ? "inset(0 0% 0 0)"
                  : "inset(0 100% 0 0)",
                transition: contentVisible
                  ? "clip-path 260ms ease"
                  : "clip-path 100ms ease",
              }}
            >
              {exp.description}
            </p>

            {/* Bullets: staggered cascade in, fast fade out */}
            <ul className="flex flex-col gap-2">
              {exp.bullets.map((b, i) => (
                <li
                  key={i}
                  className="flex gap-2.5 text-sm leading-relaxed text-zinc-400"
                  style={{
                    opacity: contentVisible ? 1 : 0,
                    transform: contentVisible
                      ? "translateY(0)"
                      : "translateY(6px)",
                    transition: contentVisible
                      ? `opacity 200ms ease ${i * 50 + 60}ms, transform 200ms ease ${i * 50 + 60}ms`
                      : "opacity 100ms ease, transform 100ms ease",
                  }}
                >
                  <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-zinc-600" />
                  <span>{renderRichText(b)}</span>
                </li>
              ))}
            </ul>

            {/* Tags: fade in after last bullet */}
            <div
              className="flex flex-wrap gap-1.5"
              style={{
                opacity: contentVisible ? 1 : 0,
                transition: contentVisible
                  ? `opacity 200ms ease ${exp.bullets.length * 50 + 60}ms`
                  : "opacity 100ms ease",
              }}
            >
              {exp.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompanyCard({
  company,
  isLast,
}: {
  company: string;
  isLast: boolean;
}) {
  const roles = BY_COMPANY[company];
  const logo = roles[0].logo;

  const [openRoles, setOpenRoles] = useState<Set<number>>(new Set());
  const [cardRef, cardInView] = useInView(0.1);

  const toggle = (i: number) => {
    setOpenRoles((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const anyOpen = openRoles.size > 0;

  return (
    <div
      ref={cardRef as React.RefObject<HTMLDivElement>}
      className="relative md:pl-9"
      style={{
        opacity: cardInView ? 1 : 0,
        transform: cardInView ? 'translateY(0)' : 'translateY(28px)',
        transition: 'opacity 550ms ease, transform 550ms ease',
      }}
    >
      {!isLast && (
        <span className="absolute left-[7px] top-4 hidden h-full w-px bg-white/10 md:block" />
      )}

      {/* Dot */}
      <span
        className={`absolute left-0 top-[14px] hidden h-[15px] w-[15px] rounded-full ring-[3px] ring-[#07070f] transition-colors duration-200 md:block ${
          anyOpen ? "bg-zinc-100" : "bg-zinc-600"
        }`}
      />

      <div className="overflow-hidden rounded-2xl border border-white/8 bg-zinc-900/55 backdrop-blur-md">
        {/* Company header */}
        <div className="flex items-center gap-2.5 px-4 py-3">
          <CompanyLogo src={logo} name={company} />
          <span className="text-sm font-bold tracking-tight text-zinc-200">
            {company}
          </span>
          {roles.length > 1 && (
            <span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-medium text-zinc-400">
              {roles.length} roles
            </span>
          )}
        </div>

        <div className="border-t border-white/5">
          {roles.map((exp, i) => (
            <div key={exp.role}>
              {i > 0 && <div className="mx-4 border-t border-white/5" />}
              <RoleSection
                exp={exp}
                open={openRoles.has(i)}
                onToggle={() => toggle(i)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Experience() {
  const [headingRef, headingInView] = useInView();

  return (
    <section id="experience" className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h2
          ref={headingRef as React.RefObject<HTMLHeadingElement>}
          className="mb-10 text-3xl font-bold tracking-tight text-zinc-100"
          style={{
            opacity: headingInView ? 1 : 0,
            transform: headingInView ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 500ms ease, transform 500ms ease',
          }}
        >
          Experience
        </h2>

        <div className="flex flex-col gap-4">
          {COMPANIES.map((co, i) => (
            <CompanyCard
              key={co}
              company={co}
              isLast={i === COMPANIES.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
