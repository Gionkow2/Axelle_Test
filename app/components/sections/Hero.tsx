import Image from "next/image";
import Button from "@/app/components/ui/Button";
import SectionWave from "@/app/components/ui/SectionWave";
import { StickyScene } from "@/app/components/motion/primitives";
import { motion } from "@/lib/motion";
import { hero } from "@/lib/data/content";

/**
 * Hero — a short pinned opening (~134svh). The heading and its supporting line
 * drift together as one calm block while the photograph scales fractionally
 * behind them; the CTAs stay put.
 *
 * Deliberately brief: who Kokoro is and where to go next are both readable
 * within the first viewport.
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
          <h1 className="hero-title display-1 text-pale">{hero.title}</h1>
          <p className="mt-5 border-l-2 border-fresh pl-5 font-display text-2xl italic leading-snug text-pale/90 sm:text-[1.7rem]">
            &ldquo;{hero.quote}&rdquo;
          </p>
          <p className="hero-body mt-6 max-w-xl text-lg text-pale/85">
            {hero.body}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href={hero.primary.href} on="dark" variant="solid">
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


      <SectionWave color="pale" height={90} className="z-[4]" />
    </StickyScene>
  );
}
