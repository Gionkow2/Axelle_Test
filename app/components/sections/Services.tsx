import Image from "next/image";
import SectionWave from "@/app/components/ui/SectionWave";
import EnsoMark from "@/app/components/ui/EnsoMark";
import {
  ScrollScene,
  ParallaxLayer,
} from "@/app/components/motion/primitives";
import { motion } from "@/lib/motion";
import { services } from "@/lib/data/content";

const TONE: Record<
  "forest" | "green" | "brown",
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
  brown: {
    panel: "bg-forest",
    kicker: "text-pale/70",
    title: "text-pale",
    body: "text-pale/80",
    rule: "border-pale/20",
  },
};

export default function Services() {
  return (
    <ScrollScene
      id={services.id}
      className="relative overflow-hidden bg-pale pb-[calc(var(--section-y)+3rem)] pt-[var(--section-y)]"
    >
      <ParallaxLayer
        as="div"
        speed={motion.services.markShift}
        aria-hidden
        className="pointer-events-none absolute -right-32 top-4 hidden md:block"
      >
        <EnsoMark className="!static" color="fresh" opacity={0.14} size={360} />
      </ParallaxLayer>

      <div className="shell relative">
        <h2 className="services-head display-2 max-w-[16ch] text-shadow">
          {services.title}
        </h2>

        <ul className="mt-14 grid gap-7 md:grid-cols-3">
          {services.cards.map((card, i) => {
            const t = TONE[card.tone];
            return (
              <li
                key={card.title}
                className="service-card flex flex-col overflow-hidden rounded-[var(--radius-card)] shadow-[0_18px_40px_-24px_rgba(38,64,5,0.4)]"
                style={{ ["--card-i" as string]: i }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={card.image.src}
                    alt={card.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="service-photo object-cover"
                  />
                </div>
                <div className={`flex flex-1 flex-col p-7 ${t.panel}`}>
                  <h3 className={`display-3 text-[1.6rem] ${t.title}`}>
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


      </div>

      <SectionWave color="forest" height={80} flip drift={7} />
    </ScrollScene>
  );
}
