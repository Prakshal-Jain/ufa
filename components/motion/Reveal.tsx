"use client";

import { motion } from "motion/react";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";
import { tokens } from "@/styles/tokens";

/**
 * Entrance primitive. Under reduced motion this is the BASE path: children
 * render directly, fully visible (opacity 1, no transform), with NO transition.
 * When motion is allowed it fades + slides children in on scroll-into-view.
 * Animates transform/opacity ONLY (never layout-shifting properties).
 */
export function Reveal({
  children,
  y = 24,
  delay = 0,
}: {
  children: React.ReactNode;
  y?: number;
  delay?: number;
}) {
  const reduced = useReducedMotionSafe();
  if (reduced) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: tokens.revealDuration, delay, ease: tokens.easeOut }}
    >
      {children}
    </motion.div>
  );
}
