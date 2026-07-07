"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  to: number;
  suffix?: string;
  durationMs?: number;
};

/**
 * Counts from 0 up to `to` the first time it scrolls into view.
 * Honors prefers-reduced-motion by rendering the final value immediately.
 */
export default function CountUp({
  to,
  suffix = "",
  durationMs = 1400,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let raf = 0;
    let done = false;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      // async (rAF) rather than a synchronous setState in the effect body
      raf = requestAnimationFrame(() => setValue(to));
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || done) return;
          done = true;
          observer.unobserve(entry.target);

          let startTime: number | null = null;
          const step = (now: number) => {
            if (startTime === null) startTime = now;
            const progress = Math.min((now - startTime) / durationMs, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            setValue(Math.round(eased * to));
            if (progress < 1) raf = requestAnimationFrame(step);
          };
          raf = requestAnimationFrame(step);
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, durationMs]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
