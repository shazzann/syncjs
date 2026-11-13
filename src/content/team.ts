// Founders and team. PLACEHOLDER: replace names, roles, bios and links.
// Photos: add real, natural photos to /public/team/<file>.jpg (square, 800px+)
// and set `photo`. Without a photo, initials are shown.

export type Person = {
  name: string;
  role: string;
  bio: string;
  focus: string[];
  photo?: string;
  links?: { label: string; href: string }[];
};

export const founders: Person[] = [
  {
    name: "Founder name",
    role: "Co-founder · engineering",
    bio: "Leads architecture and code review on every project. Ten years building web apps for retail and logistics before starting SyncJS.",
    focus: ["architecture", "next.js", "postgres"],
    links: [
      { label: "linkedin", href: "https://www.linkedin.com/" },
      { label: "github", href: "https://github.com/" },
    ],
  },
  {
    name: "Co-founder name",
    role: "Co-founder · product and delivery",
    bio: "Runs discovery, scope and weekly demos, and is the person clients call. Previously led product for a regional fintech.",
    focus: ["discovery", "product design", "delivery"],
    links: [{ label: "linkedin", href: "https://www.linkedin.com/" }],
  },
];

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");
}
