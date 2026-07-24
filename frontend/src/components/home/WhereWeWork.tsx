// WhereWeWork.tsx
import CompanyCarousel from '@/components/ui/CompanyCarousel';

export default function WhereWeWork({
  logos,
}: {
  logos: { key: string; cloudinaryPublicId: string }[];
}) {
  return (
    <section className="bg-[#0a0a0a] min-h-dvh flex flex-col justify-center py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 w-full">
        <h2
          className="mb-4 font-medium tracking-tight text-[#f0eeea]"
          style={{ fontSize: 'clamp(2rem, 4.2vw, 3.25rem)' }}
        >
          Where We Work
        </h2>

        <p className="mb-12 max-w-md text-base text-white/45">
          Our brothers venture into a wide variety of careers and industries.
        </p>

        <button className="mb-16 border border-white/25 px-7 py-3 text-xs uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-white/60 hover:text-white">
          Where We Work
        </button>
      </div>

      <CompanyCarousel logos={logos} />
    </section>
  );
}