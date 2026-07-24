'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { CldImage } from 'next-cloudinary';

export default function PresidentMessage({
  photoPublicId,
  name,
  message,
}: {
  photoPublicId: string | null;
  name: string;
  message: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="bg-[#0a0a0a] min-h-dvh flex flex-col justify-center py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 w-full">
        <p className="mb-12 text-xs uppercase tracking-[0.25em] text-[#c8b89a]">
          A Note From Leadership
        </p>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <div
            className="group relative aspect-[4/5] w-full cursor-pointer overflow-hidden bg-[#1c1c1c]"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {photoPublicId ? (
              <CldImage 
                src={photoPublicId} 
                alt="Chapter President" 
                fill 
                aspectRatio="4:5"
                crop="fill"
                gravity="auto"
                className="object-cover" 
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/25">
                  Placeholder Photo
                </span>
              </div>
            )}

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

          <div className="flex flex-col justify-center">
            <h2
              className="mb-6 font-medium leading-[1.05] tracking-tight text-[#f0eeea]"
              style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)' }}
            >
              Message from our President
            </h2>
            <p className="whitespace-pre-line text-base leading-relaxed text-white/55 sm:text-lg">
              {message}
            </p>
            <p className="mt-8 text-sm tracking-wide text-white/40">— {name}</p>
          </div>
        </div>
      </div>
    </section>
  );
}