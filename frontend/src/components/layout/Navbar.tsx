'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, type Variants} from 'framer-motion';

// ─── Nav links config ──────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'Home',      href: '/',          num: '01' },
  { label: 'About',     href: '/about',     num: '02' },
  { label: 'Brothers',  href: '/brothers',  num: '03' },
  { label: 'Gallery',   href: '/gallery',   num: '04' },
  { label: 'Careers',   href: '/careers',   num: '05' },
  { label: 'Rush AKΨ', href: '/rush',      num: '06' },
];

// ─── Framer Motion variants ────────────────────────────────────────
const overlayVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
  exit:    { opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } },
};

const listVariants: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
  exit:    { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.25 } },
};

// ─── Fullscreen Menu Overlay ───────────────────────────────────────
function FullscreenMenu({ onClose }: { onClose: () => void }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Top bar inside menu */}
      <div className="flex items-center justify-between px-8 py-6">
        <Link href="/" onClick={onClose}>
          <span className="text-white/50 text-sm tracking-wide">ΑΚΨ</span>
        </Link>
        <button
          onClick={onClose}
          className="text-white text-sm border-b border-white/40 pb-0.5 hover:border-white transition-colors"
        >
          Close
        </button>
      </div>

      {/* Nav items */}
      <motion.nav
        className="flex flex-col justify-center flex-1 px-8 pb-16"
        variants={listVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {NAV_LINKS.map((link, i) => {
          const isDimmed = hoveredIndex !== null && hoveredIndex !== i;

          return (
            <motion.div key={link.href} variants={itemVariants}>
              <Link
                href={link.href}
                onClick={onClose}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group flex items-baseline gap-4 py-2 transition-none"
              >
                <span
                  className="text-xs tabular-nums transition-colors duration-200"
                  style={{ color: isDimmed ? '#333' : '#555' }}
                >
                  ({link.num})
                </span>
                <span
                  className="text-5xl md:text-7xl font-medium leading-none tracking-tight transition-colors duration-200"
                  style={{
                    color: hoveredIndex === i
                      ? '#ffffff'
                      : isDimmed
                      ? '#2a2a2a'
                      : '#555555',
                  }}
                >
                  {link.label}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </motion.nav>
    </motion.div>
  );
}

// ─── Main Navbar ───────────────────────────────────────────────────
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-5 mix-blend-multiply">
        {/* Logo */}
        <Link href="/" className="text-sm font-medium tracking-wide text-[#0a0a0a]">
          ΑΚΨ<sup className="text-[10px]">®</sup>
        </Link>

        {/* Right side: CTA + Menu toggle */}
        <div className="flex items-center gap-8">
          <Link
            href="/rush"
            className="text-sm underline underline-offset-4 text-[#0a0a0a] hidden md:block"
          >
            Rush AKΨ
          </Link>
          <button
            onClick={() => setMenuOpen(true)}
            className="text-sm text-[#0a0a0a] hover:opacity-60 transition-opacity"
          >
            Menu
          </button>
        </div>
      </header>

      {/* Fullscreen overlay */}
      <AnimatePresence>
        {menuOpen && <FullscreenMenu onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </>
  );
}