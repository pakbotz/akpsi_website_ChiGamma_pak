'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Placeholder events reel — no real photos yet. Shape matches what a
// future Supabase-backed version would need (just a caption), so
// swapping in real data later is a matter of replacing this array with
// a query result, not restructuring the component.
const EVENTS = [
  { caption: 'Info Night' },
  { caption: 'LinkedIn Workshop' },
  { caption: 'Beach Cleanup' },
  { caption: 'Formal Retreat' },
  { caption: 'Alumni Panel' },
  { caption: 'Slug Tank' },
  { caption: 'Toy Drive' },
  { caption: 'Bid Night' },
];

export default function GalleryCarousel() {
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

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-4 sm:gap-6">
          {EVENTS.map((slide, i) => (
            <div key={i} className="min-w-0 shrink-0 basis-[85%] sm:basis-[60%] lg:basis-[46%]">
              <div className="aspect-video w-full bg-neutral-200">
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">
                    Placeholder Photo
                  </span>
                </div>
              </div>
              <p className="mt-4 text-sm uppercase tracking-[0.15em] text-neutral-500">
                {slide.caption}
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
            className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 text-neutral-500 transition-colors hover:border-[#1e3a5f] hover:text-[#1e3a5f] disabled:opacity-30 disabled:hover:border-neutral-300 disabled:hover:text-neutral-500"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 text-neutral-500 transition-colors hover:border-[#1e3a5f] hover:text-[#1e3a5f] disabled:opacity-30 disabled:hover:border-neutral-300 disabled:hover:text-neutral-500"
          >
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="hidden items-center gap-1.5 sm:flex">
          {EVENTS.map((_, i) => (
            <span
              key={i}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === selectedIndex ? 24 : 6,
                backgroundColor: i === selectedIndex ? '#c8b89a' : '#d4d4d4',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
