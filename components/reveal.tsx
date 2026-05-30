"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** ms to wait after the element enters the viewport before revealing. */
  delay?: number;
};

/**
 * Fades + slides children in once they scroll into view.
 *
 * Initial state is hidden (opacity-0 + translate-y-6). An IntersectionObserver
 * promotes it to visible the first time the element intersects, then disconnects.
 *
 * Fallbacks:
 * - `prefers-reduced-motion: reduce` — no transition, instant visible.
 * - No JavaScript — globals.css overrides [data-reveal] to opacity:1 via
 *   @media (scripting: none) so SSR content stays accessible.
 */
export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            window.setTimeout(() => setRevealed(true), delay);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      data-reveal
      data-revealed={revealed ? "true" : "false"}
      className={[
        "motion-safe:transition-[opacity,transform] motion-safe:duration-700 motion-safe:ease-out",
        revealed
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6 motion-reduce:opacity-100 motion-reduce:translate-y-0",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
