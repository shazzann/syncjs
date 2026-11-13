import type { CSSProperties } from "react";
import { ButtonLink } from "./ui";

const d = (ms: number) => ({ "--d": ms }) as CSSProperties;

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="container-site pt-20 pb-24 md:pt-32 md:pb-36">
      <h1 id="hero-title" className="fade-up max-w-[12ch] text-[56px] leading-[0.95] font-medium tracking-[-0.055em] text-ink md:text-[96px] lg:text-[112px]">
        Software that holds up.
      </h1>
      <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end">
        <p className="fade-up max-w-[34ch] text-[19px] leading-[30px] text-ink-muted md:col-span-6" style={d(150)}>
          We design, build and maintain websites, web apps and internal tools for growing businesses.
        </p>
        <div className="fade-up flex flex-wrap gap-3 md:col-span-6 md:justify-end" style={d(250)}>
          <ButtonLink href="/contact" arrow>
            Book a call
          </ButtonLink>
          <ButtonLink href="/work" variant="secondary">
            See our work
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
