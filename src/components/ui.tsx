import Link from "next/link";
import type { ComponentProps, CSSProperties, ReactNode } from "react";
import type { Outcome } from "@/content/work";
import { CountUp } from "./motion";

const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

type Variant = "primary" | "secondary" | "on-brand";
const buttonBase =
  "group inline-flex items-center justify-center gap-2 rounded-full border text-[14px] leading-5 font-medium whitespace-nowrap transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:cursor-progress disabled:opacity-70";
const buttonVariants: Record<Variant, string> = {
  primary: "border-transparent bg-ink text-canvas hover:bg-brand",
  secondary: "border-ink/15 bg-transparent text-ink hover:border-ink/40",
  "on-brand": "border-transparent bg-action-on-brand text-brand hover:bg-white focus-visible:outline-action-on-brand",
};
const buttonSizes = { md: "h-11 px-5", sm: "h-9 px-4 text-[13px]" };

export function buttonClass(variant: Variant = "primary", size: keyof typeof buttonSizes = "md") {
  return cx(buttonBase, buttonVariants[variant], buttonSizes[size]);
}

export function Arrow() {
  return (
    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
      →
    </span>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  arrow,
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; size?: "md" | "sm"; arrow?: boolean }) {
  return (
    <Link className={cx(buttonClass(variant, size), className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

/* Quiet text link with arrow. */
export function TextLink({ className, children, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link className={cx("group inline-flex items-center gap-1.5 text-[14px] text-ink-muted transition-colors hover:text-ink", className)} {...props}>
      {children}
      <Arrow />
    </Link>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return <span className="inline-flex h-7 items-center rounded-full border border-ink/10 px-3 text-[13px] leading-none text-ink-muted">{children}</span>;
}

export function Stat({ value, unit, caption }: Outcome) {
  return (
    <div>
      <dt className="sr-only">{caption}</dt>
      <dd className="text-[44px] leading-none font-medium tracking-[-0.045em] text-ink md:text-[56px]">
        <CountUp value={value} />
        {unit && <span className="text-ink-muted">{unit}</span>}
      </dd>
      <dd aria-hidden="true" className="mt-3 max-w-[220px] text-[14px] leading-[22px] text-ink-muted">
        {caption}
      </dd>
    </div>
  );
}

export function StatRow({ stats, className }: { stats: Outcome[]; className?: string }) {
  return (
    <dl className={cx("grid gap-10 sm:grid-cols-3 sm:gap-8", className)}>
      {stats.map((s) => (
        <Stat key={s.caption} {...s} />
      ))}
    </dl>
  );
}

/* Editorial section: a small label column on the left, content on the right, a hairline above. */
export function Section({
  label,
  id,
  anchor,
  link,
  children,
  className,
}: {
  label: string;
  id: string;
  /** Optional id on the section itself, for in-page links like /#services. */
  anchor?: string;
  link?: { href: string; label: string };
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={anchor} aria-labelledby={id} className={cx("container-site scroll-mt-16", className)}>
      <div className="grid gap-8 border-t border-ink/10 pt-8 pb-20 md:pb-28 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-3">
          <div className="lg:sticky lg:top-24">
            <h2 id={id} className="text-[15px] font-medium text-ink">
              {label}
            </h2>
            {link && <TextLink href={link.href} className="mt-2">{link.label}</TextLink>}
          </div>
        </div>
        <div className="lg:col-span-9">{children}</div>
      </div>
    </section>
  );
}

/* Top of an inner page. */
export function PageHeader({ title, lead, children }: { label?: string; title: ReactNode; lead?: ReactNode; children?: ReactNode }) {
  return (
    <header className="container-site pt-20 pb-16 md:pt-28 md:pb-24">
      <h1 className="fade-up max-w-[18ch] text-[44px] leading-[1] font-medium tracking-[-0.05em] text-ink md:text-[72px]">{title}</h1>
      {lead && (
        <p className="fade-up mt-6 max-w-[46ch] text-[18px] leading-[30px] text-ink-muted" style={{ "--d": 120 } as CSSProperties}>
          {lead}
        </p>
      )}
      {children}
    </header>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here once "<" is escaped.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export { cx };
