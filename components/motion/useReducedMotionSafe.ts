"use client";

import { useReducedMotion } from "motion/react";

/**
 * Single gate every motion primitive calls. Returns true when motion should be
 * suppressed. Defaults to true before hydration resolves so reduced motion is
 * the base path, not an afterthought.
 */
export function useReducedMotionSafe(): boolean {
  return useReducedMotion() ?? true;
}
