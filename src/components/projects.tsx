"use client";

import Image from "next/image";
import { useRef, useState, useCallback, useEffect } from "react";
import { projects, type Project, type ProjectCategory } from "@/data";
import { useInView } from "@/lib/use-in-view";
import { renderRichText } from "@/lib/rich-text";

type Tab = ProjectCategory;
type TaggedProject = { project: Project; category: ProjectCategory };

const TABS: { id: Tab; label: string }[] = [
  { id: "work", label: "Work" },
  { id: "personal", label: "Personal & Hackathon" },
];

const HEADER_GRADIENT: Record<ProjectCategory, string> = {
  work: "from-violet-500/25 to-indigo-500/25",
  personal: "from-rose-500/25 to-pink-500/25",
};

const BORDER_ACCENT: Record<ProjectCategory, string> = {
  work: "border-l border-violet-400/40",
  personal: "border-l border-rose-400/40",
};

const TOP_ACCENT: Record<ProjectCategory, string> = {
  work: "border-t-2 border-violet-400/50",
  personal: "border-t-2 border-rose-400/50",
};

function FlipIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-zinc-600"
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

function ExternalLinkIcon({ size = 13 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

const CARD_HEIGHT = 480;
// Vertical breathing room so overflow-x:auto doesn't implicitly clip the 3D flip
const CLIP_PAD = 24;

function ProjectCard({
  project,
  category,
  flipped,
  navigating,
  onToggle,
}: {
  project: Project;
  category: ProjectCategory;
  flipped: boolean;
  navigating: boolean;
  onToggle: () => void;
}) {
  const [imgErrored, setImgErrored] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const backScrollRef = useRef<HTMLDivElement>(null);
  const href = project.href;

  const checkHint = useCallback(() => {
    const el = backScrollRef.current;
    if (!el) return;
    setShowHint(el.scrollHeight > el.clientHeight + el.scrollTop + 4);
  }, []);

  // Pre-calculate on mount so the hint is ready before the first flip
  useEffect(() => {
    const id = setTimeout(checkHint, 100);
    return () => clearTimeout(id);
  }, [checkHint]);

  // Hold hint until flip-back animation finishes, then reset scroll + re-measure
  useEffect(() => {
    if (!flipped) {
      const id = setTimeout(() => {
        if (backScrollRef.current) backScrollRef.current.scrollTop = 0;
        checkHint();
      }, 650);
      return () => clearTimeout(id);
    }
  }, [flipped, checkHint]);

  const faceBase = `absolute inset-0 overflow-hidden rounded-2xl border border-white/8 bg-zinc-900/75 ${BORDER_ACCENT[category]}`;
  const backFaceInner = `relative h-full overflow-hidden rounded-2xl border border-white/8 bg-zinc-900/75 ${BORDER_ACCENT[category]} ${TOP_ACCENT[category]}`;

  return (
    <div
      className="w-full"
      style={{ padding: `${CLIP_PAD}px 0`, cursor: "pointer", touchAction: flipped ? "auto" : "pan-y" }}
      onClick={onToggle}
    >
      {/* Scale wrapper — shrinks slightly while scrolling between cards */}
      <div
        style={{
          transition: "transform 0.35s cubic-bezier(0.4, 0.2, 0.2, 1)",
          transform: navigating ? "scale(0.93)" : "scale(1)",
        }}
      >
        <div style={{ perspective: "1400px", height: `${CARD_HEIGHT}px` }}>
          {/* Flip container */}
          <div
            className="relative h-full w-full"
            style={{
              transformStyle: "preserve-3d",
              transition: "transform 0.65s cubic-bezier(0.4, 0.2, 0.2, 1)",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* ── Front face ── */}
            <div
              className={`${faceBase} flex flex-col`}
              style={{ backfaceVisibility: "hidden" }}
            >
              <div
                className={`relative h-44 sm:h-75 w-full flex-shrink-0 bg-gradient-to-br ${HEADER_GRADIENT[category]}`}
              >
                {project.image && !imgErrored && (
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover"
                    onError={() => setImgErrored(true)}
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-semibold leading-snug text-zinc-200">
                    {project.name}
                  </h4>
                  <FlipIcon />
                </div>
                {project.front.map((para, i) => (
                  <p key={i} className="text-sm leading-relaxed text-zinc-400">
                    {renderRichText(para)}
                  </p>
                ))}
              </div>
            </div>

            {/* ── Back face — full content, no image ── */}
            <div
              className="absolute inset-0"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              {/* Clip wrapper keeps rounded corners; scroll container sits inside */}
              <div className={backFaceInner}>
                <div
                  ref={backScrollRef}
                  className="h-full overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  onScroll={checkHint}
                >
                  <div className="flex min-h-full flex-col gap-3 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-semibold leading-snug text-zinc-200">
                        {project.name}
                      </h4>
                      <div className="mt-0.5 flex flex-shrink-0 items-center gap-2">
                        {href && (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-zinc-500 transition-colors hover:text-zinc-200"
                          >
                            <ExternalLinkIcon size={14} />
                          </a>
                        )}
                        <FlipIcon />
                      </div>
                    </div>

                    {project.back.description && (
                      <p className="text-sm leading-relaxed text-zinc-400">
                        {renderRichText(project.back.description)}
                      </p>
                    )}
                    {project.back.bullets &&
                      project.back.bullets.length > 0 && (
                        <ul className="flex flex-col gap-2">
                          {project.back.bullets.map((b, i) => (
                            <li
                              key={i}
                              className="flex gap-2.5 text-sm leading-relaxed text-zinc-400"
                            >
                              <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-zinc-600" />
                              <span>{renderRichText(b)}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                    <div className="flex flex-col gap-1.5 pt-3">
                      {project.tagLabel && (
                        <span className="text-xs font-medium text-zinc-500">
                          {project.tagLabel}
                        </span>
                      )}
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-zinc-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scroll hint — fades out once the user reaches the bottom */}
                <div
                  className="pointer-events-none absolute bottom-3 left-0 right-0 flex justify-center transition-opacity duration-300"
                  style={{ opacity: showHint ? 1 : 0 }}
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/30">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-black"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavArrow({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Previous" : "Next"}
      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur-sm transition-all duration-150 ${
        disabled
          ? "cursor-not-allowed opacity-25"
          : "hover:border-white/25 hover:bg-white/15"
      }`}
    >
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
        className={`text-zinc-300 ${direction === "right" ? "rotate-180" : ""}`}
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>
  );
}

function Carousel({ items }: { items: TaggedProject[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const [flippedName, setFlippedName] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [navigating, setNavigating] = useState(false);

  const updateState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActiveIndex(Math.min(index, items.length - 1));
  }, [items.length]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
    setTimeout(() => {
      setFlippedName(null);
      setActiveIndex(0);
      setNavigating(false);
    }, 0);
    updateState();
    const id = setTimeout(updateState, 100);
    return () => clearTimeout(id);
  }, [items, updateState]);

  // Zoom back in reliably when snap settles (scrollend fires after snap animation completes)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScrollEnd = () => {
      updateState();
      setNavigating(false);
    };
    el.addEventListener("scrollend", onScrollEnd);
    return () => el.removeEventListener("scrollend", onScrollEnd);
  }, [updateState]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateState();
    // Stay zoomed out while between snap points; zoom in only when aligned
    const rem = el.scrollLeft % el.clientWidth;
    const isAligned = rem < 4 || rem > el.clientWidth - 4;
    setNavigating(!isAligned);
  }, [updateState]);

  const scrollTo = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    setFlippedName(null);
    el.scrollBy({
      left: dir === "left" ? -el.clientWidth : el.clientWidth,
      behavior: "smooth",
    });
  };

  const slotHeight = CARD_HEIGHT + CLIP_PAD * 2;

  return (
    <div className="flex flex-col gap-3">
      {/* Scroll track */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto [scroll-snap-type:x_mandatory] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ height: `${slotHeight}px` }}
      >
        {items.map(({ project, category }) => (
          <div
            key={project.name}
            className="w-full flex-shrink-0 [scroll-snap-align:start]"
          >
            <ProjectCard
              project={project}
              category={category}
              flipped={flippedName === project.name}
              navigating={navigating}
              onToggle={() =>
                setFlippedName((prev) =>
                  prev === project.name ? null : project.name,
                )
              }
            />
          </div>
        ))}
      </div>

      {/* Bottom controls: arrows flanking the dot indicators */}
      {items.length > 1 && (
        <div className="-mt-4 flex items-center justify-center gap-3">
          <NavArrow
            direction="left"
            onClick={() => scrollTo("left")}
            disabled={!canLeft}
          />
          <div className="flex items-center gap-1.5">
            {items.map(({ project }, index) => (
              <span
                key={project.name}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "w-5 bg-zinc-300"
                    : "w-1.5 bg-zinc-600"
                }`}
              />
            ))}
          </div>
          <NavArrow
            direction="right"
            onClick={() => scrollTo("right")}
            disabled={!canRight}
          />
        </div>
      )}
    </div>
  );
}

const ALL_PROJECTS: TaggedProject[] = [
  ...projects.work.map((p) => ({ project: p, category: "work" as const })),
  ...projects.personal.map((p) => ({
    project: p,
    category: "personal" as const,
  })),
];

const TAB_ORDER: Tab[] = ["work", "personal"];

export function Projects() {
  const [headingRef, headingInView] = useInView();
  const [contentRef, contentInView] = useInView(0.05);
  const [activeTab, setActiveTab] = useState<Tab>("work");
  const [phase, setPhase] = useState<"idle" | "exit" | "enter">("idle");
  const [slideDir, setSlideDir] = useState<"left" | "right">("left");

  const switchTab = (tab: Tab) => {
    if (tab === activeTab || phase !== "idle") return;
    const dir =
      TAB_ORDER.indexOf(tab) > TAB_ORDER.indexOf(activeTab) ? "left" : "right";
    setSlideDir(dir);
    setPhase("exit");
    setTimeout(() => {
      setActiveTab(tab);
      setPhase("enter");
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setPhase("idle")),
      );
    }, 180);
  };

  const exitX = slideDir === "left" ? "-32px" : "32px";
  const enterX = slideDir === "left" ? "32px" : "-32px";
  const panelStyle: React.CSSProperties =
    phase === "idle"
      ? {
          opacity: 1,
          transform: "translateX(0)",
          transition: "opacity 220ms ease, transform 220ms ease",
        }
      : phase === "exit"
        ? {
            opacity: 0,
            transform: `translateX(${exitX})`,
            transition: "opacity 180ms ease, transform 180ms ease",
          }
        : {
            opacity: 0,
            transform: `translateX(${enterX})`,
            transition: "none",
          };

  const filtered = ALL_PROJECTS.filter((p) => p.category === activeTab);

  return (
    <section id="projects" className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h2
          ref={headingRef as React.RefObject<HTMLHeadingElement>}
          className="mb-8 text-3xl font-bold tracking-tight text-zinc-100"
          style={{
            opacity: headingInView ? 1 : 0,
            transform: headingInView ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 500ms ease, transform 500ms ease",
          }}
        >
          Projects
        </h2>

        <div
          ref={contentRef as React.RefObject<HTMLDivElement>}
          style={{
            opacity: contentInView ? 1 : 0,
            transform: contentInView ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 550ms ease 100ms, transform 550ms ease 100ms",
          }}
        >
          <div className="mb-1 flex gap-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => switchTab(tab.id)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-white text-zinc-900"
                    : "bg-white/10 text-zinc-400 hover:bg-white/15 hover:text-zinc-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={panelStyle}>
            <Carousel items={filtered} />
          </div>
        </div>
      </div>
    </section>
  );
}
