'use client';

// Placeholder company names — swap for real logo assets via Cloudinary later.
const COMPANIES = [
  'Company One',
  'Company Two',
  'Company Three',
  'Company Four',
  'Company Five',
  'Company Six',
  'Company Seven',
  'Company Eight',
];

function LogoRow({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-16 px-8" aria-hidden={ariaHidden}>
      {COMPANIES.map((name, i) => (
        <span
          key={name + i}
          className="whitespace-nowrap text-2xl font-medium tracking-tight text-white/25 transition-colors duration-300 hover:text-white/60 sm:text-3xl"
        >
          {name}
        </span>
      ))}
    </div>
  );
}

export default function CompanyCarousel() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent sm:w-32" />

      <div className="marquee-track flex w-max items-center py-2">
        <LogoRow />
        <LogoRow ariaHidden />
      </div>
    </div>
  );
}