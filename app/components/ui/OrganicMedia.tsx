import Image from "next/image";
import type { ImageAsset } from "@/lib/data/content";

type Shape = "arch" | "blob" | "card" | "circle";

type Props = {
  image: ImageAsset;
  shape?: Shape;
  /** offset colour panel peeking out behind the photo (design's layered look) */
  frame?: "fresh" | "pale" | "shadow" | "sky" | null;
  frameSide?: "br" | "bl" | "tr" | "tl";
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** extra ratio override, e.g. "4 / 5" */
  ratio?: string;
  /** CSS object-position, e.g. "50% 35%" — keeps a face in frame when cropped */
  objectPosition?: string;
  children?: React.ReactNode;
};

const SHAPE: Record<Shape, string> = {
  arch: "rounded-[var(--radius-arch)]",
  blob: "rounded-[var(--radius-blob)]",
  card: "rounded-[var(--radius-card)]",
  circle: "rounded-full",
};

const FRAME_COLOR: Record<NonNullable<Props["frame"]>, string> = {
  fresh: "bg-fresh",
  pale: "bg-pale-warm",
  shadow: "bg-shadow",
  sky: "bg-sky",
};

const FRAME_OFFSET: Record<NonNullable<Props["frameSide"]>, string> = {
  br: "translate-x-3 translate-y-4",
  bl: "-translate-x-3 translate-y-4",
  tr: "translate-x-3 -translate-y-4",
  tl: "-translate-x-3 -translate-y-4",
};

/**
 * Real, responsive photograph with an organic mask. Photos are never used
 * to carry text or section decoration — those live in the DOM.
 * Aspect ratio is declared up-front so images never shift layout.
 */
export default function OrganicMedia({
  image,
  shape = "arch",
  frame = null,
  frameSide = "br",
  sizes = "(max-width: 768px) 100vw, 40vw",
  priority = false,
  className = "",
  ratio,
  objectPosition,
  children,
}: Props) {
  const decorative = image.alt.trim() === "";

  return (
    <div className={`relative ${className}`}>
      {frame && (
        <div
          aria-hidden
          className={`absolute inset-0 ${SHAPE[shape]} ${FRAME_COLOR[frame]} ${FRAME_OFFSET[frameSide]}`}
        />
      )}
      <div
        className={`relative overflow-hidden ${SHAPE[shape]}`}
        style={{ aspectRatio: ratio ?? `${image.width} / ${image.height}` }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={objectPosition ? { objectPosition } : undefined}
          {...(decorative ? { "aria-hidden": true } : {})}
        />
      </div>
      {children}
    </div>
  );
}
