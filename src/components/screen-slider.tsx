"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ProjectImage } from "@/content/work";
import { cx } from "./ui";

/* Project images one at a time. Swipe or scroll on touch, arrows and dots everywhere.
   Built on CSS scroll-snap, so it still works without JS. With one image it is just the image. */
export function ScreenSlider({ images, title }: { images: ProjectImage[]; title: string }) {
  const track = useRef<HTMLDivElement>(null);
  const slides = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = track.current;
    if (!root || images.length < 2) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      { root, threshold: 0.6 },
    );
    slides.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [images.length]);

  const go = (n: number) => {
    const i = (n + images.length) % images.length;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    slides.current[i]?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest", inline: "start" });
  };

  const multi = images.length > 1;

  return (
    <div role={multi ? "region" : undefined} aria-roledescription={multi ? "carousel" : undefined} aria-label={multi ? `${title} images` : undefined}>
      <div
        ref={track}
        tabIndex={multi ? 0 : undefined}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(active + 1);
          if (e.key === "ArrowLeft") go(active - 1);
        }}
        className="flex snap-x snap-mandatory overflow-x-auto rounded-[20px] bg-surface-muted [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus [&::-webkit-scrollbar]:hidden"
      >
        {images.map((img, i) => (
          <div
            key={img.src}
            ref={(el) => {
              slides.current[i] = el;
            }}
            data-i={i}
            role={multi ? "group" : undefined}
            aria-roledescription={multi ? "slide" : undefined}
            aria-label={multi ? `${i + 1} of ${images.length}` : undefined}
            className="relative aspect-[16/9] w-full flex-none snap-start"
          >
            <Image src={img.src} alt={img.alt} fill priority={i === 0} sizes="(min-width: 1024px) 680px, 100vw" className="object-contain" />
          </div>
        ))}
      </div>

      {multi && (
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                aria-label={`Show image ${i + 1}`}
                aria-current={i === active}
                onClick={() => go(i)}
                className={cx("h-1.5 rounded-full transition-all duration-300", i === active ? "w-6 bg-ink" : "w-1.5 bg-ink/20 hover:bg-ink/40")}
              />
            ))}
            <span className="ml-3 text-[13px] text-ink-muted tabular-nums">
              {active + 1} / {images.length}
            </span>
          </div>
          <div className="flex gap-2">
            {[
              ["Previous image", -1, "←"],
              ["Next image", 1, "→"],
            ].map(([label, step, glyph]) => (
              <button
                key={label as string}
                type="button"
                aria-label={label as string}
                onClick={() => go(active + (step as number))}
                className="flex size-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink"
              >
                <span aria-hidden="true">{glyph}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
