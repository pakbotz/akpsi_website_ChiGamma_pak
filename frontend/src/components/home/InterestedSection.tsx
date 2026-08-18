import { ArrowRight} from 'lucide-react';
import RushCarousel from '@/components/ui/RushCarousel';
import type { RushCarouselSlide } from '@/lib/types';

const AKPSI_INSTAGRAM = 'https://www.instagram.com/ucscakpsi/';

function InstagramIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.5" y1="6.5" y2="6.5" />
    </svg>
  );
}
export default function InterestedSection({ slides }: { slides: RushCarouselSlide[] }) {
  return (
    <section className="bg-[#0a0a0a] min-h-[90vh] flex flex-col justify-center py-20 md:py-28">
      <div className="w-full max-w-7xl mx-auto px-8">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2
            className="font-medium tracking-tight text-[#f0eeea]"
            style={{ fontSize: 'clamp(2rem, 4.2vw, 3.25rem)' }}
          >
            Interested in Joining?
          </h2>

          <a
            href={AKPSI_INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4"
          >
            <span className="max-w-[11rem] text-right text-sm text-white/45 transition-colors group-hover:text-white/70">
              To see more, follow our Instagram!
            </span>
            <ArrowRight
              size={18}
              className="shrink-0 text-white/40 transition-colors group-hover:text-[#c8b89a]"
            />
            <span
              className="flex shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition-colors group-hover:border-[#c8b89a] group-hover:text-[#c8b89a]"
              style={{ height: 'clamp(2rem, 4.2vw, 3.25rem)', width: 'clamp(2rem, 4.2vw, 3.25rem)' }}
            >
              <InstagramIcon size={20} />
            </span>
          </a>
        </div>

        <RushCarousel slides={slides} />
      </div>
    </section>
  );
}