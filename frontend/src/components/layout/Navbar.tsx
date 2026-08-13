'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';
import { RUSH_TERMS } from '@/lib/rushTerms';
import FullscreenMenu from './FullscreenMenu';

// ─── Main Navbar ───────────────────────────────────────────────────
// Single navbar for the whole site. The home page ("/") and the Brothers
// directory ("/brothers" and its sub-routes) are dark-themed (black
// background, cream text) while every other page so far is light-themed
// (off-white background, near-black text) — this component reads the
// current route and switches its own colors accordingly, so there's only
// ever one nav rendered, one "Menu" button, one place to fix.
//
// Rush terms can carry their own theme (see rushTerms.ts) — themed terms
// (like the mountain/western-styled term) alternate between several dark
// and light color blocks down the page, not just one hero. Route-based
// light/dark can't track that many zones, so themed pages instead get a
// permanent translucent, blurred backdrop behind the nav — that keeps the
// (always-light) nav text legible over whatever color happens to be
// scrolling underneath, without needing to know where each zone starts.
// Every other route is unaffected.
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isBrothersPage = pathname.startsWith('/brothers');

  const rushSlug = pathname.startsWith('/rush/') ? pathname.split('/')[2] : undefined;
  const activeTerm = rushSlug ? RUSH_TERMS.find((t) => t.slug === rushSlug) : undefined;
  const isThemedTerm = activeTerm?.theme === 'arcteryx';

  const isDark = isThemedTerm || pathname === '/' || isBrothersPage;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-6 sm:px-8 ${
          isThemedTerm ? 'bg-[#2b1c12]/35 backdrop-blur-md' : isDark ? '' : 'mix-blend-multiply'
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

        {/* Right side: Menu toggle. Rush now lives only inside the
            fullscreen menu's dropdown, not as a standalone header CTA. */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className={`transition-opacity hover:opacity-60 ${
              isDark ? 'text-[#f0eeea]/90' : 'text-[#0a0a0a]'
            }`}
          >
            <Menu size={20} />
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
