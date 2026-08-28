type Props = {
  children: React.ReactNode;
  tone?: "shadow" | "fresh" | "pale" | "sky" | "forest";
  className?: string;
  as?: "p" | "span";
};

const TONE: Record<NonNullable<Props["tone"]>, string> = {
  shadow: "text-shadow",
  fresh: "text-fresh",
  pale: "text-pale",
  sky: "text-sky",
  forest: "text-forest",
};

/** Small uppercase kicker that precedes a section title. */
export default function Eyebrow({
  children,
  tone = "fresh",
  className = "",
  as: Tag = "p",
}: Props) {
  return (
    <Tag className={`eyebrow ${TONE[tone]} ${className}`}>{children}</Tag>
  );
}
