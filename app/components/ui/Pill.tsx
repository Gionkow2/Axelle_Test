type Props = {
  children: React.ReactNode;
  tone?: "pale" | "shadow" | "fresh" | "sky";
  className?: string;
};

const TONE: Record<NonNullable<Props["tone"]>, string> = {
  pale: "bg-pale text-shadow",
  shadow: "bg-shadow text-pale",
  fresh: "bg-fresh text-shadow",
  sky: "bg-sky text-shadow",
};

/** Small rounded label chip (product/feature tags, hero badges). */
export default function Pill({ children, tone = "pale", className = "" }: Props) {
  return (
    <span
      className={`inline-flex items-center rounded-[var(--radius-pill)] px-4 py-2 text-[0.8rem] font-semibold ${TONE[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
