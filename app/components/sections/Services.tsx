import Image from "next/image";
import Eyebrow from "@/app/components/ui/Eyebrow";
import Button from "@/app/components/ui/Button";
import SectionWave from "@/app/components/ui/SectionWave";
import EnsoMark from "@/app/components/ui/EnsoMark";
import { services } from "@/lib/data/content";
import { contact } from "@/lib/data/contact";

const TONE: Record<
  "forest" | "green" | "sky",
  { panel: string; kicker: string; title: string; body: string; rule: string }
> = {
  forest: {
    panel: "bg-shadow",
    kicker: "text-fresh",
    title: "text-pale",
    body: "text-pale/80",
    rule: "border-pale/25",
  },
  green: {
    panel: "bg-fresh",
    kicker: "text-shadow/70",
    title: "text-shadow",
    body: "text-forest/85",
    rule: "border-shadow/25",
  },
  sky: {
    panel: "bg-sky",
    kicker: "text-shadow/60",
    title: "text-shadow",
    body: "text-forest/80",
    rule: "border-shadow/20",
  },
};

export default function Services() {
  return (
    <section
      id={services.id}
      className="relative overflow-hidden bg-pale pb-[calc(var(--section-y)+3rem)] pt-[var(--section-y)]"
    >
      <EnsoMark
        className="-right-32 top-4 hidden md:block"
        color="fresh"
        opacity={0.14}
        size={360}
      />

      <div className="shell relative">
        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <Eyebrow tone="fresh">{services.eyebrow}</Eyebrow>
            <h2 className="display-2 mt-4 max-w-[12ch] text-shadow">
              {services.title}
            </h2>
          </div>
          <p className="text-forest/80 md:pb-2">{services.intro}</p>
        </div>

        <ul className="mt-14 grid gap-7 md:grid-cols-3">
          {services.cards.map((card) => {
            const t = TONE[card.tone];
            return (
              <li
                key={card.title}
                className="flex flex-col overflow-hidden rounded-[var(--radius-card)] shadow-[0_18px_40px_-24px_rgba(38,64,5,0.4)]"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={card.image.src}
                    alt={card.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="object-cover"
                  />
                </div>
                <div className={`flex flex-1 flex-col p-7 ${t.panel}`}>
                  <p className={`eyebrow ${t.kicker}`}>{card.kicker}</p>
                  <h3 className={`display-3 mt-2 text-[1.6rem] ${t.title}`}>
                    {card.title}
                  </h3>
                  <p className={`mt-3 flex-1 text-[0.95rem] leading-relaxed ${t.body}`}>
                    {card.body}
                  </p>
                  <p
                    className={`mt-6 border-t pt-4 text-[0.85rem] font-semibold ${t.rule} ${t.body}`}
                  >
                    {card.meta}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-forest/80">{services.footnote}</p>
          <Button href={contact.bookingHref} on="light" variant="solid">
            {services.cta.label}
          </Button>
        </div>
      </div>

      <SectionWave color="forest" height={80} flip />
    </section>
  );
}
