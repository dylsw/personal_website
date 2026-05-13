"use client";

import Image from "next/image";
import { useState } from "react";
import { experiences } from "@/data";
import { renderRichText } from "@/lib/rich-text";

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
      className={`flex-shrink-0 text-zinc-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function CompanyLogo({ src, name }: { src: string; name: string }) {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return (
      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-zinc-100/80 text-xs font-bold text-zinc-400">
        {name[0]}
      </div>
    );
  }
  return (
    <div className="relative h-7 w-7 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-100/80">
      <Image
        src={src}
        alt={name}
        fill
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
  return (
    <div>
      <button
        onClick={onToggle}
        className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-white/40"
      >
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-sm font-semibold text-zinc-800">
            {exp.role}
          </span>
          <span className="text-xs text-zinc-400">{exp.period}</span>
          {!open && (
            <span className="mt-2.5 text-sm leading-relaxed text-zinc-400">
              {exp.flavour}
            </span>
          )}
        </div>

        <div className="flex flex-shrink-0 items-center pt-0.5">
          <ChevronIcon open={open} />
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-3.5 px-4 pb-4 pt-1">
          <p className="text-sm text-zinc-500">{exp.description}</p>

          <ul className="flex flex-col gap-2">
            {exp.bullets.map((b, i) => (
              <li
                key={i}
                className="flex gap-2.5 text-sm leading-relaxed text-zinc-600"
              >
                <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-zinc-300" />
                <span>{renderRichText(b)}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5">
            {exp.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-100/80 px-3 py-1 text-xs font-medium text-zinc-500"
              >
                {tag}
              </span>
            ))}
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

  // Track which role indices are open; first role open by default
  const [openRoles, setOpenRoles] = useState<Set<number>>(new Set([0]));

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
    <div className="relative md:pl-9">
      {!isLast && (
        <span className="absolute left-[7px] top-4 hidden h-full w-px bg-zinc-200/80 md:block" />
      )}

      {/* Dot — fills when any role is open, desktop only */}
      <span
        className={`absolute left-0 top-[14px] hidden h-[15px] w-[15px] rounded-full ring-[3px] ring-[#fafaf8] transition-colors duration-200 md:block ${
          anyOpen ? "bg-zinc-900" : "bg-zinc-300"
        }`}
      />

      <div className="overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/70 shadow-[0_4px_24px_rgba(0,0,0,0.05)] backdrop-blur-md">
        {/* Company header */}
        <div className="flex items-center gap-2.5 px-4 py-3">
          <CompanyLogo src={logo} name={company} />
          <span className="text-sm font-bold tracking-tight text-zinc-700">
            {company}
          </span>
          {roles.length > 1 && (
            <span className="ml-auto rounded-full bg-zinc-100/80 px-2 py-0.5 text-[11px] font-medium text-zinc-400">
              {roles.length} roles
            </span>
          )}
        </div>

        <div className="border-t border-zinc-100/80">
          {roles.map((exp, i) => (
            <div key={exp.role}>
              {i > 0 && <div className="mx-4 border-t border-zinc-100/80" />}
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
  return (
    <section id="experience" className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="mb-10 text-3xl font-bold tracking-tight text-zinc-900">
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
