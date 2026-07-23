'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brother } from '@/lib/brothers';
import { toGreekLetter } from '@/lib/greekAlphabet';

function LinkedinIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function BrotherModal({
  brother,
  onClose,
}: {
  brother: Brother;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-6 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto w-full max-w-3xl border border-white/15 bg-[#0a0a0a] p-8 md:p-12"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 text-sm text-white/60 underline underline-offset-4 transition-colors hover:text-white"
        >
          Close
        </button>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[280px_1fr]">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#1c1c1c]">
            {brother.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={brother.photoUrl}
                alt={brother.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/25">
                  Placeholder Photo
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex items-baseline justify-between gap-4 pr-16">
              <h2
                className="font-medium leading-tight text-[#f0eeea]"
                style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2rem)' }}
              >
                {brother.name}
              </h2>
            </div>

            <p className="mt-1 text-sm text-white/55">
              {brother.major}
              {brother.minor ? ` · ${brother.minor}` : ''}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href={brother.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 border border-white/25 px-4 py-2 text-sm text-white/80 transition-colors hover:border-[#c8b89a] hover:text-[#c8b89a]"
              >
                <LinkedinIcon />
                LinkedIn
              </a>
            </div>

            <div
              className={`mt-6 grid gap-x-6 gap-y-4 ${
                brother.positions.length > 0 ? 'grid-cols-3' : 'grid-cols-2'
              }`}
            >
              {brother.positions.length > 0 && (
                <div className="text-center">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                    Current Role
                  </p>
                  <p className="mt-1 text-sm text-white/85">
                    {brother.positions.join(' · ')}
                  </p>
                </div>
              )}
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Class
                </p>
                <p className="mt-1 text-sm text-white/85">
                  {brother.year}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Pledge Class
                </p>
                <p className="mt-1 text-sm text-[#c8b89a]" title={brother.pledgeClass}>
                  {toGreekLetter(brother.pledgeClass)}
                </p>
              </div>
            </div>

            <p className="mt-8 text-sm leading-relaxed text-white/60">
              {brother.bio}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
