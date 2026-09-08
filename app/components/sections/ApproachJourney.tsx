import OrganicMedia from "@/app/components/ui/OrganicMedia";
import EnsoMark from "@/app/components/ui/EnsoMark";
import JourneyRibbon from "@/app/components/ui/JourneyRibbon";
import SectionWave from "@/app/components/ui/SectionWave";
import {
  ScrollScene,
  ParallaxLayer,
} from "@/app/components/motion/primitives";
import { approach, organic } from "@/lib/data/content";

/**
 * Holistic approach + Organic philosophy live in ONE wrapper because the
 * Journey River flows across both. The wrapper owns the river (JourneyRibbon
 * keeps its own scroll controller — the blue current fill + a vertical
 * drift). The two child blocks join the page-wide motion language: each text
 * panel (heading + copy + pillars) floats together a little slower than the
 * page while the photographs drift on a separate depth.
 */
export default function ApproachJourney() {
  return (
    // The river lives entirely inside this wrapper (never behind About). The
    // big top padding is the pale gap BETWEEN the sections where the river's
    // whole opening curve flows in, uncut.
    <div className="relative isolate overflow-x-clip bg-pale pb-[calc(var(--section-y)*0.5)] pt-[calc(var(--section-y)*1.1)]">
      <JourneyRibbon />

      {/* ---------------------------------------------------- holistic aanpak */}
      <ScrollScene
        id={approach.id}
        className="relative z-[var(--z-content)] pt-[calc(var(--section-y)*0.5)]"
      >
        {/* faint swirl echo, decorative — drifts on its own depth */}
        <ParallaxLayer
          as="div"
          speed={-64}
          aria-hidden
          className="pointer-events-none absolute -right-24 top-1/3 hidden lg:block"
        >
          <EnsoMark className="!static" color="fresh" opacity={0.1} size={420} />
        </ParallaxLayer>

        <div className="shell grid items-center gap-10 lg:grid-cols-[0.95fr_1.1fr] lg:gap-6">
          <ParallaxLayer speed={32} className="mx-auto w-full max-w-[26rem]">
            <OrganicMedia
              image={approach.image}
              shape="arch"
              sizes="(max-width: 1024px) 85vw, 38vw"
              ratio="4 / 5"
            />
          </ParallaxLayer>

          <ParallaxLayer
            as="div"
            speed={-18}
            className="relative rounded-[var(--radius-soft)] bg-shadow p-9 pb-10 text-pale sm:p-12 sm:pb-12 lg:-ml-16"
          >
            <h3 className="display-3 max-w-[18ch] text-pale">
              {approach.title}
            </h3>
            <div className="prose-kokoro mt-5 text-pale/80">
              {approach.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <ul className="mt-9 grid grid-cols-3 gap-4">
              {approach.pillars.map((pillar) => (
                <li key={pillar.term} className="border-t border-pale/25 pt-3">
                  <span className="block font-display text-xl text-fresh">
                    {pillar.term}
                  </span>
                  <span className="eyebrow mt-1 block text-[0.62rem] text-pale/60">
                    {pillar.detail}
                  </span>
                </li>
              ))}
            </ul>
          </ParallaxLayer>
        </div>
      </ScrollScene>

      {/* ---------------------------------------------------- waarom organic */}
      <ScrollScene
        id={organic.id}
        className="relative z-[var(--z-content)] pb-[calc(var(--section-y)*0.9)] pt-[calc(var(--section-y)*1.5)]"
      >
        <div className="shell grid items-center gap-10 lg:grid-cols-[1.1fr_0.95fr] lg:gap-6">
          <ParallaxLayer
            as="div"
            speed={-18}
            className="relative rounded-[var(--radius-soft)] bg-fresh p-9 text-shadow sm:p-12 lg:-mr-16 lg:p-14"
          >
            <h3 className="display-3 text-shadow">{organic.title}</h3>
            <div className="prose-kokoro mt-5 text-forest/90">
              {organic.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <ul className="mt-9 grid grid-cols-3 gap-4">
              {organic.tags.map((tags) => (
                <li key={tags} className="border-t border-pale/25 pt-3">
                  <span className="block font-display text-xl text-fresh text-pale opacity-90">
                    {tags}
                  </span>
                </li>
              ))}
            </ul>
          </ParallaxLayer>

          <div className="relative mx-auto w-full max-w-[26rem]">
            <ParallaxLayer speed={32}>
              <OrganicMedia
                image={organic.image}
                shape="arch"
                sizes="(max-width: 1024px) 85vw, 38vw"
                ratio="4 / 5"
              />
            </ParallaxLayer>
            <div className="absolute -bottom-6 -right-4 grid h-28 w-28 place-items-center rounded-full bg-shadow text-center sm:h-32 sm:w-32">
              <span className="px-4 text-[0.8rem] font-semibold leading-tight text-pale">
                {organic.badge}
              </span>
            </div>
          </div>
        </div>
      </ScrollScene>

      {/* seam into the fresh-green Testimonials section */}
      <SectionWave color="fresh" height={80} drift={6} />
    </div>
  );
}
