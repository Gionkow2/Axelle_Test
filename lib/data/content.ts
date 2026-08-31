/**
 * ALL page copy for the Kokoro one-pager, kept out of the components.
 * Dutch / Flemish, informal and warm — do not "corporate-ify" this voice.
 *
 * Text is the finalised wording shown in the design references
 * (design-reference/sections/*). The tone-of-voice document was used only
 * to check register, never to override the comps.
 *
 * Nothing here invents prices, durations, testimonials names, certifications
 * or medical claims. Where the design shows a deliberate placeholder
 * ("Duur & prijs op aanvraag", "KOKORO-KLANT") it is reproduced verbatim.
 */

export type ImageAsset = {
  src: string;
  width: number;
  height: number;
  /** Empty string => decorative (aria-hidden / alt=""). */
  alt: string;
};

export type NavLink = { label: string; href: string };

export type Cta = { label: string; href: string; variant?: "solid" | "ghost" };

/* ------------------------------------------------------------------ images */

export const images = {
  heroMassage: {
    src: "/assets/kokoro/hero-massage.jpg",
    width: 2200,
    height: 1258,
    alt: "",
  },
  shoulderMassage: {
    src: "/assets/kokoro/shoulder-massage.jpg",
    width: 1400,
    height: 801,
    alt: "Handen die rustig druk geven op een ontspannen schouder tijdens een massage",
  },
  handsClasped: {
    src: "/assets/kokoro/hands-clasped.jpg",
    width: 587,
    height: 862,
    alt: "Twee handen rustig in elkaar op een schouder",
  },
  oilPour: {
    src: "/assets/kokoro/oil-pour.jpg",
    width: 480,
    height: 705,
    alt: "Warme massage-olie wordt in een handpalm gegoten",
  },
  handWildflowers: {
    src: "/assets/kokoro/hand-wildflowers.jpg",
    width: 2000,
    height: 1146,
    alt: "Een hand houdt wilde bloemen vast in een zonnig veld",
  },
  leafTexture: {
    src: "/assets/kokoro/leaf-texture.jpg",
    width: 531,
    height: 666,
    alt: "",
  },
  /** De echte foto van Axelle (pictures_of_axelle/), bijgesneden naar 4:5. */
  axellePortrait: {
    src: "/assets/kokoro/axelle-portrait.jpg",
    width: 1100,
    height: 1375,
    alt: "Axelle Michiels, omringd door groene bladeren",
  },
} satisfies Record<string, ImageAsset>;

/* -------------------------------------------------------------------- site */

export const site = {
  name: "Kokoro Organic Massage",
  tagline: "Jouw plek voor rust & welzijn",
  description:
    "Aandachtige, holistische massages van Axelle Michiels. Thaise massage, oliemassage en voetreflexologie met 100% biologische producten — op jouw maat, ook aan huis.",
  locale: "nl-BE",
};

export const nav: NavLink[] = [
  { label: "Over Axelle", href: "#over-axelle" },
  { label: "Massages", href: "#massages" },
  { label: "Organic", href: "#organic" },
  { label: "Cadeaubon", href: "#cadeaubon" },
];

/* -------------------------------------------------------------------- hero */

export const hero = {
  eyebrow: "Aandacht voor lichaam & geest",
  welcome: "Welkom bij Kokoro",
  titleLead: "Jouw plek voor",
  titleAccent: "rust & welzijn.",
  body: "Kom tot rust en laat je hoofd volledig leegmaken. Met mijn holistische aanpak zorg ik voor de massage die jij op dit moment nodig hebt.",
  primary: { label: "Massage boeken", href: "#afspraak" } as Cta,
  secondary: { label: "Mijn aanpak", href: "#aanpak" } as Cta,
  badges: ["100% biologische producten", "Op jouw maat"],
  image: images.heroMassage,
};

/* -------------------------------------------------------------- over axelle */

export const about = {
  id: "over-axelle",
  eyebrow: "Wie ben ik",
  title: "Welkom, ik ben Axelle.",
  lead: "Ik doe met volle goesting wat ik het allerleukste vind: mensen laten ontspannen.",
  paragraphs: [
    "Ik ben gedreven en gepassioneerd door mijn vak. Na een intense opleiding in Wolvertem reisde ik naar Thailand om mijn diploma als Thaise masseuse te behalen. Sindsdien blijf ik leren en mijn aanbod verdiepen.",
    "Intussen heb ik al veel ervaring opgedaan en kijk ik ernaar uit om jou een welverdiend ontspanningsmoment te bieden.",
  ],
  signatureName: "Axelle Michiels",
  signatureRole: "Holistisch masseuse",
  imageBadge: "opgeleid in Thailand",
  image: images.axellePortrait,
  inset: images.handsClasped,
};

/* ------------------------------------------------ approach + journey (grouped) */

export const approach = {
  id: "aanpak",
  eyebrow: "Mijn holistische aanpak",
  title: "Lijf én hoofd horen bij elkaar.",
  paragraphs: [
    "Een goede massage is meer dan alleen losse spieren. Als je hoofd vol zit, voel je dat vaak ook in je lichaam — en andersom.",
    "Daarom neem ik eerst de tijd om te voelen wat jij precies nodig hebt. Zo ontstaat een behandeling die je van top tot teen laat ontspannen, vanbinnen en vanbuiten.",
  ],
  pillars: [
    { term: "luisteren", detail: "naar jouw lijf" },
    { term: "aarden", detail: "in het moment" },
    { term: "loslaten", detail: "op jouw tempo" },
  ],
  image: images.shoulderMassage,
};

export const organic = {
  id: "organic",
  eyebrow: "Waarom organic",
  title: "Puur, eerlijk en dicht bij de natuur.",
  paragraphs: [
    "Alles wat ik gebruik in mijn praktijk — van olie en zout tot doekjes en potjes — kies ik bewust en biologisch. Geen overbodige toevoegingen op je huid, alleen pure producten.",
    "Dat voel je tijdens de massage. Het helpt je om sneller te zakken, te vertragen en opnieuw contact te maken met je lichaam.",
  ],
  tags: ["biologische olie", "pure materialen", "bewuste verzorging"],
  badge: "100% bewuste keuze",
  image: images.handWildflowers,
};

/* ---------------------------------------------------------------- massages */

export type ServiceCard = {
  kicker: string;
  title: string;
  body: string;
  meta: string;
  tone: "forest" | "green" | "brown";
  image: ImageAsset;
};

export const services = {
  id: "massages",
  eyebrow: "De massages",
  title: "Wat heeft jouw lichaam vandaag nodig?",
  metaFallback: "Duur & prijs op aanvraag",
  cards: [
    {
      kicker: "Actief & grondig",
      title: "Thaise massage",
      body: "Perfect als je stijve spieren en een vermoeid lijf weer soepel wil voelen. Je stapt eraf met een licht en energiek gevoel.",
      meta: "Duur & prijs op aanvraag",
      tone: "forest",
      image: images.shoulderMassage,
    },
    {
      kicker: "Zacht & vloeiend",
      title: "Oliemassage",
      body: "Puur ontspannen. Zachte bewegingen brengen je hele lijf tot rust. Ideaal als je even helemaal niks meer hoeft en wil wegdromen.",
      meta: "Duur & prijs op aanvraag",
      tone: "green",
      image: images.oilPour,
    },
    {
      kicker: "Klein gebaar, groot effect",
      title: "Voetreflexologie",
      body: "Deze massage focust op je voeten en helpt je van top tot teen te ontspannen. Heerlijk als afsluiter van een lange dag.",
      meta: "Duur & prijs op aanvraag",
      tone: "brown",
      image: images.handsClasped,
    },
  ] satisfies ServiceCard[],
  footnote:
    "Twijfel je welke massage het beste past? Vertel me hoe je je voelt, dan kiezen we samen.",
  cta: { label: "Vind jouw massage", href: "#afspraak" } as Cta,
};

/* --------------------------------------------------------- massage aan huis */

export const homeMassage = {
  eyebrow: "Massage aan huis",
  title: "Liever niet de deur uit?",
  body: "Geen probleem. Ik kom graag bij jou langs, zodat je meteen na afloop lekker verder kunt ontspannen op je eigen bank.",
  cta: { label: "Vraag beschikbaarheid", href: "#afspraak" } as Cta,
  badge: "Rust, gewoon thuis",
};

/* ------------------------------------------------------------ testimonials */

export type Testimonial = { quote: string; author: string };

export const testimonials = {
  eyebrow: "Wat klanten zeggen",
  title: "Een warm gevoel dat blijft.",
  items: [
    {
      quote:
        "Zo'n fijne, warme sfeer. Ik kwam binnen met een hoofd vol stress en liep buiten weer helemaal fris naar buiten!",
      author: "Kokoro-klant",
    },
    {
      quote:
        "Eindelijk iemand die echt naar je luistert. Ik voelde me meteen op mijn gemak.",
      author: "Kokoro-klant",
    },
  ] satisfies Testimonial[],
  pull: ["aanraking", "voor hart", "& geest."],
};

/* --------------------------------------------------------------- cadeaubon */

export const giftCard = {
  id: "cadeaubon",
  eyebrow: "Geef ontspanning cadeau",
  title: "Cadeautje voor iemand anders?",
  body: "Ken je iemand die wel wat ontspanning kan gebruiken? Geef een Kokoro-cadeaubon en maak iemand oprecht blij.",
  cta: { label: "Verras iemand", href: "#afspraak" } as Cta,
  card: {
    label: "Cadeaubon",
    line: "Een moment van rust, speciaal voor jou.",
  },
};

/* ----------------------------------------------------------------- visie */

export const vision = {
  eyebrow: "Waar Kokoro naartoe groeit",
  title: "Een oase voor welzijn, creativiteit & verbinding.",
  paragraphs: [
    "Kokoro begint bij massage, maar stopt daar niet. Het idee erachter is groter: een plek voor mensen die de stress en snelheid van deze wereld zien, en er bewust niet in meegaan.",
    "Op termijn groeit Kokoro uit tot een plek waar welzijn, handwerk en creativiteit centraal staan. Voor nu begint het bij één massage. De rest groeit mee.",
  ],
  pull: "Vertragen is geen luxe. Het is thuiskomen bij jezelf.",
  badge: ["rust", "balans", "verbinding"],
  image: images.handWildflowers,
};

/* --------------------------------------------------------------- final cta */

export const finalCta = {
  id: "afspraak",
  eyebrow: "Jouw moment wacht",
  title: "Klaar voor jouw moment van rust?",
  body: "Jij verdient dit. Boek vandaag nog je afspraak en voel binnenkort hoe fijn het is om weer helemaal opgeladen te zijn.",
  primary: { label: "Boek je massage", href: "" } as Cta, // href filled from contact
  secondary: { label: "Stuur een bericht", href: "" } as Cta,
  signoff: "Tot snel!",
  image: images.handWildflowers,
};

/* ------------------------------------------------------------------ footer */

export const footer = {
  blurb:
    "Aandachtige massages voor rust, balans en een diepere verbinding met je lichaam.",
  columns: [
    {
      heading: "Ontdek",
      links: [
        { label: "Mijn aanpak", href: "#aanpak" },
        { label: "Massages", href: "#massages" },
        { label: "Cadeaubon", href: "#cadeaubon" },
      ],
    },
    {
      heading: "Contact",
      links: [
        { label: "Telefoon", href: "" }, // filled from contact
        { label: "WhatsApp", href: "" },
        { label: "Instagram", href: "" },
      ],
    },
    {
      heading: "Praktijk",
      links: [
        { label: "Adres volgt", href: "#" },
        { label: "Enkel op afspraak", href: "#afspraak" },
        { label: "Massage aan huis", href: "#afspraak" },
      ],
    },
  ],
  legal: "© 2026 Kokoro Organic Massage",
  credit: "Met aandacht gemaakt",
};
