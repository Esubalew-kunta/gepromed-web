"use client";

import { motion, useReducedMotion } from "motion/react";

/* Gepromed-themed ambient textures, on-brand and restrained.
   ScanSweep: a soft light band drifting down over a dark instrument panel,
   like a radiograph / CT scan pass. PulseLine: an ECG-style heartbeat trace
   that draws itself, echoing the patient-safety mission. Both honour
   prefers-reduced-motion (render static, no looping). */

export function ScanSweep({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-brand-300/10 via-brand-200/5 to-transparent ${className}`}
      initial={{ y: "-120%" }}
      animate={{ y: "560%" }}
      transition={{ duration: 9, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
    />
  );
}

export function PulseLine({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <svg
      aria-hidden
      viewBox="0 0 240 40"
      preserveAspectRatio="none"
      className={`pointer-events-none ${className}`}
      fill="none"
    >
      <motion.path
        d="M0 20 H70 L80 20 L88 8 L98 34 L108 14 L116 20 H150 L160 20 L168 12 L176 26 L184 20 H240"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0.9 }}
        animate={reduce ? { pathLength: 1, opacity: 0.6 } : { pathLength: 1, opacity: 0.9 }}
        transition={reduce ? undefined : { duration: 2.2, ease: "easeInOut", repeat: Infinity, repeatType: "loop", repeatDelay: 1.2 }}
      />
    </svg>
  );
}
