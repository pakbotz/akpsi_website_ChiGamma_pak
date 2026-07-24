'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

// ─── Nav links config ──────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'About', href: '/about', num: '01' },
  { label: 'Brothers', href: '/brothers', num: '02', hasSubmenu: true },
  { label: 'Careers', href: '/careers', num: '03' },
  { label: 'Gallery', href: '/gallery', num: '04' },
  { label: 'Rush AKΨ', href: '/rush', num: '05' },
];

const BROTHERS_LINKS = [
  { label: 'All Brothers', href: '/brothers' },
  { label: 'Alumni Spotlights', href: '/brothers/alumni' },
];

// ─── Framer Motion variants ────────────────────────────────────────
const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } },
};

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.25 } },
};

const subListVariants: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const, staggerChildren: 0.05 },
  },
  exit: { opacity: 0, x: 16, transition: { duration: 0.2 } },
};

const subItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function FullscreenMenu({ onClose }: { onClose: () => void }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [submenuOpenFor, setSubmenuOpenFor] = useState<number | null>(null);

  const brothersIndex = NAV_LINKS.findIndex((l) => l.hasSubmenu);
  const showSubmenu = submenuOpenFor === brothersIndex;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-[#0a0a0a]"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Top bar inside menu */}
      <div className="flex items-center justify-between px-8 py-6">
        <Link href="/" onClick={onClose}>
          <span className="text-sm tracking-wide text-white/50">
            ΑΚΨ<sup className="text-[10px]">®</sup>
          </span>
        </Link>
        <button
          onClick={onClose}
          className="text-sm text-white border-b border-white/40 pb-0.5 transition-colors hover:border-white"
        >
          Close
        </button>
      </div>

      {/* Body: primary nav list + Brothers sub-panel */}
      <div className="relative flex flex-1 items-center overflow-hidden px-8 pb-16">
        <motion.nav
          className="flex flex-col justify-center"
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
                  onMouseEnter={() => {
                    setHoveredIndex(i);
                    if (link.hasSubmenu) setSubmenuOpenFor(i);
                    else setSubmenuOpenFor(null);
                  }}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group flex items-baseline gap-4 py-2"
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
                      color:
                        hoveredIndex === i
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

        {/* Brothers sub-panel — scrollable list of related pages, fades in
            beside the main nav exactly like Motto's "LEARN" hover panel. */}
        <AnimatePresence>
          {showSubmenu && (
            <motion.div
              key="brothers-submenu"
              variants={subListVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onMouseEnter={() => {
                setHoveredIndex(brothersIndex);
                setSubmenuOpenFor(brothersIndex);
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                setSubmenuOpenFor(null);
              }}
              className="ml-6 hidden max-h-[70vh] flex-col gap-3 overflow-y-auto pr-4 [scrollbar-width:thin] md:ml-10 md:flex lg:ml-16"
            >
              {BROTHERS_LINKS.map((sub) => (
                <motion.div key={sub.href} variants={subItemVariants}>
                  <SubLink href={sub.href} label={sub.label} onClose={onClose} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function SubLink({
  href,
  label,
  onClose,
}: {
  href: string;
  label: string;
  onClose: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onClick={onClose}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="block text-lg font-medium leading-none tracking-tight transition-colors duration-200 sm:text-xl md:text-2xl"
      style={{ color: hovered ? '#ffffff' : '#555555' }}
    >
      {label}
    </Link>
  );
}