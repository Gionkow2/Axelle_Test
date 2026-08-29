import OrganicMedia from "@/app/components/ui/OrganicMedia";
import Eyebrow from "@/app/components/ui/Eyebrow";
import Pill from "@/app/components/ui/Pill";
import EnsoMark from "@/app/components/ui/EnsoMark";
import JourneyRibbon from "@/app/components/ui/JourneyRibbon";
import { approach, organic } from "@/lib/data/content";

/**
 * Holistic approach + Organic philosophy live in ONE wrapper because the
 * Journey River flows across both. The wrapper owns the river; the two
 * child blocks only provide content and deliberately overlap vertically.
 */
export default function ApproachJourney() {
  return (
    <div className="relative isolate overflow-x-clip bg-pale">
      <JourneyRibbon />

      {/* faint swirl echo, decorative */}
      <EnsoMark
        className="-right-24 top-1/3 hidden lg:block"
        color="fresh"
        opacity={0.1}
        size={420}
      />

      {/* ---------------------------------------------------- holistic aanpak */}
      <section
        id={approach.id}
        className="relative z-[var(--z-content)] pt-[var(--section-y)]"
      >
        <div className="shell grid items-center gap-10 lg:grid-cols-[0.95fr_1.1fr] lg:gap-6">
          <OrganicMedia
            image={approach.image}
            shape="arch"
            frame="fresh"
            frameSide="bl"
            sizes="(max-width: 1024px) 85vw, 38vw"
            ratio="4 / 5"
            className="mx-auto w-full max-w-[26rem]"
          />

          <div className="relative rounded-[var(--radius-soft)] bg-shadow p-9 pb-10 text-pale sm:p-12 sm:pb-12 lg:-ml-16">
            <Eyebrow tone="fresh">{approach.eyebrow}</Eyebrow>
            <h2 className="display-3 mt-4 max-w-[18ch] text-pale">
              {approach.title}
            </h2>
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
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- waarom organic */}
      <section
        id={organic.id}
        className="relative z-[var(--z-content)] -mt-6 pb-[calc(var(--section-y)*0.5)] pt-[calc(var(--section-y)*0.75)] lg:-mt-16"
      >
        <div className="shell grid items-center gap-10 lg:grid-cols-[1.1fr_0.95fr] lg:gap-6">
          <div className="relative rounded-[var(--radius-soft)] bg-fresh p-9 text-shadow sm:p-12 lg:-mr-16 lg:p-14">
            <Eyebrow tone="shadow">{organic.eyebrow}</Eyebrow>
            <h2 className="display-3 mt-4 text-shadow">{organic.title}</h2>
            <div className="prose-kokoro mt-5 text-forest/90">
              {organic.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {organic.tags.map((t) => (
                <Pill key={t} tone="pale">
                  {t}
                </Pill>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[26rem]">
            <OrganicMedia
              image={organic.image}
              shape="arch"
              frame="pale"
              frameSide="br"
              sizes="(max-width: 1024px) 85vw, 38vw"
              ratio="4 / 5"
            />
            <div className="absolute -bottom-6 -right-4 grid h-28 w-28 place-items-center rounded-full bg-shadow text-center sm:h-32 sm:w-32">
              <span className="px-4 text-[0.8rem] font-semibold leading-tight text-pale">
                {organic.badge}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
