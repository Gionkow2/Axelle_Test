import OrganicMedia from "@/app/components/ui/OrganicMedia";
import Eyebrow from "@/app/components/ui/Eyebrow";
import EnsoMark from "@/app/components/ui/EnsoMark";
import SectionWave from "@/app/components/ui/SectionWave";
import { vision } from "@/lib/data/content";

export default function Vision() {
  return (
    <section className="relative overflow-hidden bg-pale pb-[calc(var(--section-y)+2rem)] pt-[var(--section-y)]">
      <EnsoMark
        className="-left-28 bottom-6 hidden md:block"
        color="fresh"
        opacity={0.13}
        size={380}
      />

      <div className="shell grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="max-w-xl">
          <Eyebrow tone="fresh">{vision.eyebrow}</Eyebrow>
          <h2 className="display-2 mt-4 text-shadow">{vision.title}</h2>
          <div className="prose-kokoro mt-6 text-forest/85">
            {vision.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <blockquote className="mt-8 border-l-2 border-fresh pl-5 font-display text-2xl leading-snug text-shadow">
            &ldquo;{vision.pull}&rdquo;
          </blockquote>
        </div>

        <div className="relative mx-auto w-full max-w-[26rem]">
          <OrganicMedia
            image={vision.image}
            shape="arch"
            sizes="(max-width: 1024px) 85vw, 34vw"
            ratio="4 / 5"
          />
          <div className="absolute -left-6 bottom-10 grid h-32 w-32 place-items-center rounded-full bg-fresh text-center">
            <span className="eyebrow flex flex-col gap-0.5 text-[0.7rem] text-shadow">
              {vision.badge.map((b) => (
                <span key={b}>{b}</span>
              ))}
            </span>
          </div>
        </div>
      </div>

      <SectionWave color="shadow" height={90} />
    </section>
  );
}
