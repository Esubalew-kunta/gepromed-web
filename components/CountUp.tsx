"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/* Number that counts up from 0 to its target when scrolled into view, and
   again on hover. Preserves any prefix/suffix ("+", "%", ",") so the displayed
   value stays exactly as written. Reduced-motion and no-JS both show the final
   value (SSR renders the real number, animation only enhances it). */
export function CountUp({
  value,
  className = "",
  duration = 1.3,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduce = useReducedMotion();

  // Split "prefix + digits + suffix", e.g. "+1150", "96%", "1,150+", "40+".
  const match = value.match(/^(\D*)([\d.,]+)(\D*)$/);
  const prefix = match?.[1] ?? "";
  const numStr = match?.[2] ?? "";
  const suffix = match?.[3] ?? "";
  const grouped = numStr.includes(",");
  const target = numStr ? Number(numStr.replace(/,/g, "")) : NaN;
  const fmt = (n: number) => (grouped ? n.toLocaleString("en-US") : String(n));

  // SSR / no-JS / reduced-motion: show the real final number.
  const [display, setDisplay] = useState(numStr);

  const run = () => {
    if (reduce || !Number.isFinite(target)) {
      setDisplay(fmt(target));
      return;
    }
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(fmt(Math.round(v))),
    });
    return controls;
  };

  useEffect(() => {
    if (!inView) return;
    const controls = run();
    return () => controls?.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  // If the value isn't numeric, just render it untouched.
  if (!Number.isFinite(target)) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span
      ref={ref}
      className={className}
      onMouseEnter={() => run()}
      aria-label={value}
    >
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
