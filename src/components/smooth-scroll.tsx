"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/* Smooth, slightly inertial scrolling for mouse wheel and trackpad, plus smooth in-page
   anchor jumps (e.g. /#services). Touch keeps the device's native scrolling.
   Off for visitors who prefer reduced motion. */
export function SmoothScroll() {
  const lenis = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const l = new Lenis({ duration: 1.1, smoothWheel: true, anchors: { offset: -72 } });
    lenis.current = l;
    let raf = requestAnimationFrame(function loop(t) {
      l.raf(t);
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      l.destroy();
      lenis.current = null;
    };
  }, []);

  // New page: start at the top (or at the hash target) without a long glide.
  useEffect(() => {
    const l = lenis.current;
    if (!l) return;
    if (window.location.hash) l.scrollTo(window.location.hash, { offset: -72 });
    else l.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
