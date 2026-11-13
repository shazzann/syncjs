import Link from "next/link";
import type { CaseStudy } from "@/content/work";
import Image from "next/image";
import { Arrow, cx } from "./ui";

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/* Image first, then title and the headline result. */
export function ProjectCard({
  work,
  tone,
  aspect = "aspect-[16/9]",
  sizes = "(min-width: 768px) 50vw, 100vw",
  headingLevel = "h3",
  large,
  priority,
}: {
  work: CaseStudy;
  tone?: number;
  aspect?: string;
  sizes?: string;
  headingLevel?: "h2" | "h3";
  large?: boolean;
  priority?: boolean;
}) {
  const Heading = headingLevel;
  const o = work.outcomes?.[0];
  return (
    <Link href={`/work/${work.slug}`} className="group block min-w-0 rounded-[20px] focus-visible:outline-offset-4">
      <div className={cx("relative overflow-hidden rounded-[20px] bg-surface-muted", aspect)}>
        {work.image ? (
          <Image src={work.image.src} alt={work.image.alt} fill sizes={sizes} priority={priority} className="ease-img object-cover" />
        ) : (
          <span aria-hidden="true" className="absolute bottom-6 left-6 text-[13px] text-ink-muted capitalize">
            {work.sector}
          </span>
        )}
      </div>
      <div className={cx("mt-5 grid gap-3", large && "md:grid-cols-12 md:items-end md:gap-6")}>
        <div className={large ? "md:col-span-7" : undefined}>
          <p className="text-[13px] text-ink-muted">
            {cap(work.sector)}, {work.year}
          </p>
          <Heading
            className={cx(
              "mt-1.5 font-medium tracking-[-0.03em] text-ink",
              large ? "text-[26px] leading-[1.1] md:text-[34px]" : "text-[22px] leading-[1.15] md:text-[24px]",
            )}
          >
            {work.title}
          </Heading>
        </div>
        <div className={cx("flex items-end justify-between gap-6", large && "md:col-span-5")}>
          {o && (
            <p className="text-[14px] leading-5 text-ink-muted">
              <span className="mr-1.5 font-medium text-ink">
                {o.value}
                {o.unit}
              </span>
              {o.caption}
            </p>
          )}
          <span className="hidden flex-none items-center gap-1.5 text-[14px] text-ink sm:inline-flex">
            View <Arrow />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* Home layout: one wide featured project, then two side by side. */
export function ProjectShowcase({ items }: { items: CaseStudy[] }) {
  const [first, ...rest] = items;
  return (
    <div className="space-y-16 md:space-y-20">
      {first && (
        <div data-reveal>
          <ProjectCard work={first} tone={0} aspect="aspect-[16/9]" sizes="100vw" large priority />
        </div>
      )}
      {rest.length > 0 && (
        <div className="grid gap-16 md:grid-cols-2 md:gap-8">
          {rest.map((w, i) => (
            <div key={w.slug} data-reveal style={{ ["--d" as string]: i }}>
              <ProjectCard work={w} tone={i + 1} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
