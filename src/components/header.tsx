"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/content/site";
import { Logo } from "./logo";
import { buttonClass, cx } from "./ui";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // A 1px sentinel at the top of the page tells us when the user has scrolled.
  useEffect(() => {
    const sentinel = document.getElementById("top-sentinel");
    if (!sentinel) return;
    const io = new IntersectionObserver(([e]) => setScrolled(!e?.isIntersecting));
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cx(
        "sticky top-0 z-40 border-b transition-[background-color,border-color] duration-300",
        scrolled || open ? "border-ink/10 bg-canvas/85 backdrop-blur-md" : "border-transparent bg-canvas",
      )}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-50 focus:rounded-full focus:bg-surface focus:px-4 focus:py-2">
        Skip to content
      </a>
      <div className="container-site grid h-16 grid-cols-[1fr_auto] items-center md:grid-cols-[1fr_auto_1fr]">
        <Logo />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cx("relative py-2 text-[14px] transition-colors", isActive(item.href) ? "text-ink" : "text-ink-muted hover:text-ink")}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cx("absolute inset-x-0 -bottom-0.5 h-px origin-left bg-ink transition-transform duration-300", isActive(item.href) ? "scale-x-100" : "scale-x-0")}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end">
          <span className="hidden md:block">
            <Link href="/contact" className={buttonClass("primary", "sm")}>
              Book a call
            </Link>
          </span>
          <button
            type="button"
            className="-mr-2 inline-flex size-11 items-center justify-center rounded-full md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span className={cx("absolute left-0 h-[1.5px] w-5 bg-ink transition-transform", open ? "top-[5px] rotate-45" : "top-0")} />
              <span className={cx("absolute left-0 h-[1.5px] w-5 bg-ink transition-transform", open ? "top-[5px] -rotate-45" : "top-[10px]")} />
            </span>
          </button>
        </div>
      </div>

      <div id="mobile-menu" hidden={!open} className="h-[calc(100dvh-64px)] bg-canvas md:hidden">
        <nav aria-label="Mobile" className="container-site flex h-full flex-col pt-6 pb-8">
          <ul className="space-y-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cx("block py-2 text-[40px] leading-tight font-medium tracking-[-0.03em]", isActive(item.href) ? "text-ink" : "text-ink-muted")}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contact" onClick={() => setOpen(false)} className={cx(buttonClass("primary"), "mt-auto w-full")}>
            Book a call
          </Link>
        </nav>
      </div>
    </header>
  );
}
