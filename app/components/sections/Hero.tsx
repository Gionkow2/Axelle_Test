import Image from "next/image";
import Eyebrow from "@/app/components/ui/Eyebrow";
import Button from "@/app/components/ui/Button";
import Pill from "@/app/components/ui/Pill";
import SectionWave from "@/app/components/ui/SectionWave";
import { hero } from "@/lib/data/content";
import { contact } from "@/lib/data/contact";

export default function Hero() {
  return (
    <section
      id="top"
      className="on-dark relative isolate flex min-h-[92vh] items-end overflow-hidden bg-shadow pb-28 pt-32 text-pale sm:pb-32"
    >
      {/* full-bleed photograph + tint (decorative) */}
      <Image
        src={hero.image.src}
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-[70%_center]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-shadow via-shadow/85 to-shadow/30"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-shadow/95 via-shadow/10 to-shadow/40"
      />

      <div className="shell">
        <div className="max-w-2xl">
          <Eyebrow tone="fresh">{hero.eyebrow}</Eyebrow>
          <h1 className="display-1 mt-5 text-pale">
            {hero.titleLead}{" "}
            <span className="block text-pale">{hero.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-pale/85">{hero.body}</p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href={contact.bookingHref} on="dark" variant="solid">
              {hero.primary.label}
            </Button>
            <Button href={hero.secondary.href} on="dark" variant="ghost" withArrow={false}>
              {hero.secondary.label}
            </Button>
          </div>
        </div>
      </div>

      {/* floating trust badges, bottom-right of the photo */}
      <div className="absolute bottom-28 right-[var(--gutter)] hidden flex-col items-end gap-3 sm:flex md:flex-row">
        {hero.badges.map((b) => (
          <Pill key={b} tone="pale">
            {b}
          </Pill>
        ))}
      </div>

      <SectionWave color="pale" height={90} />
    </section>
  );
}
