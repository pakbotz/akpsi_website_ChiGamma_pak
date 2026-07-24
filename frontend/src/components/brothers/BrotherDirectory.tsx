'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Brother, brothers } from '@/lib/brothers';
import { CHAPTER_PLEDGE_CLASSES } from '@/lib/greekAlphabet';
import BoardFilter, { BoardFilterValue } from './BoardFilter';
import BrotherCard from './BrotherCard';
import BrotherModal from './BrotherModal';
import PledgeClassFilter, { ALL_CLASSES } from './PledgeClassFilter';

export default function BrotherDirectory() {
  const [selectedClass, setSelectedClass] = useState<string>(ALL_CLASSES);
  const [boardFilter, setBoardFilter] = useState<BoardFilterValue>('All Brothers');
  const [selectedBrother, setSelectedBrother] = useState<Brother | null>(null);

  const visibleBrothers = useMemo(() => {
    return brothers.filter((b) => {
      if (boardFilter === 'Executive' && !b.isExecTeam) return false;
      if (boardFilter === 'Lower' && !b.isLowerBoard) return false;
      if (selectedClass !== ALL_CLASSES && b.pledgeClass !== selectedClass) return false;
      return true;
    });
  }, [selectedClass, boardFilter]);

  return (
    <section className="min-h-dvh bg-[#0a0a0a] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[#c8b89a]">
          The Chapter
        </p>
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h1
            className="font-medium leading-[1.05] tracking-tight text-[#f0eeea]"
            style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)' }}
          >
            Our Brothers
          </h1>

          <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
            <PledgeClassFilter
              options={CHAPTER_PLEDGE_CLASSES}
              selected={selectedClass}
              onChange={setSelectedClass}
            />
            <BoardFilter selected={boardFilter} onChange={setBoardFilter} />
          </div>
        </div>

        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-8 gap-y-14">
          {visibleBrothers.map((brother) => (
            <div key={brother.id} className="w-64 shrink-0">
              <BrotherCard
                brother={brother}
                onClick={() => setSelectedBrother(brother)}
              />
            </div>
          ))}

          {visibleBrothers.length === 0 && (
            <p className="text-sm text-white/45">
              No brothers found for this filter.
            </p>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedBrother && (
          <BrotherModal
            brother={selectedBrother}
            onClose={() => setSelectedBrother(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
