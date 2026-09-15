'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';
import RushCarousel from '@/components/ui/RushCarousel';
import type { RushCarouselSlide } from '@/lib/types';

const MotionLink = motion.create(Link);

export default function InterestedSection({
  slides,
  rushPreviewPublicId,
}: {
  slides: RushCarouselSlide[];
  rushPreviewPublicId: string | null;
}) {
  return (
    <section className="bg-[#0a0a0a] min-h-[90vh] flex flex-col justify-center py-20 md:py-28">
      <div className="w-full max-w-7xl mx-auto px-8">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-3">
            <h2
              className="font-medium tracking-tight text-[#f0eeea]"
              style={{ fontSize: 'clamp(2rem, 4.2vw, 3.25rem)' }}
            >
              Interested in Joining?
            </h2>

            <p className="max-w-xl text-md text-white/50">
              Check out our rush schedule to see how to get involved!
            </p>
          </div>
          {/* A plain dark rectangle sits fixed behind the real preview,
              offset down-right. On hover the front card tilts counter-
              clockwise and slides left, exposing more of the shape behind
              it — implying there's "another card" to flip to, even though
              it's just a decorative rectangle, not a real second page. */}
          <div className="relative aspect-[4/3] w-[18rem] shrink-0 sm:w-[10rem] md:w-[10rem] lg:w-[12rem]">
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-lg bg-neutral-700" />

            <MotionLink
              href="/rush"
              whileHover={{ rotate: -4, x: -10 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="group absolute inset-0 block overflow-hidden rounded-lg bg-[#1c1c1c]"
            >
              {rushPreviewPublicId ? (
                <CldImage
                  src={rushPreviewPublicId}
                  alt="Rush AKPsi"
                  fill
                  sizes="256px"
                  aspectRatio="4:3"
                  crop="fill"
                  gravity="auto"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-sm uppercase tracking-[0.2em] text-white/40">
                    Rush AKPSI
                  </span>
                </div>
              )}

              <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/60 group-hover:opacity-100">
                <span className="text-xs uppercase tracking-[0.2em] text-white">
                  Click to see more!
                </span>
              </div>
            </MotionLink>
          </div>
        </div>

        <RushCarousel slides={slides} />
      </div>
    </section>
  );
}