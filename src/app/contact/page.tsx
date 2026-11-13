import { ArrowUpRight } from "lucide-react";
import { BriefForm } from "@/components/brief-form";
import { CopyButton, LocalTime } from "@/components/contact-extras";
import { JsonLd } from "@/components/ui";
import { absoluteUrl, site } from "@/content/site";
import { breadcrumbJsonLd, organizationId, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Start a project",
  description: "Tell SyncJS what you want to build. Send a brief and we come back with scope, timeline and a price, usually within one working day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
          { "@context": "https://schema.org", "@type": "ContactPage", url: absoluteUrl("/contact"), about: { "@id": organizationId } },
        ]}
      />

      <section aria-labelledby="contact-title" className="container-site grid gap-12 pt-12 pb-24 md:pt-16 lg:grid-cols-12 lg:gap-12 lg:pb-32">
        {/* Left: headline, email, studio */}
        <div className="flex flex-col lg:col-span-5 lg:pt-16">
          <p className="fade-up flex items-center gap-2 text-[14px] text-ink-muted">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-signal" />
            Work with {site.name}
          </p>
          <h1 id="contact-title" className="fade-up mt-6 text-[56px] leading-[0.95] font-medium tracking-[-0.055em] md:text-[84px]" style={{ ["--d" as string]: 80 }}>
            <span className="text-ink/35">Start a</span> <span className="font-semibold text-ink">project.</span>
          </h1>
          <p className="fade-up mt-8 max-w-[40ch] text-[18px] leading-[30px] text-ink-muted" style={{ ["--d" as string]: 160 }}>
            Tell us what you are building. Send a brief and we will come back with scope, timeline and a price.
          </p>

          <dl className="fade-up mt-12 border-t border-ink/10" style={{ ["--d" as string]: 240 }}>
            <div className="border-b border-ink/10 py-7">
              <dt className="text-[13px] tracking-wide text-ink-muted uppercase">E-mail</dt>
              <dd className="mt-3 flex items-center justify-between gap-4">
                <a href={`mailto:${site.email}`} className="group inline-flex min-w-0 items-center gap-2 text-[24px] font-medium tracking-[-0.02em] text-ink md:text-[30px]">
                  <span className="truncate">{site.email}</span>
                  <ArrowUpRight size={20} strokeWidth={1.75} aria-hidden="true" className="flex-none text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <CopyButton text={site.email} />
              </dd>
            </div>
            <div className="border-b border-ink/10 py-7">
              <dt className="text-[13px] tracking-wide text-ink-muted uppercase">Studio</dt>
              <dd className="mt-3 flex items-center justify-between gap-4">
                <span className="text-[20px] font-medium text-ink">
                  {site.location.city}, {site.location.country}
                </span>
                <LocalTime timeZone="Asia/Colombo" />
              </dd>
            </div>
          </dl>
        </div>

        {/* Right: the brief form on a panel */}
        <div className="fade-up lg:col-span-7" style={{ ["--d" as string]: 200 }}>
          <div className="rounded-[28px] border border-ink/10 bg-surface p-6 sm:p-10 lg:p-12">
            <BriefForm />
          </div>
        </div>
      </section>
    </>
  );
}
