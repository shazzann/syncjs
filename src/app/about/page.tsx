import { ClientMarquee } from "@/components/client-marquee";
import { CtaBand } from "@/components/cta-band";
import { JsonLd, PageHeader, Section } from "@/components/ui";
import { absoluteUrl, site } from "@/content/site";
import { founders } from "@/content/team";
import { breadcrumbJsonLd, organizationId, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description: "Meet the founders of SyncJS and how we work: fixed scope, weekly demos and the same people after launch.",
  path: "/about",
});

const principles = [
  { title: "Fixed scope", line: "A written scope and price before any code." },
  { title: "Weekly demos", line: "Working software every Friday, so you can steer early." },
  { title: "Same team after launch", line: "The people who built it handle support." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            url: absoluteUrl("/about"),
            about: { "@id": organizationId },
            mainEntity: founders.map((f) => ({
              "@type": "Person",
              name: f.name,
              jobTitle: f.role,
              worksFor: { "@id": organizationId },
              ...(f.photo ? { image: absoluteUrl(f.photo) } : {}),
              sameAs: f.links?.map((l) => l.href),
            })),
          },
        ]}
      />

      <PageHeader title="A small studio that keeps client, team and code in step." lead={`Founded in ${site.location.city} in ${site.foundedYear}. We build software growing businesses can rely on.`} />

      <Section id="founders-title" label="Founders">
        <ul className="grid gap-x-8 gap-y-12 md:grid-cols-2">
          {founders.map((f, i) => (
            <li key={f.name} data-reveal style={{ ["--d" as string]: i }}>
              <h3 className="text-[22px] leading-7 font-medium tracking-[-0.02em] text-ink">{f.name}</h3>
              <p className="mt-1 text-[14px] text-ink-muted">{f.role}</p>
              <p className="mt-4 max-w-[44ch] text-[15px] leading-6 text-ink-muted">{f.bio}</p>
              {f.links && (
                <p className="mt-4 flex gap-5">
                  {f.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${f.name} on ${l.label}`}
                      className="text-[14px] text-ink capitalize underline decoration-ink/20 underline-offset-4 transition-colors hover:decoration-ink"
                    >
                      {l.label}
                    </a>
                  ))}
                </p>
              )}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="principles-title" label="How we work">
        <dl className="grid gap-8 md:grid-cols-3">
          {principles.map((p, i) => (
            <div key={p.title} data-reveal style={{ ["--d" as string]: i }}>
              <dt className="text-[17px] font-medium text-ink">{p.title}</dt>
              <dd className="mt-2 text-[15px] leading-6 text-ink-muted">{p.line}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="clients-title" label="Clients">
        <ClientMarquee contained={false} />
      </Section>

      <CtaBand />
    </>
  );
}
