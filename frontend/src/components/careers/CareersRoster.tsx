'use client';

import { useState } from 'react';
import type { CareerAlum } from '@/lib/careers';

export default function CareersRoster({
  years,
  alumniByYear,
}: {
  years: string[];
  alumniByYear: Record<string, CareerAlum[]>;
}) {
  const [activeYear, setActiveYear] = useState(years[years.length - 1] ?? '');
  const roster = alumniByYear[activeYear] ?? [];

  if (years.length === 0) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-[#0a0a0a] px-6">
        <p className="text-sm uppercase tracking-[0.25em] text-white/40">
          Career roster coming soon.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] px-6 py-16 sm:px-12">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.25em] text-white/50">
             Our Careers
          </p>
          <h1
            className="mt-2 text-3xl text-white sm:text-4xl"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {activeYear}
          </h1>
          <p className="mt-1 text-sm text-white/40">
            {roster.length} Brother{roster.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Year tabs — ledger/folder-tab style */}
        <div className="flex flex-wrap gap-x-1 gap-y-0">
          {years.map((year) => {
            const isActive = year === activeYear;
            return (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={[
                  'relative rounded-t-md px-4 py-2 text-sm tracking-wide transition-colors',
                  isActive
                    ? 'bg-[#111111] text-[#c9a227]'
                    : 'bg-transparent text-white/40 hover:text-white/70',
                ].join(' ')}
                style={
                  isActive
                    ? { boxShadow: 'inset 0 1px 0 0 rgba(201,162,39,0.6)' }
                    : undefined
                }
              >
                '{year.slice(2)}
                {isActive && (
                  <span className="absolute inset-x-3 -bottom-px h-px bg-[#111111]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Roster surface */}
        <div className="rounded-b-md rounded-tr-md border-t border-white/10 bg-[#111111]">
          <ul>
            {roster.map((alum, i) => (
              <li
                key={`${alum.name}-${i}`}
                className={[
                  'flex flex-col gap-1 px-6 py-5 sm:flex-row sm:items-baseline sm:justify-between',
                  i !== roster.length - 1 ? 'border-b border-white/10' : '',
                ].join(' ')}
              >
                <span
                  className="text-lg text-white"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  {alum.name}
                </span>
                <span className="text-sm text-white/50">
                  {alum.title}
                  <span className="text-white/25"> · </span>
                  <span className="text-[#c9a227]/80">{alum.company}</span>
                </span>
              </li>
            ))}
            {roster.length === 0 && (
              <li className="px-6 py-8 text-center text-sm text-white/30">
                No entries for {activeYear} yet.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}