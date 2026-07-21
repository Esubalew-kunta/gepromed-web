"use client";

import { motion, MotionConfig } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

/* Route-level transition: a short fade + rise on every navigation.
   MotionConfig reducedMotion="user" makes all Motion animations honour the
   visitor's prefers-reduced-motion setting automatically. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: EASE_OUT }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
