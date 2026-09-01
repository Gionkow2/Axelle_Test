import SectionWave from "@/app/components/ui/SectionWave";
import {
  ScrollScene,
  FloatingHeading,
} from "@/app/components/motion/primitives";
import { motion } from "@/lib/motion";
import { testimonials } from "@/lib/data/content";

/**
 * Testimonials — three beige cards. Quote text is deliberately stationary
 * (never make a reader chase moving words); only the section title and the
 * decorative quotation marks drift.
 */
export default function Testimonials() {
  return (
    <ScrollScene className="relative overflow-hidden bg-fresh py-[calc(var(--section-y)+2rem)] text-shadow">
      <div className="shell">
        <FloatingHeading
          speed={motion.testimonials.titleShift}
          className="display-2 text-shadow"
        >
          {testimonials.title}
        </FloatingHeading>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.items.map((item) => (
            <figure
              key={item.quote}
              className="flex flex-col rounded-[var(--radius-card)] bg-pale p-8 text-shadow"
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

          {/* brand closing thought — same beige card, no attribution */}
          <div className="flex flex-col rounded-[var(--radius-card)] bg-pale p-8 text-shadow">
            <span
              aria-hidden
              className="quote-mark font-display text-5xl leading-none text-fresh"
            >
              &ldquo;
            </span>
            <p className="mt-3 flex-1 font-display text-[1.7rem] leading-tight text-shadow">
              {testimonials.pull.join(" ")}
            </p>
          </div>
        </div>
      </div>

      <SectionWave color="pale" height={80} flip drift={6} />
    </ScrollScene>
  );
}
