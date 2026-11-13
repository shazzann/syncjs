import { ClientMarquee } from "@/components/client-marquee";
import { CtaBand } from "@/components/cta-band";
import { Hero } from "@/components/hero";
import { ServicesBento } from "@/components/services-bento";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import { JsonLd, Section, TextLink } from "@/components/ui";
import { ProjectShowcase } from "@/components/work-card";
import { partners } from "@/content/partners";
import { services, support } from "@/content/services";
import { absoluteUrl, site } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import { caseStudies } from "@/content/work";
import { withProjectImages } from "@/lib/project-images";
import { organizationId, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  description: site.description,
  path: "/",
});

export default function HomePage() {
  const work = withProjectImages(caseStudies).slice(0, 3);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "OfferCatalog",
          name: `${site.name} services`,
          url: absoluteUrl("/#services"),
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.name, description: s.detail, provider: { "@id": organizationId } },
          })),
        }}
      />

      <Hero />

      {/* Work: one wide featured project, then two side by side */}
      <section aria-labelledby="work-title" className="container-site pb-20 md:pb-28">
        <div className="flex items-baseline justify-between gap-6 border-t border-ink/10 pt-8 pb-10">
          <h2 id="work-title" className="text-[15px] font-medium text-ink">
            Selected work
          </h2>
          <TextLink href="/work">All projects</TextLink>
        </div>
        <ProjectShowcase items={work} />
      </section>

      {/* Clients: full-width carousel */}
      <section aria-labelledby="clients-title" className="pb-20 md:pb-28">
        <div className="container-site">
          <h2 id="clients-title" className="border-t border-ink/10 pt-8 pb-10 text-[15px] font-medium text-ink">
            Clients we&apos;ve worked with
          </h2>
        </div>
        <ClientMarquee />
      </section>

      {/* Testimonials: staggered cards, full width */}
      <section aria-labelledby="testimonials-title" className="overflow-x-clip pb-20 md:pb-28">
        <div className="container-site">
          <h2 id="testimonials-title" className="border-t border-ink/10 pt-8 pb-6 text-[15px] font-medium text-ink">
            What clients say
          </h2>
        </div>
        <StaggerTestimonials items={testimonials} clients={partners.map((p) => p.name)} />
      </section>

      {/* Services: bento, E-commerce as the featured tile */}
      <section id="services" aria-labelledby="services-title" className="container-site scroll-mt-16 pb-20 md:pb-28">
        <div className="border-t border-ink/10 pt-8">
          <p className="text-[15px] font-medium text-ink">Services</p>
          <h2 id="services-title" data-reveal className="mt-6 max-w-[18ch] text-[40px] leading-[1.02] font-medium tracking-[-0.045em] text-ink md:text-[64px]">
            Software that sells, serves and saves you time.
          </h2>
        </div>
        <div className="mt-12 md:mt-16">
          <ServicesBento services={services} />
        </div>
        <p data-reveal className="mt-8 max-w-[64ch] text-[15px] leading-6 text-ink-muted">
          <span className="font-medium text-ink">{support.name}.</span> {support.line}
        </p>
      </section>

      <CtaBand />
    </>
  );
}
