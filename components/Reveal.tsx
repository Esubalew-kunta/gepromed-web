"use client";

import { useEffect, useRef, useState } from "react";

/* Reveal: a restrained, senior-grade scroll entrance. A single short fade + rise
   as the element enters the viewport, once. No parallax, no loops, no bounce.
   Fully safe: honours prefers-reduced-motion (renders instantly), and if
   IntersectionObserver is unavailable it shows immediately (never hides content). */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined" || !el) {
      setShown(true);
      return;
    }
    // Anything already on screen at mount shows at once (no waiting on async IO,
    // and we do not animate what the visitor can already see).
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    io.observe(el);
    // Safety net: content must never stay hidden if the observer never fires.
    const fallback = window.setTimeout(() => setShown(true), 1500);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  const Comp = Tag as React.ElementType;
  return (
    <Comp
      ref={ref}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
      className={[
        "transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none",
        shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
        className,
      ].join(" ")}
    >
      {children}
    </Comp>
  );
}
