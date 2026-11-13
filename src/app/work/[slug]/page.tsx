import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/cta-band";
import { ScreenSlider } from "@/components/screen-slider";
import { JsonLd, Section, StatRow } from "@/components/ui";
import { ProjectCard } from "@/components/work-card";
import { absoluteUrl } from "@/content/site";
import { caseStudies, getCaseStudy } from "@/content/work";
import { withProjectImage } from "@/lib/project-images";
import { breadcrumbJsonLd, organizationId, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const work = getCaseStudy((await params).slug);
  if (!work) return {};
  return pageMetadata({ title: work.title, description: work.summary, path: `/work/${work.slug}`, type: "article" });
}

const host = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

export default async function CaseStudyPage({ params }: Props) {
  const found = getCaseStudy((await params).slug);
  if (!found) notFound();
  const work = withProjectImage(found);

  const i = caseStudies.findIndex((c) => c.slug === work.slug);
  const next = caseStudies.length > 1 ? withProjectImage(caseStudies[(i + 1) % caseStudies.length]!) : null;

  const images = [...(work.image ? [work.image] : []), ...(work.gallery ?? [])];

  // Only show the details we actually have.
  const facts = [
    ["Client", work.client],
    ["Year", String(work.year)],
    ["Timeline", work.duration],
    ["Stack", work.stack?.join(", ")],
  ].filter((f): f is [string, string] => Boolean(f[1]));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: work.title, path: `/work/${work.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: work.title,
            abstract: work.summary,
            url: absoluteUrl(`/work/${work.slug}`),
            dateCreated: String(work.year),
            genre: work.sector,
            ...(work.stack ? { keywords: work.stack.join(", ") } : {}),
            ...(work.url ? { sameAs: work.url } : {}),
            creator: { "@id": organizationId },
            ...(work.image ? { image: absoluteUrl(work.image.src) } : {}),
          },
        ]}
      />

      <article>
        {/* Title and details on the left, the screens slider beside it */}
        <header className="container-site grid gap-10 pt-14 pb-20 md:pt-20 md:pb-28 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-5">
            <nav aria-label="Breadcrumb" className="fade-up text-[14px] text-ink-muted">
              <Link href="/work" className="transition-colors hover:text-ink">
                Work
              </Link>
            </nav>
            <h1 className="fade-up mt-4 text-[38px] leading-[1.04] font-medium tracking-[-0.045em] text-ink md:text-[52px]" style={{ ["--d" as string]: 80 }}>
              {work.title}
            </h1>
            <p className="fade-up mt-6 max-w-[46ch] text-[17px] leading-7 text-ink-muted" style={{ ["--d" as string]: 140 }}>
              {work.summary}
            </p>
            {work.url && (
              <a
                href={work.url}
                target="_blank"
                rel="noopener noreferrer"
                className="fade-up group mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-[14px] font-medium text-canvas transition-colors hover:bg-brand"
                style={{ ["--d" as string]: 200 }}
              >
                Visit {host(work.url)}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
            )}
            {facts.length > 0 && (
              <dl className="fade-up mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink/10 pt-6 text-[14px]" style={{ ["--d" as string]: 240 }}>
                {facts.map(([k, v]) => (
                  <div key={k} className={k === "Stack" ? "col-span-2" : undefined}>
                    <dt className="text-ink-muted">{k}</dt>
                    <dd className="mt-1 text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          <div className="fade-up lg:col-span-7" style={{ ["--d" as string]: 200 }}>
            {images.length > 0 && <ScreenSlider images={images} title={work.title} />}
          </div>
        </header>

        <div>
          {work.outcomes && work.outcomes.length > 0 && (
            <Section id="results-title" label="Results">
              <StatRow stats={work.outcomes} />
            </Section>
          )}

          {work.problem && (
            <Section id="problem-title" label="The problem">
              <p data-reveal className="max-w-[40ch] text-[22px] leading-[1.45] tracking-[-0.01em] text-ink md:text-[26px]">
                {work.problem}
              </p>
            </Section>
          )}

          {work.built && work.built.length > 0 && (
            <Section id="built-title" label="What we built">
              <ul className="grid gap-x-8 sm:grid-cols-2">
                {work.built.map((b, n) => (
                  <li key={b} data-reveal style={{ ["--d" as string]: n % 2 }} className="border-b border-ink/10 py-5 text-[16px] leading-6 text-ink first:pt-0 sm:[&:nth-child(2)]:pt-0">
                    {b}
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>
      </article>

      {next && (
        <Section id="next-title" label="Next project">
          <div data-reveal className="max-w-[720px]">
            <ProjectCard work={next} tone={(i + 1) % caseStudies.length} />
          </div>
        </Section>
      )}

      <CtaBand />
    </>
  );
}
