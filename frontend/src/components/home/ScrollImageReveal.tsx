'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CldImage } from 'next-cloudinary';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SM_BREAKPOINT = 640; // Tailwind sm
const MD_BREAKPOINT = 768; // Tailwind md / iPad

export default function ScrollImageReveal({
  imagePublicId,
}: {
  imagePublicId: string | null;
}) {
  const wrapRef        = useRef<HTMLDivElement>(null);
  const pinRef         = useRef<HTMLDivElement>(null);
  const imgRef         = useRef<HTMLDivElement>(null);
  // Desktop: left/right side columns
  const leftColRef     = useRef<HTMLDivElement>(null);
  const rightColRef    = useRef<HTMLDivElement>(null);
  // Mobile only: stacked headline above image
  const mobileHeadRef  = useRef<HTMLDivElement>(null);
  const captionRef     = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (
        !wrapRef.current    ||
        !pinRef.current     ||
        !imgRef.current     ||
        !leftColRef.current ||
        !rightColRef.current||
        !mobileHeadRef.current ||
        !captionRef.current
      ) return;

      const isMobile = window.innerWidth < SM_BREAKPOINT;
      const imgStart = isMobile ? '90vw' : '54vw';
      const imgEnd   = isMobile ? '70vw' : '34vw';

      // ── Hide everything that reveals at park ────────────────────────────
      // Desktop side columns always start hidden (even if display:none on
      // mobile, gsap.set is harmless on hidden elements)
      gsap.set(leftColRef.current,   { opacity: 0, x: -24 });
      gsap.set(rightColRef.current,  { opacity: 0, x:  24 });
      // Mobile headline always starts hidden — this is the fix.
      // Previously this was never set to opacity:0, so it showed immediately.
      gsap.set(mobileHeadRef.current, { opacity: 0, y: 12 });
      gsap.set(captionRef.current,   { opacity: 0, y: 12 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start:   'top top',
          end:     '+=175%',
          scrub:   1.5,
          pin:     pinRef.current,
          pinSpacing: true,
        },
      });

      tl.addLabel('hold-start',   0)
        .addLabel('shrink-start', 0.20);

      // Phase 2b: slow shrink (0.20 → 0.75)
      tl.fromTo(
        imgRef.current,
        { width: imgStart },
        { width: imgEnd, duration: 0.55, ease: 'none' },
        0.20
      );

      // Phase 3: reveal at park (0.75)
      if (isMobile) {
        // Mobile: stacked headline slides up from below
        tl.to(mobileHeadRef.current,
          { opacity: 1, y: 0, duration: 0.10, ease: 'power2.out' },
          0.75
        );
      } else {
        // Desktop: side columns slide in from edges
        tl.to(leftColRef.current,
          { opacity: 1, x: 0, duration: 0.10, ease: 'power2.out' },
          0.5
        ).to(rightColRef.current,
          { opacity: 1, x: 0, duration: 0.10, ease: 'power2.out' },
          0.5
        );
      }

      // Caption reveals on all breakpoints at the same time
      tl.to(captionRef.current,
        { opacity: 1, y: 0, duration: 0.10, ease: 'power2.out' },
        0.5
      );

      // Phase 4: hold final frame (0.88 → 1.0) — no tweens needed
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapRef} className="relative bg-[#0a0a0a]">
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">

        {/* ── Mobile stacked headline — hidden on desktop ────────────────── */}
        {/*
          Uses its OWN ref (mobileHeadRef) — separate from the desktop
          side column refs. GSAP sets opacity:0 on mount and only reveals
          it during Phase 3, so it is invisible for the entire scroll
          sequence until the image parks.
          top-[28%]: sits just above the image (which is at top-[34%]).
          Decrease to move headline closer to the image.
        */}
        <div
          ref={mobileHeadRef}
          className="absolute inset-x-0 top-[28%] z-20 flex flex-col items-center text-center sm:hidden"
        >
          <span
            className="block font-medium leading-tight tracking-tight text-[#f0eeea]"
            style={{ fontSize: 'clamp(1.75rem, 7vw, 2.5rem)' }}
          >
            Shaping People
          </span>
          <span
            className="block font-medium leading-tight tracking-tight text-[#f0eeea]"
            style={{ fontSize: 'clamp(1.75rem, 7vw, 2.5rem)' }}
          >
            Shaping Business
          </span>
        </div>

        {/* ── Image ─────────────────────────────────────────────────────── */}
        {/*
          Mobile: top-[34%] leaves room for headline above + caption below.
          Desktop: perfectly centered via top-1/2 -translate-y-1/2.
          Width is owned entirely by GSAP fromTo — no static w-[] class.
        */}
        <div
          ref={imgRef}
          className="
            absolute left-1/2 -translate-x-1/2 overflow-hidden rounded-sm bg-[#1c1c1c] z-10
            top-[38%]
            sm:top-1/2 sm:-translate-y-1/2
          "
          style={{ aspectRatio: '16/9' }}
        >
          {imagePublicId ? (
            <CldImage
              src={imagePublicId}
              alt="Chi Gamma brothers"
              fill
              sizes={`(max-width: ${SM_BREAKPOINT}px) 90vw, (max-width: ${MD_BREAKPOINT}px) 80vw, 54vw`}
              quality="auto"
              format="auto"
              className="object-cover"
              preload
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/25">
                Placeholder Image
              </span>
            </div>
          )}
        </div>

        {/* ── Desktop left column — hidden on mobile ────────────────────── */}
        <div
          ref={leftColRef}
          className="absolute top-1/2 left-0 z-20 hidden -translate-y-1/2 flex-col items-end pr-6 text-right sm:flex"
          style={{ right: '70vw' }}
        >
          <span
            className="block font-medium leading-none tracking-tight text-[#f0eeea]"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 10rem)' }}
          >
            Shaping
          </span>
          <span
            className="block font-medium leading-none tracking-tight text-[#f0eeea]"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 10rem)' }}
          >
            People
          </span>
        </div>

        {/* ── Desktop right column — hidden on mobile ───────────────────── */}
        <div
          ref={rightColRef}
          className="absolute top-1/2 right-0 z-20 hidden -translate-y-1/2 flex-col items-start pl-6 text-left sm:flex"
          style={{ left: '70vw' }}
        >
          <span
            className="block font-medium leading-none tracking-tight text-[#f0eeea]"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 10rem)' }}
          >
            Shaping
          </span>
          <span
            className="block font-medium leading-none tracking-tight text-[#f0eeea]"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 10rem)' }}
          >
            Business
          </span>
        </div>

        {/* ── Caption — all breakpoints ──────────────────────────────────── */}
        <p
          ref={captionRef}
          className="
            absolute left-1/2 z-20 -translate-x-1/2 text-center leading-relaxed text-white
            w-[70vw] text-sm
            sm:w-[48vw]
          "
          style={{
            top: 'calc(50% + (50vw * 9/31) + .5rem)',
            fontSize: 'clamp(1rem, 1vw, .5rem)',
          }}
        >
          Alpha Kappa Psi, the world&apos;s oldest and largest co-ed professional
          business fraternity, was founded on October 5th, 1904. At the Chi Gamma
          Chapter here at UCSC, we empower the business leaders of tomorrow through
          professional development assistance and a network that lasts beyond
          graduation.
          <br />
          All Majors accepted. One Brotherhood.
        </p>

      </div>
    </section>
  );
}