"use client";

import { MotionConfig } from "motion/react";

/**
 * Global motion contract for the whole app. `reducedMotion="user"` makes
 * prefers-reduced-motion the BASE path: every Motion animation that touches
 * transform/layout is automatically suppressed for users who ask for it.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
