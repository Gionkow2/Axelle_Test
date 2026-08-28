import Eyebrow from "@/app/components/ui/Eyebrow";
import Button from "@/app/components/ui/Button";
import BrandLogo from "@/app/components/ui/BrandLogo";
import EnsoMark from "@/app/components/ui/EnsoMark";
import { giftCard } from "@/lib/data/content";
import { contact } from "@/lib/data/contact";

export default function GiftCard() {
  return (
    <section
      id={giftCard.id}
      className="relative overflow-hidden bg-pale py-[var(--section-y)]"
    >
      <div className="shell grid items-center gap-14 md:grid-cols-2 md:gap-10">
        {/* recreated voucher visual (DOM, not an image) */}
        <div className="relative mx-auto grid w-full max-w-[30rem] place-items-center py-8">
          <div
            aria-hidden
            className="absolute inset-0 m-auto aspect-square w-[24rem] rounded-full bg-sky"
          />
          <div className="relative aspect-[8/5] w-[92%] -rotate-[7deg] overflow-hidden rounded-[var(--radius-card)] bg-shadow p-8 text-pale shadow-[0_32px_70px_-26px_rgba(38,64,5,0.65)]">
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
          <Eyebrow tone="fresh">{giftCard.eyebrow}</Eyebrow>
          <h2 className="display-2 mt-4 text-shadow">{giftCard.title}</h2>
          <p className="mt-6 text-lg text-forest/85">{giftCard.body}</p>
          <div className="mt-8">
            <Button href={contact.bookingHref} on="light" variant="solid">
              {giftCard.cta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
