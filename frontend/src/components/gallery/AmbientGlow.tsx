'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

// Soft, blurred warm-color pools that drift slowly behind the gallery's
// content — like sunlight pooling on a wall, not a spotlight. On the
// cream background this reads as warmth and light rather than the
// "glowing in the dark" effect the same technique gives on a black page.
// Purely decorative: absolute, non-interactive, and behind everything
// (z-0) so it never competes with real content.
//
// Each orb also drifts at its own rate as the page scrolls (on top of the
// slow CSS-driven idle wobble from ambient-glow-a/b/c in globals.css) —
// three depths moving at three speeds reads as actual depth rather than
// a flat page, the same trick a parallax background uses.
export default function AmbientGlow() {
  const { scrollYProgress } = useScroll();
  const yA = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const yB = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const yC = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <motion.div
        style={{ y: yA }}
        className="ambient-glow-a absolute -left-[10%] -top-[10%] h-[42rem] w-[42rem] rounded-full opacity-60 blur-[100px]"
      >
        <div
          className="h-full w-full rounded-full"
          style={{ background: 'radial-gradient(closest-side, #fbbf6d, transparent 70%)' }}
        />
      </motion.div>
      <motion.div
        style={{ y: yB }}
        className="ambient-glow-b absolute -right-[12%] top-[15%] h-[36rem] w-[36rem] rounded-full opacity-50 blur-[100px]"
      >
        <div
          className="h-full w-full rounded-full"
          style={{ background: 'radial-gradient(closest-side, #f6a48a, transparent 70%)' }}
        />
      </motion.div>
      <motion.div
        style={{ y: yC }}
        className="ambient-glow-c absolute bottom-[-15%] left-[25%] h-[38rem] w-[38rem] rounded-full opacity-40 blur-[110px]"
      >
        <div
          className="h-full w-full rounded-full"
          style={{ background: 'radial-gradient(closest-side, #f9d78c, transparent 70%)' }}
        />
      </motion.div>
    </div>
  );
}
