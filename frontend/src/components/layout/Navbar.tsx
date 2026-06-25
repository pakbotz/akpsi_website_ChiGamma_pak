'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import FullscreenMenu from './FullscreenMenu';

// ─── Main Navbar ───────────────────────────────────────────────────
// Single navbar for the whole site. The home page ("/") is dark-themed
// (black background, cream text) while every other page so far is
// light-themed (off-white background, near-black text) — this component
// reads the current route and switches its own colors accordingly, so
// there's only ever one nav rendered, one "Menu" button, one place to fix.
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isDark = pathname === '/';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-6 sm:px-8 ${
          isDark ? '' : 'mix-blend-multiply'
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className={`text-sm font-medium tracking-wide ${
            isDark ? 'text-[#f0eeea]' : 'text-[#0a0a0a]'
          }`}
        >
          ΑΚΨ<sup className="text-[10px]">®</sup>
        </Link>

        {/* Right side: CTA + Menu toggle */}
        <div className="flex items-center gap-8">
          <Link
            href="/rush"
            className={`hidden text-sm underline underline-offset-4 md:block ${
              isDark ? 'text-[#f0eeea]' : 'text-[#0a0a0a]'
            }`}
          >
            Rush AKΨ
          </Link>
          <button
            onClick={() => setMenuOpen(true)}
            className={`text-sm transition-opacity hover:opacity-60 ${
              isDark ? 'text-[#f0eeea]/90' : 'text-[#0a0a0a]'
            }`}
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