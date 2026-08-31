'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

// ─── Nav links config ──────────────────────────────────────────────
// Rush is a single destination for now (points straight at the current
// term page, no term picker) — see rush/page.tsx and rush/[term]/page.tsx
// for how to bring the multi-term dropdown back later.
const NAV_LINKS = [
  { label: 'About', href: '/about', num: '01' },
  { label: 'Brothers', href: '/brothers', num: '02', hasSubmenu: false },
  { label: 'Careers', href: '/careers', num: '03', hasSubmenu: true},
  { label: 'Gallery', href: '/gallery', num: '04' },
  { label: 'Rush AKΨ', href: '/rush/fall-2026', num: '05' },
];

const BROTHERS_LINKS = [
  { label: 'All Brothers', href: '/brothers' },
  { label: 'Intern Spotlight', href: '/brothers/alumni' },
];

const CAREERS_LINKS = [
  { label: 'Our Careers', href: '/careers' },
  { label: 'Alumni Spotlight', href: '/careers/alumni' },
  { label: 'Psi Tech', href: '/careers/suborgs' },
];


// Maps a NAV_LINKS label (for entries with hasSubmenu) to its sub-panel list.
const SUBMENUS: Record<string, { label: string; href: string }[]> = {
  Brothers: BROTHERS_LINKS,
  Careers: CAREERS_LINKS,
};

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

// Mobile accordion panel — expands/collapses underneath the tapped link.
// Height auto-animates so it works for any number of sublinks without
// tuning a fixed value per item.
const mobileAccordionVariants: Variants = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: 'auto', opacity: 1, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { height: 0, opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
};

export default function FullscreenMenu({ onClose }: { onClose: () => void }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [submenuOpenFor, setSubmenuOpenFor] = useState<number | null>(null);
  // Separate from the desktop hover state above — mobile has no hover, so
  // tapping a hasSubmenu link toggles this instead of navigating away.
  // Keyed by label (not index) purely so it reads clearly; only one entry
  // is ever expanded at a time, same single-panel feel as the desktop
  // hover version.
  const [mobileExpandedLabel, setMobileExpandedLabel] = useState<string | null>(null);

  const activeSubmenuLinks =
    submenuOpenFor !== null ? SUBMENUS[NAV_LINKS[submenuOpenFor].label] : undefined;
  const showSubmenu = Boolean(activeSubmenuLinks);

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
            const numColor = isDimmed ? '#333' : '#555';
            const desktopLabelColor = hoveredIndex === i ? '#ffffff' : isDimmed ? '#2a2a2a' : '#555555';

            const subLinks = link.hasSubmenu ? SUBMENUS[link.label] : undefined;
            const isMobileExpanded = mobileExpandedLabel === link.label;
            const mobileLabelColor = isMobileExpanded ? '#ffffff' : '#555555';

            return (
              <motion.div key={link.href} variants={itemVariants}>
                {/* Desktop row (md and up) — unchanged: click navigates,
                    hover opens the side sub-panel for hasSubmenu items. */}
                <Link
                  href={link.href}
                  onClick={onClose}
                  onMouseEnter={() => {
                    setHoveredIndex(i);
                    if (link.hasSubmenu) setSubmenuOpenFor(i);
                    else setSubmenuOpenFor(null);
                  }}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group hidden items-baseline gap-4 py-2 md:flex"
                >
                  <span
                    className="text-xs tabular-nums transition-colors duration-200"
                    style={{ color: numColor }}
                  >
                    ({link.num})
                  </span>
                  <span
                    className="text-5xl md:text-7xl font-medium leading-none tracking-tight transition-colors duration-200"
                    style={{ color: desktopLabelColor }}
                  >
                    {link.label}
                  </span>
                </Link>

                {/* Mobile row (below md) — a plain link for items with no
                    sublinks, same as before; for hasSubmenu items, a
                    button that expands an accordion underneath instead of
                    navigating immediately. */}
                {subLinks ? (
                  <button
                    type="button"
                    onClick={() =>
                      setMobileExpandedLabel(isMobileExpanded ? null : link.label)
                    }
                    aria-expanded={isMobileExpanded}
                    className="flex w-full items-center justify-between gap-4 py-2 text-left md:hidden"
                  >
                    <span className="flex items-baseline gap-4">
                      <span
                        className="text-xs tabular-nums transition-colors duration-200"
                        style={{ color: numColor }}
                      >
                        ({link.num})
                      </span>
                      <span
                        className="text-5xl font-medium leading-none tracking-tight transition-colors duration-200"
                        style={{ color: mobileLabelColor }}
                      >
                        {link.label}
                      </span>
                    </span>
                    <motion.span
                      animate={{ rotate: isMobileExpanded ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="text-lg"
                      style={{ color: mobileLabelColor }}
                    >
                      ▾
                    </motion.span>
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-baseline gap-4 py-2 md:hidden"
                  >
                    <span
                      className="text-xs tabular-nums transition-colors duration-200"
                      style={{ color: numColor }}
                    >
                      ({link.num})
                    </span>
                    <span
                      className="text-5xl font-medium leading-none tracking-tight transition-colors duration-200"
                      style={{ color: '#555555' }}
                    >
                      {link.label}
                    </span>
                  </Link>
                )}

                {/* Mobile accordion — sublinks pop up directly underneath
                    the tapped link. Driven entirely by `subLinks`, so any
                    NAV_LINKS entry with hasSubmenu: true + a SUBMENUS
                    entry gets this automatically, no extra wiring. */}
                {subLinks && (
                  <AnimatePresence initial={false}>
                    {isMobileExpanded && (
                      <motion.div
                        variants={mobileAccordionVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="overflow-hidden md:hidden"
                      >
                        <div className="flex flex-col gap-1 py-2 pl-8">
                          {subLinks.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={onClose}
                              className="block py-1.5 text-lg font-medium leading-none tracking-tight text-white/50 transition-colors hover:text-white"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </motion.div>
            );
          })}
        </motion.nav>

        {/* Sub-panel — list of related pages (Brothers, Rush
            terms), fades in beside the main nav exactly like Motto's
            "LEARN" hover panel. Content swaps based on which nav item
            with hasSubmenu is currently hovered. Desktop only (md:flex) —
            mobile uses the accordion above instead. */}
        <AnimatePresence mode="wait">
          {showSubmenu && submenuOpenFor !== null && (
            <motion.div
              key={NAV_LINKS[submenuOpenFor].label}
              variants={subListVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onMouseEnter={() => {
                setHoveredIndex(submenuOpenFor);
                setSubmenuOpenFor(submenuOpenFor);
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                setSubmenuOpenFor(null);
              }}
              className="ml-6 hidden max-h-[80vh] flex-col gap-3 overflow-y-auto pr-4 md:ml-10 md:flex lg:ml-16"
            >
              {activeSubmenuLinks!.map((sub) => (
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