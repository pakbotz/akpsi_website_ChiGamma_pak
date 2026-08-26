'use client';

import { motion, type Variants } from 'framer-motion';
import { CldImage } from 'next-cloudinary';
import type { GalleryPhoto } from '@/lib/gallery';

// A clean wall of the chapter's brotherhood — same plain neutral tile
// treatment used everywhere else on the site, now fed by the admin
// dashboard's Gallery tab instead of placeholder boxes. `images` comes
// from `getGalleryImages()` in a Server Component parent (see
// app/gallery/page.tsx) so this stays a simple, static (no lightbox by
// design) presentational grid.
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: (i % 8) * 0.04, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function GalleryGrid({ images }: { images: GalleryPhoto[] }) {
  if (images.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-white/40">
        Photos coming soon — check back after the next chapter event.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {images.map((image, i) => (
        <motion.div
          key={image.id}
          custom={i}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="relative aspect-square w-full overflow-hidden bg-[#1c1c1c]"
        >
          <CldImage
            src={image.cloudinaryPublicId}
            alt="Chi Gamma brotherhood photo"
            fill
            crop="fill"
            loading="lazy"
            gravity="auto"
            sizes="(max-width: 768px) 50vw,
            (max-width: 1200px) 25vw,
            200px"
            format="auto"
            quality="auto"
            className="object-cover"
          />
        </motion.div>
      ))}
    </div>
  );
}