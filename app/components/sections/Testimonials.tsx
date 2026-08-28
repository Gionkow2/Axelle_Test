import Eyebrow from "@/app/components/ui/Eyebrow";
import SectionWave from "@/app/components/ui/SectionWave";
import {
  ScrollScene,
  FloatingHeading,
} from "@/app/components/motion/primitives";
import { motion } from "@/lib/motion";
import { testimonials } from "@/lib/data/content";

const CARD_TONE = ["bg-pale text-shadow", "bg-sky text-shadow"];

/**
 * Testimonials — quote text is deliberately stationary (never make a reader
 * chase moving words). Only the section title and the decorative quotation
 * marks drift.
 */
export default function Testimonials() {
  return (
    <ScrollScene className="relative overflow-hidden bg-fresh py-[calc(var(--section-y)+2rem)] text-shadow">
      <div className="shell">
        <div className="grid gap-4 md:grid-cols-[1.5fr_1fr] md:items-end">
          <div>
            <Eyebrow tone="shadow">{testimonials.eyebrow}</Eyebrow>
            <FloatingHeading
              speed={motion.testimonials.titleShift}
              className="display-2 mt-4 text-shadow"
            >
              {testimonials.title}
            </FloatingHeading>
          </div>
          <p className="text-forest/80 md:pb-2">{testimonials.intro}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.items.map((item, i) => (
            <figure
              key={item.quote}
              className={`flex flex-col rounded-[var(--radius-card)] p-8 ${CARD_TONE[i]}`}
            >
              <span
                aria-hidden
                className="quote-mark font-display text-5xl leading-none text-fresh"
              >
                &ldquo;
              </span>
              <blockquote className="mt-3 flex-1 text-lg leading-snug">
                {item.quote}
              </blockquote>
              <figcaption className="eyebrow mt-6 text-shadow/60">
                {item.author}
              </figcaption>
            </figure>
          ))}

          {/* brand pull-card — real text, not the supplied graphic */}
          <p className="grid rounded-[var(--radius-card)] bg-shadow p-8 text-right font-display text-[2rem] leading-[1.05] text-fresh">
            <span className="self-end">
              {testimonials.pull.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </span>
          </p>
        </div>
      </div>

      <SectionWave color="pale" height={80} flip drift={6} />
    </ScrollScene>
  );
}
