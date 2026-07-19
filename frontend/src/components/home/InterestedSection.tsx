import RushCarousel from '@/components/ui/RushCarousel';

export default function InterestedSection() {
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
            Become part of the world's largest and oldest business fraternity. 
            Develop professionally, build lasting friendships, and create opportunities for your future.
          </p>
        </div>

        <RushCarousel />
      </div>
    </section>
  );
}