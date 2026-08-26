'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import type { RushEvent, RushTerm } from '@/lib/rushTerms';

// ─── Mountain / western theme ────────────────────────────────────────
// A bold, immersive alternative to a light default page: full color
// blocks (not just accents) inspired by vintage national-park travel
// posters — bark-brown, pine, rust, and mustard gold against parchment.
// The page alternates dark/light blocks all the way down, punctuated by
// a mountain-ridge silhouette. No Arc'teryx branding — this is a color
// and mood language, applied entirely to AKPsi's own content.
const ESPRESSO = '#2b1c12';
const PINE = '#3d4a37';
const RUST = '#c1552d';
const GOLD = '#d1a13f';
const CREAM = '#f2e8d0';
const TAN = '#e4d4b0';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const FIELD_NOTES = [
  {
    title: 'Show up prepared',
    body: 'Each event tells you something different about the chapter. Read the schedule, know the dress code, come ready.',
  },
  {
    title: 'Ask direct questions',
    body: 'Rush is a two-way evaluation. The more specific your questions, the more useful the answers.',
  },
  {
    title: 'Dress for the conditions',
    body: 'Professional nights call for professional dress. Check the schedule for what each event requires.',
  },
  {
    title: 'Close the loop',
    body: 'A short follow-up after an event is a small signal that reads as a big one.',
  },
];

const FAQS = [
  {
    q: 'What distinguishes us from other organizations?',
    a: 'Alpha Kappa Psi combines professional development with lifelong brotherhood — career growth, networking, and service alongside close personal relationships.',
  },
  {
    q: 'Is it necessary to be a business major to join?',
    a: 'No. Every major is welcome — what matters is interest in professional growth and building a strong network.',
  },
  {
    q: 'What is the Prospecting Process?',
    a: 'Attend rush events, submit an application, complete a short interview, and answer a few written questions before bids go out.',
  },
  {
    q: 'Is attendance at Rush Events obligatory for applying?',
    a: "Strongly encouraged — it's the clearest way for us to get to know you before you apply.",
  },
];

export default function ArcteryxTermView({
  term,
  otherTerms,
}: {
  term: RushTerm;
  otherTerms: RushTerm[];
}) {
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: CREAM }}>
      {/* ─── Hero: bark-brown, full-bleed ────────────────────────── */}
      <section
        className="relative flex h-[85vh] min-h-[560px] w-full flex-col justify-between overflow-hidden px-6 pb-24 pt-32 sm:px-10"
        style={{ backgroundColor: ESPRESSO }}
      >
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] uppercase tracking-[0.4em]" style={{ color: 'rgba(242,232,208,0.12)' }}>
            Placeholder Image
          </span>
        </div>

        <div
          className="relative z-10 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em]"
          style={{ color: 'rgba(242,232,208,0.55)' }}
        >
          <Link href="/rush" className="hover:text-white">
            All Terms
          </Link>
          <span style={{ color: 'rgba(242,232,208,0.25)' }}>/</span>
          <span>{term.label}</span>
        </div>

        <div className="relative z-10">
          <p className="text-xs uppercase tracking-[0.4em]" style={{ color: GOLD }}>
            Recruitment Season · UC Santa Cruz
          </p>
          <h1
            className="mt-4 font-medium uppercase leading-[0.85] tracking-tight"
            style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', color: CREAM }}
          >
            Rush<br />{term.label}
          </h1>
        </div>

        {/* Mountain ridge silhouette, cut into the horizon */}
        <svg
          className="pointer-events-none absolute bottom-0 left-0 z-10 h-24 w-full sm:h-32"
          viewBox="0 0 1440 140"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,140 L0,90 L110,45 L230,100 L340,25 L460,80 L560,10 L680,70 L800,30 L920,95 L1040,50 L1160,105 L1280,40 L1440,85 L1440,140 Z"
            fill={CREAM}
          />
        </svg>
      </section>

      {/* ─── Field brief: paragraph + image ───────────────────────── */}
      <section className="px-6 py-20 sm:px-10" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-16">
          <div className="aspect-[4/5] w-full" style={{ backgroundColor: TAN }}>
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: '#a3906c' }}>
                Placeholder Photo
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.3em]" style={{ color: RUST }}>
              Field Brief
            </p>
            <h2 className="mt-4 text-2xl font-medium tracking-tight sm:text-3xl" style={{ color: ESPRESSO }}>
              Built for the ones who show up.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed" style={{ color: '#5c4c38' }}>
              {`${term.blurb} Rush ${term.label} is a direct look at Alpha Kappa Psi — no filler, no fluff. Five events, one week, every one designed to show you exactly what this chapter is and isn't.`}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Rush Week Schedule: pine block ───────────────────────── */}
      <section className="px-6 py-20 sm:px-10" style={{ backgroundColor: PINE }}>
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-medium tracking-tight sm:text-3xl" style={{ color: CREAM }}>
            Rush Week Schedule
          </h2>

          <div className="mt-10 flex flex-col" style={{ borderTop: '1px solid rgba(242,232,208,0.2)' }}>
            {term.events.map((event, i) => (
              <ScheduleRow key={event.name} event={event} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── From the Field: gallery ──────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: RUST }}>
            From the Field
          </p>
          <h2 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl" style={{ color: ESPRESSO }}>
            Photo Gallery
          </h2>
          <p className="mt-3 max-w-lg text-sm" style={{ color: '#7a6a4f' }}>
            Photos from {term.label} will go here — placeholders for now.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-2 px-6 sm:grid-cols-3 sm:px-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="relative aspect-square w-full"
              style={{ backgroundColor: TAN }}
            >
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: '#a3906c' }}>
                  Placeholder Photo
                </span>
              </div>
              <span
                className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.2em]"
                style={{ color: RUST }}
              >
                Fig. {String(i + 1).padStart(2, '0')}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Field Notes: rust block ──────────────────────────────── */}
      <section className="px-6 py-20 sm:px-10" style={{ backgroundColor: RUST }}>
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: 'rgba(242,232,208,0.7)' }}>
            Preparation
          </p>
          <h2 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl" style={{ color: CREAM }}>
            Field Notes
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
            {FIELD_NOTES.map((note, i) => (
              <motion.div
                key={note.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="pl-5"
                style={{ borderLeft: `2px solid ${GOLD}` }}
              >
                <p className="text-xs tracking-[0.2em]" style={{ color: GOLD }}>
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-2 font-medium" style={{ color: CREAM }}>
                  {note.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: 'rgba(242,232,208,0.75)' }}>
                  {note.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Apply ────────────────────────────────────────────────── */}
      <section className="px-6 py-20 sm:px-10" style={{ backgroundColor: CREAM }}>
        <div
          className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-8 py-10 sm:flex-row sm:items-center"
          style={{ border: `2px solid ${ESPRESSO}` }}
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em]" style={{ color: RUST }}>
              {term.status === 'archived' ? 'Applications Closed' : 'Apply By'}
            </p>
            <p className="mt-2 text-2xl font-medium tracking-tight" style={{ color: ESPRESSO }}>
              {term.applyBy}
            </p>
          </div>
          {term.status === 'archived' ? (
            <span
              className="px-6 py-3 text-xs uppercase tracking-[0.3em]"
              style={{ border: '1px solid #cbb98d', color: '#a3906c' }}
            >
              Closed
            </span>
          ) : (
            <a
              href={term.applyUrl}
              className="px-8 py-3 text-xs font-medium uppercase tracking-[0.3em] transition-opacity hover:opacity-85"
              style={{ backgroundColor: GOLD, color: ESPRESSO }}
            >
              Apply Now
            </a>
          )}
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────── */}
      <section className="px-6 py-20 sm:px-10" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: RUST }}>
            Support
          </p>
          <h2 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl" style={{ color: ESPRESSO }}>
            Frequently Asked Questions
          </h2>

          <div className="mt-8" style={{ borderTop: '1px solid #ddd0b0' }}>
            {FAQS.map((item) => (
              <FaqRow key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Other terms + contact: bark-brown bookend ────────────── */}
      <section className="px-6 py-20 sm:px-10" style={{ backgroundColor: ESPRESSO }}>
        <div className="mx-auto max-w-6xl">
          {otherTerms.length > 0 && (
            <div className="mb-16">
              <p className="text-xs uppercase tracking-[0.3em]" style={{ color: GOLD }}>
                Other Terms
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {otherTerms.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/rush/${t.slug}`}
                    className="px-4 py-2 text-sm transition-colors"
                    style={{ border: '1px solid rgba(242,232,208,0.25)', color: 'rgba(242,232,208,0.7)' }}
                  >
                    {t.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: GOLD }}>
            Questions?
          </p>
          <a
            href="mailto:REPLACE_WITH_CHAPTER_EMAIL@example.com"
            className="mt-2 inline-block text-xl font-medium tracking-tight transition-colors hover:opacity-80"
            style={{ color: CREAM }}
          >
            REPLACE_WITH_CHAPTER_EMAIL@example.com
          </a>
        </div>
      </section>
    </div>
  );
}

function ScheduleRow({ event, index }: { event: RushEvent; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasDescription = Boolean(event.description);

  return (
    <div style={{ borderBottom: '1px solid rgba(242,232,208,0.2)' }}>
      <button
        onClick={() => hasDescription && setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        className={`flex w-full flex-col gap-2 py-6 text-left sm:flex-row sm:items-center sm:justify-between sm:gap-6 ${
          hasDescription ? 'cursor-pointer' : 'cursor-default'
        }`}
      >
        <div className="flex items-baseline gap-4">
          <span className="text-xs tabular-nums" style={{ color: 'rgba(242,232,208,0.4)' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-lg font-medium tracking-tight sm:text-xl" style={{ color: CREAM }}>
            {event.name}
          </span>
        </div>
        <div
          className="flex flex-wrap items-center gap-x-4 gap-y-1 pl-8 text-sm sm:pl-0"
          style={{ color: 'rgba(242,232,208,0.6)' }}
        >
          <span className="font-medium uppercase tracking-[0.1em]" style={{ color: GOLD }}>
            {event.date}
          </span>
          {event.time && <span>{event.time}</span>}
          {event.location && <span>{event.location}</span>}
          {hasDescription && (
            <span
              className="flex h-4 w-4 shrink-0 items-center justify-center"
              style={{ color: 'rgba(242,232,208,0.5)' }}
            >
              {isOpen ? '−' : '+'}
            </span>
          )}
        </div>
      </button>

      {hasDescription && (
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p
                className="max-w-2xl pb-6 pl-8 text-sm leading-relaxed"
                style={{ color: 'rgba(242,232,208,0.6)' }}
              >
                {event.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

function FaqRow({ q, a }: { q: string; a: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ borderBottom: '1px solid #ddd0b0' }}>
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium sm:text-lg" style={{ color: ESPRESSO }}>
          {q}
        </span>
        <span className="flex shrink-0 items-center justify-center" style={{ color: '#a3906c' }}>
          {isOpen ? '−' : '+'}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 text-sm leading-relaxed sm:text-base" style={{ color: '#7a6a4f' }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
