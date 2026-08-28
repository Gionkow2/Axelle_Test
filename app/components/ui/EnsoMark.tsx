import { ensoPath, ENSO_VIEWBOX } from "./logo-paths";

type Props = {
  className?: string;
  color?: "fresh" | "pale" | "shadow" | "sky" | "forest";
  opacity?: number;
  size?: number | string;
};

const COLOR: Record<NonNullable<Props["color"]>, string> = {
  fresh: "var(--color-fresh)",
  pale: "var(--color-pale)",
  shadow: "var(--color-shadow)",
  sky: "var(--color-sky)",
  forest: "var(--color-forest)",
};

/** Decorative Kokoro swirl for section backgrounds. Never interactive. */
export default function EnsoMark({
  className = "",
  color = "fresh",
  opacity = 0.12,
  size = 320,
}: Props) {
  return (
    <svg
      className={`pointer-events-none absolute ${className}`}
      viewBox={ENSO_VIEWBOX}
      width={size}
      height={size}
      fill={COLOR[color]}
      style={{ opacity }}
      aria-hidden
      focusable="false"
    >
      <path d={ensoPath} />
    </svg>
  );
}
