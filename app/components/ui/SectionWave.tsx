type Props = {
  /** fill of the wave — normally the colour of the *next* section */
  color: "pale" | "fresh" | "shadow" | "forest" | "sky";
  /** sit at the bottom (default) or the top edge of the parent section */
  edge?: "bottom" | "top";
  /** mirror horizontally so consecutive waves don't repeat */
  flip?: boolean;
  /** rendered wave height */
  height?: number;
  className?: string;
};

const FILL: Record<Props["color"], string> = {
  pale: "var(--color-pale)",
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
  className = "",
}: Props) {
  const transforms = [
    edge === "top" ? "scaleY(-1)" : "",
    flip ? "scaleX(-1)" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 z-[var(--z-media)] leading-[0] ${
        edge === "bottom" ? "bottom-[-1px]" : "top-[-1px]"
      } ${className}`}
      style={{ height, transform: transforms || undefined }}
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
  );
}
