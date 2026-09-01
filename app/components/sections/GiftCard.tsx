import Button from "@/app/components/ui/Button";
import BrandLogo from "@/app/components/ui/BrandLogo";
import EnsoMark from "@/app/components/ui/EnsoMark";
import {
  ScrollScene,
  ParallaxLayer,
  FloatingHeading,
} from "@/app/components/motion/primitives";
import { motion } from "@/lib/motion";
import { giftCard } from "@/lib/data/content";
import { contact } from "@/lib/data/contact";

/**
 * GiftCard — the heading drifts slower than the page while the voucher and
 * its sky halo move slightly faster, opening a little depth between them.
 * The card never rotates on scroll or follows the cursor.
 */
export default function GiftCard() {
  return (
    <ScrollScene
      id={giftCard.id}
      className="relative overflow-hidden bg-pale py-[var(--section-y)]"
    >
      <div className="shell relative grid items-center gap-14 md:grid-cols-2 md:gap-10">
        {/* recreated voucher visual (DOM, not an image) */}
        <div className="relative mx-auto grid w-full max-w-[30rem] place-items-center py-8">
          <ParallaxLayer
            as="div"
            speed={-16}
            aria-hidden
            className="absolute inset-0 m-auto aspect-square w-[24rem] rounded-full bg-fresh/70"
          >
            <span className="sr-only" />
          </ParallaxLayer>
          <div className="gift-card-visual relative aspect-[8/5] w-[92%] overflow-hidden rounded-[var(--radius-card)] bg-shadow p-8 text-pale shadow-[0_32px_70px_-26px_rgba(38,64,5,0.65)]">
            <EnsoMark
              className="-right-12 -top-8 rotate-12"
              color="fresh"
              opacity={0.22}
              size={260}
            />
            <BrandLogo size={32} icon="fresh" word="pale" sub="pale" />
            <p className="eyebrow mt-7 text-fresh">{giftCard.card.label}</p>
            <p className="mt-2 max-w-[16rem] font-display text-[1.7rem] leading-tight text-pale">
              {giftCard.card.line}
            </p>
          </div>
        </div>

        {/* copy */}
        <div className="max-w-md">
          <FloatingHeading
            speed={motion.gift.headingShift}
            className="display-2 text-shadow"
          >
            {giftCard.title}
          </FloatingHeading>
          <p className="mt-6 text-lg text-forest/85">{giftCard.body}</p>
          <div className="mt-8">
            <Button href={contact.bookingHref} on="light" variant="solid">
              {giftCard.cta.label}
            </Button>
          </div>
        </div>
      </div>
    </ScrollScene>
  );
}
