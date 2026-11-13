// What SyncJS offers.

export type Service = {
  slug: string;
  icon: "Globe" | "AppWindow" | "Smartphone" | "Palette" | "LayoutDashboard" | "ShoppingCart" | "Cloud" | "Plug" | "LifeBuoy";
  name: string;
  line: string;
  detail: string;
  deliverables: string[];
  stack: string[];
  timeline: string;
};

export const services: Service[] = [
  {
    slug: "e-commerce",
    icon: "ShoppingCart",
    name: "E-commerce",
    line: "Online stores with local payments, delivery rules and live stock.",
    detail: "Custom storefronts connected to your stock, payment gateway and courier, built for how Sri Lankans shop.",
    deliverables: ["Storefront and checkout", "Card, COD and bank transfer", "Admin for orders and stock"],
    stack: ["next.js", "supabase", "payments.lk / payhere"],
    timeline: "4-10 weeks",
  },
  {
    slug: "ai-whatsapp-automation",
    icon: "Plug",
    name: "AI and WhatsApp automation",
    line: "Assistants and WhatsApp flows that answer, take orders and follow up, day and night.",
    detail: "Customers ask, order and get updates on WhatsApp, while an AI assistant trained on your products handles the routine questions.",
    deliverables: ["WhatsApp ordering and booking flows", "AI assistants trained on your products", "Reminders, follow-ups and order updates"],
    stack: ["whatsapp cloud api", "ai assistants", "node.js"],
    timeline: "2-6 weeks",
  },
  {
    slug: "websites",
    icon: "Globe",
    name: "Websites",
    line: "Fast, search-friendly sites that turn visitors into enquiries.",
    detail: "Sites that load in under a second, rank well and are easy to update without a developer.",
    deliverables: ["Design and copy structure", "CMS your team can use", "SEO and analytics set up"],
    stack: ["next.js", "sanity", "vercel"],
    timeline: "3-6 weeks",
  },
  {
    slug: "web-apps",
    icon: "AppWindow",
    name: "Web apps and SaaS",
    line: "Portals, booking systems and the back office behind them.",
    detail: "From first sketch to paying users: accounts, payments, dashboards and the admin side nobody sees.",
    deliverables: ["Product design", "Auth, roles and payments", "Dashboards and reports"],
    stack: ["react", "node.js", "postgres"],
    timeline: "8-16 weeks",
  },
  {
    slug: "mobile-apps",
    icon: "Smartphone",
    name: "Mobile apps",
    line: "iOS and Android from one codebase, installable from day one.",
    detail: "Native-feeling apps and installable web apps that share logic with your website.",
    deliverables: ["iOS and Android builds", "Installable web apps", "Push notifications"],
    stack: ["react native", "expo", "pwa"],
    timeline: "6-14 weeks",
  },
];

export const support = {
  icon: "LifeBuoy" as const,
  name: "Support after launch",
  line: "Every project includes a support period. After that, a monthly plan covers updates, monitoring and small changes, handled by the people who built it.",
};


export const stack = [
  "TypeScript", "React", "Next.js", "Node.js", "React Native", "Expo", "PostgreSQL", "Prisma",
  "Redis", "Tailwind CSS", "Figma", "AWS", "Vercel", "Docker", "GitHub Actions", "Shopify",
] as const;
