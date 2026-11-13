import { CtaBand } from "@/components/cta-band";
import { JsonLd, PageHeader } from "@/components/ui";
import { WorkFilter } from "@/components/work-filter";
import { absoluteUrl } from "@/content/site";
import { caseStudies } from "@/content/work";
import { withProjectImages } from "@/lib/project-images";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Work",
  description: "Selected websites, web apps and internal tools built by SyncJS, with the results they delivered.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: caseStudies.map((c, i) => ({ "@type": "ListItem", position: i + 1, url: absoluteUrl(`/work/${c.slug}`), name: c.title })),
          },
        ]}
      />
      <PageHeader title="Selected work" lead="Products we designed, built and still look after." />

      <section aria-label="Case studies" className="container-site pb-24 md:pb-32">
        <WorkFilter items={withProjectImages(caseStudies)} />
      </section>
      <CtaBand />
    </>
  );
}
