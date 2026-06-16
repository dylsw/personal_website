'use client';

import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { heroPhotos, personal } from '@/data';
import { introDone } from '@/lib/intro-state';
import { renderRichText } from '@/lib/rich-text';

const STRIP = [...heroPhotos, ...heroPhotos];

const PLACEHOLDER_COLORS = [
  'from-violet-500/30 to-indigo-500/30',
  'from-rose-500/30 to-pink-500/30',
  'from-amber-500/30 to-orange-500/30',
  'from-emerald-500/30 to-teal-500/30',
  'from-sky-500/30 to-blue-500/30',
  'from-fuchsia-500/30 to-purple-500/30',
];

function PhotoCard({ src, alt, index }: { src: string; alt: string; index: number }) {
  const [imgSrc, setImgSrc] = useState(src);
  const color = PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length];

  return (
    <div
      className={`relative h-44 w-64 flex-shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br sm:h-56 sm:w-80 ${color}`}
    >
      <Image
        src={imgSrc}
        alt={alt}
        fill
        priority={index < 2}
        sizes="(max-width: 640px) 256px, 320px"
        className="object-cover transition-transform duration-500 hover:scale-105"
        onError={() => setImgSrc('/placeholder.png')}
      />
    </div>
  );
}

export function Hero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [typedText, setTypedText] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const [curtainOpen, setCurtainOpen] = useState(false);

  const pause  = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'paused';  };
  const resume = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'running'; };

  const duration = `${heroPhotos.length * 8}s`;

  // Increment to replay the typing sequence (used on bfcache restore)
  const [animKey, setAnimKey] = useState(0);

  // Replay animation when the page is restored from the back-forward cache
  useEffect(() => {
    const handler = (e: PageTransitionEvent) => {
      if (e.persisted) setAnimKey((k) => k + 1);
    };
    window.addEventListener('pageshow', handler);
    return () => window.removeEventListener('pageshow', handler);
  }, []);

  // Typewriter — waits for intro-done event on first load, then reruns on animKey changes
  useEffect(() => {
    const text = personal.greeting;
    let id: ReturnType<typeof setInterval>;

    setTimeout(() => {
      setTypedText('');
      setTypingDone(false);
      setCurtainOpen(false);
    }, 0);

    const startTyping = () => {
      let i = 0;
      id = setInterval(() => {
        i++;
        setTypedText(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(id);
          setTypingDone(true);
        }
      }, 80);
    };

    if (introDone) {
      startTyping();
    } else {
      window.addEventListener('intro-done', startTyping, { once: true });
    }

    return () => {
      clearInterval(id);
      window.removeEventListener('intro-done', startTyping);
    };
  }, [animKey]);

  // Curtain opens shortly after typing finishes
  useEffect(() => {
    if (!typingDone) return;
    const t = setTimeout(() => setCurtainOpen(true), 150);
    return () => clearTimeout(t);
  }, [typingDone]);

  return (
    <section
      id="hero"
      className="flex min-h-svh flex-col items-center justify-center gap-12 py-24"
    >
      {/* Text */}
      <div className="flex max-w-xl flex-col items-center gap-3 px-6 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-zinc-100 sm:text-6xl">
          {typedText}
          <span
            className="ml-0.5 inline-block w-[2px] align-middle bg-zinc-300"
            style={{ height: '0.85em', animation: 'cursor-blink 1000ms ease-in-out infinite' }}
          />
        </h1>

        {/* Title — fades up once typing is done */}
        <p
          className="text-lg font-medium text-zinc-400"
          style={{
            opacity: typingDone ? 1 : 0,
            transform: typingDone ? 'translateY(0px)' : 'translateY(12px)',
            transition: 'opacity 450ms ease, transform 450ms ease',
          }}
        >
          {personal.title}
        </p>

        {/* Bio lines — staggered after title */}
        {personal.bio.map((line, i) => (
          <p
            key={i}
            className="text-base leading-relaxed text-zinc-400"
            style={{
              opacity: typingDone ? 1 : 0,
              transform: typingDone ? 'translateY(0px)' : 'translateY(12px)',
              transition: `opacity 450ms ease ${(i + 1) * 120}ms, transform 450ms ease ${(i + 1) * 120}ms`,
            }}
          >
            {renderRichText(line)}
          </p>
        ))}
      </div>

      {/* Photo strip with curtain reveal */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          opacity: curtainOpen ? 1 : 0,
          transition: curtainOpen ? 'opacity 500ms ease' : 'none',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
      >

        <div
          onMouseEnter={pause}
          onMouseLeave={resume}
          onTouchStart={pause}
          onTouchEnd={resume}
        >
          <div
            ref={trackRef}
            className="flex gap-3 sm:gap-4"
            style={{ width: 'max-content', animation: `marquee ${duration} linear infinite` }}
          >
            {STRIP.map((photo, i) => (
              <PhotoCard key={i} index={i} {...photo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
