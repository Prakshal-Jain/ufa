"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

/**
 * Scroll spine. Behavior wrapper (no DOM box). Under reduced motion this is the
 * BASE path: the effect early-returns, no Lenis is created, native scroll is
 * preserved (no scroll-jacking, ever). When motion is allowed Lenis eases native
 * scroll, driven off the GSAP ticker, with ScrollTrigger kept in sync.
 *
 * All GSAP/Lenis usage is guarded inside useEffect so it stays a client leaf and
 * never touches window/document during SSR/static export.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotionSafe();

  useEffect(() => {
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [reduced]);

  return <>{children}</>;
}
