"use client";

import { useMemo, useState } from "react";
import type { CaseStudy } from "@/content/work";
import { ProjectCard } from "./work-card";
import { cx } from "./ui";

/* Sector filter above the project grid. Pattern: one wide card, then pairs;
   a leftover single card at the end also goes wide so the grid never has a gap. */
export function WorkFilter({ items }: { items: CaseStudy[] }) {
  const sectors = useMemo(() => ["all", ...Array.from(new Set(items.map((w) => w.sector)))], [items]);
  const [active, setActive] = useState("all");
  const shown = active === "all" ? items : items.filter((w) => w.sector === active);
  const wide = (i: number) => i === 0 || (i === shown.length - 1 && (shown.length - 1) % 2 === 1);

  return (
    <>
      <div role="group" aria-label="Filter projects by sector" className="-mx-1 mb-10 flex gap-1.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {sectors.map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={active === s}
            onClick={() => setActive(s)}
            className={cx(
              "inline-flex h-8 flex-none items-center rounded-full px-3.5 text-[13px] capitalize transition-colors",
              active === s ? "bg-ink text-canvas" : "text-ink-muted hover:bg-ink/5 hover:text-ink",
            )}
          >
            {s === "all" ? "All" : s}
          </button>
        ))}
      </div>
      <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 md:gap-y-20" aria-live="polite">
        {shown.map((w, i) => (
          <div key={`${active}-${w.slug}`} className={cx("fade-up", wide(i) && "md:col-span-2")} style={{ ["--d" as string]: i * 80 }}>
            <ProjectCard
              work={w}
              tone={items.indexOf(w)}
              headingLevel="h2"
              large={wide(i)}
              priority={i === 0}
              aspect="aspect-[16/9]"
              sizes={wide(i) ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
            />
          </div>
        ))}
      </div>
    </>
  );
}
