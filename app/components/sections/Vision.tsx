import OrganicMedia from "@/app/components/ui/OrganicMedia";
import Eyebrow from "@/app/components/ui/Eyebrow";
import EnsoMark from "@/app/components/ui/EnsoMark";
import SectionWave from "@/app/components/ui/SectionWave";
import {
  ScrollScene,
  ParallaxLayer,
  FloatingHeading,
} from "@/app/components/motion/primitives";
import { motion } from "@/lib/motion";
import { vision } from "@/lib/data/content";

/**
 * Vision — a shorter restrained echo of the Journey moment: the heading and
 * pull-quote hover slightly while the photograph and swirl pass behind them.
 */
export default function Vision() {
  return (
    <ScrollScene className="relative overflow-hidden bg-pale pb-[calc(var(--section-y)+2rem)] pt-[var(--section-y)]">
      <ParallaxLayer
        as="div"
        speed={motion.vision.textureShift}
        aria-hidden
        className="pointer-events-none absolute -left-28 bottom-6 hidden md:block"
      >
        <EnsoMark className="!static" color="fresh" opacity={0.13} size={380} />
      </ParallaxLayer>

      <div className="shell relative grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="max-w-xl">
          <Eyebrow tone="fresh">{vision.eyebrow}</Eyebrow>
          <FloatingHeading
            speed={-16}
            className="display-2 mt-4 text-shadow"
          >
            {vision.title}
          </FloatingHeading>
          <div className="prose-kokoro mt-6 text-forest/85">
            {vision.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <blockquote className="float-h mt-8 border-l-2 border-fresh pl-5 font-display text-2xl leading-snug text-shadow" style={{ ["--pspeed" as string]: `${motion.vision.phraseShift}px` }}>
            &ldquo;{vision.pull}&rdquo;
          </blockquote>
        </div>

        <div className="relative mx-auto w-full max-w-[26rem]">
          <ParallaxLayer speed={motion.vision.photoShift}>
            <OrganicMedia
              image={vision.image}
              shape="arch"
              sizes="(max-width: 1024px) 85vw, 34vw"
              ratio="4 / 5"
            />
          </ParallaxLayer>
          <div className="absolute -left-6 bottom-10 grid h-32 w-32 place-items-center rounded-full bg-fresh text-center">
            <span className="eyebrow flex flex-col gap-0.5 text-[0.7rem] text-shadow">
              {vision.badge.map((b) => (
                <span key={b}>{b}</span>
              ))}
            </span>
          </div>
        </div>
      </div>

      <SectionWave color="shadow" height={90} drift={7} />
    </ScrollScene>
  );
}
