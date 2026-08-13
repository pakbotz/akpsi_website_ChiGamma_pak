'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { RUSH_TERMS, type RushTerm } from '@/lib/rushTerms';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function RushIndexPage() {
  const activeTerms = RUSH_TERMS.filter((t) => t.status === 'active');
  const archivedTerms = RUSH_TERMS.filter((t) => t.status === 'archived');

  return (
    <div className="min-h-screen w-full bg-[#f0eeea] px-6 pb-24 pt-36 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
          Rush AKΨ · UC Santa Cruz
        </p>
        <h1
          className="mt-4 font-medium leading-[0.95] tracking-tight text-neutral-900"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
        >
          Choose your term
        </h1>
        <p className="mt-6 max-w-lg text-sm text-neutral-500">
          Each recruitment cycle has its own schedule, events, and application
          window. Pick a term below to see the details.
        </p>

        <div className="mt-16 flex flex-col gap-4">
          {activeTerms.map((term, i) => (
            <FeaturedTermRow key={term.slug} num={i + 1} term={term} />
          ))}
        </div>

        {archivedTerms.length > 0 && (
          <div className="mt-20">
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">Past Terms</p>
            <div className="mt-6 flex flex-col divide-y divide-neutral-200 border-t border-neutral-200">
              {archivedTerms.map((term, i) => (
                <TermRow key={term.slug} num={i + 1} term={term} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FeaturedTermRow({ num, term }: { num: number; term: RushTerm }) {
  return (
    <motion.div custom={num} variants={fadeUp} initial="hidden" animate="visible">
      <Link
        href={`/rush/${term.slug}`}
        className="group flex flex-col items-start justify-between gap-6 border border-neutral-300 bg-white px-8 py-10 transition-colors hover:border-neutral-900 sm:flex-row sm:items-center"
      >
        <div className="flex items-baseline gap-5">
          <span className="text-sm font-medium tabular-nums text-neutral-400">
            {String(num).padStart(2, '0')}
          </span>
          <span className="text-4xl font-medium tracking-tight text-neutral-900 sm:text-6xl">
            {term.label}
          </span>
        </div>
        <span className="shrink-0 rounded-full bg-[#c8b89a] px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-neutral-900 transition-colors group-hover:bg-[#b8a683]">
          Apply Now
        </span>
      </Link>
    </motion.div>
  );
}

function TermRow({ num, term }: { num: number; term: RushTerm }) {
  const isArcteryx = term.theme === 'arcteryx';

  return (
    <motion.div
      custom={num}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Link
        href={`/rush/${term.slug}`}
        className="group flex items-center justify-between gap-6 py-6 transition-colors"
      >
        <div className="flex items-baseline gap-4">
          <span className="text-xs tabular-nums text-neutral-400">
            ({String(num).padStart(2, '0')})
          </span>
          <span
            className={`text-3xl font-medium tracking-tight text-neutral-400 transition-colors sm:text-5xl ${
              isArcteryx ? 'group-hover:text-[#c1552d]' : 'group-hover:text-neutral-700'
            }`}
          >
            {term.label}
          </span>
        </div>
        <span className="hidden shrink-0 text-xs uppercase tracking-[0.2em] text-neutral-400 sm:block">
          Closed
        </span>
      </Link>
    </motion.div>
  );
}
