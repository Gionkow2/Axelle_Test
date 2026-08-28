import type { ElementType, ReactNode, CSSProperties } from "react";

/* ---------------------------------------------------------------- ScrollScene
   Marks a normal-flow region for the motion controller. Children read the
   inherited --sp / --sc custom properties. Renders a <section> by default. */

type SceneProps = {
  as?: ElementType;
  id?: string;
  className?: string;
  style?: CSSProperties;
  "aria-label"?: string;
  children: ReactNode;
};

export function ScrollScene({
  as: Tag = "section",
  className = "",
  children,
  ...rest
}: SceneProps) {
  return (
    <Tag data-scene className={`scene ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

/* ---------------------------------------------------------------- StickyScene
   A tall wrapper whose inner stage pins for the length of the scroll, then
   releases. `length` is the outer height (svh). The stage is 100svh. */

type StickyProps = {
  length?: string;
  id?: string;
  className?: string;
  innerClassName?: string;
  "aria-label"?: string;
  children: ReactNode;
};

export function StickyScene({
  length = "200svh",
  className = "",
  innerClassName = "",
  children,
  ...rest
}: StickyProps) {
  return (
    <div
      data-scene="sticky"
      className={`sticky-scene ${className}`}
      style={{ ["--sticky-len" as string]: length }}
      {...rest}
    >
      <div className={`sticky-inner ${innerClassName}`}>{children}</div>
    </div>
  );
}

/* --------------------------------------------------------------- ParallaxLayer
   Restrained vertical drift proportional to --sc. `speed` = max px travel. */

type PLProps = {
  as?: ElementType;
  speed?: number;
  className?: string;
  style?: CSSProperties;
  "aria-hidden"?: boolean;
  children: ReactNode;
};

export function ParallaxLayer({
  as: Tag = "div",
  speed = -24,
  className = "",
  style,
  children,
  ...rest
}: PLProps) {
  return (
    <Tag
      className={`pl ${className}`}
      style={{ ["--pspeed" as string]: `${speed}px`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------- FloatingHeading
   A display heading that drifts slightly slower than the page. Real semantic
   text — never converted to an image. */

type FHProps = {
  as?: "h1" | "h2" | "h3" | "p";
  speed?: number;
  className?: string;
  id?: string;
  children: ReactNode;
};

export function FloatingHeading({
  as: Tag = "h2",
  speed = -16,
  className = "",
  children,
  ...rest
}: FHProps) {
  return (
    <Tag
      className={`float-h ${className}`}
      style={{ ["--pspeed" as string]: `${speed}px` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ----------------------------------------------------------------- AmbientWord
   A single faint Cagliostro word drifting behind real content. Decorative. */

type AWProps = {
  speed?: number;
  className?: string;
  children: ReactNode;
};

export function AmbientWord({ speed = -44, className = "", children }: AWProps) {
  return (
    <span
      aria-hidden="true"
      className={`ambient-word ${className}`}
      style={{ ["--pspeed" as string]: `${speed}px` }}
    >
      {children}
    </span>
  );
}
