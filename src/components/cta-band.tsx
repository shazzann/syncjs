import { site } from "@/content/site";
import { ButtonLink } from "./ui";

/* Closing call to action on a dark panel: one line, one button. */
export function CtaBand() {
  return (
    <section aria-labelledby="cta-title" className="container-site pb-6">
      <div data-reveal className="rounded-[20px] bg-ink px-6 py-20 text-canvas sm:px-10 md:px-16 md:py-28">
        <h2 id="cta-title" className="max-w-[16ch] text-[44px] leading-[1] font-medium tracking-[-0.05em] md:text-[80px]">
          Have a project in mind?
        </h2>
        <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
          <ButtonLink href="/contact" variant="on-brand" arrow>
            Book a call
          </ButtonLink>
          <a href={`mailto:${site.email}`} className="text-[15px] text-on-brand-muted transition-colors hover:text-canvas">
            {site.email}
          </a>
        </div>
      </div>
    </section>
  );
}
