import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";

/* ---------- small SVG helpers ---------- */
function Rose({
  x,
  y,
  r,
  color,
  rot = 0,
}: {
  x: number;
  y: number;
  r: number;
  color: string;
  rot?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <ellipse
          key={a}
          cy={-r * 0.55}
          rx={r * 0.5}
          ry={r * 0.62}
          fill={color}
          opacity={0.88}
          transform={`rotate(${a})`}
        />
      ))}
      <circle
        r={r * 0.52}
        fill={color}
        stroke="oklch(1 0 0 / 0.5)"
        strokeWidth={0.6}
      />
      <circle r={r * 0.24} fill="oklch(0.45 0.16 10)" opacity={0.6} />
    </g>
  );
}
function Leaf({
  x,
  y,
  rot,
  s = 1,
}: {
  x: number;
  y: number;
  rot: number;
  s?: number;
}) {
  return (
    <path
      d="M0 0 C 6 -9, 20 -9, 28 0 C 20 9, 6 9, 0 0 Z"
      transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}
      fill="var(--sage)"
      opacity={0.85}
    />
  );
}

/** Pink floral border strip (use at top/bottom of cards). */
export function FloralStrip({
  flip = false,
  className = "",
}: {
  flip?: boolean;
  className?: string;
}) {
  const pinks = [
    "oklch(0.72 0.14 5)",
    "oklch(0.8 0.1 10)",
    "oklch(0.64 0.18 8)",
    "oklch(0.93 0.04 80)",
  ];
  const items = Array.from({ length: 11 }, (_, i) => ({
    x: 22 + i * 43 + (i % 2) * 6,
    y: 28 + ((i * 17) % 22),
    r: 11 + ((i * 5) % 8),
    c: pinks[i % 4]!,
  }));
  return (
    <svg
      viewBox="0 0 480 80"
      className={className}
      style={flip ? { transform: "scaleY(-1)" } : undefined}
      aria-hidden
      preserveAspectRatio="xMidYMin slice"
    >
      {items.map((f, i) => (
        <g key={i}>
          <Leaf x={f.x - 24} y={f.y + 8} rot={160 + (i % 3) * 14} s={0.8} />
          <Leaf x={f.x + 4} y={f.y + 12} rot={20 - (i % 3) * 12} s={0.8} />
        </g>
      ))}
      {items.map((f, i) => (
        <Rose key={i} x={f.x} y={f.y} r={f.r} color={f.c} rot={i * 25} />
      ))}
    </svg>
  );
}

export function Lotus({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 50"
      className={className}
      aria-hidden
      fill="none"
      stroke="var(--crimson)"
      strokeWidth="1.4"
      strokeLinecap="round"
    >
      <path d="M40 8 C 30 18, 30 34, 40 44 C 50 34, 50 18, 40 8Z" />
      <path d="M40 44 C 24 40, 14 28, 14 16 C 28 18, 36 28, 40 44Z" />
      <path d="M40 44 C 56 40, 66 28, 66 16 C 52 18, 44 28, 40 44Z" />
      <path d="M40 44 C 20 46, 6 40, 2 30 C 16 28, 30 34, 40 44Z" />
      <path d="M40 44 C 60 46, 74 40, 78 30 C 64 28, 50 34, 40 44Z" />
    </svg>
  );
}

export function Monogram({ className = "" }: { className?: string }) {
  return (
    <div
      className={`py-2 font-script text-gold-gradient leading-[1.2] ${className}`}
    >
      {wedding.monogram.left}{" "}
      <span className="font-display text-[0.5em] italic">&amp;</span>{" "}
      {wedding.monogram.right}
    </div>
  );
}

export function LeafSprig({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 24" className={className} aria-hidden>
      <path d="M4 12 H116" stroke="var(--gold)" strokeWidth="0.8" />
      {[20, 38, 56, 74, 92].map((x, i) => (
        <g key={x}>
          <path
            d={`M${x} 12 q 6 -9 14 -8 q -4 7 -14 8z`}
            fill="var(--gold)"
            opacity={0.8 - i * 0.05}
          />
          <path
            d={`M${x} 12 q 6 9 14 8 q -4 -7 -14 -8z`}
            fill="var(--gold)"
            opacity={0.6}
          />
        </g>
      ))}
      <circle cx="60" cy="12" r="2.4" fill="var(--gold-bright)" />
    </svg>
  );
}

export function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-14 bg-gold/60" />
      <span className="text-gold">✦</span>
      <span className="h-px w-14 bg-gold/60" />
    </div>
  );
}

/** Hanging marigold garlands / fairy lights used on event cards. */
export function Garland({ kind }: { kind: "ring" | "haldi" | "reception" }) {
  const strands = [8, 24, 40, 56, 72, 88];
  const bead =
    kind === "haldi"
      ? ["oklch(0.8 0.17 75)", "oklch(0.72 0.19 55)"]
      : kind === "reception"
        ? ["oklch(0.92 0.14 90)", "oklch(0.85 0.15 80)"]
        : ["oklch(0.95 0.05 85)", "oklch(0.83 0.1 88)"];
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 h-40 overflow-hidden"
      aria-hidden
    >
      {strands.map((l, i) => {
        const len = 5 + ((i * 3) % 6);
        return (
          <div
            key={l}
            className="absolute top-0 flex origin-top flex-col items-center gap-[3px]"
            style={{
              left: `${l}%`,
              animation: `sway ${3 + (i % 3)}s ease-in-out ${i * 0.3}s infinite`,
            }}
          >
            <span className="h-3 w-px bg-gold/70" />
            {Array.from({ length: len }).map((_, j) => (
              <span
                key={j}
                className="block rounded-full"
                style={{
                  width: kind === "reception" ? 6 : 10,
                  height: kind === "reception" ? 6 : 10,
                  background: bead[j % 2],
                  boxShadow:
                    kind === "reception"
                      ? `0 0 10px 2px ${bead[0]}`
                      : "inset 0 -2px 3px oklch(0.5 0.15 60 / 0.5)",
                  animation:
                    kind === "reception"
                      ? `twinkle ${1.4 + (j % 3) * 0.5}s ease-in-out ${j * 0.2}s infinite`
                      : undefined,
                }}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

/** Falling rose petals + tiny golden flowers over the whole invitation. */
export function Petals({ count = 16 }: { count?: number }) {
  const [on, setOn] = useState(false);
  useEffect(() => setOn(true), []);
  if (!on) return null;
  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 mx-auto max-w-[480px] overflow-hidden"
      aria-hidden
    >
      {Array.from({ length: count }).map((_, i) => {
        const size = 9 + ((i * 7) % 11);
        return (
          <span
            key={i}
            className="petal"
            style={{
              left: `${(i * 37 + 7) % 100}%`,
              width: size,
              height: size,
              animationDuration: `${9 + ((i * 5) % 8)}s`,
              animationDelay: `${-((i * 3) % 12)}s`,
              ["--drift" as string]: `${(i % 2 ? 1 : -1) * (40 + ((i * 13) % 90))}px`,
            }}
          />
        );
      })}
    </div>
  );
}
