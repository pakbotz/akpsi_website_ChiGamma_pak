'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CldImage } from 'next-cloudinary';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollImageReveal({
  imagePublicId,
}: {
  imagePublicId: string | null;
}) {
  const wrapRef     = useRef<HTMLDivElement>(null);
  const pinRef      = useRef<HTMLDivElement>(null);
  const imgRef      = useRef<HTMLDivElement>(null);
  const leftColRef  = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const captionRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (
        !wrapRef.current    ||
        !pinRef.current     ||
        !imgRef.current     ||
        !leftColRef.current ||
        !rightColRef.current ||
        !captionRef.current
      ) return;

      gsap.set(leftColRef.current,  { opacity: 0, x: -24 });
      gsap.set(rightColRef.current, { opacity: 0, x:  24 });
      gsap.set(captionRef.current, { opacity: 0, y: 12 });

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

      tl.addLabel('hold-start', 0)
        .addLabel('shrink-start', 0.20);

      // Phase 2b: slow shrink (0.20 → 0.75)
      tl.fromTo(imgRef.current, 
        { width: '54vw' },
        {
          width:    '34vw',
          duration: 0.55,
         ease:     'none',
        }, 0.20);

      // Phase 3: text reveal (0.75 → 0.88)
      tl.to(leftColRef.current,
        { opacity: 1, x: 0, duration: 0.10, ease: 'power2.out' },
        0.75
      ).to(rightColRef.current,
        { opacity: 1, x: 0, duration: 0.10, ease: 'power2.out' },
        0.75
      ).to(captionRef.current,
        { opacity: 1, y: 0, duration: 0.10, ease: 'power2.out' },
        0.75
      );;

      // Phase 4: hold final frame (0.88 → 1.0) — no tweens needed
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapRef} className="relative bg-[#0a0a0a]">
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">

        <div
          ref={imgRef}
          className="absolute left-1/2 top-1/2 z-10 aspect-video -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-sm bg-[#1c1c1c]"
        >
          {imagePublicId ? (
            <CldImage
              src={imagePublicId}
              alt="Chi Gamma brothers"
              fill
              sizes="54vw"
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
        
        <div
          ref={leftColRef}
          className="absolute top-1/2 left-0 z-20 flex -translate-y-1/2 flex-col items-end pr-6 text-right"
          style={{ right: '70vw' }}
        >
          <span className="block font-medium leading-none tracking-tight text-[#f0eeea]"
            style={{ fontSize: 'clamp(2.5rem, 3.5vw, 7rem)' }}>
            Shaping
          </span>
          <span className="block font-medium leading-none tracking-tight text-[#f0eeea]"
            style={{ fontSize: 'clamp(2.5rem, 3.5vw, 7rem)' }}>
            People
          </span>
        </div>

        <div
          ref={rightColRef}
          className="absolute top-1/2 right-0 z-20 flex -translate-y-1/2 flex-col items-start pl-6 text-left"
          style={{ left: '70vw' }}
        >
          <span className="block font-medium leading-none tracking-tight text-[#f0eeea]"
            style={{ fontSize: 'clamp(2.5rem, 3.5vw, 7rem)' }}>
            Shaping
          </span>
          <span className="block font-medium leading-none tracking-tight text-[#f0eeea]"
            style={{ fontSize: 'clamp(2.5rem, 3.5vw, 7rem)' }}>
            Business
          </span>

        </div>
        <p
          ref={captionRef}
          className="absolute left-1/2 z-20 w-[48vw] -translate-x-1/2 text-center font-small leading-relaxed text-white"
          style={{ top: 'calc(50% + (48vw * 9/32) + .5rem)' , fontSize: 'clamp(1rem, 1vw, .5rem)' }}
        >
          Alpha Kappa Psi, the world's oldest and largest co-ed professional business fraternity, was founded on October 5th, 1904. 
          At the Chi Gamma Chapter here at UCSC, we empower the business leaders of tomorrow through professional development assistance 
          and a network that lasts beyond graduation.
          <br/>
          All Majors accepted. One Brotherhood.
        </p>

      </div>
      
    </section>
  );
}