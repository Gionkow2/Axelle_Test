/**
 * SINGLE SOURCE OF TRUTH for every business fact used across the site
 * (Header, Footer, CTAs, metadata). Never hard-code these values in a
 * component — import from here.
 *
 * ─────────────────────────────────────────────────────────────────────
 *  PROVENANCE / TODO — replace before launch
 * ─────────────────────────────────────────────────────────────────────
 *  provided      → taken from the supplied brand pack (brandbook business
 *                  card, page 18). Confirm still correct.
 *  MISSING       → not present in any supplied material. Placeholder only.
 *
 *  phone     : provided  (+32 471 29 09 74)
 *  email     : provided  (kokoro.organic.massage@gmail.com)
 *  whatsapp  : MISSING    real wa.me link — currently reuses the phone number
 *  instagram : MISSING    real profile URL — currently "#"
 *  address   : MISSING    the design shows "Adres volgt" (address to follow)
 *  hours     : MISSING    design states "Enkel op afspraak" (by appointment only)
 *  bookingUrl: MISSING    no booking system supplied — CTAs fall back to e-mail
 */

export type Contact = {
  businessName: string;
  ownerName: string;
  ownerRole: string;
  phoneDisplay: string;
  phoneHref: string;
  email: string;
  whatsappHref: string;
  instagramHref: string;
  addressLabel: string;
  availabilityLabel: string;
  /** Primary action for every "book" button until a real booking tool exists. */
  bookingHref: string;
};

const phoneE164 = "+32471290974";

export const contact: Contact = {
  businessName: "Kokoro Organic Massage",
  ownerName: "Axelle Michiels",
  ownerRole: "Holistisch masseuse",
  phoneDisplay: "+32 471 29 09 74",
  phoneHref: `tel:${phoneE164}`,
  email: "kokoro.organic.massage@gmail.com",
  whatsappHref: `https://wa.me/${phoneE164.replace("+", "")}`,
  instagramHref: "#",
  addressLabel: "Adres volgt",
  availabilityLabel: "Enkel op afspraak",
  bookingHref:
    "mailto:kokoro.organic.massage@gmail.com?subject=Massage%20boeken%20bij%20Kokoro",
};
