"use client";

import Link from "next/link";
import { useState } from "react";
import { useLang, loc } from "@/lib/i18n";
import { IMPLANT_CYCLE } from "@/lib/content";

/* ---- geometry helpers ------------------------------------------------- */
const CX = 200;
const CY = 200;
const R_OUT = 168;
const R_IN = 108;
const GAP = 5; // degrees between segments

function polar(r: number, angleDeg: number): [number, number] {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
}

function sectorPath(start: number, end: number): string {
  const [x1, y1] = polar(R_OUT, start);
  const [x2, y2] = polar(R_OUT, end);
  const [x3, y3] = polar(R_IN, end);
  const [x4, y4] = polar(R_IN, start);
  const large = end - start <= 180 ? 0 : 1;
  return `M${x1} ${y1} A${R_OUT} ${R_OUT} 0 ${large} 1 ${x2} ${y2} L${x3} ${y3} A${R_IN} ${R_IN} 0 ${large} 0 ${x4} ${y4} Z`;
}

/* The Implant Cycle as an instrument dial + audience wayfinding.
   The SVG is the signature visual; the list on the right holds the real,
   keyboard-focusable navigation controls. Hovering/focusing either side
   drives the shared `active` state. */
export function ImplantCycle() {
  const { lang } = useLang();
  const [active, setActive] = useState(0);
  const stages = IMPLANT_CYCLE;
  const seg = 360 / stages.length; // dial divides the circle by the stage count

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      {/* --- Dial --- */}
      <div className="relative mx-auto w-full max-w-[420px]">
        <svg
          viewBox="0 0 400 400"
          className="h-auto w-full"
          role="img"
          aria-label={
            lang === "fr"
              ? `Boucle de sécurité : ${stages.length} plateformes`
              : `Safety loop: ${stages.length} platforms`
          }
        >
          {/* faint outer registration ring + ticks */}
          <circle cx={CX} cy={CY} r={188} className="fill-none stroke-line" strokeWidth={1} />
          {Array.from({ length: 24 }).map((_, i) => {
            const [x1, y1] = polar(188, i * 15);
            const [x2, y2] = polar(i % 6 === 0 ? 178 : 183, i * 15);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                className="stroke-line"
                strokeWidth={1}
              />
            );
          })}

          {stages.map((s, i) => {
            const start = i * seg + GAP / 2;
            const end = (i + 1) * seg - GAP / 2;
            const isActive = i === active;
            const isSafety = s.safety;
            const mid = (start + end) / 2;
            const [lx, ly] = polar((R_OUT + R_IN) / 2, mid);
            const fill = isActive
              ? isSafety
                ? "fill-safety-500"
                : "fill-brand-600"
              : isSafety
                ? "fill-safety-100"
                : "fill-brand-100";
            const numColor = isActive
              ? "fill-white"
              : isSafety
                ? "fill-safety-700"
                : "fill-brand-700";
            return (
              <g key={s.n}>
                <path
                  d={sectorPath(start, end)}
                  className={`${fill} cursor-pointer transition-colors duration-300`}
                  stroke="#ffffff"
                  strokeWidth={3}
                  onMouseEnter={() => setActive(i)}
                />
                <text
                  x={lx}
                  y={ly + 6}
                  textAnchor="middle"
                  className={`${numColor} pointer-events-none font-mono text-[17px] font-semibold transition-colors duration-300`}
                >
                  {s.n}
                </text>
              </g>
            );
          })}

          {/* hub */}
          <circle cx={CX} cy={CY} r={R_IN - 12} className="fill-white stroke-line" strokeWidth={1} />
          <circle cx={CX} cy={CY} r={R_IN - 12} className="fill-none stroke-brand-200" strokeWidth={1} strokeDasharray="2 4" />
          <text x={CX} y={CY - 20} textAnchor="middle" className="fill-ink-muted font-mono text-[10px] uppercase tracking-[0.2em]">
            {lang === "fr" ? `Plateforme ${stages[active].n}` : `Platform ${stages[active].n}`}
          </text>
          <foreignObject x={CX - 82} y={CY - 8} width={164} height={64}>
            <div className="flex h-full items-center justify-center px-1 text-center">
              <span className="font-display text-[15px] font-semibold leading-tight text-ink">
                {loc(stages[active].title, lang)}
              </span>
            </div>
          </foreignObject>
        </svg>
        <div className="mono-label mt-3 text-center">
          {lang === "fr"
            ? "Boucle de sécurité · Gepromed depuis 1993"
            : "Safety loop · Gepromed since 1993"}
        </div>
      </div>

      {/* --- Audience wayfinding list --- */}
      <ul className="flex flex-col gap-2.5">
        {stages.map((s, i) => {
          const isActive = i === active;
          return (
            <li key={s.n}>
              <Link
                href={s.href}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`group block rounded-xl2 border p-4 transition duration-200 ${
                  isActive
                    ? s.safety
                      ? "border-safety-300 bg-safety-50"
                      : "border-brand-300 bg-brand-50"
                    : "border-line bg-white hover:border-brand-200"
                }`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`stat-figure mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg text-sm ${
                      s.safety
                        ? "bg-safety-500 text-white"
                        : isActive
                          ? "bg-brand-600 text-white"
                          : "bg-brand-100 text-brand-700"
                    }`}
                  >
                    {s.n}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2">
                      <h3 className="font-display text-base font-semibold text-ink">
                        {loc(s.title, lang)}
                      </h3>
                      <span className="mono-label">{loc(s.audience, lang)}</span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                      {loc(s.body, lang)}
                    </p>
                  </div>
                  <svg
                    viewBox="0 0 24 24"
                    className={`mt-1 h-4 w-4 shrink-0 transition ${
                      isActive ? "text-brand-600" : "text-ink-muted"
                    } group-hover:translate-x-0.5`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
