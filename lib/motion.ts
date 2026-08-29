/**
 * Central tunables for the page-wide calm scroll motion.
 *
 * The page has ONE scroll controller (`MotionController`) that writes two
 * custom properties on every `[data-scene]` element each animation frame:
 *
 *   --sp   0 … 1     scene progress through the viewport (sticky: pin → release)
 *   --sc  -1 … 1      the same, centred (0 = scene centred)
 *
 * Components turn those into GPU-only transforms via `.pl` / `.float-h` or a
 * few hand-written rules in globals.css. Values here are the desktop maxima
 * (px of vertical travel); a global `--motion-scale` in CSS damps every layer
 * together on tablet / mobile.
 *
 * NOTE: the ApproachJourney "river" section is intentionally NOT part of this
 * system — it keeps its own self-contained JourneyRibbon exactly as on `main`.
 */

export const motion = {
  /** hero: short pinned opening; the CSS `.hero-*` rules hold the exact px */
  hero: {
    length: "134svh",
  },

  about: {
    headingShift: -16,
    portraitShift: 30,
    insetShift: 18,
  },

  services: {
    markShift: -40,
  },

  home: {
    headingShift: -18,
    artShift: 26,
  },

  testimonials: {
    titleShift: -14,
  },

  gift: {
    headingShift: -16,
  },

  vision: {
    photoShift: 30,
    phraseShift: -8,
    textureShift: -22,
  },

  finalCta: {
    headingShift: -10,
  },
} as const;
