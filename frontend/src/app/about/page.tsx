// frontend/src/app/about/page.tsx
'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { CldImage } from 'next-cloudinary';

import Footer from '@/components/home/Footer';
/* ------------------------------------------------------------------
   About page — dark theme, matching the home page, with motion:
   scroll reveals, a hero entrance, a full-bleed scrolling marquee,
   an animated count-up stats band, and hover interactions.
   Font forced to the site font (Neue Montreal) so it never falls to serif.
------------------------------------------------------------------- */


const CREAM = '#f0eeea';
const GOLD = '#c8b89a';

// ─── Cloudinary public IDs — paste yours between the quotes. ──────────────
// Leave any blank ('') and that spot keeps showing the placeholder tile.
const IMAGES = {
  hero: 'IMG_6619_f9fk6q',     // wide hero photo at the top
  chapter: 'IMG_6615_jzcbpi',  // "The Chi Gamma Chapter" block
  history: 'IMG_7335_b8t0yw',  // "Fraternity History" block
};

const CHAPTER_BODY = [
  "Established on June 1st, 2018, the Chi Gamma Chapter is the only co-ed professional business fraternity at UC Santa Cruz to welcome students of every major. We were built by founding brothers who worked tirelessly to bring Alpha Kappa Psi to the redwoods. Ever since, we\u2019ve grown a genuine, driven, and refreshingly diverse brotherhood.",
  'Our brothers host professional development events, attend leadership conferences, and open doors to internships and mentorship. The skills they build here have helped them become principled business leaders at many of the nation\u2019s leading firms, all while forming friendships that last well beyond graduation.',
];

const HISTORY_BODY = [
  'Founded in 1904, Alpha Kappa Psi is the oldest and largest professional business fraternity in the world. Its founders, remembered as the \u201cBrooklyn Four,\u201d crossed the Brooklyn Bridge each evening on their way home from school, imagining an organization that would do more than teach students: it would develop leaders.',
  'That idea became Alpha Kappa Psi. More than a century later, the fraternity connects a global network of over 298,000 members across 265+ universities, a network our brothers draw on for mentorship, opportunity, and lifelong support.',
];

const BADGES = [
  { big: '2018', small: 'Chapter Founded' },
  { big: 'Co-Ed', small: 'Business Fraternity' },
  { big: 'All', small: 'Majors Welcome' },
  { big: 'UCSC', small: 'Exclusive Chapter' },
];

const ALUMNI = [
  { name: 'Steve Forbes', caption: 'Editor-in-Chief, Forbes', note: 'Editor-in-chief of Forbes and two-time presidential candidate.', photo: 'gettyimages-461057770-612x612_ic0wiz', pos: '50% 0%', zoom: 1.8, contain: false },
  { name: 'Sam Walton', caption: 'Founder, Walmart', note: 'Built Walmart into the world\u2019s largest retailer.', photo: 'Sam-Walton_hanow8', pos: '50% 40%', zoom: 1, contain: false },
  { name: 'Benazir Bhutto', caption: 'Prime Minister of Pakistan', note: 'First woman to lead a modern Muslim-majority nation.', photo: 'ghows-WT-a0d848fa-5304-4955-8d28-7b0d58a6d88e-22971f12_dftnkk', pos: '50% 30%', zoom: 1.08, contain: false },
  { name: 'Alexis Ohanian', caption: 'Co-Founder, Reddit', note: 'Co-founded Reddit, one of the web\u2019s largest communities.', photo: 'Alexis_Ohanian_1-17-2012_nwoons', pos: '50% 32%', zoom: 1.65, contain: false },
  { name: 'J. Willard Marriott', caption: 'Founder, Marriott', note: 'Turned a root-beer stand into a global hotel empire.', photo: 'j-willard-marriott-b29ffdf4-c76e-4cde-ad90-c82be1fee95-resize-750_r0jlch', pos: '50% 0%', zoom: 1, contain: true },
  { name: 'Cheryl Bachelder', caption: 'Former CEO, Popeyes', note: 'Led Popeyes through a celebrated turnaround as CEO.', photo: 'ect_backpage18__05_iz3xut', pos: '50% 35%', zoom: 1.6, contain: false },
  { name: 'Bernie Marcus', caption: 'Co-Founder, The Home Depot', note: 'Co-founded The Home Depot, the top home-improvement chain.', photo: '2012_fall_ferguson_banner_urax6a', pos: '50% 50%', zoom: 1, contain: false },
  { name: 'James Cash Penney', caption: 'Founder, J.C. Penney', note: 'Founded J.C. Penney on a golden-rule philosophy.', photo: 'JCP-portrait_wzkkfx', pos: '50% 28%', zoom: 1.6, contain: false },
];

const VALUES = [
  { title: 'Brotherhood', body: 'Trust, respect, cooperation, companionship and aid to brothers is the expected norm.', icon: 'users', photo: 'IMG_6615_jzcbpi' },
  { title: 'Knowledge', body: 'Education and experience is emphasized and shared.', icon: 'book', photo: 'IMG_6619_f9fk6q' },
  { title: 'Integrity', body: 'All actions, whether in business or in life, are guided by honesty, ethics and fairness.', icon: 'shield', photo: 'IMG_7335_b8t0yw' },
  { title: 'Service', body: 'Sharing of time, talent and treasure with society and with our fraternity is a priority.', icon: 'heart', photo: 'IMG_6772_abiagx' },
  { title: 'Unity', body: 'A common understanding of our vision and values that transcends chapter.', icon: 'link', photo: 'IMG_6106_yoitne' },
];

const STATS = [
  { value: 2018, label: 'Chapter Founded', format: (v: number) => `${v}` },
  { value: 298, label: 'Members Worldwide', format: (v: number) => `${v}K+` },
  { value: 265, label: 'Universities', format: (v: number) => `${v}+` },
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
function Reveal({ children, delay = 0, className = '', style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs uppercase tracking-[0.2em] text-[#f0eeea]/45">{children}</p>;
}

/* --- Cloudinary image that fills its parent (parent must be relative).
   pos = object-position anchor (e.g. '50% 0%' keeps the top, crops the bottom).
   zoom = extra magnification toward that anchor (1 = none, 1.3 = zoomed in).
   contain = show the whole photo instead of cropping (a "zoomed out" look). --- */
function CloudImage({
  publicId,
  alt,
  sizes = '100vw',
  priority = false,
  pos = '50% 50%',
  zoom = 1,
  contain = false,
}: {
  publicId: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  pos?: string;
  zoom?: number;
  contain?: boolean;
}) {
  return (
    <CldImage
      src={publicId}
      alt={alt}
      fill
      sizes={sizes}
      quality="auto"
      format="auto"
      priority={priority}
      className={contain ? 'object-contain' : 'object-cover'}
      style={{
        objectPosition: pos,
        transform: zoom !== 1 ? `scale(${zoom})` : undefined,
        transformOrigin: pos,
      }}
    />
  );
}

/* --- Image tile: shows a Cloudinary photo if given, else a placeholder --- */
function Placeholder({ className = '', publicId = '', alt = '', sizes, priority = false }: { className?: string; publicId?: string; alt?: string; sizes?: string; priority?: boolean }) {
  return (
    <div className={`group relative flex items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] ${className}`}>
      {publicId ? (
        <CloudImage publicId={publicId} alt={alt} sizes={sizes} priority={priority} />
      ) : (
        <>
          <div className="absolute inset-0 scale-100 bg-gradient-to-br from-white/[0.04] to-transparent transition-transform duration-700 ease-out group-hover:scale-110" />
          <span className="relative text-[10px] uppercase tracking-[0.3em] text-white/25">Placeholder Photo</span>
        </>
      )}
    </div>
  );
}

function ContentBlock({ heading, body, reverse = false, kicker, photo = '' }: { heading: string; body: string[]; reverse?: boolean; kicker?: string; photo?: string }) {
  return (
    <Reveal className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-20">
      <Placeholder publicId={photo} alt={heading} sizes="(max-width: 768px) 100vw, 50vw" className={`aspect-[4/3] w-full ${reverse ? 'md:order-2' : ''}`} />
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

/* --- Alumni flip card: photo + name on front, achievement on back (flips on hover) --- */
function AlumniCard({ a, index }: { a: Alumnus; index: number }) {
  const faceHidden = { backfaceVisibility: 'hidden' as const, WebkitBackfaceVisibility: 'hidden' as const };
  const num = String(index + 1).padStart(2, '0');
  return (
    <Reveal delay={index * 0.06} className="group h-96 w-72 flex-shrink-0 snap-start" style={{ perspective: '1200px' }}>
      <div
        className="relative h-full w-full transition-transform duration-[600ms] ease-out group-hover:[transform:rotateX(180deg)]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* FRONT — photo + name */}
        <div className="absolute inset-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]" style={faceHidden}>
          {a.photo ? (
            <CloudImage publicId={a.photo} alt={a.name} sizes="288px" pos={a.pos} zoom={a.zoom} contain={a.contain} />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/20">Placeholder Photo</span>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/70 to-transparent" />
          <span className="absolute right-4 top-4 text-xs font-semibold tracking-[0.25em] text-[#f0eeea]/40">{num}</span>
          <div className="absolute inset-x-0 bottom-0 px-5 pb-5">
            <div className="mb-2 h-px w-8 bg-[#c8b89a] transition-all duration-500 ease-out group-hover:w-16" />
            <h3 className="text-xl font-black uppercase leading-tight tracking-tight text-[#f0eeea]">{a.name}</h3>
            <p className="mt-2 text-[11px] font-medium uppercase tracking-wide text-[#f0eeea]/55">{a.caption}</p>
          </div>
        </div>

        {/* BACK — achievement */}
        <div
          className="absolute inset-0 flex flex-col justify-between rounded-xl border border-white/15 bg-white/[0.06] p-6"
          style={{ ...faceHidden, transform: 'rotateX(180deg)' }}
        >
          <span className="text-xs font-semibold tracking-[0.25em] text-[#f0eeea]/40">{num}</span>
          <div>
            <h3 className="text-lg font-black uppercase leading-tight tracking-tight text-[#f0eeea]">{a.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#f0eeea]/75">{a.note}</p>
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c8b89a]">Alpha Kappa Psi</span>
        </div>
      </div>
    </Reveal>
  );
}

/* --- Value flip card: photo + name on front, description on back (hover to flip) --- */
function ValueCard({ v, delay }: { v: Value; delay: number }) {
  const faceHidden = { backfaceVisibility: 'hidden' as const, WebkitBackfaceVisibility: 'hidden' as const };
  return (
    <Reveal delay={delay} className="group h-72" style={{ perspective: '1200px' }}>
      <div
        className="relative h-full w-full transition-transform duration-500 ease-out group-hover:[transform:rotateY(180deg)]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* FRONT — photo + value name */}
        <div className="absolute inset-0 overflow-hidden rounded-xl border border-white/10" style={faceHidden}>
          {v.photo ? (
            <CloudImage publicId={v.photo} alt={v.title} sizes="(max-width: 640px) 100vw, 20vw" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-white/[0.03]">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/20">Placeholder Photo</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <Icon name={v.icon} />
            <h3 className="mt-3 text-lg font-black uppercase tracking-tight text-[#f0eeea]">{v.title}</h3>
          </div>
        </div>

        {/* BACK — description */}
        <div
          className="absolute inset-0 flex flex-col justify-center rounded-xl border border-white/15 bg-white/[0.05] p-6"
          style={{ ...faceHidden, transform: 'rotateY(180deg)' }}
        >
          <h3 className="text-base font-bold uppercase tracking-wide text-[#f0eeea]">{v.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-[#f0eeea]/70">{v.body}</p>
        </div>
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
          <span className="text-2xl text-[#f0eeea]/25">✦</span>
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
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#100d0a] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#100d0a] to-transparent" />
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
        {ALUMNI.map((a, i) => (
          <AlumniCard key={a.name} a={a} index={i} />
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
        <motion.p variants={item} className="mt-5 text-lg font-medium text-[#f0eeea]/90 sm:text-xl">
          Shaping People, Shaping Business.
        </motion.p>
        <motion.p variants={item} className="mt-4 max-w-2xl text-base leading-relaxed text-[#f0eeea]/70 sm:text-lg">
          Get to know the Chi Gamma Chapter of Alpha Kappa Psi at UC Santa Cruz: who we are, where we come from, and what we stand for.
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
          <Placeholder publicId={IMAGES.hero} alt="Chi Gamma brothers" sizes="(max-width: 1024px) 100vw, 1024px" priority className="mt-14 aspect-[16/7] w-full sm:mt-16" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* --- Friendly quick-facts strip --- */
function FoundingBadges() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
      {BADGES.map((b, i) => (
        <Reveal key={b.big} delay={i * 0.08}>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-6 text-center">
            <div className="text-3xl font-black tracking-tight text-[#f0eeea] sm:text-4xl">{b.big}</div>
            <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-[#f0eeea]/60">{b.small}</div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default function AboutPage() {
  return (
    <div
      className="relative w-full overflow-hidden bg-[#100d0a] text-[#f0eeea]"
      style={{ fontFamily: "var(--font-sans, 'Neue Montreal', 'Helvetica Neue', sans-serif)" }}
    >
      {/* warm depth gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: `radial-gradient(1100px 700px at 100% -5%, ${GOLD}14, transparent 55%)` }}
      />

      {/* dulled ΑΚΨ watermark — fixed to the right side, stays put on scroll */}
      <div aria-hidden className="pointer-events-none fixed inset-y-0 right-0 z-0 hidden flex-col items-center justify-center gap-6 pr-1 lg:flex">
        <span
          className="select-none font-black leading-none text-[#f0eeea]/[0.05]"
          style={{ writingMode: 'vertical-rl', fontSize: 'clamp(8rem, 19vw, 16rem)', letterSpacing: '-0.04em' }}
        >
          ΑΚΨ
        </span>
        <span
          className="select-none font-medium uppercase text-[#f0eeea]/[0.09]"
          style={{ writingMode: 'vertical-rl', fontSize: 'clamp(0.8rem, 1.4vw, 1.2rem)', letterSpacing: '0.25em' }}
        >
          Chi Gamma
        </span>
      </div>

      <div className="relative z-10">
      <Container>
        <Hero />
      </Container>

      {/* friendly quick-facts */}
      <Container className="pb-24 sm:pb-32">
        <FoundingBadges />
      </Container>

      {/* moving value-words band */}
      <MarqueeBand />

      <Container>
        <section className="space-y-24 py-24 sm:space-y-32 sm:py-32">
          <ContentBlock kicker="Rooted in the Redwoods" heading="The Chi Gamma Chapter" body={CHAPTER_BODY} photo={IMAGES.chapter} />
          <ContentBlock heading="Fraternity History" body={HISTORY_BODY} reverse photo={IMAGES.history} />
        </section>
      </Container>

      {/* animated count-up stats */}
      <StatsBand />

      <Container>
        <section className="py-24 sm:py-32">
          <Reveal>
            <Eyebrow>Notable Alumni</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold uppercase tracking-wide sm:text-4xl">In Good Company</h2>
            <p className="mt-4 max-w-xl text-[#f0eeea]/65">
              For over a century, Alpha Kappa Psi has shaped principled business leaders. Here are a few brothers who went on to shape the world.
            </p>
          </Reveal>
          <AlumniCarousel />
        </section>
      </Container>

      <div className="border-t border-white/10">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">
          <section className="py-24 sm:py-32">
            <Reveal className="text-center">
              <Eyebrow>What We Stand For</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold uppercase tracking-wide sm:text-4xl">Our Core Values</h2>
            </Reveal>
            <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {VALUES.map((v, i) => (
                <ValueCard key={v.title} v={v} delay={i * 0.08} />
              ))}
            </div>
          </section>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}