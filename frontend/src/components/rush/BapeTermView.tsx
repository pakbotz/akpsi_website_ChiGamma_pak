'use client';

import { useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Anton } from 'next/font/google';
import { motion, AnimatePresence, useScroll, useTransform, type Variants } from 'framer-motion';
import { Star } from 'lucide-react';
import type { RushEvent, RushTerm } from '@/lib/rushTerms';
import CamoPattern from '@/components/ui/CamoPattern';
import { CldImage } from 'next-cloudinary';

// About section — single photo.
const ABOUT_IMAGE_PUBLIC_ID = 'pi_rush_beach_cleanup_qwywsg';

// "I'm Interested" links straight out to the chapter's Rush interest Google Form.
const INTEREST_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSetBreVjzxuiL21d03NQrqHdrAGj4Uma0eDWIT6zAKGX5aw-g/viewform?usp=header';

// Gallery section — one wide banner photo up top, then a row of 4 equal
// square tiles below it. Every tile is smart-cropped (crop="fill"
// gravity="auto" below) so landscape and portrait shots both fit their
// box cleanly, centered instead of naively chopping the frame.
const GALLERY_LONG_IMAGE_ID = 'IMG_0183_cmz5sf';
const GALLERY_IMAGE_IDS = [
  'Screenshot_2026-09-03_at_2.09.13_am_nkw17f',
  'IMG_3042_jdptf4',
  'P1080443_m9d7e6',
];

// Pre-crop applied before the tile's own fill-crop, keyed by public ID —
// used to cut a specific unwanted object (e.g. a drink can) out of frame
// before the smart auto-crop picks the final visible region.
const GALLERY_PRECROP: Record<string, string> = {
  IMG_3042_jdptf4: 'c_crop,x_0,y_0,w_5616,h_3300',
};

// Most gallery tiles are landscape (aspect-[4/3]), but this one's a
// near-square photo — forcing it into 4:3 cropped off the raised and
// joined hands that make up the whole point of the shot.
const GALLERY_TILE_ASPECT: Record<string, string> = {
  'Screenshot_2026-09-03_at_2.40.28_am_vf2kcp': 'aspect-square',
};

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
    body: "Seats fill up fast, especially at Info Night. Show up a few minutes early and grab one near the front.",
  },
  {
    title: 'Come Prepared',
    body: "Look us up before you show up. Even a few minutes of research goes a long way, and specific questions make for a much better conversation than generic ones.",
  },
  {
    title: 'Dress Professionally',
    body: "Business casual is the default. Check the schedule ahead of time if you're not sure what a specific night calls for.",
  },
  {
    title: 'Be Yourself',
    body: "We're not looking for a rehearsed pitch. The brothers who stick with us are the ones who show up as themselves, so let your actual personality come through.",
  },
];

const FAQS = [
  {
    q: 'What distinguishes us from other organizations?',
    a: (
      <>
        What sets Alpha Kappa Psi apart is our commitment to{' '}
        <strong>professional growth without limiting who can be part of it</strong>
        . We welcome students from every major and every stage of their college
        journey, providing opportunities to build meaningful connections, develop
        career-ready skills, and discover new possibilities. Whether you&apos;re just
        beginning to explore your interests or already have a clear career path in
        mind, <strong>we&apos;re here to help you grow and make the most of your time at UCSC.</strong>
      </>
    ),
  },
  {
    q: 'Is it necessary to be a business major to join?',
    a: (
      <>
        Not at all. Alpha Kappa Psi is a{' '}
        <strong>co-ed professional fraternity open to students of all majors</strong>
        . Our chapter brings together people from a wide range of academic
        backgrounds, including Computer Science, Engineering, Psychology, Design,
        Mathematics, and beyond. We believe that some of the strongest professional
        communities are built by bringing together people with{' '}
        <strong>different perspectives, experiences, and areas of expertise.</strong>
      </>
    ),
  },
  {
    q: 'What is the Prospecting Process?',
    a: (
      <>
        The Prospecting Process is a{' '}
        <strong>6-week professional development experience</strong> designed to
        help students grow both personally and professionally while getting to know
        our chapter and its values. Throughout the process, prospects have
        opportunities to develop career-ready skills, build meaningful relationships,
        and gain a deeper understanding of what Alpha Kappa Psi has to offer. By the
        end of the six weeks, our goal is for every prospect to walk away with{' '}
        <strong>new skills, stronger connections, and greater confidence in their professional journey.</strong>
      </>
    ),
  },
  {
    q: 'How many prospects are accepted each semester?',
    a: (
      <>
        There is <strong>no predetermined number of prospects</strong> accepted each
        semester. The size of each Prospecting Process depends on the level of
        interest and participation during recruitment. Our focus is on creating a
        meaningful experience for everyone involved rather than setting an arbitrary
        limit.
      </>
    ),
  },
  {
    q: 'Is attendance at Rush Events obligatory for applying?',
    a: (
      <>
        Attending <strong>3/4 rush events is required to apply</strong>, and we
        highly encourage prospective members to attend as many as they can. Rush is
        an opportunity for you to{' '}
        <strong>get to know our members, experience our chapter culture, and learn what Alpha Kappa Psi can offer you</strong>
        . At the same time, it gives our members the chance to get to know you beyond
        your résumé or academic background.
      </>
    ),
  },
  {
    q: 'What is the time commitment once initiated?',
    a: (
      <>
        Alpha Kappa Psi is a commitment to{' '}
        <strong>your own professional and personal growth</strong>. The time you put
        into the organization directly influences what you get out of the experience,
        from professional development and networking to friendships and leadership
        opportunities. In terms of overall time and effort, the commitment is often{' '}
        <strong>comparable to taking a 5 unit course</strong>, with opportunities
        to become even more involved as you progress through the chapter.
      </>
    ),
  },
  {
    q: "Can I rush again if I don't get a bid the first time?",
    a: (
      <>
        Absolutely. Not receiving a bid one quarter does{' '}
        <strong>not prevent you from rushing again in future quarters</strong>. We
        encourage anyone who remains interested in Alpha Kappa Psi to come back,
        reconnect with our chapter, and continue pursuing membership.{' '}
        <strong>
          Showing that you&apos;re willing to grow, learn, and try again is something we
          genuinely value.
        </strong>
      </>
    ),
  },
];

export default function BapeTermView({
  term,
  otherTerms,
}: {
  term: RushTerm;
  otherTerms: RushTerm[];
}) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const camoY = useTransform(heroScroll, [0, 1], [0, 140]);

  return (
    <div className="min-h-screen w-full bg-white">
      {/* ─── Hero: black, full-bleed camo background ─────────────────── */}
      <section
        ref={heroRef}
        className="relative flex min-h-[80vh] w-full flex-col justify-end overflow-hidden bg-black px-6 pt-32 sm:px-10"
      >
        <motion.div className="absolute inset-0" style={{ y: camoY }}>
          <CamoPattern id="hero-bg-camo" className="h-full w-full" tones={DARK_CAMO_TONES} tileSize={140} />
        </motion.div>

        <motion.div
          className="relative z-10 pb-16"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center gap-1 rounded-sm px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-black"
              style={{ backgroundColor: GREEN }}
            >
              <Star size={11} fill="black" /> Recruiting Now
            </span>
          </div>

          <div className="relative inline-block">
            <h1
              className={`${display.className} mt-5 uppercase leading-[0.85] tracking-tight text-white`}
              style={{ fontSize: 'clamp(3rem, 10vw, 9rem)' }}
            >
              Rush<br />{term.label}
            </h1>
            <Image
              src="/monkey.png"
              alt=""
              aria-hidden="true"
              width={896}
              height={493}
              priority
              className="pointer-events-none absolute select-none"
              style={{
                width: 'clamp(120px, 20vw, 260px)',
                height: 'auto',
                right: '2%',
                bottom: '48%',
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* ─── About: paragraph + image ─────────────────────────────── */}
      <section className="px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="relative aspect-video w-full overflow-hidden bg-[#1c1c1c]"
          >
            <CldImage
                src={ABOUT_IMAGE_PUBLIC_ID}
                alt="Chi Gamma brothers"
                fill
                crop="fill"
                gravity="auto"
                sizes="70vw"
                quality="auto"
                format="auto"
                className="object-cover"
                preload
              />
          </motion.div>
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-10 text-center"
          >
            <h2 className={`${display.className} text-3xl uppercase tracking-tight text-black sm:text-4xl`}>
              This Is Rush.
            </h2>
            <div className="mx-auto mt-5 max-w-2xl space-y-4 text-base leading-relaxed text-neutral-600">
              <p>
                {`We're excited to introduce Rush ${term.label}: `}
                <span className="font-semibold text-black">&quot;Apes Together Strong.&quot;</span>
                {" It's a simple idea: on your own, you can only go so far. Together, there's no ceiling. Rush is where that starts, five events built to show you what it actually looks like when a group of people has your back."}
              </p>
              <p>
                Alpha Kappa Psi is built on that same idea: brothers who show up for each other, a network that keeps paying off long after graduation, and a community where professional growth and real friendship push each other forward instead of competing for your time.
              </p>
              <p className="font-medium text-black">
                You don&apos;t have to do this alone. Rush {term.label} starts now.
              </p>
              <p className="text-sm text-neutral-400">{term.blurb}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── The Lineup: schedule ─────────────────────────────────── */}
      <section className="bg-black px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="text-xs font-bold uppercase tracking-[0.3em]"
            style={{ color: GREEN }}
          >
            This Week
          </motion.p>
          <motion.h2
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className={`${display.className} mt-3 text-3xl uppercase tracking-tight text-white sm:text-4xl`}
          >
            The Lineup
          </motion.h2>

          <div className="mt-10 flex flex-col border-t border-white/15">
            {term.events.map((event, i) => (
              <motion.div
                key={event.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
              >
                <ScheduleRow event={event} accent={ACCENTS[i % ACCENTS.length]} font={display.className} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Gallery ──────────────────────────────────────────────── */}
      <section className="px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: PINK }}>
              Gallery
            </p>
            <h2 className={`${display.className} mt-3 text-3xl uppercase tracking-tight text-black sm:text-4xl`}>
              Behind The Scenes
            </h2>
            <p className="mt-3 max-w-lg text-sm text-neutral-500">
              A few shots of the chapter in action. More added as the semester goes on.
            </p>
          </motion.div>

          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="relative mt-10 aspect-[21/9] w-full overflow-hidden"
            style={{ backgroundColor: '#fafafa' }}
          >
            <CldImage
              src={GALLERY_LONG_IMAGE_ID}
              alt="Chi Gamma brothers"
              fill
              crop="fill"
              gravity="auto"
              sizes="90vw"
              quality="auto"
              format="auto"
              className="object-cover"
            />
          </motion.div>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {GALLERY_IMAGE_IDS.map((publicId, i) => (
              <motion.div
                key={`${publicId}-${i}`}
                custom={i + 1}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className={`relative w-full overflow-hidden ${GALLERY_TILE_ASPECT[publicId] ?? 'aspect-[4/3]'}`}
                style={{ backgroundColor: '#fafafa' }}
              >
                <CldImage
                  src={publicId}
                  alt="Chi Gamma brothers"
                  fill
                  crop="fill"
                  gravity="auto"
                  rawTransformations={GALLERY_PRECROP[publicId] ? [GALLERY_PRECROP[publicId]] : undefined}
                  sizes="25vw"
                  quality="auto"
                  format="auto"
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── The Playbook: guide to success ───────────────────────── */}
      <section className="relative overflow-hidden px-6 py-20 sm:px-10" style={{ backgroundColor: GREEN }}>
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <CamoPattern id="prep-camo" className="h-full w-full" tones={['#436b1a', '#5f8f28', '#82b845']} />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-black/60">Preparation</p>
            <h2 className={`${display.className} mt-3 text-3xl uppercase tracking-tight text-black sm:text-4xl`}>
              The Playbook
            </h2>
          </motion.div>

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

      {/* ─── Interest Form ────────────────────────────────────────── */}
      <section className="px-6 pt-12 pb-4 sm:px-10">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 border-4 border-black px-8 py-10 sm:flex-row sm:items-center"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: GREEN }}>
              Not Ready To Apply?
            </p>
            <p className={`${display.className} mt-2 text-2xl uppercase tracking-tight text-black`}>
              Get On Our Radar
            </p>
          </div>
          <a
            href={INTEREST_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 text-xs font-extrabold uppercase tracking-[0.3em] text-black transition-opacity hover:opacity-85"
            style={{ backgroundColor: GREEN }}
          >
            I&apos;m Interested
          </a>
        </motion.div>
      </section>

      {/* ─── Apply ────────────────────────────────────────────────── */}
      <section className="px-6 pt-4 pb-12 sm:px-10">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 border-4 border-black px-8 py-10 sm:flex-row sm:items-center"
        >
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
        </motion.div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────── */}
      <section className="px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: PINK }}>
              Support
            </p>
            <h2 className={`${display.className} mt-3 text-3xl uppercase tracking-tight text-black sm:text-4xl`}>
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="mt-8 border-t-2 border-black">
            {FAQS.map((item, i) => (
              <motion.div
                key={item.q}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
              >
                <FaqRow q={item.q} a={item.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Other terms + contact: black bookend ─────────────────── */}
      <section className="bg-black px-6 py-20 sm:px-10">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mx-auto max-w-6xl"
        >
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
            href="UCSC.AKPsi@gmail.com"
            className="mt-2 inline-block text-xl font-bold tracking-tight text-white transition-opacity hover:opacity-70"
          >
            UCSC.AKPsi@gmail.com
          </a>
        </motion.div>
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

function FaqRow({ q, a }: { q: string; a: ReactNode }) {
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
