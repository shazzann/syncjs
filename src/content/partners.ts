// Clients shown on the home and about pages. Logos live in /public/clients/
// (transparent PNG or SVG). They scroll in an endless carousel; with only a few
// logos the list is repeated so the strip is always full.

export type Partner = { name: string; kind: "client" | "partner"; href?: string; logo?: string };

export const partners: Partner[] = [
  { name: "Almera", kind: "client", href: "https://almera.lk", logo: "/clients/almera.png" },
  { name: "Colombo Cosmetics", kind: "client", href: "https://colombocosmetics.lk", logo: "/clients/colombo-cosmetics.png" },
  { name: "Sambol", kind: "client", href: "https://sambol.shazion.com", logo: "/clients/sambol.png" },
];
