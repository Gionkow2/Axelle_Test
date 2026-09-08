import EnsoMark from "@/app/components/ui/EnsoMark";
import SectionWave from "@/app/components/ui/SectionWave";
import {
  ScrollScene,
  ParallaxLayer,
} from "@/app/components/motion/primitives";
import { motion } from "@/lib/motion";
import { testimonials } from "@/lib/data/content";

/**
 * Testimonials — three beige cards. The whole content block (heading + cards +
 * quotation marks) stays locked together and drifts as ONE unit; only the
 * yellow Kokoro mark on the left stays fixed to the background, so the block
 * parallaxes gently against it.
 */
export default function Testimonials() {
  return (
    <ScrollScene className="relative overflow-hidden bg-fresh py-[calc(var(--section-y)+2rem)] text-shadow">
      {/* brand mark — fixed to the section background, bottom-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-[-6rem] hidden md:block"
      >
        <EnsoMark className="!static" color="pale" opacity={0.16} size={460} />
      </div>

      {/* everything below drifts together as one unit, relative to the mark */}
      <ParallaxLayer as="div" speed={motion.testimonials.titleShift} className="relative">
        <div className="shell">
          <h2 className="display-2 text-shadow">{testimonials.title}</h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.items.map((item) => (
              <figure
                key={item.quote}
                className="flex flex-col rounded-[var(--radius-card)] bg-pale p-8 text-shadow"
              >
                <span
                  aria-hidden
                  className="font-display text-5xl leading-none text-fresh"
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
                className="font-display text-5xl leading-none text-fresh"
              >
                &ldquo;
              </span>
              <p className="mt-3 flex-1 font-display text-[1.7rem] leading-tight text-shadow">
                {testimonials.pull.join(" ")}
              </p>
            </div>
          </div>
        </div>
      </ParallaxLayer>

      <SectionWave color="pale" height={80} flip drift={6} />
    </ScrollScene>
  );
}
