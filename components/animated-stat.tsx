"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedStatProps = {
  /**
   * Target value as a string. Accepts forms like "120+", "4", "15+", "2".
   * Any leading non-digits + trailing non-digits are preserved as prefix/suffix
   * while only the numeric core is animated.
   */
  value: string;
  label: string;
  /** ms duration of the count-up. Defaults to 1200ms (~1.2s). */
  duration?: number;
};

function parseValue(raw: string) {
  const m = raw.match(/^(\D*)(\d+)(.*)$/);
  if (!m) return { prefix: "", target: 0, suffix: raw };
  return { prefix: m[1], target: parseInt(m[2], 10), suffix: m[3] };
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Stat tile that animates its numeric core from 0 → target the first time it
 * scrolls into view. Honors prefers-reduced-motion by jumping straight to the
 * target without animating.
 */
export function AnimatedStat({
  value,
  label,
  duration = 1200,
}: AnimatedStatProps) {
  const { prefix, target, suffix } = parseValue(value);
  const ref = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrent(target);
      setDone(true);
      return;
    }

    let raf = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          setCurrent(Math.round(target * easeOutCubic(t)));
          if (t < 1) raf = requestAnimationFrame(tick);
          else setDone(true);
        };
        raf = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target, duration, done]);

  return (
    <div ref={ref} className="flex flex-col gap-2">
      <dt className="font-display text-5xl font-black tabular-nums tracking-[-0.02em] text-ash sm:text-6xl">
        {prefix}
        {current}
        {suffix}
      </dt>
      <dd className="font-mono text-[11px] uppercase tracking-[0.22em] text-smoke">
        {label}
      </dd>
    </div>
  );
}
