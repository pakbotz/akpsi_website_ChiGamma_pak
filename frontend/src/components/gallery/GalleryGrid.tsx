'use client';

import { motion, type Variants } from 'framer-motion';
import { CldImage } from 'next-cloudinary';
import { Caveat } from 'next/font/google';
import type { GalleryPhoto } from '@/lib/gallery';

// Handwriting accent face — used only for the little scrapbook details
// (tape labels, placeholder notes), never for real body copy. Scoped to
// this file via next/font so it doesn't touch the site's shared type.
const handwriting = Caveat({ subsets: ['latin'], weight: ['600', '700'] });

// A CSS-columns masonry wall — deliberately not a fixed grid. A grid needs
// span/gap math that only balances at certain photo counts (we hit that
// wall with an earlier version of this component); columns just let each
// photo flow into the shortest column, so this handles 1 photo or 200
// without ever leaving a hole. That's the actual point of building it
// this way: it gives whoever's uploading (the admin Gallery tab) an open
// canvas instead of a fixed number of slots to fill.
//
// Real per-photo dimensions aren't stored (see lib/gallery.ts), so each
// tile is cropped to one of a few varied aspect ratios instead of a fixed
// square — that's what gives the wall its organic, varied-height rhythm.
const ASPECTS = ['aspect-[3/4]', 'aspect-square', 'aspect-[4/5]', 'aspect-[5/6]', 'aspect-square', 'aspect-[4/5]'];

// Every tile tilts a little, like photos actually pinned to a board
// instead of machine-aligned in a grid — settles flat on hover, so
// picking one up straightens it rather than just adding shine. Wider
// range than a typical "polished" hover tilt on purpose: this is the
// whole point of the scrapbook look.
const ROTATIONS = ['-rotate-2', 'rotate-1', 'rotate-2', '-rotate-1', 'rotate-3', '-rotate-3'];

// A strip of "washi tape" pinning roughly half the tiles to the page —
// varied colors, angles, widths, AND horizontal placement so no two read
// as the same sticker copy-pasted around the wall. Each property cycles
// on its own prime-ish offset (5, 6, 7, 4 items) so the combinations
// don't repeat in lockstep every few tiles. Tiles without tape just sit
// as a plain printed photo would.
const TAPE_COLORS = ['#e8b4a0', '#b7c4a0', '#e3b23c', '#9fb8c9', '#d99a9a'];
const TAPE_ROTATIONS = ['-rotate-9', 'rotate-8', '-rotate-3', 'rotate-14', '-rotate-16', 'rotate-4'];
const TAPE_WIDTHS = ['w-14', 'w-20', 'w-16', 'w-24', 'w-12', 'w-20', 'w-16'];
// Horizontal placement of the tape on its card — centered, or pinned
// toward a corner like it was pressed down in a hurry rather than
// measured. `justify-*` on the flex row below positions it.
const TAPE_ALIGN = ['justify-center', 'justify-start', 'justify-end', 'justify-center', 'justify-end', 'justify-start'];

// The wall is padded out to this many total tiles while the real album is
// still thin (see padCount below) — enough boxes that the page reads as a
// full wall on first load instead of a few photos above a lot of cream.
const MIN_TILES = 10;

// Cycled across the padding tiles instead of repeating one line ten
// times — still clearly placeholders, just not monotonous ones.
const INVITE_MESSAGES = [
  ['More moments', 'added weekly'],
  ['Be at the', 'next one'],
  ['Your photo', 'could be here'],
  ['Rush moments', 'coming soon'],
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: (i % 8) * 0.05, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

// Deliberately normal-flow, not `position: absolute` — an earlier version
// pulled the tape out of flow with a negative `top` offset, which hit a
// real Chrome rendering quirk: an out-of-flow descendant inside a
// `break-inside-avoid` CSS-columns item can get a wildly wrong
// getBoundingClientRect on some items (reproduced consistently on one
// card; paint was fine, but the measurement was garbage, which smelled
// like exactly the kind of thing that'd misbehave unpredictably at other
// widths/counts). Negative margin gets the same overlapping look
// entirely in normal flow, sidestepping that interaction.
function Tape({ index }: { index: number }) {
  const color = TAPE_COLORS[index % TAPE_COLORS.length];
  const rotation = TAPE_ROTATIONS[index % TAPE_ROTATIONS.length];
  const width = TAPE_WIDTHS[index % TAPE_WIDTHS.length];
  const align = TAPE_ALIGN[index % TAPE_ALIGN.length];
  // Every other piece gets a faint diagonal weave instead of flat color —
  // reads as fibrous paper tape rather than every strip being the exact
  // same smooth washi ribbon.
  const textured = index % 2 === 1;
  return (
    <div className={`relative z-10 -mb-3 flex px-5 ${align}`}>
      <div
        className={`h-6 ${width} ${rotation} opacity-80 mix-blend-multiply`}
        style={{
          backgroundColor: color,
          boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
          backgroundImage: textured
            ? 'repeating-linear-gradient(45deg, rgba(255,255,255,0.35) 0px, rgba(255,255,255,0.35) 2px, transparent 2px, transparent 6px)'
            : undefined,
        }}
      />
    </div>
  );
}

// Mixed into a thin wall so it still reads as full and inviting instead
// of a couple of photos floating in a lot of empty cream. Purely
// decorative — the masonry columns don't need it to lay out correctly,
// it's there for how the page feels while the album is still growing.
function InviteCard({
  aspect,
  rotation,
  message,
  tapeIndex,
  motionIndex,
}: {
  aspect: string;
  rotation: string;
  message: string[];
  tapeIndex: number | null;
  motionIndex: number;
}) {
  return (
    <motion.div
      custom={motionIndex}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className={`${rotation} relative mb-5 break-inside-avoid transition-transform duration-500 hover:rotate-0 sm:mb-6`}
    >
      {tapeIndex !== null && <Tape index={tapeIndex} />}
      <div
        className={`${aspect} relative flex items-center justify-center overflow-hidden rounded-sm border border-[#e2c39a] bg-[#fffaf0] p-3 shadow-[0_6px_16px_-6px_rgba(122,67,21,0.35)]`}
      >
        <div
          className="absolute inset-3 rounded-sm"
          style={{ background: 'linear-gradient(150deg, #ffe3b3, #f6b880)' }}
        />
        <div
          className="absolute inset-3 rounded-sm opacity-80"
          style={{ background: 'radial-gradient(circle at 25% 20%, rgba(255,255,255,0.55), transparent 55%)' }}
        />
        <p
          className={`${handwriting.className} relative px-4 text-center text-2xl leading-tight text-[#7a4315]`}
        >
          {message[0]}
          <br />
          {message[1]}
        </p>
      </div>
    </motion.div>
  );
}

export default function GalleryGrid({ images }: { images: GalleryPhoto[] }) {
  if (images.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-[#7a5c3e]">
        Photos coming soon. Check back after the next chapter event.
      </p>
    );
  }

  // Keep the wall feeling full while the album is thin — purely cosmetic
  // padding, not a layout requirement (see the component note above).
  const padCount = images.length < MIN_TILES ? MIN_TILES - images.length : 0;

  return (
    <div className="columns-2 gap-4 sm:columns-3 sm:gap-5 lg:columns-4">
      {images.map((image, i) => {
        const aspect = ASPECTS[i % ASPECTS.length];
        const rotation = ROTATIONS[i % ROTATIONS.length];
        const hasTape = i % 3 !== 1;
        return (
          <motion.div
            key={image.id}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className={`${rotation} group relative mb-5 break-inside-avoid transition-transform duration-500 ease-out hover:z-20 hover:rotate-0 sm:mb-6`}
          >
            {hasTape && <Tape index={i} />}
            <div
              className={`${aspect} relative overflow-hidden rounded-sm border border-black/5 bg-[#fffaf0] p-3 shadow-[0_8px_20px_-10px_rgba(122,67,21,0.4)] transition-shadow duration-500 group-hover:shadow-[0_20px_40px_-15px_rgba(122,67,21,0.5)]`}
            >
              <div className="absolute inset-3 overflow-hidden rounded-sm bg-[#e7d3ab]">
                <CldImage
                  src={image.cloudinaryPublicId}
                  alt="Chi Gamma brotherhood photo"
                  fill
                  crop="fill"
                  loading="lazy"
                  gravity="auto"
                  sizes="(max-width: 768px) 50vw,
                  (max-width: 1200px) 33vw,
                  25vw"
                  format="auto"
                  quality="auto"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* A soft warm sheen, like sunlight catching the print —
                    strongest at rest in the top-left, fading on hover as
                    the photo itself takes focus. */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-25"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,238,204,0.45) 0%, transparent 45%)',
                  }}
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5" />
              </div>
            </div>
          </motion.div>
        );
      })}
      {Array.from({ length: padCount }).map((_, i) => (
        <InviteCard
          key={`pad-${i}`}
          aspect={ASPECTS[(images.length + i) % ASPECTS.length]}
          rotation={ROTATIONS[(images.length + i) % ROTATIONS.length]}
          message={INVITE_MESSAGES[i % INVITE_MESSAGES.length]}
          tapeIndex={(images.length + i) % 3 !== 1 ? images.length + i : null}
          motionIndex={images.length + i}
        />
      ))}
    </div>
  );
}
