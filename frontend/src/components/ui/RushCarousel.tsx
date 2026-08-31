'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CldImage } from 'next-cloudinary';

type Slide = {
  cloudinary_public_id: string | null;
  caption: string;
  location: string | null;
  event_datetime: string | null;
  instagram_post_url: string | null;
};

const AKPSI_INSTAGRAM = 'https://www.instagram.com/ucscakpsi/';

export default function RushCarousel({ slides }: { slides: Slide[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Which slide (by index) a first tap has already "revealed" on a touch
  // device — see handleImageClick below.
  const [revealedIndex, setRevealedIndex] = useState<number | null>(null);

  // (hover: hover) is the standard way to ask "does this device have a real
  // pointer that can hover" — true on mice/trackpads, false on touchscreens.
  // Far more reliable than guessing from screen width or event timing.
  const [canHover, setCanHover] = useState(true);
  useEffect(() => {
    setCanHover(window.matchMedia('(hover: hover)').matches);
  }, []);

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

  // On a real mouse, hovering already reveals the overlay via CSS below, so
  // a click can go straight through and navigate like a normal link. On
  // touch there's no hover — the first tap reveals instead of navigating,
  // and only a second tap on an already-revealed slide follows the link.
  function handleImageClick(e: React.MouseEvent, index: number) {
    if (canHover) return;
    if (revealedIndex !== index) {
      e.preventDefault();
      setRevealedIndex(index);
    }
  }

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-4 sm:gap-6">
          {slides.map((slide, i) => {
            const revealed = !canHover && revealedIndex === i;
            return (
              <div key={i} className="min-w-0 shrink-0 basis-[78%] sm:basis-[42%] lg:basis-[28%]">
                <a
                  href={slide.instagram_post_url || AKPSI_INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => handleImageClick(e, i)}
                  className="group relative block aspect-[4/5] w-full overflow-hidden bg-[#1c1c1c]"
                >
                  {slide.cloudinary_public_id ? (
                    <CldImage
                      src={slide.cloudinary_public_id}
                      alt={slide.caption}
                      fill
                      sizes="(max-width: 768px) 33vw, 33vw"
                      aspectRatio="4:5"
                      crop="fill"
                      gravity="auto"
                      loading="lazy"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-white/25">
                        Placeholder Image
                      </span>
                    </div>
                  )}

                  <div
                    className={`absolute inset-0 flex items-center justify-center bg-black/60 transition-opacity duration-200 ${
                      revealed ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <span className="text-xs uppercase tracking-[0.2em] text-white">View post</span>
                  </div>
                </a>

                <p className="mt-4 text-xs uppercase tracking-[0.15em] text-white/45">{slide.caption}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.15em] text-white/45">
                  🗒: {slide.location || 'Coming Soon!'}
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.15em] text-white/45">
                  ⚲: {slide.event_datetime || 'Coming Soon!'}
                </p>
              </div>
            );
          })}
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