// Company-wide facts. Everything marked PLACEHOLDER must be confirmed before launch.

export const site = {
  name: "SyncJS",
  legalName: "SyncJS", // PLACEHOLDER: registered company name
  tagline: "Software that holds up.",
  description:
    "SyncJS designs, builds and looks after websites, web apps and internal tools for growing businesses. Fixed scope, weekly demos, the same people after launch.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://syncjs.com").replace(/\/$/, ""), // PLACEHOLDER domain
  email: "hello@syncjs.com", // PLACEHOLDER
  phone: "" as string, // optional, e.g. "+94 77 000 0000"
  location: { city: "Colombo", country: "Sri Lanka", countryCode: "LK" }, // PLACEHOLDER
  foundedYear: 2024, // PLACEHOLDER
  responseTime: "Replies within one working day.",
  social: [
    { label: "linkedin", href: "https://www.linkedin.com/company/syncjs" }, // PLACEHOLDER
    { label: "github", href: "https://github.com/syncjs" }, // PLACEHOLDER
  ],
} as const;

export const nav = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
] as const;

export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
