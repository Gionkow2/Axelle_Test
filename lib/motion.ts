/**
 * ONE place for every motion tunable on the page.
 *
 * The page has a single scroll controller (`MotionController`) that writes two
 * custom properties on each `[data-scene]` element every animation frame:
 *
 *   --sp   0 … 1     scene progress through the viewport
 *                    (non-sticky: 0 entering bottom → 1 left past top;
 *                     sticky:     0 pinned          → 1 releasing)
 *   --sc  -1 … 1      the same, centred (0 = scene centred / stage half-way)
 *
 * Components turn those into GPU-only transforms via the `.pl` / `.float-h`
 * helpers in globals.css. Numbers below are the *maximum* vertical travel in
 * px (or a scale delta). Keep them restrained — see the brief's ranges.
 *
 * Global damping by breakpoint lives in CSS (`--motion-scale`), so these are
 * desktop values and every layer scales down together on tablet / mobile.
 */

export const motion = {
  hero: {
    /** outer scroll length; stage stays 100svh and pins briefly */
    length: "134svh",
    photoShift: 34,
    photoScale: 0.025,
    headingShift: -12,
    bodyShift: -22,
    decorShift: -46,
  },

  about: {
    headingShift: -16,
    portraitShift: 30,
    insetShift: 18,
    markShift: -48,
  },

  /** the richest moment — sticky typographic story + Journey River */
  approach: {
    length: "210svh",
    photoShift: -26,
    photoScale: 0.03,
    phraseShift: -8,
    riverDrift: 22,
    wordShift: [-34, 46, -54, 28] as const,
  },

  services: {
    /** desktop: heading gently anchored for part of the section */
    headingStick: "150svh",
    headingShift: -14,
    photoShift: 22,
    markShift: -40,
  },

  home: {
    headingShift: -18,
    artShift: 26,
    ringShift: 40,
  },

  testimonials: {
    titleShift: -14,
    cardShift: 10,
    markShift: 20,
  },

  gift: {
    headingShift: -16,
    cardShift: 26,
    markShift: -40,
  },

  vision: {
    length: "150svh",
    photoShift: 30,
    phraseShift: -8,
    textureShift: -22,
    wordShift: -44,
  },

  finalCta: {
    headingShift: -10,
    textureShift: 24,
  },

  footer: {
    markShift: 8,
  },
} as const;

/** Ambient decorative words — approved Kokoro vocabulary only, used sparingly. */
export const ambientVocab = {
  about: "adem",
  home: "ruimte",
  gift: "zachtheid",
} as const;
