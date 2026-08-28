import Image from "next/image";
import Eyebrow from "@/app/components/ui/Eyebrow";
import Button from "@/app/components/ui/Button";
import { finalCta } from "@/lib/data/content";
import { contact } from "@/lib/data/contact";

export default function FinalCta() {
  return (
    <section
      id={finalCta.id}
      className="on-dark relative isolate overflow-hidden bg-shadow py-[calc(var(--section-y)+3rem)] text-pale"
    >
      <Image
        src={finalCta.image.src}
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-shadow/85" />

      <div className="shell text-center">
        <Eyebrow tone="fresh" className="block text-center">
          {finalCta.eyebrow}
        </Eyebrow>
        <h2 className="display-1 mx-auto mt-4 max-w-[16ch] text-pale">
          {finalCta.title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-pale/85">
          {finalCta.body}
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Button href={contact.bookingHref} on="dark" variant="solid">
            {finalCta.primary.label}
          </Button>
          <Button
            href={`mailto:${contact.email}`}
            on="dark"
            variant="ghost"
            withArrow={false}
          >
            {finalCta.secondary.label}
          </Button>
        </div>

        <p className="mt-10 font-display text-2xl text-fresh">
          {finalCta.signoff}
        </p>
      </div>
    </section>
  );
}
