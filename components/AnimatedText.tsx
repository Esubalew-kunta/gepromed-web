"use client";

import { motion, useReducedMotion } from "motion/react";

/* Per-letter "write-on" reveal. Letters fade + rise in sequence on mount.
   Accessibility: the full string is exposed via aria-label, and the animated
   letter spans are aria-hidden. Reduced-motion renders the text instantly.
   Words are kept as nowrap units so lines break only between words. */
export function AnimatedText({
  text,
  className = "",
  delay = 0,
  step = 0.03,
  y = 12,
}: {
  text: string;
  className?: string;
  delay?: number;
  step?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(" ");
  let i = 0; // running letter index across the whole string for a smooth stagger

  return (
    <span className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap" aria-hidden>
          {Array.from(word).map((ch) => {
            const d = delay + i * step;
            i += 1;
            return (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1], delay: d }}
              >
                {ch}
              </motion.span>
            );
          })}
          {wi < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
