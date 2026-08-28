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

## The Journey River

`app/components/ui/JourneyRibbon.tsx`, mounted once inside the
`ApproachJourney` wrapper (`app/components/sections/ApproachJourney.tsx`),
which owns it and spans both the *holistic approach* and *organic* sections.

- Four strokes share **one** path per breakpoint (desktop + a calmer mobile
  path): permanent green riverbed, faint blue guide, scroll-revealed blue
  current, and a slow pale highlight. Current + highlight use the same
  `pathLength="1"` reveal mask.
- A passive `scroll` listener schedules one `requestAnimationFrame`. Inside
  it we read the wrapper rect, compute
  `progress = clamp((vh*0.8 − top) / (height + vh*0.6), 0, 1)`, set
  `--flow = 1 − progress` (eased) and `--drift` (≤ ~24px parallax) as CSS
  custom properties on the ribbon root. No React re-render per scroll.
- `prefers-reduced-motion: reduce` → `--flow` is pinned to `0` (complete
  static stream), highlight hidden, parallax disabled. Geometry recomputes
  on resize.

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
