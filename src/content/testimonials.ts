// Client testimonials shown on the home page.
// PLACEHOLDER: these quotes are examples. Replace them with real quotes, with the
// client's written permission, before launch. Keep each quote to two or three lines.

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** 1 to 5. PLACEHOLDER until real reviews come in. */
  rating?: number;
  project?: string; // slug in work.ts, links the quote to its case study
};

export const testimonials: Testimonial[] = [
  {
    quote: "We stopped merging spreadsheets every morning. Head office now sees stock as it moves, across all twelve branches.",
    name: "Client name",
    role: "Operations director",
    company: "Retail chain, Colombo",
    rating: 5,
  },
  {
    quote: "Parents book and pay in the app now. Our front desk finally has time for the families who need help.",
    name: "Client name",
    role: "Founder",
    company: "Tuition network",
    rating: 5,
  },
  {
    quote: "Weekly demos meant no surprises. What we saw on Friday was exactly what went live.",
    name: "Client name",
    role: "General manager",
    company: "Courier company",
    rating: 5,
  },
];
