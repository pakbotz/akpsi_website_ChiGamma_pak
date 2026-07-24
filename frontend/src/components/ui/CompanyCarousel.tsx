// CompanyCarousel.tsx
'use client';

import { CldImage } from 'next-cloudinary';

type Logo = { key: string; cloudinaryPublicId: string };

function LogoRow({ logos, ariaHidden = false }: { logos: Logo[]; ariaHidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-16 px-8" aria-hidden={ariaHidden}>
      {logos.map((logo) => (
        <div key={logo.key} className="relative h-10 w-28 shrink-0 sm:h-12 sm:w-36">
          <CldImage
            src={logo.cloudinaryPublicId}
            alt="Company logo"
            fill
            crop="fit"
            className="object-contain opacity-40 grayscale transition-all duration-300 hover:opacity-80 hover:grayscale-0"
          />
        </div>
      ))}
    </div>
  );
}

// Only logos that have actually been uploaded render — an empty slot in the
// admin dashboard just means one fewer logo in the loop, not a broken image.
export default function CompanyCarousel({ logos }: { logos: Logo[] }) {
  if (logos.length === 0) {
    return (
      <p className="px-6 text-center text-xs uppercase tracking-[0.2em] text-white/25">
        Logos coming soon
      </p>
    );
  }

  return (
    <div className="relative w-full overflow-hidden">
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent sm:w-32" />

      <div className="marquee-track flex w-max items-center py-2">
        <LogoRow logos={logos} />
        <LogoRow logos={logos} ariaHidden />
      </div>
    </div>
  );
}