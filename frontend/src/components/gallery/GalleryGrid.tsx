'use client';

import { motion, type Variants } from 'framer-motion';

// A clean 4×5 wall of the chapter's brotherhood — placeholder photos for
// now, in the same plain neutral tile used everywhere else on the site.
// No decorative color treatment here on purpose — once real photos are
// in, they're what carries the page, not a gradient standing in for them.
const PHOTO_COUNT = 20;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: (i % 8) * 0.04, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function GalleryGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {Array.from({ length: PHOTO_COUNT }).map((_, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="flex aspect-square w-full items-center justify-center bg-neutral-200"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">
            Placeholder Photo
          </span>
        </motion.div>
      ))}
    </div>
  );
}
