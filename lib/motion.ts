import type { Variants, Transition } from "motion/react";

/* Shared Framer Motion primitives so every page shares one rhythm and easing.
   Restrained, senior-grade motion: short fades + small rises, never bounce.
   All variants respect prefers-reduced-motion via MotionConfig in the layout. */

// House easing: a calm ease-out, matching the CSS transitions elsewhere.
export const EASE_OUT: Transition["ease"] = [0.22, 1, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: EASE_OUT } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: EASE_OUT } },
};

// Container that staggers its children's entrance.
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

// Standard whileInView props for scroll reveals (fire once, a bit before fully in view).
export const inViewProps = {
  initial: "hidden" as const,
  whileInView: "show" as const,
  viewport: { once: true, margin: "0px 0px -10% 0px" },
};

// Button/interactive feel.
export const tapScale = { scale: 0.97 };
export const hoverLift = { y: -2 };
