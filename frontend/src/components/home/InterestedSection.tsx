import GalleryExplore from '@/components/ui/GalleryExplore';

export default function InterestedSection() {
  return (
    <section className="bg-[#0a0a0a] py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2
            className="font-medium tracking-tight text-[#f0eeea]"
            style={{ fontSize: 'clamp(2rem, 4.2vw, 3.25rem)' }}
          >
            Interested in Joining?
          </h2>
          <p className="max-w-sm text-sm text-white/45">
            A look at life in the chapter — from rush week to formal
            initiation.
          </p>
        </div>

        <GalleryExplore />
      </div>
    </section>
  );
}