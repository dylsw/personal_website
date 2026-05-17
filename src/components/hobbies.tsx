'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { hobbies, type GameEntry, type TravelEntry, type KeyboardEntry } from '@/data';
import { useInView } from '@/lib/use-in-view';

// ── Seeded rotations so polaroids look hand-placed ──────────────────────────
const POLAROID_ROTATIONS = [-3.5, 2.2, -1.8, 3.8, -2.5, 1.5, -4.0, 2.8, -1.2, 3.2];

const GAME_GRADIENTS = [
  'from-violet-950 to-indigo-900',
  'from-rose-950 to-pink-900',
  'from-amber-950 to-orange-900',
  'from-emerald-950 to-teal-900',
  'from-sky-950 to-blue-900',
  'from-fuchsia-950 to-purple-900',
];

// ── Game card ────────────────────────────────────────────────────────────────
function GameCard({ game, index }: { game: GameEntry; index: number }) {
  const gradient = GAME_GRADIENTS[index % GAME_GRADIENTS.length];
  return (
    <div className="group flex-shrink-0" style={{ width: '130px' }}>
      <div
        className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${gradient} shadow-md transition-all duration-300 group-hover:-translate-y-2.5 group-hover:shadow-xl group-hover:shadow-black/60`}
        style={{ height: '160px' }}
      >
        {game.cover ? (
          <Image src={game.cover} alt={game.title} fill className="object-cover" />
        ) : (
          <div className="flex h-full flex-col justify-end p-3">
            <span className="text-[11px] font-semibold leading-snug text-white/75">
              {game.title}
            </span>
          </div>
        )}
      </div>
      {game.platform && (
        <p className="mt-1.5 text-center text-[10px] text-zinc-600">{game.platform}</p>
      )}
    </div>
  );
}

// ── Polaroid travel card ─────────────────────────────────────────────────────
function TravelCard({ entry, index }: { entry: TravelEntry; index: number }) {
  const [hovered, setHovered] = useState(false);
  const baseRot = POLAROID_ROTATIONS[index % POLAROID_ROTATIONS.length];

  return (
    <div
      className="flex-shrink-0"
      style={{
        width: '160px',
        transform: `rotate(${hovered ? 0 : baseRot}deg) translateY(${hovered ? '-10px' : '0'})`,
        transition: 'transform 300ms ease',
        transformOrigin: 'bottom center',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Polaroid body */}
      <div
        className="bg-white pb-9 pt-2.5 px-2.5 shadow-lg"
        style={{ boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.5)' : '0 4px 16px rgba(0,0,0,0.3)' }}
      >
        <div className="relative overflow-hidden" style={{ height: '130px' }}>
          {entry.image ? (
            <Image src={entry.image} alt={entry.location} fill className="object-cover" />
          ) : (
            <div className="h-full bg-zinc-200" />
          )}
        </div>
        <div className="mt-2">
          <p className="text-center text-[11px] italic text-zinc-500">{entry.caption}</p>
          <p className="mt-0.5 text-center text-[10px] text-zinc-400">{entry.location}</p>
        </div>
      </div>
    </div>
  );
}

// ── Keyboard card ────────────────────────────────────────────────────────────
function KeyboardCard({ kb }: { kb: KeyboardEntry }) {
  return (
    <div
      className="group relative flex-shrink-0 overflow-hidden rounded-xl border border-white/8 bg-zinc-900/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-white/15 hover:shadow-lg hover:shadow-black/40"
      style={{ width: '260px', height: '170px' }}
    >
      {kb.image ? (
        <>
          <Image src={kb.image} alt={kb.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/60 to-zinc-900/80" />
      )}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-sm font-semibold text-zinc-100">{kb.name}</p>
        <div className="mt-0.5 flex gap-2">
          {kb.switches && (
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-zinc-400">
              {kb.switches}
            </span>
          )}
          {kb.layout && (
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-zinc-400">
              {kb.layout}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Shelf row ────────────────────────────────────────────────────────────────
function ShelfRow({ label, children, extraPadY = 0 }: { label: string; children: React.ReactNode; extraPadY?: number }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft]   = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateFades = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    updateFades();
    const id = setTimeout(updateFades, 120);
    return () => clearTimeout(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const maskImage = [
    canLeft  ? 'transparent 0%, black 8%' : 'black 0%',
    canRight ? 'black 92%, transparent 100%' : 'black 100%',
  ].join(', ');

  return (
    <div>
      <p className="mb-3 pl-6 text-xs font-semibold uppercase tracking-widest text-zinc-500">
        {label}
      </p>

      <div
        ref={scrollRef}
        onScroll={updateFades}
        className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          paddingTop: `${extraPadY}px`,
          paddingBottom: `${extraPadY + 4}px`,
          WebkitMaskImage: `linear-gradient(to right, ${maskImage})`,
          maskImage: `linear-gradient(to right, ${maskImage})`,
        }}
      >
        <div className="flex w-max gap-4 px-6">
          {children}
        </div>
      </div>

      {/* Shelf edge */}
      <div className="h-px bg-white/8" />
      <div className="h-2 bg-gradient-to-b from-black/15 to-transparent" />
    </div>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────
export function Hobbies() {
  const [headingRef, headingInView] = useInView();
  const [contentRef, contentInView] = useInView(0.05);

  return (
    <section id="hobbies" className="py-24">
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
          Hobbies
        </h2>

        <div
          ref={contentRef as React.RefObject<HTMLDivElement>}
          className="flex flex-col gap-10 rounded-2xl border border-white/6 bg-zinc-900/30 py-7"
          style={{
            opacity: contentInView ? 1 : 0,
            transform: contentInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 600ms ease 100ms, transform 600ms ease 100ms',
          }}
        >
          <ShelfRow label="Gaming" extraPadY={12}>
            {hobbies.gaming.map((game, i) => (
              <GameCard key={game.title} game={game} index={i} />
            ))}
          </ShelfRow>

          <ShelfRow label="Travel" extraPadY={14}>
            {hobbies.travel.map((entry, i) => (
              <TravelCard key={entry.location} entry={entry} index={i} />
            ))}
          </ShelfRow>

          <ShelfRow label="Keyboards" extraPadY={6}>
            {hobbies.keyboards.map((kb) => (
              <KeyboardCard key={kb.name} kb={kb} />
            ))}
          </ShelfRow>
        </div>
      </div>
    </section>
  );
}
