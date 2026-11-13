import type { Service } from "@/content/services";
import { ButtonLink, cx } from "./ui";

/* Tile looks, in order: the featured dark tile, then three quieter variations. */
const looks = [
  { tile: "bg-ink text-canvas lg:col-span-7 lg:row-span-2", muted: "text-on-brand-muted", chip: "border-canvas/15 text-on-brand-muted", rule: "border-canvas/10" },
  { tile: "bg-surface border border-ink/10 lg:col-span-5", muted: "text-ink-muted", chip: "border-ink/10 text-ink-muted", rule: "border-ink/10" },
  { tile: "bg-highlight/60 lg:col-span-5", muted: "text-brand/70", chip: "border-brand/15 text-brand/80", rule: "border-brand/10" },
  { tile: "bg-surface border border-ink/10 lg:col-span-6", muted: "text-ink-muted", chip: "border-ink/10 text-ink-muted", rule: "border-ink/10" },
  { tile: "bg-surface-muted lg:col-span-6", muted: "text-ink-muted", chip: "border-ink/10 text-ink-muted", rule: "border-ink/10" },
];

/* Services as a bento: the first service in services.ts is the large dark feature tile,
   the rest sit around it in varied tiles. One column on phones. */
export function ServicesBento({ services }: { services: Service[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-5">
      {services.map((s, i) => {
        const look = looks[i] ?? looks[looks.length - 1]!;
        const featured = i === 0;
        return (
          <li
            key={s.slug}
            id={s.slug}
            data-reveal
            style={{ ["--d" as string]: i }}
            className={cx(
              "group relative flex scroll-mt-24 flex-col overflow-hidden rounded-[20px] p-7 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 md:p-9",
              featured && "md:col-span-2",
              look.tile,
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <span className={cx("text-[13px] tabular-nums", look.muted)}>{String(i + 1).padStart(2, "0")}</span>
            </div>

            <h3
              className={cx(
                "mt-10 font-medium tracking-[-0.04em]",
                featured ? "max-w-[12ch] text-[40px] leading-[1] md:text-[60px]" : "text-[28px] leading-[1.05] md:text-[32px]",
              )}
            >
              {s.name}
            </h3>
            <p className={cx("mt-4 max-w-[42ch] leading-7", featured ? "text-[18px]" : "text-[15px] leading-6", look.muted)}>{featured ? s.detail : s.line}</p>

            <div className={cx("mt-auto pt-10", featured && "md:pt-16")}>
              {featured && (
                <ul className="mb-8 space-y-2.5">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-3 text-[15px]">
                      <span aria-hidden="true" className="size-1.5 flex-none rounded-full bg-action-on-brand" />
                      {d}
                    </li>
                  ))}
                </ul>
              )}
              <div className={cx("flex flex-wrap items-center gap-3 border-t pt-5", look.rule)}>
                <div className="flex flex-wrap gap-1.5">
                  {s.stack.map((t) => (
                    <span key={t} className={cx("inline-flex h-7 items-center rounded-full border px-3 text-[12px]", look.chip)}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              {featured && (
                <ButtonLink href="/contact" variant="on-brand" arrow className="mt-8">
                  Book a call
                </ButtonLink>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
