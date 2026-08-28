/**
 * The Journey River — one continuous ribbon, purely presentational.
 *
 * Four strokes share ONE path per breakpoint:
 *   1. permanent green riverbed
 *   2. faint permanent blue guide
 *   3. scroll-revealed blue current   (reveal mask)
 *   4. slow daylight highlight        (same reveal mask)
 *
 * The fill is driven by `--flow` (1 = empty → 0 = full) and the vertical
 * drift by `--drift`, both inherited from the ApproachJourney sticky scene
 * (the page's motion controller writes `--sp`; CSS turns it into `--flow`).
 * No JS lives here.
 */

const VIEWBOX = "0 0 1440 1920";

// exact path from the brief
const DESKTOP_PATH =
  "M-120 165C420-80 1230 125 1110 600C990 1080 300 905 245 1320C205 1645 775 1865 1555 1640";

// calmer vertical meander for narrow screens (same flow concept/character)
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
            strokeWidth={44}
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
        strokeOpacity={0.24}
        strokeLinecap="round"
      />
      {/* 2 · faint permanent blue guide */}
      <path
        d={d}
        stroke="#D9F0FF"
        strokeWidth={34}
        strokeOpacity={0.16}
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
        {/* 4 · quiet daylight highlight — never ahead of the current */}
        <path
          className="jr-glint"
          d={d}
          stroke="#F3FBFF"
          strokeWidth={6}
          strokeOpacity={0.32}
          strokeLinecap="round"
          strokeDasharray="26 150"
        />
      </g>
    </svg>
  );
}

export default function JourneyRibbon() {
  return (
    <div className="journey-ribbon" aria-hidden>
      <RibbonPaths id="d" d={DESKTOP_PATH} className="hidden md:block" />
      <RibbonPaths id="m" d={MOBILE_PATH} className="block md:hidden" />
    </div>
  );
}
