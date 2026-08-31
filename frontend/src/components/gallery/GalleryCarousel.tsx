'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CldImage } from 'next-cloudinary';
import type { GalleryEventSlide } from '@/lib/gallery';

// The curated, captioned reel — fed by `getGalleryEvents()` from a Server
// Component parent (see app/gallery/page.tsx). Renders nothing if there
// are no events yet, so the "Events" heading above it in page.tsx is only
// shown when there's actually something to scroll through.
export default function GalleryCarousel({ events }: { events: GalleryEventSlide[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const id = requestAnimationFrame(onSelect);
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => cancelAnimationFrame(id);
  }, [emblaApi, onSelect]);

  if (events.length === 0) return null;

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-4 sm:gap-6">
          {events.map((event) => (
            <div key={event.id} className="min-w-0 shrink-0 basis-[85%] sm:basis-[60%] lg:basis-[46%]">
              <div className="relative aspect-video w-full overflow-hidden bg-[#1c1c1c]">
                <CldImage
                  src={event.cloudinaryPublicId}
                  alt={event.caption || 'Chapter event photo'}
                  fill
                  crop="fill"
                  gravity="auto"
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-sm uppercase tracking-[0.15em] text-white/50">
                {event.caption}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/50 transition-colors hover:border-[#c8b89a] hover:text-[#c8b89a] disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:text-white/50"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/50 transition-colors hover:border-[#c8b89a] hover:text-[#c8b89a] disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:text-white/50"
          >
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="hidden items-center gap-1.5 sm:flex">
          {events.map((event, i) => (
            <span
              key={event.id}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === selectedIndex ? 24 : 6,
                backgroundColor: i === selectedIndex ? '#c8b89a' : '#3a3a3a',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}