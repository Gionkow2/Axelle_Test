"use client";

import { useEffect } from "react";

/**
 * The page's single scroll-motion controller.
 *
 * - ONE passive scroll listener, ONE resize listener, ONE rAF loop.
 * - Tracks `[data-scene]` elements; an IntersectionObserver keeps the working
 *   set to just those near the viewport.
 * - Per frame: read every active scene's rect (all reads first), then write
 *   `--sp` (0→1 progress) and `--sc` (-1→0→1 centred) on each (all writes
 *   after) — never interleaving layout reads and writes.
 * - No React state, no re-render per scroll. Components animate purely from
 *   those two custom properties via CSS transforms/opacity.
 * - `prefers-reduced-motion: reduce`: pin every scene to its resting frame
 *   and attach no listeners.
 */
export default function MotionController() {
  useEffect(() => {
    const scenes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scene]"),
    );
    if (scenes.length === 0) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const rest = () => {
      for (const el of scenes) {
        el.style.setProperty("--sp", el.dataset.scene === "sticky" ? "1" : "0.5");
        el.style.setProperty("--sc", "0");
      }
    };

    if (mq.matches) {
      rest();
      return;
    }

    const active = new Set<HTMLElement>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) active.add(el);
          else {
            active.delete(el);
            // settle to the nearest edge value once it leaves
            const below = e.boundingClientRect.top > 0;
            el.style.setProperty("--sp", below ? "0" : "1");
            el.style.setProperty("--sc", below ? "-1" : "1");
          }
        }
        schedule();
      },
      { rootMargin: "35% 0px 35% 0px", threshold: [0, 1] },
    );
    scenes.forEach((el) => io.observe(el));

    const clamp = (n: number, lo: number, hi: number) =>
      Math.min(hi, Math.max(lo, n));

    let raf = 0;
    let scheduled = false;
    // eased values keyed by element, so motion never snaps on fast scroll
    const eased = new WeakMap<HTMLElement, { sp: number; sc: number }>();

    const frame = () => {
      scheduled = false;
      const vh = window.innerHeight || document.documentElement.clientHeight;

      // --- reads ---
      const measures: { el: HTMLElement; sp: number; sc: number }[] = [];
      for (const el of active) {
        const r = el.getBoundingClientRect();
        let sp: number;
        if (el.dataset.scene === "sticky") {
          const span = Math.max(1, r.height - vh);
          sp = clamp(-r.top / span, 0, 1);
        } else {
          sp = clamp((vh - r.top) / (vh + r.height), 0, 1);
        }
        const mid = r.top + r.height / 2;
        const sc = clamp((vh / 2 - mid) / (vh / 2 + r.height / 2), -1, 1);
        measures.push({ el, sp, sc });
      }

      // --- writes ---
      let moving = false;
      for (const m of measures) {
        const prev = eased.get(m.el) ?? { sp: m.sp, sc: m.sc };
        const next = {
          sp: prev.sp + (m.sp - prev.sp) * 0.16,
          sc: prev.sc + (m.sc - prev.sc) * 0.16,
        };
        if (Math.abs(next.sp - m.sp) < 0.0004) next.sp = m.sp;
        if (Math.abs(next.sc - m.sc) < 0.0004) next.sc = m.sc;
        eased.set(m.el, next);
        m.el.style.setProperty("--sp", next.sp.toFixed(4));
        m.el.style.setProperty("--sc", next.sc.toFixed(4));
        if (next.sp !== m.sp || next.sc !== m.sc) moving = true;
      }

      if (moving) schedule();
    };

    function schedule() {
      if (scheduled) return;
      scheduled = true;
      raf = requestAnimationFrame(frame);
    }

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    mq.addEventListener?.("change", () => {
      if (mq.matches) {
        cancelAnimationFrame(raf);
        io.disconnect();
        rest();
      }
    });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return null;
}
