import RushCarousel from '@/components/ui/RushCarousel';

type Slide = { cloudinary_public_id: string | null; caption: string };

export default function InterestedSection({ slides }: { slides: Slide[] }) {
  return (
    <section className="bg-[#0a0a0a] min-h-dvh flex flex-col justify-center py-20 md:py-28">
      <div className="mx-auto max-w-8xl px-6">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2
            className="font-medium tracking-tight text-[#f0eeea]"
            style={{ fontSize: 'clamp(2rem, 4.2vw, 3.25rem)' }}
          >
            Interested in Joining?
          </h2>
          <p className="max-w-sm text-sm text-white/45">
            Become part of the world&apos;s largest and oldest business fraternity.
            Develop professionally, build lasting friendships, and create opportunities for your future.
          </p>
        </div>

        <RushCarousel slides={slides} />
      </div>
    </section>
  );
}