"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import BrandLogo from "@/app/components/ui/BrandLogo";
import { nav } from "@/lib/data/content";
import { contact } from "@/lib/data/contact";

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
      <div className="shell flex items-center justify-between gap-6 py-4">
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

        {/* desktop nav */}
        <nav
          aria-label="Hoofdnavigatie"
          className={`hidden items-center gap-8 lg:flex ${textClass}`}
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
            href={contact.bookingHref}
            className={`rounded-[var(--radius-pill)] border px-5 py-2.5 text-[0.95rem] font-semibold transition-colors ${
              dark
                ? "border-pale/55 text-pale hover:bg-pale hover:text-shadow"
                : "border-shadow/35 text-shadow hover:bg-shadow hover:text-pale"
            }`}
          >
            Boek je moment
          </a>
        </nav>

        {/* mobile toggle */}
        <button
          ref={toggleRef}
          type="button"
          className={`inline-flex h-11 w-11 items-center justify-center rounded-full border lg:hidden ${
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
            href={contact.bookingHref}
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
