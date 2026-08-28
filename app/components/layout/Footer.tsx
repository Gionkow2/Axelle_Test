import Link from "next/link";
import BrandLogo from "@/app/components/ui/BrandLogo";
import { footer } from "@/lib/data/content";
import { contact } from "@/lib/data/contact";

/** Resolve the Contact column's placeholder hrefs from the single source. */
const CONTACT_HREF: Record<string, string> = {
  Telefoon: contact.phoneHref,
  WhatsApp: contact.whatsappHref,
  Instagram: contact.instagramHref,
};

export default function Footer() {
  return (
    <footer className="on-dark bg-shadow text-pale">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:py-20">
        <div className="max-w-xs">
          <BrandLogo size={44} icon="fresh" word="pale" sub="pale" title="Kokoro Organic Massage" />
          <p className="mt-5 text-[0.95rem] leading-relaxed text-pale/75">
            {footer.blurb}
          </p>
        </div>

        {footer.columns.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <h2 className="eyebrow text-fresh">{col.heading}</h2>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => {
                const href =
                  col.heading === "Contact"
                    ? CONTACT_HREF[link.label] ?? link.href
                    : link.href;
                const external = href.startsWith("http") || href.startsWith("tel:");
                return (
                  <li key={link.label}>
                    {external ? (
                      <a
                        href={href}
                        className="text-[0.95rem] text-pale/85 underline-offset-4 hover:text-pale hover:underline"
                        {...(href.startsWith("http")
                          ? { target: "_blank", rel: "noreferrer" }
                          : {})}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className="text-[0.95rem] text-pale/85 underline-offset-4 hover:text-pale hover:underline"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-pale/15">
        <div className="shell flex flex-col gap-2 py-6 text-[0.85rem] text-pale/70 sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.legal}</p>
          <p>{footer.credit}</p>
        </div>
      </div>
    </footer>
  );
}
