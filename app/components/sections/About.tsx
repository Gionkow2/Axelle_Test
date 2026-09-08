import OrganicMedia from "@/app/components/ui/OrganicMedia";
import EnsoMark from "@/app/components/ui/EnsoMark";
import {
  ScrollScene,
  ParallaxLayer,
} from "@/app/components/motion/primitives";
import { motion } from "@/lib/motion";
import { about } from "@/lib/data/content";

/**
 * About — the whole copy column (heading + body + signature) drifts together
 * as one block; the portrait sits on its own separate soft depth.
 */
export default function About() {
  return (
    <ScrollScene
      id={about.id}
      className="relative overflow-hidden bg-pale pb-[var(--section-y)] pt-[calc(var(--section-y)*0.55)]"
    >
      <div className="shell relative grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        {/* copy — heading, body and signature drift together as one block */}
        <ParallaxLayer
          as="div"
          speed={motion.about.headingShift}
          className="max-w-xl"
        >
          <h2 className="display-2 text-shadow">{about.title}</h2>

          <p className="prose-kokoro mt-7 text-forest/85">{about.lead}</p>

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
        </ParallaxLayer>

        {/* media cluster — portrait and inset drift on separate depths */}
        <div className="relative mx-auto w-full max-w-[27rem]">
          <ParallaxLayer speed={motion.about.portraitShift}>
            <OrganicMedia
              image={about.image}
              shape="arch"
              frame="fresh"
              frameSide="br"
              sizes="(max-width: 1024px) 80vw, 30vw"
              ratio="4 / 5"
              objectPosition="50% 22%"
            />
          </ParallaxLayer>

          {/* badge — "opgeleid in Thailand"  weg gelaten*/}


          {/* inset — hands weg*/}

        </div>
      </div>
    </ScrollScene>
  );
}
