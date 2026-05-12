'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { heroPhotos, personal } from '@/data';
import { renderRichText } from '@/lib/rich-text';

const STRIP = [...heroPhotos, ...heroPhotos];

const PLACEHOLDER_COLORS = [
  'from-violet-500/20 to-indigo-500/20',
  'from-rose-500/20 to-pink-500/20',
  'from-amber-500/20 to-orange-500/20',
  'from-emerald-500/20 to-teal-500/20',
  'from-sky-500/20 to-blue-500/20',
  'from-fuchsia-500/20 to-purple-500/20',
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
        className="object-cover transition-transform duration-500 hover:scale-105"
        sizes="(max-width: 640px) 256px, 320px"
        onError={() => setImgSrc('/placeholder.png')}
      />
    </div>
  );
}

export function Hero() {
  const trackRef = useRef<HTMLDivElement>(null);

  const pause  = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'paused';  };
  const resume = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'running'; };

  // 8 seconds per photo — adjust in src/data/index.ts by changing heroPhotos.length
  const duration = `${heroPhotos.length * 8}s`;

  return (
    <section
      id="hero"
      className="flex min-h-screen flex-col items-center justify-center gap-12 py-24"
    >
      {/* Text */}
      <div className="flex max-w-xl flex-col items-center gap-3 px-6 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-zinc-900 sm:text-6xl">
          I&apos;m {personal.name}
        </h1>
        <p className="text-lg font-medium text-zinc-500">
          {personal.title}
        </p>
        {personal.bio.map((line, i) => (
          <p key={i} className="text-base leading-relaxed text-zinc-500">
            {renderRichText(line)}
          </p>
        ))}
      </div>

      {/* Photo strip */}
      <div
        className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)]"
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
    </section>
  );
}
