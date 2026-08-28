import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  /** background the button sits on */
  on?: "light" | "dark";
  variant?: "solid" | "ghost";
  withArrow?: boolean;
  className?: string;
};

/**
 * Every call-to-action on the site is a real link (internal anchor, mailto:
 * or tel:), so this always renders an <a>. Never a fake <div> button.
 */
export default function Button({
  href,
  children,
  on = "light",
  variant = "solid",
  withArrow = variant === "solid",
  className = "",
}: Props) {
  const base =
    "group inline-flex items-center gap-2.5 rounded-[var(--radius-pill)] px-6 py-3.5 text-[0.95rem] font-semibold leading-none transition-colors duration-200 focus-visible:outline-offset-4";

  const skins: Record<string, string> = {
    "light-solid":
      "bg-shadow text-pale hover:bg-[var(--color-shadow-soft)]",
    "light-ghost":
      "border border-shadow/35 text-shadow hover:border-shadow hover:bg-shadow/5",
    "dark-solid":
      "bg-pale text-shadow hover:bg-[var(--color-pale-warm)]",
    "dark-ghost":
      "border border-pale/50 text-pale hover:border-pale hover:bg-pale/10",
  };

  const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

  const inner = (
    <>
      <span>{children}</span>
      {withArrow && (
        <span
          aria-hidden
          className="translate-x-0 transition-transform duration-200 group-hover:translate-x-1"
        >
          →
        </span>
      )}
    </>
  );

  const cls = `${base} ${skins[`${on}-${variant}`]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        className={cls}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noreferrer" }
          : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
