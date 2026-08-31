"use client";

import { useEffect, useRef } from "react";

/**
 * The Journey River — one continuous ribbon that lives in the shared
 * ApproachJourney wrapper and flows across BOTH the holistic-approach and
 * organic sections. The wrapper owns it; neither child renders its own copy.
 *
 * Four strokes share ONE path (per breakpoint):
 *   1. permanent green riverbed
 *   2. faint permanent blue guide
 *   3. scroll-revealed blue current   (mask)
 *   4. slow daylight highlight        (mask, same reveal)
 *
 * Scroll → mask dash offset. rAF-scheduled, passive listener, no React
 * re-render per scroll event: we only poke two CSS custom properties.
 */

const VIEWBOX = "0 0 1440 1920";

// exact path from the brief
const DESKTOP_PATH =
  "M-120 165C420-80 1230 125 1110 600C990 1080 300 905 245 1320C205 1645 775 1865 1555 1640";

// restrained vertical meander for narrow screens (same flow concept/character)
const MOBILE_PATH =
  "M300 -60C560 260 1020 470 840 830C660 1190 220 1360 430 1730C560 1970 820 2010 1180 1940";

type RibbonPathsProps = { id: string; d: string; className: string };

function RibbonPaths({ id, d, className }: RibbonPathsProps) {
  const maskId = `jr-reveal-${id}`;
  return (
    <svg
      className={className}
      viewBox={VIEWBOX}
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse">
          <path
            className="jr-reveal-path"
            d={d}
            stroke="#fff"
            strokeWidth={46}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
          />
        </mask>
      </defs>

      {/* 1 · permanent riverbed */}
      <path
        d={d}
        stroke="#9CAD52"
        strokeWidth={178}
        strokeOpacity={0.26}
        strokeLinecap="round"
      />
      {/* 2 · faint permanent blue guide */}
      <path
        d={d}
        stroke="#D9F0FF"
        strokeWidth={34}
        strokeOpacity={0.2}
        strokeLinecap="round"
      />

      <g mask={`url(#${maskId})`}>
        {/* 3 · scroll-revealed blue current */}
        <path
          d={d}
          stroke="#D9F0FF"
          strokeWidth={34}
          strokeOpacity={0.85}
          strokeLinecap="round"
        />
        {/* 4 · quiet daylight highlight — one slow pale streak, not a dotted line */}
        <path
          className="jr-glint"
          d={d}
          stroke="#F3FBFF"
          strokeWidth={6}
          strokeOpacity={0.36}
          strokeLinecap="round"
          strokeDasharray="26 150"
        />
      </g>
    </svg>
  );
}

export default function JourneyRibbon() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const wrapper = root.parentElement;
    if (!wrapper) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (reduce.matches) {
      root.style.setProperty("--flow", "0");
      return;
    }

    let raf = 0;
    let scheduled = false;
    let eased = 1; // smoothed --flow (1 = hidden, 0 = drawn)
    let target = 1;
    let drift = 0;

    // read layout only inside the rAF callback, never interleaved with writes
    const readGeometry = () => {
      const rect = wrapper.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;

      // progress: begins when wrapper top reaches 80% vh, completes when
      // wrapper bottom reaches 20% vh   →  dashOffset = 1 - progress
      const raw = (vh * 0.8 - rect.top) / (rect.height + vh * 0.6);
      target = 1 - Math.min(1, Math.max(0, raw));

      // secondary: gentle vertical parallax, ~30px each way (the SVG has
      // vertical bleed in CSS so this never clips the ribbon)
      const seen = (vh - rect.top) / (vh + rect.height);
      drift = (Math.min(1, Math.max(0, seen)) - 0.5) * 60;

      // near viewport? keep easing. otherwise snap and rest.
      return rect.bottom > -vh && rect.top < vh * 2;
    };

    const frame = () => {
      scheduled = false;
      const near = readGeometry();

      if (!near) {
        eased = target;
      } else {
        eased += (target - eased) * 0.12; // responsive but jitter-free
        if (Math.abs(target - eased) < 0.0006) eased = target;
      }

      root.style.setProperty("--flow", eased.toFixed(4));
      root.style.setProperty("--drift", `${drift.toFixed(2)}px`);

      if (eased !== target) schedule();
    };

    const schedule = () => {
      if (scheduled) return;
      scheduled = true;
      raf = requestAnimationFrame(frame);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduce.addEventListener?.("change", schedule);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduce.removeEventListener?.("change", schedule);
    };
  }, []);

  return (
    <div ref={rootRef} className="journey-ribbon" aria-hidden>
      <RibbonPaths id="d" d={DESKTOP_PATH} className="hidden md:block" />
      <RibbonPaths id="m" d={MOBILE_PATH} className="block md:hidden" />
    </div>
  );
}
