import Eyebrow from "@/app/components/ui/Eyebrow";
import Button from "@/app/components/ui/Button";
import SectionWave from "@/app/components/ui/SectionWave";
import {
  ScrollScene,
  ParallaxLayer,
  FloatingHeading,
} from "@/app/components/motion/primitives";
import { motion } from "@/lib/motion";
import { homeMassage } from "@/lib/data/content";
import { contact } from "@/lib/data/contact";

export default function HomeMassage() {
  return (
    <ScrollScene className="on-dark relative overflow-hidden bg-forest py-[calc(var(--section-y)+2rem)] text-pale">
      {/* concentric ring decoration — two depths */}
      <div
        aria-hidden
        className="ring-a absolute -right-40 top-1/2 h-[36rem] w-[36rem] -translate-y-1/2 rounded-full border-[3.5rem] border-shadow/40"
      />
      <div
        aria-hidden
        className="ring-b absolute -right-24 top-1/2 h-[22rem] w-[22rem] -translate-y-1/2 rounded-full border-[2.5rem] border-shadow/30"
      />

      <div className="shell relative grid items-center gap-12 md:grid-cols-[1.2fr_0.8fr]">
        <div className="max-w-lg">
          <Eyebrow tone="sky">{homeMassage.eyebrow}</Eyebrow>
          <FloatingHeading
            speed={motion.home.headingShift}
            className="display-2 mt-4 text-pale"
          >
            {homeMassage.title}
          </FloatingHeading>
          <p className="mt-6 text-lg text-pale/80">{homeMassage.body}</p>
          <div className="mt-8">
            <Button href={contact.bookingHref} on="dark" variant="solid">
              {homeMassage.cta.label}
            </Button>
          </div>
        </div>

        <ParallaxLayer
          speed={motion.home.artShift}
          className="mx-auto grid aspect-square w-full max-w-[20rem] place-items-center rounded-full bg-fresh text-center"
        >
          <div className="flex flex-col items-center gap-4 px-8">
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              aria-hidden
              focusable="false"
              className="text-shadow"
            >
              <path
                d="M14 36 40 14l26 22M22 32v30h36V32M34 62V44h12v18"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="eyebrow text-shadow">{homeMassage.badge}</span>
          </div>
        </ParallaxLayer>
      </div>

      <SectionWave color="fresh" height={80} drift={6} />
    </ScrollScene>
  );
}
