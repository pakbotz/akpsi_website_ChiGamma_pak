import { Brother } from '@/lib/brothers';
import { toGreekLetter } from '@/lib/greekAlphabet';

export default function BrotherCard({
  brother,
  onClick,
}: {
  brother: Brother;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group block w-full text-left"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#1c1c1c] transition-opacity group-hover:opacity-80">
        {brother.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={brother.photoUrl}
            alt={brother.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/25">
              Placeholder Photo
            </span>
          </div>
        )}
      </div>

      <div className="mt-4">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="text-base font-medium text-[#f0eeea]">
            {brother.name}
          </h2>
          <span
            className="shrink-0 text-lg text-[#c8b89a]"
            title={brother.pledgeClass}
          >
            {toGreekLetter(brother.pledgeClass)}
          </span>
        </div>

        <p className="mt-1 text-sm text-white/55">
          {brother.major}
          {brother.minor ? ` · ${brother.minor}` : ''}
        </p>

        <p className="mt-1 text-xs uppercase tracking-[0.1em] text-white/40">
          Class of {brother.year}
        </p>

        {brother.positions.length > 0 && (
          <p className="mt-2 text-xs uppercase tracking-[0.1em] text-white/40">
            {brother.positions.join(' · ')}
          </p>
        )}
      </div>
    </button>
  );
}
