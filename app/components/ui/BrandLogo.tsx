import {
  ENSO_VIEWBOX,
  WORDMARK_VIEWBOX,
  ensoPath,
  kokoroWordPaths,
  organicWordPaths,
} from "./logo-paths";

type Tone = "pale" | "fresh" | "shadow" | "forest" | "sky";

const TONE: Record<Tone, string> = {
  pale: "var(--color-pale)",
  fresh: "var(--color-fresh)",
  shadow: "var(--color-shadow)",
  forest: "var(--color-forest)",
  sky: "var(--color-sky)",
};

type Props = {
  /** side-by-side icon + wordmark (default), or a single element */
  variant?: "lockup" | "icon" | "wordmark";
  icon?: Tone;
  word?: Tone;
  /** ORGANIC MASSAGE line — defaults to `word` */
  sub?: Tone;
  /** rendered height in px of the mark (icon + wordmark scale to it) */
  size?: number;
  className?: string;
  /** accessible name; omit to render the mark as decorative */
  title?: string;
};

/**
 * Kokoro logo, assembled from the supplied vector data (never a screenshot).
 * The icon always sits left of the wordmark per the brandbook "logo plaats"
 * rule. Colours are brand-token driven so the mark adapts per background.
 */
export default function BrandLogo({
  variant = "lockup",
  icon = "fresh",
  word = "pale",
  sub,
  size = 40,
  className,
  title,
}: Props) {
  const decorative = !title;
  const a11y = decorative
    ? { "aria-hidden": true as const }
    : { role: "img" as const, "aria-label": title };

  const Enso = (
    <svg
      viewBox={ENSO_VIEWBOX}
      style={{ height: size, width: "auto", flex: "0 0 auto" }}
      fill={TONE[icon]}
      focusable="false"
      aria-hidden="true"
    >
      <path d={ensoPath} />
    </svg>
  );

  const Wordmark = (
    <svg
      viewBox={WORDMARK_VIEWBOX}
      style={{ height: size * 0.86, width: "auto" }}
      focusable="false"
      aria-hidden="true"
    >
      <g fill={TONE[word]}>
        {kokoroWordPaths.map((d, i) => (
          <path key={`k${i}`} d={d} />
        ))}
      </g>
      <g fill={TONE[sub ?? word]}>
        {organicWordPaths.map((d, i) => (
          <path key={`o${i}`} d={d} />
        ))}
      </g>
    </svg>
  );

  if (variant === "icon") {
    return (
      <span className={className} {...a11y} style={{ display: "inline-flex" }}>
        {Enso}
      </span>
    );
  }

  if (variant === "wordmark") {
    return (
      <span className={className} {...a11y} style={{ display: "inline-flex" }}>
        {Wordmark}
      </span>
    );
  }

  return (
    <span
      className={className}
      {...a11y}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size * 0.28,
      }}
    >
      {Enso}
      {Wordmark}
    </span>
  );
}
