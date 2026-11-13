import type { Metadata } from "next";
import { absoluteUrl, site } from "@/content/site";

/* Per-page metadata with canonical URL and matching Open Graph / Twitter fields. */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
}: {
  title?: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title: title ? `${title} · ${site.name}` : `${site.name} · ${site.tagline}`,
      description,
      siteName: site.name,
      locale: "en_US",
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} · ${site.name}` : `${site.name} · ${site.tagline}`,
      description,
    },
  };
}

export const organizationId = absoluteUrl("/#organization");

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": organizationId,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: absoluteUrl("/brand/syncjs-logo.png"),
    image: absoluteUrl("/opengraph-image"),
    description: site.description,
    slogan: site.tagline,
    email: site.email,
    ...(site.phone ? { telephone: site.phone } : {}),
    foundingDate: String(site.foundedYear),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressCountry: site.location.countryCode,
    },
    areaServed: "Worldwide",
    knowsAbout: ["Web development", "Web applications", "Internal tools", "Mobile apps", "Next.js", "React", "Node.js", "PostgreSQL"],
    sameAs: site.social.map((s) => s.href),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: site.url,
    name: site.name,
    publisher: { "@id": organizationId },
    inLanguage: "en",
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
