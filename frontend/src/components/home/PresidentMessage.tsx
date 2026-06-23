'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function PresidentMessage() {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="bg-[#0a0a0a] min-h-dvh flex flex-col justify-center py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 w-full">
        <p className="mb-12 text-xs uppercase tracking-[0.25em] text-[#c8b89a]">
          A Note From Leadership
        </p>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          {/* Left: image with hover reveal */}
          <div
            className="group relative aspect-[4/5] w-full max-w-md cursor-pointer overflow-hidden bg-[#1c1c1c]"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/25">
                Placeholder Photo
              </span>
            </div>

            {/* Dark overlay + button on hover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center bg-black/55"
            >
              <motion.button
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: hovered ? 0 : 12, opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="border border-white/60 px-6 py-3 text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-black"
              >
                View Profile
              </motion.button>
            </motion.div>
          </div>

          {/* Right: text */}
          <div className="flex flex-col justify-center">
            <h2
              className="mb-6 font-medium leading-[1.05] tracking-tight text-[#f0eeea]"
              style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)' }}
            >
              Message from our President
            </h2>
            <p className="text-base leading-relaxed text-white/55 sm:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
            <p className="mt-8 text-sm tracking-wide text-white/40">
              — Placeholder Name, Chapter President
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}