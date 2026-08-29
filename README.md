# Kokoro Organic Massage — one-page site

Production one-pager for Axelle Michiels' holistic massage practice, rebuilt
from the supplied design references, brandbook, copy and photography.

## Stack

- **Next.js 16 (App Router)** + React 19, React Server Components by default.
  The only client component is the scroll-driven river (`JourneyRibbon`) and
  the header (menu + scroll state).
- **TypeScript** everywhere, including all content/data.
- **Tailwind CSS v4** (`@tailwindcss/postcss`) — config lives in CSS
  (`app/globals.css` `@theme` block). No `tailwind.config.js`.
- **next/font** self-hosts Cagliostro + Bricolage Grotesque (no runtime
  request to Google, `font-display: swap`).
- No animation library, no UI kit. The river is hand-rolled SVG + a tiny
  rAF loop.

```
npm install
npm run dev        # http://localhost:3000
npm run build && npm run start
npm run lint
```

## Source material (not in git)

The supplied design input — `brand-reference/`, `brandbook/`,
`design-reference/`, `kokoro-tone-of-voice/`, `pictures_of_axelle/` — is
gitignored (~170MB of print-ready brand files, the brandbook PDF and personal
photography). Get it from the client hand-off and drop it back into the
project root if you need to re-derive an asset.

Everything the site needs to build and run **is** committed, including the
optimised production images in `public/assets/kokoro/`.

## Where things live

| Concern | File |
| --- | --- |
| **All page copy** (NL/BE) | `lib/data/content.ts` |
| **Business facts** (phone, e-mail, booking target, address label) — single source of truth | `lib/data/contact.ts` |
| **Design tokens** (colour, type scale, radius, z-layers, spacing) | `app/globals.css` → `@theme` + `.journey-ribbon` block |
| **Fonts** | `lib/fonts.ts` |
| Layout components | `app/components/layout/` (`Header`, `Footer`) |
| Section components | `app/components/sections/` |
| Reusable UI | `app/components/ui/` (`Button`, `Eyebrow`, `Pill`, `OrganicMedia`, `SectionWave`, `JourneyRibbon`, `BrandLogo`, `EnsoMark`) |
| Page (thin — composes sections + data) | `app/page.tsx` |
| Production imagery | `public/assets/kokoro/` |
| Screenshot / audit helpers | `scripts/shoot.mjs`, `scripts/audit.mjs` |

Editing text never means touching JSX — change `lib/data/content.ts`.

## Page-wide motion system

One calm motion language across the whole page (Utopia referenced for *feel*
only — nothing visual copied).

**One controller.** `app/components/motion/MotionController.tsx` — a single
passive scroll listener + one rAF loop + one IntersectionObserver. Each frame
it reads every near-viewport `[data-scene]` rect (all reads first), then
writes two custom properties (all writes after):

- `--sp` `0…1` progress through the viewport (sticky scenes: pinned → released)
- `--sc` `-1…0…1` the same, centred (0 = scene centred)

No React state, no re-render per scroll. Everything visible is CSS
`transform`/`opacity` calc'd from those two values.

**Primitives** (`app/components/motion/primitives.tsx`):
`ScrollScene` · `StickyScene` · `ParallaxLayer` · `FloatingHeading`,
plus the existing `JourneyRibbon` and `SectionWave` (which now accepts a
`drift` prop so seams breathe).

**Tunables** live in one file: `lib/motion.ts` — per-section travel
distances and sticky lengths. A global
`--motion-scale` (1 / 0.6 / 0.4 at desktop / ≤1024 / ≤767) damps every layer
together, so mobile is calmer without per-section overrides.

**Per section:** hero = short pin (134svh) with photo drift + 2.5% scale ·
about = heading/portrait/inset on three depths · **ApproachJourney** stays exactly as
on `main` (its own river, see below) · services = heading floats slower than the
drifting cards · home = two ring depths + floating heading · testimonials =
title + quote marks only (quote text never moves) · gift = heading vs card
depth · vision = photo + swirl depth · final CTA = texture only, buttons
rock-stable · footer = logo mark ±8px, everything else settled.

Body copy, buttons, booking links and contact details never parallax.

## ApproachJourney — the river section (unchanged from `main`)

This block is deliberately **left exactly as the base site**: no page-wide
scene, no sticky typography. It renders `JourneyRibbon` — a self-contained
client component with its own rAF scroll controller that writes `--flow`
(1 → 0, the blue current filling) and `--drift` onto `.journey-ribbon` as the
wrapper passes through the viewport — plus the approved holistic + organic
cards. `MotionController` does not touch it.

`JourneyRibbon` SVG: exact brief path, four strokes (riverbed `#9CAD52` w178
· faint blue guide w34 · scroll-revealed current w34 · slow pale highlight)
sharing one `pathLength="1"` reveal mask, plus a calmer mobile path.

## Reduced motion

`prefers-reduced-motion: reduce` collapses every sticky wrapper to auto
height, un-pins the stages, freezes all transforms, hides the river
highlight and shows the completed river — all in CSS. The controller
attaches no listeners at all and just pins each scene to its resting frame.

## Responsive breakpoints tested

1440 / 768 / 390 px — full-page screenshots + river progress at
0 / 25 / 50 / 75 / 100 % and reduced-motion (`scripts/shoot.mjs`).
Audit (`scripts/audit.mjs`): 0 horizontal overflow, single `h1`, correct
landmark/heading order, no broken images, no console errors at all three
widths.

## Genuinely missing business information

These are **placeholders** — see the header comment in `lib/data/contact.ts`:

| Item | Current state |
| --- | --- |
| WhatsApp link | reuses the phone number as `wa.me/32471290974` — confirm/replace |
| Instagram URL | `#` — no profile URL was supplied |
| Address | shown as “Adres volgt” (per the design) — no address supplied |
| Opening hours | “Enkel op afspraak” (per the design) |
| Booking system | none supplied — every “boek”/CTA falls back to a pre-filled `mailto:` |
| Prices & durations | intentionally “Duur & prijs op aanvraag” (as in the reference) |
| Testimonial authors | “Kokoro-klant” (as in the reference — no real names supplied) |
| OG / canonical domain | `metadataBase` uses a placeholder `.example` host in `app/layout.tsx` |

Phone (`+32 471 29 09 74`) and e-mail
(`kokoro.organic.massage@gmail.com`) come from the brandbook business-card
page and are wired into the `tel:` / `mailto:` links.

## Known deltas from the reference

- The two `ApproachJourney` text panels use a soft asymmetric radius rather
  than the extreme organic blob in the comp, so pillar text is never
  clipped.
- The hero photo tint is a touch greener than the comp.
- The oil-pour photo (only available embedded in the brandbook PDF) was
  cropped to remove the baked-in “KOKORO” lettering; it is lower resolution
  than the other photography.
- The “Welkom, ik ben Axelle” frame uses the real photo of Axelle from
  `pictures_of_axelle/` (cropped to 4:5 as
  `public/assets/kokoro/axelle-portrait.jpg`), not the brandbook stock shot
  the comp showed. The small inset stays the hands close-up, as in the comp.
- Tablet (768px) keeps the services row at 3-up; it is legible but tighter
  than desktop.
