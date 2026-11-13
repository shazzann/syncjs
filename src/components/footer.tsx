import Link from "next/link";
import { nav, site } from "@/content/site";
import { Logo } from "./logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="container-site">
      <div className="grid gap-10 border-t border-ink/10 py-12 md:grid-cols-12">
        <div className="md:col-span-6">
          <Logo />
        </div>
        <nav aria-label="Footer" className="md:col-span-3">
          <ul className="space-y-2">
            {[...nav, { label: "Contact", href: "/contact" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-[14px] text-ink-muted transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="space-y-2 md:col-span-3">
          <li>
            <a href={`mailto:${site.email}`} className="text-[14px] text-ink-muted transition-colors hover:text-ink">
              {site.email}
            </a>
          </li>
          {site.social.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-[14px] text-ink-muted capitalize transition-colors hover:text-ink">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-1 pb-10 text-[13px] text-ink-muted sm:flex-row sm:justify-between">
        <p>
          © {year} {site.legalName}
        </p>
        <p>
          {site.location.city}, {site.location.country}
        </p>
      </div>
    </footer>
  );
}
