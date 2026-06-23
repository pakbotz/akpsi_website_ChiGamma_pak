'use client';

import Link from 'next/link';

/**
 * Minimal top bar for the dark home page: logo top-left, "Menu" top-right.
 * This intentionally does not touch the existing light-mode Navbar.tsx —
 * wiring this into the real fullscreen menu comes later.
 */
export default function HomeTopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 sm:px-8">
      <Link href="/" className="text-sm tracking-wide text-[#f0eeea]">
        ΑΚΨ<sup className="text-[10px]">®</sup>
      </Link>

      <button className="text-sm text-[#f0eeea]/90 transition-opacity hover:opacity-60">
        Menu
      </button>
    </header>
  );
}