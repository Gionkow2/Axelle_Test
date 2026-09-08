import Image from "next/image";
import Button from "@/app/components/ui/Button";
import EnsoMark from "@/app/components/ui/EnsoMark";
import {
  ScrollScene,
  ParallaxLayer,
} from "@/app/components/motion/primitives";
import { motion } from "@/lib/motion";
import { services, homeMassage } from "@/lib/data/content";
import { contact } from "@/lib/data/contact";

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
      className="relative overflow-hidden bg-pale pb-[calc(var(--section-y)*0.5)] pt-[var(--section-y)]"
    >
      {/* the entire section drifts as ONE unit — nothing moves relative to
          anything else inside it */}
      <ParallaxLayer as="div" speed={motion.services.shift} className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-4 hidden md:block"
        >
          <EnsoMark className="!static" color="fresh" opacity={0.14} size={360} />
        </div>

        <div className="shell relative">
          <h2 className="display-2 max-w-[16ch] text-shadow">{services.title}</h2>

          <ul className="mt-14 grid gap-7 md:grid-cols-3">
            {services.cards.map((card) => {
              const t = TONE[card.tone];
              return (
                <li key={card.title} className="relative">
                  <a
                    href={contact.whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${card.title} — boek via WhatsApp`}
                    className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] shadow-[0_18px_40px_-24px_rgba(38,64,5,0.4)]"
                  >
                    {/* card body — gently dims back on hover */}
                    <div className="flex flex-1 flex-col transition-opacity duration-300 group-hover:opacity-85">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={card.image.src}
                          alt={card.image.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 30vw"
                          className="object-cover"
                        />
                      </div>
                      <div className={`flex flex-1 flex-col p-7 ${t.panel}`}>
                        <h3 className={`display-3 text-[1.6rem] ${t.title}`}>
                          {card.title}
                        </h3>
                        <p
                          className={`mt-3 flex-1 text-[0.95rem] leading-relaxed ${t.body}`}
                        >
                          {card.body}
                        </p>
                        <p
                          className={`mt-6 border-t pt-4 text-[0.85rem] font-semibold ${t.rule} ${t.body}`}
                        >
                          {card.meta}
                        </p>
                      </div>
                    </div>

                    {/* hover overlay — green arrow + "Massage boeken" */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-pale/55 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-100"
                    >
                      <span className="text-4xl leading-none text-shadow transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                      <span className="font-display text-xl text-shadow">
                        Massage boeken
                      </span>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* massage aan huis — banner spanning the full card row: left edge of
              the first card → right edge of the third card */}
          <div className="mt-9">
            <div className="flex flex-col items-center gap-5 rounded-[var(--radius-card)] bg-shadow px-8 py-7 text-center text-pale shadow-[0_18px_40px_-24px_rgba(38,64,5,0.4)] sm:flex-row sm:justify-between sm:gap-8 sm:text-left">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-fresh text-shadow"
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 80 80"
                    focusable="false"
                  >
                    <path
                      d="M14 36 40 14l26 22M22 32v30h36V32M34 62V44h12v18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div>
                  <p className="eyebrow text-fresh">{homeMassage.eyebrow}</p>
                  <p className="mt-1 font-display text-xl text-pale">
                    {homeMassage.title}
                  </p>
                </div>
              </div>
              <Button
                href={contact.whatsappHref}
                on="dark"
                variant="solid"
                className="shrink-0"
              >
                {homeMassage.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </ParallaxLayer>
    </ScrollScene>
  );
}
