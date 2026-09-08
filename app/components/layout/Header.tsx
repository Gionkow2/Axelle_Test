"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import BrandLogo from "@/app/components/ui/BrandLogo";
import { nav } from "@/lib/data/content";
import { contact } from "@/lib/data/contact";

function PhoneIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
      className="shrink-0"
    >
      <path
        d="M6.6 10.8a15.3 15.3 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.3 1z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Sticky site header. Transparent over the dark hero, then solidifies once
 * the hero is scrolled past. Mobile navigation is a real <button> +
 * disclosure with aria-expanded, focus styles and Escape-to-close.
 */
export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const dark = !solid && !open;
  const textClass = dark ? "text-pale" : "text-shadow";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[var(--z-header)] transition-colors duration-300 ${
        solid || open
          ? "bg-pale/95 shadow-[0_1px_0_rgba(38,64,5,0.12)] backdrop-blur-sm"
          : "bg-transparent"
      } ${dark ? "on-dark" : ""}`}
    >
      <div className="shell flex items-center gap-6 py-4">
        <Link
          href="#top"
          className="shrink-0"
          aria-label="Kokoro Organic Massage — naar boven"
        >
          <BrandLogo
            size={40}
            icon={dark ? "fresh" : "fresh"}
            word={dark ? "pale" : "shadow"}
            sub={dark ? "pale" : "shadow"}
          />
        </Link>

        {/* desktop nav — menu items right-aligned */}
        <nav
          aria-label="Hoofdnavigatie"
          className={`ml-auto hidden items-center gap-8 lg:flex ${textClass}`}
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.95rem] font-semibold underline-offset-8 transition hover:underline"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-[var(--radius-pill)] border px-5 py-2.5 text-[0.95rem] font-semibold transition-colors ${
              dark
                ? "border-pale/55 text-pale hover:bg-pale hover:text-shadow"
                : "border-shadow/35 text-shadow hover:bg-shadow hover:text-pale"
            }`}
          >
            Boek je moment
          </a>
        </nav>

        {/* phone number — far right on desktop, after the menu items */}
        <a
          href={contact.phoneHref}
          className={`hidden items-center gap-2 text-[0.95rem] font-semibold underline-offset-8 transition hover:underline lg:inline-flex ${textClass}`}
          aria-label={`Bel ${contact.phoneDisplay}`}
        >
          <PhoneIcon />
          {contact.phoneDisplay}
        </a>

        {/* mobile toggle */}
        <button
          ref={toggleRef}
          type="button"
          className={`ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full border lg:hidden ${
            dark ? "border-pale/50 text-pale" : "border-shadow/30 text-shadow"
          }`}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Menu sluiten" : "Menu openen"}</span>
          <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden focusable="false">
            {open ? (
              <path
                d="M4 4l14 14M18 4L4 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3 6h16M3 11h16M3 16h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {/* mobile panel */}
      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        className="border-t border-shadow/10 bg-pale lg:hidden"
      >
        <nav
          aria-label="Mobiele navigatie"
          className="shell flex flex-col gap-1 py-4 text-shadow"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-3 text-lg font-semibold hover:bg-shadow/5"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={contact.phoneHref}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg px-2 py-3 text-lg font-semibold hover:bg-shadow/5"
          >
            <PhoneIcon />
            {contact.phoneDisplay}
          </a>
          <a
            href={contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-[var(--radius-pill)] bg-shadow px-5 py-3 text-center text-base font-semibold text-pale"
          >
            Boek je moment
          </a>
        </nav>
      </div>
    </header>
  );
}
