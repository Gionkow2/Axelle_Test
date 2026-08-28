import Image from "next/image";
import JourneyRibbon from "@/app/components/ui/JourneyRibbon";
import { StickyScene } from "@/app/components/motion/primitives";
import { motion } from "@/lib/motion";
import { approach, approachStory } from "@/lib/data/content";

const { phrase, ambient, photos } = approachStory;

const OBJECT_POS = ["50% 40%", "50% 50%", "50% 60%"];
const AMBIENT_POS = [
  "left-[6%] top-[13%]",
  "right-[7%] bottom-[11%]",
  "right-[5%] top-[19%]",
  "left-[9%] bottom-[21%]",
];

/**
 * The pinned "suspended typography" beat that opens ApproachJourney.
 * Structure only — all motion is CSS driven by the sticky scene's inherited
 * `--sp` (written by the page's one MotionController). No client JS here.
 *
 *   layers: photography · warm overlay · Journey River · ambient words · phrase
 */
export default function ApproachStory() {
  return (
    <StickyScene
      id={approach.id}
      length={motion.approach.length}
      className="approach-story"
      innerClassName="story-stage"
      aria-label={approach.eyebrow}
    >
      {/* 1 — photography */}
      <div className="story-photos" aria-hidden>
        {photos.map((img, i) => (
          <Image
            key={img.src}
            src={img.src}
            alt=""
            fill
            sizes="100vw"
            priority={i === 0}
            className={`story-photo story-photo-${i + 1}`}
            style={{ objectPosition: OBJECT_POS[i] ?? "50% 50%" }}
          />
        ))}
      </div>

      {/* 2 — warm contrast overlay */}
      <div className="story-overlay" aria-hidden />

      {/* 3 — journey river */}
      <JourneyRibbon />

      {/* 4 — ambient drifting words */}
      <div className="story-ambient" aria-hidden>
        {ambient.map((word, i) => (
          <span
            key={word}
            className={`story-word story-word-${i + 1} ${AMBIENT_POS[i] ?? ""}`}
          >
            {word}
          </span>
        ))}
      </div>

      {/* 5 — the anchored phrase */}
      <div className="story-phrase-wrap">
        <p className="story-phrase">
          {phrase.map((beat, i) => (
            <span key={beat} className={`story-beat story-beat-${i + 1}`}>
              {beat}
              {i < phrase.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
      </div>
    </StickyScene>
  );
}
