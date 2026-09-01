import Image from "next/image";
import Button from "@/app/components/ui/Button";
import Pill from "@/app/components/ui/Pill";
import SectionWave from "@/app/components/ui/SectionWave";
import BrandLogo from "@/app/components/ui/BrandLogo";
import { StickyScene } from "@/app/components/motion/primitives";
import { motion } from "@/lib/motion";
import { hero } from "@/lib/data/content";
import { contact } from "@/lib/data/contact";

/**
 * Hero — a short pinned opening (~134svh). The heading sits calmly anchored
 * while the photograph drifts and scales fractionally behind it; supporting
 * copy moves a touch more, the CTAs never move at all.
 *
 * Deliberately brief: who Kokoro is, what is offered and what to do next are
 * all readable within the first viewport.
 */
export default function Hero() {
  return (
    <StickyScene
      id="top"
      length={motion.hero.length}
      className="hero-scene on-dark isolate text-pale"
      innerClassName="hero-stage"
      aria-label={hero.welcome}
    >
      {/* full-bleed photograph + tints (decorative) */}
      <div className="hero-photo" aria-hidden>
        <Image
          src={hero.image.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center]"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-gradient-to-r from-shadow via-shadow/85 to-shadow/30"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-gradient-to-t from-shadow/95 via-shadow/10 to-shadow/40"
      />

      <div className="hero-content shell">
        <div className="max-w-2xl">
          <p className="flex items-center gap-3">
            <BrandLogo variant="icon" size={40} icon="fresh" />
            <span className="font-display text-xl text-pale/90">
              {hero.welcome}
            </span>
          </p>
          <h1 className="hero-title display-1 mt-5 text-pale">
            {hero.titleLead}{" "}
            <span className="block text-pale">{hero.titleAccent}</span>
          </h1>
          <p className="hero-body mt-6 max-w-xl text-lg text-pale/85">
            {hero.body}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href={contact.bookingHref} on="dark" variant="solid">
              {hero.primary.label}
            </Button>
            <Button
              href={hero.secondary.href}
              on="dark"
              variant="ghost"
              withArrow={false}
            >
              {hero.secondary.label}
            </Button>
          </div>
        </div>
      </div>

      {/* floating trust badges, bottom-right of the photo */}
      <div className="hero-badges absolute bottom-28 right-[var(--gutter)] z-[3] hidden flex-col items-end gap-3 sm:flex md:flex-row">
        {hero.badges.map((b) => (
          <Pill key={b} tone="pale">
            {b}
          </Pill>
        ))}
      </div>

      <SectionWave color="pale" height={90} className="z-[4]" />
    </StickyScene>
  );
}
