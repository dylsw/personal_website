'use client';

import Image from 'next/image';
import { about } from '@/data';
import { renderRichText } from '@/lib/rich-text';

export function About() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col gap-8 md:grid md:grid-cols-2 md:items-center md:gap-16">

          {/* Full image — desktop only */}
          <div className="relative hidden aspect-square w-full overflow-hidden rounded-2xl md:block">
            <Image
              src={about.image.src}
              alt={about.image.alt}
              fill
              className="object-cover"
              sizes="50vw"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/placeholder.png';
              }}
            />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-5">
            {/* Heading + avatar row (avatar visible on mobile only) */}
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full md:hidden">
                <Image
                  src={about.image.src}
                  alt={about.image.alt}
                  fill
                  className="object-cover"
                  sizes="48px"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/placeholder.png';
                  }}
                />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
                About Me
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {about.paragraphs.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-zinc-600">
                  {renderRichText(p)}
                </p>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
