'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CldImage } from 'next-cloudinary';

type Slide = { cloudinary_public_id: string | null; caption: string };

export default function RushCarousel({ slides }: { slides: Slide[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const id = requestAnimationFrame(onSelect);
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => cancelAnimationFrame(id);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-4 sm:gap-6">
          {slides.map((slide, i) => (
            <div key={i} className="min-w-0 shrink-0 basis-[78%] sm:basis-[42%] lg:basis-[28%]">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#1c1c1c]">
                {slide.cloudinary_public_id ? (
                  <CldImage
                    src={slide.cloudinary_public_id}
                    alt={slide.caption}
                    fill
                    aspectRatio="4:5"
                    crop="fill"
                    gravity="auto"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/25">
                      Placeholder Image
                    </span>
                  </div>
                )}
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.15em] text-white/45">{slide.caption}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex items-center gap-4">
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          aria-label="Previous"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/70 transition-colors hover:border-white/60 hover:text-white disabled:opacity-30 disabled:hover:border-white/25 disabled:hover:text-white/70"
        >
          <ArrowLeft size={16} />
        </button>
        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          aria-label="Next"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/70 transition-colors hover:border-white/60 hover:text-white disabled:opacity-30 disabled:hover:border-white/25 disabled:hover:text-white/70"
        >
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}