"use client";

// Testimonials: the active card sits in front, its neighbours tilt away behind it.
// Bottom bar: average rating, previous / counter / next, and clients served.
// Structure from the stagger-testimonials template and the reference design; SyncJS colours, no glow.

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type StaggerTestimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  rating?: number;
  photo?: string;
};

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");

const CUT = "polygon(0 0, calc(100% - 44px) 0, 100% 44px, 100% 100%, 0 100%)";

function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("flex gap-0.5", className)} aria-label={`${value} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={15} strokeWidth={0} className={i < Math.round(value) ? "fill-current" : "fill-current opacity-25"} aria-hidden="true" />
      ))}
    </span>
  );
}

function Card({ t, active }: { t: StaggerTestimonial; active: boolean }) {
  return (
    <figure
      className={cn("flex h-full flex-col rounded-[18px] p-7 sm:p-10", active ? "bg-ink text-canvas" : "border border-line bg-surface text-ink")}
      style={{ clipPath: CUT }}
    >
      <span aria-hidden="true" className={cn("font-serif text-[72px] leading-[0.6]", active ? "text-action-on-brand" : "text-link/60")}>
        &ldquo;
      </span>
      <blockquote className="mt-6 text-[19px] leading-[1.4] font-medium tracking-[-0.015em] sm:text-[23px]">{t.quote}</blockquote>
      <figcaption className={cn("mt-auto flex items-center gap-4 border-t pt-6", active ? "border-canvas/15" : "border-line")}>
        {t.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={t.photo} alt="" className="size-12 flex-none rounded-xl object-cover" />
        ) : (
          <span
            aria-hidden="true"
            className={cn("flex size-12 flex-none items-center justify-center rounded-xl text-[15px] font-semibold", active ? "bg-canvas text-ink" : "bg-surface-muted text-link")}
          >
            {initials(t.name)}
          </span>
        )}
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[16px] font-semibold">{t.name}</span>
          <span className={cn("block truncate text-[14px]", active ? "text-on-brand-muted" : "text-ink-muted")}>
            {t.role}, {t.company}
          </span>
        </span>
        {t.rating && <Stars value={t.rating} className={cn("hidden flex-none sm:flex", active ? "text-action-on-brand" : "text-link")} />}
      </figcaption>
    </figure>
  );
}

export function StaggerTestimonials({ items, clients = [] }: { items: StaggerTestimonial[]; clients?: string[] }) {
  const [active, setActive] = useState(Math.min(1, items.length - 1));
  const n = items.length;
  const go = (step: number) => setActive((a) => (a + step + n) % n);

  const rated = items.filter((t) => t.rating);
  const average = rated.length ? rated.reduce((s, t) => s + (t.rating ?? 0), 0) / rated.length : 0;

  // Offset of each card from the active one, wrapping around: -1 left, 0 centre, 1 right.
  const offset = (i: number) => {
    let d = i - active;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };

  return (
    <div className="container-site">
      <div className="relative h-[460px] sm:h-[480px]" aria-live="polite">
        {items.map((t, i) => {
          const d = offset(i);
          const visible = Math.abs(d) <= 1;
          return (
            <div
              key={i}
              aria-hidden={d !== 0 || undefined}
              onClick={() => d !== 0 && visible && go(d)}
              className={cn(
                "absolute top-1/2 left-1/2 h-[420px] w-[min(460px,88vw)] transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none sm:h-[440px]",
                d === 0 ? "z-20 cursor-default" : "z-10 cursor-pointer",
                !visible && "pointer-events-none",
                d !== 0 && "max-sm:opacity-0!",
              )}
              style={{
                transform:
                  d === 0
                    ? "translate(-50%, -50%)"
                    : `translate(calc(-50% + ${d * 62}%), calc(-50% + 22px)) rotate(${d * 2.5}deg) scale(0.9)`,
                opacity: d === 0 ? 1 : visible ? 0.5 : 0,
              }}
            >
              <Card t={t} active={d === 0} />
            </div>
          );
        })}
      </div>

      <div className="mt-10 grid items-center gap-8 border-t border-line pt-8 md:grid-cols-3">
        <div className="flex items-center gap-3">
          {average > 0 && (
            <>
              <Stars value={average} className="text-link" />
              <span className="text-[24px] font-semibold tracking-[-0.02em] text-ink">
                {average.toFixed(1)}
                <span className="text-[15px] font-normal text-ink-muted"> / 5</span>
              </span>
              <span className="text-[14px] text-ink-muted">Average across every review</span>
            </>
          )}
        </div>

        <div className="flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="flex size-14 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-canvas"
          >
            <ChevronLeft size={20} strokeWidth={1.75} />
          </button>
          <span className="text-[15px] text-ink-muted tabular-nums">
            <span className="font-semibold text-ink">{String(active + 1).padStart(2, "0")}</span> / {String(n).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="flex size-14 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-canvas"
          >
            <ChevronRight size={20} strokeWidth={1.75} />
          </button>
        </div>

        {clients.length > 0 && (
          <div className="md:text-right">
            <p className="text-[13px] text-ink-muted">Clients served</p>
            <p className="mt-1 text-[15px] font-semibold text-ink">{clients.join(", ")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
