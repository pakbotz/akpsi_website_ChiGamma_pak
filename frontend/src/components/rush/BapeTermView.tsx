'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Anton } from 'next/font/google';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Star } from 'lucide-react';
import type { RushEvent, RushTerm } from '@/lib/rushTerms';
import CamoPattern from '@/components/ui/CamoPattern';

// The theme's full accent palette, darkened way down — used as the actual background
// texture of the black sections (instead of flat bg-black) so the camo
// motif carries through the whole page, not just thin accent strips.
// Dark enough that white text stays fully readable on top of it.
const DARK_CAMO_TONES = ['#0a0a0a', '#33531c', '#6b3410', '#5c1a30'];

// ─── Streetwear-inspired theme ───────────────────────────────────────
// Reference: bape.com — stark black/white base, bold uppercase display
// type with generous tracking, camo texture as a signature motif, and
// vivid accent colors (green, orange, pink) used the way a hype brand
// uses colorways, not as a single restrained signal color. Clean,
// organized grids (not chaos) carry the graphic energy — that's true to
// the reference's actual layout discipline. Copy is written straight,
// no slang — this is still a professional recruitment page. No logos,
// wordmarks, or the brand's specific camo print are used — just the
// color/type/texture language, applied to AKPsi's own content.
const GREEN = '#a3e635';
const ORANGE = '#f97316';
const PINK = '#ec4899';
const ACCENTS = [GREEN, ORANGE, PINK];

// Anton is a heavy, condensed display face — the closest widely-available
// match to the bold graphic headlines a streetwear brand uses. Loaded via
// next/font so it's self-hosted at build time (no runtime request to
// Google, no layout shift, works offline) and scoped to this file only —
// it doesn't touch the site's shared default typeface.
const display = Anton({ subsets: ['latin'], weight: '400' });

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const PREP_TIPS = [
  {
    title: 'Arrive Early',
    body: 'Seating fills up quickly at every event. Arriving on time makes a strong first impression.',
  },
  {
    title: 'Come Prepared',
    body: 'Take a little time to learn about the chapter beforehand. Specific questions lead to more meaningful conversations.',
  },
  {
    title: 'Dress Professionally',
    body: 'Professional nights call for professional attire. Check the schedule so you always know what to wear.',
  },
  {
    title: 'Follow Up',
    body: 'A brief message after an event goes a long way. Brothers remember who takes the initiative.',
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

export default function BapeTermView({
  term,
  otherTerms,
}: {
  term: RushTerm;
  otherTerms: RushTerm[];
}) {
  return (
    <div className="min-h-screen w-full bg-white">
      {/* ─── Hero: black, full-bleed camo background ─────────────────── */}
      <section className="relative flex min-h-[80vh] w-full flex-col justify-end overflow-hidden bg-black px-6 pt-32 sm:px-10">
        <div className="absolute inset-0">
          <CamoPattern id="hero-bg-camo" className="h-full w-full" tones={DARK_CAMO_TONES} tileSize={140} />
        </div>

        <div className="relative z-10 pb-16">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center gap-1 rounded-sm px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-black"
              style={{ backgroundColor: GREEN }}
            >
              <Star size={11} fill="black" /> Recruiting Now
            </span>
          </div>

          <h1
            className={`${display.className} mt-5 uppercase leading-[0.85] tracking-tight text-white`}
            style={{ fontSize: 'clamp(3rem, 10vw, 9rem)' }}
          >
            Rush<br />{term.label}
          </h1>
        </div>
      </section>

      {/* ─── About: paragraph + image ─────────────────────────────── */}
      <section className="px-6 py-20 sm:px-10">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-16">
          <div className="aspect-[4/5] w-full border-4 border-black bg-neutral-100">
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">
                Placeholder Photo
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: ORANGE }}>
              About
            </p>
            <h2 className={`${display.className} mt-4 text-3xl uppercase tracking-tight text-black sm:text-4xl`}>
              This Is Rush.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-neutral-600">
              {`${term.blurb} Rush ${term.label} is your opportunity to meet the brothers of Alpha Kappa Psi and learn what the chapter is all about. Five events, one week — come see if this is the right fit for you.`}
            </p>
          </div>
        </div>
      </section>

      {/* ─── The Lineup: schedule ─────────────────────────────────── */}
      <section className="bg-black px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: GREEN }}>
            This Week
          </p>
          <h2 className={`${display.className} mt-3 text-3xl uppercase tracking-tight text-white sm:text-4xl`}>
            The Lineup
          </h2>

          <div className="mt-10 flex flex-col border-t border-white/15">
            {term.events.map((event, i) => (
              <ScheduleRow key={event.name} event={event} accent={ACCENTS[i % ACCENTS.length]} font={display.className} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Gallery ──────────────────────────────────────────────── */}
      <section className="px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: PINK }}>
            Gallery
          </p>
          <h2 className={`${display.className} mt-3 text-3xl uppercase tracking-tight text-black sm:text-4xl`}>
            Photo Gallery
          </h2>
          <p className="mt-3 max-w-lg text-sm text-neutral-500">
            Photos from {term.label} will go here — placeholders for now.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => {
              const accent = ACCENTS[i % ACCENTS.length];
              return (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  className="aspect-square w-full border-2"
                  style={{ borderColor: accent, backgroundColor: '#fafafa' }}
                >
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">
                      Placeholder Photo
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── The Playbook: guide to success ───────────────────────── */}
      <section className="relative overflow-hidden px-6 py-20 sm:px-10" style={{ backgroundColor: GREEN }}>
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <CamoPattern id="prep-camo" className="h-full w-full" tones={['#436b1a', '#5f8f28', '#82b845']} />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-black/60">Preparation</p>
          <h2 className={`${display.className} mt-3 text-3xl uppercase tracking-tight text-black sm:text-4xl`}>
            The Playbook
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2">
            {PREP_TIPS.map((tip, i) => (
              <motion.div
                key={tip.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="border-2 border-black bg-white px-5 py-5"
              >
                <div className="flex items-center gap-2">
                  <Star size={14} fill="black" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-black">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className={`${display.className} mt-2 uppercase tracking-tight text-black`}>{tip.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-neutral-600">{tip.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Apply ────────────────────────────────────────────────── */}
      <section className="px-6 py-20 sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 border-4 border-black px-8 py-10 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: ORANGE }}>
              {term.status === 'archived' ? 'Applications Closed' : 'Apply By'}
            </p>
            <p className={`${display.className} mt-2 text-2xl uppercase tracking-tight text-black`}>
              {term.applyBy}
            </p>
          </div>
          {term.status === 'archived' ? (
            <span className="border-2 border-neutral-300 px-6 py-3 text-xs font-bold uppercase tracking-[0.3em] text-neutral-400">
              Closed
            </span>
          ) : (
            <a
              href={term.applyUrl}
              className="px-8 py-3 text-xs font-extrabold uppercase tracking-[0.3em] text-black transition-opacity hover:opacity-85"
              style={{ backgroundColor: GREEN }}
            >
              Apply Now
            </a>
          )}
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────── */}
      <section className="px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: PINK }}>
            Support
          </p>
          <h2 className={`${display.className} mt-3 text-3xl uppercase tracking-tight text-black sm:text-4xl`}>
            Frequently Asked Questions
          </h2>

          <div className="mt-8 border-t-2 border-black">
            {FAQS.map((item) => (
              <FaqRow key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Other terms + contact: black bookend ─────────────────── */}
      <section className="bg-black px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-6xl">
          {otherTerms.length > 0 && (
            <div className="mb-16">
              <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: GREEN }}>
                Other Terms
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {otherTerms.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/rush/${t.slug}`}
                    className="border border-white/25 px-4 py-2 text-sm text-white/70 transition-colors hover:border-white hover:text-white"
                  >
                    {t.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: GREEN }}>
            Questions?
          </p>
          <a
            href="mailto:REPLACE_WITH_CHAPTER_EMAIL@example.com"
            className="mt-2 inline-block text-xl font-bold tracking-tight text-white transition-opacity hover:opacity-70"
          >
            REPLACE_WITH_CHAPTER_EMAIL@example.com
          </a>
        </div>
      </section>
    </div>
  );
}

function ScheduleRow({
  event,
  accent,
  font,
}: {
  event: RushEvent;
  accent: string;
  font: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const hasDescription = Boolean(event.description);

  return (
    <div className="border-b border-white/15">
      <button
        onClick={() => hasDescription && setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        className={`flex w-full flex-col gap-2 py-6 text-left sm:flex-row sm:items-center sm:justify-between sm:gap-6 ${
          hasDescription ? 'cursor-pointer' : 'cursor-default'
        }`}
      >
        <div className="flex items-center gap-3">
          <Star size={14} fill={accent} color={accent} />
          <span className={`${font} text-lg uppercase tracking-tight text-white sm:text-xl`}>
            {event.name}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pl-7 text-sm text-white/60 sm:pl-0">
          <span className="font-bold uppercase tracking-[0.1em]" style={{ color: accent }}>
            {event.date}
          </span>
          {event.time && <span>{event.time}</span>}
          {event.location && <span>{event.location}</span>}
          {hasDescription && (
            <span className="flex h-4 w-4 shrink-0 items-center justify-center text-white/50">
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
              <p className="max-w-2xl pb-6 pl-7 text-sm leading-relaxed text-white/60">
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
    <div className="border-b-2 border-black">
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-base font-bold text-black sm:text-lg">{q}</span>
        <span className="flex shrink-0 items-center justify-center text-black">
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
            <p className="max-w-2xl pb-6 text-sm leading-relaxed text-neutral-600 sm:text-base">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
