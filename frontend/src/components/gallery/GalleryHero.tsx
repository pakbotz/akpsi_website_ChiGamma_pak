'use client';

import { motion } from 'framer-motion';

// The "Gallery / Brotherhood / ..." block above the fold — animates in on
// mount (not scroll-triggered, since it's already in view on load) so the
// page doesn't just snap into place. Split into three staggered pieces
// rather than one block fading in together, so the eyebrow leads and the
// heading and subhead follow a beat behind it.
export default function GalleryHero() {
  return (
    <div className="relative z-10 mx-auto max-w-8xl px-6 sm:px-8">
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c2662d]"
      >
        Gallery
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 font-medium leading-[0.95] tracking-tight text-[#3a2412]"
        style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
      >
        Brotherhood
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="mt-5 max-w-lg text-base leading-relaxed text-[#8a6b48] sm:text-lg"
      >
        The late nights, the rush events, the random Tuesday hangouts — this is what being
        in Chi Gamma actually looks like. Every photo here is a brother, a memory, a reason
        we do this.
      </motion.p>
    </div>
  );
}
