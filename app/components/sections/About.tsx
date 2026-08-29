import OrganicMedia from "@/app/components/ui/OrganicMedia";
import Eyebrow from "@/app/components/ui/Eyebrow";
import EnsoMark from "@/app/components/ui/EnsoMark";
import {
  ScrollScene,
  ParallaxLayer,
  FloatingHeading,
} from "@/app/components/motion/primitives";
import { motion } from "@/lib/motion";
import { about } from "@/lib/data/content";

/**
 * About — heading, portrait and inset sit on three separate soft depths
 * while the body copy stays completely stable for comfortable reading.
 */
export default function About() {
  return (
    <ScrollScene
      id={about.id}
      className="relative overflow-hidden bg-pale py-[var(--section-y)]"
    >
      <div className="shell relative grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        {/* copy */}
        <div className="max-w-xl">
          <Eyebrow tone="shadow">{about.eyebrow}</Eyebrow>
          <FloatingHeading
            speed={motion.about.headingShift}
            className="display-2 mt-4 text-shadow"
          >
            {about.title}
          </FloatingHeading>

          <p className="mt-7 text-xl leading-snug text-forest">{about.lead}</p>

          <div className="prose-kokoro mt-5 text-forest/85">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="mt-9 flex items-center gap-3">
            <EnsoMark
              className="!static shrink-0"
              color="fresh"
              opacity={1}
              size={40}
            />
            <div>
              <p className="font-display text-lg leading-none text-shadow">
                {about.signatureName}
              </p>
              <p className="eyebrow mt-1 text-fresh">{about.signatureRole}</p>
            </div>
          </div>
        </div>

        {/* media cluster — portrait and inset drift on separate depths */}
        <div className="relative mx-auto w-full max-w-[30rem]">
          <ParallaxLayer speed={motion.about.portraitShift}>
            <OrganicMedia
              image={about.image}
              shape="arch"
              frame="fresh"
              frameSide="br"
              sizes="(max-width: 1024px) 80vw, 30vw"
              ratio="4 / 5"
              objectPosition="50% 30%"
            />
          </ParallaxLayer>

          {/* sky badge — "opgeleid in Thailand" */}
          <div className="absolute -left-4 top-8 grid h-28 w-28 rotate-[-8deg] place-items-center rounded-full bg-sky text-center sm:-left-8">
            <span className="px-3 text-[0.85rem] font-semibold leading-tight text-shadow">
              {about.imageBadge}
            </span>
          </div>

          {/* inset — hands */}
          <ParallaxLayer
            speed={motion.about.insetShift}
            className="absolute -bottom-10 -left-6 w-40 sm:w-48"
          >
            <OrganicMedia
              image={about.inset}
              shape="arch"
              frame="pale"
              frameSide="bl"
              sizes="12rem"
              ratio="3 / 4"
            />
          </ParallaxLayer>
        </div>
      </div>
    </ScrollScene>
  );
}
