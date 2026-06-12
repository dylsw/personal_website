"use client";

import Image from "next/image";
import { about } from "@/data";
import { renderRichText } from "@/lib/rich-text";
import { useInView } from "@/lib/use-in-view";

export function About() {
  const [headingRef, headingInView] = useInView();
  const [imageRef, imageInView] = useInView(0.2);
  const [textRef, textInView] = useInView(0.1);

  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col gap-8 md:grid md:grid-cols-2 md:items-center md:gap-1">
          {/* Full image — desktop only */}
          {/* Outer div is the IntersectionObserver target — never clipped so observer fires correctly */}
          <div
            ref={imageRef as React.RefObject<HTMLDivElement>}
            className="relative mx-auto hidden aspect-square w-4/5 overflow-hidden rounded-4xl md:block"
            style={{
              opacity: imageInView ? 1 : 0,
              transform: imageInView ? "translateX(0)" : "translateX(-32px)",
              transition: "opacity 700ms cubic-bezier(0.4, 0, 0.2, 1), transform 700ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <Image
              src={about.image.src}
              alt={about.image.alt}
              fill
              className="object-cover"
              sizes="50vw"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/placeholder.png";
              }}
            />
          </div>

          {/* Text */}
          <div
            ref={textRef as React.RefObject<HTMLDivElement>}
            className="flex flex-col gap-5"
          >
            {/* Heading + avatar row */}
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full md:hidden">
                <Image
                  src={about.image.src}
                  alt={about.image.alt}
                  fill
                  className="object-cover"
                  sizes="48px"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "/placeholder.png";
                  }}
                />
              </div>
              <h2
                ref={headingRef as React.RefObject<HTMLHeadingElement>}
                className="text-3xl font-bold tracking-tight text-zinc-100"
                style={{
                  opacity: headingInView ? 1 : 0,
                  transform: headingInView
                    ? "translateY(0)"
                    : "translateY(14px)",
                  transition: "opacity 500ms ease, transform 500ms ease",
                }}
              >
                About Me
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {about.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-zinc-400"
                  style={{
                    opacity: textInView ? 1 : 0,
                    transform: textInView
                      ? "translateY(0)"
                      : "translateY(12px)",
                    transition: `opacity 500ms ease ${i * 120 + 100}ms, transform 500ms ease ${i * 120 + 100}ms`,
                  }}
                >
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
