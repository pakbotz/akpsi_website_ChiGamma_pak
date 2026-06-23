'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Signature scroll sequence, three phases inside one pinned section:
 *
 *  Phase A (0 -> 0.25 of scroll) — image grows from its entrance size up to
 *    its full centered size. Caption fades out as it grows.
 *  Phase B (0.25 -> 0.35 of scroll) — HOLD. No tweens run here at all, so the
 *    image just sits centered at full size for a brief pause while the user
 *    keeps scrolling. This is the short "spotlight" moment.
 *  Phase C (0.35 -> 1.0 of scroll) — image gradually shrinks AND moves down
 *    the page to land exactly on top of `shrinkTargetRef` — a small, real
 *    image block that sits beside the body copy below the headline (no more
 *    awkward inline slot wedged inside the text). The headline + paragraph
 *    fade in as the image settles into place. This phase gets the largest
 *    share of the timeline so the "fall into place" motion stays clearly
 *    visible even though the total pinned scroll distance is short.
 *
 * The whole section is pinned for its entire scroll distance, so the image
 * never drifts up/down on its own — only the tweened phases move it, and the
 * hold phase is a deliberate no-op gap.
 *
 * IMPORTANT — why this can't bleed onto the Hero:
 * The image is positioned `absolute` inside `pinRef` (not `fixed` to the
 * viewport). An absolutely-positioned element is clipped to its nearest
 * `position: relative` + `overflow-hidden` ancestor, which is exactly what
 * `pinRef` is. That containment is a CSS/layout guarantee enforced by the
 * browser itself, true on first paint before any JS has run, true on
 * refresh at any scroll position, true in every direction. No visibility
 * toggling, no "hide until scrolled a bit" logic needed at all — the image
 * simply cannot render outside this section's box.
 */
export default function ScrollImageReveal() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const shrinkTargetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (
        !wrapRef.current ||
        !pinRef.current ||
        !imgRef.current ||
        !shrinkTargetRef.current
      )
        return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          // Total pinned scroll distance — tune this number to control how
          // long the whole sequence (grow + hold + shrink) takes to play out.
          // Bigger = more scrolling required, smaller = faster.
          end: '+=100%',
          scrub: 1,
          pin: pinRef.current,
          pinSpacing: true,
        },
      });

      // --- Phase A: grow (0 -> 0.25) ---
      tl.to(
        captionRef.current,
        { opacity: 0, y: -20, duration: 0.18, ease: 'none' },
        0
      ).fromTo(
        imgRef.current,
        { width: '58vw', height: 'auto' },
        { width: '78vw', duration: 0.25, ease: 'none' },
        0
      );

      // --- Phase B: HOLD (0.25 -> 0.35) ---
      // Intentionally no tweens placed in this window — the image stays
      // exactly where Phase A left it, centered at full size, for a brief
      // pause while scroll distance still passes underneath.

      // --- Phase C: gradual shrink + move down onto the real target block (0.35 -> 1.0) ---
      tl.to(
        imgRef.current,
        {
          width: () => shrinkTargetRef.current!.offsetWidth,
          height: () => shrinkTargetRef.current!.offsetHeight,
          // imgRef is absolute *inside pinRef*, so its top/left need to be
          // expressed relative to pinRef's own box, not the raw viewport —
          // subtract pinRef's rect from the target's rect to convert.
          top: () => {
            const targetRect = shrinkTargetRef.current!.getBoundingClientRect();
            const pinRect = pinRef.current!.getBoundingClientRect();
            return targetRect.top - pinRect.top;
          },
          left: () => {
            const targetRect = shrinkTargetRef.current!.getBoundingClientRect();
            const pinRect = pinRef.current!.getBoundingClientRect();
            return targetRect.left - pinRect.left;
          },
          xPercent: 0,
          yPercent: 0,
          // This duration is the one to change if you want the "falling
          // into place" motion to play out over more (bigger number) or
          // less (smaller number) of the scroll. It's a fraction of the
          // whole timeline, which itself spans the full pinned scroll
          // distance set by `end` above — so the same number reads as a
          // slower fall on a longer `end` and a faster fall on a shorter one.
          duration: 0.65,
          ease: 'none',
        },
        0.35
      ).to(contentRef.current, { opacity: 1, duration: 0.15, ease: 'none' }, 0.95);
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapRef} className="relative bg-[#0a0a0a]">
      {/* Pinned viewport-height stage — this whole block stays fixed in the
          viewport for the full scroll distance defined by `end` above.
          `relative` + `overflow-hidden` here is what physically contains
          the absolutely-positioned image below — it cannot render outside
          this box, on the Hero or anywhere else, under any circumstances. */}
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
        {/* Image — absolutely positioned *within pinRef*, so GSAP can tween
            it freely but the browser guarantees it stays clipped inside
            this section no matter when/where the page loads or refreshes. */}
        <div
          ref={imgRef}
          className="absolute left-1/2 top-1/2 z-20 aspect-video w-[58vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-sm bg-[#1c1c1c]"
        >
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/25">
              Placeholder Image
            </span>
          </div>
        </div>

        {/* Caption beneath the image, also absolute so it tracks with it during Phase A */}
        <p
          ref={captionRef}
          className="absolute left-1/2 top-[78%] z-10 w-full max-w-md -translate-x-1/2 px-6 text-center text-sm leading-relaxed text-white/45"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      {/* Headline + body copy, text wraps around the small image rather than
          having the image embedded inline inside the headline itself. */}
      <div
        ref={contentRef}
        className="section-spacing relative z-10 mx-auto max-w-5xl px-6 opacity-0"
      >
        <h2
          className="text-center font-medium leading-[0.95] tracking-tight text-[#f0eeea]"
          style={{ fontSize: 'clamp(2.25rem, 6.5vw, 5.5rem)' }}
        >
          Shaping People,
          <br />
          Shaping Business
        </h2>

        {/* Small image sits beside the paragraph — this is the real DOM
            element the big image shrinks down and travels to land on. */}
        <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-8 sm:flex-row sm:items-start">
          <div
            ref={shrinkTargetRef}
            className="aspect-video w-full shrink-0 rounded-sm bg-[#1c1c1c] sm:w-[14rem]"
          >
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-[9px] uppercase tracking-[0.25em] text-white/20">
                Placeholder
              </span>
            </div>
          </div>

          <p className="text-base leading-relaxed text-white/45">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi
            ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    </section>
  );
}