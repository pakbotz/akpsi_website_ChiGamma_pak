'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Plus } from 'lucide-react';
import type { RushEvent, RushTerm } from '@/lib/rushTerms';
import { CldImage } from 'next-cloudinary';

const GOLD = '#8a7148';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const GUIDE_STEPS = [
  {
    title: 'Attend every event you can',
    body: 'Each night gives you a different look at the chapter. The more you show up, the better we get to know you — and you get to know us.',
  },
  {
    title: 'Come with questions',
    body: "Rush is a two-way conversation. Ask brothers about their experience, our values, and what membership actually looks like day to day.",
  },
  {
    title: 'Dress the part',
    body: 'Check the dress code for each event ahead of time. Showing up prepared is one of the easiest ways to make a good impression.',
  },
  {
    title: 'Follow up',
    body: 'A short thank-you message after an event goes a long way. Brothers remember who takes the process seriously.',
  },
];

const FAQS = [
  {
    q: 'What distinguishes us from other organizations?',
    a: 'Alpha Kappa Psi combines professional development with lifelong brotherhood — we focus on career growth, networking, and community service alongside close personal relationships.',
  },
  {
    q: 'Is it necessary to be a business major to join?',
    a: 'No. We welcome students from every major who are interested in professional development and building a strong network.',
  },
  {
    q: 'What is the Prospecting Process?',
    a: 'After attending rush events, interested students submit an application, complete a short interview, and answer a few written questions before bids go out.',
  },
  {
    q: 'How many prospects are accepted each semester?',
    a: 'Class sizes vary by semester based on chapter needs — check with current members for specifics on this term.',
  },
  {
    q: 'Is attendance at Rush Events obligatory for applying?',
    a: "We strongly encourage attending as many events as possible, since it's the best way for us to get to know you before you apply.",
  },
  {
    q: 'What is the time commitment once initiated?',
    a: 'Members are expected to attend weekly chapter meetings, committee events, and professional development activities throughout the semester.',
  },
];

export default function RushTermView({
  term,
  otherTerms,
}: {
  term: RushTerm;
  otherTerms: RushTerm[];
}) {
  const isArchived = term.status === 'archived';

  return (
    <div className="min-h-screen w-full bg-[#f0eeea]">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 pb-14 pt-36 sm:px-8">
        <Link
          href="/rush"
          className="text-xs uppercase tracking-[0.25em] text-neutral-400 hover:text-neutral-600"
        >
          ← All Terms
        </Link>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.15em] ${
              isArchived
                ? 'border-neutral-300 text-neutral-400'
                : 'border-[#c8b89a] bg-[#c8b89a]/15 text-[#8a7148]'
            }`}
          >
            {isArchived ? 'Past Term' : 'Recruiting Now'}
          </span>
          <span className="rounded-full border border-neutral-300 px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-neutral-500">
            UC Santa Cruz
          </span>
        </div>

        <h1
          className="mt-5 font-medium leading-[0.95] tracking-tight text-neutral-900"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
        >
          Rush {term.label}
        </h1>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-neutral-300 pt-8 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
              {isArchived ? 'Applications Closed' : 'Apply By'}
            </p>
            <p className="mt-2 text-2xl font-medium tracking-tight text-neutral-900">
              {term.applyBy}
            </p>
          </div>
          {isArchived ? (
            <span className="rounded-full border border-neutral-300 px-6 py-3 text-sm uppercase tracking-[0.15em] text-neutral-400">
              Closed
            </span>
          ) : (
            <a
              href={term.applyUrl}
              className="rounded-full bg-[#c8b89a] px-8 py-3 text-sm font-medium uppercase tracking-[0.15em] text-neutral-900 transition-colors hover:bg-[#b8a683]"
            >
              Apply Now
            </a>
          )}
        </div>
      </section>

      {/* ─── Intro: paragraph next to image ──────────────────── */}
      <section className="mx-auto max-w-5xl px-6 pb-20 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-10 sm:grid-cols-2 sm:gap-16">
          <div className="aspect-[4/5] w-full bg-neutral-200">
            <div className="flex relative overflow-hidden h-full w-full items-center justify-center">
            <CldImage
                src='20150103_171836_nyxmah'
                alt="Chi Gamma brothers"
                fill
                sizes="33vw"
                quality="auto"
                format="auto"
                className="object-cover"
                preload
              />
          </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">About This Term</p>
            <h2 className="mt-3 text-2xl font-medium tracking-tight text-neutral-900 sm:text-3xl">
              What to expect from Rush {term.label}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-neutral-600">
              {`${term.blurb} Rush is your chance to meet the brothers of Alpha Kappa Psi, learn what the chapter stands for, and see if it's the right fit for you. Every event below is an opportunity to ask questions, build relationships, and get a real sense of who we are as an organization.`}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Rush Week Schedule ───────────────────────────────── */}
      <section className="border-y border-neutral-300 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">Schedule</p>
          <h2 className="mt-3 text-2xl font-medium tracking-tight text-neutral-900 sm:text-3xl">
            Rush Week Schedule
          </h2>

          <div className="mt-10 flex flex-col">
            {term.events.map((event, i) => (
              <ScheduleRow key={event.name} event={event} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Photo Gallery ────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">Gallery</p>
        <h2 className="mt-3 text-2xl font-medium tracking-tight text-neutral-900 sm:text-3xl">
          Photo Gallery
        </h2>
        <p className="mt-3 max-w-lg text-sm text-neutral-500">
          Photos from {term.label} will go here — placeholders for now.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="aspect-[4/5] w-full bg-neutral-200"
            >
              <div className="flex relative overflow-hidden h-full w-full items-center justify-center">
            <CldImage
                src='20150103_171836_nyxmah'
                alt="Chi Gamma brothers"
                fill
                sizes="33vw"
                quality="auto"
                format="auto"
                className="object-cover"
                preload
              />
          </div>

            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Guide to Success ─────────────────────────────────── */}
      <section className="border-y border-neutral-300 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">Preparation</p>
          <h2 className="mt-3 text-2xl font-medium tracking-tight text-neutral-900 sm:text-3xl">
            Guide to Success
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
            {GUIDE_STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="flex gap-4"
              >
                <span className="text-sm font-medium" style={{ color: GOLD }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-medium text-neutral-900">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-500">{step.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">Questions</p>
        <h2 className="mt-3 text-2xl font-medium tracking-tight text-neutral-900 sm:text-3xl">
          Frequently Asked Questions
        </h2>

        <div className="mt-8">
          {FAQS.map((item) => (
            <FaqRow key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </section>

      {/* ─── Explore Other Terms + Contact ────────────────────── */}
      <section className="border-t border-neutral-300">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
          {otherTerms.length > 0 && (
            <div className="mb-16">
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
                Explore Other Terms
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {otherTerms.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/rush/${t.slug}`}
                    className="rounded-full border border-neutral-300 px-4 py-2 text-sm text-neutral-600 transition-colors hover:border-neutral-900 hover:text-neutral-900"
                  >
                    {t.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">Questions?</p>
          <a
            href="mailto:REPLACE_WITH_CHAPTER_EMAIL@example.com"
            className="mt-2 inline-block text-xl font-medium tracking-tight text-neutral-900 hover:text-[#8a7148]"
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
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="border-b border-neutral-200 last:border-b-0"
    >
      <button
        onClick={() => hasDescription && setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        className={`flex w-full flex-col gap-2 py-6 text-left sm:flex-row sm:items-center sm:justify-between sm:gap-6 ${
          hasDescription ? 'cursor-pointer' : 'cursor-default'
        }`}
      >
        <div className="flex items-baseline gap-4">
          <span className="text-xs tabular-nums text-neutral-400">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-lg font-medium tracking-tight text-neutral-900 sm:text-xl">
            {event.name}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pl-8 text-sm text-neutral-500 sm:pl-0">
          <span className="font-medium" style={{ color: GOLD }}>
            {event.date}
          </span>
          {event.time && <span>{event.time}</span>}
          {event.location && <span>{event.location}</span>}
          {hasDescription && (
            <motion.span
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.25 }}
              className="flex shrink-0 items-center justify-center text-neutral-400"
            >
              <Plus size={16} />
            </motion.span>
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
              <p className="max-w-2xl pb-6 pl-8 text-sm leading-relaxed text-neutral-500">
                {event.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}

function FaqRow({ q, a }: { q: string; a: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-neutral-200">
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-neutral-900 sm:text-lg">{q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex shrink-0 items-center justify-center text-neutral-500"
        >
          <Plus size={18} />
        </motion.span>
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
            <p className="max-w-2xl pb-6 text-sm leading-relaxed text-neutral-500 sm:text-base">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
