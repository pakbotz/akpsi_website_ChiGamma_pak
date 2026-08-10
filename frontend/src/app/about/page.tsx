// frontend/src/app/about/page.tsx
'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

/* ------------------------------------------------------------------
   About page — dark theme, matching the home page, with motion:
   scroll reveals, a hero entrance, a full-bleed scrolling marquee,
   an animated count-up stats band, and hover interactions.
   Font forced to the site font (Neue Montreal) so it never falls to serif.
------------------------------------------------------------------- */

const CREAM = '#f0eeea';
const GOLD = '#c8b89a';

const CHAPTER_BODY = [
  "The Chi Gamma Chapter brings Alpha Kappa Psi to the redwoods of UC Santa Cruz \u2014 a community of driven Banana Slugs committed to professional growth, meaningful service, and lifelong brotherhood. Set between the forest and the coast, our chapter proves that ambition and a UCSC spirit belong together.",
  'Through mentorship, professional workshops, and hands-on projects, brothers sharpen real-world skills while forming friendships that last well beyond graduation. We invest in people from every college, major, and background across campus, united by a shared drive to lead. [Add Chi Gamma\u2019s own details \u2014 founding year at UCSC, member count, and signature chapter events.]',
];

const HISTORY_BODY = [
  'Founded in 1904, Alpha Kappa Psi is the oldest and largest professional business fraternity in the world. Its founders \u2014 remembered as the \u201cBrooklyn Four\u201d \u2014 crossed the Brooklyn Bridge each evening on their way home from school, talking through the idea of an organization that would do more than teach students: it would develop leaders.',
  'That idea became Alpha Kappa Psi. More than a century later, the fraternity connects a global network of over 250,000 members from every field and background, whose ranks have included U.S. presidents and Fortune 500 executives. For our brothers, that network is a source of mentorship, opportunity, and the skills to grow personally and professionally.',
];

const ALUMNI = [
  { name: 'Luke Skywalker', caption: 'Analyst, Goldman Sachs' },
  { name: 'Leia Organa', caption: 'Product Manager, Salesforce' },
  { name: 'Han Solo', caption: 'Consultant, Deloitte' },
  { name: 'Padme Amidala', caption: 'Founder & CEO, Bright Labs' },
  { name: 'Obi-Wan Kenobi', caption: 'Engineer, Google' },
  { name: 'Ahsoka Tano', caption: 'Audit Associate, EY' },
  { name: 'Lando Calrissian', caption: 'Equity Research, Morgan Stanley' },
  { name: 'Mon Mothma', caption: 'Brand Manager, P&G' },
];

const VALUES = [
  { title: 'Brotherhood', body: 'Trust, respect, cooperation, companionship and aid to brothers is the expected norm.', icon: 'users' },
  { title: 'Knowledge', body: 'Education and experience is emphasized and shared.', icon: 'book' },
  { title: 'Integrity', body: 'All actions, whether in business or in life, are guided by honesty, ethics and fairness.', icon: 'shield' },
  { title: 'Service', body: 'Sharing of time, talent and treasure with society and with our fraternity is a priority.', icon: 'heart' },
  { title: 'Unity', body: 'A common understanding of our vision and values that transcends chapter.', icon: 'link' },
];

const STATS = [
  { value: 1904, label: 'Founded', format: (v: number) => `${v}` },
  { value: 250, label: 'Members Worldwide', format: (v: number) => `${v}K+` },
  { value: 120, label: 'Years Strong', format: (v: number) => `${v}+` },
];

type Alumnus = (typeof ALUMNI)[number];
type Value = (typeof VALUES)[number];
type IconName = Value['icon'];
type Stat = (typeof STATS)[number];

const EASE = [0.22, 1, 0.36, 1] as const;

/* --- Layout container --- */
function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-5xl px-6 sm:px-10 ${className}`}>{children}</div>;
}

/* --- Scroll-reveal wrapper --- */
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs uppercase tracking-[0.2em] text-[#f0eeea]/45">{children}</p>;
}

/* --- Placeholder image tile (zooms on hover of its group) --- */
function Placeholder({ className = '' }: { className?: string }) {
  return (
    <div className={`group relative flex items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] ${className}`}>
      <div className="absolute inset-0 scale-100 bg-gradient-to-br from-white/[0.04] to-transparent transition-transform duration-700 ease-out group-hover:scale-110" />
      <span className="relative text-[10px] uppercase tracking-[0.3em] text-white/25">Placeholder Photo</span>
    </div>
  );
}

function ContentBlock({ heading, body, reverse = false, kicker }: { heading: string; body: string[]; reverse?: boolean; kicker?: string }) {
  return (
    <Reveal className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-20">
      <Placeholder className={`aspect-[4/3] w-full ${reverse ? 'md:order-2' : ''}`} />
      <div className={reverse ? 'md:order-1' : ''}>
        {kicker && <p className="mb-3 text-xs uppercase tracking-[0.2em]" style={{ color: GOLD }}>{kicker}</p>}
        <h2 className="text-2xl font-bold uppercase tracking-wide text-[#f0eeea] sm:text-3xl">{heading}</h2>
        <div className="mt-6 space-y-5">
          {body.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-[#f0eeea]/65 sm:text-base">{p}</p>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function Icon({ name }: { name: IconName }) {
  const p = { fill: 'none', stroke: CREAM, strokeWidth: 1.75, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const icons: Record<IconName, React.ReactNode> = {
    users: (
      <>
        <circle cx="9" cy="8" r="3.2" {...p} />
        <path d="M3.5 20a5.5 5.5 0 0 1 11 0" {...p} />
        <path d="M16 5.2a3.2 3.2 0 0 1 0 5.9M17.5 20a5.5 5.5 0 0 0-3-4.9" {...p} />
      </>
    ),
    book: (
      <>
        <path d="M12 6.5C10.5 5 8 4.5 4 5v13c4-.5 6.5 0 8 1.5 1.5-1.5 4-2 8-1.5V5c-4-.5-6.5 0-8 1.5Z" {...p} />
        <path d="M12 6.5v13" {...p} />
      </>
    ),
    shield: <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" {...p} />,
    heart: <path d="M12 20s-7-4.4-7-9.3A4 4 0 0 1 12 7a4 4 0 0 1 7 3.7C19 15.6 12 20 12 20Z" {...p} />,
    link: (
      <>
        <path d="M9.5 14.5a3.5 3.5 0 0 1 0-5l2-2a3.5 3.5 0 1 1 5 5l-1 1" {...p} />
        <path d="M14.5 9.5a3.5 3.5 0 0 1 0 5l-2 2a3.5 3.5 0 1 1-5-5l1-1" {...p} />
      </>
    ),
  };
  return <svg width="36" height="36" viewBox="0 0 24 24" aria-hidden="true">{icons[name]}</svg>;
}

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d={dir === 'right' ? 'M9 6l6 6-6 6' : 'M15 6l-6 6 6 6'} />
    </svg>
  );
}

/* --- Alumni card: lifts + zooms on hover --- */
function AlumniCard({ a }: { a: Alumnus }) {
  return (
    <div className="group relative h-96 w-72 flex-shrink-0 snap-start overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition-transform duration-500 ease-out hover:-translate-y-1.5">
      {/* Replace with: <img src={a.photo} alt={a.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /> */}
      <div className="absolute inset-0 scale-100 bg-gradient-to-br from-white/[0.05] to-transparent transition-transform duration-700 ease-out group-hover:scale-110" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/20">Placeholder Photo</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 px-5 pb-5">
        <div className="mb-2 h-px w-8 bg-[#c8b89a] transition-all duration-500 ease-out group-hover:w-16" />
        <h3 className="overflow-hidden whitespace-nowrap text-2xl font-black uppercase leading-none tracking-tight text-[#f0eeea]">{a.name}</h3>
        <p className="mt-2 truncate text-[11px] font-medium uppercase tracking-wide text-[#f0eeea]/55">{a.caption}</p>
      </div>
    </div>
  );
}

/* --- Value card: lifts, border + icon brighten on hover --- */
function ValueCard({ v, delay }: { v: Value; delay: number }) {
  return (
    <Reveal delay={delay}>
      <div className="group h-full rounded-xl border border-white/10 bg-white/[0.02] p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25 hover:bg-white/[0.05]">
        <div className="transition-transform duration-500 ease-out group-hover:-translate-y-1">
          <Icon name={v.icon} />
        </div>
        <h3 className="mt-6 text-base font-bold uppercase tracking-wide text-[#f0eeea]">{v.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-[#f0eeea]/60">{v.body}</p>
      </div>
    </Reveal>
  );
}

/* --- Full-bleed scrolling marquee of value words --- */
const MARQUEE_WORDS = ['Brotherhood', 'Knowledge', 'Integrity', 'Service', 'Unity'];
function MarqueeBand() {
  const set = (
    <div className="flex shrink-0 items-center">
      {MARQUEE_WORDS.map((w, i) => (
        <span key={w} className="flex items-center">
          <span
            className={`px-8 text-4xl font-black uppercase tracking-tight sm:text-6xl ${i % 2 ? 'text-transparent' : 'text-[#f0eeea]'}`}
            style={i % 2 ? { WebkitTextStroke: `1px ${CREAM}` } : undefined}
          >
            {w}
          </span>
          <span className="text-2xl" style={{ color: GOLD }}>✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="relative overflow-hidden border-y border-white/10 py-8">
      <div className="marquee-track flex w-max">
        {set}
        {set}
      </div>
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent" />
    </div>
  );
}

/* --- Count-up hook --- */
function useCountUp(target: number, duration = 1600) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);
  return { ref, val };
}

function StatItem({ s }: { s: Stat }) {
  const { ref, val } = useCountUp(s.value);
  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl font-black tracking-tight text-[#f0eeea] sm:text-6xl">{s.format(val)}</div>
      <div className="mt-2 text-xs uppercase tracking-[0.2em] text-[#f0eeea]/45">{s.label}</div>
    </div>
  );
}

function StatsBand() {
  return (
    <div className="border-y border-white/10 bg-white/[0.015]">
      <Container className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-3 sm:py-20">
        {STATS.map((s) => (
          <StatItem key={s.label} s={s} />
        ))}
      </Container>
    </div>
  );
}

function AlumniCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const update = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    update();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
  };

  const arrowBase =
    'absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#f0eeea] text-[#0a0a0a] shadow-lg transition hover:bg-white sm:flex';

  return (
    <div className="relative mt-12">
      <div ref={scrollerRef} className="flex items-start gap-5 overflow-x-auto pb-2 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {ALUMNI.map((a) => (
          <AlumniCard key={a.name} a={a} />
        ))}
      </div>
      {canLeft && (
        <button onClick={() => scroll('left')} className={`${arrowBase} left-3`} aria-label="Previous alumni">
          <Chevron dir="left" />
        </button>
      )}
      {canRight && (
        <button onClick={() => scroll('right')} className={`${arrowBase} right-3`} aria-label="Next alumni">
          <Chevron dir="right" />
        </button>
      )}
    </div>
  );
}

/* --- Hero with staggered entrance + gold glow --- */
function Hero() {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  };
  return (
    <section className="relative pt-32 pb-24 sm:pt-40 sm:pb-32">
      {/* soft gold glow behind the heading */}
      <div
        className="pointer-events-none absolute -top-10 left-1/2 h-[420px] w-[720px] -translate-x-1/2 opacity-40 blur-3xl"
        style={{ background: `radial-gradient(closest-side, ${GOLD}33, transparent)` }}
      />
      <motion.div variants={container} initial="hidden" animate="show" className="relative">
        <motion.div variants={item}>
          <Eyebrow>About</Eyebrow>
        </motion.div>
        <motion.h1 variants={item} className="mt-4 text-5xl font-black uppercase tracking-tight sm:text-7xl">
          Who We Are
        </motion.h1>
        <motion.p variants={item} className="mt-6 max-w-2xl text-base leading-relaxed text-[#f0eeea]/70 sm:text-lg">
          Get to know the Chi Gamma Chapter of Alpha Kappa Psi at UC Santa Cruz &mdash; and the history behind our fraternity.
        </motion.p>
        <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs uppercase tracking-[0.2em] text-[#f0eeea]/50">
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
            UC Santa Cruz, California
          </span>
          <span className="hidden h-3 w-px bg-white/20 sm:block" />
          <span>Home of the Banana Slugs</span>
        </motion.div>
        <motion.div variants={item}>
          <Placeholder className="mt-14 aspect-[16/7] w-full sm:mt-16" />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div
      className="w-full bg-[#0a0a0a] text-[#f0eeea]"
      style={{ fontFamily: "var(--font-sans, 'Neue Montreal', 'Helvetica Neue', sans-serif)" }}
    >
      <Container>
        <Hero />
      </Container>

      {/* moving value-words band */}
      <MarqueeBand />

      <Container>
        <section className="space-y-24 py-24 sm:space-y-32 sm:py-32">
          <ContentBlock kicker="Rooted in the Redwoods" heading="The Chi Gamma Chapter" body={CHAPTER_BODY} />
          <ContentBlock heading="Fraternity History" body={HISTORY_BODY} reverse />
        </section>
      </Container>

      {/* animated count-up stats */}
      <StatsBand />

      <Container>
        <section className="py-24 sm:py-32">
          <Reveal>
            <Eyebrow>Notable Alumni</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold uppercase tracking-wide sm:text-4xl">Leaders We&rsquo;ve Built</h2>
            <p className="mt-4 max-w-xl text-[#f0eeea]/65">
              AKPsi develops successful leaders who give back to our organization and the community.
            </p>
          </Reveal>
          <AlumniCarousel />
        </section>
      </Container>

      <div className="border-t border-white/10">
        <Container>
          <section className="py-24 sm:py-32">
            <Reveal className="text-center">
              <Eyebrow>What We Stand For</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold uppercase tracking-wide sm:text-4xl">Our Core Values</h2>
            </Reveal>
            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {VALUES.map((v, i) => (
                <ValueCard key={v.title} v={v} delay={i * 0.08} />
              ))}
            </div>
          </section>
        </Container>
      </div>
    </div>
  );
}