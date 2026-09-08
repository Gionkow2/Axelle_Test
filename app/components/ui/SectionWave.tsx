type Props = {
  /** fill of the wave — normally the colour of the *next* section */
  color: "pale" | "pale-warm" | "fresh" | "shadow" | "forest" | "sky";
  /** sit at the bottom (default) or the top edge of the parent section */
  edge?: "bottom" | "top";
  /** mirror horizontally so consecutive waves don't repeat */
  flip?: boolean;
  /** rendered wave height */
  height?: number;
  /** small vertical drift (px) so the seam breathes with the page */
  drift?: number;
  className?: string;
};

const FILL: Record<Props["color"], string> = {
  pale: "var(--color-pale)",
  "pale-warm": "var(--color-pale-warm)",
  fresh: "var(--color-fresh)",
  shadow: "var(--color-shadow)",
  forest: "var(--color-forest)",
  sky: "var(--color-sky)",
};

/** Reference curve from the brief — one shared path, flipped for variety. */
const WAVE_PATH =
  "M0 86C238 23 430 148 694 79C961 9 1181 145 1440 51V160H0Z";

/**
 * Organic curved seam between two background colours. The parent section
 * must be `position: relative`. Purely decorative.
 */
export default function SectionWave({
  color,
  edge = "bottom",
  flip = false,
  height = 90,
  drift = 0,
  className = "",
}: Props) {
  const transforms = [
    edge === "top" ? "scaleY(-1)" : "",
    flip ? "scaleX(-1)" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    // outer: position + optional scroll drift (own transform)
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 z-[var(--z-media)] leading-[0] ${
        edge === "bottom" ? "bottom-[-1px]" : "top-[-1px]"
      } ${drift ? "wave-drift" : ""} ${className}`}
      style={{
        height,
        ...(drift
          ? ({ ["--wave-drift"]: `${drift}px` } as React.CSSProperties)
          : {}),
      }}
    >
      {/* inner: edge/flip orientation, kept off the drifting transform */}
      <div
        className="h-full w-full"
        style={{ transform: transforms || undefined }}
      >
        <svg
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="h-full w-full"
          focusable="false"
        >
          <path d={WAVE_PATH} fill={FILL[color]} />
        </svg>
      </div>
    </div>
  );
}
