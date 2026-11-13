// Case studies, imported from the projects/ inbox (see projects/README.md).
//
// Images live in public/work/<slug>/: cover.(jpg|png|webp) plus optional 01, 02, ...
// for the gallery. They are picked up automatically (src/lib/project-images.ts).
// New projects arrive through the projects/ inbox folder (see projects/README.md).
// Only slug, title, sector, year and summary are required; everything else is optional
// and simply not shown when missing (e.g. image-only projects with no live link).

export type Outcome = { value: string; unit?: string; caption: string };

export type ProjectImage = { src: string; alt: string; width?: number; height?: number };

export type CaseStudy = {
  slug: string;
  title: string;
  sector: string;
  year: number;
  summary: string;
  client?: string;
  duration?: string;
  stack?: string[];
  problem?: string;
  built?: string[];
  result?: string;
  outcomes?: Outcome[];
  featured?: boolean;
  /** Live, public link. Leave out for internal or login-only projects. */
  url?: string;
  /** Filled automatically from public/work/<slug>/cover.* (or public/work/<slug>.*). */
  image?: ProjectImage;
  /** Filled automatically from the other images in public/work/<slug>/, in filename order. */
  gallery?: ProjectImage[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "almera-ecommerce",
    title: "Online store for Almera",
    client: "Almera",
    sector: "fashion",
    year: 2026,
    url: "https://almera.lk",
    stack: ["Next.js", "Tailwind CSS", "Supabase", "Cloudflare", "Payments.lk"],
    summary: "A mobile-first store for a Sri Lankan boutique selling Pakistani lawn suits, shalwar kameez and lehengas.",
    problem:
      "Almera sold through Instagram, so every order meant messages to check stock, sizes and payment, with no catalogue and no order tracking.",
    built: [
      "Catalogue with filters, sizes and stitched or unstitched options",
      "Cash on delivery, bank transfer and card checkout",
      "Live stock by size, held during card payment",
      "Admin console for orders, payments, products and promo codes",
      "Order tracking and confirmation emails",
    ],
    featured: true,
  },
  {
    slug: "colombocosmetics-ecommerce",
    title: "Online store for Colombo Cosmetics",
    client: "Colombo Cosmetics",
    sector: "beauty",
    year: 2026,
    url: "https://colombocosmetics.lk",
    stack: ["TanStack Start", "TypeScript", "Supabase", "Cloudflare", "Payments.lk"],
    summary: "A mobile-first store for a beauty and fragrance retailer trading since 1999, delivering to all 25 districts.",
    problem:
      "Twenty-five years in retail, but every online sale ran through WhatsApp and phone calls, with stock, delivery fees and payments checked by hand.",
    built: [
      "Storefront with brands, shades, reviews, wishlist and bundles",
      "Card and cash-on-delivery checkout with island-wide delivery rules",
      "Variant-level stock that never oversells",
      "Role-based admin with an insights dashboard and audit log",
      "Google Shopping feed, GA4 and Meta Conversions API",
      "Public product API readable by search engines and AI assistants",
    ],
    featured: true,
  },
  {
    slug: "sambol",
    title: "Online ordering for Sambol",
    client: "Concept project",
    sector: "food & beverage",
    year: 2026,
    url: "https://sambol.shazion.com",
    stack: ["Next.js", "Prisma", "PostgreSQL", "Cloudflare R2", "PayHere"],
    summary: "A mobile-first menu and checkout for a Colombo street-food kitchen, with WhatsApp ordering built in.",
    problem: "Small restaurants take orders over WhatsApp and calls, with no live menu, no stock count and no single record of orders.",
    built: [
      "Menu with search, categories and shareable dish pages",
      "Pay online with PayHere, or send the order through WhatsApp",
      "Live stock, with portions held during payment",
      "Admin panel for orders, menu, stock and revenue",
    ],
  },
  {
    slug: "colombocosmetics-oms",
    title: "Order management app for Colombo Cosmetics",
    client: "Colombo Cosmetics",
    sector: "beauty",
    year: 2026,
    stack: ["React", "Node.js", "Express", "Prisma", "PostgreSQL"],
    summary: "An installable web app the team uses to take orders, work out shipping and profit, and track every delivery.",
    built: [
      "Fast order entry with drafts, a product picker and shipping options",
      "Shipping, COD commission and profit worked out per order",
      "Status tracking from pending to delivered or returned",
      "Receipts and delivery labels shared to WhatsApp in one tap",
      "Sales reports with CSV export, and separate admin and staff roles",
    ],
    featured: true,
  },
  
];

export const featuredWork = caseStudies.filter((c) => c.featured);

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

