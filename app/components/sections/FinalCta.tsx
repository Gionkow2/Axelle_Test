import Image from "next/image";
import Button from "@/app/components/ui/Button";
import { ScrollScene } from "@/app/components/motion/primitives";
import { finalCta } from "@/lib/data/content";
import { contact } from "@/lib/data/contact";

/**
 * FinalCta — a warm, hearty close. A horizontal green banner the full width of
 * the card row: the photograph of Axelle sits faded into the left of the
 * background (same treatment as the hero), the copy and the single action
 * (book via WhatsApp) sit to the right on solid green. Yellow section ground.
 */
export default function FinalCta() {
  return (
    <ScrollScene
      id={finalCta.id}
      className="relative overflow-hidden bg-pale py-[calc(var(--section-y)*0.7)]"
    >
      <div className="shell">
        <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-shadow px-8 py-12 text-pale shadow-[0_30px_70px_-40px_rgba(38,64,5,0.45)] md:px-12 md:py-14">
          {/* faded photograph on the background — decorative, like the hero */}
          <div aria-hidden className="absolute inset-0">
            <Image
              src={finalCta.image.src}
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-[22%_center] opacity-40"
            />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-shadow/35 via-shadow/80 to-shadow"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-shadow/80 via-shadow/10 to-shadow/35"
          />

          {/* copy — pushed to the right, clear of the photo */}
          <div className="relative z-10 text-center md:ml-auto md:max-w-lg md:pl-8 md:text-left">
            <p className="eyebrow text-fresh">{finalCta.eyebrow}</p>
            <h2 className="mt-3 font-display text-2xl leading-tight text-pale sm:text-[1.9rem]">
              {finalCta.title}
            </h2>
            <p className="mt-4 text-pale/85">{finalCta.body}</p>

            <div className="mt-8">
              <Button href={contact.whatsappHref} on="dark" variant="solid">
                {finalCta.primary.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ScrollScene>
  );
}
