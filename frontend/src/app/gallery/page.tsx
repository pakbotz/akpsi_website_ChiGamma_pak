import Link from 'next/link';
import GalleryCarousel from '@/components/gallery/GalleryCarousel';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import { getGalleryImages, getGalleryEvents } from '@/lib/gallery';

export default async function GalleryPage() {
  const [images, events] = await Promise.all([getGalleryImages(), getGalleryEvents()]);

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] pb-24 pt-36">
      <div className="mx-auto max-w-8xl px-6 sm:px-8">
        <p className="text-xs uppercase tracking-[0.25em] text-[#c8b89a]">Gallery</p>
        <h1
          className="mt-4 font-medium leading-[0.95] tracking-tight text-[#f0eeea]"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
        >
          Brotherhood
        </h1>
      </div>

      <section className="mt-16 px-6 sm:px-8">
        <div className="mx-auto max-w-8xl">
          <GalleryGrid images={images} />
        </div>
      </section>

      {events.length > 0 && (
        <section className="mt-24 px-6 sm:px-8">
          <div className="mx-auto max-w-8xl">
            <p className="text-xs uppercase tracking-[0.25em] text-[#c8b89a]">Events</p>
            <div className="mt-6">
              <GalleryCarousel events={events} />
            </div>
          </div>
        </section>
      )}

      <section className="mt-24 border-t border-white/10 px-6 pt-16 sm:px-8">
        <div className="mx-auto flex max-w-8xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="text-2xl font-medium tracking-tight text-[#f0eeea]">
            Want to be in the next one? Rush Alpha Kappa Psi.
          </p>
          <Link
            href="/rush"
            className="shrink-0 rounded-full bg-[#c8b89a] px-8 py-3 text-sm font-medium uppercase tracking-[0.15em] text-neutral-900 transition-colors hover:bg-[#b8a683]"
          >
            Learn More
          </Link>
        </div>
      </section>
    </div>
  );
}