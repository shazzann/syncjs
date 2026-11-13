import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="container-site pt-24 pb-32 md:pt-32">
      <p className="text-[14px] text-ink-muted">404</p>
      <h1 className="mt-3 text-[44px] leading-[1] font-medium tracking-[-0.05em] text-ink md:text-[72px]">Page not found.</h1>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/" arrow>
          Home
        </ButtonLink>
        <ButtonLink href="/work" variant="secondary">
          See our work
        </ButtonLink>
      </div>
    </section>
  );
}
