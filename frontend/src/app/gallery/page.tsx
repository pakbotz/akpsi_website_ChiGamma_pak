import Link from 'next/link';
import GalleryCarousel from '@/components/gallery/GalleryCarousel';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import AmbientGlow from '@/components/gallery/AmbientGlow';
import GalleryHero from '@/components/gallery/GalleryHero';
import RevealSection from '@/components/gallery/RevealSection';
import Footer from '@/components/home/Footer';
import { getGalleryImages, getGalleryEvents } from '@/lib/gallery';


export default async function GalleryPage() {
  const [images, events] = await Promise.all([getGalleryImages(), getGalleryEvents()]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#faf1de] pb-0 pt-36">
      <AmbientGlow />

      <GalleryHero />

      <section className="relative z-10 mt-16 px-6 sm:px-8">
        <div className="mx-auto max-w-8xl">
          <GalleryGrid images={images} />
        </div>
      </section>

      {events.length > 0 && (
        <section className="relative z-10 mt-24 px-6 sm:px-8">
          <div className="mx-auto max-w-8xl">
            <RevealSection>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c2662d]">Events</p>
              <div className="mt-6">
                <GalleryCarousel events={events} />
              </div>
            </RevealSection>
          </div>
        </section>
      )}

      {/* This band is the deliberate hinge between the page's warm cream
          top and the shared black Footer below — it carries the gradient
          the rest of the way down so the switch to black reads as dusk
          settling in, not a hard cut. */}
      <section className="relative z-10 mt-24 px-6 pb-10 pt-16 sm:px-8">
        <RevealSection className="mx-auto max-w-8xl">
          <div
            className="overflow-hidden rounded-3xl px-8 py-12 sm:px-12"
            style={{
              background:
                'radial-gradient(circle at 15% 20%, rgba(255,222,163,0.35), transparent 55%), linear-gradient(160deg, #e8a55c 0%, #c2662d 45%, #3a1c0a 100%)',
            }}
          >
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <p className="max-w-md text-2xl font-medium leading-tight tracking-tight text-[#fff3e2]">
                Want to be in the next one? Rush Alpha Kappa Psi.
              </p>
              <Link
                href="/rush"
                className="shrink-0 rounded-full bg-[#fff3e2] px-8 py-3 text-sm font-medium uppercase tracking-[0.15em] text-[#7a3010] shadow-[0_0_30px_-5px_rgba(255,243,226,0.5)] transition-all hover:bg-white hover:shadow-[0_0_40px_-5px_rgba(255,243,226,0.7)]"
              >
                Learn More
              </Link>
            </div>
          </div>
        </RevealSection>
      </section>

      <div className="relative z-10 bg-[#0a0a0a]">
        <Footer />
      </div>
    </div>
  );
}