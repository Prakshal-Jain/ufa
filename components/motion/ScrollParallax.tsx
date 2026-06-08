"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { tokens } from "@/styles/tokens";

/**
 * Depth primitive. Under reduced motion this is the BASE path: children render
 * with no transform and no scroll listener. When motion is allowed it applies a
 * transform-only (translateY) parallax derived from scroll progress over `range`
 * px. Never animates top/left/width/height/margin (no layout shift).
 */
export function ScrollParallax({
  children,
  range = tokens.parallaxRange,
}: {
  children: React.ReactNode;
  range?: number;
}) {
  const reduced = useReducedMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);

  if (reduced) return <div>{children}</div>;

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
}
